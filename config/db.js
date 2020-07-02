const dynamoose = require('dynamoose');
const config = require('config');
const dotenv = require('dotenv');

dotenv.config();

const db = new dynamoose.aws.sdk.DynamoDB({
   "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
   "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY,
   "region": process.env.AWS_REGION
});

const connectToDB = async () => {
   try {
      dynamoose.aws.ddb.set(db);
      console.log("Connected to DynamoDB");
   } catch (err) {
      console.log(err);
   }
};

module.exports = connectToDB;
