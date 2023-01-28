import { ethers, upgrades } from "hardhat";

async function main() {
  const NFTContract = await ethers.getContractFactory("NFT");
  const nft = await upgrades.deployProxy(NFTContract, [], { kind: "uups" });
  await nft.deployed();
  console.log('proxy is deployed', nft.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
