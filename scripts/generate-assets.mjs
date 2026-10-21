import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

// CRC32 table
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c >>> 0;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function createPngChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);

  const crcBuf = Buffer.alloc(4);
  const toCrc = Buffer.concat([typeBuf, data]);
  crcBuf.writeUInt32BE(crc32(toCrc), 0);

  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

function createPng(width, height, pixelFn) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // 8 bits per channel
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace
  const ihdrChunk = createPngChunk('IHDR', ihdr);

  // Raw image data with filter byte 0 at start of each scanline
  const scanlineLength = 1 + width * 4;
  const rawData = Buffer.alloc(scanlineLength * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * scanlineLength;
    rawData[rowOffset] = 0; // filter byte: None
    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      const [r, g, b, a] = pixelFn(x, y, width, height);
      rawData[pxOffset] = r;
      rawData[pxOffset + 1] = g;
      rawData[pxOffset + 2] = b;
      rawData[pxOffset + 3] = a;
    }
  }

  const compressedData = zlib.deflateSync(rawData, { level: 9 });
  const idatChunk = createPngChunk('IDAT', compressedData);
  const iendChunk = createPngChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createIco(pngBuffer) {
  // 6-byte ICO header
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // icon type
  header.writeUInt16LE(1, 4); // 1 image

  // 16-byte entry
  const entry = Buffer.alloc(16);
  entry[0] = 32; // width
  entry[1] = 32; // height
  entry[2] = 0;  // 256 colors or more
  entry[3] = 0;  // reserved
  entry.writeUInt16LE(1, 4);  // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(pngBuffer.length, 8); // image size
  entry.writeUInt32LE(22, 12); // offset (6 + 16 = 22)

  return Buffer.concat([header, entry, pngBuffer]);
}

// 1. Generate 32x32 icon PNG
const iconPng = createPng(32, 32, (x, y, w, h) => {
  const isBorder = x < 2 || x >= w - 2 || y < 2 || y >= h - 2;
  if (isBorder) return [197, 160, 89, 255]; // #c5a059 gold
  return [14, 20, 27, 255]; // #0e141b dark ink
});

// 2. Generate 180x180 apple-icon PNG
const appleIconPng = createPng(180, 180, (x, y, w, h) => {
  const isBorder = (x >= 8 && x <= 14) || (x >= w - 15 && x <= w - 9) ||
                   (y >= 8 && y <= 14) || (y >= h - 15 && y <= h - 9);
  if (isBorder) return [197, 160, 89, 255];
  return [14, 20, 27, 255];
});

// 3. Generate 1200x630 opengraph-image PNG
const ogPng = createPng(1200, 630, (x, y, w, h) => {
  // Elegant architectural gradient with gold borders
  const isOuterBorder = x < 20 || x >= w - 20 || y < 20 || y >= h - 20;
  if (isOuterBorder) return [197, 160, 89, 255]; // gold outer frame

  const isInnerBorder = (x >= 32 && x <= 34) || (x >= w - 35 && x <= w - 33) ||
                        (y >= 32 && y <= 34) || (y >= h - 35 && y <= h - 33);
  if (isInnerBorder) return [197, 160, 89, 100]; // subtle gold inner line

  // Subtle gradient from #0e141b to #16222f
  const factor = y / h;
  const r = Math.round(14 + (22 - 14) * factor);
  const g = Math.round(20 + (34 - 20) * factor);
  const b = Math.round(27 + (47 - 27) * factor);
  return [r, g, b, 255];
});

const ico = createIco(iconPng);

// Write directories and files
fs.mkdirSync('public', { recursive: true });
fs.writeFileSync('src/app/icon.png', iconPng);
fs.writeFileSync('src/app/apple-icon.png', appleIconPng);
fs.writeFileSync('src/app/opengraph-image.png', ogPng);
fs.writeFileSync('src/app/favicon.ico', ico);
fs.writeFileSync('public/favicon.ico', ico);
fs.writeFileSync('public/opengraph-image.png', ogPng);

console.log('Successfully generated static assets:');
console.log('- src/app/icon.png');
console.log('- src/app/apple-icon.png');
console.log('- src/app/opengraph-image.png');
console.log('- src/app/favicon.ico');
console.log('- public/favicon.ico');
console.log('- public/opengraph-image.png');
