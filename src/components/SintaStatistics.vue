<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="card bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-slate-700">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-4">
          <!-- Pulse Logo -->
          <div class="relative">
            <div class="w-14 h-14 bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-500/30">
              <!-- Heartbeat/Pulse Icon -->
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <!-- Pulse ring animation -->
            <div class="absolute inset-0 rounded-2xl bg-rose-500/30 animate-ping"></div>
          </div>
          <div>
            <div class="flex items-center gap-3">
              <h1 class="text-2xl font-black text-white tracking-tight">SINTA-Pulse</h1>
              <span class="px-2 py-0.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">Live</span>
            </div>
            <p class="text-sm text-slate-400 mt-0.5">Dashboard Monitoring Dosen | Data Kumulatif SINTA 3</p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div class="hidden md:flex flex-col items-end">
            <span class="text-xs uppercase tracking-wider text-slate-500 font-bold">Monitoring</span>
            <span class="text-sm font-semibold text-slate-300">{{ sintaLecturers.length }} Dosen Aktif</span>
          </div>
          <a
            href="https://sinta.kemdiktisaintek.go.id"
            target="_blank"
            class="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:from-rose-600 hover:to-pink-600 transition-all flex items-center gap-2 shadow-lg shadow-rose-500/25"
          >
            <span>Buka SINTA</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </a>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center border border-blue-200 hover:shadow-md transition-all group">
          <div class="text-2xl font-black text-blue-600 group-hover:scale-110 transition-transform">{{ stats.totalResearch }}</div>
          <div class="text-xs uppercase tracking-wider text-blue-700 mt-1 font-bold">Penelitian</div>
        </div>
        <div class="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 text-center border border-emerald-200 hover:shadow-md transition-all group">
          <div class="text-2xl font-black text-emerald-600 group-hover:scale-110 transition-transform">{{ stats.totalServices }}</div>
          <div class="text-xs uppercase tracking-wider text-emerald-700 mt-1 font-bold">Pengabdian</div>
        </div>
        <div class="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 text-center border border-indigo-200 hover:shadow-md transition-all group">
          <div class="text-2xl font-black text-indigo-600 group-hover:scale-110 transition-transform">{{ stats.totalScopus }}</div>
          <div class="text-xs uppercase tracking-wider text-indigo-700 mt-1 font-bold">Scopus</div>
        </div>
        <div class="bg-gradient-to-br from-sky-50 to-sky-100 rounded-xl p-4 text-center border border-sky-200 hover:shadow-md transition-all group">
          <div class="text-2xl font-black text-sky-600 group-hover:scale-110 transition-transform">{{ stats.totalSinta }}</div>
          <div class="text-xs uppercase tracking-wider text-sky-700 mt-1 font-bold">SINTA</div>
        </div>
        <div class="bg-gradient-to-br from-rose-50 to-rose-100 rounded-xl p-4 text-center border border-rose-200 hover:shadow-md transition-all group">
          <div class="text-2xl font-black text-rose-600 group-hover:scale-110 transition-transform">{{ stats.totalCitations }}</div>
          <div class="text-xs uppercase tracking-wider text-rose-700 mt-1 font-bold">Sitasi</div>
        </div>
        <div class="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 text-center border border-amber-200 hover:shadow-md transition-all group">
          <div class="text-2xl font-black text-amber-600 group-hover:scale-110 transition-transform">{{ stats.totalIpr }}</div>
          <div class="text-xs uppercase tracking-wider text-amber-700 mt-1 font-bold">IPR/HKI</div>
        </div>
        <div class="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-4 text-center border border-teal-200 hover:shadow-md transition-all group">
          <div class="text-2xl font-black text-teal-600 group-hover:scale-110 transition-transform">{{ stats.totalBooks }}</div>
          <div class="text-xs uppercase tracking-wider text-teal-700 mt-1 font-bold">Buku</div>
        </div>
        <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center border border-purple-200 hover:shadow-md transition-all group">
          <div class="text-2xl font-black text-purple-600 group-hover:scale-110 transition-transform">{{ sintaLecturers.length }}</div>
          <div class="text-xs uppercase tracking-wider text-purple-700 mt-1 font-bold">Dosen</div>
        </div>
      </div>
    </div>

    <!-- Charts Row 1 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Publikasi Breakdown -->
      <div class="card hover:shadow-lg transition-shadow">
        <div class="mb-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 bg-indigo-500 rounded-full"></span>
              <h3 class="text-lg font-bold text-slate-800">Kategori Publikasi</h3>
            </div>
            <div class="flex gap-2 text-[10px] uppercase tracking-tighter">
              <span class="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded">Scopus</span>
              <span class="px-2 py-0.5 bg-sky-100 text-sky-700 rounded">SINTA</span>
            </div>
          </div>
          <p class="text-xs text-slate-400 mt-1">Data kumulatif keseluruhan karir dosen</p>
        </div>
        <div class="h-64">
          <Bar v-if="hasPublicationData" :data="publicationChartData" :options="publicationChartOptions" />
          <div v-else class="h-full flex items-center justify-center text-slate-400 text-sm">Data publikasi tidak tersedia</div>
        </div>
      </div>

      <!-- Top Dosen by Sitasi -->
      <div class="card hover:shadow-lg transition-shadow">
        <div class="mb-4">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 bg-rose-500 rounded-full"></span>
            <h3 class="text-lg font-bold text-slate-800">Top Dosen - Sitasi</h3>
          </div>
          <p class="text-xs text-slate-400 mt-1">Sitasi kumulatif dari Google Scholar (lebih komprehensif)</p>
        </div>
        <div class="h-64">
          <Bar :data="citationChartData" :options="horizontalBarOptions" />
        </div>
      </div>
    </div>

    <!-- Charts Row 2 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Distribusi IPR -->
      <div class="card hover:shadow-lg transition-shadow">
        <div class="mb-4">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 bg-amber-500 rounded-full"></span>
            <h3 class="text-lg font-bold text-slate-800">Proporsi IPR/HKI</h3>
          </div>
          <p class="text-xs text-slate-400 mt-1">Hak Kekayaan Intelektual terdaftar</p>
        </div>
        <div class="h-64 flex items-center justify-center">
          <div v-if="stats.totalIpr > 0" class="w-full h-full">
            <Doughnut :data="iprChartData" :options="doughnutOptions" />
          </div>
          <div v-else class="flex flex-col items-center justify-center text-slate-400 space-y-2">
            <svg class="w-12 h-12 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <p class="text-sm font-medium">Belum ada data IPR terverifikasi</p>
          </div>
        </div>
      </div>

      <!-- Produktivitas Dosen -->
      <div class="card hover:shadow-lg transition-shadow">
        <div class="mb-4">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 bg-emerald-500 rounded-full"></span>
            <h3 class="text-lg font-bold text-slate-800">Produktivitas Tridarma</h3>
          </div>
          <p class="text-xs text-slate-400 mt-1">Top 10 dosen | Publikasi = Scopus + SINTA Garuda</p>
        </div>
        <div class="h-64">
          <Bar :data="productivityChartData" :options="stackedBarOptions" />
        </div>
      </div>
    </div>

    <!-- Tabel Detail -->
    <div class="card">
      <div class="flex items-center justify-between mb-4">
        <div class="flex flex-col">
          <h3 class="text-lg font-bold text-slate-800">Detail Performa Dosen</h3>
          <p class="text-sm text-slate-500">Data kumulatif keseluruhan karir | Kolom "-" = tanpa kategori/akreditasi | Jml = Jumlah total</p>
        </div>
      </div>

      <div class="overflow-x-auto rounded-xl border border-slate-100">
        <table class="w-full">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200">
              <th class="text-left py-4 px-4 font-bold text-slate-600 uppercase tracking-wider text-xs" rowspan="2">
                <button @click="sortBy('name')" class="flex items-center gap-1 hover:text-slate-900 transition-colors">
                  Nama Dosen
                  <SortIcon :active="sortColumn === 'name'" :direction="sortDirection" />
                </button>
              </th>
              <th class="text-center py-3 px-2 font-bold text-blue-600 uppercase tracking-wider text-xs" rowspan="2">
                <button @click="sortBy('research')" class="flex items-center gap-1 justify-center w-full">
                  Penelitian
                  <SortIcon :active="sortColumn === 'research'" :direction="sortDirection" />
                </button>
              </th>
              <th class="text-center py-3 px-2 font-bold text-emerald-600 uppercase tracking-wider text-xs" rowspan="2">
                <button @click="sortBy('services')" class="flex items-center gap-1 justify-center w-full">
                  Pengabdian
                  <SortIcon :active="sortColumn === 'services'" :direction="sortDirection" />
                </button>
              </th>
              <th class="text-center py-2 px-2 font-bold text-indigo-600 uppercase tracking-wider text-xs border-l border-slate-200 bg-indigo-50/50" colspan="6">
                Scopus (Internasional)
              </th>
              <th class="text-center py-2 px-2 font-bold text-sky-600 uppercase tracking-wider text-xs border-l border-slate-200 bg-sky-50/50" colspan="8">
                SINTA (Nasional)
              </th>
              <th class="text-center py-3 px-2 font-bold text-rose-600 uppercase tracking-wider text-xs border-l border-slate-200" rowspan="2">
                <button @click="sortBy('citations')" class="flex items-center gap-1 justify-center w-full">
                  Sitasi
                  <SortIcon :active="sortColumn === 'citations'" :direction="sortDirection" />
                </button>
              </th>
              <th class="text-center py-3 px-2 font-bold text-purple-600 uppercase tracking-wider text-xs" rowspan="2">
                <button @click="sortBy('hIndex')" class="flex items-center gap-1 justify-center w-full">
                  H-Index
                  <SortIcon :active="sortColumn === 'hIndex'" :direction="sortDirection" />
                </button>
              </th>
              <th class="text-center py-3 px-2 font-bold text-amber-600 uppercase tracking-wider text-xs" rowspan="2">
                <button @click="sortBy('ipr')" class="flex items-center gap-1 justify-center w-full">
                  IPR
                  <SortIcon :active="sortColumn === 'ipr'" :direction="sortDirection" />
                </button>
              </th>
              <th class="text-center py-3 px-2 font-bold text-teal-600 uppercase tracking-wider text-xs" rowspan="2">
                Buku
              </th>
              <th class="text-center py-3 px-4 font-bold text-slate-400 uppercase tracking-wider text-xs" rowspan="2">Link</th>
            </tr>
            <tr class="bg-slate-50/50 border-b border-slate-200">
              <th class="text-center py-2 px-1 font-semibold text-indigo-800 text-[11px] border-l border-slate-200 bg-indigo-100/50">Q1</th>
              <th class="text-center py-2 px-1 font-semibold text-indigo-700 text-[11px] bg-indigo-50/50">Q2</th>
              <th class="text-center py-2 px-1 font-semibold text-indigo-600 text-[11px] bg-indigo-50/30">Q3</th>
              <th class="text-center py-2 px-1 font-semibold text-indigo-500 text-[11px] bg-indigo-50/20">Q4</th>
              <th class="text-center py-2 px-1 font-semibold text-slate-400 text-[11px]" title="Tanpa Quartile">-</th>
              <th class="text-center py-2 px-1 font-semibold text-indigo-600 text-[11px] bg-indigo-100/30">Jml</th>
              <th class="text-center py-2 px-1 font-semibold text-sky-800 text-[11px] border-l border-slate-200 bg-sky-100/50">S1</th>
              <th class="text-center py-2 px-1 font-semibold text-sky-700 text-[11px] bg-sky-50/50">S2</th>
              <th class="text-center py-2 px-1 font-semibold text-sky-600 text-[11px] bg-sky-50/40">S3</th>
              <th class="text-center py-2 px-1 font-semibold text-sky-500 text-[11px] bg-sky-50/30">S4</th>
              <th class="text-center py-2 px-1 font-semibold text-sky-400 text-[11px] bg-sky-50/20">S5</th>
              <th class="text-center py-2 px-1 font-semibold text-sky-300 text-[11px]">S6</th>
              <th class="text-center py-2 px-1 font-semibold text-slate-400 text-[11px]" title="Tanpa Akreditasi">-</th>
              <th class="text-center py-2 px-1 font-semibold text-sky-600 text-[11px] bg-sky-100/30">Jml</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr
              v-for="(lecturer, index) in sortedLecturers"
              :key="lecturer.sintaId"
              class="group hover:bg-slate-50/80 transition-all duration-200"
            >
              <td class="py-3 px-4">
                <div class="font-bold text-slate-800 group-hover:text-green-700 transition-colors text-sm">{{ lecturer.name }}</div>
                <div class="text-xs text-slate-400 font-medium">SINTA ID: {{ lecturer.sintaId }}</div>
              </td>
              <td class="text-center py-3 px-2">
                <span class="inline-flex items-center justify-center min-w-[2rem] h-8 px-2 rounded-lg bg-blue-50 text-blue-700 font-bold text-sm border border-blue-100">
                  {{ lecturer.research?.length || 0 }}
                </span>
              </td>
              <td class="text-center py-3 px-2">
                <span class="inline-flex items-center justify-center min-w-[2rem] h-8 px-2 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-sm border border-emerald-100">
                  {{ lecturer.services?.length || 0 }}
                </span>
              </td>
              <!-- Scopus Q1-Q4 -->
              <td class="text-center py-3 px-1 border-l border-slate-100 bg-indigo-50/20">
                <span :class="['font-bold text-sm', lecturer.documents?.scopus?.q1 > 0 ? 'text-indigo-800' : 'text-slate-300']">
                  {{ lecturer.documents?.scopus?.q1 || 0 }}
                </span>
              </td>
              <td class="text-center py-3 px-1 bg-indigo-50/10">
                <span :class="['font-bold text-sm', lecturer.documents?.scopus?.q2 > 0 ? 'text-indigo-700' : 'text-slate-300']">
                  {{ lecturer.documents?.scopus?.q2 || 0 }}
                </span>
              </td>
              <td class="text-center py-3 px-1">
                <span :class="['font-bold text-sm', lecturer.documents?.scopus?.q3 > 0 ? 'text-indigo-600' : 'text-slate-300']">
                  {{ lecturer.documents?.scopus?.q3 || 0 }}
                </span>
              </td>
              <td class="text-center py-3 px-1">
                <span :class="['font-bold text-sm', lecturer.documents?.scopus?.q4 > 0 ? 'text-indigo-500' : 'text-slate-300']">
                  {{ lecturer.documents?.scopus?.q4 || 0 }}
                </span>
              </td>
              <td class="text-center py-3 px-1">
                <span :class="['font-bold text-sm', lecturer.documents?.scopus?.noq > 0 ? 'text-slate-500' : 'text-slate-300']">
                  {{ lecturer.documents?.scopus?.noq || 0 }}
                </span>
              </td>
              <td class="text-center py-3 px-1">
                <span class="inline-flex items-center justify-center min-w-[1.5rem] h-6 px-1 rounded bg-indigo-100 text-indigo-700 font-bold text-xs">
                  {{ lecturer.documents?.scopus?.total || 0 }}
                </span>
              </td>
              <!-- SINTA S1-S6 -->
              <td class="text-center py-3 px-1 border-l border-slate-100 bg-sky-50/20">
                <span :class="['font-bold text-sm', lecturer.documents?.sinta?.s1 > 0 ? 'text-sky-800' : 'text-slate-300']">
                  {{ lecturer.documents?.sinta?.s1 || 0 }}
                </span>
              </td>
              <td class="text-center py-3 px-1 bg-sky-50/10">
                <span :class="['font-bold text-sm', lecturer.documents?.sinta?.s2 > 0 ? 'text-sky-700' : 'text-slate-300']">
                  {{ lecturer.documents?.sinta?.s2 || 0 }}
                </span>
              </td>
              <td class="text-center py-3 px-1">
                <span :class="['font-bold text-sm', lecturer.documents?.sinta?.s3 > 0 ? 'text-sky-600' : 'text-slate-300']">
                  {{ lecturer.documents?.sinta?.s3 || 0 }}
                </span>
              </td>
              <td class="text-center py-3 px-1">
                <span :class="['font-bold text-sm', lecturer.documents?.sinta?.s4 > 0 ? 'text-sky-500' : 'text-slate-300']">
                  {{ lecturer.documents?.sinta?.s4 || 0 }}
                </span>
              </td>
              <td class="text-center py-3 px-1">
                <span :class="['font-bold text-sm', lecturer.documents?.sinta?.s5 > 0 ? 'text-sky-400' : 'text-slate-300']">
                  {{ lecturer.documents?.sinta?.s5 || 0 }}
                </span>
              </td>
              <td class="text-center py-3 px-1">
                <span :class="['font-bold text-sm', lecturer.documents?.sinta?.s6 > 0 ? 'text-sky-300' : 'text-slate-300']">
                  {{ lecturer.documents?.sinta?.s6 || 0 }}
                </span>
              </td>
              <td class="text-center py-3 px-1">
                <span :class="['font-bold text-sm', lecturer.documents?.sinta?.unknown > 0 ? 'text-slate-500' : 'text-slate-300']">
                  {{ lecturer.documents?.sinta?.unknown || 0 }}
                </span>
              </td>
              <td class="text-center py-3 px-1">
                <span class="inline-flex items-center justify-center min-w-[1.5rem] h-6 px-1 rounded bg-sky-100 text-sky-700 font-bold text-xs">
                  {{ lecturer.documents?.sinta?.total || 0 }}
                </span>
              </td>
              <!-- Sitasi -->
              <td class="text-center py-3 px-2 border-l border-slate-100">
                <span class="font-bold text-rose-700 text-sm">{{ lecturer.stats?.citations || 0 }}</span>
              </td>
              <!-- H-Index -->
              <td class="text-center py-3 px-2">
                <span class="font-bold text-purple-700 text-sm">{{ lecturer.stats?.hIndex || 0 }}</span>
              </td>
              <!-- IPR -->
              <td class="text-center py-3 px-2">
                <span :class="[
                  'inline-flex items-center justify-center min-w-[1.5rem] h-6 px-2 rounded font-bold text-sm',
                  lecturer.ipr?.total > 0 ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-slate-50 text-slate-300'
                ]">
                  {{ lecturer.ipr?.total || 0 }}
                </span>
              </td>
              <!-- Buku -->
              <td class="text-center py-3 px-2">
                <span :class="[
                  'inline-flex items-center justify-center min-w-[1.5rem] h-6 px-2 rounded font-bold text-sm',
                  lecturer.books?.length > 0 ? 'bg-teal-100 text-teal-700 border border-teal-200' : 'bg-slate-50 text-slate-300'
                ]">
                  {{ lecturer.books?.length || 0 }}
                </span>
              </td>
              <td class="text-center py-3 px-4">
                <a
                  :href="`https://sinta.kemdiktisaintek.go.id/authors/profile/${lecturer.sintaId}`"
                  target="_blank"
                  class="text-slate-300 hover:text-green-600 transition-colors"
                >
                  <svg class="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </a>
              </td>
            </tr>
          </tbody>
          <!-- Footer totals -->
          <tfoot class="bg-slate-100 border-t-2 border-slate-300">
            <tr class="font-bold">
              <td class="py-4 px-4 text-slate-700 text-sm">TOTAL</td>
              <td class="text-center py-4 px-2 text-blue-700 text-sm">{{ stats.totalResearch }}</td>
              <td class="text-center py-4 px-2 text-emerald-700 text-sm">{{ stats.totalServices }}</td>
              <td class="text-center py-4 px-1 border-l border-slate-200 text-indigo-800 text-sm">{{ scopusTotals.q1 }}</td>
              <td class="text-center py-4 px-1 text-indigo-700 text-sm">{{ scopusTotals.q2 }}</td>
              <td class="text-center py-4 px-1 text-indigo-600 text-sm">{{ scopusTotals.q3 }}</td>
              <td class="text-center py-4 px-1 text-indigo-500 text-sm">{{ scopusTotals.q4 }}</td>
              <td class="text-center py-4 px-1 text-slate-500 text-sm">{{ scopusTotals.noq }}</td>
              <td class="text-center py-4 px-1 text-indigo-700 text-sm bg-indigo-100 rounded">{{ stats.totalScopus }}</td>
              <td class="text-center py-4 px-1 border-l border-slate-200 text-sky-800 text-sm">{{ sintaTotals.s1 }}</td>
              <td class="text-center py-4 px-1 text-sky-700 text-sm">{{ sintaTotals.s2 }}</td>
              <td class="text-center py-4 px-1 text-sky-600 text-sm">{{ sintaTotals.s3 }}</td>
              <td class="text-center py-4 px-1 text-sky-500 text-sm">{{ sintaTotals.s4 }}</td>
              <td class="text-center py-4 px-1 text-sky-400 text-sm">{{ sintaTotals.s5 }}</td>
              <td class="text-center py-4 px-1 text-sky-300 text-sm">{{ sintaTotals.s6 }}</td>
              <td class="text-center py-4 px-1 text-slate-500 text-sm">{{ sintaTotals.unknown }}</td>
              <td class="text-center py-4 px-1 text-sky-700 text-sm bg-sky-100 rounded">{{ stats.totalSinta }}</td>
              <td class="text-center py-4 px-2 border-l border-slate-200 text-rose-700 text-sm">{{ stats.totalCitations }}</td>
              <td class="text-center py-4 px-2 text-purple-700 text-sm">-</td>
              <td class="text-center py-4 px-2 text-amber-700 text-sm">{{ stats.totalIpr }}</td>
              <td class="text-center py-4 px-2 text-teal-700 text-sm">{{ stats.totalBooks }}</td>
              <td class="py-4 px-4"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>

    <!-- Info Update -->
    <div class="text-center text-sm text-slate-500 pb-6 space-y-2">
      <div class="flex items-center justify-center gap-3">
        <div class="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full">
          <div class="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
          <span class="text-xs font-semibold text-slate-600">SINTA-Pulse Active</span>
        </div>
        <span v-if="metadata" class="text-slate-400">|</span>
        <span v-if="metadata" class="text-slate-500">Last sync: {{ formatDate(metadata.generatedAt) }}</span>
      </div>
      <p class="text-xs text-slate-400">
        Data kumulatif keseluruhan karir dosen dari SINTA Kemdiktisaintek
      </p>
    </div>
  </div>
</template>

<script>
import { Bar, Doughnut } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
} from 'chart.js';

import sintaData from '../data/sinta_data.json';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
);

const SortIcon = {
  props: ['active', 'direction'],
  template: `
    <svg class="w-3 h-3 transition-opacity" :class="{ 'opacity-10': !active, 'rotate-180': active && direction === 'asc' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path>
    </svg>
  `
};

export default {
  name: 'SintaStatistics',
  components: { Bar, Doughnut, SortIcon },
  props: {
    selectedProdi: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      sortColumn: 'scopus',
      sortDirection: 'desc'
    };
  },
  computed: {
    metadata() { return sintaData?.metadata || null; },
    sintaLecturers() { 
      const allLecturers = sintaData?.lecturers || [];
      if (!this.selectedProdi) return allLecturers;
      // Filter by prodi name that matches the selected prodi key
      return allLecturers.filter(l => l.prodi === this.selectedProdi);
    },
    sortedLecturers() {
      const lecturers = [...this.sintaLecturers];
      const col = this.sortColumn;
      const dir = this.sortDirection === 'asc' ? 1 : -1;
      return lecturers.sort((a, b) => {
        let valA, valB;
        if (col === 'name') {
          valA = a.name.toLowerCase(); valB = b.name.toLowerCase();
          return valA < valB ? -1 * dir : valA > valB ? 1 * dir : 0;
        }
        if (col === 'research') { valA = a.research?.length || 0; valB = b.research?.length || 0; }
        else if (col === 'services') { valA = a.services?.length || 0; valB = b.services?.length || 0; }
        else if (col === 'scopus') { valA = a.documents?.scopus?.total || 0; valB = b.documents?.scopus?.total || 0; }
        else if (col === 'sinta') { valA = a.documents?.sinta?.total || 0; valB = b.documents?.sinta?.total || 0; }
        else if (col === 'citations') { valA = a.stats?.citations || 0; valB = b.stats?.citations || 0; }
        else if (col === 'hIndex') { valA = a.stats?.hIndex || 0; valB = b.stats?.hIndex || 0; }
        else if (col === 'ipr') { valA = a.ipr?.total || 0; valB = b.ipr?.total || 0; }
        return (valA - valB) * dir;
      });
    },
    stats() {
      const s = { totalResearch: 0, totalServices: 0, totalScopus: 0, totalSinta: 0, totalCitations: 0, totalIpr: 0, totalBooks: 0 };
      this.sintaLecturers.forEach(l => {
        s.totalResearch += l.research?.length || 0;
        s.totalServices += l.services?.length || 0;
        s.totalScopus += l.documents?.scopus?.total || 0;
        s.totalSinta += l.documents?.sinta?.total || 0;
        s.totalCitations += l.stats?.citations || 0;
        s.totalIpr += l.ipr?.total || 0;
        s.totalBooks += l.books?.length || 0;
      });
      return s;
    },
    scopusTotals() {
      const t = { q1: 0, q2: 0, q3: 0, q4: 0, noq: 0 };
      this.sintaLecturers.forEach(l => {
        t.q1 += l.documents?.scopus?.q1 || 0;
        t.q2 += l.documents?.scopus?.q2 || 0;
        t.q3 += l.documents?.scopus?.q3 || 0;
        t.q4 += l.documents?.scopus?.q4 || 0;
        t.noq += l.documents?.scopus?.noq || 0;
      });
      return t;
    },
    sintaTotals() {
      const t = { s1: 0, s2: 0, s3: 0, s4: 0, s5: 0, s6: 0, unknown: 0 };
      this.sintaLecturers.forEach(l => {
        t.s1 += l.documents?.sinta?.s1 || 0;
        t.s2 += l.documents?.sinta?.s2 || 0;
        t.s3 += l.documents?.sinta?.s3 || 0;
        t.s4 += l.documents?.sinta?.s4 || 0;
        t.s5 += l.documents?.sinta?.s5 || 0;
        t.s6 += l.documents?.sinta?.s6 || 0;
        t.unknown += l.documents?.sinta?.unknown || 0;
      });
      return t;
    },
    hasPublicationData() { return this.stats.totalScopus > 0 || this.stats.totalSinta > 0; },
    publicationChartData() {
      const scopus = { q1: 0, q2: 0, q3: 0, q4: 0 };
      const sinta = { s1: 0, s2: 0, s3: 0, s4: 0, s5: 0, s6: 0 };
      this.sintaLecturers.forEach(l => {
        if (l.documents?.scopus) {
          scopus.q1 += l.documents.scopus.q1 || 0; scopus.q2 += l.documents.scopus.q2 || 0;
          scopus.q3 += l.documents.scopus.q3 || 0; scopus.q4 += l.documents.scopus.q4 || 0;
        }
        if (l.documents?.sinta) {
          sinta.s1 += l.documents.sinta.s1 || 0; sinta.s2 += l.documents.sinta.s2 || 0;
          sinta.s3 += l.documents.sinta.s3 || 0; sinta.s4 += l.documents.sinta.s4 || 0;
          sinta.s5 += l.documents.sinta.s5 || 0; sinta.s6 += l.documents.sinta.s6 || 0;
        }
      });
      return {
        labels: ['Q1', 'Q2', 'Q3', 'Q4', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6'],
        datasets: [
          { label: 'Scopus Q-Index', data: [scopus.q1, scopus.q2, scopus.q3, scopus.q4, 0, 0, 0, 0, 0, 0], backgroundColor: '#4f46e5', borderRadius: 4 },
          { label: 'SINTA Rank', data: [0, 0, 0, 0, sinta.s1, sinta.s2, sinta.s3, sinta.s4, sinta.s5, sinta.s6], backgroundColor: '#0ea5e9', borderRadius: 4 }
        ]
      };
    },
    citationChartData() {
      const data = this.sintaLecturers.map(l => ({ name: this.getShortName(l.name), val: l.stats?.citations || 0 }))
        .sort((a,b) => b.val - a.val).slice(0, 8);
      return { labels: data.map(d => d.name), datasets: [{ label: 'Sitasi', data: data.map(d => d.val), backgroundColor: '#f43f5e', borderRadius: 4 }] };
    },
    iprChartData() {
      let hc = 0, p = 0, other = 0;
      this.sintaLecturers.forEach(l => {
        hc += l.ipr?.hakCipta || 0;
        p += l.ipr?.paten || 0;
        other += l.ipr?.other || 0;
      });
      // Only include non-zero categories
      const labels = [];
      const data = [];
      const colors = [];
      if (hc > 0) { labels.push('Hak Cipta'); data.push(hc); colors.push('#f59e0b'); }
      if (p > 0) { labels.push('Paten'); data.push(p); colors.push('#3b82f6'); }
      if (other > 0) { labels.push('Lainnya'); data.push(other); colors.push('#94a3b8'); }
      return { labels, datasets: [{ data, backgroundColor: colors, borderWidth: 0 }] };
    },
    productivityChartData() {
      const data = this.sintaLecturers.map(l => ({
        name: this.getShortName(l.name),
        res: l.research?.length || 0,
        ser: l.services?.length || 0,
        pub: (l.documents?.scopus?.total || 0) + (l.documents?.sinta?.total || 0)
      })).sort((a,b) => (b.res+b.ser+b.pub) - (a.res+a.ser+a.pub)).slice(0, 10);
      return {
        labels: data.map(d => d.name),
        datasets: [
          { label: 'Penelitian', data: data.map(d => d.res), backgroundColor: 'rgba(59, 130, 246, 0.7)', stack: 'a' },
          { label: 'Pengabdian', data: data.map(d => d.ser), backgroundColor: 'rgba(16, 185, 129, 0.7)', stack: 'a' },
          { label: 'Publikasi', data: data.map(d => d.pub), backgroundColor: 'rgba(99, 102, 241, 0.7)', stack: 'a' }
        ]
      };
    },
    publicationChartOptions: () => ({ 
      responsive: true, 
      maintainAspectRatio: false, 
      plugins: { 
        legend: { display: false },
        tooltip: {
          titleFont: { size: 14 },
          bodyFont: { size: 13 },
          padding: 12
        }
      },
      scales: {
        x: { ticks: { font: { size: 12, weight: 'bold' } } },
        y: { ticks: { font: { size: 12 } }, grid: { color: 'rgba(0,0,0,0.05)' } }
      }
    }),
    horizontalBarOptions: () => ({ 
      responsive: true, 
      maintainAspectRatio: false, 
      indexAxis: 'y', 
      plugins: { 
        legend: { display: false },
        tooltip: { titleFont: { size: 14 }, bodyFont: { size: 13 } }
      },
      scales: {
        x: { ticks: { font: { size: 12 } }, grid: { color: 'rgba(0,0,0,0.05)' } },
        y: { ticks: { font: { size: 12, weight: 'bold' } } }
      }
    }),
    stackedBarOptions: () => ({ 
      responsive: true, 
      maintainAspectRatio: false, 
      plugins: { 
        legend: { position: 'bottom', labels: { boxWidth: 10, usePointStyle: true, font: { size: 12 } } },
        tooltip: { titleFont: { size: 14 }, bodyFont: { size: 13 } }
      }, 
      scales: { 
        x: { stacked: true, ticks: { font: { size: 11, weight: 'bold' } } }, 
        y: { stacked: true, ticks: { font: { size: 12 } } } 
      } 
    }),
    doughnutOptions: () => ({ 
      responsive: true, 
      maintainAspectRatio: false, 
      cutout: '70%', 
      plugins: { 
        legend: { position: 'bottom', labels: { font: { size: 12, weight: 'bold' } } },
        tooltip: { titleFont: { size: 14 }, bodyFont: { size: 13 } }
      } 
    })
  },
  methods: {
    sortBy(column) {
      if (this.sortColumn === column) this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      else { this.sortColumn = column; this.sortDirection = 'desc'; }
    },
    getShortName(name) { const p = name.split(' '); return p.length <= 2 ? name : p.slice(0,2).join(' '); },
    formatDate(ds) { if (!ds) return ''; return new Date(ds).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }); }
  }
}
</script>

<style scoped>
.card { @apply bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all; }
</style>
