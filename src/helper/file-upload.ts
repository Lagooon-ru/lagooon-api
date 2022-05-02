import * as AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const uploadFile = async (file) => {
  const { originalname } = file;
  const s3Response = await s3_upload(file.buffer, originalname, file.mimetype);
  return s3Response.Location;
};

const s3_upload = async (file, name, mimetype) => {
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: String(name),
    Body: file,
    ACL: process.env.AWS_ACL,
    ContentType: mimetype,
    ContentDisposition: 'inline',
    CreateBucketConfiguration: {
      LocationConstraint: 'ap-south-1',
    },
  };
  try {
    return await s3.upload(params).promise();
  } catch (e) {
    console.log(e);
  }
};
