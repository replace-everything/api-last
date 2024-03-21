import * as terser from 'terser';
import fs from 'fs/promises';
import path from 'path';

const directory = 'dist';

// Helper function to recursively collect all .js files
async function collectJsFiles(dir) {
  let files = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(await collectJsFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      files.push(fullPath);
    }
  }
  return files;
}

// Function to minify all files collected by collectJsFiles
async function minifyFiles(files) {
  for (const filePath of files) {
    const data = await fs.readFile(filePath, 'utf8');
    try {
      const minified = await terser.minify(data);
      await fs.writeFile(filePath, minified.code);
    } catch (err) {
      console.error(`Error minifying ${filePath}:`, err);
    }
  }
}

// Main function to run the script
async function main() {
  try {
    const jsFiles = await collectJsFiles(directory);
    await minifyFiles(jsFiles);
  } catch (err) {
    console.error('Error during minification:', err);
  }
}

main();
