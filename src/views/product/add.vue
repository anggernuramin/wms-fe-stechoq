<template>
  <!-- Put this part before </body> tag -->
  <section
    class="absolute top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center overflow-auto bg-opacity-55 bg-TxtPrimary-700"
  >
    <div class="w-4/6 rounded-md bg-secondary">
      <form action="" class="p-5">
        <h2 class="mb-4 text-2xl text-center">Tambah Data</h2>
        <div class="grid grid-cols-2 gap-5">
          <div class="flex flex-col gap-2">
            <label for="name" class="text-sm font-normal text-TxtPrimary-700">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Type here"
              class="w-full px-3 py-2 border rounded-md bg-secondary"
              name="name"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label for="name" class="text-sm font-normal text-TxtPrimary-700">Item</label>
            <select class="w-full px-3 py-2 border bg-secondary">
              <option class="p-5" disabled selected>Pick your favorite Simpson</option>
              <option class="p-5">Homer</option>
              <option class="p-5">Marge</option>
              <option class="p-5">Bart</option>
              <option class="p-5">Lisa</option>
              <option class="p-5">Maggie</option>
            </select>
          </div>
          <div class="flex flex-col gap-2">
            <label for="name" class="text-sm font-normal text-TxtPrimary-700">Name</label>
            <select class="w-full px-3 py-2 border bg-secondary">
              <option class="p-5" disabled selected>Pick your favorite Simpson</option>
              <option class="p-5">Homer</option>
              <option class="p-5">Marge</option>
              <option class="p-5">Bart</option>
              <option class="p-5">Lisa</option>
              <option class="p-5">Maggie</option>
            </select>
            <span class="text-xs cursor-pointer text-btnPrimary">Tambah Category</span>
          </div>
          <div class="flex flex-col gap-2">
            <label for="name" class="text-sm font-normal text-TxtPrimary-700">Category</label>
            <select class="w-full px-3 py-2 border bg-secondary">
              <option class="p-5" disabled selected>Pick your favorite Simpson</option>
              <option class="p-5">Homer</option>
              <option class="p-5">Marge</option>
              <option class="p-5">Bart</option>
              <option class="p-5">Lisa</option>
              <option class="p-5">Maggie</option>
            </select>
          </div>
          <div class="flex flex-col gap-2">
            <label for="name" class="text-sm font-normal text-TxtPrimary-700">Qty</label>
            <select class="w-full px-3 py-2 border bg-secondary">
              <option class="p-5" disabled selected>Pick your favorite Simpson</option>
              <option class="p-5">Homer</option>
              <option class="p-5">Marge</option>
              <option class="p-5">Bart</option>
              <option class="p-5">Lisa</option>
              <option class="p-5">Maggie</option>
            </select>
          </div>
          <div class="flex flex-col gap-2">
            <label for="name" class="text-sm font-normal text-TxtPrimary-700">Price</label>
            <input
              id="name"
              type="text"
              placeholder="Type here"
              class="w-full px-3 py-2 border rounded-md bg-secondary"
              name="name"
            />
          </div>
        </div>
        <div class="flex items-center justify-end gap-3 mt-4">
          <router-link to="/products" class="btn btn-danger">Cancel</router-link>
          <button type="submit" class="btn btn-primary">Add</button>
        </div>
      </form>
    </div>
  </section>
  <!-- <router-link to="/products" class="btn bg-btnPrimary">Close</router-link> -->
</template>
