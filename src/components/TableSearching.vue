<template>
  <section class="mt-2 overflow-hidden bg-white rounded-md">
    <h2 class="px-6 pt-6 pb-0 text-xl font-medium text-slate-700">Top Product</h2>
    <div class="px-5 card">
      <DataTable
        v-model:filters="filters"
        :value="customers"
        paginator
        :rows="10"
        dataKey="id"
        :loading="loading"
        :globalFilterFields="['name', 'country.name', 'representative.name']"
      >
        <!-- searching -->
        <template #header>
          <div class="flex justify-end">
            <IconField iconPosition="left">
              <InputIcon>
                <i class="absolute text-sm right-7 top-6 pi pi-search" />
              </InputIcon>
              <InputText
                v-model="filters['global'].value"
                placeholder="Search Product"
                class="p-[6px] border placeholder:text-slate-400 placeholder:font-light placeholder:text-sm"
              />
            </IconField>
          </div>
        </template>
        <!-- index -->
        <Column field="no" header="No" style="width: 12rem">
          <template #body="{ data }">
            {{ data.id }}
          </template>
        </Column>
        <!-- name customer -->
        <template #loading> Loading customers data. Please wait. </template>
        <Column field="name" header="Name" style="width: 12rem">
          <template #body="{ data }">
            {{ data.name }}
          </template>
        </Column>

        <!-- name country -->
        <Column header="Category" filterField="country.name" style="width: 12rem">
          <template #body="{ data }">
            <div class="flex gap-2 align-items-center">
              <span>{{ data.country.name }}</span>
            </div>
          </template>
        </Column>
        <!-- agent -->
        <Column header="Quantity" filterField="representative" style="width: 12rem">
          <template #body="{ data }">
            <div class="flex gap-2 align-items-center">
              <span>{{ data.representative.name }}</span>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </section>
</template>

<script setup>
import 'primevue/resources/themes/aura-light-green/theme.css'

import { ref, onMounted } from 'vue'
import { FilterMatchMode } from 'primevue/api'
import { CustomerService } from '../services/customer-service'

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'

const customers = ref()
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  representative: { value: null, matchMode: FilterMatchMode.IN }
})

const index = ref(0)
const loading = ref(true)

onMounted(() => {
  CustomerService.getCustomersMedium().then((data) => {
    // console.log('🚀 ~ CustomerService.getCustomersMedium ~ data:', data)
    customers.value = getCustomers(data)
    loading.value = false
  })
})

const getCustomers = (data) => {
  return [...(data || [])].map((d) => {
    d.date = new Date(d.date)
    return d
  })
}
</script>
<style></style>
