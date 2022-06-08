export function formatDateNow() {
  const date = new Date()

  function zeroFill(i) {
    return (i < 10 ? "0" : "") + i
  }

  return `${date.getFullYear()}-${zeroFill(date.getMonth())}-${zeroFill(
    date.getDate()
  )}`
}
