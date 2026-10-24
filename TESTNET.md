# Testnet evidence boundaries

The recorded pilot uploaded and deployed the continuity specimen, wrote a durable digest and a temporary hint, then extended the live instance/code and persistent record. Five successful transaction receipts are recorded. Before/after RPC captures show increased live-until ledgers for instance and durable record; the temporary hint's live-until ledger did not change.

No expired entry was restored on testnet in this pilot. Do not describe it as a completed archived-state restoration. Expiration and automatic access after expiry are exercised separately in seven Rust host tests; the training inventory is synthetic. Historical RPC snapshots are recorded observations, not independently authenticated by the verifier.

```sh
cd restorelab-backend
npm ci
node verify-testnet.mjs
```

The verifier checks the deployed executable hash and all five transaction statuses, then rechecks the recorded TTL comparisons. It does not reconstruct historical ledger state from consensus proofs.

To run a fresh disposable testnet pilot, build the contract using Stellar CLI, then set RESTORELAB_ALLOW_TESTNET=1, RESTORELAB_PILOT_DIR to a private directory outside the checkout and RESTORELAB_WASM to the compiled specimen file. Run `node pilot-testnet.mjs`. It creates a private testnet identity, requests faucet funds, signs testnet transactions and writes public evidence files here. Never publish the private pilot directory. Resume using the same directory after interruptions; a transaction whose confirmation was lost requires reconciliation before rerunning. The application API and desk never sign or submit.
