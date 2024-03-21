import fs from 'fs/promises';
import path from 'path';

const directory = 'dist';

async function deleteFiles(dir, extension) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await deleteFiles(fullPath, extension); // Recursively call deleteFiles for subdirectories
    } else if (entry.isFile() && fullPath.endsWith(extension)) {
      await fs.unlink(fullPath); // Delete the file
    }
  }
}

async function main() {
  try {
    await deleteFiles(directory, '.ts');
    await deleteFiles(directory, '.map');
    await deleteFiles(directory, '.spec.js');
    console.log('Deletion of .ts and .map files complete.');
  } catch (err) {
    console.error('Error deleting files:', err);
  }
}

main();
