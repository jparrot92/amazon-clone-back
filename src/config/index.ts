import dotenv from 'dotenv';
dotenv.config(); // use the file

const config = {
  dataBase: process.env.DATABASE,
  secretAccessKey: process.env.AWSSecretKey,
  accessKeyId: process.env.AWSAccessKeyId,
  tokenSecret: process.env.TOKEN_SECRET,
};

export default config;
