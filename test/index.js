const BlindBox = artifacts.require("BlindBox");

contract("BlindBox", (accounts) => {
    let blindBox;

    before(async () => {
        blindBox = await BlindBox.deployed();
    });

    it("should return the correct number of boxes owned by a user", async () => {
        const amount = 3;
        const value = web3.utils.toWei("0.3", "ether");

        // 购买盲盒
        await blindBox.buyBox(amount, { from: accounts[0], value });

        // 查询盲盒数量
        const boxesOwned = await blindBox.userBoxes(accounts[0]);
        assert.equal(boxesOwned.toString(), amount.toString(), "Incorrect number of boxes owned");
    });
});