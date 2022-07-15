import { Bundle } from "arbundles";
import { readFileSync } from "fs";

async function main() {
	const bundleData = readFileSync(process.argv[2]);

	const bundle = new Bundle(bundleData);

	console.log(bundle);
	console.log(bundle.getIds());
	const verified = await bundle.verify();
	console.log(verified);
}

main();
