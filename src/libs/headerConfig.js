const token = localStorage.getItem('token')
export const headerConfig = {
  headers: {
    Authorization: `Bearer ${token}`,
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json'
  }
}
