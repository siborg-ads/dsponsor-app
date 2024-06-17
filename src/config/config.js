let config;

if (process.env.NODE_ENV === "development") {
  config = require("./config.dev").default;
} else if (process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production") {
  config = require("./config.prod").default;
} else {
  throw new Error("Unsupported environment");
}

export default config;
