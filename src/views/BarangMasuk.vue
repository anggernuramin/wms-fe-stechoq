<template>
  <div class="overflow-x-auto">
    <section class="rounded-md shadow-md bg-secondary">
      <header class="flex items-center justify-between w-full px-5 pt-3 overflow-hidden rounded-md">
        <h1 class="text-lg font-semibold text-TxtPrimary-700">Barang Masuk</h1>
        <div class="flex gap-3">
          <!-- <button class="flex items-center justify-center gap-2 btn-sm-default">
            <i class="fas fa-filter"></i>Export
          </button> -->
          <button class="flex items-center justify-center gap-2 btn-sm-success">
            <i class="fas fa-plus"></i>Tambah
          </button>
        </div>
      </header>
      <hr class="my-4" />

      <div class="flex items-end justify-end gap-5 px-5 pb-4">
        <form action="" class="border rounded-md">
          <label class="flex items-center gap-2 px-4 border-0 outline-none bg-secondary input h-9">
            <input type="text" class="grow" placeholder="Search" />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70">
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
            Semua <i class="text-xs fas fa-chevron-down"></i>
          </div>
          <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-primary rounded-box w-52">
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
          </ul>
        </div>
      </div>
      <table class="table rounded-sm">
        <!-- head -->
        <thead class="bg-zinc-50">
          <tr class="text-sm font-light text-slate-700 border-b-slate-100">
            <th class="font-medium">#</th>
            <th class="font-medium">No. Do</th>
            <th class="font-medium">Customer</th>
            <th class="font-medium">Kode Barang</th>
            <th class="font-medium">Qty</th>
            <th class="font-medium">Deskripsi</th>
            <th class="font-medium">Type</th>
          </tr>
        </thead>
        <tbody class="text-xs font-light text-TxtPrimary-700">
          <!-- row 1 -->
          <tr class="font-normal border-b-slate-100">
            <td>1</td>
            <td>DO0001.123</td>
            <td>Kawi Departemen Store</td>
            <td>TS02K</td>
            <td>5</td>
            <td>Oppo A3s</td>
            <th><div class="text-xs text-green-600 badge badge-outline">Aktif</div></th>
          </tr>
          <!-- row 2 -->
          <tr class="font-normal border-b-slate-100">
            <td>1</td>
            <td>DO0001.123</td>
            <td>Kawi Departemen Store</td>
            <td>TS02K</td>
            <td>5</td>
            <td>Oppo A3s</td>
            <th><div class="text-xs text-green-600 badge badge-outline">Aktif</div></th>
          </tr>
          <!-- row 3 -->
          <tr class="font-normal border-b-slate-100">
            <th>1</th>
            <td>DO0001.123</td>
            <td>Kawi Departemen Store</td>
            <td>TS02K</td>
            <td>5</td>
            <td>Oppo A3s</td>
            <th><div class="text-xs text-green-600 badge badge-outline">Aktif</div></th>
          </tr>
          <tr class="font-normal border-b-slate-100">
            <th>1</th>
            <td>DO0001.123</td>
            <td>Kawi Departemen Store</td>
            <td>TS02K</td>
            <td>5</td>
            <td>Oppo A3s</td>
            <th><div class="text-xs text-green-600 badge badge-outline">Aktif</div></th>
          </tr>
          <tr class="font-normal border-b-slate-100">
            <th>1</th>
            <td>DO0001.123</td>
            <td>Kawi Departemen Store</td>
            <td>TS02K</td>
            <td>5</td>
            <td>Oppo A3s</td>
            <th><div class="text-xs text-green-600 badge badge-outline">Aktif</div></th>
          </tr>
          <tr class="font-normal border-b-slate-100">
            <th>1</th>
            <td>DO0001.123</td>
            <td>Kawi Departemen Store</td>
            <td>TS02K</td>
            <td>5</td>
            <td>Oppo A3s</td>
            <th><div class="text-xs text-green-600 badge badge-outline">Aktif</div></th>
          </tr>
          <tr class="font-normal border-b-slate-100">
            <th>1</th>
            <td>DO0001.123</td>
            <td>Kawi Departemen Store</td>
            <td>TS02K</td>
            <td>5</td>
            <td>Oppo A3s</td>
            <th><div class="text-xs text-green-600 badge badge-outline">Aktif</div></th>
          </tr>
          <tr class="font-normal border-b-slate-100">
            <th>1</th>
            <td>DO0001.123</td>
            <td>Kawi Departemen Store</td>
            <td>TS02K</td>
            <td>5</td>
            <td>Oppo A3s</td>
            <th><div class="text-xs text-green-600 badge badge-outline">Aktif</div></th>
          </tr>
          <tr class="font-normal border-b-slate-100">
            <th>1</th>
            <td>DO0001.123</td>
            <td>Kawi Departemen Store</td>
            <td>TS02K</td>
            <td>5</td>
            <td>Oppo A3s</td>
            <th><div class="text-xs text-green-600 badge badge-outline">Aktif</div></th>
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
</template>
