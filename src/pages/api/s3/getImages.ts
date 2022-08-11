import { NextApiRequest, NextApiResponse } from "next";
import S3 from "aws-sdk/clients/s3";

const s3 = new S3({
  region: process.env.S3_UPLOAD_REGION,
  accessKeyId: process.env.S3_UPLOAD_KEY,
  secretAccessKey: process.env.S3_UPLOAD_SECRET,
  signatureVersion: "v4",
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  //   if (req.method !== "POST") {
  //     return res.status(405).json({ message: "Method not allowed" });
  //   }

  try {
    let { name, type } = req.body;

    const params = {
      Bucket: process.env.S3_UPLOAD_BUCKET,
    };

    s3.listObjectsV2(params, (err, data) => {
      console.log("S3 List", data);
      // Package signed URLs for each to send back to client
      let images = [];
      for (let item of data.Contents) {
        console.log(item);

        let url = s3.getSignedUrl("getObject", {
          Bucket: process.env.S3_UPLOAD_BUCKET,
          Key: item.Key,
          //   Expires: 5 * 60, //time to expire in seconds - 5 min
        });
        images.push({ url, Key: item.Key });
      }
      res.json(images);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb", // Set desired value here
    },
  },
};
