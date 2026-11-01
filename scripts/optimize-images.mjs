import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const dir = fileURLToPath(new URL('../src/assets/', import.meta.url));
const original = readdirSync(dir).find((file) => file.startsWith('foto-original.'));

if (!original) {
  console.error('Coloque sua foto em src/assets/ com o nome foto-original.jpg (ou .png).');
  process.exit(1);
}

// Duas versões: uma para telas normais e outra para telas de alta densidade
for (const size of [160, 320]) {
  await sharp(`${dir}${original}`)
    .resize(size, size, { fit: 'cover', position: 'attention' })
    .webp({ quality: 80 })
    .toFile(`${dir}foto-${size}.webp`);
  console.log(`foto-${size}.webp criada`);
}