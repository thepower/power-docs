# How to configure TP-Node?

## Table of Contents

   - [What is `node.config` and `genesis.txt`?](#what-is-nodeconfig-and-genesistxt)
   - [`node.config` example](#nodeconfig-description)
   - [`genesis.txt` example](#genesistxt-example)
   - [Generation of `genesis.txt`](#generation-of-genesistxt)

## What is `node.config` and `genesis.txt`?

Despite each node having the same software, there are two critical files:

- `genesis.txt` — the chain configuration file. You need this configuration file only when you start up a chain for the first time. When the chain is started up, the zero-block should be created. The zero-block should contain all the necessary settings, as well as the current configuration (which nodes are now present in the chain). To create the zero-block, you need to add the nodes' cryptographic signatures to the data that `genesis.txt` contains. All the nodes in the chain use the same Genesis file.
- `node.config` — the node configuration file. This file is unique for each node. It has two basic settings:

    - The node private key.
    - Networking. Here you tell the node, how should it work with the network and where should it find the information about other nodes in the chain.


## `node.config` example

> **Note**
> 
> `node.config` file has Erlang-formatted syntax.

Here is an example of a `node.config` file:

```erlang
{tpic,#{peers => [{"node2", 43218},{"node3", 43219}], port => 43217, allow_rfc1918 => true}}. 
{hostname, "node1"}. 
{discovery,#{addresses =>[
  #{address => "node1", port => 43217, proto => tpic},
  #{address => "node1", port => 43390, proto => apis},
  #{address => "node1", port => 43290, proto => api}
]}}.
{privkey, <<"670270653FBBBC3AF41EF92CECF120CFB27F3D3C8E2D6032433E60A4016BC692">>}.
{rpcport, 43290}.
{rpcsport, 43390}.
{tpic_port, 43217}.
{dbsuffix,"_node1"}.
{dbpath,"db1"}.
{crosschain, #{ port => 43312, connect => [ {"other_chain_node.example.com", 43312} ] }}.
```

| Parameter    | Description                                                                                                                                                                                                                                                                                                           | Options                                                                                                                                                                                                                                          |
|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `tpic`       | Node interconnection protocol. It describes the way the nodes search for each other and connect to each other. For the first connection you need at least one node.                                                                                                                                                   | `"node2"`, `"node3"`, ... — node names<br /> `43218`, `43219` — port to connect to (you can use any port)<br />  `allow_rfc1918` — this options turns off filtering of "grey" IP addresses. It will likely be deprecated under actual operation. |
| `hostname`   | Hostname.                                                                                                                                                                                                                                                                                                             | `"node1"`                                                                                                                                                                                                                                        |
| `address`    | Here you need to specify an IP address indtead of `"node1"`.                                                                                                                                                                                                                                                          | `"node1"`                                                                                                                                                                                                                                        |
| `port`       | Here you need to specify the port to connect to.                                                                                                                                                                                                                                                                      | You can specify any free port.                                                                                                                                                                                                                   |
| `proto`      | Here you need to specify, which protocol will be used.                                                                                                                                                                                                                                                                | `tpic` — node interconnection protocol. <br />`api` — the external interactions protocol. <br />`apis` — secured external interactions protocol. You need an SSL-certificate to use `apis`.                                                      |
| `privkey`    | Private encryption key. This key is generated and should be securely stored on the node. Currently, the private keys are generated with `genesis.txt` and then placed on the corresponding nodes, but such an implementation poses security risks. This implementation will be replaced with a tea ceremony algorithm. | -                                                                                                                                                                                                                                                |
| `rpcport`    | Same as `api` port.                                                                                                                                                                                                                                                                                                   | -                                                                                                                                                                                                                                                |
| `rpcsport`   | Same as `apis` port.                                                                                                                                                                                                                                                                                                  | -                                                                                                                                                                                                                                                |
| `tpic_port`  | Same as `tpic` port.                                                                                                                                                                                                                                                                                                  | -                                                                                                                                                                                                                                                |
| `crosschain` | Used for interchain interactions. You need to specify the port and the node to connect to.                                                                                                                                                                                                                            | -                                                                                                                                                                                                                                                |
| `dbsuffix`   | This parameter is used to avoid using DockerID in the directory name when using Docker.                                                                                                                                                                                                                               |
| `dbpath`     | Path to database.                                                                                                                                                                                                                                                                                                     |


## `genesis.txt` example

```erlang
#{bals => #{},etxs => [],failed => [],
  hash =>
      <<>>,
  header =>
      #{chain => 105,height => 0,
        parent => <<0,0,0,0,0,0,0,0>>,
        roots =>
            [{setroot,<<>>}],
        ver => 2},
  settings =>
      [{<<"">>,
        #{body =>
              <<>>,
          kind => patch,
          patches =>
              [#{<<"p">> => [<<"chains">>],
                 <<"t">> => <<"list_add">>,<<"v">> => 105},
               #{<<"p">> => [<<"keys">>,<<"c105n1">>],
                 <<"t">> => <<"set">>,
                 <<"v">> =>
                     <<>>},
               #{<<"p">> => [<<"keys">>,<<"c105n10">>],
                 <<"t">> => <<"set">>,
                 <<"v">> =>
                     <<2,190,116,33,130,241,25,150,102,161,1,183,199,115,181,
                               20,233,126,51,3,16,67,157,64,59,153,151,32,24,186,28,
                               143,223>>},
               #{<<"p">> => [<<"keys">>,<<"c105n2">>],
                 <<"t">> => <<"set">>,
                 <<"v">> =>
                     <<>>},
               #{<<"p">> => [<<"keys">>,<<"c105n3">>],
                 <<"t">> => <<"set">>,
                 <<"v">> =>
                     <<>>},
               #{<<"p">> => [<<"keys">>,<<"c105n4">>],
                 <<"t">> => <<"set">>,
                 <<"v">> =>
                     <<>>},
               #{<<"p">> => [<<"keys">>,<<"c105n5">>],
                 <<"t">> => <<"set">>,
                 <<"v">> =>
                     <<>>},
               #{<<"p">> => [<<"keys">>,<<"c105n6">>],
                 <<"t">> => <<"set">>,
                 <<"v">> =>
                     <<>>},
               #{<<"p">> => [<<"keys">>,<<"c105n7">>],
                 <<"t">> => <<"set">>,
                 <<"v">> =>
                     <<>>},
               #{<<"p">> => [<<"keys">>,<<"c105n8">>],
                 <<"t">> => <<"set">>,
                 <<"v">> =>
                     <<>>},
               #{<<"p">> => [<<"keys">>,<<"c105n9">>],
                 <<"t">> => <<"set">>,
                 <<"v">> =>
                     <<>>},
               #{<<"p">> => [<<"nodechain">>,<<"c105n1">>],
                 <<"t">> => <<"set">>,<<"v">> => 105},
               #{<<"p">> => [<<"nodechain">>,<<"c105n10">>],
                 <<"t">> => <<"set">>,<<"v">> => 105},
               #{<<"p">> => [<<"nodechain">>,<<"c105n2">>],
                 <<"t">> => <<"set">>,<<"v">> => 105},
               #{<<"p">> => [<<"nodechain">>,<<"c105n3">>],
                 <<"t">> => <<"set">>,<<"v">> => 105},
               #{<<"p">> => [<<"nodechain">>,<<"c105n4">>],
                 <<"t">> => <<"set">>,<<"v">> => 105},
               #{<<"p">> => [<<"nodechain">>,<<"c105n5">>],
                 <<"t">> => <<"set">>,<<"v">> => 105},
               #{<<"p">> => [<<"nodechain">>,<<"c105n6">>],
                 <<"t">> => <<"set">>,<<"v">> => 105},
               #{<<"p">> => [<<"nodechain">>,<<"c105n7">>],
                 <<"t">> => <<"set">>,<<"v">> => 105},
               #{<<"p">> => [<<"nodechain">>,<<"c105n8">>],
                 <<"t">> => <<"set">>,<<"v">> => 105},
               #{<<"p">> => [<<"nodechain">>,<<"c105n9">>],
                 <<"t">> => <<"set">>,<<"v">> => 105},
               #{<<"p">> => [<<"current">>,<<"chain">>,<<"blocktime">>],
                 <<"t">> => <<"set">>,<<"v">> => 3},
               #{<<"p">> => [<<"current">>,<<"chain">>,<<"minsig">>],
                 <<"t">> => <<"set">>,<<"v">> => 6},
               #{<<"p">> => [<<"current">>,<<"chain">>,<<"allowempty">>],
                 <<"t">> => <<"set">>,<<"v">> => 0},
               #{<<"p">> => [<<"current">>,<<"chain">>,<<"patchsigs">>],
                 <<"t">> => <<"set">>,<<"v">> => 6},
               #{<<"p">> => [<<"current">>,<<"allocblock">>,<<"block">>],
                 <<"t">> => <<"set">>,<<"v">> => 105},
               #{<<"p">> => [<<"current">>,<<"allocblock">>,<<"group">>],
                 <<"t">> => <<"set">>,<<"v">> => 10},
               #{<<"p">> => [<<"current">>,<<"allocblock">>,<<"last">>],
                 <<"t">> => <<"set">>,<<"v">> => 0},
               #{<<"p">> =>
                     [<<"current">>,<<"endless">>,
                      <<>>,
                      <<"SK">>],
                 <<"t">> => <<"set">>,<<"v">> => true},
               #{<<"p">> =>
                     [<<"current">>,<<"endless">>,
                      <<>>,
                      <<"TST">>],
                 <<"t">> => <<"set">>,<<"v">> => true},
               #{<<"p">> => [<<"current">>,<<"freegas">>],
                 <<"t">> => <<"set">>,<<"v">> => 2000000},
               #{<<"p">> => [<<"current">>,<<"gas">>,<<"SK">>],
                 <<"t">> => <<"set">>,<<"v">> => 1000},
               #{<<"p">> => [<<"current">>,<<"nosk">>],
                 <<"t">> => <<"set">>,<<"v">> => 1}],
          sig =>
              [],
          ver => 2}}],
  sign =>
      [],
  txs => []}.
```

where 

1. the node name and private key is specified:

    ```erlang
        #{<<"p">> => [<<"keys">>,<<"c103n5">> <!--Node name-->],
                         <<"t">> => <<"set">>,
                         <<"v">> =>
                             <<2,190,116,33,130,241,25,150,102,161,1,183,199,115,181,
                               20,233,126,51,3,16,67,157,64,59,153,151,32,24,186,28,
                               143,223>>}<!--Node private key-->,
        ```

2. `minsig` parameter is specified. `minsig` is the minimum number of signatures needed for consensus in the chain. 
    
    > **Note**
    > 
    > A value of less than a half of a total number of nodes in a chain is not allowed. The value can be considered as valid if it is more than a half of a total number of nodes in the chain plus one node.

    ```erlang
    #{<<"p">> => [<<"current">>,<<"chain">>,<<"minsig">>],
                  <<"t">> => <<"set">>,<<"v">> => 6},
    ```

3. `patchsig` parameter is specified. `patchsig` is the minimum number of signatures needed for a chain patch transaction:

    ```erlang
    #{<<"p">> => [<<"current">>,<<"chain">>,<<"patchsigs">>],
                 <<"t">> => <<"set">>,<<"v">> => 6},
    ```
   
4. `blocktime` parameter is specified. `blocktime` is the time needed to create a new block. Default time is 15 seconds:

   ```erlang
   #{<<"p">> => [<<"current">>,<<"chain">>,<<"blocktime">>],
                 <<"t">> => <<"set">>,<<"v">> => 3},
   ``` 
   
| Parameter | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Example |
|-----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| `p`       | Path. All settings are represented as a tree, like the file system, where a file location is designated with a path                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `#{<<"p">> => [<<"current">>,<<"chain">>,<<"blocktime">>],`        |
| `t`       | Instruction type. In example you can see the instruction type `<<"set">>, <<"v">>`, which means "Set Value"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `<<"t">> => <<"set">>,<<"v">> => 3}` |
| `v`       | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `<<"v">> => 3` |
| `set`     | Multi-purpose working approach to such the value storage mode. There is an option to modify the chain settings by a patch. Such a patch allows you to delete variables, rename them, and update the variable values. Note, that the values are not updated or deleted during the initial setup. That is why the action type `set` is used. | `<<"t">> => <<"set">>,<<"v">> => 3}` |

## Generation of `genesis.txt`

> **Note**
> 
> Before you start, ensure that you have TPNode installed on your machine.

To generate `genesis.txt`:

1. Ensure you have Erlang installed on your machine.
2. Open Erlang console and run the following command:

   ```erlang
   genesis_easy:make_example(105,10).
   ```

   where:

    - `105` — chain number,
    - `10` — number of nodes in chain.

   `make_example` creates a template file with Genesis parameters.

3. Open the template file.
4. Fill in the Genesis parameters.
5. Create the Genesis file by running the following command:

  ```erlang
  genesis_easy:make_genesis(105).
  ```

where:

- `105` — chain number

After generation, Genesis will be saved into `your_chain_genesis.txt` file:

```erlang
#{bals => #{},etxs => [],failed => [],
  hash =>
      <<>>,
  header =>
      #{chain => 105,height => 0,
        parent => <<0,0,0,0,0,0,0,0>>,
        roots =>
            [{setroot,<<>>}],
        ver => 2},
  settings =>
      [{<<"">>,
        #{body =>
              <<>>,
          kind => patch,
          patches =>
              [#{<<"p">> => [<<"chains">>],
                 <<"t">> => <<"list_add">>,<<"v">> => 105},
               #{<<"p">> => [<<"keys">>,<<"c105n1">>],
                 <<"t">> => <<"set">>,
                 <<"v">> =>
                     <<>>},
               #{<<"p">> => [<<"keys">>,<<"c105n10">>],
                 <<"t">> => <<"set">>,
                 <<"v">> =>
                     <<>>},
               #{<<"p">> => [<<"keys">>,<<"c105n2">>],
                 <<"t">> => <<"set">>,
                 <<"v">> =>
                     <<>>},
               #{<<"p">> => [<<"keys">>,<<"c105n3">>],
                 <<"t">> => <<"set">>,
                 <<"v">> =>
                     <<>>},
               #{<<"p">> => [<<"keys">>,<<"c105n4">>],
                 <<"t">> => <<"set">>,
                 <<"v">> =>
                     <<>>},
               #{<<"p">> => [<<"keys">>,<<"c105n5">>],
                 <<"t">> => <<"set">>,
                 <<"v">> =>
                     <<>>},
               #{<<"p">> => [<<"keys">>,<<"c105n6">>],
                 <<"t">> => <<"set">>,
                 <<"v">> =>
                     <<>>},
               #{<<"p">> => [<<"keys">>,<<"c105n7">>],
                 <<"t">> => <<"set">>,
                 <<"v">> =>
                     <<>>},
               #{<<"p">> => [<<"keys">>,<<"c105n8">>],
                 <<"t">> => <<"set">>,
                 <<"v">> =>
                     <<>>},
               #{<<"p">> => [<<"keys">>,<<"c105n9">>],
                 <<"t">> => <<"set">>,
                 <<"v">> =>
                     <<>>},
               #{<<"p">> => [<<"nodechain">>,<<"c105n1">>],
                 <<"t">> => <<"set">>,<<"v">> => 105},
               #{<<"p">> => [<<"nodechain">>,<<"c105n10">>],
                 <<"t">> => <<"set">>,<<"v">> => 105},
               #{<<"p">> => [<<"nodechain">>,<<"c105n2">>],
                 <<"t">> => <<"set">>,<<"v">> => 105},
               #{<<"p">> => [<<"nodechain">>,<<"c105n3">>],
                 <<"t">> => <<"set">>,<<"v">> => 105},
               #{<<"p">> => [<<"nodechain">>,<<"c105n4">>],
                 <<"t">> => <<"set">>,<<"v">> => 105},
               #{<<"p">> => [<<"nodechain">>,<<"c105n5">>],
                 <<"t">> => <<"set">>,<<"v">> => 105},
               #{<<"p">> => [<<"nodechain">>,<<"c105n6">>],
                 <<"t">> => <<"set">>,<<"v">> => 105},
               #{<<"p">> => [<<"nodechain">>,<<"c105n7">>],
                 <<"t">> => <<"set">>,<<"v">> => 105},
               #{<<"p">> => [<<"nodechain">>,<<"c105n8">>],
                 <<"t">> => <<"set">>,<<"v">> => 105},
               #{<<"p">> => [<<"nodechain">>,<<"c105n9">>],
                 <<"t">> => <<"set">>,<<"v">> => 105},
               #{<<"p">> => [<<"current">>,<<"chain">>,<<"blocktime">>],
                 <<"t">> => <<"set">>,<<"v">> => 3},
               #{<<"p">> => [<<"current">>,<<"chain">>,<<"minsig">>],
                 <<"t">> => <<"set">>,<<"v">> => 6},
               #{<<"p">> => [<<"current">>,<<"chain">>,<<"allowempty">>],
                 <<"t">> => <<"set">>,<<"v">> => 0},
               #{<<"p">> => [<<"current">>,<<"chain">>,<<"patchsigs">>],
                 <<"t">> => <<"set">>,<<"v">> => 6},
               #{<<"p">> => [<<"current">>,<<"allocblock">>,<<"block">>],
                 <<"t">> => <<"set">>,<<"v">> => 105},
               #{<<"p">> => [<<"current">>,<<"allocblock">>,<<"group">>],
                 <<"t">> => <<"set">>,<<"v">> => 10},
               #{<<"p">> => [<<"current">>,<<"allocblock">>,<<"last">>],
                 <<"t">> => <<"set">>,<<"v">> => 0},
               #{<<"p">> =>
                     [<<"current">>,<<"endless">>,
                      <<>>,
                      <<"SK">>],
                 <<"t">> => <<"set">>,<<"v">> => true},
               #{<<"p">> =>
                     [<<"current">>,<<"endless">>,
                      <<>>,
                      <<"TST">>],
                 <<"t">> => <<"set">>,<<"v">> => true},
               #{<<"p">> => [<<"current">>,<<"freegas">>],
                 <<"t">> => <<"set">>,<<"v">> => 2000000},
               #{<<"p">> => [<<"current">>,<<"gas">>,<<"SK">>],
                 <<"t">> => <<"set">>,<<"v">> => 1000},
               #{<<"p">> => [<<"current">>,<<"nosk">>],
                 <<"t">> => <<"set">>,<<"v">> => 1}],
          sig =>
              [],
          ver => 2}}],
  sign =>
      [],
  txs => []}.
```

After you have gone through all the steps above, rename Genesis file as `genesis.txt` and copy it to all nodes in the chain.

Also copy the corresponding private keys for each node from file `your_chain_keys.txt` to `node.config`.