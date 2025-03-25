# 盲盒 DApp

这是一个基于以太坊的去中心化应用程序（DApp），允许用户购买和打开盲盒。每个盲盒都有一定的概率获得不同稀有度的物品。

## 项目背景

盲盒是一种流行的商品形式，用户在购买时并不知道盒子里具体的物品是什么。这个DApp通过智能合约实现了盲盒的购买和开箱功能，确保了过程的透明和公平。

## 功能

- 用户可以购买盲盒。
- 用户可以打开盲盒，获得随机物品。
- 每20次开箱必定获得传奇物品（保底规则）。

## 技术栈

- **前端**: HTML, CSS, JavaScript
- **智能合约**: Solidity
- **区块链网络**: 以太坊（使用Ganache进行本地开发）
- **工具**: Truffle, Web3.js

## 安装

### 先决条件

- Node.js和npm
- Truffle
- Ganache

### 步骤

1. **克隆仓库**

   ```bash
   git clone https://github.com/WVANB0126/Blind-Box_Dapp.git
   cd Blind-Box_Dapp
   ```

2. **安装依赖**

   确保你已经安装了Node.js和npm，然后运行：

   ```bash
   npm install
   ```

3. **启动Ganache**

   打开Ganache应用程序，确保它在`http://127.0.0.1:7545`上运行。

4. **编译和部署智能合约**

   使用Truffle编译和部署合约：

   ```bash
   truffle compile
   truffle migrate
   ```

5. **启动前端**

   打开`fronted/index.html`文件，使用浏览器打开。

## 使用说明

- **购买盲盒**: 点击"购买盲盒"按钮，支付0.01 ETH购买一个盲盒。
- **开箱**: 点击"开箱"按钮，打开一个盲盒并查看获得的物品。
- **查看个人仓库**: 点击"查看个人仓库"按钮，查看账户中拥有的盲盒数量。

## 配置

- **truffle-config.js**: 配置网络和编译器设置。确保在此文件中正确配置了Infura项目ID和助记词。
- **app.js**: 配置Web3和合约交互逻辑。确保合约地址和ABI正确。

## 常见问题

1. **如何解决合约部署失败的问题？**
   - 确保Ganache正在运行，并且端口配置正确。
   - 检查`truffle-config.js`中的网络配置。

2. **如何处理前端无法连接到区块链的问题？**
   - 确保Web3.js库已正确加载。
   - 检查合约地址和ABI是否正确。

3. **如何增加新的功能？**
   - 修改Solidity合约文件，然后重新编译和部署。
   - 更新前端代码以支持新功能。

## 注意事项

- 在部署到主网或测试网时，请确保有足够的ETH用于支付交易费用。
- 确保在`Mnemonic.txt`中安全存储你的助记词。

## 许可证

本项目使用GPL-3.0许可证。 