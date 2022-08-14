# Setting up the environment

Rust Installer - `https://www.rust-lang.org/tools/install`

Currently Rust works with wasm in a nightly build only. You can choose working with nightly build while installing Rust

```bash
Customize installation
Default toolchain? (stable/beta/nightly/none)
nightly
or right after the installation is done with the command
```

```bash
rustup default nightly
```

After the night build is chosen, you should add the following to target for compiling to wasm

```bash
rustup target add wasm32-unknown-unknown --toolchain nightly
```

Eventually, you need to add two libraries to the folder, in which you plan to create projects:

GitHub - `https://github.com/thepower/tp_rust_lib.git` Rust Libraries for WASM

NOTE: It is not recommended to install Rust on pure Windows. The best option for running Rust on a Windows 10 is to install Rust in Windows Subsystem for Linux.
