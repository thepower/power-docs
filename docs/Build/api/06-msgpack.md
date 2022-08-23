# MsgPack

Specification of the message pack format can be found here: ['github.com/msgpack/msgpack/blob/master/spec.md'](https://github.com/msgpack/msgpack/blob/master/spec.md)

There are libraries written in the most common languages.
You can download libraries from the official site: ['msgpack.org'](https://msgpack.org/)

The following table provides information on how different types of data are encoded in the message pack.

| format name     | first byte (in binary) | first byte (in hex) |
| :-------------- | :--------------------- | :------------------ |
| positive fixin  | 0xxxxxxx               | 0x00 - 0x7f         |
| fixmap          | 1000xxxx               | 0x80 - 0x8f         |
| fixarray        | 1001xxxx               | 0x90 - 0x9f         |
| fixstr          | 101xxxxx               | 0xa0 - 0xbf         |
| nil             | 11000000               | 0xc0                |
| (never used)    | 11000001               | 0xc1                |
| false           | 11000010               | 0xc2                |
| true            | 11000011               | 0xc3                |
| bin 8           | 11000100               | 0xc4                |
| bin 16          | 11000101               | 0xc5                |
| bin 32          | 11000110               | 0xc6                |
| ext 8           | 11000111               | 0xc7                |
| ext 16          | 11001000               | 0xc8                |
| ext 32          | 11001001               | 0xc9                |
| float 32        | 11001010               | 0xca                |
| float 64        | 11001011               | 0xcb                |
| uint 8          | 11001100               | 0xcc                |
| uint 16         | 11001101               | 0xcd                |
| uint 32         | 11001110               | 0xce                |
| uint 64         | 11001111               | 0xcf                |
| int 8           | 11010000               | 0xd0                |
| int 16          | 11010001               | 0xd1                |
| int 32          | 11010010               | 0xd2                |
| int 64          | 11010011               | 0xd3                |
| fixext 1        | 11010100               | 0xd4                |
| fixext 2        | 11010101               | 0xd5                |
| fixext 4        | 11010110               | 0xd6                |
| fixext 8        | 11010111               | 0xd7                |
| fixext 16       | 11011000               | 0xd8                |
| str 8           | 11011001               | 0xd9                |
| str 16          | 11011010               | 0xda                |
| str 32          | 11011011               | 0xdb                |
| array 16        | 11011100               | 0xdc                |
| array 32        | 11011101               | 0xdd                |
| map 16          | 11011110               | 0xde                |
| map 32          | 11011111               | 0xdf                |
| negative fixint | 111xxxxx               | 0xe0 - 0xff         |
