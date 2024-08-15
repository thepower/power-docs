# Management layer (ML)

The Management layer is a large and relatively slow blockchain included all the system nodes. At any time, the platform node is simultaneously involved in a separate shard and a Management layer chain.

As a part of Management layer, the node performs the following:

- Adding, moving and deleting the nodes in the public shards;
- Creating, separation and removal of public shards;
- Registration of creating and reconfiguration of private shards.

## Consensus in the Management layer (ML)

All actions in the Management layer are important for the platform and performed by the nodes in this layer to improve the reliability of solutions. All nodes of the platform carry out the verification and approval of decisions made in the ML.

Since the number of platform nodes can be astronomic the conventional methods of approval solutions are inapplicable. Therefore, the project uses a specially designed two-level asynchronous consensus algorithm similar to pBFT [5].

Its first level includes the nodes from some shard. In the case of approval solutions in ML, each such approval first confirmed within the shard using shard protocol of the Resonance consensus. As a result, shard decides on each action as a second level consensus participant and has a confirmed decision by a number of nodes.

A coordination is performed at the second level of new ML block.
Round is a time period from the beginning of block generation until its completion.
The shards are the second level participants. Each round passes the following stages of the block generation algorithm:

1. In each round, a new leader is appointed. The leader is a shard, which will be responsible for the block generation and approval collection. The leader is appointed alternately, according to the position in the shards list. Thus, the first block is formed by the 1st shard, the second - by 2nd shard in the list, and so on.

2. At the beginning of the round, each shard having registered transactions sent for consideration in Management layer sends them to the leader of this round.

3. Having received a list of transactions to be processed in Management layer from the shards within a specified time, the leader rejects the invalid transactions and generates a new block from valid transactions. Once the block is formed, the leader sends it to all shards for approval.

4. Afterreceivingablock,eachshardholdsits approval on the 1st level, receiving a coordinated solution among its nodes. The number of nodes approved a new ML block is sent back to the leader.

5. The leader receives a response from shards with approvals. Once the leader will collect approvals of the total number of nodes greater than 50%, the leader declares the block completed and sends it to all shards together with confirmations.

## The new ML block cannot be created in this round in case of:

- at the beginning of the round, a shard which is to be the leader of this round is not functioning;
- the leader shard is captured by the attacker and includes an invalid transaction to the new ML block at the 3rd stage;
- the leader is unable to collect the required number of approvals from the total number of nodes greater than 50%;
  Then, the creation of ML block might be initialized from the beginning. The next round must be started with a new leader – a shard next on the list (or the first one if the previous was the last one).
