import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";

describe("TaskBoard", function () {
    async function deployContract() {
        const TaskBoard = await ethers.getContractFactory("TaskBoard");
        const taskBoard = await TaskBoard.deploy();
        return taskBoard;
    }

    describe("TaskCreation", function () {
        it("should create task", async function() {
            const contract = await loadFixture(deployContract);
            await contract.createTask("Sample Task1", "Sample Task description");
            expect(await contract.taskId()).to.equal(1);
        });
        it("should assign task", async function() {
            const contract = await loadFixture(deployContract);
            const addressList = await ethers.getSigners();
            await contract.createTask("Sample Task1", "Sample Task description");
            expect(await contract.taskId()).to.equal(1);
            const user = addressList[1].address;
            await contract.assignTask(1, user);
            const task = await contract.getTask(1);
            expect(task[0]).to.equal(user);
        });
        it("should mark as task completed", async function() {
            const contract = await loadFixture(deployContract);
            const addressList = await ethers.getSigners();
            await contract.createTask("Sample Task1", "Sample Task description");
            expect(await contract.taskId()).to.equal(1);
            const user = addressList[1].address;
            await contract.assignTask(1, user);
            var task = await contract.getTask(1);
            await contract.connect(addressList[1]).markAsTaskCompleted(1);
            task = await contract.getTask(1);
            expect(task[3]).to.equal(true);
        });
    });
});
