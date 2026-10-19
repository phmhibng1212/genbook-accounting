/**
 * Lays a translation patch over the base (English) content.
 *
 *  - objects merge key by key, so a patch only lists what it translates
 *  - arrays take the patch's length and merge element by element, so the patch can supply fewer or more
 *    elements than the base (heading fragments) while still inheriting media/links per element
 *  - anything else (strings, `null`, functions) replaces the base value
 */
export default function merge(base, patch) {
  if (patch === undefined) return base
  if (Array.isArray(patch)) return patch.map((item, index) => merge(Array.isArray(base) ? base[index] : undefined, item))
  if (patch && typeof patch === 'object') {
    const result = { ...(base && typeof base === 'object' ? base : {}) }
    for (const key of Object.keys(patch)) result[key] = merge(result[key], patch[key])
    return result
  }
  return patch
}
