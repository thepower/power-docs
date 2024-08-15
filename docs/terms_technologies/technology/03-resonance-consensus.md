# Resonance consensus

## Introduction

The problem of finding coordinated decisions by a group of peer electronic devices while some of them do not work properly or do not work at all was formulated in 1982 as the "Byzantine Generals Problem". Various algorithms solving this problem have been proposed and introduced in distributed systems since then. Now a distributed system running on these algorithms is called BFT-system (Byzantine Fault Tolerance).

However, most of these algorithms are generic and have serious disadvantages creating difficulties for their effective use in Blockchain platforms. The Power has developed a brand- new BFT consensus algorithm called Resonance. The algorithm allows us to solve the problem efficiently within a Blockchain with sharding.
All the modern consensus algorithms used in Blockchain systems can be generally divided into two types:

- Type I. The algorithm requires the identification of all the system participant nodes. Such algorithms are often called the BFT algorithms.
- Type II. The algorithm doesn’t require the identification of some or all system participant nodes. Such an algorithm has been used in the Bitcoin - the first Blockchain platform - PoW, PoS, DPOS, etc.

## Problems to be solved

The main problems related to the use of Type II algorithms for the building of blockchain platforms with sharding are:

- The algorithms of this type (to some extent) include block’s chain branching feature. It does not cause serious problems for a single branching chain, as there is a simple rule for determining the validity of the blocks chain branch - the "the chain having the greatest length of blocks is right". In order to check compliance with this rule, you must have a node fully synchronized with other chain producing nodes.
  But, in the systems using several parallel chains (sidechains or sharding systems), the transactions transfer from one chain to another involves additional difficulties. The target chain nodes must somehow confirm that these transactions belong to the valid version of the original chain branches. And the complicated problem here is to generate and verify this confirmation.
- The idea of branching and the "the chain having the greatest length of blocks is right" rule has led to the interesting empirical rule: ensuring the transaction irreversibility requires waiting for 5 blocks in the chain over the block in which the transaction is to be done. No doubt that such a rule leads to a serious increase in latency - the user has to wait long for the result of its transaction completion.

The main problems related to the use of Type I algorithms for the building of blockchain platforms with sharding are:

- Despite the fact that the BFT algorithms usually do not involve the chains branching, their implementations such as pBFT have quite a number of steps in the algorithm, resulting in long transaction registration time - about 3-5 seconds.
- Most of the BFT algorithms has been developed based on the asynchronous interaction models. This leads to the fact that the system vitality can be described by the n > 2 f + 1 formula. That means that if your system has more than 1⁄3 of idle or malfunctioning nodes, the system will pause its work until the missing unit will come back to operating state.

The problems inherent to most blockchain platforms are:

- Rejecting the requests from the Blockchain platform client.
  In most algorithms, a block forms a single node, and the other nodes only validate it. This results in the node creating a block based on its own purposes which may not include transactions do not comply with its targets.
- Some examples of such actions may include: selection of only the transaction with the highest commission, failure to include the winning transaction (if the included transaction could lead to win for the sending party), and so forth.
  In such algorithms, a constant change of blocks generator occurs in theory. It seems helpful in reducing the risk for the client of non-inclusion of its transactions in the next block. But, in practice, the number of block generators in real blockchain platforms is about two dozen or even less. As a result, the probability that the next block generator will not include the client transaction becomes high enough.
- Common transactions sequence.
  The transactions line generation system is not directly connected with the consensus algorithms. However, it seriously affects the interaction between the client and the blockchain platform. This system stores and delivers the transactions from the client to the block generator, and it also consists of decentralized nodes. Since the delivery system is asynchronous, the client has no guarantees of timely transaction delivery. Therefore, the interaction "user - transaction – block entry" is extended on the transactions delivery time via a common sequence, and the time is most often unknown.

## System model

We assume that all the nodes forming a distributed system are tightly connected to each other in a network. The messages between all nodes are delivered with minimal delay and without losses. The messages loss is considered an unfortunate incident and further processed as an error.
Each node in the system has information about each other node in the system (the address in the communication system between nodes providing data communication between nodes), allowing each node to communicate via a data link with any other nodes within the system.

We use the sha-2, elliptic-curve cryptography cryptographic libraries for authentication of all interactions between the nodes. All the nodes know the each other’s public keys for verifying the messages from other nodes.
In order to reduce the size of transmitted data during the confirmation, we apply the Merkle Tree Proof (MTP). When transmitting data to the MTP, we can delete unnecessary data from the structure leaving only their hashes, and the validity of the MTP general structure can be easily confirmed by calculations.
All the nodes are constantly synchronized with each other for all the steps of the algorithm to be started and ended simultaneously. To do this, the nodes transact additional synchronizing interactions.
The system clients can send their transactions (requests for changes to the system) to any node. The nodes jointly form the common sequence of transactions at each round.

During the development of the algorithm, we assumed the presence of the enemy who is able to coordinate the work of the captured nodes but cannot affect the connectivity of the normally operating nodes.

## Resonance Algorithm

The Resonance algorithm is an algorithm for round-to-round state coordination of the system consisting of distributed nodes. The consensus algorithm is applied in order to match the newly found system states with the maximum possible number of nodes at each round. The minimum number of nodes required to achieve a coordinated system state in each round is 50% + 1 node coordinated in this state.
The basic algorithm repeated at each coordination round is described below:

**Step 1. "Round Start"**

Each system node sends a message to each system node including itself that the round has been started. This message includes a set of transactions proposed by the node from the transactions sent by users of it, a new round number, a valid MTP with the previous round number and a round repeat counter, if a round was not ended at least once. The nodes select messages with the maximum number of the previous round for processing the next step. If there are several messages with the same maximum round number but different valid MTP with the previous round number, the node selects messages with the maximum round repeat counter.

After the first step, if there are no nodes with a Byzantine behaviour, each working node receives the same number of messages about the round start with the round number. If there are nodes with the Byzantine behaviour, these nodes send messages with the lower round number than other nodes do (without Byzantine behaviour). In this case, the node received a message from another node with the round number less than its own, it sends valid MTP back to this node with the previous round numbers stored in the node database.

**Step 2. "Round End"**

Each node looks in the messages selected at the last step and extracts transactions recorded to them. Then each such node sorts the transactions using identical method (method of sorting does not matter, but it must be common for all nodes). After that, the nodes verify the resulting sequence of transactions and their implementability.

For example, if the initial condition says that there is a variable equal to 5, it is strictly greater than zero, and the operation is proposed to subtract 10 (usual debit operation), therefore it will be impossible to calculate a new value, and the operation will not be performed.

Division by zero could be another example when the calculation of a new value is impossible. Further, the transactions which can not be performed (repeated subset, obviously false subset, a subset of which can not be calculated based on the current value) are removed from the list.

The node then applies these transactions, and a new system state is sent to all nodes, including itself, in a message containing a hash of the new state, round number and the largest round repeating counter, as well as the digital signature of this node.

At the end of a step, the node accumulates messages from all system nodes containing the
hash of the new state, round number and the round repeating counter. After the accumulation of messages, the node could be transferred to one of the states listed below depending on the number of idle nodes, nodes with Byzantine behaviour in the system and the communication system between the nodes.

- "Round Failed". The node has received less than 50% of hash signatures with the same round number and round repeat counter. If the node fails to this state, it increments the round repeating counter and starts to coordinate values from the beginning.
- "Round Success". The node has received more than 50% of hash signatures with the same round number and round repeat counter and accumulated 50%+1 of identical hashes. The round coordination is considered successful, and a distributed system comes to a single decision. The node is ready to start a new round of decision-making. If necessary, the round counter value for the node is set to 0.
- "Round Failed, correction is required". The node has received more than 50% of hash signatures with the same round number and round repeat counter but did not accumulate 50%+1 of identical hashes. This situation indicates that the nodes with Byzantine behaviour appeared, and it is necessary to identify them and finish the round. To do this, additional correction steps described below are used.

If the system contains at least one node with a Byzantine behaviour, it may send the messages with different subsets of the new value to other nodes at the 1st stage. This will lead to the fact that no node in the system accumulates 50%+1 of identical hashes of the new state, which means that the round is not yet finished and no decision has been applied yet. The system can apply a coordinated value using a correction algorithm we have developed.

The correction algorithm:

- Step "Starting Correction".
  A node that has not received the 50% + 1 node of the same responses at the Round End creates a message containing the current round number, and messages received from other nodes at the Round Start. These messages contain a subset of a new system value proposed by the node, new round number, and valid MTP with the previous round number. Next, the node sends a message to each other node.
- If the system has one or more nodes that have collected 50%+1 of identical signatures at the Round End, these nodes send a response message to the nodes that did not receive 50% + 1 node of identical responses at the Round End, and these nodes start synchronizing with the new system value.
- If none of the system nodes collected 50%+1 node of identical hash signature at the Round End, each node collects common matrix of messages containing the information about all messages sent from each node to each other. Each node analyses the matrix and defines nodes sent messages with different subsets in this round (nodes with the Byzantine behaviour).
- Step “Correction End".
  Each node excludes the Round Start messages received from the nodes identified as a Byzantine behaviour, and then repeats the Round End step.

**The Reward model: par minting**

An important difference between a distributed system and a decentralized blockchain system is that owners of the blockchain system nodes are economically interested in their nodes’ working condition. The reward for the work of such nodes in the system helps to achieve the system decentralization.
With lack of rewarding node’s owner does not have the motivation to protect it from attack or e.g. not to transfer the right to someone else. It leads in turns to a situation in which the process of nodes seizure comes to simple and cheap matter.

Thus, the network consist of unseized nodes can easily become a network with captured nodes, and such network seizure is economically quite cheap. The project goal is to develop a public network where the cost of seizure might be so much high as it would be unviable. So that, the cost of seizure might be higher than the reward. It could be possible only in case nodes are interested to protect itself and the cost of protection directly correlates to actions reward. Thus, the higher nodes reward, the safer common network.

In the PoW, PoS, DPOS-based systems, only one block generator receives the reward for the block generation. The Resonance algorithm differs from most other ones in the fact that all system nodes are involved in the block generation. Therefore, in systems based on Resonance, all the participants must be rewarded. The normal operation of the system may be ensured only by encouraging those participants who actually got to the round coordinated state, and not encourage those who did not participate.

The algorithm’s feature is that it is impossible to identify on the Round Start stage which nodes are involved in all steps of Round creation. So, the rewarding procedure for block K is executed by system smart contract as one of the coordination tasks for next rounds and must be carried out if the block number is n>K.

## Summary

The presented scheme describes the algorithm of coordination of new blocks in the decentralized blockchain system. The implementation of the algorithm has the following advantages:

- Predictably low client transaction registration time;
  The clients can send requests on the transactions implementation directly to the node and receive an answer about the result. The transaction processing is time-limited, so the client can predict the time of registration of its transactions.
  The small number of steps in the basic algorithm and the correction algorithm helps to reduce the time of transaction registration by the system. We are going to achieve a registration time of 1 second or less.
- Low probability of rejecting of client’s request by the node;
  The client may send its transaction to several or all nodes in the system. In such a case, its transaction will not be included only if 50% of nodes together made that decision.
- Simple check of the blocks validity for the participants of other chains (shards) and the client;
  Checking the block sent to the client node or node from another chain just have to make sure that all of the signatures of this block are valid and really belong to the generating nodes of this block in the system. To do this, we need only a valid knowledge about the nodes and their cryptographic keys that compose a decentralized system.
- System efficiency if nodes are failed. In order for the system to work, it is necessary for the routine mode to have 50% + 1 node of all nodes registered in the system work normally. Thus, the system will continue to operate even if 50% -1 nodes will fail.
  The attention should be given to the important technological features of the Resonance algorithm
- Algorithm are demanding for the network quality for all participants, more demanding than that of analogues.
- The high efficiency of the algorithm at a small number of nodes.
  The efficiency decreases with the increase of the nodes number, as it is accompanied by an intense increase in the interaction between the nodes. This problem is solved using a scaling technology (sharding) which will be described below.
