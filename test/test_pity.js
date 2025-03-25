const BlindBox = artifacts.require("BlindBox");

contract("BlindBox", (accounts) => {
    let blindBox;
    const pityThreshold = 20; // 保底阈值
    const boxPrice = web3.utils.toWei("0.1", "ether"); // 每个盲盒的价格

    before(async () => {
        blindBox = await BlindBox.deployed();
    });

    it("should trigger pity after opening multiple boxes", async () => {
        const user = accounts[0];

        // 购买足够数量的盲盒
        const buyAmount = pityThreshold;
        const buyValue = web3.utils.toWei((0.1 * buyAmount).toString(), "ether");
        await blindBox.buyBox(buyAmount, { from: user, value: buyValue });

        // 打开盲盒
        const tx = await blindBox.openBox(pityThreshold, { from: user });

        // 检查保底事件
        const pityEvents = tx.logs.filter(log => log.event === "BoxOpened" && log.args.result === "Legendary Item");
        assert.equal(pityEvents.length, 1, "Pity not triggered");

        // 打印保底结果
        console.log("Pity Triggered:", pityEvents[0].args.result);

        // 检查计数器是否重置
        const userOpenCount = await blindBox.userOpenBoxCount(user);
        assert.equal(userOpenCount.toString(), "0", "Counter not reset");
    });
}); 