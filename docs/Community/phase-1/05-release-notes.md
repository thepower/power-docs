# Release notes

1. Block hash is now received according to the block height.
2. The Tea Ceremony is updated, and now it is now more user-friendly.
3. `tpic` now supports hostnames.
4. The file descriptor leak in `tpic` has been eliminated.
5. Dead processes (connections) leak in `tpic` has been eliminated.
6. Implemented a node key check before start to display errors in a human-readable format. Node key-related errors has been described.
7. Public node keys comparison system has been improved.
8. Additional endpoints for monitoring and consensus has been added. The following metrics can now be monitored via http:
   
   - `tpic`;
   - chain state — how many nodes are behind;
   - block vote — consensus monitoring. Now you can monitor, which blocks are pending, and who signed them (node name is displayed).

9. Logging fixed.
10. `tpic` streams are now displayed in the node state.
11. Fractional gas is added. The fractional gas is when a user receives less than 1 gas for 1 token. An exact value can be specified (common fraction).
12. The `tp` utility can now calculate the gas and fee.
13. `Msgpack` interface is now fixed.
14. The node settings administration is now became simpler. The settings patch keys are now stored separately.
15. EVM call results are now stored in the block. They are also saved into EVM logs that can be also displayed.
16. The wallet initialization from `genesis.txt` is now possible. If there are wallets to be created specified in `genesis.txt`, they will be created.
17. The Tea Ceremony server has been significantly refactored (approx. 50%). Waiting for all participants at stage 1, ports check (including Tea Ceremony client).
18. Hot updates are almost done.
19. Storage administration functionality is now separated from the core functionality in `tp` utility.