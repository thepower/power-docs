# Configuring archivers

The wasmcode turns out to be voluminous after compilation, which makes it difficult to work with the blockchain, so we need to make a couple moves to reduce the size of the code.

There are several utilities that may help you remove unnecessary code from a file. Unfortunately, they change quite often. The most recent options can always be found on the page

Shrinking .wasm Code Size of the “Rust and WebAssembly” documentation.

Currently, the best option found is to use the wasm-snip utility and zip the lz4 file.

```bash
cargo install wasm-snip
```

OS X:

```bash
brew install lz4
```

Ubuntu:

```bash
sudo apt-get install -y liblz4-1
```
