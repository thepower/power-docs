# Transactions example

Here are the examples of how to encode registration transaction v2 and money transfer transaction v2:

```javascript
<?php

// some code for data encoding to messagepack format was taken from https://github.com/rybakit/msgpack.php


// constants of binary signature container tags
const TAG_TIMESTAMP = 0x01;
const TAG_PUBLIC_KEY = 0x02;
const TAG_CREATE_DURATION = 0x03;
const TAG_OTHER = 0xF0;
const TAG_PURPOSE = 0xFE;
const TAG_SIGNATURE = 0xFF;

const PURPOSE_TRANSFER = 0x00;
const PURPOSE_SRCFEE = 0x01;
const PURPOSE_DSTFEE = 0x02;
const PURPOSE_GAS = 0x03;

const KIND_GENERIC = 0x10;
const KIND_REGISTER = 0x11;
const KIND_DEPLOY = 0x12;
const KIND_PATCH = 0x13;
const KIND_BLOCK = 0x14;

// non-repeating increasing numbers generator
function get_nonce()
{
    list($usec, $sec) = explode(" ", microtime());

    return intval($sec.substr($usec, 2, 6));
}

// current time in milliseconds
function now()
{
    list($usec, $sec) = explode(" ", microtime());

    return intval(($sec + $usec) * 1000);
}

// convert key from der format (used by API) to pem format (used by openssl)
function der2pem($der_data, $type = 'PUBLIC KEY')
{
    if ($type == 'EC PRIVATE KEY') {
        $der_data = hex2bin('302e0201010420').$der_data.hex2bin('a00706052b8104000a');
    } else {
        $der_data = hex2bin('3036301006072a8648ce3d020106052b8104000a032200').$der_data;
    }

    $pem = chunk_split(base64_encode($der_data), 64, "\n");
    $pem = "-----BEGIN ".$type."-----\n".
        trim($pem).
        "\n-----END ".$type."-----\n";

    return $pem;
}

// encode non negative int to messagepack format
function encode_uint($uint)
{
    if ($uint < 0) {
        throw new Exception("uint must be non negative integer");
    }

    if ($uint <= 0x7f) {
        return \chr($uint);
    }
    if ($uint <= 0xff) {
        return "\xcc".\chr($uint);
    }
    if ($uint <= 0xffff) {
        return "\xcd".\chr($uint >> 8).\chr($uint);
    }
    if ($uint <= 0xffffffff) {
        return \pack('CN', 0xce, $uint);
    }

    return \pack('CJ', 0xcf, $uint);
}

// encode string to messagepack format
function encode_str($str)
{
    $length = strlen($str);
    if ($length < 32) {
        return chr(0xa0 | $length).$str;
    }
    if ($length <= 0xff) {
        return "\xd9".chr($length).$str;
    }
    if ($length <= 0xffff) {
        return "\xda".chr($length >> 8).chr($length).$str;
    }

    return pack('CN', 0xdb, $length).$str;
}

// encode binary to messagepack format
function encode_bin($str)
{
    $length = strlen($str);

    if ($length <= 0xff) {
        return "\xc4".chr($length).$str;
    }
    if ($length <= 0xffff) {
        return "\xc5".chr($length >> 8).chr($length).$str;
    }

    return pack('CN', 0xc6, $length).$str;
}

// return messagepack header of array of $size elements
function encode_array_header($size)
{
    if ($size <= 0xf) {
        return chr(0x90 | $size);
    }
    if ($size <= 0xffff) {
        return "\xdc".chr($size >> 8).chr($size);
    }

    return pack('CN', 0xdd, $size);
}

// return messagepack header of map of $size elements
function encode_map_header($size)
{
    if ($size <= 0xf) {
        return \chr(0x80 | $size);
    }
    if ($size <= 0xffff) {
        return "\xde".\chr($size >> 8).\chr($size);
    }
    return \pack('CN', 0xdf, $size);
}

// encode array of binary to messagepack format
function encode_bin_array($arr)
{
    $data = encode_array_header(sizeof($arr));
    foreach ($arr as $element) {
        $data .= encode_bin($element);
    }

    return $data;
}

// generic encode uint, string or array to messagepack format
function encode_generic($val)
{
    if (is_string($val)) {
        return encode_str($val);
    }

    if (is_integer($val) && $val >= 0) {
        return encode_uint($val);
    }

    if (is_array($val)) {
        return encode_array($val);
    }

    throw new Exception("Unsupported type: " . gettype($val));
}

// encode generic array of uints or strings
function encode_array($arr)
{
    $data = encode_array_header(sizeof($arr));
    foreach ($arr as $element) {
        $data .= encode_generic($element);
    }

    return $data;
}


// compute hash of array of keys
function hash_keys_array($keys)
{
    if (!is_array($keys)) {
        throw new Exception("Keys have a wrong type. You have to pass array of keys");
    }

    sort($keys);

    return hash('sha256', implode("", $keys));
}

// encode timestamp to put it in binary signature container
function tlv_add_timestamp($timestamp)
{
    $len = 8;

    return pack('CCJ', TAG_TIMESTAMP, $len, $timestamp);
}


// encode public key to put it in binary signature container
function tlv_add_pub_key($pub_key)
{
    $len = strlen($pub_key);

    if ($len > 0xFF) {
        throw new Exception("pub_key is too long");
    }

    if ($len < 1) {
        throw new Exception("invalid pub_key");
    }

    return pack('CC', TAG_PUBLIC_KEY, $len).$pub_key;
}

// encode signature to put it in binary signature container
function tlv_add_sign($sign)
{
    $len = strlen($sign);

    if ($len > 0xFF) {
        throw new Exception("signature is too long");
    }

    if ($len < 1) {
        throw new Exception("invalid signature");
    }

    return pack('CC', TAG_SIGNATURE, $len).$sign;
}

// sign transaction body
function sign_data($data, $options)
{
    $mandatory_options = ['pub_key', 'priv_key'];
    foreach ($mandatory_options as $option_name) {
        if (empty($options[$option_name])) {
            throw new Exception($option_name." option is missing");
        }
    }

    $priv_pem = der2pem($options['priv_key'], 'EC PRIVATE KEY');
    $priv_key_handle = openssl_pkey_get_private($priv_pem);

    if ($priv_key_handle === false) {
        throw new Exception("Can't import private key. Openssl error");
    }

    $container = [];

    foreach ($options as $option_name => $option_data) {
        switch ($option_name) {
            case 'pub_key':
                array_push($container, tlv_add_pub_key($option_data));
                break;

            case 'pub_key':
            array_push($container, tlv_add_timestamp($option_data));
                break;

            default:
                break;
        }
    }

    $meta_info = implode("", $container);
    if (openssl_sign($meta_info.$data, $sign, $priv_key_handle, OPENSSL_ALGO_SHA256) === false) {
        throw new Exception("Can't sign data. Openssl error");
    }

    return tlv_add_sign($sign).$meta_info;
}

// encode transaction body map to messagepack format
function encode_map($body, $types)
{
    $data = encode_map_header(sizeof($body)); // fixmap of sizeof($body) elements

    foreach ($body as $key => $value) {
        $data .= encode_str($key);

        if (!isset($types[$key])) {
            throw new Exception("Unknown type of key " . $key);
        }

        switch ($types[$key]) {
            case 'uint':
                $data .= encode_uint($value);
                break;
            case 'binary':
                $data .= encode_bin($value);
                break;
            case 'bin_array':
                $data .= encode_bin_array($value);
                break;
            case 'array':
                $data .= encode_array($value);
                break;
            case 'auto':
                $data .= msgpack_pack($value); // use external msgpack library to encode this type
                break;
            default:
                throw new Exception($types[$key]." is unsupported type of key ".$key);
                break;
        }
    }

    return $data;
}

// check difficulty for registration transaction
function is_difficulty_not_enough($data, $difficulty)
{
    if ($difficulty == 0) {
        return false; // false = difficulty is enough
    }

    $hash = hash('sha512', $data);
    $nibbles = intval($difficulty/4);

    for ($i=0; $i<$nibbles; $i++) {
        if ($hash[$i] != '0') {
            return true; // true = difficulty is not enough
        }
    }

    $last_nibble = unpack("C", pack("h",$hash[$nibbles]))[1];
    $bits_of_last_byte =  $difficulty - $nibbles*4;

    for($i=0; $i<$bits_of_last_byte; $i++) {
        if (($last_nibble >> (3-$i)) & 0x01 != 0) {
            return true; // true = difficulty is not enough
        }
    }

    return false; // false = difficulty is enough
}

// get data for registration transaction body in msgpack format
function registration_tx_body($public_keys, $difficulty)
{
    if (!is_array($public_keys)) {
        throw new Exception("You chose wrong type for 'keys'. You must pass array of public keys.");
    }

    $current_nonce = 0;

    $body = [
        "k" => KIND_REGISTER,
        "t" => now(),
        "nonce" => $current_nonce,
        "h" => hex2bin(hash_keys_array($public_keys)),
    ];

    $types = [
        "k" => "uint",
        "t" => "uint",
        "nonce" => "uint",
        "h" => "binary"
    ];

    $body_bin = encode_map($body, $types);

    while ( is_difficulty_not_enough($body_bin, $difficulty) ) {
        $current_nonce++;
        $body['nonce'] = $current_nonce;
        $body_bin = encode_map($body, $types);
    }


    return $body_bin;
}
// get data for generic money transfer transaction body in msgpack format
function money_transfer_tx_body($options)
{
    $mandatory_options = ['from', 'to', 'money'];
    foreach ($mandatory_options as $option_name) {
        if (empty($options[$option_name])) {
            throw new Exception($option_name." option is missing");
        }
    }

    $body = [
        'k' => KIND_GENERIC,
        'f' => $options['from'],
        'to' => $options['to'],
        's' => get_nonce(),
        't' => now(),
        'p' => $options['money'],
        'e' => [ 'msg' => 'hello']
    ];

    $types = [
        'k' => 'uint',
        'f' => 'binary',
        'to' => 'binary',
        's' => 'uint',
        't' => 'uint',
        'p' => 'array',
        'e' => 'auto'
    ];

    return encode_map($body, $types);
}

// pack and sign transaction
function pack_tx($packed_body, $keys)
{
    if (!is_array($keys)) {
        throw new Exception("You must pass array of keys.");
    }

    $sigs = [];

    foreach ($keys as $pub_key => $priv_key) {
        $options = [
            'pub_key' => $pub_key,
            'priv_key' => $priv_key,
            'timestamp' => now(),
        ];

        $sigs[] = sign_data($packed_body, $options);
    }

    $body = [
        'body' => $packed_body,
        'sig' => $sigs,
        'ver' => 2
    ];

    $types = [
        'body' => 'binary',
        'sig' => 'bin_array',
        'ver' => 'uint'
    ];

    return encode_map($body, $types);
}

// endpoint settings used in curlify_transaction
function get_endpoint_settings()
{
    return [
        'url' => 'http://127.0.0.1:49841',
        'new_tx' => 'tx/new'
    ];

}

// prints curl command with all nessesary parameter
function curlify_transaction($transaction)
{
    $data = json_encode(
        [
            "tx" => base64_encode($transaction),
        ]
    );

    $settings = get_endpoint_settings();
    printf("playground:\n");
    printf(
        "curl -s %s/api/playground/tx/validate -d '%s' | jq .\n\n",
        $settings['url'],
        $data
    );

    printf("apply transaction:\n");
    printf(
        "curl -s %s/api/%s -d '%s' | jq .\n\n",
        $settings['url'],
        $settings['new_tx'],
        $data
    );

}

// private key in der format
$priv_key = hex2bin('0102030405060708090001020304050607080900010203040506070809000102');

// public key in der format (as stored in blockchain)
$pub_key = hex2bin('02B1912FABA80FCECD2A64C574FEFE422C61106001EC588AF1BD9D7548B81064CB');


printf("## registration transaction:\n");

curlify_transaction(
    pack_tx(
        registration_tx_body([$pub_key], 10),
        [$pub_key => $priv_key]
    )
);

printf("\n\n");


$from = hex2bin("8000200002000003"); // AA010000003355443516
$to = hex2bin("8000200002000005");   // AA010000003355443737

$money = [
    [PURPOSE_TRANSFER, "SK", 17],
    [PURPOSE_SRCFEE, "FEE", 3],
];


printf("## money transfer transaction:\n");

curlify_transaction(
    pack_tx(
        money_transfer_tx_body([
            'from' => $from,
            'to' => $to,
            'money' => $money
        ]),
        [$pub_key => $priv_key]
    )
);
```
