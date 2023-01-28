import { ethers, upgrades } from "hardhat";

async function main() {
  const NFTContractV2 = await ethers.getContractFactory("NFTV2");
  const nft = await upgrades.upgradeProxy(
    "0xba13b6604ccc74ba83b5ac520fb5de808a8c13b2",
    NFTContractV2,
    {
      kind: "uups",
    }
  );
  await nft.deployed();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
