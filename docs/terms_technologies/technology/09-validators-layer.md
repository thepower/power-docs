# Validators layer

This system logic level also consists of all the system nodes, but its nodes perform different functions. Each shard node must be a validator of transactions in other shards. Thus, by grouping validators nodes, the platform creates a system that performs verification of actions in all shards.

The shards sizes are small enough compared to the total number of nodes in the system. This aspect theoretically leaves attackers an opportunity to negotiate among themselves to have control over 50% + 1 node. If the attackers can take control over such percentage of shards, they will be able to carry out an unsecured invalid inter-chain transaction. It turns out that the security of the entire system depends on the security level of the most vulnerable element (shard). In order to make this kind of attack impossible, we have implemented the second layer.

So, how the role of validator will help to solve the security issues? Each shard corresponds to a group of validators (nodes from other shards). This group verifies the blocks within the shard and issues verification signature of that the validator checked the block and considers it valid. Each block is considered valid only if more than half of validators issued their verification signature. Thus, to make shard able to send unsecured transaction, the attacker must control 50% + 1 node in shard and 50% + 1 validators.

Therefore, the next important step in improving the system security is a validators assignment scheme, which would minimize the chances of attackers to get simultaneous access to 50% + 1 node of attacked shard and
validators. Unlike the shard nodes, its validators should change periodically. Since the permanent list of validators increases the risk of capture by the attacker, the risk of capture is increased with the time passed since the validator assignment. Also, lists of validators must be generated randomly, which allows the possibility of captured validators to be distributed more evenly.

These rules help to achieve the main goal - increase the cost of an attack on the system. Thanks to them, the attack on a weaker platform subsystem (shard) will not break its operation. Only taking control over a large number of nodes in the system, increases the probability of system operation fault proportionally to the percentage of the captured system nodes. Thus, the described system’s security achieves almost the same level as that of a PoW consensus projects, where the probability of double spending attack with 30% of the units exists, but very small.

When operating validators within a shard, it is important to pay attention to validators scheduled rotation. When the validator changes a checked shard, the validator is no longer required to store data of the old shard blockchain. It must connect to a new shard and get a full copy of its data. Obtaining a copy of the shard is quite time-consuming uses significant network environment. If the validators change is carried out simultaneously, such action may not be less severe than the DDOS attack. Therefore, it is important that a change of validators for the whole system was carried out at regular intervals. The platform currently expects that the validators team every hour rotates 10% of nodes, so the validators group fully rotates within 10 hours.

The systems using validators have a predicted vulnerability [8] described in the document "Verier's dilemma and attacks". The attack principle is quite simple - an attacker creates a transaction with such input data that its validation takes much more time than any ordinary transaction. Thus, the attacker seeks to ensure that validator would be economically interested to stop testing and accept the results of an attacker “as is” to receive compensation for the current validation and move to the next block validation. As a result, the validators pass such a transaction, not even knowing if it contains incorrect data.

The Resonance Consensus Algorithm is synchronous, which means that each shard has set execution time for the block calculations. Thus, if the validator detects that the validation execution time exceeds the calculated value, it means the attack "Verier's dilemma and attacks". Despite the fact that the Power_blockchain validator easily detects such an attack, it could still choose from two strategies:

- Despite the attack detection, to approve the block and get a reward for it. The disadvantage is that a successful attack will damage the project's reputation, which may affect the profitability of the node’s further work in all roles (and block generator and validator). In addition, the blockchain keeps information about validators confirmed an invalid block, which means the economic penalties for such validators. The results for the validator: less than $ 0.01 fee per block approval, the penalty for the approval of the invalid block (now the penalty time is expected in the amount of 100% pledge).
- Upon detection of an attack, to report about it to the Management layer for general inspection of shard and block containing an attack. After the settlement of the situation, the validator receives reward for actions on protecting the system security. Results for the validator: reward (now it is 10% of the pledge amount).
  Since the second option is an economically advantageous strategy, the majority of independent validators choose the second option, thus activating the overall shard verification. This means that the probability of such an attack is very low on the platform.

To prevent capturing of 50%+ 1 node of validators by an attacker it is important to the function a pseudo-random number generator (PRNG) of validators allocation into groups had the best possible quality so that the attacker could not influence and even predict the future distribution. However, the blockchain systems have problems with generation of truly random numbers based on the data already entered in the blockchain. Since these data are known to all participants, PRNG rules are known, and any participant can predict the result of the PRNG. To avoid such "random results", we must add additional sources of entropy within the generated block. The platform offers the following mechanism for obtaining sources of entropy: during the creation of each block, the nodes add to the block a mark of entropy - the hash signature of the previous block hash. Since only the owner of the node knows its private key, and it is economically interested to keep it confidential, the hash value of the previous block before publication is only known to the owner. Since the Resonance consensus algorithm is synchronous, the block includes at least 50% + 1 node independent sources of entropy.

The likelihood that an attacker can take control over a team of validators can be found using a binomial distribution§ For the team of N participants, if an attacker captured p percent of the total number of validators in the system, the probability that more than half of the team in this round will be controlled by an attacker will be equal to:

N k N−k(N) ∑ p (1 − p)

As the standard for the system, we assume N = 100. In this case, the probability of capturing more than 50% of the attacker's units equal to:

| Percentage of validators controlled by an attacker | Probability of taking control over the validators group operation |
| -------------------------------------------------- | ----------------------------------------------------------------- |
| 40%                                                | 0.0271                                                            |
| 33%                                                | 0.0004                                                            |

If the shard nodes coordinate their actions, they can increase the number of validators group members. This will reduce the likelihood of an attack, but also a little slows down a block approval. For N = 150 we get:

| Percentage of validators controlled by an attacker | Probability of taking control over the validators group operation |
| -------------------------------------------------- | ----------------------------------------------------------------- |
| 40%                                                | 0.0271                                                            |
| 0.0082                                             | 1.83 \* 10-5                                                      |

The main differences of validators from blocks generators in a shard are:

1. The validators do not need to constantly keep a copy of the validated shard. The validator synchronizes its copy of the shard data during the validation, and deletes data during the transition to another shard.
2. Validator is not involved in the block generation, but only validates it. Therefore, compared to blocks generators, it performs less computation.
