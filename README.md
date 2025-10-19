# riverbraid-substrate-core
Riverbraid is a living, mathematically-coherent AI substrate
[![Ledger Verified](https://github.com/Riverbraid/riverbraid-substrate-core/actions/workflows/verify-ledger.yml/badge.svg)](https://github.com/Riverbraid/riverbraid-substrate-core/actions/workflows/verify-ledger.yml)
## Quickstart

```bash
# run demo pipeline
npm run demo

# remember something (persists in data/memory.json)
npx riverbraid remember "First coherent pulse"

# list stored memories
npx riverbraid list

# validate Light-Spine schema sample
npx riverbraid validate
---

## Run it now (fast checks)

In your Codespace terminal:

```bash
# make CLI executable
chmod +x src/index.mjs

# demo
npm run demo

# remember a message
npx riverbraid remember "Riverbraid from iPhone Codespace"

# list persisted memories
npx riverbraid list

# run tests
npm test
