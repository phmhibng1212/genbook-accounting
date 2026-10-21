/*
 * "Stacked alpha" playback for browsers that cannot decode a WebM's alpha channel (Safari, and every browser on
 * iOS, which all use WebKit). The clip is an H.264 video twice as wide as the picture: the left half is the
 * colour, already multiplied by the alpha, the right half is the alpha matte as a grey image. The frames are
 * produced by scripts/encode-stacked-clips.mjs.
 */

/** True where the transparent WebM would play on a black background. */
export function needsStackedAlpha() {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent
  const iOS = /iP(hone|ad|od)/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  // desktop Safari: has "Safari" in the UA, but none of the Chromium / Firefox tokens
  const safari = /safari/i.test(ua) && !/chrome|chromium|crios|fxios|edg|opr|android/i.test(ua)
  return iOS || safari
}

const VERTEX = `
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`

// colour on the left half, matte on the right; each half is sampled half a texel in from its edges so the
// linear filter never mixes the two
const FRAGMENT = `
precision mediump float;
uniform sampler2D frame;
uniform float texel;
varying vec2 uv;
void main() {
  float x = mix(texel * 0.5, 0.5 - texel * 0.5, uv.x);
  float a = texture2D(frame, vec2(0.5 + x, uv.y)).r;
  vec3 c = texture2D(frame, vec2(x, uv.y)).rgb;
  gl_FragColor = vec4(min(c, vec3(a)), a);
}`

function compile(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null
}

/**
 * Draws `video` (a stacked-alpha clip) onto `canvas`. Returns null when WebGL is unavailable.
 * `onFirstFrame(callback)` fires once the first picture has been drawn.
 */
export function createStackedRenderer(canvas, video) {
  const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false })
  if (!gl) return null

  const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX)
  const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT)
  if (!vertex || !fragment) return null

  const program = gl.createProgram()
  gl.attachShader(program, vertex)
  gl.attachShader(program, fragment)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null
  gl.useProgram(program)

  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
  const position = gl.getAttribLocation(program, 'position')
  gl.enableVertexAttribArray(position)
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

  const texture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
  gl.uniform1i(gl.getUniformLocation(program, 'frame'), 0)
  const texel = gl.getUniformLocation(program, 'texel')

  let firstFrame = null
  let frameCallback = 0
  let frameRequest = 0
  let running = true

  const draw = () => {
    if (!running || video.readyState < 2 || !video.videoWidth) return
    const width = video.videoWidth / 2
    if (canvas.width !== width || canvas.height !== video.videoHeight) {
      canvas.width = width
      canvas.height = video.videoHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    gl.uniform1f(texel, 1 / video.videoWidth)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video)
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    if (firstFrame) {
      const callback = firstFrame
      firstFrame = null
      callback()
    }
  }

  // one picture per decoded frame where the browser says so, otherwise per animation frame while playing
  const tick = () => {
    if (!running) return
    draw()
    if ('requestVideoFrameCallback' in video) frameCallback = video.requestVideoFrameCallback(tick)
    else frameRequest = requestAnimationFrame(tick)
  }

  const paused = () => draw()
  video.addEventListener('loadeddata', paused)
  video.addEventListener('seeked', paused)
  video.addEventListener('playing', paused)
  tick()

  return {
    onFirstFrame(callback) {
      firstFrame = callback
    },
    dispose() {
      running = false
      video.removeEventListener('loadeddata', paused)
      video.removeEventListener('seeked', paused)
      video.removeEventListener('playing', paused)
      if (frameCallback && 'cancelVideoFrameCallback' in video) video.cancelVideoFrameCallback(frameCallback)
      if (frameRequest) cancelAnimationFrame(frameRequest)
    },
  }
}
