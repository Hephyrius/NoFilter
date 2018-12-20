var Migrations = artifacts.require("./Migrations.sol");
var Treddit = artifacts.require ("./Treddit.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Treddit);
};
