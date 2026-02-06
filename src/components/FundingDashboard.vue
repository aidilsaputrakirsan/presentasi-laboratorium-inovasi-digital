<template>
  <div class="space-y-6">
    <!-- 1. HEADER + OVERVIEW -->
    <div class="card bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-slate-700">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-4">
          <div class="relative">
            <div class="w-14 h-14 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/30">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="absolute inset-0 rounded-2xl bg-amber-500/30 animate-ping"></div>
          </div>
          <div>
            <div class="flex items-center gap-3">
              <h1 class="text-2xl font-black text-white tracking-tight">Dana & Hibah</h1>
              <span class="px-2 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">Analytics</span>
            </div>
            <p class="text-sm text-slate-400 mt-0.5">Pendanaan Penelitian & Pengabdian | Data SINTA</p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div class="hidden md:flex flex-col items-end">
            <span class="text-xs uppercase tracking-wider text-slate-500 font-bold">Total Dana</span>
            <span class="text-sm font-semibold text-slate-300">{{ formatCurrency(totalFunding) }}</span>
          </div>
        </div>
      </div>

      <!-- Summary Stats Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center border border-blue-200 hover:shadow-md transition-all group">
          <div class="text-2xl font-black text-blue-600 group-hover:scale-110 transition-transform">{{ totalResearchCount }}</div>
          <div class="text-xs uppercase tracking-wider text-blue-700 mt-1 font-bold">Penelitian</div>
        </div>
        <div class="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 text-center border border-emerald-200 hover:shadow-md transition-all group">
          <div class="text-2xl font-black text-emerald-600 group-hover:scale-110 transition-transform">{{ totalServiceCount }}</div>
          <div class="text-xs uppercase tracking-wider text-emerald-700 mt-1 font-bold">Pengabdian</div>
        </div>
        <div class="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 text-center border border-amber-200 hover:shadow-md transition-all group">
          <div class="text-lg font-black text-amber-600 group-hover:scale-110 transition-transform">{{ formatCurrencyShort(totalResearchFunding) }}</div>
          <div class="text-xs uppercase tracking-wider text-amber-700 mt-1 font-bold">Dana Penelitian</div>
        </div>
        <div class="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 text-center border border-orange-200 hover:shadow-md transition-all group">
          <div class="text-lg font-black text-orange-600 group-hover:scale-110 transition-transform">{{ formatCurrencyShort(totalServiceFunding) }}</div>
          <div class="text-xs uppercase tracking-wider text-orange-700 mt-1 font-bold">Dana Pengabdian</div>
        </div>
        <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center border border-purple-200 hover:shadow-md transition-all group">
          <div class="text-2xl font-black text-purple-600 group-hover:scale-110 transition-transform">{{ lecturerCount }}</div>
          <div class="text-xs uppercase tracking-wider text-purple-700 mt-1 font-bold">Dosen</div>
        </div>
        <div class="bg-gradient-to-br from-rose-50 to-rose-100 rounded-xl p-4 text-center border border-rose-200 hover:shadow-md transition-all group">
          <div class="text-lg font-black text-rose-600 group-hover:scale-110 transition-transform">{{ formatCurrencyShort(avgFundingPerLecturer) }}</div>
          <div class="text-xs uppercase tracking-wider text-rose-700 mt-1 font-bold">Rata-rata/Dosen</div>
        </div>
      </div>

      <!-- Penjelasan Overview -->
      <div class="mt-4 p-3 bg-slate-800/50 rounded-lg text-xs text-slate-300 border border-slate-600">
        <div class="flex items-start gap-2">
          <svg class="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div>
            <strong class="text-amber-400">Tentang Data Ini:</strong>
            <span class="ml-1">Data diambil dari SINTA. Angka di atas menghitung <strong>judul unik</strong> yang tercatat di SINTA (tanpa duplikasi). Untuk melihat detail per dosen termasuk partisipasi sebagai anggota di proyek luar prodi, lihat tabel "Kinerja Dosen" di bawah.</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. FILTER PRODI -->
    <div class="card">
      <div class="flex items-center gap-3 mb-3">
        <span class="text-sm font-bold text-slate-700">Filter Program Studi:</span>
        <span class="text-xs text-slate-400">Pilih prodi untuk melihat data spesifik</span>
      </div>
      <div class="flex flex-wrap gap-2">
        <button
          @click="selectedProdi = 'all'"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-bold transition-all',
            selectedProdi === 'all'
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          ]"
        >
          Semua Prodi
        </button>
        <button
          v-for="prodi in prodiList"
          :key="prodi"
          @click="selectedProdi = prodi"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-bold transition-all',
            selectedProdi === prodi
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          ]"
        >
          {{ prodi }}
        </button>
      </div>
    </div>

    <!-- 3. RINGKASAN PER PRODI (dipindah ke atas) -->
    <div class="card hover:shadow-lg transition-shadow">
      <div class="mb-4">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 bg-purple-500 rounded-full"></span>
          <h3 class="text-lg font-bold text-slate-800">
            {{ selectedProdi === 'all' ? 'Ringkasan per Program Studi' : 'Ringkasan ' + selectedProdi }}
          </h3>
        </div>
        <p class="text-xs text-slate-400 mt-1">
          {{ selectedProdi === 'all' ? 'Perbandingan kinerja antar program studi' : 'Detail kinerja prodi terpilih' }}
        </p>
      </div>

      <!-- Penjelasan -->
      <div class="mb-4 p-3 bg-purple-50 rounded-lg text-xs text-purple-700 border border-purple-200">
        <strong>Cara Membaca:</strong>
        <ul class="mt-1 ml-4 list-disc space-y-0.5">
          <li><strong>Penelitian/Pengabdian</strong> = jumlah kegiatan yang tercatat di SINTA</li>
          <li><strong>Dana</strong> = total pendanaan yang diperoleh (dalam Rupiah)</li>
          <li><strong>Rata-rata/Dosen</strong> = total dana dibagi jumlah dosen (indikator produktivitas)</li>
        </ul>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-slate-200">
              <th class="text-left py-3 px-4 font-bold text-slate-700">{{ selectedProdi === 'all' ? 'Prodi' : 'Indikator' }}</th>
              <th class="text-center py-3 px-4 font-bold text-slate-700">{{ selectedProdi === 'all' ? 'Dosen' : '' }}</th>
              <th class="text-center py-3 px-4 font-bold text-slate-700">Penelitian</th>
              <th class="text-center py-3 px-4 font-bold text-slate-700">Pengabdian</th>
              <th class="text-right py-3 px-4 font-bold text-slate-700">Dana Penelitian</th>
              <th class="text-right py-3 px-4 font-bold text-slate-700">Dana Pengabdian</th>
              <th class="text-right py-3 px-4 font-bold text-slate-700">Total Dana</th>
              <th class="text-right py-3 px-4 font-bold text-slate-700">Rata-rata/Dosen</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="selectedProdi === 'all'">
              <tr v-for="summary in prodiSummaryList" :key="summary.prodi" class="border-b border-slate-100 hover:bg-slate-50">
                <td class="py-3 px-4 font-medium text-slate-800">{{ summary.prodi }}</td>
                <td class="py-3 px-4 text-center">{{ summary.lecturerCount }}</td>
                <td class="py-3 px-4 text-center">
                  <span class="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">{{ summary.totalResearchCount }}</span>
                </td>
                <td class="py-3 px-4 text-center">
                  <span class="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">{{ summary.totalServiceCount }}</span>
                </td>
                <td class="py-3 px-4 text-right font-mono text-amber-600">{{ formatCurrency(summary.totalResearchFunding) }}</td>
                <td class="py-3 px-4 text-right font-mono text-orange-600">{{ formatCurrency(summary.totalServiceFunding) }}</td>
                <td class="py-3 px-4 text-right font-mono font-bold text-slate-800">{{ formatCurrency(summary.totalResearchFunding + summary.totalServiceFunding) }}</td>
                <td class="py-3 px-4 text-right font-mono text-purple-600">{{ formatCurrency((summary.totalResearchFunding + summary.totalServiceFunding) / summary.lecturerCount) }}</td>
              </tr>
            </template>
            <template v-else>
              <tr class="border-b border-slate-100">
                <td class="py-3 px-4 font-medium text-slate-800">Jumlah Total</td>
                <td class="py-3 px-4 text-center font-bold">{{ lecturerCount }} dosen</td>
                <td class="py-3 px-4 text-center">
                  <span class="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">{{ totalResearchCount }}</span>
                </td>
                <td class="py-3 px-4 text-center">
                  <span class="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">{{ totalServiceCount }}</span>
                </td>
                <td class="py-3 px-4 text-right font-mono text-amber-600 font-bold">{{ formatCurrency(totalResearchFunding) }}</td>
                <td class="py-3 px-4 text-right font-mono text-orange-600 font-bold">{{ formatCurrency(totalServiceFunding) }}</td>
                <td class="py-3 px-4 text-right font-mono font-bold text-slate-800">{{ formatCurrency(totalFunding) }}</td>
                <td class="py-3 px-4 text-right font-mono text-purple-600">-</td>
              </tr>
              <tr class="border-b border-slate-100 bg-purple-50">
                <td class="py-3 px-4 font-medium text-purple-800">Rata-rata per Dosen</td>
                <td class="py-3 px-4 text-center">-</td>
                <td class="py-3 px-4 text-center">
                  <span class="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">{{ (totalResearchCount / lecturerCount).toFixed(1) }}</span>
                </td>
                <td class="py-3 px-4 text-center">
                  <span class="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">{{ (totalServiceCount / lecturerCount).toFixed(1) }}</span>
                </td>
                <td class="py-3 px-4 text-right font-mono text-amber-600">{{ formatCurrency(totalResearchFunding / lecturerCount) }}</td>
                <td class="py-3 px-4 text-right font-mono text-orange-600">{{ formatCurrency(totalServiceFunding / lecturerCount) }}</td>
                <td class="py-3 px-4 text-right font-mono text-purple-700 font-bold">{{ formatCurrency(avgFundingPerLecturer) }}</td>
                <td class="py-3 px-4 text-right font-mono text-purple-600">-</td>
              </tr>
            </template>
          </tbody>
          <tfoot v-if="selectedProdi === 'all'">
            <tr class="bg-slate-100 font-bold">
              <td class="py-3 px-4 text-slate-800">TOTAL SEMUA PRODI</td>
              <td class="py-3 px-4 text-center">{{ lecturerCount }}</td>
              <td class="py-3 px-4 text-center">
                <span class="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs">{{ totalResearchCount }}</span>
              </td>
              <td class="py-3 px-4 text-center">
                <span class="px-2 py-1 bg-emerald-200 text-emerald-800 rounded-full text-xs">{{ totalServiceCount }}</span>
              </td>
              <td class="py-3 px-4 text-right font-mono text-amber-700">{{ formatCurrency(totalResearchFunding) }}</td>
              <td class="py-3 px-4 text-right font-mono text-orange-700">{{ formatCurrency(totalServiceFunding) }}</td>
              <td class="py-3 px-4 text-right font-mono text-slate-900">{{ formatCurrency(totalFunding) }}</td>
              <td class="py-3 px-4 text-right font-mono text-purple-700">{{ formatCurrency(avgFundingPerLecturer) }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>

    <!-- 4. KINERJA DOSEN -->
    <div class="card hover:shadow-lg transition-shadow">
      <div class="mb-4">
        <div class="flex items-center justify-between">
          <div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 bg-cyan-500 rounded-full"></span>
              <h3 class="text-lg font-bold text-slate-800">Kinerja Dosen</h3>
            </div>
            <p class="text-xs text-slate-400 mt-1">Detail hibah per dosen di prodi terpilih</p>
          </div>
          <!-- Filter Tahun -->
          <div class="flex items-center gap-2">
            <span class="text-xs text-slate-500">Tahun:</span>
            <select v-model="selectedYear" class="px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500">
              <option value="all">Semua Tahun</option>
              <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Penjelasan Tabel -->
      <div class="mb-4 p-3 bg-cyan-50 rounded-lg text-xs text-cyan-700 border border-cyan-200">
        <strong>Cara Membaca Tabel:</strong>
        <ul class="mt-1 ml-4 list-disc space-y-0.5">
          <li><strong>Sebagai Ketua</strong> = judul dimana dosen menjadi pemimpin (leader)</li>
          <li><strong>Sebagai Anggota</strong> = judul dimana dosen menjadi anggota, <em>hanya dihitung jika ketuanya dari luar prodi</em></li>
          <li><strong>Total Judul</strong> = Ketua + Anggota (judul yang bisa diklaim prodi)</li>
          <li><strong>Total Dana</strong> = akumulasi pendanaan dari semua judul (sebagai ketua)</li>
        </ul>
        <div class="mt-2 pt-2 border-t border-cyan-200 text-cyan-600">
          <em>Catatan: Total di tabel ini mungkin lebih besar dari Overview/Rincian Hibah karena menghitung tambahan partisipasi sebagai anggota di proyek dengan ketua dari luar prodi.</em>
        </div>
      </div>

      <div class="overflow-x-auto max-h-[500px] overflow-y-auto">
        <table class="w-full text-sm">
          <thead class="sticky top-0 bg-white z-10">
            <tr class="border-b border-slate-200 bg-slate-50">
              <th class="text-left py-3 px-4 font-bold text-slate-700">Nama Dosen</th>
              <th class="text-center py-3 px-2 font-bold text-slate-700 bg-blue-50" colspan="2">
                <div>Penelitian</div>
              </th>
              <th class="text-center py-3 px-2 font-bold text-slate-700 bg-emerald-50" colspan="2">
                <div>Pengabdian</div>
              </th>
              <th class="text-center py-3 px-2 font-bold text-slate-700">Total Judul</th>
              <th class="text-right py-3 px-4 font-bold text-slate-700 bg-amber-50">Total Dana</th>
            </tr>
            <tr class="border-b border-slate-200 bg-slate-50 text-[10px]">
              <th></th>
              <th class="text-center py-2 px-1 bg-blue-50 text-blue-600">Ketua</th>
              <th class="text-center py-2 px-1 bg-blue-50/50 text-blue-500">Anggota*</th>
              <th class="text-center py-2 px-1 bg-emerald-50 text-emerald-600">Ketua</th>
              <th class="text-center py-2 px-1 bg-emerald-50/50 text-emerald-500">Anggota*</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="lecturer in lecturerPerformance" :key="lecturer.name" class="border-b border-slate-100 hover:bg-slate-50">
              <td class="py-3 px-4">
                <div class="font-medium text-slate-800">{{ lecturer.name }}</div>
              </td>
              <td class="py-3 px-2 text-center bg-blue-50/20">
                <span v-if="lecturer.researchAsLeader > 0" class="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">{{ lecturer.researchAsLeader }}</span>
                <span v-else class="text-slate-300">-</span>
              </td>
              <td class="py-3 px-2 text-center bg-blue-50/10">
                <span v-if="lecturer.researchAsMember > 0" class="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold">{{ lecturer.researchAsMember }}</span>
                <span v-else class="text-slate-300">-</span>
              </td>
              <td class="py-3 px-2 text-center bg-emerald-50/20">
                <span v-if="lecturer.serviceAsLeader > 0" class="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">{{ lecturer.serviceAsLeader }}</span>
                <span v-else class="text-slate-300">-</span>
              </td>
              <td class="py-3 px-2 text-center bg-emerald-50/10">
                <span v-if="lecturer.serviceAsMember > 0" class="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold">{{ lecturer.serviceAsMember }}</span>
                <span v-else class="text-slate-300">-</span>
              </td>
              <td class="py-3 px-2 text-center">
                <span class="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold">{{ lecturer.totalTitles }}</span>
              </td>
              <td class="py-3 px-4 text-right">
                <span class="font-mono text-xs font-bold text-amber-700">{{ formatCurrencyShort(lecturer.totalFunding) }}</span>
              </td>
            </tr>
          </tbody>
          <tfoot class="sticky bottom-0 bg-slate-100">
            <tr class="font-bold">
              <td class="py-3 px-4 text-slate-800">TOTAL ({{ lecturerPerformance.length }} dosen)</td>
              <td class="py-3 px-2 text-center bg-blue-100/50">
                <span class="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs">{{ lecturerPerformanceTotal.researchAsLeader }}</span>
              </td>
              <td class="py-3 px-2 text-center bg-blue-50/50">
                <span class="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">{{ lecturerPerformanceTotal.researchAsMember }}</span>
              </td>
              <td class="py-3 px-2 text-center bg-emerald-100/50">
                <span class="px-2 py-1 bg-emerald-200 text-emerald-800 rounded-full text-xs">{{ lecturerPerformanceTotal.serviceAsLeader }}</span>
              </td>
              <td class="py-3 px-2 text-center bg-emerald-50/50">
                <span class="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">{{ lecturerPerformanceTotal.serviceAsMember }}</span>
              </td>
              <td class="py-3 px-2 text-center">
                <span class="px-2 py-1 bg-slate-200 text-slate-800 rounded-full text-xs">{{ lecturerPerformanceTotal.totalTitles }}</span>
              </td>
              <td class="py-3 px-4 text-right">
                <span class="font-mono text-xs font-bold text-amber-800">{{ formatCurrencyShort(lecturerPerformanceTotal.totalFunding) }}</span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <!-- Catatan -->
      <div class="mt-3 p-3 bg-amber-50 rounded-lg text-xs text-amber-700 border border-amber-200">
        <div class="flex items-start gap-2">
          <svg class="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div>
            <strong>Catatan:</strong>
            <ul class="mt-1 ml-4 list-disc space-y-0.5">
              <li><strong>*Anggota</strong> = hanya dihitung jika ketua penelitian/pengabdian dari <em>luar prodi</em> (kolaborasi eksternal)</li>
              <li>Jika ketua dan anggota dari prodi sama, judul hanya dihitung sekali di kolom "Ketua"</li>
              <li><strong>Total Dana</strong> = dana dari judul dimana dosen menjadi ketua</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 5. VISUALISASI GRAFIK -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Funding by Year Chart -->
      <div class="card hover:shadow-lg transition-shadow">
        <div class="mb-4">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 bg-amber-500 rounded-full"></span>
            <h3 class="text-lg font-bold text-slate-800">Tren Pendanaan per Tahun</h3>
          </div>
          <p class="text-xs text-slate-400 mt-1">Perbandingan dana penelitian vs pengabdian setiap tahun</p>
        </div>
        <div class="h-64">
          <Bar :data="fundingByYearData" :options="barChartOptions" />
        </div>
        <div class="mt-3 p-2 bg-slate-50 rounded text-xs text-slate-500">
          <strong>Insight:</strong> Grafik menunjukkan tren pendanaan dari tahun ke tahun. Batang biru = penelitian, hijau = pengabdian.
        </div>
      </div>

      <!-- Funding by Source Chart -->
      <div class="card hover:shadow-lg transition-shadow">
        <div class="mb-4">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 bg-blue-500 rounded-full"></span>
            <h3 class="text-lg font-bold text-slate-800">Distribusi Sumber Pendanaan</h3>
          </div>
          <p class="text-xs text-slate-400 mt-1">Proporsi dana dari berbagai sumber</p>
        </div>
        <div class="h-64 flex items-center justify-center">
          <Doughnut :data="fundingBySourceData" :options="doughnutOptions" />
        </div>
        <div class="mt-3 p-2 bg-slate-50 rounded text-xs text-slate-500">
          <strong>Insight:</strong> Internal = dana dari institusi. Eksternal (BIMA) = dana dari Kemdiktisaintek. Lainnya = sumber lain.
        </div>
      </div>
    </div>

    <!-- 6. RINCIAN JENIS HIBAH -->
    <div class="card hover:shadow-lg transition-shadow">
      <div class="mb-4">
        <div class="flex items-center justify-between">
          <div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 bg-emerald-500 rounded-full"></span>
              <h3 class="text-lg font-bold text-slate-800">Rincian per Jenis Hibah</h3>
            </div>
            <p class="text-xs text-slate-400 mt-1">{{ grantTypeDetails.length }} kategori hibah ditemukan</p>
          </div>
        </div>
      </div>

      <!-- Penjelasan -->
      <div class="mb-4 p-3 bg-emerald-50 rounded-lg text-xs text-emerald-700 border border-emerald-200">
        <strong>Cara Membaca:</strong> Tabel ini mengelompokkan kegiatan berdasarkan jenis skema hibah. Menghitung <strong>judul unik</strong> yang tercatat di SINTA (sama dengan Overview). <em>Catatan: Total mungkin berbeda dengan "Kinerja Dosen" karena tabel tersebut juga menghitung partisipasi sebagai anggota di proyek luar prodi.</em>
      </div>

      <div class="overflow-x-auto max-h-[400px] overflow-y-auto">
        <table class="w-full text-sm">
          <thead class="sticky top-0 bg-white">
            <tr class="border-b border-slate-200">
              <th class="text-left py-3 px-4 font-bold text-slate-700">Jenis Hibah</th>
              <th class="text-center py-3 px-4 font-bold text-slate-700">Jumlah</th>
              <th class="text-center py-3 px-4 font-bold text-slate-700">Penelitian</th>
              <th class="text-center py-3 px-4 font-bold text-slate-700">Pengabdian</th>
              <th class="text-right py-3 px-4 font-bold text-slate-700">Total Dana</th>
              <th class="text-right py-3 px-4 font-bold text-slate-700">Rata-rata/Kegiatan</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(grant, idx) in grantTypeDetails" :key="idx" class="border-b border-slate-100 hover:bg-slate-50">
              <td class="py-3 px-4">
                <div class="font-medium text-slate-800">{{ grant.name }}</div>
                <div class="text-xs text-slate-400">{{ grant.source }}</div>
              </td>
              <td class="py-3 px-4 text-center">
                <span class="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold">{{ grant.count }}</span>
              </td>
              <td class="py-3 px-4 text-center">
                <span v-if="grant.researchCount > 0" class="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">{{ grant.researchCount }}</span>
                <span v-else class="text-slate-300">-</span>
              </td>
              <td class="py-3 px-4 text-center">
                <span v-if="grant.serviceCount > 0" class="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">{{ grant.serviceCount }}</span>
                <span v-else class="text-slate-300">-</span>
              </td>
              <td class="py-3 px-4 text-right font-mono text-amber-600 font-bold">{{ formatCurrency(grant.totalFunding) }}</td>
              <td class="py-3 px-4 text-right font-mono text-slate-500">{{ formatCurrency(grant.avgFunding) }}</td>
            </tr>
          </tbody>
          <tfoot class="sticky bottom-0 bg-slate-100">
            <tr class="font-bold">
              <td class="py-3 px-4 text-slate-800">TOTAL</td>
              <td class="py-3 px-4 text-center">
                <span class="px-2 py-1 bg-slate-200 text-slate-800 rounded-full text-xs">{{ totalResearchCount + totalServiceCount }}</span>
              </td>
              <td class="py-3 px-4 text-center">
                <span class="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs">{{ totalResearchCount }}</span>
              </td>
              <td class="py-3 px-4 text-center">
                <span class="px-2 py-1 bg-emerald-200 text-emerald-800 rounded-full text-xs">{{ totalServiceCount }}</span>
              </td>
              <td class="py-3 px-4 text-right font-mono text-amber-700">{{ formatCurrency(totalFunding) }}</td>
              <td class="py-3 px-4 text-right font-mono text-slate-600">{{ formatCurrency(totalFunding / (totalResearchCount + totalServiceCount || 1)) }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>

    <!-- 7. DAFTAR DETAIL HIBAH -->
    <div class="card hover:shadow-lg transition-shadow">
      <div class="mb-4">
        <div class="flex items-center justify-between">
          <div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 bg-rose-500 rounded-full"></span>
              <h3 class="text-lg font-bold text-slate-800">Daftar Detail Kegiatan</h3>
            </div>
            <p class="text-xs text-slate-400 mt-1">{{ filteredItems.length }} kegiatan ditemukan - klik filter untuk menyaring</p>
          </div>
          <div class="flex gap-2">
            <button
              @click="itemType = 'all'"
              :class="[
                'px-3 py-1.5 rounded-lg text-xs font-bold transition-all',
                itemType === 'all' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              ]"
            >
              Semua
            </button>
            <button
              @click="itemType = 'research'"
              :class="[
                'px-3 py-1.5 rounded-lg text-xs font-bold transition-all',
                itemType === 'research' ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              ]"
            >
              Penelitian
            </button>
            <button
              @click="itemType = 'service'"
              :class="[
                'px-3 py-1.5 rounded-lg text-xs font-bold transition-all',
                itemType === 'service' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              ]"
            >
              Pengabdian
            </button>
          </div>
        </div>
      </div>

      <!-- Penjelasan -->
      <div class="mb-4 p-3 bg-rose-50 rounded-lg text-xs text-rose-700 border border-rose-200">
        <strong>Tentang Data Detail:</strong> Setiap item menampilkan judul kegiatan, ketua pelaksana, anggota tim, jenis hibah, dan jumlah dana. Data diurutkan dari tahun terbaru dan dana terbesar.
      </div>

      <div class="space-y-3 max-h-[600px] overflow-y-auto">
        <div
          v-for="(item, idx) in paginatedItems"
          :key="idx"
          class="p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all"
        >
          <div class="flex items-start justify-between gap-4">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <span :class="[
                  'px-2 py-0.5 rounded text-[10px] font-bold uppercase',
                  item.type === 'research' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                ]">
                  {{ item.type === 'research' ? 'Penelitian' : 'Pengabdian' }}
                </span>
                <span class="px-2 py-0.5 bg-slate-200 text-slate-600 rounded text-[10px] font-bold">{{ item.year }}</span>
                <span v-if="item.status" :class="[
                  'px-2 py-0.5 rounded text-[10px] font-bold',
                  item.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                ]">
                  {{ item.status }}
                </span>
              </div>
              <h4 class="font-semibold text-slate-800 text-sm leading-tight">{{ item.title }}</h4>
              <div class="mt-2 text-xs text-slate-500 space-y-1">
                <div v-if="item.leader"><span class="font-medium">Ketua:</span> {{ item.leader }}</div>
                <div v-if="item.members && item.members.length"><span class="font-medium">Anggota:</span> {{ item.members.join(', ') }}</div>
                <div v-if="item.grantType"><span class="font-medium">Jenis:</span> {{ item.grantType }}</div>
                <div v-if="item.source"><span class="font-medium">Sumber:</span> {{ item.source }}</div>
              </div>
            </div>
            <div class="text-right">
              <div class="text-lg font-black text-amber-600">{{ item.fundingFormatted || formatCurrency(item.fundingAmount) }}</div>
              <div class="text-xs text-slate-400">{{ item.prodi }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-slate-200">
        <button
          @click="currentPage = Math.max(1, currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-50"
        >
          Prev
        </button>
        <span class="text-sm text-slate-600">{{ currentPage }} / {{ totalPages }}</span>
        <button
          @click="currentPage = Math.min(totalPages, currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Bar, Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { prodiRegistry, prodiList as prodiListData } from '../data/prodi/index.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)

export default {
  name: 'FundingDashboard',
  components: { Bar, Doughnut },
  data() {
    return {
      selectedProdi: 'all',
      selectedYear: 'all',
      itemType: 'all',
      currentPage: 1,
      itemsPerPage: 20
    }
  },
  computed: {
    lecturers() {
      const allLecturers = []
      prodiListData.filter(p => p.hasData).forEach(p => {
        const data = prodiRegistry[p.slug]
        if (data?.sintaData?.lecturers) allLecturers.push(...data.sintaData.lecturers)
      })
      return allLecturers
    },

    prodiList() {
      return prodiListData.filter(p => p.hasData).map(p => p.name).sort()
    },

    // Daftar nama DTPS per prodi (dari lecturers per prodi sebagai master data)
    dtpsNamesByProdi() {
      const result = {}
      prodiListData.filter(p => p.hasData).forEach(p => {
        const data = prodiRegistry[p.slug]
        if (data?.config?.lecturers) {
          result[p.name] = new Set()
          data.config.lecturers.forEach(l => {
            const normalizedName = this.normalizeName(l.name)
            result[p.name].add(normalizedName)
          })
        }
      })
      return result
    },

    // Semua nama DTPS (gabungan semua prodi)
    allDtpsNames() {
      const allNames = new Set()
      for (const names of Object.values(this.dtpsNamesByProdi)) {
        names.forEach(n => allNames.add(n))
      }
      return allNames
    },

    // Nama DTPS sesuai filter prodi yang dipilih
    currentDtpsNames() {
      if (this.selectedProdi === 'all') {
        return this.allDtpsNames
      }
      return this.dtpsNamesByProdi[this.selectedProdi] || new Set()
    },

    filteredLecturers() {
      if (this.selectedProdi === 'all') return this.lecturers
      return this.lecturers.filter(l => l.prodi === this.selectedProdi)
    },

    // Collect all research and service items with prodi info (DEDUPLICATED by title+year+type)
    allItems() {
      const itemsMap = new Map() // Use Map to deduplicate by unique key

      this.filteredLecturers.forEach(lecturer => {
        if (lecturer.research && Array.isArray(lecturer.research)) {
          lecturer.research.forEach(r => {
            if (r.title) {
              // Create unique key: title + year + type
              const key = `research|${r.title}|${r.year || ''}`
              if (!itemsMap.has(key)) {
                itemsMap.set(key, {
                  ...r,
                  type: 'research',
                  prodi: lecturer.prodi,
                  lecturerName: lecturer.name
                })
              }
            }
          })
        }
        if (lecturer.services && Array.isArray(lecturer.services)) {
          lecturer.services.forEach(s => {
            if (s.title) {
              // Create unique key: title + year + type
              const key = `service|${s.title}|${s.year || ''}`
              if (!itemsMap.has(key)) {
                itemsMap.set(key, {
                  ...s,
                  type: 'service',
                  prodi: lecturer.prodi,
                  lecturerName: lecturer.name
                })
              }
            }
          })
        }
      })

      // Convert Map to array and sort
      return Array.from(itemsMap.values()).sort((a, b) => {
        if (b.year !== a.year) return (b.year || '0').localeCompare(a.year || '0')
        return (b.fundingAmount || 0) - (a.fundingAmount || 0)
      })
    },

    filteredItems() {
      if (this.itemType === 'all') return this.allItems
      return this.allItems.filter(i => i.type === this.itemType)
    },

    totalPages() {
      return Math.ceil(this.filteredItems.length / this.itemsPerPage)
    },

    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      return this.filteredItems.slice(start, start + this.itemsPerPage)
    },

    lecturerCount() {
      return this.filteredLecturers.length
    },

    totalResearchCount() {
      return this.allItems.filter(i => i.type === 'research').length
    },

    totalServiceCount() {
      return this.allItems.filter(i => i.type === 'service').length
    },

    totalResearchFunding() {
      return this.allItems
        .filter(i => i.type === 'research')
        .reduce((sum, i) => sum + (i.fundingAmount || 0), 0)
    },

    totalServiceFunding() {
      return this.allItems
        .filter(i => i.type === 'service')
        .reduce((sum, i) => sum + (i.fundingAmount || 0), 0)
    },

    totalFunding() {
      return this.totalResearchFunding + this.totalServiceFunding
    },

    avgFundingPerLecturer() {
      if (this.lecturerCount === 0) return 0
      return this.totalFunding / this.lecturerCount
    },

    // Daftar tahun yang tersedia
    availableYears() {
      const years = new Set()
      this.allItems.forEach(item => {
        if (item.year && item.year !== 'Unknown') {
          years.add(item.year)
        }
      })
      return Array.from(years).sort((a, b) => b.localeCompare(a))
    },

    // Kinerja per Dosen
    lecturerPerformance() {
      const lecturerMap = {}
      const dtpsNames = this.currentDtpsNames

      // Filter items by selected year
      const items = this.selectedYear === 'all'
        ? this.allItems
        : this.allItems.filter(i => i.year === this.selectedYear)

      // Initialize all lecturers from current prodi
      this.filteredLecturers.forEach(lecturer => {
        const normalizedName = this.normalizeName(lecturer.name)
        lecturerMap[normalizedName] = {
          name: lecturer.name,
          normalizedName,
          researchAsLeader: 0,
          researchAsMember: 0,
          serviceAsLeader: 0,
          serviceAsMember: 0,
          totalFunding: 0
        }
      })

      // Process each item
      items.forEach(item => {
        const leaderNormalized = this.normalizeName(item.leader)
        const leaderIsDTPS = this.isDTPS(leaderNormalized, dtpsNames)
        const fundingAmount = item.fundingAmount || 0

        // Count as leader if lecturer is the leader
        if (leaderIsDTPS) {
          // Find the lecturer entry
          for (const key of Object.keys(lecturerMap)) {
            if (this.isDTPS(leaderNormalized, new Set([key]))) {
              if (item.type === 'research') {
                lecturerMap[key].researchAsLeader++
              } else {
                lecturerMap[key].serviceAsLeader++
              }
              lecturerMap[key].totalFunding += fundingAmount
              break
            }
          }
        }

        // Count members only if leader is from OUTSIDE prodi
        if (!leaderIsDTPS && item.members && item.members.length) {
          item.members.forEach(member => {
            const memberNormalized = this.normalizeName(member)
            // Check if member is DTPS
            for (const key of Object.keys(lecturerMap)) {
              if (this.isDTPS(memberNormalized, new Set([key]))) {
                if (item.type === 'research') {
                  lecturerMap[key].researchAsMember++
                } else {
                  lecturerMap[key].serviceAsMember++
                }
                break
              }
            }
          })
        }
      })

      // Convert to array and calculate totals
      return Object.values(lecturerMap)
        .map(l => ({
          ...l,
          totalTitles: l.researchAsLeader + l.researchAsMember + l.serviceAsLeader + l.serviceAsMember
        }))
        .filter(l => l.totalTitles > 0 || this.selectedYear === 'all')
        .sort((a, b) => b.totalFunding - a.totalFunding || b.totalTitles - a.totalTitles)
    },

    // Total for lecturerPerformance
    lecturerPerformanceTotal() {
      return this.lecturerPerformance.reduce((acc, l) => ({
        researchAsLeader: acc.researchAsLeader + l.researchAsLeader,
        researchAsMember: acc.researchAsMember + l.researchAsMember,
        serviceAsLeader: acc.serviceAsLeader + l.serviceAsLeader,
        serviceAsMember: acc.serviceAsMember + l.serviceAsMember,
        totalTitles: acc.totalTitles + l.totalTitles,
        totalFunding: acc.totalFunding + l.totalFunding
      }), {
        researchAsLeader: 0,
        researchAsMember: 0,
        serviceAsLeader: 0,
        serviceAsMember: 0,
        totalTitles: 0,
        totalFunding: 0
      })
    },

    // Yearly Performance (kept for charts)
    yearlyPerformance() {
      const yearMap = {}
      const dtpsNames = this.currentDtpsNames

      this.allItems.forEach(item => {
        const year = item.year || 'Unknown'
        if (year === 'Unknown') return

        if (!yearMap[year]) {
          yearMap[year] = {
            year,
            researchCount: 0,
            serviceCount: 0,
            totalFunding: 0,
            researchFunding: 0,
            serviceFunding: 0,
            leaders: new Set(),
            leadersDTPS: new Set(),
            leadersExternal: new Set(),
            activeLecturers: new Set(),
            activeDTPS: new Set(),
            activeExternal: new Set()
          }
        }

        const fundingAmount = item.fundingAmount || 0
        if (item.type === 'research') {
          yearMap[year].researchCount++
          yearMap[year].researchFunding += fundingAmount
        } else {
          yearMap[year].serviceCount++
          yearMap[year].serviceFunding += fundingAmount
        }
        yearMap[year].totalFunding += fundingAmount

        if (item.leader) {
          const normalizedLeader = this.normalizeName(item.leader)
          yearMap[year].leaders.add(item.leader)
          yearMap[year].activeLecturers.add(item.leader)

          if (this.isDTPS(normalizedLeader, dtpsNames)) {
            yearMap[year].leadersDTPS.add(item.leader)
            yearMap[year].activeDTPS.add(item.leader)
          } else {
            yearMap[year].leadersExternal.add(item.leader)
            yearMap[year].activeExternal.add(item.leader)
          }
        }

        if (item.members && item.members.length) {
          item.members.forEach(m => {
            const normalizedMember = this.normalizeName(m)
            yearMap[year].activeLecturers.add(m)

            if (this.isDTPS(normalizedMember, dtpsNames)) {
              yearMap[year].activeDTPS.add(m)
            } else {
              yearMap[year].activeExternal.add(m)
            }
          })
        }

        if (item.lecturerName) {
          yearMap[year].activeLecturers.add(item.lecturerName)
          const normalizedName = this.normalizeName(item.lecturerName)
          if (this.isDTPS(normalizedName, dtpsNames)) {
            yearMap[year].activeDTPS.add(item.lecturerName)
          } else {
            yearMap[year].activeExternal.add(item.lecturerName)
          }
        }
      })

      return Object.values(yearMap)
        .map(y => {
          const leaderCount = y.leaders.size || 1
          const leaderDTPSCount = y.leadersDTPS.size
          const leaderExternalCount = y.leadersExternal.size
          const activeLecturers = y.activeLecturers.size || 1
          const activeDTPSCount = y.activeDTPS.size
          const activeExternalCount = y.activeExternal.size
          const totalActivities = y.researchCount + y.serviceCount
          const ratioByDTPS = leaderDTPSCount > 0 ? totalActivities / leaderDTPSCount : 0

          return {
            year: y.year,
            researchCount: y.researchCount,
            serviceCount: y.serviceCount,
            totalFunding: y.totalFunding,
            researchFunding: y.researchFunding,
            serviceFunding: y.serviceFunding,
            leaderCount,
            leaderDTPSCount,
            leaderExternalCount,
            activeLecturers,
            activeDTPSCount,
            activeExternalCount
          }
        })
        .sort((a, b) => b.year.localeCompare(a.year))
    },

    // Rata-rata 3 tahun terakhir
    avg3Year() {
      const recent3 = this.yearlyPerformance.slice(0, 3)

      if (recent3.length === 0) {
        return {
          avgLeaders: 0,
          avgLeadersDTPS: 0,
          avgLeadersExternal: 0,
          avgActiveLecturers: 0,
          avgActiveDTPS: 0,
          avgActiveExternal: 0,
          avgResearch: 0,
          avgService: 0,
          avgFunding: 0,
          avgResearchFunding: 0,
          avgServiceFunding: 0
        }
      }

      const sum = recent3.reduce((acc, y) => ({
        leaders: acc.leaders + y.leaderCount,
        leadersDTPS: acc.leadersDTPS + y.leaderDTPSCount,
        leadersExternal: acc.leadersExternal + y.leaderExternalCount,
        activeLecturers: acc.activeLecturers + y.activeLecturers,
        activeDTPS: acc.activeDTPS + y.activeDTPSCount,
        activeExternal: acc.activeExternal + y.activeExternalCount,
        research: acc.research + y.researchCount,
        service: acc.service + y.serviceCount,
        funding: acc.funding + y.totalFunding,
        researchFunding: acc.researchFunding + y.researchFunding,
        serviceFunding: acc.serviceFunding + y.serviceFunding
      }), {
        leaders: 0, leadersDTPS: 0, leadersExternal: 0,
        activeLecturers: 0, activeDTPS: 0, activeExternal: 0,
        research: 0, service: 0, funding: 0,
        researchFunding: 0, serviceFunding: 0
      })

      const count = recent3.length

      return {
        avgLeaders: sum.leaders / count,
        avgLeadersDTPS: sum.leadersDTPS / count,
        avgLeadersExternal: sum.leadersExternal / count,
        avgActiveLecturers: sum.activeLecturers / count,
        avgActiveDTPS: sum.activeDTPS / count,
        avgActiveExternal: sum.activeExternal / count,
        avgResearch: sum.research / count,
        avgService: sum.service / count,
        avgFunding: sum.funding / count,
        avgResearchFunding: sum.researchFunding / count,
        avgServiceFunding: sum.serviceFunding / count
      }
    },

    // Per prodi summary
    prodiSummaryList() {
      const summaryMap = {}

      this.lecturers.forEach(lecturer => {
        const prodi = lecturer.prodi
        if (!summaryMap[prodi]) {
          summaryMap[prodi] = {
            prodi,
            lecturerCount: 0,
            totalResearchCount: 0,
            totalServiceCount: 0,
            totalResearchFunding: 0,
            totalServiceFunding: 0
          }
        }
        summaryMap[prodi].lecturerCount++

        if (lecturer.research) {
          summaryMap[prodi].totalResearchCount += lecturer.research.length
          lecturer.research.forEach(r => {
            summaryMap[prodi].totalResearchFunding += r.fundingAmount || 0
          })
        }
        if (lecturer.services) {
          summaryMap[prodi].totalServiceCount += lecturer.services.length
          lecturer.services.forEach(s => {
            summaryMap[prodi].totalServiceFunding += s.fundingAmount || 0
          })
        }
      })

      return Object.values(summaryMap).sort((a, b) =>
        (b.totalResearchFunding + b.totalServiceFunding) - (a.totalResearchFunding + a.totalServiceFunding)
      )
    },

    // Grant Type Details
    grantTypeDetails() {
      const grantMap = {}

      this.allItems.forEach(item => {
        const grantType = item.grantType || 'Tidak Diketahui'
        const source = item.source || 'Tidak Diketahui'
        const key = grantType

        if (!grantMap[key]) {
          grantMap[key] = {
            name: grantType,
            source: source,
            count: 0,
            researchCount: 0,
            serviceCount: 0,
            totalFunding: 0
          }
        }

        grantMap[key].count++
        grantMap[key].totalFunding += item.fundingAmount || 0

        if (item.type === 'research') {
          grantMap[key].researchCount++
        } else {
          grantMap[key].serviceCount++
        }

        if (grantMap[key].source === 'Tidak Diketahui' && source !== 'Tidak Diketahui') {
          grantMap[key].source = source
        }
      })

      return Object.values(grantMap)
        .map(g => ({
          ...g,
          avgFunding: g.count > 0 ? g.totalFunding / g.count : 0
        }))
        .sort((a, b) => b.totalFunding - a.totalFunding)
    },

    // Chart data: Funding by Year
    fundingByYearData() {
      const yearMap = {}

      this.allItems.forEach(item => {
        const year = item.year || 'Unknown'
        if (!yearMap[year]) {
          yearMap[year] = { research: 0, service: 0 }
        }
        if (item.type === 'research') {
          yearMap[year].research += item.fundingAmount || 0
        } else {
          yearMap[year].service += item.fundingAmount || 0
        }
      })

      const years = Object.keys(yearMap).filter(y => y !== 'Unknown').sort()

      return {
        labels: years,
        datasets: [
          {
            label: 'Penelitian',
            data: years.map(y => yearMap[y].research / 1000000),
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderRadius: 4
          },
          {
            label: 'Pengabdian',
            data: years.map(y => yearMap[y].service / 1000000),
            backgroundColor: 'rgba(16, 185, 129, 0.8)',
            borderRadius: 4
          }
        ]
      }
    },

    // Chart data: Funding by Source
    fundingBySourceData() {
      const sourceMap = { internal: 0, external: 0, other: 0 }

      this.allItems.forEach(item => {
        const source = (item.source || '').toLowerCase()
        if (source.includes('internal')) {
          sourceMap.internal += item.fundingAmount || 0
        } else if (source.includes('bima') || source.includes('eksternal') || source.includes('external')) {
          sourceMap.external += item.fundingAmount || 0
        } else {
          sourceMap.other += item.fundingAmount || 0
        }
      })

      return {
        labels: ['Internal', 'Eksternal (BIMA)', 'Lainnya'],
        datasets: [{
          data: [sourceMap.internal, sourceMap.external, sourceMap.other],
          backgroundColor: [
            'rgba(59, 130, 246, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(156, 163, 175, 0.8)'
          ],
          borderWidth: 0
        }]
      }
    },

    barChartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: { font: { size: 11 } }
          },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.dataset.label}: Rp ${ctx.raw.toFixed(1)} Juta`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Juta Rupiah'
            }
          }
        }
      }
    },

    doughnutOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { font: { size: 11 } }
          },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const value = ctx.raw / 1000000
                return `${ctx.label}: Rp ${value.toFixed(1)} Juta`
              }
            }
          }
        }
      }
    }
  },
  methods: {
    // Normalize nama dosen - hapus gelar untuk matching
    normalizeName(name) {
      if (!name) return ''
      return name
        .replace(/,?\s*(S\.T\.|S\.E\.|S\.Kom\.|S\.Si\.|S\.P\.|M\.T\.|M\.M\.|M\.Kom\.|M\.Sc\.|M\.Acc\.|M\.Ak\.|MBA\.|Ak\.|Ir\.|Dr\.|Prof\.|Ph\.D\.|CSCA\.|CDMS\.|CPEC\.|CHCM\.)/gi, '')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase()
    },

    // Cek apakah nama termasuk DTPS
    isDTPS(normalizedName, dtpsSet) {
      if (!normalizedName || !dtpsSet) return false

      if (dtpsSet.has(normalizedName)) return true

      for (const dtpsName of dtpsSet) {
        if (dtpsName.includes(normalizedName) || normalizedName.includes(dtpsName)) {
          return true
        }
        const dtpsParts = dtpsName.split(' ')
        const nameParts = normalizedName.split(' ')
        if (dtpsParts.length >= 2 && nameParts.length >= 2) {
          if (dtpsParts[0] === nameParts[0] && dtpsParts[dtpsParts.length - 1] === nameParts[nameParts.length - 1]) {
            return true
          }
        }
      }
      return false
    },

    formatCurrency(value) {
      if (!value) return 'Rp 0'
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value)
    },

    formatCurrencyShort(value) {
      if (!value) return 'Rp 0'
      if (value >= 1000000000) {
        return `Rp ${(value / 1000000000).toFixed(1)}M`
      }
      if (value >= 1000000) {
        return `Rp ${(value / 1000000).toFixed(0)}Jt`
      }
      return this.formatCurrency(value)
    }
  },
  watch: {
    selectedProdi() {
      this.currentPage = 1
    },
    itemType() {
      this.currentPage = 1
    }
  }
}
</script>
