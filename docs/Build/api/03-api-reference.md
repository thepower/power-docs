# API reference

## The main terms

- `extra` — additional information of the signing node (timestamp, for example);
- `binextra` — the same additional information in the original binary form (for verifying the signature);
- `nodeid` — the identifier of the node that has issued the signature. The signature is calculated from public key;
- `signature` — a signature.

## /api/address/{address}/code

`/api/address/{address}/code` allows users to see the smart contract code and storage content. 

The difference between `/api/address/{address}` and `/api/address/{address}/code` is that if the smart contract is deployed on an address, `/api/address/{address}` will show only the code length and won't show the storage content.

**Example**

```bash
 curl https://testnet2.thepower.io:45011/api/address/AA100000003355443673/code > address.ext
```

where

- `testnet2.thepower.io` — testnet address;
- `45011` — port;
- `AA100000003355443673` — smart contract address.

Response type — binary (`binary/octet-stream`): 

```bash

~ % curl https://testnet2.thepower.io:45011/api/address/AA100000003355443673/code > address.ext
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    25  100    25    0     0     45      0 --:--:-- --:--:-- --:--:--    45
```

If there is no key or code, error 404 will appear.

## /api/address/{address}/state/0x{hex key}

`/api/address/{address}/state/0x{hex key}` is an endpoint for showing the data according to the `0x{hex key}`.

**Example**

```bash
~ % curl https://testnet2.thepower.io:45011/api/address/AA100000003355443673/state/0x00 | od -x
```

where

- `testnet2.thepower.io` — testnet address. Replace it with your testnet address;
- `45011` — port. Replace it with your port;
- `AA100000003355443673` — smart contract address. Replace it with your smart contract address;
- `0x00` — Hex representation of requested contract storage key.

Response type — binary:

```bash
~ % curl https://testnet2.thepower.io:45011/api/address/AA100000003355443673/state/0x00 | od -x
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100     1  100     1    0     0      2      0 --:--:-- --:--:-- --:--:--     2
0000000      0003                                                        
0000001
```

## /api/binblock/{hash}

`/api/binblock/{hash}` is a verifiable block in binary format, where:

- `{hash}` — block hash. Replace it with your hash.

Instead of block hash you can also use:

- `genesis` — defines the first block;
- `last` — defines the last block.

**Examples**

Try the following links to see how it works:

- ```bash
   https://testnet2.thepower.io:45011/api/binblock/101557C3F67DBC2AF88E86FBFC9B34DB033804BB3D926F6B354F25A6BCFE05CF | od -x
   ```

   where

   - `testnet2.thepower.io` — testnet address. Replace it with your testnet address;
   - `45011` — port. Replace it with your port;
   - `101557C3F67DBC2AF88E86FBFC9B34DB033804BB3D926F6B354F25A6BCFE05CF` — block hash. Replace it with your block hash.

   Response type — binary:

   ```bash
   ~ % curl https://testnet2.thepower.io:45011/api/binblock/101557C3F67DBC2AF88E86FBFC9B34DB033804BB3D926F6B354F25A6BCFE05CF | od -x
    % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
    Dload  Upload   Total   Spent    Left  Speed
    100  1603  100  1603    0     0   3940      0 --:--:-- --:--:-- --:--:--  3997
    0000000      c48b    6204    6c61    8173    08c4    00a0    0000    0000
    0000020      0000    0ac4    c481    6106    6f6d    6e75    8074    05c4
    0000040      6863    6c69    c464    9d20    f51a    4339    96f7    5a15
    0000060      0591    581e    6b0a    e362    6124    f753    0623    7b66
    0000100      759d    f8fc    3301    c4d8    6504    7874    a073    07c4
    0000120      7865    6474    7461    9161    c492    7009    6572    6e76
    0000140      646f    7365    c4a0    6606    6961    656c    a064    04c4
    0000160      6168    6873    20c4    1510    c357    7df6    2abc    8ef8
    0000200      fb86    9bfc    db34    3803    bb04    923d    6b6f    4f35
    0000220      a625    febc    cf05    06c4    6568    6461    7265    c485
    0000240      6305    6168    6e69    c402    6806    6965    6867    0174
    0000260      06c4    6170    6572    746e    20c4    8eb5    f368    3886
    0000300      9086    56ec    b717    2113    421c    1e33    d58f    9d4f
    0000320      c6e1    377d    7575    2213    ef08    05c4    6f72    746f
    0000340      9673    c492    730d    7465    6974    676e    5f73    6168
    0000360      6873    20c4    1911    209c    77fc    bb5a    a711    2c07
    0000400      753e    bbfe    e073    f546    2f15    f744    8914    ae7c
    0000420      398c    a723    c492    6207    6c61    6f72    746f    20c4
    0000440      3518    efb5    29ae    ff36    8868    516f    7014    6aeb
    0000460      4929    f9da    002c    b2b5    8483    6d3f    9ce0    a5f7
    0000500      c492    6c0b    6465    6567    5f72    6168    6873    20c4
    0000520      a2d5    744a    5b4d    dda4    3679    3835    c576    149c
    0000540      b3d3    33e1    057b    4e52    55f3    e900    d038    4172
    0000560      c492    7307    7465    6f72    746f    20c4    0921    c603
    0000600      e918    c666    d47f    53a0    1e1d    0d22    b597    1050
    0000620      551a    46e0    ca61    a1d7    2a87    43ed    c492    6507
    0000640      746e    6f72    7970    00c4    c492    6d09    6165    5f6e
    0000660      6974    656d    08c4    0000    8301    98cc    f070    03c4
    0000700      6576    0272    08c4    756f    6274    756f    646e    c4a0
    0000720      7308    7465    6974    676e    8173    13c4    7056    7658
    0000740      6b45    617a    6759    6e57    5135    632d    6e32    c531
    0000760      bc02    a483    6f62    7964    01c5    8360    65a1    a180
    0001000      136b    70a1    8396    01c4    9270    04c4    656b    7379
    0001020      07c4    3263    316e    652e    c464    7401    03c4    6573
    0001040      c474    7601    2cc4    2a30    0530    0306    652b    0370
    0001060      0021    1c91    f0eb    a42e    cfac    4ef8    7b9c    b3d7
    0001100      4a24    ca0d    bc36    f2ac    979c    442d    9b8e    c76b
    0001120      c947    c483    7001    c492    6b04    7965    c473    6307
    0001140      6e32    2e32    6465    01c4    c474    7303    7465    01c4
    0001160      c476    302c    302a    0605    2b03    7065    2103    be00
    0001200      85f8    4a19    eb28    fec3    00e3    27b1    2912    eb71
    0001220      b343    69e7    436a    52e0    7f13    86cc    650a    835a
    0001240      01c4    9270    04c4    656b    7379    07c4    3263    336e
    0001260      652e    c464    7401    03c4    6573    c474    7601    2cc4
    0001300      2a30    0530    0306    652b    0370    0021    7c44    da7a
    0001320      715d    2ae3    fb2a    1574    17b1    16b4    642f    b280
    0001340      d051    c7e1    80d6    e855    38a8    1e7c    c483    7001
    0001360      c492    6e09    646f    6365    6168    6e69    07c4    3263
    0001400      316e    652e    c464    7401    03c4    6573    c474    7601
    0001420      8302    01c4    9270    09c4    6f6e    6564    6863    6961
    0001440      c46e    6307    6e32    2e32    6465    01c4    c474    7303
    0001460      7465    01c4    0276    c483    7001    c492    6e09    646f
    0001500      6365    6168    6e69    07c4    3263    336e    652e    c464
    0001520      7401    03c4    6573    c474    7601    a302    6973    9367
    0001540      6bc4    46ff    4430    2002    e67d    5823    5c55    7c71
    0001560      5069    ecb4    15f1    657c    fb5c    4685    9829    68b0
    0001600      9774    24e8    b583    359c    2002    8e64    0ce7    d4c8
    0001620      60b1    c0dc    eb2d    e637    02ac    1141    18ec    a9b3
    0001640      f2b9    69f3    35f1    993a    f17b    2102    d503    b1e1
    0001660      3eff    2c50    9d12    a9f4    ff46    419b    3091    1318
    0001700      3453    6929    321d    f7fc    14a3    a3be    c476    ff6c
    0001720      3047    0245    0720    e411    cdef    04ef    fbe6    43eb
    0001740      48f7    4f0d    ffb2    7d2a    d438    62f8    1320    b7fc
    0001760      8891    b891    0248    0021    4f88    e165    f62e    10b8
    0002000      3953    d531    c63c    ec78    c938    47d6    482b    73eb
    0002020      53d0    a301    fbd1    043b    2102    7902    b42b    2d13
    0002040      b080    fdaa    9e12    7213    75e6    ec79    a388    4a56
    0002060      3398    4708    2e38    a600    3154    c409    ff6c    3047
    0002100      0245    0021    9aa0    2cb5    d956    78b2    ff30    bf8c
    0002120      719f    0f3b    d938    a9e9    68ff    e7f4    ef61    822f
    0002140      0eac    8081    2002    fd41    8e8a    1c37    6efa    ba30
    0002160      b549    8e8d    eacd    d28a    fba7    f2da    8c8c    4172
    0002200      b266    eb3a    cc57    2102    a202    d165    c21d    b659
    0002220      d160    f07f    d3db    2319    a1a3    7d4e    c364    2ce6
    0002240      389d    d53e    d623    efdc    a311    6576    0272    04c4
    0002260      6973    6e67    c493    ff81    3048    0246    0021    d0eb
    0002300      3744    71d6    b5bb    6ce5    ced7    7316    c2bd    53f3
    0002320      1d03    9f47    d401    2dfd    dad6    ba84    b704    2102
    0002340      e300    1a16    8046    e3cb    98e2    12e6    02db    a5bc
    0002360      ae63    97a8    6703    4446    2d6d    329e    75b8    19d8
    0002400      02f6    0221    2b79    13b4    802d    aab0    12fd    139e
    0002420      e672    7975    88ec    56a3    984a    0833    3847    002e
    0002440      54a6    0931    0801    0000    8301    98cc    d471    0803
    0002460      0000    0000    6401    87b9    80c4    47ff    4530    2002
    0002500      e864    f029    943a    34e0    2496    1100    715e    9061
    0002520      42d0    07b3    73e7    84a8    cad2    3d2a    8f99    5700
    0002540      2102    f000    597e    75e7    7f5d    d40a    1f6b    26a2
    0002560      8d98    7a3a    29fc    3eb6    0c0d    9fec    cd5f    22c0
    0002600      3c8c    02d5    0221    65a2    1dd1    59c2    60b6    7fd1
    0002620      dbf0    19d3    a323    4ea1    647d    e6c3    9d2c    3e38
    0002640      23d5    dcd6    11ef    0801    0000    8301    98cc    d171
    0002660      0803    0000    0000    9d00    ab41    81c4    48ff    4630
    0002700      2102    9e00    3f4d    41ae    7e5f    c244    2e28    55d7
    0002720      5aa4    c3ae    4a58    a6c7    9282    7d69    2c90    1d16
    0002740      5643    02a4    0021    1faa    984f    b4b8    2ffb    d804
    0002760      6ae6    e4df    d19e    01e6    5218    55a6    5615    51fd
    0003000      6156    b327    ebd1    2102    d503    b1e1    3eff    2c50
    0003020      9d12    a9f4    ff46    419b    3091    1318    3453    6929
    0003040      321d    f7fc    14a3    a3be    0176    0008    0100    cc83
    0003060      7198    03d7    0008    0000    0000    f753    c442    7403
    0003100      7378    00a0                                                
    0003103
    ```

- ```bash
  curl https://testnet2.thepower.io:45011/api/binblock/genesis | od -x 
  ```
    
   where

   - `testnet2.thepower.io` — testnet address. Replace it with your testnet address;
   - `45011` — port. Replace it with your port;
   - `genesis` — defines the first block.

   Response type — binary:

   ```bash
   ~ % curl https://testnet2.thepower.io:45011/api/binblock/genesis | od -x                                                  
   % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
   Dload  Upload   Total   Spent    Left  Speed
   100  1827  100  1827    0     0   1340      0  0:00:01  0:00:01 --:--:--  1344
   0000000      c489    6204    6c61    8073    05c4    6863    6c69    c464
   0000020      1020    5715    f6c3    bc7d    f82a    868e    fcfb    349b
   0000040      03db    0438    3dbb    6f92    356b    254f    bca6    05fe
   0000060      c4cf    6504    7874    a073    06c4    6166    6c69    6465
   0000100      c4a0    6804    7361    c468    b520    688e    86f3    8638
   0000120      ec90    1756    13b7    1c21    3342    8f1e    4fd5    e19d
   0000140      7dc6    7537    1375    0822    c4ef    6806    6165    6564
   0000160      8572    05c4    6863    6961    026e    06c4    6568    6769
   0000200      7468    c400    7006    7261    6e65    c474    0008    0000
   0000220      0000    0000    c400    7205    6f6f    7374    9291    07c4
   0000240      6573    7274    6f6f    c474    c420    84d2    b2f4    4a5a
   0000260      73e1    d8e4    2e30    909d    7232    3c1c    6869    11ea
   0000300      a7a4    3642    3ee4    f67f    c4e4    7603    7265    c402
   0000320      7308    7465    6974    676e    8173    20c4    4234    3033
   0000340      4537    4544    3030    3445    4533    3738    3730    4430
   0000360      3139    3842    4531    3031    4443    3431    04c5    83ad
   0000400      62a4    646f    c579    5003    a183    8065    6ba1    a113
   0000420      dc70    1300    c483    7001    c491    6306    6168    6e69
   0000440      c473    7401    08c4    696c    7473    615f    6464    01c4
   0000460      0276    c483    7001    c492    6b04    7965    c473    6304
   0000500      6e32    c431    7401    03c4    6573    c474    7601    21c4
   0000520      a202    d165    c21d    b659    d160    f07f    d3db    2319
   0000540      a1a3    7d4e    c364    2ce6    389d    d53e    d623    efdc
   0000560      8311    01c4    9270    04c4    656b    7379    04c4    3263
   0000600      326e    01c4    c474    7303    7465    01c4    c476    0221
   0000620      2b79    13b4    802d    aab0    12fd    139e    e672    7975
   0000640      88ec    56a3    984a    0833    3847    002e    54a6    0931
   0000660      c483    7001    c492    6b04    7965    c473    6304    6e32
   0000700      c433    7401    03c4    6573    c474    7601    21c4    d503
   0000720      b1e1    3eff    2c50    9d12    a9f4    ff46    419b    3091
   0000740      1318    3453    6929    321d    f7fc    14a3    a3be    8376
   0000760      01c4    9270    09c4    6f6e    6564    6863    6961    c46e
   0001000      6304    6e32    c431    7401    03c4    6573    c474    7601
   0001020      8302    01c4    9270    09c4    6f6e    6564    6863    6961
   0001040      c46e    6304    6e32    c432    7401    03c4    6573    c474
   0001060      7601    8302    01c4    9270    09c4    6f6e    6564    6863
   0001100      6961    c46e    6304    6e32    c433    7401    03c4    6573
   0001120      c474    7601    8302    01c4    9370    07c4    7563    7272
   0001140      6e65    c474    6305    6168    6e69    09c4    6c62    636f
   0001160      746b    6d69    c465    7401    03c4    6573    c474    7601
   0001200      8302    01c4    9370    07c4    7563    7272    6e65    c474
   0001220      6305    6168    6e69    06c4    696d    736e    6769    01c4
   0001240      c474    7303    7465    01c4    0276    c483    7001    c493
   0001260      6307    7275    6572    746e    05c4    6863    6961    c46e
   0001300      610a    6c6c    776f    6d65    7470    c479    7401    03c4
   0001320      6573    c474    7601    8300    01c4    9370    07c4    7563
   0001340      7272    6e65    c474    6305    6168    6e69    09c4    6170
   0001360      6374    7368    6769    c473    7401    03c4    6573    c474
   0001400      7601    8302    01c4    9370    07c4    7563    7272    6e65
   0001420      c474    610a    6c6c    636f    6c62    636f    c46b    6205
   0001440      6f6c    6b63    01c4    c474    7303    7465    01c4    0276
   0001460      c483    7001    c493    6307    7275    6572    746e    0ac4
   0001500      6c61    6f6c    6263    6f6c    6b63    05c4    7267    756f
   0001520      c470    7401    03c4    6573    c474    7601    830a    01c4
   0001540      9370    07c4    7563    7272    6e65    c474    610a    6c6c
   0001560      636f    6c62    636f    c46b    6c04    7361    c474    7401
   0001600      03c4    6573    c474    7601    8300    01c4    9470    07c4
   0001620      7563    7272    6e65    c474    6507    646e    656c    7373
   0001640      08c4    0180    0040    0002    0100    02c4    4b53    01c4
   0001660      c474    7303    7465    01c4    c376    c483    7001    c494
   0001700      6307    7275    6572    746e    07c4    6e65    6c64    7365
   0001720      c473    8008    4001    0200    0000    c401    5403    5453
   0001740      01c4    c474    7303    7465    01c4    c376    c483    7001
   0001760      c492    6307    7275    6572    746e    07c4    7266    6565
   0002000      6167    c473    7401    03c4    6573    c474    7601    00ce
   0002020      841e    8380    01c4    9370    07c4    7563    7272    6e65
   0002040      c474    6703    7361    02c4    4b53    01c4    c474    7303
   0002060      7465    01c4    cd76    e803    c483    7001    c492    6307
   0002100      7275    6572    746e    04c4    6f6e    6b73    01c4    c474
   0002120      7303    7465    01c4    0176    73a3    6769    c493    ff6c
   0002140      3047    0245    0021    a9e0    e40e    e3d2    2da7    99e8
   0002160      eaab    e909    7729    5460    27a9    e22a    57c7    fcef
   0002200      a4b7    911b    ccbf    2002    8f0e    761e    a7d1    0d2d
   0002220      63e4    38c7    e7f7    5a9d    42a4    c517    c03a    c035
   0002240      f619    85b9    3460    e5b8    2102    d503    b1e1    3eff
   0002260      2c50    9d12    a9f4    ff46    419b    3091    1318    3453
   0002300      6929    321d    f7fc    14a3    a3be    c476    ff6c    3047
   0002320      0245    0021    3fea    578b    7b7d    88e6    e850    debe
   0002340      728d    920d    488a    ae9c    ac3e    d69c    9f0b    9653
   0002360      26bb    fbbd    2002    1369    0aa3    809a    7716    7bf5
   0002400      665e    5115    6390    9ab1    40b4    67ae    eb4d    778a
   0002420      616a    5a5b    7912    2102    7902    b42b    2d13    b080
   0002440      fdaa    9e12    7213    75e6    ec79    a388    4a56    3398
   0002460      4708    2e38    a600    3154    c409    ff6c    3047    0245
   0002500      6f20    e3ca    08de    669e    82d8    c6c2    b334    5546
   0002520      7e31    a2dd    8af5    c3e2    8053    50ba    eb71    d4bf
   0002540      02bc    0021    45c5    9f04    b88e    8a90    6aa1    f72f
   0002560      4ed0    288d    ccd6    db0f    231e    43a6    5195    46a4
   0002600      f6b5    5ce9    2102    a202    d165    c21d    b659    d160
   0002620      f07f    d3db    2319    a1a3    7d4e    c364    2ce6    389d
   0002640      d53e    d623    efdc    a311    6576    0272    04c4    6973
   0002660      6e67    c493    ff77    3048    0246    0021    94fa    944b
   0002700      7a2d    ea69    2506    7422    7671    c3d3    8270    943f
   0002720      48ab    73ae    b574    0e71    6e72    2283    2102    b400
   0002740      d851    5a87    e8d5    d5d1    3ff0    f75c    2683    0a44
   0002760      abd5    baa0    7c63    ad58    cae0    e1c1    86fc    0222
   0003000      0321    e1d5    ffb1    503e    122c    f49d    46a9    9bff
   0003020      9141    1830    5313    2934    1d69    fc32    a3f7    be14
   0003040      76a3    0801    0000    8201    bc3f    0ce4    77c4    48ff
   0003060      4630    2102    8400    f4dd    1884    9f67    8b06    d2c2
   0003100      9364    20cc    eec7    b516    011e    6a19    4ef6    d0c4
   0003120      9aa0    90b9    028f    0021    1dfc    764a    67ae    0842
   0003140      ca17    4ef9    e006    7170    2ec0    3aa0    778e    748e
   0003160      70bb    983d    3885    bbb0    2102    7902    b42b    2d13
   0003200      b080    fdaa    9e12    7213    75e6    ec79    a388    4a56
   0003220      3398    4708    2e38    a600    3154    0109    0008    0100
   0003240      3f82    e4bc    c40a    ff76    3047    0245    1620    8c42
   0003260      b999    b67f    bdce    d460    b79d    1211    7f89    bb3e
   0003300      1b28    fdba    eaf7    b3cb    3b10    0b6e    023d    0021
   0003320      32b8    72ef    e793    46bc    8e6e    e274    228e    531c
   0003340      1637    26cc    08c6    31c0    f813    4301    cca5    de05
   0003360      2102    a202    d165    c21d    b659    d160    f07f    d3db
   0003400      2319    a1a3    7d4e    c364    2ce6    389d    d53e    d623
   0003420      efdc    0111    0008    0100    3f82    e4bc    c406    7403
   0003440      7378    00a0                                                
   0003443
   ```

- ```bash
  curl https://testnet2.thepower.io:45011/api/binblock/last | od -x
  ```

  where

  - `testnet2.thepower.io` — testnet address. Replace it with your testnet address;
  - `45011` — port. Replace it with your port;
  - `last` — defines the last block.
      
  Response type — binary:
   
  ```bash
  ~ % curl https://testnet2.thepower.io:45011/api/binblock/last | od -x
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
  Dload  Upload   Total   Spent    Left  Speed
  100   694  100   694    0     0   1170      0 --:--:-- --:--:-- --:--:--  1182
  0000000      c484    6804    7361    c468    5720    54b1    84ce    0ab6
  0000020      83d8    ea5e    2f46    ab0b    9994    4fd6    fdeb    51e6
  0000040      2a9f    afab    1a36    e1dd    c41f    6806    6165    6564
  0000060      8572    05c4    6863    6961    026e    06c4    6568    6769
  0000100      7468    c45f    7006    7261    6e65    c474    4920    fe02
  0000120      69ae    56dd    43d9    1133    d778    ffc9    e0a9    47d6
  0000140      3031    70af    d3a4    717f    1684    327b    c443    7205
  0000160      6f6f    7374    9295    0dc4    6573    7474    6e69    7367
  0000200      685f    7361    c468    ad20    8a47    d74b    7a85    ec92
  0000220      a8dd    1fe6    5c6e    3e68    eb5e    c2a7    b37c    c000
  0000240      4b80    fc62    39fa    92ec    0bc4    656c    6764    7265
  0000260      685f    7361    c468    d520    bc12    a178    a4ad    352a
  0000300      4bfe    6c22    4859    f981    b213    79cf    5ab1    8c4b
  0000320      5647    21b1    1a0a    9298    03c4    6d74    c470    0008
  0000340      0000    0000    3a00    92c5    07c4    6e65    7274    706f
  0000360      c479    9200    09c4    656d    6e61    745f    6d69    c465
  0000400      0008    0100    a785    d5f1    c450    7603    7265    c402
  0000420      7304    6769    936e    84c4    40ff    4dcc    a09e    089e
  0000440      3c1d    ca94    06d8    3a21    4501    357b    8bb6    e9e7
  0000460      bcf6    c1dc    fde6    8f9a    71f5    82b7    0a6e    1598
  0000500      1d6d    0164    e745    9b7a    db46    09c8    7ced    01a9
  0000520      235d    7f8c    76c9    4ab4    0d2e    2c02    2a30    0530
  0000540      0306    652b    0370    0021    f8be    1985    284a    c3eb
  0000560      e3fe    b100    1227    7129    43eb    e7b3    6a69    e043
  0000600      1352    cc7f    0a86    5a65    0801    0000    8501    f1a7
  0000620      29d6    0803    0000    0000    4200    22d8    84c4    40ff
  0000640      44ff    6d43    1f64    d94f    4f5f    5c3d    8474    f05f
  0000660      6038    c900    0e43    725c    e52c    ab19    ce3d    d3be
  0000700      947b    0d3a    7160    7e86    3680    1479    f786    f71e
  0000720      c9f5    b340    2f2a    ba30    5bee    33bf    5330    0aab
  0000740      2c02    2a30    0530    0306    652b    0370    0021    1c91
  0000760      f0eb    a42e    cfac    4ef8    7b9c    b3d7    4a24    ca0d
  0001000      bc36    f2ac    979c    442d    9b8e    c76b    c947    0801
  0001020      0000    8501    f1a7    75d6    0803    0000    0000    5705
  0001040      8f74    84c4    40ff    0a19    3a63    bc4d    10a5    5b4c
  0001060      84b5    a288    bd40    cb12    326e    0fdd    f6ba    87c2
  0001100      862d    3564    34fa    8c5e    62e1    73ee    345b    ea68
  0001120      4fb1    c84d    4193    2ac6    6e1b    8a99    be43    361f
  0001140      1a0c    7f77    0184    2c02    2a30    0530    0306    652b
  0001160      0370    0021    7c44    da7a    715d    2ae3    fb2a    1574
  0001200      17b1    16b4    642f    b280    d051    c7e1    80d6    e855
  0001220      38a8    1e7c    0801    0000    8501    f1a7    31d6    0803
  0001240      0000    0000    d200    ab7e    09c4    6574    706d    726f
  0001260      7261    cd79    c53a                                        
  0001266
  ```

  :::info

  `binblock` means that there is a binary representation. So, the files you get under the links above are binary.

  If you want to get a human-readable representation of data, you can request `block`, not a `binblock`. Here is an example response from `https://testnet2.thepower.io:45011/api/block/genesis`:

  ```json
  {"block":{"bals":{},"child":"101557C3F67DBC2AF88E86FBFC9B34DB033804BB3D926F6B354F25A6BCFE05CF","etxs":[],"failed":[],"hash":"B58E68F386388690EC5617B713211C42331E8FD54F9DE1C67D377575132208EF","header":{"chain":2,"height":0,"parent":"0000000000000000","roots":{"setroot":"C4D284F4B25A4AE173E4D8302E9D9032721C3C6968EA11A4A74236E43E7FF6E4"},"ver":2},"settings":{"4B307EDE00E43E87070D91B81E10CD14":{"body":"83A16580A16B13A170DC001383C4017091C406636861696E73C40174C4086C6973745F616464C401760283C4017092C4046B657973C40463326E31C40174C403736574C40176C42102A265D11DC259B660D17FF0DBD31923A3A14E7D64C3E62C9D383ED523D6DCEF1183C4017092C4046B657973C40463326E32C40174C403736574C40176C42102792BB4132D80B0AAFD129E1372E67579EC88A3564A98330847382E00A654310983C4017092C4046B657973C40463326E33C40174C403736574C40176C42103D5E1B1FF3E502C129DF4A946FF9B4191301813533429691D32FCF7A314BEA37683C4017092C4096E6F6465636861696EC40463326E31C40174C403736574C401760283C4017092C4096E6F6465636861696EC40463326E32C40174C403736574C401760283C4017092C4096E6F6465636861696EC40463326E33C40174C403736574C401760283C4017093C40763757272656E74C405636861696EC409626C6F636B74696D65C40174C403736574C401760283C4017093C40763757272656E74C405636861696EC4066D696E736967C40174C403736574C401760283C4017093C40763757272656E74C405636861696EC40A616C6C6F77656D707479C40174C403736574C401760083C4017093C40763757272656E74C405636861696EC409706174636873696773C40174C403736574C401760283C4017093C40763757272656E74C40A616C6C6F63626C6F636BC405626C6F636BC40174C403736574C401760283C4017093C40763757272656E74C40A616C6C6F63626C6F636BC40567726F7570C40174C403736574C401760A83C4017093C40763757272656E74C40A616C6C6F63626C6F636BC4046C617374C40174C403736574C401760083C4017094C40763757272656E74C407656E646C657373C4088001400002000001C402534BC40174C403736574C40176C383C4017094C40763757272656E74C407656E646C657373C4088001400002000001C403545354C40174C403736574C40176C383C4017092C40763757272656E74C40766726565676173C40174C403736574C40176CE001E848083C4017093C40763757272656E74C403676173C402534BC40174C403736574C40176CD03E883C4017092C40763757272656E74C4046E6F736BC40174C403736574C4017601","kind":"patch","patches":[{"p":["chains"],"t":"list_add","v":2},{"p":["keys","c2n1"],"t":"set","v":"02A265D11DC259B660D17FF0DBD31923A3A14E7D64C3E62C9D383ED523D6DCEF11"},{"p":["keys","c2n2"],"t":"set","v":"02792BB4132D80B0AAFD129E1372E67579EC88A3564A98330847382E00A6543109"},{"p":["keys","c2n3"],"t":"set","v":"03D5E1B1FF3E502C129DF4A946FF9B4191301813533429691D32FCF7A314BEA376"},{"p":["nodechain","c2n1"],"t":"set","v":2},{"p":["nodechain","c2n2"],"t":"set","v":2},{"p":["nodechain","c2n3"],"t":"set","v":2},{"p":["current","chain","blocktime"],"t":"set","v":2},{"p":["current","chain","minsig"],"t":"set","v":2},{"p":["current","chain","allowempty"],"t":"set","v":0},{"p":["current","chain","patchsigs"],"t":"set","v":2},{"p":["current","allocblock","block"],"t":"set","v":2},{"p":["current","allocblock","group"],"t":"set","v":10},{"p":["current","allocblock","last"],"t":"set","v":0},{"p":["current","endless","8001400002000001","SK"],"t":"set","v":true},{"p":["current","endless","8001400002000001","TST"],"t":"set","v":true},{"p":["current","freegas"],"t":"set","v":2000000},{"p":["current","gas","SK"],"t":"set","v":1000},{"p":["current","nosk"],"t":"set","v":1}],"sig":["FF473045022100E0A90EE4D2E3A72DE899ABEA09E929776054A9272AE2C757EFFCB7A41B91BFCC02200E8F1E76D1A72D0DE463C738F7E79D5AA44217C53AC035C019F6B9856034B8E5022103D5E1B1FF3E502C129DF4A946FF9B4191301813533429691D32FCF7A314BEA376","FF473045022100EA3F8B577D7BE68850E8BEDE8D720D928A489CAE3EAC9CD60B9F5396BB26BDFB02206913A30A9A801677F57B5E6615519063B19AB440AE674DEB8A776A615B5A1279022102792BB4132D80B0AAFD129E1372E67579EC88A3564A98330847382E00A6543109","FF47304502206FCAE3DE089E66D882C2C634B34655317EDDA2F58AE2C35380BA5071EBBFD4BC022100C545049F8EB8908AA16A2FF7D04E8D28D6CC0FDB1E23A6439551A446B5F6E95C022102A265D11DC259B660D17FF0DBD31923A3A14E7D64C3E62C9D383ED523D6DCEF11"],"ver":2}},"sign":[{"_nodeid":"2XgZca5c3QuTdsm8SP73RAQrwMAP","_nodename":false,"binextra":"022103D5E1B1FF3E502C129DF4A946FF9B4191301813533429691D32FCF7A314BEA3760108000001823FBCE40C","extra":{"pubkey":"03D5E1B1FF3E502C129DF4A946FF9B4191301813533429691D32FCF7A314BEA376","timestamp":1658926720012},"signature":"3046022100FA944B942D7A69EA062522747176D3C370823F94AB48AE7374B5710E726E8322022100B451D8875AD5E8D1D5F03F5CF78326440AD5ABA0BA637C58ADE0CAC1E1FC8622"},{"_nodeid":"CqJvEZTeey9nUGerszMRyGb8Ws4","_nodename":false,"binextra":"022102792BB4132D80B0AAFD129E1372E67579EC88A3564A98330847382E00A65431090108000001823FBCE40A","extra":{"pubkey":"02792BB4132D80B0AAFD129E1372E67579EC88A3564A98330847382E00A6543109","timestamp":1658926720010},"signature":"304602210084DDF48418679F068BC2D26493CC20C7EE16B51E01196AF64EC4D0A09AB9908F022100FC1D4A76AE67420817CAF94E06E07071C02EA03A8E778E74BB703D988538B0BB"},{"_nodeid":"6h9PQFnVUjJZQ8ftwKcS6suEg38","_nodename":false,"binextra":"022102A265D11DC259B660D17FF0DBD31923A3A14E7D64C3E62C9D383ED523D6DCEF110108000001823FBCE406","extra":{"pubkey":"02A265D11DC259B660D17FF0DBD31923A3A14E7D64C3E62C9D383ED523D6DCEF11","timestamp":1658926720006},"signature":"3045022016428C99B97FB6CEBD60D49DB71112897F3EBB281BBAFDF7EACBB3103B6E0B3D022100B832EF7293E7BC466E8E74E28E221C533716CC26C608C03113F80143A5CC05DE"}],"txs":[]},"result":"ok","ok":true}
   ```
  
  :::

## /api/blockhash/{height}

With `/api/blockhash/{height}` you'll get  a `.json` file with the hash of the block with the specified `{height}`.

**Example**

```bash
curl https://testnet2.thepower.io:45011/api/blockhash/90 | jq
```

where

- `testnet2.thepower.io` — testnet address. Replace it with your testnet address;
- `45011` — port. Replace it with your port;
- `17` — height.

```bash
~ % curl https://testnet2.thepower.io:45011/api/blockhash/90 | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   104  100   104    0     0    264      0 --:--:-- --:--:-- --:--:--   268
{
  "blockhash": "FC685D879575E6738BCFF8FAC6FCD92AF4376AB9C45D640A92501370F25A16D3",
  "result": "ok",
  "ok": true
}
```

## api/nodes/{chain}

`api/nodes/{chain}` will show you the nodes of the specified `{chain}`.

**Example**

```bash
curl http://c1025n09.thepower.io:1080/api/nodes/1029 | jq
```

where

- `testnet2.thepower.io` — testnet address. Replace it with your testnet address;
- `45011` — port. Replace it with your port;
- `1029` — chain number. Replace it with your chain number.

```json
~ % curl http://c1025n09.thepower.io:1080/api/nodes/1029 | jq
% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
Dload  Upload   Total   Spent    Left  Speed
100  1662  100  1662    0     0   3796      0 --:--:-- --:--:-- --:--:--  3856
{
"chain_nodes": {
"2MHg8z8cd93FyHdchXLSzaioXKhC": {
"host": [
"http://c1029n1.thepower.io:1080",
"https://c1029n1.thepower.io:1443"
],
"ip": [
"http://185.193.17.204:1080",
"https://c1029n1.thepower.io:1443"
]
},
"2ccmDKSrocgh5aGUUfY2DRLYSZFT": {
"host": [
"http://c1029n6.thepower.io:1080",
"https://c1029n6.thepower.io:1443"
],
"ip": [
"http://135.181.248.48:1080",
"https://c1029n6.thepower.io:1443"
]
},
"36Lt8n1N85iid2cyRpafcyTtFaBD": {
"host": [
"http://c1029n5.thepower.io:1080",
"https://c1029n5.thepower.io:1443"
],
"ip": [
"http://149.102.153.49:1080",
"https://c1029n5.thepower.io:1443"
]
},
"3S97emkqdsXTGJ49jD7JCUA2uHaJ": {
"host": [
"http://c1029n2.thepower.io:1080",
"https://c1029n2.thepower.io:1443"
],
"ip": [
"http://143.198.221.189:1080",
"https://c1029n2.thepower.io:1443"
]
},
"3gdq3tLSNH737PKkHxFnpbw1nvFA": {
"host": [
"http://c1029n3.thepower.io:1080",
"https://c1029n3.thepower.io:1443"
],
"ip": [
"http://144.126.132.56:1080",
"https://c1029n3.thepower.io:1443"
]
},
"Q6LpS7eMWyXyzJyJ5Qt7sosSZ1e": {
"host": [
"http://c1029n10.thepower.io:1080",
"https://c1029n10.thepower.io:1443"
],
"ip": [
"http://65.109.133.153:1080",
"https://c1029n10.thepower.io:1443"
]
},
"VN3qryCdc1o3XN43Uyxp3pAsWnU": {
"host": [
"http://c1029n4.thepower.io:1080",
"https://c1029n4.thepower.io:1443"
],
"ip": [
"http://80.92.206.15:1080",
"https://c1029n4.thepower.io:1443"
]
},
"kRimF7wjfLwdKY7nRPbkbHH13np": {
"host": [
"http://c1029n9.thepower.io:1080",
"https://c1029n9.thepower.io:1443"
],
"ip": [
"http://167.86.96.173:1080",
"https://c1029n9.thepower.io:1443"
]
},
"n6Sia6Csp16oX1UoGUX1ffJNi48": {
"host": [
"http://c1029n7.thepower.io:1080",
"https://c1029n7.thepower.io:1443"
],
"ip": [
"http://116.203.146.71:1080",
"https://c1029n7.thepower.io:1443"
]
}
},
"ok": true
}
```

:::note

The response data format for this endpoint will be changed to signed soon.

:::

## /api/node/chainstate

`/api/node/chainstate` shows the chain state (how many nodes contain a specific block). The new version shows, which nodes contain a specific block. Response format — `*.json`

**Example**

```bash
curl http://c1025n09.thepower.io:1080/api/node/chainstate | jq
```

```json
~ % curl http://c1025n09.thepower.io:1080/api/node/chainstate | jq
% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
Dload  Upload   Total   Spent    Left  Speed
100   508  100   508    0     0    604      0 --:--:-- --:--:-- --:--:--   607
{
"chainstate": [
[
98,
"CDDF6FB15F156FAF6793EDDA9CCE0BF95C495B5D22144B010B809F78E89A3446",
"983D154480A715A72C9F201533098BF5B1F85BBBB52B68642508172C36CBB159",
3724,
8,
[
"c1025.abandoned",
"c1025.FastTest01",
"c1025.noname-3176A094",
"c1025.mssahin",
"c1025.zannodes",
"c1025.zef",
"c1025.munris",
"c1025.arraya"
]
],
[
98,
"6A89D624AB41E484B68E387B61FD069BF0381704DA30138981576B96D406BF82",
"983D154480A715A72C9F201533098BF5B1F85BBBB52B68642508172C36CBB159",
3723,
2,
[
"c1025.asabichucky",
"c1025.Bangyan"
]
]
],
"result": "ok",
"ok": true
}
```

where

- `chainstate` field contains the following arrays:

   - height;
   - block hash;
   - parent block hash;
   - temporary block number or `false` if the block is permanent;
   - a number of nodes with such block;
   - nodes list.

## /api/address/0x{HEX}/verify

With `/api/address/0x{HEX}/verify` you can verify the smart contract address.

**Example**

```bash
curl http://c1025n09.thepower.io:1080/api/address/0x8001400401000002/verify | jq
```

where

`0x8001400401000002` — address in HEX.

```bash
~ % curl http://c1025n09.thepower.io:1080/api/node/chainstate | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   508  100   508    0     0    604      0 --:--:-- --:--:-- --:--:--   607
{
  "chainstate": [
    [
      98,
      "CDDF6FB15F156FAF6793EDDA9CCE0BF95C495B5D22144B010B809F78E89A3446",
      "983D154480A715A72C9F201533098BF5B1F85BBBB52B68642508172C36CBB159",
      3724,
      8,
      [
        "c1025.abandoned",
        "c1025.FastTest01",
        "c1025.noname-3176A094",
        "c1025.mssahin",
        "c1025.zannodes",
        "c1025.zef",
        "c1025.munris",
        "c1025.arraya"
      ]
    ],
    [
      98,
      "6A89D624AB41E484B68E387B61FD069BF0381704DA30138981576B96D406BF82",
      "983D154480A715A72C9F201533098BF5B1F85BBBB52B68642508172C36CBB159",
      3723,
      2,
      [
        "c1025.asabichucky",
        "c1025.Bangyan"
      ]
    ]
  ],
  "result": "ok",
  "ok": true
}
```

## /api/tx/status/{txid}

`/api/tx/status/{txid}` is the transaction status. It appears right after the transaction has been included into the block and is present there only for a few minutes.

**Example**

```bash
curl https://thepower.cloudchitect.com:1443/api/tx/status/3VV9YvPDKr3Q428Yd-c1026.luknode | jq
```

Response:

```bash
~ % curl https://thepower.cloudchitect.com:1443/api/tx/status/3VV9YvPDKr3Q428Yd-c1026.luknode | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   115  100   115    0     0    192      0 --:--:-- --:--:-- --:--:--   194
{
  "res": {
    "block": "F9EBCF5740DBB968790C74685EBEFE0EA350BBC07F5EEB7DBAC6BAE396E6C295",
    "ok": true,
    "res": "ok"
  },
  "ok": true
}
```

## /api/logs

`/api/logs/{blkid}` and `/api/logs_height/{blk_height}` contain smart contract logs.

where

- `{blkid}` — block ID;
- `{blk_height}` — block height.

## /api/tx/new

`/api/tx/new` is the place, where the transactions are sent to. Request type — `POST`.

You can code the transaction either in binary, or in base64 format.

**Example**

Let's generate a transaction and save it to a file using `tp` CLI by running the following command:

```bash
tp -k tpcli1026.key --construct tx1.json --sign --save 1.bin
```

After the transaction is generated, you have two options to send it:

1. **Binary.**

   To send a binary transaction, run:

   ```bash
   curl -v https://power.idekubagus.com:1443/api/tx/new.bin -T 1.bin -X POST
   ```

   In this case you'll get the following answer:

   ```bash
   {"result":"ok","txid":"3VV9fSNhvGzZjA1hD-c1026.idekubagus","ok":true}
   ```

2. **Base64.**

   To send a base64 transaction, run:

   ```bash
   curl -v https://power.idekubagus.com:1443/api/tx/new -d '{"tx":"g6Rib2R5xF2HoWWBxANtc2fEEVByZXZlZCBtZWR2ZWQgOi0poWbECIABQAQCAAACoWsQoXCSkwCiU0vOAJiWgJMBolNLzgCYloChcwKhdM8AAAGFqtVFUKJ0b8QIgAFABAEAAAOjc2lnkcRt/0gwRgIhAKLbV4J778hNgFFFmOvczOxRf7MwMUKNOFToke5PArtAAiEAhMH4/M8sRs7BaU2WNPa7H9yNIdl/bSCi5ZIceta8UOkCIQLJy/4ulv8ndhDNB2svQqTPlyB1UUxppEaaFedmMC6r7KN2ZXIC"}'
   ```

   In this case you'll get the following answer:

   ```bash
   {"result":"ok","txid":"3VV9ihNTDKBkgE1om-c1026.idekubagus","ok":true}
   ```

   :::warning

   This transaction is made for illustration ONLY and will not work in real life.

   :::

## /api/node/status

| Purpose                              | Request type | Response                                                   |
|--------------------------------------|--------------|------------------------------------------------------------|
| Current status of the addressed node | `GET`        | status (object): An object with a current node work report |

Fields of the `status` object:

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

## /api/where/`{address}`

| Purpose                                      | Request type | Input parameters                                                                                     | Response                                                                                                                                                                                             |
|----------------------------------------------|--------------|------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| The definition of chain belonging to address | -            | `{address}` `(string)` — the address of the wallet in textual or binary representation in hex format | `chain (int)` — the number of the wallet-related chain address; `(String)` — the address converted to binary representation; `txtaddress (String)` — the address converted to textual representation |

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

## /api/address/`{address}`

| Purpose                                         | Request type | Input parameters                                                                                       | Response                                                                                                                                                                                                                   |
|-------------------------------------------------|--------------|--------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Information about a wallet with a given address | `GET`        | `{address}` `(string)` — the address of the wallet in a textual or binary representation in hex format | `info (Object)` — an object with information about the current wallet state;  `address (String)` — the address converted to binary representation; `txtaddress (String)` — the address converted to textual representation |

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

If the smart contract is used, you will also see the VM it is working on, as well as the code length:

```json
{
"info": {
"amount": {
"SK": 989650000
},
"code": 25,
"contract": [
"evm",
"EVM"
],
"lastblk": "D616BEBFA5E06ADBFFD888DFC8D1816E518FC72BD6C06A66E59747824CAF8517",
"preblk": "3F45AC21E44D36E369C329206C697A764F7F93B0D11337C34149FD2370A439C8",
"pubkey": "03E72DB57E9086FAF3862E581D0810F496662A0880E6283E3B5C4B97BCD5464E29",
"seq": 1,
"state": 1,
"t": 1671974412091,
"usk": 1,
"vm": "evm"
},
"result": "ok",
"address": "0x8001400002000004",
"ok": true,
"txtaddress": "AA100000003355443673"
}
```

## /api/blockinfo/`{hash}`

| Purpose                                          | Request type | Input parameters                                                            | Response                                                                               |
|--------------------------------------------------|--------------|-----------------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| Information about the block without transactions | `GET`        | `{hash}` `(string)` — hash of the block for which the information is needed | To find information about the assignment of fields refer to "Block operations" section |

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

## /api/block/`{hash}`

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

## /api/settings

| Purpose                  | Request type | Input parameters | Response                                                                                                                                                                    |
|--------------------------|--------------|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Current chain parameters | `GET`        | -                | You can find information about the fields structure and purpose [here](https://doc.thepower.io/docs/Maintain/build-and-start-a-node/tpNodeConfiguration#genesistxt-example) |

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
