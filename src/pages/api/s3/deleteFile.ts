import { NextApiRequest, NextApiResponse } from "next";
import S3 from "aws-sdk/clients/s3";

const s3 = new S3({
  region: process.env.S3_UPLOAD_REGION,
  accessKeyId: process.env.S3_UPLOAD_KEY,
  secretAccessKey: process.env.S3_UPLOAD_SECRET,
  signatureVersion: "v4",
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  let { Key } = req.body;

  // Copy the object to a new location
  s3.deleteObject({
    Bucket: process.env.S3_UPLOAD_BUCKET,
    Key: Key,
  })
    .promise()
    .then((data) => {
      res.status(200).json({ message: "succeed" });
    })
    // Error handling is left up to reader
    .catch((e) => {
      res.status(400).json({ message: e });
    });
  // res.status(200).json({ message: "succeed" });
};
