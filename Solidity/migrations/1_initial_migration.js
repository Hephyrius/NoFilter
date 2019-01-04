var nofilter = artifacts.require ("./NoFilter.sol");

module.exports = function(deployer) {
  deployer.deploy(nofilter);
};
