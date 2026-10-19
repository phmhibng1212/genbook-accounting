// Writes each section clip's last frame as the transparent WebP shown before the clip plays (and when it cannot):
// node scripts/make-clip-posters.mjs   (needs the ffmpeg-static + sharp dev dependencies)
import { execFileSync } from 'node:child_process'
import path from 'node:path'
import sharp from 'sharp'
import ffmpeg from 'ffmpeg-static'

const jobs = [
  ['section-3', 3.04],
  ['section-4', 3.21],
  ['section-5', 2.88],
  ['section-6', 3.25],
]
const WIDTH = 1088
const HEIGHT = 798

for (const [name, duration] of jobs) {
  // libvpx-vp9 is the decoder that keeps the alpha channel
  const rgba = execFileSync(
    ffmpeg,
    ['-v', 'error', '-c:v', 'libvpx-vp9', '-ss', String(duration - 0.1), '-i', `src/assets/clips/${name}.webm`, '-frames:v', '1', '-pix_fmt', 'rgba', '-f', 'rawvideo', '-'],
    { maxBuffer: WIDTH * HEIGHT * 4 * 2 },
  )
  const info = await sharp(rgba, { raw: { width: WIDTH, height: HEIGHT, channels: 4 } })
    .webp({ quality: 88, alphaQuality: 100 })
    .toFile(path.join('src/assets/images', `${name}.webp`))
  console.log(name, `${info.width}x${info.height}`, `${Math.round(info.size / 1024)}KB`)
}
