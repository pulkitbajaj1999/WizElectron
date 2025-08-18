export function isValidHex(hex) {
  return /^#?([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/.test(hex)
}

export function isValidTemperature(temp) {
  return temp >= 1000 && temp <= 10_000
}
