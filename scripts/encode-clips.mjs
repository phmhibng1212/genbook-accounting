// Prepares the Safari / iOS version and the still picture of every animation clip in src/assets/media:
//   node scripts/encode-clips.mjs            (every <slot>.<lang>.webm without both outputs)
//   node scripts/encode-clips.mjs --force    (redo all)
// Optional environment: CLIP_DIR (folder), CLIP_MAX_WIDTH (px), STACK_CRF (H.264 quality), FFMPEG.
// Needs `ffmpeg` on the PATH (or FFMPEG=/path/to/ffmpeg) built with libvpx (the decoder that keeps the alpha), libx264 and libwebp.
//
// For each `<slot>.<lang>.webm` it writes
//   <slot>.<lang>.stack.mp4     Safari does not decode the alpha channel of a VP9 WebM, so the transparent clip would play on a
//                               black background there. This is one H.264 video with the colour on the left and the alpha matte on
//                               the right ("stacked alpha"); components/ClipPlayer merges the two halves on a canvas. The colour
//                               half is premultiplied by the alpha so edge pixels carry no halo after 4:2:0 chroma subsampling.
//   <slot>.<lang>.poster.webp   the last frame, shown until the clip has its first frame (and when playback is not possible).
//
// The frames go through Node as raw RGBA because ffmpeg's own premultiply / alphaextract filters will not negotiate the formats.
import { spawn, execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const FFMPEG = process.env.FFMPEG || 'ffmpeg'
const DIR = process.env.CLIP_DIR || 'src/assets/media'
const FPS = 24
const MAX_WIDTH = Number(process.env.CLIP_MAX_WIDTH) || 1456 // the hero is shown at most ~800px wide, so 1456 covers a 2x screen; a smaller clip keeps its size
const force = process.argv.includes('--force')

const run = (args) => execFileSync(FFMPEG, ['-v', 'error', '-y', ...args], { stdio: ['ignore', 'inherit', 'inherit'] })
const probe = (file) =>
  execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height:format=duration', '-of', 'json', file])
const done = (child) =>
  new Promise((resolve, reject) => {
    child.on('error', reject)
    child.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`ffmpeg exited with ${code}`))))
  })

async function encode(webm) {
  const base = webm.replace(/\.webm$/, '')
  const info = JSON.parse(probe(webm))
  const { width: srcW, height: srcH } = info.streams[0]
  const duration = Number(info.format.duration)
  const width = Math.min(srcW, MAX_WIDTH) & ~1
  const height = Math.round((width * srcH) / srcW / 2) * 2

  // still: the last frame, with its transparency
  run(['-c:v', 'libvpx-vp9', '-sseof', '-0.08', '-i', webm, '-frames:v', '1', '-vf', `scale=${width}:${height}:flags=lanczos`, '-pix_fmt', 'rgba', '-c:v', 'libwebp', '-quality', process.env.POSTER_QUALITY || '88', '-compression_level', '6', `${base}.poster.webp`])

  const output = `${base}.stack.mp4`
  const decoder = spawn(
    FFMPEG,
    ['-v', 'error', '-c:v', 'libvpx-vp9', '-i', webm, '-vf', `scale=${width}:${height}:flags=lanczos`, '-pix_fmt', 'rgba', '-f', 'rawvideo', '-'],
    { stdio: ['ignore', 'pipe', 'inherit'] },
  )
  const encoder = spawn(
    FFMPEG,
    [
      '-y', '-v', 'error',
      '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', `${width * 2}x${height}`, '-r', String(FPS), '-i', '-',
      '-vf', 'scale=out_color_matrix=bt709:out_range=tv,format=yuv420p',
      '-c:v', 'libx264', '-profile:v', 'high', '-level', '5.1', '-crf', process.env.STACK_CRF || '21', '-preset', 'slow',
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
  console.log(path.basename(output), `${width * 2}x${height}`, `${frames} frames`, `(${duration.toFixed(2)}s source)`)
}

for (const name of fs.readdirSync(DIR).filter((file) => /^[a-z0-9-]+\.[a-z]{2}\.webm$/.test(file))) {
  const base = path.join(DIR, name.replace(/\.webm$/, ''))
  if (!force && fs.existsSync(`${base}.stack.mp4`) && fs.existsSync(`${base}.poster.webp`)) continue
  await encode(path.join(DIR, name))
}
