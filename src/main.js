import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import VCalendar from 'v-calendar'
import ToastPlugin from 'vue-toast-notification'
import VueApexCharts from 'vue3-apexcharts'
import 'vue-toast-notification/dist/theme-bootstrap.css'
import 'v-calendar/style.css'

// Use plugin with optional defaults

createApp(App).use(router).use(store).use(VCalendar, {}).use(ToastPlugin).use(VueApexCharts).mount('#app')
