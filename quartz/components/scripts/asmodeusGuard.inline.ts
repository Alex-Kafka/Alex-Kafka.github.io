const canonSegment = "/sealed-canon-7e4c"
const unlockKey = "shattered-isles:asmodeus-ritual"
const unlockValue = "deyomas"

try {
  const path = decodeURI(window.location.pathname)
  const canonPosition = path.indexOf(canonSegment)
  const isUnlocked = window.localStorage.getItem(unlockKey) === unlockValue

  if (canonPosition >= 0 && !isUnlocked) {
    const siteRoot = path.slice(0, canonPosition)
    window.location.replace(encodeURI(`${siteRoot}/Персонажи/Асмодей`))
  }
} catch {
  // If storage is unavailable, the seal remains closed.
}
