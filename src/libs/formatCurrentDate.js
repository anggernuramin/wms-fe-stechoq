// Membuat objek Date untuk tanggal saat ini
const today = new Date()

// Array nama-nama bulan dalam bahasa Indonesia
const monthNames = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember'
]

// Mendapatkan hari, bulan, dan tahun
const day = today.getDate()
const month = monthNames[today.getMonth()] // Mengambil nama bulan dari array
const year = today.getFullYear()

// Membuat string tanggal dengan format bahasa Indonesia
export const formatCurrentDate = `${day} ${month} ${year}`
