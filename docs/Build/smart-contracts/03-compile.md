# Compile smart contract

Before proceeding further, make sure that the top folder looks like this:

```
power
power-ui
sc_vote_simple
```

If ok. Go to console in folder sc_vote_simple and do and type the compilation command:

```bash
cargo build --release --target wasm32-unknown-unknown
```

Then you will need to go to the directory in which the compiled WASM file appeared. It will be further located at the following address:

```bash
cd target/wasm32-unknown-unknown/release/
```

Then launch the file size reduction utility:

```bash
wasm-snip ./sc_vote_simple.wasm -o sc_vote_simple.wasm
```

And then start compression:

```bash
lz4 -16 -f sc_vote_simple.wasm
```

As a result you get sc_vote_simple.lz4 file, which you will list (deploy) in the blockchain.
