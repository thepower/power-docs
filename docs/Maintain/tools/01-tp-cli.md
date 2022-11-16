# The Power CLI


## Introduction

The `tp` CLI utility will help you to:

- generate keys (secp256k1 and ed25519);
- register your IP address;
- form the transactions from a JSON-formatted template;
- signing (including signing using multiple keys).

## Utility description and usage

The `tp` CLI utility consists of two parts:

- **generic**: this part of utility will help you work with keys and transactions;
- **storage**: this part of utility will help you work with LStore.

### Usage examples

1. For example, you can use the following command to form, sign, and view a transaction:

   ```bash
   tp -k mykey.key --construct tx1.json --sign --showtx
   ```

2. If you need to sign and send a transaction, specify an address for a node you intend to work with:

   ```bash
   tp -h https://node.address.com:00000/  -k mykey.key --construct tx1.json --ss
   ```

3. `--example` key now generates three following examples:

   - `example_deploy.json` — deployment of a smart contract;
   - `example_generic.json` — generic transaction;
   - `example_evmcall.json` — evm call example.

### Generic part commands

| Command           | Description                                                                                                                                                                                                                                                                                                                                    |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| -h, --host        | Tpnode's base address, use `httpsi` as a protocol for ssl without certificate verification [default: `http://127.0.0.1:49841`]                                                                                                                                                                                                                 |
| `--hexkey`        | Keyfile. You can specifiy a key in `HEX` format (as it is stored in the keyfile) in the command line                                                                                                                                                                                                                                           |
| `-k`, `--keyfile` | Path to a key file                                                                                                                                                                                                                                                                                                                             |
| `--ed25519`       | Use `ed25519` for keys generation. `ed25519` MUST be used as a node key format. For wallet keys you can also use the old `secp256k1` key. **Note:** generate the old-formatted keys for wallets, if you want to use this address for the WEB-wallet at the moment. Our WEB-services will support `ed25519` keys for wallets in future releases |
| `--genkey`        | Generate a key. The generated kay will be saved into `tpcli.key` or another file specified with `-k` key                                                                                                                                                                                                                                       |
| `--exportkey`     | Export a key into `PEM`                                                                                                                                                                                                                                                                                                                        |
| `--exportpw`      | Password for export                                                                                                                                                                                                                                                                                                                            |
| `--exportwif`     | Export a key to `wif` (Only for `secp256k1` keys to use them in other services)                                                                                                                                                                                                                                                                |
| `--importwif`     | Import a key from `wif`                                                                                                                                                                                                                                                                                                                        | 
| `--ping`          | Ping a node                                                                                                                                                                                                                                                                                                                                    |
| `--get_settings`  | Get chain settings from a node                                                                                                                                                                                                                                                                                                                 |
| `--get_ledger`    | Get ledger state for specified address                                                                                                                                                                                                                                                                                                         |
| `--get_code`      | Get ledger's contract code for an address                                                                                                                                                                                                                                                                                                      |
| `--register`      | Run address registration on a chain. The address will be saved to a file                                                                                                                                                                                                                                                                       |
| `--example`       | Save transaction examples to the files in this directory                                                                                                                                                                                                                                                                                       |
| `--construct`     | Construct a `tx` (transaction) from JSON `<filename>`                                                                                                                                                                                                                                                                                          |
| `--evmcall`       | Call EVM contract function, take arguments from `<filename>`. The call is made **locally** on the deployed contract with the address and the state specified. There is no actions being performed in blockchain during this operation                                                                                                          |
| `--abi`           | Contract's ABI for result decoding. It means that this command interprets the result of EVM call using the `ABI`-file                                                                                                                                                                                                                          |
| `--callresp`      | Save `evmcall` result to `<filename>` (add `.hex` extension to save the file in `HEX` format, `.b64` to save the file in Base64. If there is no extension specified, it will be saved in raw binary)                                                                                                                                           |
| `--save`          | Save a constructed or loaded `tx` to `<filename>` in binary format                                                                                                                                                                                                                                                                             |
| `--load`          | Load a prepaired `tx` from `<filename>` in binary format                                                                                                                                                                                                                                                                                       |
| `--gasprice`      | Calculate gas price. It shows the tokens, you can buy it for, as well as the gas price in those tokens                                                                                                                                                                                                                                         |
| `--estimate`      | Estimate fee and gas. The command executes the contract locally                                                                                                                                                                                                                                                                                |
| `--showtx`        | Display a `tx`                                                                                                                                                                                                                                                                                                                                 |
| `--sign`          | Sign a transaction                                                                                                                                                                                                                                                                                                                             |
| `--submit`        | Send a transaction to the node                                                                                                                                                                                                                                                                                                                 |
| `--ss`            | Sign and submit by one command                                                                                                                                                                                                                                                                                                                 |

### Storage part commands

| Command            | Description                                                                                                                                                                                                                                                                                   |
|--------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| -h, --host         | Tpnode's base address, use `httpsi` as a protocol for ssl without certificate verification [default: `http://127.0.0.1:49841`]                                                                                                                                                                |
| `--hexkey`         | Keyfile. You can specifiy a key in `HEX` format (as it is stored in the keyfile) in the command line                                                                                                                                                                                          |
| `-k`, `--keyfile`  | Path to a key file                                                                                                                                                                                                                                                                            |
| `--mkmanifest`     | Make `manifest.json` for a specified directory                                                                                                                                                                                                                                                |
| `--newstoragetask` | Create a new storage task `<bucket name>` (specify a contract name to work with)                                                                                                                                                                                                              |
| `--manifest`       | Specify another manifest filename [default: manifest.json]                                                                                                                                                                                                                                    |
| `--interval`       | Store interval for a `newstoragetask` [default: 1 year]. The following intervals are supported:<br/>- year (365 days);<br/>- mon (30 days);<br/>- week (7 days);<br/>- day;<br/>- hour;<br/>- min;<br/>- sec.<br/>You can group several intervals into one, for example: `1 year 3 mon 2 week 3 min` |
| `--transfer`       | Transfer amount and currency for a `newstoragetask`, for example: `10 SK`                                                                                                                                                                                                                     |
| `--gas`            | Specify gas manually                                                                                                                                                                                                                                                                          |
| `--get_task`       | Get task info for a task by `<task id>`                                                                                                                                                                                                                                                       |
| `--newprovider`    | Create new storage provider with `<baseurl>` or `<baseurl,uploadurl>` as arguments                                                                                                                                                                                                            |
| `--showtx`        | Display a `tx`                                                                                                                                                                                                                                                                                                                                 |
| `--sign`          | Sign a transaction                                                                                                                                                                                                                                                                                                                             |
| `--submit`        | Send a transaction to the node                                                                                                                                                                                                                                                                                                                 |
| `--ss`            | Sign and submit by one command                                                                                                                                                                                                                                                                                                                 |
| `<address>` | Storage contract address |