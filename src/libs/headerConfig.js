export const headerConfig = {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_VUE_TOKEN}`,
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json'
  }
}
