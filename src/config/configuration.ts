export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 5001,
  JWT_SECRET: process.env.JWT_SECRET,
  DATABASE: {
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PORT: parseInt(process.env.DATABASE_PORT, 10),
    DATABASE_TYPE: process.env.DATABASE_TYPE,
    DATABASE_USERNAME: process.env.DATABASE_USERNAME,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_NAME: process.env.DATABASE_NAME,
  },
});
