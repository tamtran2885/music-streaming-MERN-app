import "dotenv/config";

const ENV = process.env.NODE_ENV || "development";

const CONFIG = {
  production: {
    app: {
      PORT: process.env.PORT || 4000,
    },
    client: {
      URL: process.env.CLIENT_URL || "http://localhost:3000",
    },
    db: {
      url: process.env.DB_URL,
    },
  },
  development: {
    app: {
      PORT: process.env.PORT || 4000,
    },
    client: {
      URL: process.env.CLIENT_URL || "http://localhost:3000",
    },
    db: {
      url: process.env.DB_URL,
    },
  },
  test: {
    app: {
      PORT: process.env.PORT || 4000,
    },
    client: {
      URL: process.env.CLIENT_URL || "http://localhost:3000",
    },
    db: {
      url: process.env.DB_URL,
    },
  },
};

export default CONFIG[ENV];

console.log(process.env.PORT)