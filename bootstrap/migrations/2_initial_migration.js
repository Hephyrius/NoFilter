var DiceGame = artifacts.require("./DiceGame.sol");
var treddit = artifacts.require ("./Treddit.sol");

module.exports = function(deployer) {

  deployer.deploy(DiceGame);
  deployer.deploy(treddit);
};
