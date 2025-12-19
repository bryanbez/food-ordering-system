export const dbConfig = {
  uri: process.env.MONGO_DB_CREDENTIAL,
  dbName: process.env.MONGO_DB_NAME || "fastfood",
};
