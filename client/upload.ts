import Bundlr from '@bundlr-network/client';
const fs = require('fs');

// Load key for signing
var privateKey = JSON.parse(fs.readFileSync(process.argv[2]));
// Load text input that will be uploaded
var data = Buffer.from(process.argv[3], "utf-8");

// Create a bundler client with the m-testnet.arweave.net server
const bundler = new Bundlr("http://m-testnet.arweave.net:3000", "arweave", privateKey);

// Set tags for the content
const tags = [ { name: "Content-Type", value: "text/plain" } ];

(async() => { 
	// Upload using bundler interface
	const response = await bundler.uploader.upload(data, tags);
	console.log("Dataitem id = ", response.data.id);
})();
