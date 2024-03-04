### DSponsor SDK

DSponsor SDK is a library that allows you to easily integrate DSponsor into your app.

It facilitates the creation, management, and interaction with smart contracts for advertising and sponsorship.

Use the Ethereum library ethers.js.

#### Quick Start

```js
import DSponsorSDK from 'dsponsorsdk';

// Initialize with default settings (Polygon Mumbai)
// Will use a new private key if not provided
const dsponsorSDK = new DSponsorSDK();

// For custom configuration, pass the desired chain and private key
const customDsponsorSDK = new DSponsorSDK({
    chain: {
        chainName: 'ethereum-sepolia', // Example for Sepolia testnet
        rpc: 'https://sepolia.infura.io/v3/{infura_project_id}',
        contracts: {
            DSponsorAdmin: '0xYourContractAddressHere',
        },
    },
    privateKey: 'your-private-key-here',
});
```

After initializing DSponsorSDK, you can interact with the DSponsor ecosystem:

```js
// Get the address of the DSponsorAdmin contract
console.log(`DSponsorAdmin Address: ${dsponsorSDK.contracts.DSponsorAdmin.address}`);

// Example: Fetching the base point share (BPS) value
async function fetchBPS() {
    const bps = await dsponsorSDK.contracts.DSponsorAdmin.getBPS();
    console.log(`Current BPS: ${bps}`);
}

fetchBPS();
```

#### API

##### DSponsorSDK

- Constructor: Initialize the SDK with specific blockchain settings.

```javascript
new DSponsorSDK({chain, privateKey});
```

##### DSponsorAdmin Service

- getBPS: Fetches the current Base Point Share (BPS) value.

```javascript
-dsponsorSDK.contracts.DSponsorAdmin.getBPS();
```
- getCurrentTrustedForwarder: Gets the address of the current trusted forwarder.
```
javascript
- dsponsorSDK.contracts.DSponsorAdmin.getCurrentTrustedForwarder();
```
- getNFTFactoryContractAddress: Retrieves the address of the NFT Factory contract.
```
javascript
- dsponsorSDK.contracts.DSponsorAdmin.getNFTFactoryContractAddress(); 
```

- getOfferContract: Fetches the contract address for a specific offer ID.

```javascript

dsponsorSDK.contracts.DSponsorAdmin.getOfferContract(offerId); 
```

- getOfferProposals: Retrieves proposals for a specific offer.

```javascript

dsponsorSDK.contracts.DSponsorAdmin.getOfferProposals(offerId, tokenId, adParameter); 
```

- getOwnerAddress: Returns the address of the contract owner.

```javascript

dsponsorSDK.contracts.DSponsorAdmin.getOwnerAddress(); 
```

- getRecipientAddress: Fetches the recipient address for protocol fees.

```javascript

dsponsorSDK.contracts.DSponsorAdmin.getRecipientAddress(); 
```

- getSwapRouterAddress: Retrieves the address of the swap router.

```javascript

dsponsorSDK.contracts.DSponsorAdmin.getSwapRouterAddress(); 
```

- isAllowedAdParameter: Checks if an ad parameter is allowed for a specific offer.

```javascript

dsponsorSDK.contracts.DSponsorAdmin.isAllowedAdParameter(offerId, adParameter); 
```

- isOfferAdmin: Verifies if an address is an admin for a specific offer.

```javascript

dsponsorSDK.contracts.DSponsorAdmin.isOfferAdmin(offerId, admin); 
```

- isOfferDisabled: Checks if a specific offer is disabled.

```javascript
dsponsorSDK.contracts.DSponsorAdmin.isOfferDisabled(offerId);
```

#### Additional Utilities

generatePrivateKey: Generates a new private key.

```javascript

DSponsorSDK.generatePrivateKey(); 
```
