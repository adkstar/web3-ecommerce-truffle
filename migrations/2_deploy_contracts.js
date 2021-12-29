const Dai = artifacts.require("Dai.sol");
const PaymentProcessor = artifacts.require("PaymentProcessor.sol");

module.exports = async function (deployer, network, addresses) {
  const [admin, payer, _] = addresses;
  if (network === "develop") {
    await deployer.deploy(Dai);
    const dai = await Dai.deployed();
    await dai.faucet(payer, web3.utils.toWei("10000"));
    // 1 Dai token = 1e18 "dai wei"
    await deployer.deploy(PaymentProcessor, admin, dai.address);
  } else {
    const ADMIN_ADDRESS = "admin";
    const DAI_ADDRESS = "";
    await deployer.deploy(PaymentProcessor, ADMIN_ADDRESS, DAI_ADDRESS);
  }
};
