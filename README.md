# Arweave testnet

An Arweave testnet (with bundler enabled) has been set up on `m-testnet.arweave.net:3000`. This testnet is API compatible with [bundlr-network's arweave-js](https://github.com/Bundlr-Network/js-client) client. 

In order to use the testnet, use the following steps. 

## 1. Generate wallet for Signing
Generate an Arweave `RSA` key. This key will not contain any tokens or `AR` but will be used by your team to sign data uploads to the network. You can generate an Arweave key using: 
### arweave-js

[arweave-js](https://github.com/ArweaveTeam/arweave-js#create-a-new-wallet-and-private-key): 
```
arweave.wallets.generate().then((key) => {
    console.log(key);
    // {
    //     "kty": "RSA",
    //     "n": "3WquzP5IVTIsv3XYJjfw5L-t4X34WoWHwOuxb9V8w...",
    //     "e": ...
});
```

### ArConnect
[ArConnect](https://www.arconnect.io/): This is the main Arweave web wallet

We will need this key to fund uploads signed by your private key before you go live on mainnet! 

## 2. Use node client for uploads 

Use the nodejs client to test file uploads. 
```
const bundler = new Bundlr("http://m-testnet.arweave.net:3000", "arweave", privateKey);
```

Upload the file at `path` to the testnet. 
```
const response = await bundler.uploadFile(path);
console.log(response);
```

This code path generates a `DataItem`, signs it using your `privateKey` and sends it to `m-testnet.arweave.net:3000` using the `POST /tx` API. A more detailed explanation and comments on the sample code is provided in `/client/client.ts`. 

### Sample Run

In order to test the default client, run
```
npm install
npm test <path-to-keyfile-json> <path-to-data-tobeuploaded>
// Uploading file = client/futureinternet-11-00170.pdf
// DataItem id =  gRPbue7-beLrz9Z4pSuhx-I2vqbd1JYBTfleg2lheCI 
```

## 3. Fetch the uploaded tx

Use the `GET /tx` endpoint to fetch the uploaded data item. 
```
curl http://m-test.arweave.net:1984/<TX-ID>
```
