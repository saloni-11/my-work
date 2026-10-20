// Makes a small, clean copy of your photo for the site.
//
//   npm run photo -- ~/Pictures/original.jpg
//
// Writes src/assets/portrait.jpg: 480px wide, all metadata removed
// (location, camera, date). Only this copy goes into the repo, so keep the
// original somewhere outside the project folder.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const input = process.argv[2];
if (!input) {
  console.error('Give the path to your photo: npm run photo -- path/to/photo.jpg');
  process.exit(1);
}

const output = new URL('../src/assets/portrait.jpg', import.meta.url);
await mkdir(new URL('../src/assets/', import.meta.url), { recursive: true });

// sharp drops EXIF, XMP and IPTC metadata unless told to keep it.
// .rotate() applies the camera's orientation first so the photo isn't sideways.
await sharp(input)
  .rotate()
  .resize({ width: 480, withoutEnlargement: true })
  .jpeg({ quality: 78, mozjpeg: true })
  .toFile(output.pathname);

const meta = await sharp(output.pathname).metadata();
console.log(
  `Saved src/assets/portrait.jpg (${meta.width}×${meta.height}). ` +
    `Metadata left: ${meta.exif || meta.xmp || meta.iptc ? 'some, check it' : 'none'}.`,
);
