var safemath = artifacts.require("safemath");
var BlindBox = artifacts.require("BlindBox");
module.exports = function(deployer) {
  deployer.deploy(safemath);
  deployer.link(safemath, BlindBox);
  deployer.deploy(BlindBox);
};
