# Create and prepare a smart contract

First of all, you need to create and prepare your smart contract to work with it. To do this:

1. Install Solidity compiler by running the following command:

   ```bash
   npm install -g solc
   ```

2. Ensure you are in `dcloud_example` directory.
3. Open a smart contract file `greeter.sol`, which contains the following code:

   ```solidity
   //SPDX-License-Identifier: Unlicense
    pragma solidity ^0.8.13;
    contract Greeter {
    string private greeting;

	constructor() {
		greeting = 'Hello World!';
	}

	function greet() public view returns (string memory) {
		return greeting;
	}
	
	function setGreeting(string memory _greeting) public {
		greeting = _greeting;
	}
   }
   ```

   The main actions in this code example:

    1. Declaration of a new contract variable, where the `greeting` variable will be stored:

       ```solidity
       string private greeting;
       ```

    2. Declaration of contract inner variable, where the `greeting` variable will be stored:

       ```solidity
       constructor() {
         greeting = 'Hello World!';
       }
       ```

       When you create a smart contract, the `greeting` variable is initialized with a classical `Hello World!` text.

    3. The `greet()` function returns the current greeting.
    4. The `setGreeting()` function replaces the current greeting with a new one.

4. Compile the given code. You will receive an `.abi` file:

   Run the following commands in the directory, where the `greeter.sol` file is stored:

    1. ```solidity
         solcjs --bin greeter.sol
       ```

       As a result you will get a `greeter_sol_Greeter.bin` file.

    2. You can also find `greeter_sol_Greeter.json` that you will need in further steps.