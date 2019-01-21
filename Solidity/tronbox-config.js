module.exports = {
  networks: {
    development: {
      // For trontools/quickstart docker image
      privateKey: 'da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0',
      consume_user_resource_percent: 20,
      fee_limit: 1000000000,
      fullHost: "http://127.0.0.1:9090",
      network_id: "*"
    },
    /*development: {
      privateKey: 'e58f9af16a78e73ac173affa33265f81012e4f1898564fd8831c8e9079e2c959',
      consume_user_resource_percent: 30,
      fee_limit: 1000000000,
      fullHost: "https://api.shasta.trongrid.io",
      network_id: "*"
    },
    shasta: {
      privateKey: "e58f9af16a78e73ac173affa33265f81012e4f1898564fd8831c8e9079e2c959",
      consume_user_resource_percent: 30,
      fee_limit: 1000000000,

      // tronbox 2.1.9+
      // fullHost: "https://api.shasta.trongrid.io",

      // tronbox < 2.1.9
      fullNode: "https://api.shasta.trongrid.io",
      solidityNode: "https://api.shasta.trongrid.io",
      eventServer: "https://api.shasta.trongrid.io",

      network_id: "2"
    }*/
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 1000
    }
  }
};