<script setup>
import Sidebar from '../components/Sidebar.vue'
import { ref } from 'vue'

const chartOptionsPie = ref({
  chart: {
    type: 'pie'
  },

  labels: ['Oppo', 'Samsung', 'Iphone', 'Infinix', 'Vivo'],
  legend: {
    position: 'bottom',
    horizontalAlign: 'center',
    floating: false,
    fontSize: '14px',
    labels: {
      colors: undefined,
      useSeriesColors: false
    },
    markers: {
      width: 12,
      height: 12,
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

const chartSeriesPie = ref([44, 55, 13, 43, 22])

const barangMasukData = ref([
  {
    name: 'Barang Masuk',
    data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 140, 160, 180]
  }
])

const barangKeluarData = ref([
  {
    name: 'Barang Keluar',
    data: [15, 25, 20, 35, 29, 40, 55, 65, 85, 95, 100, 110]
  }
])

const chartOptions = ref({
  chart: {
    type: 'bar'
  },

  xaxis: {
    categories: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    labels: {
      style: {
        fontSize: '14px',
        fontWeight: '600',
        colors: [],
        fontFamily: 'Helvetica, Arial, sans-serif',
        cssClass: 'apexcharts-xaxis-label',
        rotate: -45,
        offsetY: 0,
        paddingTop: '5px'
      },
      offsetY: 20
    }
  },
  yaxis: {
    title: {
      text: 'Product',
      fontWeight: '600'
    }
  },
  legend: {
    position: 'bottom',
    horizontalAlign: 'center'
  },
  colors: []
})

const chartSeries = ref([...barangMasukData.value])

const showBarangMasuk = () => {
  chartSeries.value = [...barangMasukData.value]
  chartOptions.value.colors = ['#008FFB']
}

const showBarangKeluar = () => {
  chartSeries.value = [...barangKeluarData.value]
  chartOptions.value.colors = ['#00E396'] // Col
}
</script>
<template>
  <!-- start sidebar -->
  <div class="bg-[rgb(240,241,243)] w-full min-h-screen flex justify-between gap-3 overflow-hidden">
    <div class="w-[60vw] overflow-hidden">
      <section class="p-6 bg-white rounded-md">
        <h2 class="text-2xl font-medium text-slate-700">Summary Packing</h2>
        <div class="flex justify-between">
          <div class="rounded-md flex bg-white w-[275px] py-4 justify-start items-center p-5 gap-3">
            <img src="/assets/images/Layers.svg" alt="" class="rounded-full h-7 w-7" />
            <div class="flex flex-col text-slate-600">
              <span class="text-2xl">Rp 10.000.000,00</span>
              <h3 class="text-sm">Jumlah Stok Barang</h3>
            </div>
          </div>
          <div class="rounded-md flex bg-white w-[275px] py-4 justify-start items-center p-5 gap-3">
            <img src="/assets/images/Layers.svg" alt="" class="rounded-full h-7 w-7" />
            <div class="flex flex-col text-slate-600">
              <span class="text-2xl">Rp 13.000.000,00</span>
              <h3 class="text-sm">Jumlah Saldo Barang</h3>
            </div>
          </div>
        </div>
      </section>

      <section class="p-6 mt-3 bg-white rounded-md">
        <h2 class="mb-5 text-2xl font-medium text-slate-700">Stock Report</h2>
        <div class="flex items-center justify-center w-full chart-controls">
          <button @click="showBarangMasuk" class="">Show Barang Masuk</button>
          <button @click="showBarangKeluar">Show Barang Keluar</button>
        </div>
        <apexchart :options="chartOptions" :series="chartSeries" type="bar" height="380"></apexchart>
      </section>
    </div>
    <div class="w-[40vw]">
      <section class="p-6 bg-white rounded-md">
        <h2 class="mb-5 text-2xl font-medium text-slate-700">Jenis Stok Barang</h2>
        <apexchart :options="chartOptionsPie" :series="chartSeriesPie" type="pie" height="380"></apexchart>
      </section>
    </div>
  </div>
</template>
<style scoped>
.chart-controls {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}
</style>
