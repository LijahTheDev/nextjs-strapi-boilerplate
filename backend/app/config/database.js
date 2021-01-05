module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "bookshelf",
      settings: {
        client: "postgres",
        host:
          process.env.NODE_ENV === "production"
            ? env("DATABASE_HOST", "postgres")
            : env("DATABASE_HOST", "127.0.0.1"),
        port: env.int("DATABASE_PORT", 5432),
        database: env("DATABASE_NAME", "strapi"),
        username: env("DATABASE_USERNAME", "strapi"),
        password: env("DATABASE_PASSWORD", "strapi"),
        ssl: env.bool("DATABASE_SSL", false),
      },
      options: {},
    },
  },
});
