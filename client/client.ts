/*
This file demonstrates uploading files to an Arweave testnet. 
*/

// This testnet is API compatible with bundlr-network's javascript-client
import Bundlr from '@bundlr-network/client';
const fs = require('fs');

// User wallet path specified in the second argument
const user_wallet_path = process.argv[2];
var privateKey = JSON.parse(fs.readFileSync(user_wallet_path))

// Create a bundler client with the m-testnet.arweave.net server
const bundler = new Bundlr("http://m-testnet.arweave.net:3000", "arweave", privateKey);

async function main(count) {

	// Upload the file "count" times (default 1)
	for (let i=0; i<count;i++) {
		await uploadToBundler(process.argv[3]);
	}
}

// Upload files to the network and fetch the DataItem ID in response
async function uploadToBundler(path) {
  console.log("Uploading file =", path);
  const response = await bundler.uploadFile(path);
  console.log("DataItem id = ", response.data.id);
}

// Start the main process
main(process.argv[4] ? Number(process.argv[4]) : 1);
