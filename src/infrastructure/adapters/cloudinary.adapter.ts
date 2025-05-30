import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { envs } from '../../config/envs';

cloudinary.config({
  cloud_name: envs.CLOUDINARY_CLOUD_NAME,
  api_key: envs.CLOUDINARY_API_KEY,
  api_secret: envs.CLOUDINARY_API_SECRET
});

export class CloudinaryAdapter {
  static async uploadImageFromBuffer(buffer: Buffer, filename: string, folder = 'porfolios/images'): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          public_id: filename,  // nombre del archivo en cloudinary (sin extensión)
          folder: folder,       // carpeta en Cloudinary
          resource_type: 'image'
        },
        (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
          if (error) {
            reject(error);
          } else if (result) {
            resolve(result);
          } else {
            reject(new Error('Unknown upload error'));
          }
        }
      );

      uploadStream.end(buffer);
    });
  }

  static async deleteImage(publicId: string): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve(result as UploadApiResponse);
        } else {
          reject(new Error('Unknown delete error'));
        }
      });
    });
  }
}
