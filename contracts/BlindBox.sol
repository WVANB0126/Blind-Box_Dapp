// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

import "./safemath.sol";


contract BlindBox{
    using SafeMath for *;
    //用户拥有的盲盒数量
    mapping(address => uint) public boxesUserOwned;
    //盲盒稀有度
    mapping(int => string) public tokenRarity;
    //用户开盲盒次数
    mapping(address => uint) public userOpenBoxCount;
    //盲盒价格
    uint256 public boxPrice = 0.1 ether;
    //盲盒随机数模数
    uint Modulus = 1000;
    //保底次数
    uint PityCount = 20;
    //盲盒随机数
    uint[] public rands;
    //用户触发 保底 事件
    event PityTriggered(address indexed user,uint Rand,string result);
    //用户开盲盒事件
    event BoxOpened(address indexed user,uint rand, string result);

    function userBoxes(address _user) public view returns (uint) {
        return boxesUserOwned[_user];
    }

    function buyBox(uint _amount) public payable{
        require(_amount > 0 , "Amount must be greater than 0!");
        require(msg.value >= _amount * boxPrice, "Invalid amount");
        boxesUserOwned[msg.sender] = boxesUserOwned[msg.sender].add(_amount);
    }

    function openBox(uint _amount) public {
        require(boxesUserOwned[msg.sender] >= _amount, "You don't have enough boxes");
        boxesUserOwned[msg.sender] = boxesUserOwned[msg.sender].sub(_amount);
        //盲盒随机数生成模拟
        for(uint i = 0; i < _amount; i++) {
            userOpenBoxCount[msg.sender] = userOpenBoxCount[msg.sender].add(1);
            uint rand = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, i))) % Modulus;
            if(userOpenBoxCount[msg.sender] >= PityCount){
                emit BoxOpened(msg.sender,999,"Legendary Item");
                userOpenBoxCount[msg.sender] = 0;
            }
            else if(rand >= 990) {
                emit BoxOpened(msg.sender,rand, "Legendary Item");
                userOpenBoxCount[msg.sender] = 0;
            } else if(rand >= 850){
                emit BoxOpened(msg.sender,rand, "Rare Item");
            } else {
                emit BoxOpened(msg.sender,rand, "Common Item");
            }
        }
    }
}