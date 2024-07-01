# DSponsor Dashboard

## Getting Started

1. Install the dependencies:

```bash
npm i
```

2. Start the development server:
  
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Production Environment

 To test the application in the production environment, follow these steps:

 1. Create an optimized production build:

 ```bash
npm run build
```

2. Start the application using the production build:

```bash
npm run start
```

## Configuration

The application can bind to one of the following configuration files :

- Development Configuration (usage with testnets like Sepolia): [`./src/config/config.dev.js`](./src/config/config.dev.js)
- Production Configuration (usage with mainnets like Base): [`./src/config/config.prod.js`](./src/config/config.prod.js)

**By default, the application runs in `production` mode. To switch to the development configuration, set the `NEXT_PUBLIC_CONFIG_MODE` environment variable to `dev`.**

For example, if you are running the application locally, create a `.env.local` with the following content:

```
# .env.local
NEXT_PUBLIC_CONFIG_MODE=dev
```
