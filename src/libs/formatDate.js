export const formatDate = (dateString) => {
  const date = new Date(dateString)
  const wibOffset = 7 * 60
  const utcOffset = date.getTimezoneOffset()
  const totalOffset = wibOffset + utcOffset
  const wibDate = new Date(date.getTime() + totalOffset * 60000)

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }
  return new Intl.DateTimeFormat('en-GB', options).format(wibDate)
}
