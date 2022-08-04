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
  let { oldKey, newKey } = req.body;
  console.log({ oldKey, newKey });

  // Copy the object to a new location
  s3.copyObject({
    Bucket: process.env.S3_UPLOAD_BUCKET,
    CopySource: `${process.env.S3_UPLOAD_BUCKET}/${oldKey}`,
    // CopySource: `${process.env.S3_UPLOAD_BUCKET}/290360572_542527760699318_3768538822563248621_n.jpg`,
    Key: newKey,
  })
    .promise()
    .then(() =>
      // Delete the old object
      s3
        .deleteObject({
          Bucket: process.env.S3_UPLOAD_BUCKET,
          Key: oldKey,
        })
        .promise()
        .then((data) => {
          res.status(200).json({ message: "succeed" });
        })
    )
    // Error handling is left up to reader
    .catch((e) => {
      res.status(400).json({ message: e });
    });
  // res.status(200).json({ message: "succeed" });
};
