import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import config from '../config';
import multer from 'multer';
import fs from 'fs';

cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret,
});

const uploadImage = (
  imageName: string,
  path: string
): Promise<UploadApiResponse> => {
  console.log({ imageName, path });

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: imageName },
      function (error, result) {
        if (error) {
          reject(error);
        }
        resolve(result as UploadApiResponse);
        // delete a file asynchronously
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fs.unlink(path, (err: any) => {
          if (err) {
            console.log(err);
          } else {
            console.log('File is deleted.');
          }
        });
      }
    );
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
export default uploadImage;
