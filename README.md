Robo Raffle NFT Mint
## Frontend & Backend

```
yarn dev # this will start the frontend and api
```
## Contracts:
See `/contracts`. Type-safe with typechains:

- Compile:
```
npx hardhat compile
```

- Deploy UUPS transparent proxy
```
npx hardhat run -- ./scripts/deployProxy.ts ---network [bscTest|localhost]
```

- Upgrade implementation:
```
npx hardhat run -- ./scripts/upgradeProxy.ts ---network [bscTest|localhost]
```

- Verify implementation (using hardhat)
```
npx hardhat verify --network [bscTest] [address]
```