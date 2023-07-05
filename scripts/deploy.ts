import { ethers } from "hardhat";

async function main() {
  const TaskBoard = await ethers.getContractFactory("TaskBoard");
  const taskBoard = await TaskBoard.deploy();

  await taskBoard.deployed();

  console.log(`Contract Address: ${taskBoard.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
