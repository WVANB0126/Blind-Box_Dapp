const web3 = new Web3("http://127.0.0.1:7545"); // Ganache 地址

const contractAddress = "Your Contract Address"; // 替换为实际地址


const abi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "rand",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "result",
        "type": "string"
      }
    ],
    "name": "BoxOpened",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "Rand",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "result",
        "type": "string"
      }
    ],
    "name": "PityTriggered",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "boxPrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "boxesUserOwned",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "rands",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "name": "tokenRarity",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "userOpenBoxCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "userBoxes",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "buyBox",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "openBox",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]; // 替换为实际 ABI
const contract = new web3.eth.Contract(abi, contractAddress);


async function init() {
    const accounts = await web3.eth.getAccounts();
    account = accounts[0]; // 默认第一个账户
    document.getElementById("account").innerText = account;
    updateUI();
}

async function updateUI() {
    try {
        const boxCount = await contract.methods.userBoxes(account).call();
        document.getElementById("boxCount").innerText = boxCount;
    } catch (error) {
        console.error("Error fetching box count:", error);
    }
}

async function buyBox() {
    try {
        document.getElementById("loading").style.display = "block";
        await contract.methods.buyBox(1).send({
            from: account,
            value: web3.utils.toWei("0.1", "ether")
        });
        document.getElementById("result").innerText = "购买成功！";
        updateUI();
    } catch (error) {
        document.getElementById("result").innerText = "错误: " + error.message;
    } finally {
        document.getElementById("loading").style.display = "none";
    }
}

async function openBox() {
    try {
        document.getElementById("loading").style.display = "block";
        const result = await contract.methods.openBox(1).send({ from: account, gas: 3000000 });
        
        // 检查事件日志
        const events = result.events.BoxOpened;
        if (events) {
            const rarity = events.returnValues.result;
            if(rarity == "Common Item"){
                document.getElementById("result").style.color = "green";
                document.getElementById("result").innerText = `开箱成功！获得: ${rarity}`;
            }
            else if(rarity == "Rare Item"){
                document.getElementById("result").style.color = "purple";
              document.getElementById("result").innerText = `开箱成功！获得: ${rarity}`;
            }
            else if(rarity == "Legendary Item"){
                document.getElementById("result").style.color = "red";
                document.getElementById("result").innerText = `开箱成功！获得: ${rarity}`;
            }
        } else {
            document.getElementById("result").innerText = "开箱成功！但未能获取到物品信息。";
        }
        
        updateUI();
    } catch (error) {
        document.getElementById("result").innerText = "错误: " + error.message;
    } finally {
        document.getElementById("loading").style.display = "none";
    }
}



function viewInventory() {
    // 跳转到个人仓库页面
    window.location.href = "inventory.html";
}

window.onload = init;