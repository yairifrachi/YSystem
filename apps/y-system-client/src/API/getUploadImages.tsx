import axios from 'axios';
import { BasicImage } from '../../../lib/modaels/types/BasicImage';
import { AppConfig } from '../../../y-system-server/src/config/config';

export const apiUploadFile = async (
  basicImage: BasicImage,
  onUploadProgress?: (progress: number) => void
): Promise<{ id: string | null }> => {
  const formData = new FormData();

  if (basicImage.fileData) {
    formData.append('image', basicImage.fileData);
  }
  formData.append('expiredDate', basicImage.expiredDate.toString());
  formData.append('phone', basicImage.phone.toString());

  try {
    const response = await axios.post(
      `http://${AppConfig.urls.ySestemServer}${AppConfig.routes.images.uploadImage}`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total && onUploadProgress) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onUploadProgress(percentCompleted);
          }
        },
      }
    );
    return { id: response.data.imageId }
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Failed to upload file. Please try again.');
  }
};

export const apiFetchImage = async (imageId: string): Promise<string> => {
  try {
    const url = `http://${AppConfig.urls.ySestemServer}/v1/images/${imageId}`;
    const response = await axios.get(url, { responseType: 'blob' });
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error('Error fetching image:', error);
    throw new Error('Failed to load image');
  }
};
