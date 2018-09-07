export const pick = (obj, arr = []) => {
  if (Array.isArray(obj) || typeof obj !== 'object') return obj
  
  return arr.reduce((picked, key) => {
    picked[key] = obj[key]
    return picked
  }, {})
}
