import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";

dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3Client = new S3Client({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region: region,
});

const s3Middleware = async (req, res, next) => {
  try {
    const getObjectParams = {
      Bucket: bucketName,
      Key: req.params.imageKey,
    };

    const command = new GetObjectCommand(getObjectParams);

    const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });

    req.s3Url = url;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export default s3Middleware;
