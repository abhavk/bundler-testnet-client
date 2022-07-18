# Arweave testnet

An Arweave testnet (with bundler enabled) has been set up on `m-testnet.arweave.net:3000`. This testnet is API compatible with [bundlr-network's arweave-js](https://github.com/Bundlr-Network/js-client) client. 

In order to use the testnet, use the following steps. 

## 1. Generate wallet for Signing
Generate an Arweave `RSA` key. This key will be used for signing uploads and not tokens. You can generate an Arweave key using: 
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

We will need you to tell us this key before you go live on mainnet! This key is required for signing the data only. You do not need to hold any tokens.

## 2. Use node client for uploads 

### Using bundlr-network helper

This generates a `DataItem`, signs it using your `privateKey` and sends it to `m-testnet.arweave.net:3000` using the `POST /tx` API. More details are available in the file `client/client.ts`.

Use the nodejs client to test file uploads. 
```
const bundler = new Bundlr("http://m-testnet.arweave.net:3000", "arweave", privateKey);
```

Upload the file at `path` to the testnet. 
```
const response = await bundler.uploadFile(path);
console.log(response);
```

### Directly post data (without helper)
This alternative code for uploading data does the same things that are shown above, but with a lower-level client so you can see the details of creating, signing and posting Arweave DataItems. Check out the file `client/postDirect.ts` for more details in the comments. 

Read input
```
var data = Buffer.from(process.argv[3], "utf-8");
```

Set tags to indicate `Content-Type`
```
const tags = [ { name: "Content-Type", value: "text/plain" } ];
```

Create and sign a `DataItem`
```
const signer = new ArweaveSigner(privateKey);
const dataItem = createData(
                data,
                signer,
                { tags }
        );
await dataItem.sign(signer);
```

Send a post transaction request
```
response = await instance.post('/tx/arweave', dataItem.getRaw(), {
        headers: { "Content-Type": "application/octet-stream" }
});
```

## 3. Sample Run

### Upload / Direct Upload

In order to test the default client, run
```
npm install
npm test <path-to-keyfile-json> <path-to-data-tobeuploaded>
// Uploading file = client/futureinternet-11-00170.pdf
// DataItem id =  gRPbue7-beLrz9Z4pSuhx-I2vqbd1JYBTfleg2lheCI (this is the TX-ID)
```

Alternatively, in order to upload using the low-level client making a direct `POST /tx` request, run
```
ts-node postDirect.ts <path-to-keyfile-json> "hello arweave"
```

### Fetch

After uploading a data item, wait a few seconds (maximum of 10s) for the data to be included in the bundle and mined. 
 
Then, trigger unbundling on the testnet with the following GET call (NOTE: this is not required on mainnet as bundled data items are immediately and automatically available using the next `GET /tx` call): 

```
curl http://m-testnet.arweave.net:1984/mine
```

Finally, use the `GET /tx` endpoint to fetch the uploaded data item. 
```
curl http://m-test.arweave.net:1984/<TX-ID>
```
