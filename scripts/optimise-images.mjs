// Re-encodes the large PNG exports to WebP. Run once: node scripts/optimise-images.mjs
import sharp from 'sharp'
import path from 'node:path'

const SRC = 'C:/Users/sonako/Downloads/Genbook website/Ảnh minh hoạ'
const OUT = 'src/assets/images'

const jobs = [
  ['src/assets/images/section-2-01.png', 'section-2-01.webp', 1200],
  [`${SRC}/section 2-02.png`, 'section-2-02.webp', 1200],
  [`${SRC}/section 2-03.png`, 'section-2-03.webp', 1200],
  [`${SRC}/section 2-04.png`, 'section-2-04.webp', 1200],
  ['src/assets/images/hero-4.png', 'hero-4.webp', 1960],
  ['src/assets/images/section-3.png', 'section-3.webp', 1088],
  ['src/assets/images/section-4.png', 'section-4.webp', 1088],
  ['src/assets/images/section-5.png', 'section-5.webp', 1088],
  ['src/assets/images/section-6.png', 'section-6.webp', 1088],
]

for (const [src, name, width] of jobs) {
  const info = await sharp(src).resize({ width, withoutEnlargement: true }).webp({ quality: 86 }).toFile(path.join(OUT, name))
  console.log(name, info.width + 'x' + info.height, Math.round(info.size / 1024) + 'KB')
}
