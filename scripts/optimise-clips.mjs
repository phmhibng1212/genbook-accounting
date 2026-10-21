// Re-encodes the exported WebM clips in src/assets/media to a much smaller file, keeping the alpha channel:
//   node scripts/optimise-clips.mjs
// Figma exports the clips at ~3.4 Mbit/s, far more than a 300–800px picture needs: at CRF 30 a 2.1 MB clip becomes ~0.4 MB and
// the picture is indistinguishable at 100% (mean difference 0.3 / 255 against the export). A re-encoded file carries
// `comment=optimised` and is skipped on the next run, so a file is never compressed twice. Replace a clip with a fresh
// export, run this, then run `node scripts/encode-clips.mjs --force` for the Safari / iOS files.
// Needs `ffmpeg` / `ffprobe` on the PATH (or FFMPEG=/path/to/ffmpeg) built with libvpx.
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const FFMPEG = process.env.FFMPEG || 'ffmpeg'
const DIR = 'src/assets/media'
const CRF = '30'

for (const name of fs.readdirSync(DIR).filter((file) => /^[a-z0-9-]+\.[a-z]{2}\.webm$/.test(file))) {
  const file = path.join(DIR, name)
  const tags = execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format_tags=comment', '-of', 'csv=p=0', file]).toString().trim()
  if (tags === 'optimised') continue
  const temp = `${file}.tmp.webm`
  execFileSync(
    FFMPEG,
    ['-v', 'error', '-y', '-c:v', 'libvpx-vp9', '-i', file, '-c:v', 'libvpx-vp9', '-pix_fmt', 'yuva420p', '-b:v', '0', '-crf', CRF,
     '-auto-alt-ref', '0', '-row-mt', '1', '-deadline', 'good', '-cpu-used', '2', '-an', '-metadata', 'comment=optimised', temp],
    { stdio: 'inherit' },
  )
  const before = fs.statSync(file).size
  fs.renameSync(temp, file)
  console.log(name, `${(before / 1024).toFixed(0)} KB -> ${(fs.statSync(file).size / 1024).toFixed(0)} KB`)
}
