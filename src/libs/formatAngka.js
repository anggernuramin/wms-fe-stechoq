export const formatAngka = (value) => {
  return new Intl.NumberFormat('en-US', { minimumFractionDigits: 3 }).format(value / 1000)
}
