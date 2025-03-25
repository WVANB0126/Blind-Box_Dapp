var SafeMath = artifacts.require("SafeMath");
var BlindBox = artifacts.require("BlindBox");

module.exports = function(deployer) {
  deployer.deploy(SafeMath);
  deployer.link(SafeMath, BlindBox);
  deployer.deploy(BlindBox);
};
