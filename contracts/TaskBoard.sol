//SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.20;

contract TaskBoard {
    struct Task {
        address user;
        string name;
        string description;
        bool completed;
    }

    uint256 public taskId;
    address public owner;
    mapping(uint256 => Task) taskList;

    event TaskCreated(uint256 taskId);
    event TaskAssigned(uint256 taskId, address user);
    event TaskCompleted(uint256 taskId);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function createTask(
        string calldata name,
        string calldata description
    ) external onlyOwner {
        taskId = taskId + 1;
        taskList[taskId] = Task({
            user: address(0),
            name: name,
            description: description,
            completed: false
        });
        emit TaskCreated(taskId);
    }

    function assignTask(uint256 _taskId, address user) external onlyOwner {
        require(user != address(0), "zero address");
        Task storage task = taskList[_taskId];
        task.user = user;
        emit TaskAssigned(_taskId, user);
    }

    function markAsTaskCompleted(uint256 _taskId) external {
        Task storage task = taskList[_taskId];
        require(task.user == msg.sender, "sender is not owner");
        task.completed = true;
        emit TaskCompleted(_taskId);
    }

    function getTask(uint256 _taskId) external view returns(Task memory) {
        return taskList[_taskId];
    }
}
