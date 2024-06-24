This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



## Development Environment
 To test the application in the development environment, use the following command:
```bash
npm run dev
```
 This command starts the development server, enabling hot reloading and providing a development-friendly experience.

## Production Environment

 To test the application in the production environment, follow these steps:

 1. Build the application:
 ```bash
npm run build
```
 This command creates an optimized production build of the application.

 2. Start the application using the production build:
  ```bash

npm run start
```

 This command starts the server using the production build, allowing you to test the application as it would run in a live environment.

 Configuration
 The application uses separate configuration files for different environments:
 - Development Configuration: config.dev.js
 - Production Configuration: config.prod.js

 The correct configuration file is automatically selected based on the environment. 
 When running `npm run dev`, the development configuration is used. 
 When running `npm run build` followed by `npm run start`, the production configuration is used.



 Additional Commands
 Linting: To lint your code, run:
```bash
npm run lint
```



# Notes
 Make sure to install all dependencies before running the application:
 ```bash
npm install
```

 If you encounter any issues, check the console for error messages and ensure that all environment variables are correctly set up.

 By following these instructions, you can effectively test the application in both development and production environments.
