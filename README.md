# DSponsor Dashboard

## Table of contents

<!-- TOC -->
- [DSponsor Dashboard](#dsponsor-dashboard)
  - [Table of contents](#table-of-contents)
  - [Installation](#installation)
    - [Clone the repository](#clone-the-repository)
    - [Navigate into the project directory](#navigate-into-the-project-directory)
    - [Install dependencies](#install-dependencies)
  - [Configuration](#configuration)
    - [Configuring `features.ts` for Production or Testing](#configuring-featurests-for-production-or-testing)
    - [Environment Configuration](#environment-configuration)
      - [`.env.local` Configuration](#envlocal-configuration)
      - [Example Configuration File](#example-configuration-file)
      - [ThirdWeb Configuration](#thirdweb-configuration)
  - [Environment](#environment)
  - [Project Structure](#project-structure)
    - [`public/`](#public)
    - [`src/`](#src)
      - [`abi/`](#abi)
      - [`components/`](#components)
      - [`data/`](#data)
      - [`hooks/`](#hooks)
      - [`lib/`](#lib)
      - [`pages/`](#pages)
      - [`styles/`](#styles)
      - [`utils/`](#utils)
      - [`config/`](#config)
      - [`contexts/`](#contexts)
      - [`middleware.ts`](#middlewarets)
  - [Development Commands](#development-commands)
  - [Naming Conventions](#naming-conventions)
  - [Thirdweb Integration](#thirdweb-integration)
  - [Crossmint Integration](#crossmint-integration)
  - [Contribution](#contribution)
  - [GraphQL Essentials](#graphql-essentials)
    - [The `executeQuery` Function](#the-executequery-function)
    - [Example Usage of `executeQuery`](#example-usage-of-executequery)
    - [Optimizing Requests](#optimizing-requests)
    - [GraphQL Subgraph Definitions](#graphql-subgraph-definitions)
      - [Essentials Concepts](#essentials-concepts)
        - [1. **Minting**](#1-minting)
        - [2. **Primary Market**](#2-primary-market)
        - [3. **Secondary Market**](#3-secondary-market)
      - [Subtilities](#subtilities)
      - [Objects](#objects)

## Installation

To install the project, you can simply clone the project repository and install the dependencies using Yarn. Follow these steps:

### Clone the repository

```bash
git clone https://github.com/your-username/dsponsor-dashboard.git
```

### Navigate into the project directory

```bash
cd dsponsor-dashboard
```

### Install dependencies

```bash
npm i
```

## Configuration

### Configuring `features.ts` for Production or Testing

The `features.ts` file is used to manage feature flags within the application. Feature flags allow for the conditional enabling or disabling of certain functionalities, which is useful for development, testing, and production environments.

**Example Configuration:**

```typescript
const env = process.env.NEXT_PUBLIC_CONFIG_MODE;
const isDevelopment = env === "dev";

// Feature flags configuration
export const features = {
  canCreateOffer: true,
  canSeeSubmittedAds: true,
  canAcceptNativeTokens: false,
  canFilterTransactionsWithWETH: true,
  canChangeTokenMintPrice: false,
  canChangeValidators: false
};
```

### Environment Configuration

To manage different configurations for development and production environments, use the `.env.local` file in your project’s root directory. This file allows you to define environment variables that control the behavior of your application.

#### `.env.local` Configuration

- **Development (`dev`)**: The environment is set to `"dev"` by adding the following line to your `.env.local` file:

```env
NEXT_PUBLIC_CONFIG_MODE=dev
NEXT_PUBLIC_RELAYER_URL=https://relayer.dsponsor.com
NEXT_PUBLIC_TUNNELING_URL=https://xxx-xxx-xxx-xxx-xxx.ngrok-free.app
```

#### Example Configuration File

Here’s an example of a chain configuration file for the Base network:

```typescript
import Network from "@/utils/networks/networks";
import contractABI from "@/abi/dsponsorAdmin.json";
import { Base } from "@thirdweb-dev/chains";

const prodBase = {
  chainId: 8453,
  chainName: "base",
  chainObject: Base,
  network: Network.BASE_MAINNET,
  logoURL: "/images/base-logo.png",
  explorerBaseURL: "https://basescan.org",

  rpcURL: "https://mainnet.base.org",
  smartContracts: {
    NATIVE: {
      address: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      symbol: "ETH"
    },
    WNATIVE: {
      address: "0x4200000000000000000000000000000000000006",
      decimals: 18,
      symbol: "WETH"
    },
    USDC: {
      address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      decimals: 6,
      symbol: "USDC"
    },
    WETH: {
      address: "0x4200000000000000000000000000000000000006",
      decimals: 18,
      symbol: "WETH"
    },
    UNISWAP_QUOTER: {
      address: "0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a"
    },
    DSPONSORADMIN: {
      address: "0xC6cCe35375883872826DdF3C30557F16Ec4DD94c",
      abi: contractABI
    },
    DSPONSORMP: {
      address: "0x86aDf604B5B72d270654F3A0798cabeBC677C7fc"
    }
  },
  features: {
    crossmint: {
      enabled: false,

      config: {
        projectId: "82d192a5-c754-4280-a6cb-cb3d7b0f9bd9",
        priceLimit: 0.25,

        bidCollectionId: "",
        buyCollectionId: "",
        mintCollectionId: "",

        environment: "production",

        currency: "EUR",
        locale: "en-EN",
        paymentMethod: "fiat"
      }
    }
  }
};

export default prodBase;
```

- **`chainId`**: A unique identifier for the blockchain network.
- **`chainName`**: A human-readable name of the chain.
- **`chainObject`**: An object representing the chain, typically imported from a library like `@thirdweb-dev/chains`.
- **`network`**: The network configuration object, imported from your utilities or configuration files.
- **`logoURL`**: The path to the logo image for the chain.
- **`explorerBaseURL`**: The URL of the blockchain explorer for the chain.
- **`rpcURL`**: The RPC URL used to interact with the blockchain.
- **`smartContracts`**: Configuration details for various smart contracts deployed on the chain, including their addresses, ABIs, and other relevant details.
- **`features`**: Optional features specific to the chain, such as configurations for external services like crossmint (allowing payment with cards).

#### ThirdWeb Configuration

To configure ThirdWeb, you need to use a client ID. This ID is essential for authenticating your application with ThirdWeb's services. The client ID can be set using an environment variable, allowing you to keep sensitive information out of your source code.

Here’s how to configure the ThirdWeb client in your Next.js application:

```javascript
import { createThirdwebClient } from "thirdweb";

export const clientId =
  process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID
});

export { client };
export default client;
```

1. **Environment Variable Setup**:
The clientId is retrieved from an environment variable NEXT_PUBLIC_THIRDWEB_CLIENT_ID. To set this up, create a .env.local file in the root directory of your Next.js project with the following content:

```env
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_real_client_id_here
```

Replace your_real_client_id_here with the actual client ID provided by ThirdWeb.

## Environment

The project operates in several environments:

- **Development**: Local development environment. Start with `yarn dev`.
- **[Testnet](https://app.testnet.dsponsor.com)**: Preview environment on the testnet blockchain network.
- **[Staging](https://app.staging.dsponsor.com)**: Preview environment on the production blockchain network.
- **[Production](https://app.dsponsor.com)**: Official live application.

## Project Structure

The application is organized to be modular and maintainable. Each folder in `src/` has a specific role and is structured to facilitate scalability.

### `public/`

Contains static files like images, fonts, and other assets that are publicly accessible.

**Examples:**

- `favicon.ico`: The favicon for the application.
- `images/siborg-ads.png`: The SiBorg Ads logo.

### `src/`

The source folder contains all the application code.

#### `abi/`

Contains the ABIs (Application Binary Interfaces) for smart contracts that the application interacts with.

**Examples:**

- `dsponsorAdmin.json`: ABI file for `DSponsorAdmin` smart contract.

**Goal**:

The `abi/` folder centralizes all smart contract ABIs, making it easier to manage and update contract interactions. By keeping these files in a dedicated folder, the project maintains a clear separation between frontend logic and blockchain-specific configurations.

#### `components/`

Contains all the reusable components for building the UI.

- **`ui/`**: Reusable UI components, such as buttons, inputs, and modals.

  **Examples:**

  - `Button.tsx`: A reusable button component.
  - `Modal.tsx`: A reusable modal component.

  **Goal**:

  The `ui/` subfolder aims to create a consistent and uniform UI across the application. By centralizing reusable UI elements, the project ensures that styling and functionality remain consistent, reducing the need for duplicated code.

- **`layout/`**: Components related to the overall layout of the application.

  **Examples:**

  - `Header.tsx`: The global header component.
  - `Footer.tsx`: The global footer component.
  - `Token.tsx`: The token page component.

  **Goal**:

  The `layout/` subfolder is dedicated to global components that define the structure and layout of the application. By separating layout components, the project can easily modify the application’s structure without affecting feature-specific code.

- **`features/`**: Components that are specific to certain features or pages.

  **Examples:**

  - `OfferName.tsx`: A component used to create an offer by requesting the offer's name.
  - `OwnedTokens.tsx`: A component that lists every tokens owned by the user.

  **Goal**:

  The `features/` subfolder organizes components by specific features or pages, promoting modular development. This approach ensures that feature-related code is easy to locate and modify, facilitating the addition of new features or updates to existing ones.

#### `data/`

Contains static or mock data used throughout the application.

**Examples:**

- `features.ts`: A file containing feature flags for controlling application functionality.

**Goal**:

The `data/` folder centralizes static and mock data to simplify testing and development. By maintaining all static data in one place, the project can easily switch between live and mock data sources, which is particularly useful during development and testing phases.

#### `hooks/`

Custom Hooks for managing state, effects, or other reusable logic.

**Examples:**

- `useChainContext.ts`: Provides access to the application's global chain state, managing all chain-related data and operations.
- `useSwitchChainContexte.ts`: Custom Hook for switching between chains, enabling a multichain infrastructure within the application.

**Goal**:

The `hooks/` folder encourages the reuse of logic across different components. Custom Hooks encapsulate state management and side effects, leading to cleaner and more maintainable components.

#### `lib/`

Contains reusable code that is not specific to React, such as API calls, cookie management, and utility functions.

**Examples:**

- `utils.ts`: Merge classnames using tailwind merge.

**Goal**:

The `lib/` folder houses utilities and libraries that can be used across the application. By isolating these functions, the project promotes DRY (Don’t Repeat Yourself) principles and ensures that common functionalities are easily accessible and maintainable.

#### `pages/`

Contains the application's pages and API routes.

**Examples:**

- `index.tsx`: The homepage of the application.
- `profile/[address].tsx`: Dynamic route for user's profile.
- `api/auth/[...thirdweb].ts`: An API route for handling authentication requests using Thirdweb.

**Goal**:

The `pages/` folder organizes all the application's routes and page-level components. Each file represents a specific route, which Next.js uses to generate pages. This structure makes it easy to manage navigation and routing within the application.

#### `styles/`

Contains global style files and theme-related configurations.

**Examples:**

- `globals.css`: Global CSS styles for the application.

**Goal**:

The `styles/` folder consolidates all styling configurations, ensuring consistent design across the application. By managing global styles and themes centrally, the project simplifies the process of applying and updating styles throughout the application.

#### `utils/`

Utility functions that are used throughout the application. They should be documented using JSDoc to ensure clarity and maintainability.

**Examples:**

- `dates/renderDateToHumanString.ts`: Converts a date into a human-readable string representing the time elapsed since that date.
- `prices/formatAndRound.ts`: Formats and rounds a numeric value to an appropriate number of decimal places.

**Goal**:

The `utils/` folder collects common utility functions to avoid redundancy and promote code reuse. By centralizing these functions, the project ensures that commonly used logic is standardized and easy to update.

#### `config/`

Configuration files, such as environment-specific settings or API endpoints.

**Examples:**

The `config/` folder includes configuration files that manage environment-specific settings for different blockchain networks. One such file is used to define settings for a specific chain, such as the Base network. Below is an overview of the Base config file (`production/prod.ts`) and how to use it.

**Goal**:

This folder handles environment-specific settings and configurations, enabling the project to adapt seamlessly to different deployment environments by adjusting configuration values. Additionally, configurations are tailored for specific chains, such as production and development environments.

#### `contexts/`

Contains global context providers for managing shared state across the application.

**Examples:**

- `chain.ts`: Stores the connected chain object and current address.

**Goal**:

The `contexts/` folder centralizes global state management using React's Context API. By organizing context providers here, the project facilitates the sharing of state across different parts of the application without prop drilling.

#### `middleware.ts`

Contains middleware functions for handling requests such as authentication and logging.

**Examples:**

- `middleware.ts`: Global middleware of the application.

**Goal**:

The `middleware.ts` file defines functions that act as intermediaries in the request-response cycle. These middlewares help in managing tasks like authentication, logging, and request validation in a centralized and reusable manner.

## Development Commands

We use Yarn to manage dependencies and run the application.

- `yarn dev`: Starts the application in development mode.
- `yarn build`: Compiles the application for production.
- `yarn start`: Runs the application in production mode after `build` is executed.

## Naming Conventions

- Use PascalCase for components.
- Use camelCase for functions and variables.
- TypeScript files should have the `.ts` or `.tsx` extension.

## Thirdweb Integration

The application uses [Thirdweb](https://thirdweb.com/) as the entry point for interacting with the Web3 ecosystem. Thirdweb provides an easy-to-use SDK that simplifies blockchain development, allowing the application to seamlessly connect to various blockchain networks and interact with smart contracts.

**Key Features of Thirdweb**

- **Simplified Web3 Integration**: Thirdweb abstracts the complexities of Web3, making it easier to interact with blockchain networks and manage smart contracts.
- **Multichain Support**: Thirdweb supports multiple blockchain networks, allowing the application to operate in a multichain environment.
- **Smart Contract Management**: Thirdweb provides tools for deploying, managing, and interacting with smart contracts, simplifying the integration of blockchain functionality into the application.
- **IPFS Storage**: Thirdweb integrates with IPFS (InterPlanetary File System) to provide decentralized storage solutions. This feature allows the application to securely store and retrieve files in a decentralized manner, ensuring data integrity and availability.

**How Thirdweb is Used in This Application**

- **Chain Management**: Thirdweb is integrated with custom hooks like `useChainContext.ts` and `useSwitchChainContext.ts` to manage the global chain state and enable multichain capabilities within the application.
- **Wallet Connection**: Thirdweb supports social connection options, enabling users to connect their wallets through social accounts (e.g., Google, Twitter). This simplifies the onboarding process and makes it easier for users who are new to Web3.
- **Smart Contract Interaction**: Thirdweb is used to interact with the deployed smart contracts, enabling features such as token management, minting, and transactions within the application.
- **Gasless Transactions with Account Abstraction**: While we use OpenZeppelin Defender for implementing gasless transactions, Thirdweb simplifies the integration of this feature through its provider.

## Crossmint Integration

The application integrates with [Crossmint](https://www.crossmint.com/), a service that allows users to mint NFTs using credit or debit cards, simplifying the process of purchasing and minting NFTs without needing to handle cryptocurrency directly.

**Key Features of the Integration**

- **Card Payments for NFTs**: Users can mint NFTs using credit or debit cards, making it easier for those unfamiliar with cryptocurrency transactions to participate in NFT minting.
- **Seamless User Experience**: The integration provides a streamlined and user-friendly interface for purchasing and minting NFTs, removing the complexity of handling blockchain transactions.
- **Secure Transactions**: The service ensures secure processing of card payments, safeguarding users' payment information and transactions.

**How Crossmint is Used in This Application**

- **Minting NFTs**: Users can select and mint NFTs directly using their credit or debit cards, with the process managed by the integrated payment service. This feature is especially useful for onboarding new users who may not have prior experience with cryptocurrencies.
- **Payment Processing**: The service handles the payment processing, ensuring that transactions are secure and that users receive their NFTs once payment is completed.
- **User Interface**: The integration provides an intuitive user interface for managing NFT purchases, including selecting NFTs, entering payment details, and confirming transactions.

By integrating this service, the application provides a more accessible way for users to mint NFTs, enhancing the overall user experience and broadening the appeal of NFTs to a wider audience.

## Contribution

To contribute to the project, please follow these guidelines:

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Submit a pull request.

## GraphQL Essentials

GraphQL is a powerful query language for APIs that allows for precise and flexible data retrieval. To interact with a GraphQL API, you can use the `executeQuery` function. This helper function facilitates making POST requests to a GraphQL server, sending queries and variables, and handling responses.

### The `executeQuery` Function

The `executeQuery` function is designed to streamline the process of querying a GraphQL API. It takes care of sending the request, handling errors, and parsing the response data.- [DSponsor Dashboard](#dsponsor-dashboard)

- [DSponsor Dashboard](#dsponsor-dashboard)
  - [Table of contents](#table-of-contents)
  - [Installation](#installation)
    - [Clone the repository](#clone-the-repository)
    - [Navigate into the project directory](#navigate-into-the-project-directory)
    - [Install dependencies](#install-dependencies)
  - [Configuration](#configuration)
    - [Configuring `features.ts` for Production or Testing](#configuring-featurests-for-production-or-testing)
    - [Environment Configuration](#environment-configuration)
      - [`.env.local` Configuration](#envlocal-configuration)
      - [Example Configuration File](#example-configuration-file)
      - [ThirdWeb Configuration](#thirdweb-configuration)
  - [Environment](#environment)
  - [Project Structure](#project-structure)
    - [`public/`](#public)
    - [`src/`](#src)
      - [`abi/`](#abi)
      - [`components/`](#components)
      - [`data/`](#data)
      - [`hooks/`](#hooks)
      - [`lib/`](#lib)
      - [`pages/`](#pages)
      - [`styles/`](#styles)
      - [`utils/`](#utils)
      - [`config/`](#config)
      - [`contexts/`](#contexts)
      - [`middleware.ts`](#middlewarets)
  - [Development Commands](#development-commands)
  - [Naming Conventions](#naming-conventions)
  - [Thirdweb Integration](#thirdweb-integration)
  - [Crossmint Integration](#crossmint-integration)
  - [Contribution](#contribution)
  - [GraphQL Essentials](#graphql-essentials)
    - [The `executeQuery` Function](#the-executequery-function)
    - [Example Usage of `executeQuery`](#example-usage-of-executequery)
    - [Optimizing Requests](#optimizing-requests)
    - [GraphQL Subgraph Definitions](#graphql-subgraph-definitions)
      - [Essentials Concepts](#essentials-concepts)
        - [1. **Minting**](#1-minting)
        - [2. **Primary Market**](#2-primary-market)
        - [3. **Secondary Market**](#3-secondary-market)
      - [Subtilities](#subtilities)
      - [Objects](#objects)

```typescript
/**
 * Executes a GraphQL query against a specified URL, handling the request and response.
 * This function is designed to make a POST request to a GraphQL API, sending a query
 * and any associated variables, then parsing and returning the response data.
 *
 * @param {string} url - The endpoint URL of the GraphQL server.
 * @param {string} query - The GraphQL query string to be executed.
 * @param {Object} [variables] - An optional object containing variables for the GraphQL query.
 *
 * @returns {Promise<Object>} - A promise that resolves to the data object from the GraphQL response.
 *                              If the response contains errors or the network request fails, an error
 *                              is logged, and the function either returns undefined or rethrows the error.
 *
 * @throws {Error} - If there is an issue with the network request or if the response cannot be parsed.
 *
 * @example
 * const url = "https://api.example.com/graphql";
 * const query = `
 *   query GetUser($id: ID!) {
 *     user(id: $id) {
 *       id
 *       name
 *     }
 *   }
 * `;
 * const variables = { id: "123" };
 *
 * executeQuery(url, query, variables)
 *   .then(data => {
 *     console.log("User data:", data.user);
 *   })
 *   .catch(error => {
 *     console.error("Error fetching user data:", error);
 *   });
 *
 * // In this example, `data.user` will contain the `id` and `name` fields of the user with ID 123.
 */
export const executeQuery = async (url, query, variables) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: query,
        variables
      })
    });

    if (!response.ok) {
      console.error("Network response was not ok", response.statusText);
      return;
    }

    const responseText = await response.text();

    const result = JSON.parse(responseText);

    if (result.errors) {
      console.error("GraphQL errors:", result.errors);
    }

    return result?.data;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
};
```

- **Purpose**: The `executeQuery` function performs a POST request to a GraphQL endpoint, sending a query and optional variables. It handles the request, checks for network errors, and processes the response.

- **Parameters**:

  - `url`: The URL of the GraphQL API endpoint.
  - `query`: The GraphQL query to be executed.
  - `variables` (optional): Variables required by the query.

- **Returns**: A promise that resolves with the data from the GraphQL response. If errors are encountered, they are logged, and the function either returns `undefined` or rethrows the error.

- **Error Handling**: Logs errors if the network request fails or if the GraphQL server returns errors.

### Example Usage of `executeQuery`

The `executeQuery` function can be used to fetch data from a GraphQL API. Below is an example of how to use this function to retrieve and process data from a marketplace listing:

```typescript
import { executeQuery } from "@/utils/graphql/helper/executeQuery";
import config from "@/config/config";

/**
 * Fetches all listed tokens from the marketplace for a specific blockchain chain ID.
 *
 * @param {string} chainId - The ID of the blockchain chain to fetch tokens from.
 * @param {boolean} allTokens - Flag to include all tokens or filter out tokens with no marketplace listings.
 * @returns {Promise<Array>} - A promise that resolves to an array of tokens with their details.
 */
export const fetchHome = async (chainId: string, allTokens: boolean): Promise<Array<any>> => {
  const path = new URL(`https://relayer.dsponsor.com/api/${chainId}/graph`);
 

  const GET_DATA = `
    query getAllMarketplaceListings {
      adOffers {
        id
        disable
        metadataURL
        nftContract {
          royalty {
            bps
          }
          tokens(first: 1000) {
            tokenId
            mint {
              blockTimestamp
              tokenData
              totalPaid
              currency
            }
            nftContract {
              id # = assetContract
              adOffers {
                id
                metadataURL # offerMetadata
              }
              prices {
                currency # ERC20 smart contract
                amount # wei, mind decimals() function to transform in human readable value !
                enabled
              }
            }
            marketplaceListings(
              first: 1000
              orderBy: endTime
              orderDirection: asc
            ) {
              id # listingId
              quantity
              token {
                tokenId
                nftContract {
                  id # = assetContract
                  royalty {
                    bps
                  }
                  adOffers {
                    id
                    metadataURL # offerMetadata
                    disable
                  }
                }
                mint {
                  tokenData
                }
              }
              listingType
              currency # ERC20 smart contract addr
              reservePricePerToken
              buyoutPricePerToken
              bids(orderBy: totalBidAmount, orderDirection: desc) {
                 creationTimestamp
                bidder
                totalBidAmount
                status
                newPricePerToken
                totalBidAmount
                paidBidAmount
                refundBonus
                refundAmount
                refundProfit
              }
              lister
              startTime
              endTime
              status
              tokenType
              transferType
              rentalExpirationTimestamp
            }
          }
        }
      }
    }
  `;

  type QueryType = {
    adOffers: Array<{
      id: string;
      disable: boolean;
      metadataURL: string;
      nftContract: {
        royalty: {
          bps: string;
        };
        tokens: Array<{
          tokenId: string;
          mint: {
            blockTimestamp: string;
            tokenData: string;
            totalPaid: string;
            currency: string;
          };
          nftContract: {
            id: string;
            adOffers: Array<{
              id: string;
              metadataURL: string;
              disable: boolean;
            }>;
            prices: Array<{
              currency: string;
              amount: string;
              enabled: boolean;
            }>;
          };
          marketplaceListings: Array<{
            id: string;
            quantity: string;
            token: {
              tokenId: string;
              nftContract: {
                id: string;
                royalty: {
                  bps: string;
                };
                adOffers: Array<{
                  id: string;
                  metadataURL: string;
                  disable: boolean;
                }>;
              };
              mint: {
                tokenData: string;
              };
            };
            listingType: string;
            currency: string;
            reservePricePerToken: string;
            buyoutPricePerToken: string;
            bids: Array<{
              creationTimestamp: string;
              bidder: string;
              totalBidAmount: string;
              status: string;
              newPricePerToken: string;
              paidBidAmount: string;
              refundBonus: string;
              refundAmount: string;
              refundProfit: string;
            }>;
            lister: string;
            startTime: string;
            endTime: string;
            status: string;
            tokenType: string;
            transferType: string;
            rentalExpirationTimestamp: string;
          }>;
        }>;
      };
    }>;
  };

  const chainConfig = config[chainId];
  const variables = {};

  const response = (await executeQuery(path.href, GET_DATA, variables)) as QueryType;

  const mappedListedToken = response?.adOffers
    .map((offer) => {
      const newOffer = {
        ...offer,
        disable: offer.disable,
        nftContract: {
          ...offer.nftContract,
          tokens: allTokens
            ? offer.nftContract.tokens
            : offer.nftContract.tokens.filter(
                (token) => token.mint && token.marketplaceListings.length > 0
              )
        }
      };

      return newOffer;
    })
    .flatMap((offer) =>
      offer.nftContract.tokens.map((token) => ({
        ...token,
        disable: offer.disable,
        offerId: offer.id,
        tokenData: token.mint?.tokenData ? token.mint.tokenData : null,
        chainConfig: chainConfig
      }))
    )
    .sort(
      (a, b) =>
        Number(b.marketplaceListings[0]?.startTime) - Number(a.marketplaceListings[0]?.startTime)
    );

  return mappedListedToken;
};
```

- **Purpose**: The `fetchHome` function retrieves all tokens listed on the marketplace for a specific blockchain chain. It uses the `executeQuery` function to send a GraphQL query and process the response.

- **Parameters**:

  - `chainId`: The ID of the blockchain chain for which tokens are fetched.
  - `allTokens`: A boolean flag indicating whether to include all tokens or filter out those without marketplace listings.

- **Returns**: A promise that resolves to an array of tokens, each containing details such as metadata, pricing, and listing information.

- **Error Handling**: The function does not handle errors explicitly beyond logging them via `executeQuery`. Ensure that error handling is managed where the `fetchHome` function is used.

### Optimizing Requests

When using the fetchHome function to retrieve data from a GraphQL API, it's important to optimize the number of requests for better performance. To avoid making multiple simultaneous requests, you can use React's useRef to manage the state of ongoing fetch operations. This approach prevents redundant network calls by tracking whether a fetch operation is already in progress.

**Example**

Here’s how you can use useRef to prevent multiple simultaneous requests while ensuring that data fetching is managed efficiently:

```jsx
import React, { useState, useEffect, useRef } from "react";
import { fetchHome } from "@/path/to/fetchHome";

const TokenList = ({ chainId, allTokens }) => {
  const [tokens, setTokens] = useState([]);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      if (isFetchingRef.current) {
        // If fetching is already in progress, do nothing
        return;
      }

      try {
        isFetchingRef.current = true; // Set fetching state to true
        const data = await fetchHome(chainId, allTokens);
        setTokens(data);
      } catch (error) {
        console.error("Error fetching tokens:", error);
      } finally {
        isFetchingRef.current = false; // Reset fetching state
      }
    };

    fetchData();
  }, [chainId, allTokens]);

  return (
    <div>
      {tokens.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {tokens.map((token) => (
            <li key={token.tokenId}>{token.tokenData}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TokenList;
```

- **useRef**: Used to store a boolean flag (`isFetchingRef`) that indicates whether a fetch operation is in progress. This prevents multiple concurrent requests.
- **useEffect**: Responsible for fetching data when the `chainId` or `allTokens` dependencies change. It checks if a fetch operation is already ongoing using the `isFetchingRef` flag. If a fetch is not in progress, it starts a new fetch operation and sets the flag to `true`. Once the data is fetched or an error occurs, the flag is reset to `false`.

### GraphQL Subgraph Definitions

1. **Minting**: The process of creating new tokens and specifying their initial attributes.
2. **Primary Market**: The first sale of tokens, either through direct purchase or auction with reserve and buyout prices.
3. **Secondary Market**: Subsequent transactions of tokens, which can involve direct buys or auctions with competitive bidding.

This life cycle ensures that tokens can be efficiently created, sold, and traded, providing flexibility for both initial creators and subsequent buyers and sellers.

#### Essentials Concepts

The life cycle of a token typically involves several key stages: minting, primary market transactions, and secondary market activities. Here’s an overview of each stage:

##### 1. **Minting**

**Definition**: The creation of new tokens.

- **Process**: Tokens are created (minted) through a smart contract on a blockchain. This is often done by a creator or authorized party who sets the initial parameters of the token, such as its ID, metadata, and ownership.
- **Details**: Each minting event generates a unique token with specific attributes. The minting process involves specifying details like the token ID, recipient address, and any associated metadata.

##### 2. **Primary Market**

**Definition**: The initial sale or offering of tokens directly to buyers.

- **Direct Sale**: Tokens can be sold directly to buyers at a set price, known as the buyout price per token. This is a straightforward transaction where buyers purchase tokens at the listed price without any bidding process.
- **Auctions**: Tokens are offered for sale through an auction process. The listing will have:
  - **Reserve Price**: The minimum price a seller is willing to accept. The auction must meet or exceed this price for the sale to proceed.
  - **Buyout Price**: The fixed price at which a buyer can purchase the token immediately, bypassing the auction.

##### 3. **Secondary Market**

**Definition**: Transactions involving tokens after their initial sale, typically through a marketplace.

- **Direct Buy**: Buyers can purchase tokens directly from sellers at agreed-upon prices. This involves:

  - **Listing**: Tokens are listed for sale with a fixed price.
  - **Transaction**: Buyers agree to the listed price, completing the purchase.

- **Auctions**: Tokens can be auctioned in the secondary market with a bidding process:
  - **Bidding**: Interested buyers place bids on the token. Each bid represents an offer to buy the token at a specified price.
  - **Bid-to-Earn Mechanism**: In auction-style listings, bids are placed over time. The highest bid at the end of the auction wins, and the token is sold to the highest bidder. Bidders may also receive rewards or earn status based on their participation and bid amounts.

#### Subtilities

- **AllowList**: When `nftContract.allowList` is true it means that the offer has a limited supply. This limited supply is a list of tokens that we can mint. The mint is enabled or not for each token within the offer with the `token.setInAllowList`.
- **reservePricePerToken**: This is the minimum price per token that the seller is willing to accept. In an auction-style listing, this price must be met for the auction to proceed or for the token to be sold. If the reserve price is not met, the listing may be considered unsold or canceled.
- **buyoutPricePerToken**: This is the fixed price per token at which the buyer can purchase the entire listing immediately, bypassing any auction process. If a buyer agrees to this price, the listing is considered sold, and the transaction is completed without waiting for further bidding.
- **Disabled AdOffer or Token Minting**: The minting can be disabled for a token within an offer, but an offer can also be disabled. That's the difference between `AdOffer.disable` and `TokenPrice.enabled`.
- **Mint object**: The Mint object is null when no minting transaction for a token has been made. This allow us to know if a token has been minted or not.
- **Identifiers**: Most of the identifiers - for transactions and nft contracts - are the addresses on the blockchain linked to the objects.

#### Objects

_Note: Some optional flags may contain mistakes, please refer to the official Subgraph definition._

- **NftContract**: Represents an NFT contract with:

  - `id`: Unique identifier for the contract.
  - `name` (optional): Name of the contract.
  - `symbol` (optional): Symbol of the contract.
  - `baseURI` (optional): Base URI for metadata.
  - `contractURI` (optional): URI for the contract metadata.
  - `maxSupply` (optional): Maximum supply of tokens.
  - `minter` (optional): Address authorized to mint tokens.
  - `forwarder` (optional): Address of the forwarder to enable gassless transactions.
  - `owner` (optional): Ownership details, including transfers.
  - `royalty` (optional): Details on royalties set.
  - `allowList`: Boolean indicating if the contract is in the allowlist.
  - `adOffers`: Array of ad offers associated with the contract.
  - `prices`: Array of NFT prices.
  - `tokens`: Array of tokens associated with the contract.

- **Token**: Represents a token with:

  - `id`: Unique identifier for the token.
  - `nftContract`: Associated NFT contract.
  - `tokenId`: Unique ID of the token. It should match the tokenData. (see: `utils/tokens/stringToUnit256.ts`)
  - `setInAllowList`: Boolean indicating if the token is in the allowlist.
  - `mint`: Details of the mint transaction associated with the token.

- **MarketplaceOffer**: Represents an offer in the marketplace with:

  - `id`: Unique identifier for the offer.
  - `origin`: Address where the offer originated.
  - `offeror`: Address making the offer.
  - `token`: The token being offered.
  - `quantity`: Amount of tokens offered.
  - `currency`: Currency used for the offer.
  - `totalPrice`: Total price of the offer.
  - `tokenType`: Type of token (e.g., ERC1155, ERC721, ERC20).
  - `transferType`: Type of transfer (e.g., Rent, Sale).
  - `expirationTimestamp`: Timestamp when the offer expires.
  - `rentalExpirationTimestamp`: Timestamp when the rental expires (if applicable).
  - `status`: Status of the offer (e.g., UNSET, CREATED, COMPLETED, CANCELLED).
  - `revenueTransaction` (optional): Associated revenue transaction.
  - `referralAdditionalInformation` (optional): Additional information for referrals.
  - `creationTimestamp`: When the offer was created.
  - `lastUpdateTimestamp` (optional): Last update timestamp of the offer.
  - `feeMethodology` (optional): Methodology for fees (e.g., ADDED_TO_AMOUNT, CUT_TO_AMOUNT).
  - `amountSentToProtocol` (optional): Amount sent to the protocol.
  - `protocolRecipient` (optional): Address receiving the protocol amount.
  - `amountSentToSeller` (optional): Amount sent to the seller.
  - `sellerRecipient` (optional): Address receiving the seller amount.
  - `amountSentToCreator` (optional): Amount sent to the creator.
  - `creatorRecipient`: Address receiving the creator amount.

- **MarketplaceListing**: Describes a marketplace listing with:

  - `id`: Unique identifier for the listing.
  - `origin`: Address where the listing originated.
  - `listingType`: Type of listing (Direct or Auction).
  - `lister`: Address of the lister.
  - `token`: The token being listed.
  - `startTime`: Start time of the listing.
  - `endTime`: End time of the listing.
  - `quantity`: Quantity of tokens listed.
  - `currency`: Currency used for the listing.
  - `reservePricePerToken`: Reserve price per token.
  - `buyoutPricePerToken`: Buyout price per token.
  - `tokenType`: Type of token (e.g., ERC1155, ERC721, ERC20).
  - `transferType`: Type of transfer (e.g., Rent, Sale).
  - `rentalExpirationTimestamp`: Rental expiration timestamp (if applicable).
  - `status`: Status of the listing (e.g., UNSET, CREATED, COMPLETED, CANCELLED).
  - `creationTimestamp`: When the listing was created.
  - `lastUpdateTimestamp`: Last update timestamp of the listing.
  - `completedBid`: Most recent completed bid.
  - `bids`: Array of bids associated with the listing.
  - `directBuys`: Array of direct buys associated with the listing.

- **AdOffer**: Represents an ad offer with:

  - `id`: Unique identifier for the ad offer.
  - `origin`: Address where the ad offer originated.
  - `disable`: Boolean indicating if the ad offer is disabled.
  - `name`: Name of the ad offer.
  - `metadataURL`: URL for metadata of the ad offer.
  - `nftContract`: Associated NFT contract.
  - `initialCreator`: Address of the initial creator.
  - `creationTimestamp`: When the ad offer was created.
  - `admins`: Array of addresses of admins.
  - `validators`: Array of addresses of validators.
  - `adParameters`: Array of ad offer parameter links.
  - `allProposals`: Array of all proposals related to the ad offer.
  - `currentProposals`: Array of current proposals related to the ad offer.

- **CurrentProposal**: Contains information on current proposals with:

  - `id`: Unique identifier for the current proposal.
  - `adOffer`: Associated ad offer.
  - `token`: Token involved in the proposal.
  - `adParameter`: Ad parameter related to the proposal.
  - `pendingProposal`: Pending proposal details.
  - `acceptedProposal`: Accepted proposal details.
  - `rejectedProposal`: Rejected proposal details.

- **ListingType**: Enumeration for listing types:

  - `"Direct"`: Direct listing.
  - `"Auction"`: Auction listing.

- **MarketplaceDirectBuy**: Represents a direct purchase in the marketplace with:

  - `id`: Unique identifier for the direct buy.
  - `listing`: Associated marketplace listing.
  - `buyer`: Address of the buyer.
  - `quantityBought`: Quantity of tokens bought.
  - `totalPricePaid`: Total price paid.
  - `revenueTransaction`: Associated revenue transaction.
  - `feeMethodology` (optional): Methodology for fees.
  - `amountSentToProtocol`: Amount sent to the protocol.
  - `protocolRecipient`: Address receiving the protocol amount.
  - `amountSentToSeller`: Amount sent to the seller.
  - `sellerRecipient`: Address receiving the seller amount.
  - `amountSentToCreator`: Amount sent to the creator.
  - `creatorRecipient`: Address receiving the creator amount.

- **TokenPrice**: Defines the price of a token with:

  - `id`: Unique identifier for the token price.
  - `currency`: Currency used for the token price.
  - `amount`: Price amount.
  - `enabled`: Boolean indicating if the token price is enabled.
  - `token`: The token whose price is defined.

- **MarketplaceBid**: Represents a bid in the marketplace with:

  - `id`: Unique identifier for the bid.
  - `listing`: Associated marketplace listing.
  - `bidder`: Address of the bidder.
  - `quantity`: Quantity of tokens bid on.
  - `newPricePerToken`: New price per token.
  - `totalBidAmount`: Total amount of the bid.
  - `paidBidAmount`: Amount paid for the bid.
  - `refundBonus`: Bonus amount for refund.
  - `refundProfit`: Profit amount for refund.
  - `currency`: Currency used for the bid.
  - `status`: Status of the bid.
  - `creationTxHash`: Transaction hash of the bid creation.
  - `revenueTransaction` (optional): Associated revenue transaction.
  - `creationTimestamp`: When the bid was created.
  - `lastUpdateTimestamp`: Last update timestamp of the bid.
  - `feeMethodologyN`: Methodology for fees.
  - `amountSentToProtocol` (optional): Amount sent to the protocol.
  - `protocolRecipient` (optional): Address receiving the protocol amount.
  - `amountSentToSeller` (optional): Amount sent to the seller.
  - `sellerRecipient` (optional): Address receiving the seller amount.
  - `amountSentToCreator` (optional): Amount sent to the creator.
  - `creatorRecipient` (optional): Address receiving the creator amount.

- **RevenueTransaction**: Tracks revenue details with:

  - `id`: Unique identifier for the revenue transaction.
  - `blockTimestamp`: Timestamp of the block containing the transaction.
  - `protocolFees`: Array of protocol fee calls.
  - `marketplaceBids`: Array of marketplace bids.
  - `marketplaceDirectBuys`: Array of direct buys.
  - `marketplaceOffers`: Array of marketplace offers.
  - `mints`: Array of mint transactions.

- **Mint**: Represents a mint transaction with:

  - `id`: Unique identifier for the mint.
  - `contractAddress`: Address of the contract.
  - `tokenId`: ID of the token minted.
  - `from`: Address that minted the token.
  - `to`: Address receiving the minted token.
  - `currency`: Currency used in the minting.
  - `amount`: Amount of tokens minted.
  - `tokenData`: Data associated with the token.
  - `blockNumber`: Block number of the mint transaction.
  - `blockTimestamp`: Timestamp of the block.
  - `transactionHash`: Hash of the mint transaction.
  - `revenueTransaction`: Associated revenue transaction.
  - `token`: The token being minted.
  - `feeMethodology`: Methodology for fees.
  - `amountSentToProtocol`: Amount sent to the protocol.
  - `protocolRecipient`: Address receiving the protocol amount.
  - `totalPaid`: Total amount paid.

- **AdProposal**: Details a proposal related to an ad offer with:
  - `id`: Unique identifier for the proposal.
  - `adOffer`: Associated ad offer.
  - `token`: Token involved in the proposal.
  - `adParameter`: Ad parameter for the proposal.
  - `status`: Status of the proposal.
  - `data`: Proposal data.
  - `rejectReason` (optional): Reason for rejection.
  - `creationTimestamp`: When the proposal was created.
  - `lastUpdateTimestamp`: Last update timestamp of the proposal.
