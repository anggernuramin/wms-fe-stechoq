<script setup>
import { useRoute } from 'vue-router'

const location = useRoute()
</script>

<template>
  <div class="overflow-x-auto">
    <section class="rounded-md shadow-md bg-secondary">
      <header class="flex items-center justify-between w-full px-5 pt-3 overflow-hidden rounded-md">
        <h1 class="font-medium text-md text-slate-700">
          <router-link to="/" class="text-slate-400">Dashboard</router-link> / {{ location?.name }}
        </h1>
        <div class="flex gap-3">
          <button class="flex items-center justify-center gap-2 btn-sm-default">
            <i class="fas fa-filter"></i>Export
          </button>
          <router-link to="/products/add" class="flex items-center justify-center gap-2 bg-red-400 btn-sm-success">
            <i class="fas fa-plus"></i>Tambah Product
          </router-link>
        </div>
      </header>
      <hr class="my-4" />

      <div class="flex items-center justify-between px-5 pb-4">
        <h1 class="text-lg font-semibold text-TxtPrimary-700">Product</h1>
        <div class="flex items-center gap-5">
          <form action="" class="outline-none">
            <label class="py-[6px] px-2 flex items-center rounded-md border text-slate-600 gap-2 bg-secondary">
              <input type="search" class="border-0 outline-none text-slate-600 bg-secondary" placeholder="Search" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="w-4 h-4 opacity-70"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clip-rule="evenodd"
                />
              </svg>
            </label>
          </form>
          <div class="border rounded-md dropdown dropdown-end">
            <div
              tabindex="0"
              role="button"
              class="py-[4px] m-1 bg-secondary flex justify-center items-center gap-5 text-sm px-5"
            >
              Semua Kategori <i class="text-xs fas fa-chevron-down"></i>
            </div>
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-primary rounded-box w-52">
              <li><a>Oppo</a></li>
              <li><a>Vivo</a></li>
            </ul>
          </div>
          <div class="border rounded-md dropdown dropdown-end">
            <div
              tabindex="0"
              role="button"
              class="py-[4px] m-1 bg-secondary flex justify-center items-center gap-5 text-sm px-5"
            >
              Lokasi <i class="text-xs fas fa-chevron-down"></i>
            </div>
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-primary rounded-box w-52">
              <li><a>Oppo</a></li>
              <li><a>Vivo</a></li>
            </ul>
          </div>
        </div>
      </div>
      <table class="table rounded-sm">
        <!-- head -->
        <thead class="bg-zinc-50">
          <tr class="text-sm font-light text-slate-700 border-b-slate-100">
            <th class="font-medium">#</th>
            <th class="font-medium">Id. Product</th>
            <th class="font-medium">Item</th>
            <th class="font-medium">Varian</th>
            <th class="font-medium">Category</th>
            <th class="font-medium">Price</th>
            <th class="font-medium">Action</th>
          </tr>
        </thead>
        <tbody class="text-xs font-light text-TxtPrimary-700">
          <!-- row 1 -->
          <tr class="font-normal border-b-slate-100">
            <td>1</td>
            <td>001</td>
            <td>VIVO Y02 3/32</td>
            <td>VIVO Y02 3/32 GREY</td>
            <td>VIVO</td>
            <td>1.200.000</td>
            <td class="flex gap-3">
              <i class="text-[14px] text-warning fa fa-pencil" aria-hidden="true"></i>
              <router-link to="/products/delete/1">
                <i class="text-[14px] text-error fa fa-trash" aria-hidden="true"></i>
              </router-link>
            </td>
          </tr>
          <tr class="font-normal border-b-slate-100">
            <td>2</td>
            <td>002</td>
            <td>SAM A057 A05S 6/128</td>
            <td>SAM A057 A05S 6/128 BLACK</td>
            <td>SAM</td>
            <td>1.200.000</td>
            <td class="flex gap-3">
              <i class="text-[14px] text-warning fa fa-pencil" aria-hidden="true"></i>
              <router-link to="/products/delete/1">
                <i class="text-[14px] text-error fa fa-trash" aria-hidden="true"></i>
              </router-link>
            </td>
          </tr>
          <tr class="font-normal border-b-slate-100">
            <td>3</td>
            <td>003</td>
            <td>REDMI NOTE 13 PR0 8/256</td>
            <td>REDMI NOTE 13 PR0 8/256 GREY</td>
            <td>REDMI</td>
            <td>1.200.000</td>
            <td class="flex gap-3">
              <i class="text-[14px] text-warning fa fa-pencil" aria-hidden="true"></i>
              <router-link to="/products/delete/1">
                <i class="text-[14px] text-error fa fa-trash" aria-hidden="true"></i>
              </router-link>
            </td>
          </tr>
          <tr class="font-normal border-b-slate-100">
            <td>4</td>
            <td>004</td>
            <td>IPHONE 11 64GB</td>
            <td>IPHONE 11 64GB TAM WHITE</td>
            <td>IPHONE</td>
            <td>1.200.000</td>
            <td class="flex gap-3">
              <i class="text-[14px] text-warning fa fa-pencil" aria-hidden="true"></i>
              <router-link to="/products/delete/1">
                <i class="text-[14px] text-error fa fa-trash" aria-hidden="true"></i>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex items-center justify-end gap-5 py-5 mt-3 border-t pe-16 text-TxtPrimary-700">
        <button class="btn-sm-default">Previous</button>
        <span>Page <b>1</b> of <b>10</b></span>
        <button class="btn-sm-default">Next</button>
      </div>
    </section>
  </div>

  <!-- Put this part before </body> tag -->
  <dialog id="modal_tambah_data" class="modal">
    <div class="rounded-md modal-box bg-secondary">
      <h3 class="text-lg font-bold">Hello!</h3>
      <p class="py-4">Press ESC key or click the button below to close</p>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn bg-btnPrimary">Close</button>
        </form>
      </div>
    </div>
  </dialog>
  <router-view></router-view>
</template>
