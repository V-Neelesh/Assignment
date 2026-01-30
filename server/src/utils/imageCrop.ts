import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

/**
 * Crops image to specified dimensions and optimizes it
 * @param imagePath - Path to the original image
 * @param outputPath - Path for the cropped image
 * @param width - Target width (default: 400)
 * @param height - Target height (default: 400)
 * @returns Path to the cropped image
 */
export const cropImage = async (
  imagePath: string,
  outputPath: string,
  width: number = 400,
  height: number = 400
): Promise<string> => {
  try {
    // Read image metadata
    const metadata = await sharp(imagePath).metadata();
    
    if (!metadata.width || !metadata.height) {
      throw new Error('Unable to read image dimensions');
    }

    // Resize and crop to cover dimensions
    await sharp(imagePath)
      .resize(width, height, {
        fit: 'cover',
        position: 'center',
      })
      .toFormat('webp', { quality: 80 })
      .toFile(outputPath);

    // Delete original image
    fs.unlinkSync(imagePath);

    return outputPath;
  } catch (error) {
    console.error('Image cropping error:', error);
    throw error;
  }
};
