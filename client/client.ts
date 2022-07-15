import Bundlr from '@bundlr-network/client';
const fs = require('fs');

const user_wallet_path = process.argv[2];
var privateKey = JSON.parse(fs.readFileSync(user_wallet_path))


const bundler = new Bundlr("http://m-testnet.arweave.net:3000", "arweave", privateKey);

async function main(count) {
	for (let i=0; i<count;i++) {
		await uploadToBundler(process.argv[3]);
	}
        //	await uploadFolder(process.argv[5]);
}

async function uploadToBundler(path) {
  console.log("Uploading file =", path);
  const response = await bundler.uploadFile(path);
  console.log("DataItem id = ", response.data.id);
}

async function uploadFolder(path) {
  console.log("Uploading folder =", path);
  const response = await bundler.uploader.uploadFolder(path);
  console.log(response);
}

main(process.argv[4] ? Number(process.argv[4]) : 1);
