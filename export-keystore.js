const { Wallet } = require("ethers");
(async () => {
  // replace with your private key (with 0x)
  const pk = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
  const wallet = new Wallet(pk);
  const password = "chipinge77";
  const json = await wallet.encrypt(password);
  console.log(json);
})();
