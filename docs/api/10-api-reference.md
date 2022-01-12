# API reference

- "extra" - additional information of the signing node (for example timestamp);
- "binextra" - the same additional information in the original binary form (for verifying the signature);
- "nodeid" - the identifier of the node that issued the signature (it is computed from pubkey);
- "signature" - a signature.

## /status

Purpose: through this API you can find out your ip address.

Request type: GET Response: client (string): ip client address Example of use:

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

Purpose: the current status of the addressed node

Request type: GET

Response:
status (object): An object with a report on the current work of the node

Fields of the object status:

- blockchain (object):
- nodeid (string): node identifier
- public_key (string): public node key
- sync_peers (array of strings): identifiers of neighboring nodes with which communication is established
- ver (string): node software version

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

Purpose: the definition of chain belonging to address

- `{address}` `(string)`: the address of the wallet in a textual or binary representation in the form of hex.

Response:

- chain `(integer)`: the number of the wallet related chain
- address `(string)`: the address converted to a binary representation
- txtaddress `(string)`: the address converted to a text representation
