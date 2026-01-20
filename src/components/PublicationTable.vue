<template>
  <div class="card overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="bg-gradient-to-r from-primary-600 to-primary-500 text-white">
            <th class="px-4 py-3 text-left text-sm font-semibold">No</th>
            <th class="px-4 py-3 text-left text-sm font-semibold">Nama Dosen</th>
            <th class="px-4 py-3 text-left text-sm font-semibold">Judul Publikasi</th>
            <th class="px-4 py-3 text-left text-sm font-semibold">Jurnal</th>
            <th class="px-4 py-3 text-center text-sm font-semibold">Tahun</th>
            <th class="px-4 py-3 text-center text-sm font-semibold">Sitasi</th>
            <th class="px-4 py-3 text-center text-sm font-semibold">Jenis</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="publications.length === 0">
            <td colspan="7" class="px-4 py-12 text-center text-slate-500">
              <div class="flex flex-col items-center gap-3">
                <svg class="w-16 h-16 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <p class="text-lg font-medium">Belum ada data publikasi</p>
                <p class="text-sm">Mulai dengan mencari dosen menggunakan form di atas</p>
              </div>
            </td>
          </tr>
          <tr 
            v-for="(pub, index) in publications" 
            :key="index" 
            class="table-row animate-fade-in"
            :style="{ animationDelay: `${index * 0.05}s` }"
          >
            <td class="px-4 py-3 text-sm text-slate-700">{{ index + 1 }}</td>
            <td class="px-4 py-3 text-sm text-slate-700 font-medium">{{ pub.author }}</td>
            <td class="px-4 py-3">
              <a 
                :href="pub.link" 
                target="_blank"
                class="text-sm text-primary-600 hover:text-primary-700 font-medium hover:underline flex items-center gap-1 group"
              >
                {{ pub.title }}
                <svg class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </a>
            </td>
            <td class="px-4 py-3 text-sm text-slate-600">{{ pub.publication || '-' }}</td>
            <td class="px-4 py-3 text-sm text-slate-700 text-center font-medium">{{ pub.year }}</td>
            <td class="px-4 py-3 text-sm text-slate-700 text-center">
              <span class="inline-flex items-center gap-1">
                <svg class="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                {{ pub.citations }}
              </span>
            </td>
            <td class="px-4 py-3 text-center">
              <span 
                :class="getCategoryClass(pub.category)"
                class="inline-block px-3 py-1 rounded-full text-xs font-semibold"
              >
                {{ pub.category }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Info -->
    <div v-if="publications.length > 0" class="mt-4 pt-4 border-t border-slate-200 text-sm text-slate-600 text-center">
      Menampilkan {{ publications.length }} publikasi
    </div>
  </div>
</template>

<script>
export default {
  name: 'PublicationTable',
  props: {
    publications: {
      type: Array,
      required: true
    }
  },
  methods: {
    getCategoryClass(category) {
      if (category === 'Pengmas') {
        return 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700';
      }
      return 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700';
    }
  }
}
</script>
