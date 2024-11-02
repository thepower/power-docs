# Running EVM code without deployment

## Introduction

This feature allows you to run EVM code without deployment using `tp` CLI.

:::tip Note

To learn how to work with `tp` CLI, see the `tp` CLI docs [here](/docs/cli/01-tp-cli.md).

:::

## Example

Let's assume we've created the following JSON:

```json
{
  "ver": 2,
  "kind": "generic",
  "from": "AA100002352165710021",
  "to": "AA100002352165710021",
  "t": "NOW",
  "seq": 1,
  "payload": [
    [1, "SK", 0.5],
    [3, "SK", 0.2]
  ],
  "call": {
    "function": "0x0",
    "args": [
      "0x587A8133000000000000000000000000000000000000000000000000800140057A00010A00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000A0000000000000000000000000000000000000000000000000000000000000016000000000000000000000000000000000000000000000000000000000000000041AA3A0080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000848E250F2000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000474657374000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000848E250F20000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000005746573743200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
    ]
  },
  "txext": {
    "vm": "evm",
    "code": "hex@build/QuickReg.bin-runtime"
  }
}
```

:::tip

You can create your own JSON based on this or other examples, that you can generate using the following command:

```bash
tp --example
```

:::

Now, let's compile code using the following command:

```bash
solc contracts/QuickReg.sol -o build --overwrite --bin-runtime
```

:::info Note

`--bin-runtime` key creates a runtime binary file that can be run without deployment.

:::

The contract in this example looks like this:

```solidity
pragma solidity ^0.8.20;

contract QuickReg {
    function reg(address to,bytes[] calldata args) public returns (uint256) {
        for(uint i=0;i<args.length;i++){
            (bool success,) = address(to).call(args[i]);
            require(success,"call unsuccessfull");
        }
        return 1;
    }
}
```

In this example the contract is used to atomize a number of transactions. It means that all transactions revert if any internal transaction returns `revert`.

You can also use your runtime code for other purposes, such as complex deployment.

:::warning Attention

After you've created a contract (`QuickReg.sol`) in our example, you have to pass it to `"code"` field in your JSON like this:

```json
"code": "hex@build/QuickReg.bin-runtime"
```

:::
