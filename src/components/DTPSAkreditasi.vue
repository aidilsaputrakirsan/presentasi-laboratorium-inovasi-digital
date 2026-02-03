<template>
  <div class="space-y-6">
    <!-- 1. HEADER + OVERVIEW -->
    <div class="card bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 border-indigo-700">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-4">
          <div class="relative">
            <div class="w-14 h-14 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
              </svg>
            </div>
            <div class="absolute inset-0 rounded-2xl bg-indigo-500/30 animate-ping"></div>
          </div>
          <div>
            <div class="flex items-center gap-3">
              <h1 class="text-2xl font-black text-white tracking-tight">DTPS Akreditasi</h1>
              <span class="px-2 py-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">AMI Ready</span>
            </div>
            <p class="text-sm text-slate-400 mt-0.5">Rasio Penelitian & Pengabdian per DTPS | Data SINTA</p>
          </div>
        </div>
      </div>

      <!-- Summary Stats Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <div class="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 text-center border border-indigo-200 hover:shadow-md transition-all group">
          <div class="text-2xl font-black text-indigo-600 group-hover:scale-110 transition-transform">{{ currentDtpsCount }}</div>
          <div class="text-xs uppercase tracking-wider text-indigo-700 mt-1 font-bold">Total DTPS</div>
        </div>
        <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center border border-blue-200 hover:shadow-md transition-all group">
          <div class="text-2xl font-black text-blue-600 group-hover:scale-110 transition-transform">{{ filteredResearchCount }}</div>
          <div class="text-xs uppercase tracking-wider text-blue-700 mt-1 font-bold">Penelitian</div>
        </div>
        <div class="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 text-center border border-emerald-200 hover:shadow-md transition-all group">
          <div class="text-2xl font-black text-emerald-600 group-hover:scale-110 transition-transform">{{ filteredServiceCount }}</div>
          <div class="text-xs uppercase tracking-wider text-emerald-700 mt-1 font-bold">Pengabdian</div>
        </div>
        <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center border border-purple-200 hover:shadow-md transition-all group">
          <div class="text-lg font-black text-purple-600 group-hover:scale-110 transition-transform">{{ ratioResearchPerDtps }}</div>
          <div class="text-xs uppercase tracking-wider text-purple-700 mt-1 font-bold">Penelitian/DTPS</div>
        </div>
        <div class="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4 text-center border border-pink-200 hover:shadow-md transition-all group">
          <div class="text-lg font-black text-pink-600 group-hover:scale-110 transition-transform">{{ ratioServicePerDtps }}</div>
          <div class="text-xs uppercase tracking-wider text-pink-700 mt-1 font-bold">Pengabdian/DTPS</div>
        </div>
        <div class="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 text-center border border-amber-200 hover:shadow-md transition-all group">
          <div class="text-lg font-black text-amber-600 group-hover:scale-110 transition-transform">{{ formatCurrencyShort(avgFundingPerDtps) }}</div>
          <div class="text-xs uppercase tracking-wider text-amber-700 mt-1 font-bold">Dana/DTPS</div>
        </div>
      </div>

      <!-- Penjelasan Overview -->
      <div class="mt-4 p-3 bg-slate-800/50 rounded-lg text-xs text-slate-300 border border-slate-600">
        <div class="flex items-start gap-2">
          <svg class="w-4 h-4 mt-0.5 flex-shrink-0 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div>
            <strong class="text-indigo-400">Tentang DTPS:</strong>
            <span class="ml-1">DTPS = Dosen Tetap Program Studi. Centang dosen dari prodi lain yang ikut mengajar di prodi ini untuk dihitung dalam rasio. Konfigurasi akan reset saat refresh halaman.</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. FILTER PRODI & TAHUN -->
    <div class="card">
      <div class="flex flex-wrap items-center gap-6">
        <!-- Filter Prodi -->
        <div>
          <span class="text-sm font-bold text-slate-700 block mb-2">Program Studi:</span>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="prodi in prodiList"
              :key="prodi"
              @click="selectedProdi = prodi"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-bold transition-all',
                selectedProdi === prodi
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              ]"
            >
              {{ prodi }}
            </button>
          </div>
        </div>

        <!-- Filter Tahun -->
        <div>
          <span class="text-sm font-bold text-slate-700 block mb-2">Periode:</span>
          <div class="flex items-center gap-2">
            <select v-model="startYear" class="px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
              <option v-for="year in availableYears" :key="'start-' + year" :value="year">{{ year }}</option>
            </select>
            <span class="text-slate-500">s/d</span>
            <select v-model="endYear" class="px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
              <option v-for="year in availableYears" :key="'end-' + year" :value="year">{{ year }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. TABEL DTPS DENGAN CHECKBOX -->
    <div class="card hover:shadow-lg transition-shadow">
      <div class="mb-4">
        <div class="flex items-center justify-between">
          <div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 bg-indigo-500 rounded-full"></span>
              <h3 class="text-lg font-bold text-slate-800">Daftar DTPS - {{ selectedProdi }}</h3>
            </div>
            <p class="text-xs text-slate-400 mt-1">Centang dosen dari prodi lain untuk menambahkan ke hitungan DTPS</p>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <span class="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg font-bold">{{ currentDtpsCount }} DTPS terpilih</span>
          </div>
        </div>
      </div>

      <!-- Penjelasan -->
      <div class="mb-4 p-3 bg-indigo-50 rounded-lg text-xs text-indigo-700 border border-indigo-200">
        <strong>Cara Penggunaan:</strong>
        <ul class="mt-1 ml-4 list-disc space-y-0.5">
          <li><span class="font-bold text-indigo-800">Dosen Homebase</span> = otomatis tercentang dan tidak bisa diubah</li>
          <li><span class="font-bold text-purple-700">Dosen Lintas Prodi</span> = bisa dicentang untuk ditambahkan ke DTPS prodi ini</li>
          <li>Rasio akan otomatis terupdate saat checkbox berubah</li>
        </ul>
      </div>

      <div class="overflow-x-auto max-h-[600px] overflow-y-auto">
        <table class="w-full text-sm">
          <thead class="sticky top-0 bg-white z-10">
            <tr class="border-b border-slate-200 bg-slate-50">
              <th class="text-center py-3 px-2 font-bold text-slate-700 w-12">✓</th>
              <th class="text-left py-3 px-4 font-bold text-slate-700">Nama Dosen</th>
              <th class="text-center py-3 px-4 font-bold text-slate-700">Homebase</th>
              <th class="text-center py-3 px-2 font-bold text-slate-700 bg-blue-50">Penelitian</th>
              <th class="text-center py-3 px-2 font-bold text-slate-700 bg-emerald-50">Pengabdian</th>
              <th class="text-right py-3 px-4 font-bold text-slate-700 bg-amber-50">Total Dana</th>
              <th class="text-center py-3 px-4 font-bold text-slate-700">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="lecturer in allLecturersWithData" 
              :key="lecturer.name" 
              :class="[
                'border-b border-slate-100 hover:bg-slate-50 transition-colors',
                lecturer.isHomebase ? '' : 'bg-purple-50/30'
              ]"
            >
              <td class="py-3 px-2 text-center">
                <input 
                  type="checkbox" 
                  :checked="isSelected(lecturer)"
                  :disabled="lecturer.isHomebase"
                  @change="toggleLecturer(lecturer)"
                  :class="[
                    'w-5 h-5 rounded border-2 transition-all cursor-pointer',
                    lecturer.isHomebase 
                      ? 'text-indigo-600 border-indigo-300 cursor-not-allowed' 
                      : 'text-purple-600 border-purple-300 hover:border-purple-500'
                  ]"
                />
              </td>
              <td class="py-3 px-4">
                <div class="font-medium text-slate-800">{{ lecturer.name }}</div>
              </td>
              <td class="py-3 px-4 text-center">
                <span :class="[
                  'px-2 py-1 rounded-full text-xs font-bold',
                  lecturer.isHomebase 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'bg-purple-100 text-purple-700'
                ]">
                  {{ lecturer.homebase }}
                </span>
              </td>
              <td class="py-3 px-2 text-center bg-blue-50/20">
                <span v-if="lecturer.researchCount > 0" class="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">{{ lecturer.researchCount }}</span>
                <span v-else class="text-slate-300">-</span>
              </td>
              <td class="py-3 px-2 text-center bg-emerald-50/20">
                <span v-if="lecturer.serviceCount > 0" class="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">{{ lecturer.serviceCount }}</span>
                <span v-else class="text-slate-300">-</span>
              </td>
              <td class="py-3 px-4 text-right bg-amber-50/20">
                <span class="font-mono text-xs font-bold text-amber-700">{{ formatCurrencyShort(lecturer.totalFunding) }}</span>
              </td>
              <td class="py-3 px-4 text-center">
                <span :class="[
                  'px-2 py-1 rounded-lg text-xs font-bold',
                  lecturer.isHomebase 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : isSelected(lecturer) 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-slate-100 text-slate-500'
                ]">
                  {{ lecturer.isHomebase ? 'DTPS' : isSelected(lecturer) ? '+ Added' : 'Lintas Prodi' }}
                </span>
              </td>
            </tr>
          </tbody>
          <tfoot class="sticky bottom-0 bg-slate-100">
            <tr class="font-bold">
              <td class="py-3 px-2"></td>
              <td class="py-3 px-4 text-slate-800">TOTAL DTPS ({{ currentDtpsCount }} dosen)</td>
              <td class="py-3 px-4"></td>
              <td class="py-3 px-2 text-center bg-blue-100/50">
                <span class="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs">{{ filteredResearchCount }}</span>
              </td>
              <td class="py-3 px-2 text-center bg-emerald-100/50">
                <span class="px-2 py-1 bg-emerald-200 text-emerald-800 rounded-full text-xs">{{ filteredServiceCount }}</span>
              </td>
              <td class="py-3 px-4 text-right bg-amber-100/50">
                <span class="font-mono text-xs font-bold text-amber-800">{{ formatCurrencyShort(totalSelectedFunding) }}</span>
              </td>
              <td class="py-3 px-4"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>

    <!-- 4. RINGKASAN RASIO -->
    <div class="card bg-gradient-to-br from-slate-50 to-slate-100">
      <div class="mb-4">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 bg-purple-500 rounded-full"></span>
          <h3 class="text-lg font-bold text-slate-800">Ringkasan Rasio DTPS</h3>
        </div>
        <p class="text-xs text-slate-400 mt-1">Indikator akreditasi berdasarkan DTPS terpilih (periode {{ startYear }} - {{ endYear }})</p>
      </div>

      <!-- Penjelasan Formula Perhitungan -->
      <div class="mb-5 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div class="flex-1">
            <h4 class="font-bold text-slate-800 text-sm mb-2">Cara Perhitungan Indikator (Standar LKPS BAN-PT)</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div class="p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div class="font-bold text-blue-700 mb-1">📊 Rasio Penelitian</div>
                <div class="text-blue-600">
                  <span class="font-mono bg-blue-100 px-1 rounded">Jumlah Penelitian ÷ Jumlah DTPS</span>
                  <div class="mt-1 text-blue-500">Menghitung rata-rata jumlah judul penelitian per dosen DTPS dalam periode terpilih.</div>
                </div>
              </div>
              <div class="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                <div class="font-bold text-emerald-700 mb-1">🤝 Rasio Pengabdian</div>
                <div class="text-emerald-600">
                  <span class="font-mono bg-emerald-100 px-1 rounded">Jumlah Pengabdian ÷ Jumlah DTPS</span>
                  <div class="mt-1 text-emerald-500">Menghitung rata-rata jumlah kegiatan PkM per dosen DTPS dalam periode terpilih.</div>
                </div>
              </div>
              <div class="p-3 bg-amber-50 rounded-lg border border-amber-100">
                <div class="font-bold text-amber-700 mb-1">💰 Dana per DTPS</div>
                <div class="text-amber-600">
                  <span class="font-mono bg-amber-100 px-1 rounded">Total Dana ÷ Jumlah DTPS</span>
                  <div class="mt-1 text-amber-500">Rata-rata perolehan dana hibah (penelitian + pengabdian) per dosen DTPS.</div>
                </div>
              </div>
              <div class="p-3 bg-purple-50 rounded-lg border border-purple-100">
                <div class="font-bold text-purple-700 mb-1">📈 Total Aktivitas/DTPS</div>
                <div class="text-purple-600">
                  <span class="font-mono bg-purple-100 px-1 rounded">(Penelitian + Pengabdian) ÷ Jumlah DTPS</span>
                  <div class="mt-1 text-purple-500">Gabungan rasio penelitian dan pengabdian per dosen.</div>
                </div>
              </div>
            </div>
            <div class="mt-3 p-2 bg-slate-100 rounded-lg text-slate-600 text-[11px]">
              <strong>📌 Catatan:</strong> Data diambil dari SINTA. DTPS = dosen homebase prodi + dosen lintas prodi yang dicentang. Periode data sesuai filter tahun yang dipilih.
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Rasio Penelitian -->
        <div class="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <div>
              <div class="text-xs uppercase tracking-wider text-slate-500 font-bold">Rasio Penelitian</div>
              <div class="text-2xl font-black text-blue-600">{{ ratioResearchPerDtps }}</div>
            </div>
          </div>
          <div class="text-xs text-slate-500">{{ filteredResearchCount }} penelitian ÷ {{ currentDtpsCount }} DTPS</div>
        </div>

        <!-- Rasio Pengabdian -->
        <div class="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <div>
              <div class="text-xs uppercase tracking-wider text-slate-500 font-bold">Rasio Pengabdian</div>
              <div class="text-2xl font-black text-emerald-600">{{ ratioServicePerDtps }}</div>
            </div>
          </div>
          <div class="text-xs text-slate-500">{{ filteredServiceCount }} pengabdian ÷ {{ currentDtpsCount }} DTPS</div>
        </div>

        <!-- Dana per DTPS -->
        <div class="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <div class="text-xs uppercase tracking-wider text-slate-500 font-bold">Dana/DTPS</div>
              <div class="text-2xl font-black text-amber-600">{{ formatCurrencyShort(avgFundingPerDtps) }}</div>
            </div>
          </div>
          <div class="text-xs text-slate-500">{{ formatCurrency(totalSelectedFunding) }} ÷ {{ currentDtpsCount }} DTPS</div>
        </div>

        <!-- Total Aktivitas -->
        <div class="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <div>
              <div class="text-xs uppercase tracking-wider text-slate-500 font-bold">Total Aktivitas/DTPS</div>
              <div class="text-2xl font-black text-purple-600">{{ ratioTotalPerDtps }}</div>
            </div>
          </div>
          <div class="text-xs text-slate-500">{{ filteredResearchCount + filteredServiceCount }} aktivitas ÷ {{ currentDtpsCount }} DTPS</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sintaData from '../data/sinta_data.json'
import lecturersConfig from '../data/lecturers.json'

export default {
  name: 'DTPSAkreditasi',
  data() {
    return {
      selectedProdi: 'Sistem Informasi',
      startYear: '',
      endYear: '',
      additionalDtps: [] // nama dosen lintas prodi yang ditambahkan
    }
  },
  created() {
    // Set default 3 tahun terakhir
    const currentYear = new Date().getFullYear()
    this.endYear = String(currentYear)
    this.startYear = String(currentYear - 2)
  },
  computed: {
    lecturers() {
      return sintaData.lecturers || []
    },

    prodiList() {
      const programs = lecturersConfig.studyPrograms || {}
      return Object.keys(programs).sort()
    },

    availableYears() {
      const years = new Set()
      this.lecturers.forEach(lecturer => {
        if (lecturer.research) {
          lecturer.research.forEach(r => {
            if (r.year && r.year !== 'Unknown') years.add(r.year)
          })
        }
        if (lecturer.services) {
          lecturer.services.forEach(s => {
            if (s.year && s.year !== 'Unknown') years.add(s.year)
          })
        }
      })
      return Array.from(years).sort((a, b) => b.localeCompare(a))
    },

    // Daftar nama dosen per prodi dari lecturers.json
    lecturersByProdi() {
      const result = {}
      const programs = lecturersConfig.studyPrograms || {}
      for (const [prodiName, prodiData] of Object.entries(programs)) {
        result[prodiName] = prodiData.lecturers || []
      }
      return result
    },

    // Semua dosen dengan data penelitian/pengabdian
    allLecturersWithData() {
      const result = []
      const homebaseLecturers = this.lecturersByProdi[this.selectedProdi] || []
      const homebaseNames = new Set(homebaseLecturers.map(l => this.normalizeName(l.name)))

      // Ambil semua nama dosen dari semua prodi
      const allProdiLecturers = []
      for (const [prodiName, lecturers] of Object.entries(this.lecturersByProdi)) {
        lecturers.forEach(l => {
          allProdiLecturers.push({
            ...l,
            homebase: prodiName,
            isHomebase: prodiName === this.selectedProdi
          })
        })
      }

      // Hitung data penelitian dan pengabdian per dosen
      allProdiLecturers.forEach(lecturer => {
        const normalizedName = this.normalizeName(lecturer.name)
        const sintaLecturer = this.lecturers.find(l => 
          this.normalizeName(l.name) === normalizedName ||
          l.name.toLowerCase().includes(normalizedName.split(' ')[0]) ||
          normalizedName.includes(this.normalizeName(l.name).split(' ')[0])
        )

        let researchCount = 0
        let serviceCount = 0
        let totalFunding = 0

        if (sintaLecturer) {
          // Filter by year range
          if (sintaLecturer.research) {
            const filteredResearch = sintaLecturer.research.filter(r => 
              this.isInYearRange(r.year)
            )
            researchCount = filteredResearch.length
            totalFunding += filteredResearch.reduce((sum, r) => sum + (r.fundingAmount || 0), 0)
          }
          if (sintaLecturer.services) {
            const filteredServices = sintaLecturer.services.filter(s => 
              this.isInYearRange(s.year)
            )
            serviceCount = filteredServices.length
            totalFunding += filteredServices.reduce((sum, s) => sum + (s.fundingAmount || 0), 0)
          }
        }

        result.push({
          name: lecturer.name,
          homebase: lecturer.homebase,
          isHomebase: lecturer.isHomebase,
          researchCount,
          serviceCount,
          totalFunding
        })
      })

      // Sort: homebase first, then by name
      return result.sort((a, b) => {
        if (a.isHomebase !== b.isHomebase) return a.isHomebase ? -1 : 1
        return a.name.localeCompare(b.name)
      })
    },

    // Dosen yang terpilih sebagai DTPS (homebase + additional)
    selectedDtps() {
      return this.allLecturersWithData.filter(l => 
        l.isHomebase || this.additionalDtps.includes(l.name)
      )
    },

    currentDtpsCount() {
      return this.selectedDtps.length
    },

    filteredResearchCount() {
      return this.selectedDtps.reduce((sum, l) => sum + l.researchCount, 0)
    },

    filteredServiceCount() {
      return this.selectedDtps.reduce((sum, l) => sum + l.serviceCount, 0)
    },

    totalSelectedFunding() {
      return this.selectedDtps.reduce((sum, l) => sum + l.totalFunding, 0)
    },

    ratioResearchPerDtps() {
      if (this.currentDtpsCount === 0) return '0.00'
      return (this.filteredResearchCount / this.currentDtpsCount).toFixed(2)
    },

    ratioServicePerDtps() {
      if (this.currentDtpsCount === 0) return '0.00'
      return (this.filteredServiceCount / this.currentDtpsCount).toFixed(2)
    },

    ratioTotalPerDtps() {
      if (this.currentDtpsCount === 0) return '0.00'
      return ((this.filteredResearchCount + this.filteredServiceCount) / this.currentDtpsCount).toFixed(2)
    },

    avgFundingPerDtps() {
      if (this.currentDtpsCount === 0) return 0
      return this.totalSelectedFunding / this.currentDtpsCount
    }
  },
  methods: {
    normalizeName(name) {
      if (!name) return ''
      return name
        .toLowerCase()
        .replace(/,\s*(s\.kom|m\.kom|s\.t|m\.t|s\.si|m\.si|s\.e|m\.m|m\.acc|ak|mba|m\.sc|cpec|chcm|cdms|csca|ir\.|dr\.|prof\.|drs\.|drh\.)\.?/gi, '')
        .replace(/\s+/g, ' ')
        .trim()
    },

    isInYearRange(year) {
      if (!year || year === 'Unknown') return false
      const y = parseInt(year)
      const start = parseInt(this.startYear)
      const end = parseInt(this.endYear)
      return y >= start && y <= end
    },

    isSelected(lecturer) {
      return lecturer.isHomebase || this.additionalDtps.includes(lecturer.name)
    },

    toggleLecturer(lecturer) {
      if (lecturer.isHomebase) return // Can't toggle homebase

      const idx = this.additionalDtps.indexOf(lecturer.name)
      if (idx >= 0) {
        this.additionalDtps.splice(idx, 1)
      } else {
        this.additionalDtps.push(lecturer.name)
      }
    },

    formatCurrency(amount) {
      if (!amount) return 'Rp 0'
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount)
    },

    formatCurrencyShort(amount) {
      if (!amount) return 'Rp 0'
      if (amount >= 1000000000) {
        return `Rp ${(amount / 1000000000).toFixed(1)}M`
      } else if (amount >= 1000000) {
        return `Rp ${(amount / 1000000).toFixed(1)}jt`
      } else if (amount >= 1000) {
        return `Rp ${(amount / 1000).toFixed(0)}rb`
      }
      return this.formatCurrency(amount)
    }
  },
  watch: {
    selectedProdi() {
      // Reset additional DTPS when prodi changes
      this.additionalDtps = []
    }
  }
}
</script>
