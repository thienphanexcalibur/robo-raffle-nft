Robo Raffle NFT Mint


* Contract: [0xba13b6604ccc74ba83b5ac520fb5de808a8c13b2](https://testnet.bscscan.com/address/0xba13b6604ccc74ba83b5ac520fb5de808a8c13b2)
* OpenSea Testnet: [AI-Collection-V3](https://testnets.opensea.io/collection/ai-collection-v3)
* Preview link: https://robo-raffle-nft-suux.vercel.app/

## Frontend & Backend

```
yarn dev # this will start the frontend and api
```
## Contracts:
See `/contracts`. Type-safe with typechains:

- Compile:
```bash
npx hardhat compile
```

- Deploy UUPS transparent proxy
```bash
npx hardhat run -- ./scripts/deployProxy.ts ---network [bscTest|localhost]
```

- Upgrade implementation:
```bash
npx hardhat run -- ./scripts/upgradeProxy.ts ---network [bscTest|localhost]
```

- Verify implementation (using hardhat)
```bash
npx hardhat verify --network [bscTest] [address]
```