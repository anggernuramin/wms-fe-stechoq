<script setup>
import { ref, onMounted, computed } from 'vue'
import Table from '../components/Table.vue'
import Slider from 'primevue/slider'
import {
  getAllJumlahStockBarang,
  getAllJumlahSaldoBarang,
  getAllStockReport,
  getPersentaseCategory,
  getTopBarangMasuk,
  getTopBarangKeluar
} from '../services/dashboard-service'
import { formatAngka } from '../libs/formatAngka.js'
import { formatCurrentDate } from '../libs/formatCurrentDate.js'
import { formatRupiah } from '../libs/formatRupiah.js'

const jumlahStockBarang = ref(null)
const jumlahSaldoBarang = ref(null)
const optionMonths = ref([])
const labelsCategory = ref([])
const stocksCategory = ref([])
const stocksBarangMasuk = ref([])
const stocksBarangKeluar = ref([])
const topBarangMasuk = ref([])
const topBarangKeluar = ref([])

// Data untuk pie chart
const chartOptionsPie = ref({
  chart: {
    type: 'pie'
  },
  labels: labelsCategory.value,
  legend: {
    position: 'bottom',
    horizontalAlign: 'center',
    floating: false,
    fontSize: '12px',
    labels: {
      colors: undefined,
      useSeriesColors: false
    },
    markers: {
      width: 8,
      height: 8,
      strokeWidth: 0,
      strokeColor: '#fff',
      radius: 12
    },
    itemMargin: {
      horizontal: 10,
      vertical: 5
    },
    formatter: function (seriesName, opts) {
      return [seriesName, opts.w.globals.series[opts.seriesIndex] + '%']
    },
    onItemClick: {
      toggleDataSeries: true
    },
    onItemHover: {
      highlightDataSeries: true
    }
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }
  ]
})

const chartSeriesPie = ref(stocksCategory.value)

// Data untuk grafik batang
const barangMasukData = ref([
  {
    name: 'Barang Masuk',
    data: stocksBarangMasuk?.value
  }
])

const barangKeluarData = ref([
  {
    name: 'Barang Keluar',
    data: stocksBarangKeluar?.value
  }
])

const chartOptions = ref({
  chart: {
    type: 'bar'
  },
  xaxis: {
    categories: optionMonths.value,
    labels: {
      style: {
        fontSize: '14px',
        fontWeight: '600',
        fontFamily: 'Helvetica, Arial, sans-serif',
        cssClass: 'apexcharts-xaxis-label',
        rotate: -45,
        colors: ['#000000']
      },
      offsetY: 20
    }
  },

  legend: {
    position: 'bottom',
    horizontalAlign: 'center'
  },
  colors: ['#003CA6']
})

const chartSeries = ref([...barangMasukData.value])

const showBarangMasuk = () => {
  chartSeries.value = [...barangMasukData.value]
  chartOptions.value = {
    ...chartOptions.value,
    colors: ['#003CA6']
  }
}

const showBarangKeluar = () => {
  chartSeries.value = [...barangKeluarData.value]
  chartOptions.value = {
    ...chartOptions.value,
    colors: ['#FF4560']
  }
}

onMounted(async () => {
  const dataStockReport = await getAllStockReport()
  dataStockReport.map((item) => {
    optionMonths.value.push(item.month)
    stocksBarangMasuk.value.push(item.totalMasuk)
    stocksBarangKeluar.value.push(item.totalKeluar)
  })
})

onMounted(async () => {
  jumlahStockBarang.value = await getAllJumlahStockBarang()
  jumlahSaldoBarang.value = await getAllJumlahSaldoBarang()
})

onMounted(async () => {
  jumlahStockBarang.value = await getAllJumlahStockBarang()
  jumlahSaldoBarang.value = await getAllJumlahSaldoBarang()
})

onMounted(async () => {
  const data = await getPersentaseCategory()
  if (data.length > 0) {
    data.map((item) => {
      labelsCategory.value.push(item.Nama)
      stocksCategory.value.push(parseFloat(item.percentage))
    })
  }
})

onMounted(async () => {
  topBarangMasuk.value = await getTopBarangMasuk()
  topBarangKeluar.value = await getTopBarangKeluar()
})

// Computed properties for parsed percentage
const topBarangMasukParsed = computed(() =>
  topBarangMasuk.value.map((item) => ({
    ...item,
    percentage: parseInt(item.percentage, 10)
  }))
)

const topBarangKeluarParsed = computed(() =>
  topBarangKeluar.value.map((item) => ({
    ...item,
    percentage: parseInt(item.percentage, 10)
  }))
)
</script>
<template>
  <div class="bg-[rgb(240,241,243)] w-full min-h-screen flex justify-between gap-3 overflow-hidden">
    <div class="w-[65vw]">
      <section class="p-6 bg-white rounded-md">
        <h2 class="mb-5 text-xl font-medium text-slate-700">Stock Report</h2>
        <div class="flex items-center justify-center w-full gap-9 chart-controls">
          <button class="flex items-center justify-center gap-2 text-sm text-slate-600" @click="showBarangMasuk">
            <span class="inline-block w-2 h-2 rounded-full bg-[#003CA6]"></span>
            Show Barang Masuk
          </button>
          <button class="flex items-center justify-center gap-2 text-sm text-slate-600" @click="showBarangKeluar">
            <span class="inline-block w-2 h-2 rounded-full bg-[#FF4560]"></span>

            Show Barang Keluar
          </button>
        </div>
        <apexchart :options="chartOptions" :series="chartSeries" type="bar" height="380"></apexchart>
      </section>
      <Table />
    </div>
    <div class="w-[35vw]">
      <section class="p-6 bg-white rounded-md">
        <h2 class="text-xl font-medium text-slate-700">Summary Packing</h2>
        <div class="flex justify-between gap-1">
          <div class="rounded-md flex bg-white w-[275px] py-4 justify-start items-center p-5 gap-4">
            <i class="fa-brands fa-product-hunt mt-4 text-[1.5rem] text-btnPrimary"></i>
            <div class="flex flex-col text-slate-600">
              <h3 class="text-md">Jumlah Stok Barang</h3>
              <p class="mt-1 text-[1] font-medium text-btnPrimary">
                {{ jumlahStockBarang === null ? 'loading. . .' : formatAngka(jumlahStockBarang) }}
              </p>
              <h4 class="mt-1 text-xs text-slate-400">Terhitung Sejak {{ formatCurrentDate }}</h4>
            </div>
          </div>
          <div class="rounded-md flex bg-white w-[275px] py-4 justify-start items-center p-5 gap-4">
            <i class="mt-2 text-[1.5rem] fa-solid fa-money-bill-trend-up text-btnPrimary"></i>
            <div class="flex flex-col text-slate-600">
              <h3 class="text-md">Jumlah Saldo Barang</h3>
              <p class="mt-1 text-[1rem] font-medium text-btnPrimary">
                {{ jumlahSaldoBarang === null ? 'loading. . .' : formatRupiah(jumlahSaldoBarang) }}
              </p>
              <h4 class="mt-1 text-xs text-slate-400">Terhitung Sejak {{ formatCurrentDate }}</h4>
            </div>
          </div>
        </div>
      </section>

      <section class="p-6 mt-3 bg-white rounded-md">
        <h2 class="mb-5 text-xl font-medium text-slate-700">Category of Stock</h2>
        <apexchart :options="chartOptionsPie" :series="chartSeriesPie" type="pie" height="470"></apexchart>
      </section>
      <section class="p-6 mt-2 bg-white rounded-md">
        <h2 class="text-xl font-medium mb-7 text-slate-700">Top 3 Performance</h2>
        <h3 class="mb-2 font-medium text-md text-slate-700">Barang Masuk</h3>
        <ul class="flex flex-col gap-2">
          <li class="flex flex-col gap-2" v-for="(item, index) in topBarangMasukParsed" :key="index">
            <div class="flex items-center justify-between w-full">
              <h3 class="text-xs text-slate-500">{{ item?.Nama }}</h3>
              <span class="flex gap-2 text-green-600 tex-xs">
                <i
                  class="flex items-center justify-center w-5 h-5 p-3 rotate-45 bg-green-300 rounded-full fa-solid fa-arrow-up"
                ></i>
                {{ item?.percentage }} %
              </span>
            </div>
            <Slider v-model="item.percentage" disabled class="text-red-600" />
          </li>
        </ul>
        <h3 class="mt-10 mb-2 font-medium text-md text-slate-700">Barang Keluar</h3>
        <ul class="flex flex-col gap-2">
          <li class="flex flex-col gap-2" v-for="(item, index) in topBarangKeluarParsed" :key="index">
            <div class="flex items-center justify-between w-full">
              <h3 class="text-xs text-slate-500">{{ item?.Nama }}</h3>
              <span class="flex gap-2 text-green-600 tex-xs">
                <i
                  class="flex items-center justify-center w-5 h-5 p-3 rotate-45 bg-green-300 rounded-full fa-solid fa-arrow-up"
                ></i>
                {{ item?.percentage }} %
              </span>
            </div>
            <Slider v-model="item.percentage" disabled class="text-red-600" />
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
<style scoped>
.chart-controls {
  margin-bottom: 20px;
  display: flex;
}
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  display: none; /* Menghilangkan thumb */
}
</style>
