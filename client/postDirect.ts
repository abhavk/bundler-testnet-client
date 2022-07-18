import { createData, DataItem } from "arbundles";
import ArweaveSigner from "arbundles/src/signing/chains/ArweaveSigner";
import Axios, { AxiosResponse, AxiosRequestConfig, AxiosInstance } from "axios";
const fs = require('fs');

// Load private key used for signing data 
var privateKey = JSON.parse(fs.readFileSync(process.argv[2]));
var data = Buffer.from(process.argv[3], "utf-8");

(async() => {
	// Set tags to indicate content type (text in this example)
	const tags = [ { name: "Content-Type", value: "text/plain" } ];
	
	// Create and sign the data item
	const signer = new ArweaveSigner(privateKey);
	const dataItem = createData(
		data, 
		signer, 
		{ tags }
	);
	await dataItem.sign(signer);
	
	// create the Axios request instance
	let response: AxiosResponse<any>;
	const instance = Axios.create({
            baseURL: 'http://m-testnet.arweave.net:3000',
            timeout: 20000,
            maxContentLength: 1024 * 1024 * 512,
        });
	// Send a POST /tx request
	response = await instance.post('/tx/arweave', dataItem.getRaw(), {
		headers: { "Content-Type": "application/octet-stream" }
	});
	// Log the id
	console.log("Dataitem id = ", response.data.id);
})();
