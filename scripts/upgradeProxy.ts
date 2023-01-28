import { ethers, upgrades } from "hardhat";

async function main() {
  const NFTContractV2 = await ethers.getContractFactory("NFTV2");
  const nft = await upgrades.upgradeProxy(
    "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512",
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
