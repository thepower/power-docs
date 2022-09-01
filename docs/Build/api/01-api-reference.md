# API reference

## The main terms

- `extra` — additional information of the signing node (timestamp, for example);
- `binextra` — the same additional information in the original binary form (for verifying the signature);
- `nodeid` — the identifier of the node that has issued the signature. The signature is calculated from public key;
- `signature` — a signature.

## /status

| Purpose        | Request type | Response                              |
|----------------|--------------|---------------------------------------|
| The IP address | `GET`        | `client (string)` — ip client address |

Example of use:

```bash
~ curl http://c103n10.thepower.io:49841/api/status -s |jq
```

```json
{
  "client": "88.21.110.20",
  "ok": true
}
```

## /node/status

| Purpose                              | Request type | Response                                                   |
|--------------------------------------|--------------|------------------------------------------------------------|
| Current status of the addressed node | `GET`        | status (object): An object with a current node work report |

Fields of the object status:

- `blockchain (Object)`;
- `nodeid (String)` — node identifier;
- `public_key (String)` — public node key;
- `sync_peers (array of Strings)` — identifiers of connected neighboring nodes;
- `ver (String):` — node software version.

Example of use:

```bash
% curl http://c103n10.thepower.io:49841/api/node/status | jq
```

```json
{
  "result": "ok",
  "status": {
    "blockchain": {
      "chain": 103,
      "hash": "31D80748880ABEC7B844C4136AC3215E7156AD63949AAE11D7F6331A66F088B4",
      "header": {
        "chain": 103,
        "height": 16392,
        "parent": "DB973DA799FFA53B4B76AC0F465A6BD86BB706A475FB09E8A395C4E040CFAFA5",
        "roots": {
          "settings_hash": "C15F9287B56D85C696DF5190D92ABAD879AD9710A592028B16A62B092839566F",
          "ledger_hash": "FFEFE4FCF407DCD7C390FF118B41333B8220226637C300D3D734DCD91FF7E74F",
          "tmp": "000000000003BAF6",
          "mean_time": "0000017C85A02F00"
        },
        "ver": 2
      },
      "temporary": 244470
    },
    "blockvote": {
      "block": 0,
      "sig": 0
    },
    "is_sync": false,
    "nodeid": "2YEYpJT9bBFfu9rdHpZpqdS1Dweo",
    "nodename": "c103n10",
    "public_key": "0262350FB256E233014AA3ACA8AB273AB0478AC11F7C07102CFDB53B169D27C6B7",
    "sync_peers": [],
    "tpic_peers": [
      {
        "auth": "ok",
        "node": "c103n2",
        "state": "working"
      },
      {
        "auth": "ok",
        "node": "c103n8",
        "state": "working"
      },
      {
        "auth": "ok",
        "node": "c103n4",
        "state": "working"
      },
      {
        "auth": "ok",
        "node": "c103n6",
        "state": "working"
      },
      {
        "auth": "ok",
        "node": "c103n3",
        "state": "working"
      },
      {
        "auth": "ok",
        "node": "c103n9",
        "state": "working"
      },
      {
        "auth": "ok",
        "node": "c103n5",
        "state": "working"
      },
      {
        "auth": "ok",
        "node": "c103n7",
        "state": "working"
      },
      {
        "auth": "ok",
        "node": "c103n1",
        "state": "working"
      }
    ],
    "ver": "v0.10.1-34-g7c0cfa0",
    "xchain_inbound": {},
    "xchain_outbound": {}
  },
  "ok": true
}
```

## /where/`{address}`

| Purpose                                      | Request type | Input parameters                                                                                     | Response                                                                                                                                                                                                                                                                                                                                                                                      |
|----------------------------------------------|--------------|------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| The definition of chain belonging to address | -            | `{address}` `(string)` — the address of the wallet in textual or binary representation in hex format | `chain (int)` — the number of the wallet-related chain address; </br> `(String)` — the address converted to binary representation; </br> `txtaddress (String)` — the address converted to textual representation                                                                                                                                                                              |

Example of use:

```bash
% curl http://c103n10.thepower.io:49841/api/where/0x800140006700008C -s |jq
```

```json
{
  "chain": 103,
  "chain_nodes": {
    "2YEYpJT9bBFfu9rdHpZpqdS1Dweo": {
      "host": [
        "http://c103n10.thepower.io:49841",
        "https://c103n10.thepower.io:43392"
      ],
      "ip": [
        "http://c103n10.thepower.io:49841",
        "https://c103n10.thepower.io:43392"
      ]
    }
  },
  "result": "found",
  "address": "0x800140006700008C",
  "ok": true,
  "txtaddress": "AA100000172805338886"
}
```

## /address/`{address}`

| Purpose                                         | Request type | Input parameters                                                                                       | Response                                                                                                                                                                                                                              |
|-------------------------------------------------|--------------|--------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Information about a wallet with a given address | `GET`        | `{address}` `(string)` — the address of the wallet in a textual or binary representation in hex format | `info (Object)` — an object with information about the current wallet state; </br> `address (String)` — the address converted to binary representation; </br> `txtaddress (String)` — the address converted to textual representation |

Fields of the info:

- `amount (Object)` — an object with the wallet balances in different currencies. May be empty, if no operations have been performed;
- `lastblk (String)` — the hash of the block in which the last transaction made changes in the wallet, i.e. a link to its' last change;
- `preblk (String)` — hash of the previous block in which the transaction that changed this wallet happened, i.e. a link to the previous change of this wallet;
- `pubkey (String)` — wallet public key in DER format;
- `seq (int)` — `seq` of the last successful transaction. In a new transaction, `seq` must be greater than this number;
- `t (int)` — the time of the last transaction that has made changes to the wallet (the time of the last transaction with the wallet). Time in microseconds.

Example of use:

```bash
% curl http://c103n10.thepower.io:49841/api/address/0x800140006700002D -s | jq
```

```json
{
  "info": {
    "amount": {
      "SK": 10049800
    },
    "lastblk": "7CFEDEA97F2F2E814AD38EC6D0DACBC421166BF6C7B3FE4C2FEA16419A9098C6",
    "preblk": "73133D2C766FC5AD88B2A97CF14E62AAD8C2F039354264ABA15857A236A52456",
    "pubkey": "0294CA774A60B52AB30F3990C85221DA5ADB42A86B89085B861822026E63A4049A",
    "seq": 1637793975146,
    "t": 1637793975146,
    "usk": 13
  },
  "result": "ok",
  "address": "0x800140006700002D",
  "ok": true,
  "txtaddress": "AA100000172805329312"
}
```

## /blockinfo/`{hash}`

| Purpose                                          | Request type | Input parameters                                                            | Response                                                                               |
|--------------------------------------------------|--------------|-----------------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| Information about the block without transactions | `GET`        | `{hash}` `(string)` — hash of the block for which the information is needed | Refer to "Block operations" section to find information about the assignment of fields |

Example of use:

```bash
% curl http://c103n10.thepower.io:49841/api/blockinfo/337C1ECE8C7384E972AEAFA7B304B21DD2C045DA78E795CF6A3DA30D7DD5010D -s | jq .
```

```json
{
  "block": {
    "etxs": [],
    "extdata": {
      "prevnodes": []
    },
    "failed": [],
    "hash": "337C1ECE8C7384E972AEAFA7B304B21DD2C045DA78E795CF6A3DA30D7DD5010D",
    "header": {
      "chain": 103,
      "height": 16686,
      "parent": "807F6717EC266C5841A84B93BBD9CC0EF6B29221AC91CDF2AA01C3F5FB7536A3",
      "roots": {
        "settings_hash": "5D2281A363684AD9349765AAA40EBEE8F7F80AF8D633A05809B6EB77AB57F603",
        "txroot": "76019BD047BB43EF088DA86C65CCB7CCF941387127B4A7B4B22B8DA35084BF5A",
        "balroot": "29F5F60708CCC96772390E9BB0224D1EFDB37E51AE07EA88FB7580D55AE53545",
        "ledger_hash": "465944666131DF123D80F5435072EE55ED673FA54DE13DB032DF758BCCF3F696",
        "mean_time": "0000017E58DB8AD0"
      },
      "ver": 2
    },
    "outbound": [],
    "settings": [],
    "sign": [
      {
        "_nodeid": "ZWtq338nEhzgM8egX4yXvoZqYQw",
        "_nodename": "c103n1",
        "binextra": "0221022C2E23E783831CFF508BF2EB1D28F101A6CC1D537BC07DB7788BE1D1E87BE0A501080000017E58DB8FEE03080000000034123222",
        "extra": {
          "pubkey": "022C2E23E783831CFF508BF2EB1D28F101A6CC1D537BC07DB7788BE1D1E87BE0A5",
          "timestamp": 1642168291310,
          "createduration": 873607714
        },
        "signature": "304502210081973C2562F84886C9E4699AAD15ADCBEAD029A0FFB12C0EEB965BA532607AE4022013738190C5D76AA18AFDF5F1D3E9CE5ACEA2477AEC5C68EEEE7B6944636AD253"
      },
      {
        "_nodeid": "2YEYpJT9bBFfu9rdHpZpqdS1Dweo",
        "_nodename": "c103n10",
        "binextra": "02210262350FB256E233014AA3ACA8AB273AB0478AC11F7C07102CFDB53B169D27C6B701080000017E58DB8CEC0308000000001420D683",
        "extra": {
          "pubkey": "0262350FB256E233014AA3ACA8AB273AB0478AC11F7C07102CFDB53B169D27C6B7",
          "timestamp": 1642168290540,
          "createduration": 337696387
        },
        "signature": "3045022100BCFD6548FB2515106036033F4A9B10FE9A73B4EC16CA44666FC5A1E7306119B102203804078488BE9254784EF926DB87E5576FE29C6469B7C3045B1DFFB8B06399C4"
      },
      {
        "_nodeid": "2MwzjxKgmBMCtgpfSeFFhk73CYBw",
        "_nodename": "c103n7",
        "binextra": "022102A7B5B5CE97B023C4A7D8AD030C7E0C0BCF28F7A6C7886CBD15BB31F128D11FCB01080000017E58DB8E6403080000000021FB462E",
        "extra": {
          "pubkey": "02A7B5B5CE97B023C4A7D8AD030C7E0C0BCF28F7A6C7886CBD15BB31F128D11FCB",
          "timestamp": 1642168290916,
          "createduration": 570115630
        },
        "signature": "304402200C1E63B4605D1A3694E9FE2D1C054EE7AEAB51430CCD39BCE510123B6B421E2C022012CEC71D366E8F8A6DDC968A136055933B2CCB3A629212E8EEAB4F9BD951878B"
      },
      {
        "_nodeid": "2DZm8QebNfQAVkAEzLceLi1EBy9n",
        "_nodename": "c103n5",
        "binextra": "022102BE742182F1199666A101B7C773B514E97E330310439D403B99972018BA1C8FDF01080000017E58DB8E6203080000000021F74A41",
        "extra": {
          "pubkey": "02BE742182F1199666A101B7C773B514E97E330310439D403B99972018BA1C8FDF",
          "timestamp": 1642168290914,
          "createduration": 569854529
        },
        "signature": "3046022100985A10DD2C01D1AF66DCF295E687A8C33CB15D56CB816A9B4AB75F41414CE19C022100F373AE2DFFB8D0BCD51923BB952132B861D70E7BDDA2B49EA71F695EFD627618"
      },
      {
        "_nodeid": "2k2gyN1ed2MKb4d9RL2AVNxHvGvD",
        "_nodename": "c103n9",
        "binextra": "022102DA924E6B4B0BF01E8BCB744C838DB5D8F646095002BBE468F404B52BBB90F7A901080000017E58DB8E2B0308000000001F0FC793",
        "extra": {
          "pubkey": "02DA924E6B4B0BF01E8BCB744C838DB5D8F646095002BBE468F404B52BBB90F7A9",
          "timestamp": 1642168290859,
          "createduration": 521127827
        },
        "signature": "304402203FC04C6472FBB8F5AAAEB9D45CB846B2B5E9FBE2DDC74B65B7040D2B854E2B1C0220503401B42A1977663FFA9794215B9ADC79FF378F4ED1D987BFB64E08938F5092"
      },
      {
        "_nodeid": "46xxz2PWGVn4eUriufKUrvQydLgT",
        "_nodename": "c103n3",
        "binextra": "022102DEA6BCB2C3D4929DF741869E06B47C28F9968448ED4ED137687344AACA83905901080000017E58DB8DE80308000000001FDAF164",
        "extra": {
          "pubkey": "02DEA6BCB2C3D4929DF741869E06B47C28F9968448ED4ED137687344AACA839059",
          "timestamp": 1642168290792,
          "createduration": 534442340
        },
        "signature": "3045022100DF9D8027D84ED31D4529AC32526EAD6F92B180190B45C550EF03797EE5A7A77F02204EC77AC91BDDCF74AE80784DE24043DC30F53A7F0A3216D1A1AEDE537943A0FA"
      },
      {
        "_nodeid": "2z82qJ8dNGmbgkWQuXj9btNNsTmS",
        "_nodename": "c103n6",
        "binextra": "022102FA858882DCE61E083269C3777867F2497A622E987A8DDF528C5E6C672CFBF19D01080000017E58DB8E1703080000000020793175",
        "extra": {
          "pubkey": "02FA858882DCE61E083269C3777867F2497A622E987A8DDF528C5E6C672CFBF19D",
          "timestamp": 1642168290839,
          "createduration": 544813429
        },
        "signature": "304502203B80BD5B45159BAC846A6B23A7050C7B19E127CAA0CB9F88E67C6405BC2E03CA022100972AEE2E90E3FFBF91BDBA1F79497C7D541F119076F4CB6711D8C53B29DF9B4C"
      },
      {
        "_nodeid": "2JUPTiL5j1wQ2KDTQBzT2ZbJFe1L",
        "_nodename": "c103n4",
        "binextra": "02210300AC82FC854A6F04D747F82F9F61FD32671374ED9C24E36D363B409E2671A86E01080000017E58DB8E0F0308000000001FCAF736",
        "extra": {
          "pubkey": "0300AC82FC854A6F04D747F82F9F61FD32671374ED9C24E36D363B409E2671A86E",
          "timestamp": 1642168290831,
          "createduration": 533395254
        },
        "signature": "3046022100BF8F774DD1D9E2A3BF508793E54EBE0BFC9C83C39F2C326E4BCC0A6032607042022100F83FE6A4072A8A7DE4BD2C90B4ED84A5FEECE896728646E348B63C28A1C3FC33"
      },
      {
        "_nodeid": "25XvAU3z3o1cv4yn4cNti8hADUVr",
        "_nodename": "c103n8",
        "binextra": "02210340134EF4F55B2DFC28CC5785DADA8D56DC48B9B39C2BE3CECCDE1E3A48E5BD6501080000017E58DB8F09030800000000282046F8",
        "extra": {
          "pubkey": "0340134EF4F55B2DFC28CC5785DADA8D56DC48B9B39C2BE3CECCDE1E3A48E5BD65",
          "timestamp": 1642168291081,
          "createduration": 673203960
        },
        "signature": "3045022100AB3B02DC9C2C2395CDBF06100E703FE48E79DD300D85FBB0E88875F441646F0C02203FFDC1BECA56C3F3ADB2D962EE97738C144BD65A59BA5CC2E8D2D97D71D8780A"
      },
      {
        "_nodeid": "Hut5BS7vBfjAGHqLh9WvCPWFa4a",
        "_nodename": "c103n2",
        "binextra": "022103527DCC9ED39ED22B4EB7819068D875CD923688EFD9425A03BED2E733D7C339A101080000017E58DB8F350308000000002B8E3D1B",
        "extra": {
          "pubkey": "03527DCC9ED39ED22B4EB7819068D875CD923688EFD9425A03BED2E733D7C339A1",
          "timestamp": 1642168291125,
          "createduration": 730742043
        },
        "signature": "3044022034550965BCAD7DBEC213848655658E37765B301B2FFF96A2A170B54E796C006F022020693944C84C2AFA66BD257A3B37BC7D6891EFBF59DE1B70BE312C86B7231D9B"
      }
    ],
    "txs_count": 1
  },
  "result": "ok",
  "ok": true
}
```

## /block/`{hash}`

| Purpose                     | Request type | Input parameters                                                            | Response                                                                               |
|-----------------------------|--------------|-----------------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| Information about the block | `GET`        | `{hash}` `(string)` — hash of the block for which the information is needed | Refer to "Block operations" section to find information about the assignment of fields |

Example of use:

```bash
% curl http://c103n10.thepower.io:49841/api/block/337C1ECE8C7384E972AEAFA7B304B21DD2C045DA78E795CF6A3DA30D7DD5010D -s | jq
```

```json
{
  "block": {
    "bals": {
      "800140006700008C": {
        "amount": {},
        "lastblk": "CAE94C729E6ABF08A71B539CCCFF64C9F2CD66CCFFA679E155940A1293695618",
        "seq": 1642168281816,
        "t": 1642168281816,
        "usk": 1
      }
    },
    "etxs": [],
    "extdata": {
      "prevnodes": []
    },
    "failed": [],
    "hash": "337C1ECE8C7384E972AEAFA7B304B21DD2C045DA78E795CF6A3DA30D7DD5010D",
    "header": {
      "chain": 103,
      "height": 16686,
      "parent": "807F6717EC266C5841A84B93BBD9CC0EF6B29221AC91CDF2AA01C3F5FB7536A3",
      "roots": {
        "settings_hash": "5D2281A363684AD9349765AAA40EBEE8F7F80AF8D633A05809B6EB77AB57F603",
        "txroot": "76019BD047BB43EF088DA86C65CCB7CCF941387127B4A7B4B22B8DA35084BF5A",
        "balroot": "29F5F60708CCC96772390E9BB0224D1EFDB37E51AE07EA88FB7580D55AE53545",
        "ledger_hash": "465944666131DF123D80F5435072EE55ED673FA54DE13DB032DF758BCCF3F696",
        "mean_time": "0000017E58DB8AD0"
      },
      "ver": 2
    },
    "outbound": [],
    "settings": [],
    "sign": [
      {
        "_nodeid": "ZWtq338nEhzgM8egX4yXvoZqYQw",
        "_nodename": "c103n1",
        "binextra": "0221022C2E23E783831CFF508BF2EB1D28F101A6CC1D537BC07DB7788BE1D1E87BE0A501080000017E58DB8FEE03080000000034123222",
        "extra": {
          "pubkey": "022C2E23E783831CFF508BF2EB1D28F101A6CC1D537BC07DB7788BE1D1E87BE0A5",
          "timestamp": 1642168291310,
          "createduration": 873607714
        },
        "signature": "304502210081973C2562F84886C9E4699AAD15ADCBEAD029A0FFB12C0EEB965BA532607AE4022013738190C5D76AA18AFDF5F1D3E9CE5ACEA2477AEC5C68EEEE7B6944636AD253"
      },
      {
        "_nodeid": "2YEYpJT9bBFfu9rdHpZpqdS1Dweo",
        "_nodename": "c103n10",
        "binextra": "02210262350FB256E233014AA3ACA8AB273AB0478AC11F7C07102CFDB53B169D27C6B701080000017E58DB8CEC0308000000001420D683",
        "extra": {
          "pubkey": "0262350FB256E233014AA3ACA8AB273AB0478AC11F7C07102CFDB53B169D27C6B7",
          "timestamp": 1642168290540,
          "createduration": 337696387
        },
        "signature": "3045022100BCFD6548FB2515106036033F4A9B10FE9A73B4EC16CA44666FC5A1E7306119B102203804078488BE9254784EF926DB87E5576FE29C6469B7C3045B1DFFB8B06399C4"
      },
      {
        "_nodeid": "2MwzjxKgmBMCtgpfSeFFhk73CYBw",
        "_nodename": "c103n7",
        "binextra": "022102A7B5B5CE97B023C4A7D8AD030C7E0C0BCF28F7A6C7886CBD15BB31F128D11FCB01080000017E58DB8E6403080000000021FB462E",
        "extra": {
          "pubkey": "02A7B5B5CE97B023C4A7D8AD030C7E0C0BCF28F7A6C7886CBD15BB31F128D11FCB",
          "timestamp": 1642168290916,
          "createduration": 570115630
        },
        "signature": "304402200C1E63B4605D1A3694E9FE2D1C054EE7AEAB51430CCD39BCE510123B6B421E2C022012CEC71D366E8F8A6DDC968A136055933B2CCB3A629212E8EEAB4F9BD951878B"
      },
      {
        "_nodeid": "2DZm8QebNfQAVkAEzLceLi1EBy9n",
        "_nodename": "c103n5",
        "binextra": "022102BE742182F1199666A101B7C773B514E97E330310439D403B99972018BA1C8FDF01080000017E58DB8E6203080000000021F74A41",
        "extra": {
          "pubkey": "02BE742182F1199666A101B7C773B514E97E330310439D403B99972018BA1C8FDF",
          "timestamp": 1642168290914,
          "createduration": 569854529
        },
        "signature": "3046022100985A10DD2C01D1AF66DCF295E687A8C33CB15D56CB816A9B4AB75F41414CE19C022100F373AE2DFFB8D0BCD51923BB952132B861D70E7BDDA2B49EA71F695EFD627618"
      },
      {
        "_nodeid": "2k2gyN1ed2MKb4d9RL2AVNxHvGvD",
        "_nodename": "c103n9",
        "binextra": "022102DA924E6B4B0BF01E8BCB744C838DB5D8F646095002BBE468F404B52BBB90F7A901080000017E58DB8E2B0308000000001F0FC793",
        "extra": {
          "pubkey": "02DA924E6B4B0BF01E8BCB744C838DB5D8F646095002BBE468F404B52BBB90F7A9",
          "timestamp": 1642168290859,
          "createduration": 521127827
        },
        "signature": "304402203FC04C6472FBB8F5AAAEB9D45CB846B2B5E9FBE2DDC74B65B7040D2B854E2B1C0220503401B42A1977663FFA9794215B9ADC79FF378F4ED1D987BFB64E08938F5092"
      },
      {
        "_nodeid": "46xxz2PWGVn4eUriufKUrvQydLgT",
        "_nodename": "c103n3",
        "binextra": "022102DEA6BCB2C3D4929DF741869E06B47C28F9968448ED4ED137687344AACA83905901080000017E58DB8DE80308000000001FDAF164",
        "extra": {
          "pubkey": "02DEA6BCB2C3D4929DF741869E06B47C28F9968448ED4ED137687344AACA839059",
          "timestamp": 1642168290792,
          "createduration": 534442340
        },
        "signature": "3045022100DF9D8027D84ED31D4529AC32526EAD6F92B180190B45C550EF03797EE5A7A77F02204EC77AC91BDDCF74AE80784DE24043DC30F53A7F0A3216D1A1AEDE537943A0FA"
      },
      {
        "_nodeid": "2z82qJ8dNGmbgkWQuXj9btNNsTmS",
        "_nodename": "c103n6",
        "binextra": "022102FA858882DCE61E083269C3777867F2497A622E987A8DDF528C5E6C672CFBF19D01080000017E58DB8E1703080000000020793175",
        "extra": {
          "pubkey": "02FA858882DCE61E083269C3777867F2497A622E987A8DDF528C5E6C672CFBF19D",
          "timestamp": 1642168290839,
          "createduration": 544813429
        },
        "signature": "304502203B80BD5B45159BAC846A6B23A7050C7B19E127CAA0CB9F88E67C6405BC2E03CA022100972AEE2E90E3FFBF91BDBA1F79497C7D541F119076F4CB6711D8C53B29DF9B4C"
      },
      {
        "_nodeid": "2JUPTiL5j1wQ2KDTQBzT2ZbJFe1L",
        "_nodename": "c103n4",
        "binextra": "02210300AC82FC854A6F04D747F82F9F61FD32671374ED9C24E36D363B409E2671A86E01080000017E58DB8E0F0308000000001FCAF736",
        "extra": {
          "pubkey": "0300AC82FC854A6F04D747F82F9F61FD32671374ED9C24E36D363B409E2671A86E",
          "timestamp": 1642168290831,
          "createduration": 533395254
        },
        "signature": "3046022100BF8F774DD1D9E2A3BF508793E54EBE0BFC9C83C39F2C326E4BCC0A6032607042022100F83FE6A4072A8A7DE4BD2C90B4ED84A5FEECE896728646E348B63C28A1C3FC33"
      },
      {
        "_nodeid": "25XvAU3z3o1cv4yn4cNti8hADUVr",
        "_nodename": "c103n8",
        "binextra": "02210340134EF4F55B2DFC28CC5785DADA8D56DC48B9B39C2BE3CECCDE1E3A48E5BD6501080000017E58DB8F09030800000000282046F8",
        "extra": {
          "pubkey": "0340134EF4F55B2DFC28CC5785DADA8D56DC48B9B39C2BE3CECCDE1E3A48E5BD65",
          "timestamp": 1642168291081,
          "createduration": 673203960
        },
        "signature": "3045022100AB3B02DC9C2C2395CDBF06100E703FE48E79DD300D85FBB0E88875F441646F0C02203FFDC1BECA56C3F3ADB2D962EE97738C144BD65A59BA5CC2E8D2D97D71D8780A"
      },
      {
        "_nodeid": "Hut5BS7vBfjAGHqLh9WvCPWFa4a",
        "_nodename": "c103n2",
        "binextra": "022103527DCC9ED39ED22B4EB7819068D875CD923688EFD9425A03BED2E733D7C339A101080000017E58DB8F350308000000002B8E3D1B",
        "extra": {
          "pubkey": "03527DCC9ED39ED22B4EB7819068D875CD923688EFD9425A03BED2E733D7C339A1",
          "timestamp": 1642168291125,
          "createduration": 730742043
        },
        "signature": "3044022034550965BCAD7DBEC213848655658E37765B301B2FFF96A2A170B54E796C006F022020693944C84C2AFA66BD257A3B37BC7D6891EFBF59DE1B70BE312C86B7231D9B"
      }
    ],
    "txs": {
      "f9EnUCPBE8NfPaSKEoS-c103n1": {
        "body": "87A2746FA8800140006700002DA174CF0000017E58DB6AD8A173CF0000017E58DB6AD8A170919300A2534B00A16B10A166A8800140006700008CA16581A36D736784A475756964D92431323039336263342D366166392D343935372D616637642D363434663465303265326461A7757365725F696401A974696D657374616D70BA323032322D30312D31342031333A35313A32322E303030303030A6737461747573B7736869707065725F66697273745F7369676E6174757265",
        "extdata": {
          "origin": "c103n1"
        },
        "from": "800140006700008C",
        "kind": "generic",
        "payload": [
          {
            "amount": 0,
            "cur": "SK",
            "purpose": "transfer"
          }
        ],
        "seq": 1642168281816,
        "sig": [
          {
            "binextra": "02210200FF47450E0DB64EC770F9838385CA7486D4AC7735923F87A6BEC1EB82D9493D01080000017E58DB6B3B",
            "extra": {
              "pubkey": "0200FF47450E0DB64EC770F9838385CA7486D4AC7735923F87A6BEC1EB82D9493D",
              "timestamp": 1642168281915
            },
            "signature": "3046022100B12FC5C082FE9822DB9F75FC876E876A9FF4B44D35B3AB2E340F82942E11C46C0221008211359E10E16DF4DE5F4F83C2D28DD451010A585D311E210FE64F45D4AD51BC"
          }
        ],
        "sigverify": {
          "invalid": 0,
          "pubkeys": [
            "0200FF47450E0DB64EC770F9838385CA7486D4AC7735923F87A6BEC1EB82D9493D"
          ],
          "valid": 1
        },
        "t": 1642168281816,
        "to": "800140006700002D",
        "txext": {
          "msg": {
            "status": "shipper_first_signature",
            "timestamp": "2022-01-14 13:51:22.000000",
            "user_id": 1,
            "uuid": "12093bc4-6af9-4957-af7d-644f4e02e2da"
          }
        },
        "ver": 2
      }
    }
  },
  "result": "ok",
  "ok": true
}
```

## /settings

| Purpose                  | Request type | Input parameters | Response                                                                                                                                                   |
|--------------------------|--------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Current chain parameters | `GET`        | -                | You can find information about the fields structure and purpose [here](../../Maintain/build-and-start-a-node/01-tpNodeConfiguration.md#genesistxt-example) |

```bash
% curl http://c103n10.thepower.io:49841/api/settings -s | jq
```

```json
{
  "result": "ok",
  "settings": {
    "chains": [103, 104],
    "keys": {
      "c103n1": "AiwuI+eDgxz/UIvy6x0o8QGmzB1Te8B9t3iL4dHoe+Cl",
      "c103n10": "AmI1D7JW4jMBSqOsqKsnOrBHisEffAcQLP21OxadJ8a3",
      "c103n2": "A1J9zJ7TntIrTreBkGjYdc2SNojv2UJaA77S5zPXwzmh",
      "c103n3": "At6mvLLD1JKd90GGnga0fCj5loRI7U7RN2hzRKrKg5BZ",
      "c103n4": "AwCsgvyFSm8E10f4L59h/TJnE3TtnCTjbTY7QJ4mcahu",
      "c103n5": "Ar50IYLxGZZmoQG3x3O1FOl+MwMQQ51AO5mXIBi6HI/f",
      "c103n6": "AvqFiILc5h4IMmnDd3hn8kl6Yi6Yeo3fUoxebGcs+/Gd",
      "c103n7": "Aqe1tc6XsCPEp9itAwx+DAvPKPemx4hsvRW7MfEo0R/L",
      "c103n8": "A0ATTvT1Wy38KMxXhdrajVbcSLmznCvjzszeHjpI5b1l",
      "c103n9": "AtqSTmtLC/Aei8t0TIONtdj2RglQArvkaPQEtSu7kPep",
      "c104n1": "Aws4BUPeJkjZ2g6DYFhTVXPWDRe766HK2uakyl8S2o2c",
      "c104n2": "AhOHPCtPItr5QHPM7muZD7iwf+QEE8NRiyY0k4IqqjrW",
      "c104n3": "AtzU5X73PG0r5dDZl7XoUjh2GqifPVyDC4S1gvbHCpzD"
    },
    "nodechain": {
      "c103n1": 103,
      "c103n10": 103,
      "c103n2": 103,
      "c103n3": 103,
      "c103n4": 103,
      "c103n5": 103,
      "c103n6": 103,
      "c103n7": 103,
      "c103n8": 103,
      "c103n9": 103,
      "c104n1": 104,
      "c104n2": 104,
      "c104n3": 104
    },
    "current": {
      "chain": {
        "blocktime": 15,
        "minsig": 6,
        "allowempty": 0,
        "patchsigs": 6
      },
      "allocblock": {
        "block": 103,
        "group": 10,
        "last": 160
      },
      "delaytx": {},
      "endless": {
        "gAFAAGcAAAE=": {
          "SK": true,
          "TST": true
        }
      },
      "freegas": 2000000,
      "gas": {
        "SK": 1000
      },
      "nosk": 1,
      "outward": {
        "ch:104": {
          "height": 16681,
          "parent": "1ClZ/jFvfGVM0b1CgxpknDg92G3GS22+/G2kMp4leGE=",
          "pre_hash": "aHFa4H3jN5RJs2+q6X3J++ASO4Ud0vEZ4K07PztAwJ0=",
          "pre_height": 16635,
          "pre_parent": "r2r96qaCljTkDX3vN8exN0dzn8fKtQ1k74E3ax+vs+o="
        }
      },
      "sync_status": {
        "ch:104": {
          "block": "tnUdkVkwREAE17v4hg/RHXMV96lsCEu+m83lBJfm6O4=",
          "height": 21
        }
      }
    }
  },
  "ok": true
}
```
