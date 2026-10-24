# RestoreLab inventory service

Read public testnet ledger entries and turn explicit dependencies into a recovery readiness report. RPC is fixed to Stellar testnet; the network passphrase is checked before inspection. A getLedgerEntries omission is marked missing and unresolved. It is never promoted to archived.

## Integrated setup

Clone the five repositories as siblings with their original names:

```sh
mkdir restorelab && cd restorelab
git clone https://github.com/restorelab-labs/restorelab-contracts.git
git clone https://github.com/restorelab-labs/restorelab-planner.git
git clone https://github.com/restorelab-labs/restorelab-backend.git
git clone https://github.com/restorelab-labs/restorelab-frontend.git
git clone https://github.com/restorelab-labs/restorelab-cli.git
node --test restorelab-*/test.mjs
cargo test --locked --manifest-path restorelab-contracts/Cargo.toml
node restorelab-backend/server.mjs
# Another terminal:
node restorelab-frontend/server.mjs
```

Open http://127.0.0.1:4390. Node 24+ is required. The desk, planner and RPC inventory use Node built-ins; the optional testnet deployment/verifier uses pinned Stellar SDK 17.3.0 (`npm ci` in backend).

## API

GET /health — identity and signing=false. GET /example — clearly synthetic training inventory. GET /specimen — public testnet specimen manifest. POST /plan — assess supplied inventory. POST /inspect — inspect supplied public key manifest against fixed testnet RPC, then assess it. JSON bodies are limited to 1 MiB and 100 entries. Origin and Host are loopback-restricted. No keys, signing or submission endpoints. Raw RPC observations are returned in memory; export what you need before closing the desk.

A manifest's declared storage kinds/dependencies are caller supplied. This MVP checks shape and duplicate keys but does not fully decode and authenticate the declared type of every imported XDR key. A live lookup and TTL are observations, not proof of complete application coverage. Only explicit entries are inspected.

## Reference

[Stellar state archival](https://developers.stellar.org/docs/learn/fundamentals/contract-development/storage/state-archival) · [RPC live entry lookup](https://developers.stellar.org/docs/data/apis/rpc/api-reference/methods/getLedgerEntries)
