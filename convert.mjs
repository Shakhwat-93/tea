import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dir = 'C:/projects/tea/public';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpeg') || f.endsWith('.jpg') || f.endsWith('.png'));

async function convert() {
  for (const file of files) {
    const name = path.basename(file, path.extname(file));
    try {
      await sharp(path.join(dir, file))
        .webp({ quality: 80 })
        .toFile(path.join(dir, `${name}.webp`));
      console.log(`Converted ${file} to webp`);
      fs.unlinkSync(path.join(dir, file)); // delete original
    } catch (e) {
      console.error(`Error converting ${file}:`, e);
    }
  }
}

convert();
