// Builds the Safari / iOS version of each animation clip. Run once: node scripts/encode-stacked-clips.mjs
//
// Safari does not decode the alpha channel of a VP9 WebM, so the transparent clips play on a black background
// there. Each clip is re-encoded as one H.264 video with the colour on the left and the alpha matte on the right
// ("stacked alpha"); components/ClipPlayer merges the two halves on a canvas. The colour half is premultiplied by
// the alpha so the edge pixels carry no halo after the 4:2:0 chroma subsampling, and the matte is a grey image
// (white = opaque).
//
// ffmpeg-static (a dev dependency) is built with libvpx, the decoder that keeps the alpha. The frames go through
// Node as raw RGBA because ffmpeg's own premultiply / alphaextract filters will not negotiate the formats here.
import { spawn } from 'node:child_process'
import path from 'node:path'
import ffmpeg from 'ffmpeg-static'

const DIR = 'src/assets/clips'
const FPS = 24

// [name, output width, output height] — the hero is shown at most ~720px wide, so 1456 covers a 2x screen
const jobs = [
  ['hero', 1456, 1030],
  ['section-3', 1088, 798],
  ['section-4', 1088, 798],
  ['section-5', 1088, 798],
  ['section-6', 1088, 798],
]

const done = (child) =>
  new Promise((resolve, reject) => {
    child.on('error', reject)
    child.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`ffmpeg exited with ${code}`))))
  })

async function encode(name, width, height) {
  const input = path.join(DIR, `${name}.webm`)
  const output = path.join(DIR, `${name}.stack.mp4`)

  const decoder = spawn(
    ffmpeg,
    ['-v', 'error', '-c:v', 'libvpx-vp9', '-i', input, '-vf', `scale=${width}:${height}:flags=lanczos`, '-pix_fmt', 'rgba', '-f', 'rawvideo', '-'],
    { stdio: ['ignore', 'pipe', 'inherit'] },
  )

  const encoder = spawn(
    ffmpeg,
    [
      '-y', '-v', 'error',
      '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', `${width * 2}x${height}`, '-r', String(FPS), '-i', '-',
      '-vf', 'scale=out_color_matrix=bt709:out_range=tv,format=yuv420p',
      '-c:v', 'libx264', '-profile:v', 'high', '-level', '5.1', '-crf', '21', '-preset', 'slow',
      '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-color_range', 'tv',
      '-movflags', '+faststart', '-an', output,
    ],
    { stdio: ['pipe', 'inherit', 'inherit'] },
  )

  const frameBytes = width * height * 4
  let pending = Buffer.alloc(0)
  let frames = 0

  decoder.stdout.on('data', (chunk) => {
    pending = Buffer.concat([pending, chunk])
    while (pending.length >= frameBytes) {
      const rgba = pending.subarray(0, frameBytes)
      pending = pending.subarray(frameBytes)

      const stacked = Buffer.allocUnsafe(width * 2 * height * 3)
      for (let y = 0; y < height; y++) {
        let src = y * width * 4
        let left = y * width * 2 * 3
        let right = left + width * 3
        for (let x = 0; x < width; x++, src += 4) {
          const a = rgba[src + 3]
          stacked[left++] = Math.round((rgba[src] * a) / 255)
          stacked[left++] = Math.round((rgba[src + 1] * a) / 255)
          stacked[left++] = Math.round((rgba[src + 2] * a) / 255)
          stacked[right++] = a
          stacked[right++] = a
          stacked[right++] = a
        }
      }
      frames++
      if (!encoder.stdin.write(stacked)) {
        decoder.stdout.pause()
        encoder.stdin.once('drain', () => decoder.stdout.resume())
      }
    }
  })
  decoder.stdout.on('end', () => encoder.stdin.end())

  await Promise.all([done(decoder), done(encoder)])
  console.log(output, `${width * 2}x${height}`, `${frames} frames`)
}

for (const [name, width, height] of jobs) await encode(name, width, height)
