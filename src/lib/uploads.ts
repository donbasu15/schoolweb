import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function saveUpload(file: File): Promise<string> {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename to avoid directory traversal
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${Date.now()}-${safeName}`;
    const publicPath = join(process.cwd(), 'public', 'uploads', filename);

    await writeFile(publicPath, buffer);
    return `/uploads/${filename}`;
  } catch (error) {
    console.error('Failed to save file upload:', error);
    throw new Error('File upload failed');
  }
}
