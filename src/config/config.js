let config;

if (process.env.NEXT_PUBLIC_CONFIG_MODE === "dev") {
  config = require("./config.dev").default;
} else {
  config = require("./config.prod").default;
}

export default config;
