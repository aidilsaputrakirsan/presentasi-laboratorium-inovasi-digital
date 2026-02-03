<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="card bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-slate-700">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-4">
          <!-- Icon -->
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
    </div>

    <!-- Filter by Prodi -->
    <div class="card">
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

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Funding by Year -->
      <div class="card hover:shadow-lg transition-shadow">
        <div class="mb-4">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 bg-amber-500 rounded-full"></span>
            <h3 class="text-lg font-bold text-slate-800">Pendanaan per Tahun</h3>
          </div>
          <p class="text-xs text-slate-400 mt-1">Tren pendanaan penelitian & pengabdian</p>
        </div>
        <div class="h-64">
          <Bar :data="fundingByYearData" :options="barChartOptions" />
        </div>
      </div>

      <!-- Funding by Source -->
      <div class="card hover:shadow-lg transition-shadow">
        <div class="mb-4">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 bg-blue-500 rounded-full"></span>
            <h3 class="text-lg font-bold text-slate-800">Sumber Pendanaan</h3>
          </div>
          <p class="text-xs text-slate-400 mt-1">Internal vs Eksternal</p>
        </div>
        <div class="h-64 flex items-center justify-center">
          <Doughnut :data="fundingBySourceData" :options="doughnutOptions" />
        </div>
      </div>
    </div>

    <!-- Kinerja per Tahun - untuk Akreditasi -->
    <div class="card hover:shadow-lg transition-shadow">
      <div class="mb-4">
        <div class="flex items-center justify-between">
          <div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 bg-cyan-500 rounded-full"></span>
              <h3 class="text-lg font-bold text-slate-800">Kinerja per Tahun</h3>
              <span class="px-2 py-0.5 bg-cyan-100 text-cyan-700 text-[10px] font-bold rounded-full">AKREDITASI</span>
            </div>
            <p class="text-xs text-slate-400 mt-1">Data untuk pelaporan LKPS dengan breakdown DTPS vs Eksternal</p>
          </div>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-slate-200 bg-slate-50">
              <th class="text-left py-3 px-3 font-bold text-slate-700">Tahun</th>
              <th class="text-center py-3 px-2 font-bold text-slate-700 bg-indigo-50" colspan="3">
                <div>Ketua (Leader)</div>
              </th>
              <th class="text-center py-3 px-2 font-bold text-slate-700 bg-cyan-50" colspan="3">
                <div>Terlibat (Ketua+Anggota)</div>
              </th>
              <th class="text-center py-3 px-2 font-bold text-slate-700">
                <div>Judul</div>
                <div class="text-[10px] font-normal text-slate-400">Penelitian</div>
              </th>
              <th class="text-center py-3 px-2 font-bold text-slate-700">
                <div>Judul</div>
                <div class="text-[10px] font-normal text-slate-400">Pengabdian</div>
              </th>
              <th class="text-center py-3 px-2 font-bold text-slate-700 bg-purple-50">
                <div>Rasio LKPS</div>
                <div class="text-[10px] font-normal text-purple-500" title="Judul ÷ Ketua DTPS (standar BAN-PT)">(judul/DTPS)</div>
              </th>
            </tr>
            <tr class="border-b border-slate-200 bg-slate-50 text-[10px]">
              <th></th>
              <!-- Ketua sub-columns -->
              <th class="text-center py-2 px-1 bg-indigo-50 text-indigo-600">Total</th>
              <th class="text-center py-2 px-1 bg-green-50 text-green-600">DTPS</th>
              <th class="text-center py-2 px-1 bg-orange-50 text-orange-600">Eksternal</th>
              <!-- Terlibat sub-columns -->
              <th class="text-center py-2 px-1 bg-cyan-50 text-cyan-600">Total</th>
              <th class="text-center py-2 px-1 bg-green-50 text-green-600">DTPS</th>
              <th class="text-center py-2 px-1 bg-orange-50 text-orange-600">Eksternal</th>
              <th></th>
              <th></th>
              <th class="text-center py-2 px-1 bg-purple-50 text-purple-600">Standar LKPS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="year in yearlyPerformance" :key="year.year" class="border-b border-slate-100 hover:bg-slate-50">
              <td class="py-3 px-3 font-bold text-slate-800">{{ year.year }}</td>
              <!-- Ketua columns -->
              <td class="py-3 px-1 text-center bg-indigo-50/30">
                <span class="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold">{{ year.leaderCount }}</span>
              </td>
              <td class="py-3 px-1 text-center bg-green-50/30">
                <span class="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold" :title="'Ketua dari DTPS'">{{ year.leaderDTPSCount }}</span>
              </td>
              <td class="py-3 px-1 text-center bg-orange-50/30">
                <span class="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold" :title="'Ketua dari luar prodi/kampus'">{{ year.leaderExternalCount }}</span>
              </td>
              <!-- Terlibat columns -->
              <td class="py-3 px-1 text-center bg-cyan-50/30">
                <span class="px-2 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-bold">{{ year.activeLecturers }}</span>
              </td>
              <td class="py-3 px-1 text-center bg-green-50/30">
                <span class="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold" :title="'Terlibat dari DTPS'">{{ year.activeDTPSCount }}</span>
              </td>
              <td class="py-3 px-1 text-center bg-orange-50/30">
                <span class="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold" :title="'Terlibat dari luar prodi/kampus'">{{ year.activeExternalCount }}</span>
              </td>
              <!-- Judul columns -->
              <td class="py-3 px-2 text-center">
                <span class="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">{{ year.researchCount }}</span>
              </td>
              <td class="py-3 px-2 text-center">
                <span class="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">{{ year.serviceCount }}</span>
              </td>
              <!-- Rasio LKPS (hanya DTPS) -->
              <td class="py-3 px-2 text-center bg-purple-50/50">
                <span class="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-bold" :title="'(' + year.researchCount + '+' + year.serviceCount + ') ÷ ' + year.leaderDTPSCount + ' DTPS'">{{ year.ratioByDTPS > 0 ? year.ratioByDTPS.toFixed(2) : '-' }}</span>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="bg-slate-100 font-bold">
              <td class="py-3 px-3 text-slate-800">RATA-RATA 3 TAHUN</td>
              <!-- Ketua rata-rata -->
              <td class="py-3 px-1 text-center bg-indigo-100/50">
                <span class="px-2 py-1 bg-indigo-200 text-indigo-800 rounded-full text-xs">{{ avg3Year.avgLeaders.toFixed(1) }}</span>
              </td>
              <td class="py-3 px-1 text-center bg-green-100/50">
                <span class="px-2 py-1 bg-green-200 text-green-800 rounded-full text-xs">{{ avg3Year.avgLeadersDTPS.toFixed(1) }}</span>
              </td>
              <td class="py-3 px-1 text-center bg-orange-100/50">
                <span class="px-2 py-1 bg-orange-200 text-orange-800 rounded-full text-xs">{{ avg3Year.avgLeadersExternal.toFixed(1) }}</span>
              </td>
              <!-- Terlibat rata-rata -->
              <td class="py-3 px-1 text-center bg-cyan-100/50">
                <span class="px-2 py-1 bg-cyan-200 text-cyan-800 rounded-full text-xs">{{ avg3Year.avgActiveLecturers.toFixed(1) }}</span>
              </td>
              <td class="py-3 px-1 text-center bg-green-100/50">
                <span class="px-2 py-1 bg-green-200 text-green-800 rounded-full text-xs">{{ avg3Year.avgActiveDTPS.toFixed(1) }}</span>
              </td>
              <td class="py-3 px-1 text-center bg-orange-100/50">
                <span class="px-2 py-1 bg-orange-200 text-orange-800 rounded-full text-xs">{{ avg3Year.avgActiveExternal.toFixed(1) }}</span>
              </td>
              <!-- Judul rata-rata -->
              <td class="py-3 px-2 text-center">
                <span class="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs">{{ avg3Year.avgResearch.toFixed(1) }}</span>
              </td>
              <td class="py-3 px-2 text-center">
                <span class="px-2 py-1 bg-emerald-200 text-emerald-800 rounded-full text-xs">{{ avg3Year.avgService.toFixed(1) }}</span>
              </td>
              <!-- Rasio LKPS rata-rata -->
              <td class="py-3 px-2 text-center bg-purple-100/50">
                <span class="px-2 py-1 bg-purple-200 text-purple-800 rounded text-xs font-bold">{{ avg3Year.avgRatioByDTPS.toFixed(2) }}</span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <!-- Penjelasan Detail DTPS -->
      <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div class="p-3 bg-green-50 rounded-lg text-xs text-green-700 border border-green-200">
          <div class="flex items-center gap-2 mb-2">
            <span class="w-2 h-2 bg-green-500 rounded-full"></span>
            <strong>DTPS (Dosen Tetap Program Studi)</strong>
          </div>
          <ul class="space-y-1 ml-4 list-disc">
            <li>Dosen yang <strong>homebase</strong>-nya di prodi yang diakreditasi</li>
            <li>Masuk dalam <strong>lecturers.json</strong> (master data)</li>
            <li><strong>Hanya DTPS yang dihitung</strong> untuk rasio LKPS</li>
          </ul>
        </div>
        <div class="p-3 bg-orange-50 rounded-lg text-xs text-orange-700 border border-orange-200">
          <div class="flex items-center gap-2 mb-2">
            <span class="w-2 h-2 bg-orange-500 rounded-full"></span>
            <strong>Eksternal (Non-DTPS)</strong>
          </div>
          <ul class="space-y-1 ml-4 list-disc">
            <li>Dosen dari <strong>prodi lain</strong> di institusi yang sama</li>
            <li>Dosen dari <strong>kampus lain</strong> (kolaborator)</li>
            <li><strong>Tidak masuk hitungan</strong> LKPS prodi ini</li>
          </ul>
        </div>
        <div class="p-3 bg-purple-50 rounded-lg text-xs text-purple-700 border border-purple-200">
          <div class="flex items-center gap-2 mb-2">
            <span class="w-2 h-2 bg-purple-500 rounded-full"></span>
            <strong>Rasio LKPS (Standar BAN-PT)</strong>
          </div>
          <ul class="space-y-1 ml-4 list-disc">
            <li><strong>Rasio LKPS</strong> = Judul ÷ Ketua DTPS</li>
            <li>Sesuai format <strong>Tabel 3.b.2</strong> LKPS</li>
            <li>Hitung hanya <strong>ketua dari DTPS</strong></li>
          </ul>
        </div>
      </div>

      <div class="mt-3 p-3 bg-amber-50 rounded-lg text-xs text-amber-700 border border-amber-200">
        <div class="flex items-start gap-2">
          <svg class="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div>
            <strong>Catatan Penting untuk Akreditasi:</strong>
            <ul class="mt-1 ml-4 list-disc space-y-0.5">
              <li><strong>Rata-rata 3 Tahun</strong> = rata-rata nilai dari TS-2, TS-1, dan TS (3 tahun terakhir)</li>
              <li>Untuk pelaporan LKPS, gunakan <strong>Rasio LKPS</strong> (kolom ungu) yang hanya menghitung ketua DTPS</li>
              <li>1 judul penelitian dengan 3 dosen (1 ketua DTPS + 2 anggota) tetap dihitung <strong>1 judul</strong></li>
              <li>Jika <strong>ketua bukan DTPS</strong>, penelitian tersebut <strong>tidak masuk</strong> hitungan LKPS prodi ini</li>
              <li>Anggota eksternal boleh ada, tapi <strong>tidak mempengaruhi</strong> perhitungan rasio</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Info Daftar DTPS -->
      <div class="mt-3 p-3 bg-slate-50 rounded-lg text-xs text-slate-600 border border-slate-200">
        <div class="flex items-start gap-2">
          <svg class="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <div>
            <strong>Daftar DTPS {{ selectedProdi === 'all' ? '(Semua Prodi)' : selectedProdi }}:</strong>
            <span class="ml-2 text-slate-500">{{ currentDtpsNames.size }} dosen terdaftar</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Funding by Grant Type - Table View -->
    <div class="card hover:shadow-lg transition-shadow">
      <div class="mb-4">
        <div class="flex items-center justify-between">
          <div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 bg-emerald-500 rounded-full"></span>
              <h3 class="text-lg font-bold text-slate-800">Rincian Jenis Hibah</h3>
            </div>
            <p class="text-xs text-slate-400 mt-1">{{ grantTypeDetails.length }} kategori hibah ditemukan</p>
          </div>
        </div>
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
              <th class="text-right py-3 px-4 font-bold text-slate-700">Rata-rata</th>
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

    <!-- Per Prodi Summary Table -->
    <div class="card hover:shadow-lg transition-shadow">
      <div class="mb-4">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 bg-purple-500 rounded-full"></span>
          <h3 class="text-lg font-bold text-slate-800">
            {{ selectedProdi === 'all' ? 'Ringkasan per Prodi' : 'Ringkasan ' + selectedProdi }}
          </h3>
        </div>
        <p class="text-xs text-slate-400 mt-1">
          {{ selectedProdi === 'all' ? 'Perbandingan semua program studi' : 'Data detail untuk pelaporan prodi' }}
        </p>
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
            <!-- Mode: Semua Prodi - tampilkan list prodi -->
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
            <!-- Mode: Single Prodi - tampilkan detail metrics -->
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
          <!-- Footer hanya muncul jika mode Semua Prodi -->
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

    <!-- Detailed Items List -->
    <div class="card hover:shadow-lg transition-shadow">
      <div class="mb-4">
        <div class="flex items-center justify-between">
          <div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 bg-rose-500 rounded-full"></span>
              <h3 class="text-lg font-bold text-slate-800">Daftar Detail Hibah</h3>
            </div>
            <p class="text-xs text-slate-400 mt-1">{{ filteredItems.length }} item ditemukan</p>
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
import sintaData from '../data/sinta_data.json'
import lecturersConfig from '../data/lecturers.json'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)

export default {
  name: 'FundingDashboard',
  components: { Bar, Doughnut },
  data() {
    return {
      selectedProdi: 'all',
      itemType: 'all',
      currentPage: 1,
      itemsPerPage: 20
    }
  },
  computed: {
    lecturers() {
      return sintaData.lecturers || []
    },

    prodiList() {
      const prodis = new Set(this.lecturers.map(l => l.prodi))
      return Array.from(prodis).sort()
    },

    // Daftar nama DTPS per prodi (dari lecturers.json sebagai master data)
    dtpsNamesByProdi() {
      const result = {}
      const programs = lecturersConfig.studyPrograms || {}

      for (const [prodiName, prodiData] of Object.entries(programs)) {
        result[prodiName] = new Set()
        if (prodiData.lecturers) {
          prodiData.lecturers.forEach(l => {
            // Normalize nama (hapus gelar untuk matching)
            const normalizedName = this.normalizeName(l.name)
            result[prodiName].add(normalizedName)
          })
        }
      }
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

    // Collect all research and service items with prodi info
    allItems() {
      const items = []
      this.filteredLecturers.forEach(lecturer => {
        // Research items
        if (lecturer.research && Array.isArray(lecturer.research)) {
          lecturer.research.forEach(r => {
            if (r.title) {
              items.push({
                ...r,
                type: 'research',
                prodi: lecturer.prodi,
                lecturerName: lecturer.name
              })
            }
          })
        }
        // Service items
        if (lecturer.services && Array.isArray(lecturer.services)) {
          lecturer.services.forEach(s => {
            if (s.title) {
              items.push({
                ...s,
                type: 'service',
                prodi: lecturer.prodi,
                lecturerName: lecturer.name
              })
            }
          })
        }
      })
      // Sort by year descending, then by funding amount
      return items.sort((a, b) => {
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

    // Summary stats
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

    // Yearly Performance - untuk akreditasi dengan dosen aktif per tahun
    yearlyPerformance() {
      const yearMap = {}
      const dtpsNames = this.currentDtpsNames

      // Kumpulkan data per tahun
      this.allItems.forEach(item => {
        const year = item.year || 'Unknown'
        if (year === 'Unknown') return

        if (!yearMap[year]) {
          yearMap[year] = {
            year,
            researchCount: 0,
            serviceCount: 0,
            totalFunding: 0,
            leaders: new Set(),           // Semua ketua
            leadersDTPS: new Set(),       // Ketua yang DTPS
            leadersExternal: new Set(),   // Ketua yang bukan DTPS
            activeLecturers: new Set(),   // Semua yang terlibat
            activeDTPS: new Set(),        // Terlibat yang DTPS
            activeExternal: new Set()     // Terlibat yang bukan DTPS
          }
        }

        if (item.type === 'research') {
          yearMap[year].researchCount++
        } else {
          yearMap[year].serviceCount++
        }
        yearMap[year].totalFunding += item.fundingAmount || 0

        // Tambahkan leader (ketua) - untuk perhitungan LKPS
        if (item.leader) {
          const normalizedLeader = this.normalizeName(item.leader)
          yearMap[year].leaders.add(item.leader)
          yearMap[year].activeLecturers.add(item.leader)

          // Cek apakah DTPS atau Eksternal
          if (this.isDTPS(normalizedLeader, dtpsNames)) {
            yearMap[year].leadersDTPS.add(item.leader)
            yearMap[year].activeDTPS.add(item.leader)
          } else {
            yearMap[year].leadersExternal.add(item.leader)
            yearMap[year].activeExternal.add(item.leader)
          }
        }

        // Tambahkan members (anggota)
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

        // Tambahkan lecturer name jika ada (fallback)
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

      // Convert to array dan hitung rasio
      return Object.values(yearMap)
        .map(y => {
          const leaderCount = y.leaders.size || 1
          const leaderDTPSCount = y.leadersDTPS.size
          const leaderExternalCount = y.leadersExternal.size
          const activeLecturers = y.activeLecturers.size || 1
          const activeDTPSCount = y.activeDTPS.size
          const activeExternalCount = y.activeExternal.size
          const totalActivities = y.researchCount + y.serviceCount

          // Rasio LKPS seharusnya hanya DTPS
          const ratioByDTPS = leaderDTPSCount > 0 ? totalActivities / leaderDTPSCount : 0

          return {
            year: y.year,
            researchCount: y.researchCount,
            serviceCount: y.serviceCount,
            totalFunding: y.totalFunding,
            // Semua ketua
            leaderCount: leaderCount,
            leaderDTPSCount: leaderDTPSCount,
            leaderExternalCount: leaderExternalCount,
            // Semua terlibat
            activeLecturers: activeLecturers,
            activeDTPSCount: activeDTPSCount,
            activeExternalCount: activeExternalCount,
            // Rasio
            ratioByLeader: totalActivities / leaderCount,           // Semua ketua
            ratioByDTPS: ratioByDTPS,                               // Hanya DTPS (standar LKPS)
            ratioByActive: totalActivities / activeLecturers        // Semua terlibat
          }
        })
        .sort((a, b) => b.year.localeCompare(a.year)) // Descending by year
    },

    // Rata-rata 3 tahun terakhir untuk akreditasi
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
          avgRatioByLeader: 0,
          avgRatioByDTPS: 0,
          avgRatioByActive: 0
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
        ratioByLeader: acc.ratioByLeader + y.ratioByLeader,
        ratioByDTPS: acc.ratioByDTPS + y.ratioByDTPS,
        ratioByActive: acc.ratioByActive + y.ratioByActive
      }), {
        leaders: 0, leadersDTPS: 0, leadersExternal: 0,
        activeLecturers: 0, activeDTPS: 0, activeExternal: 0,
        research: 0, service: 0, funding: 0,
        ratioByLeader: 0, ratioByDTPS: 0, ratioByActive: 0
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
        avgRatioByLeader: sum.ratioByLeader / count,
        avgRatioByDTPS: sum.ratioByDTPS / count,
        avgRatioByActive: sum.ratioByActive / count
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

    // Grant Type Details - tabel lengkap semua jenis hibah
    grantTypeDetails() {
      const grantMap = {}

      this.allItems.forEach(item => {
        const grantType = item.grantType || 'Tidak Diketahui'
        const source = item.source || 'Tidak Diketahui'

        // Gunakan kombinasi grantType sebagai key
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

        // Update source jika belum ada
        if (grantMap[key].source === 'Tidak Diketahui' && source !== 'Tidak Diketahui') {
          grantMap[key].source = source
        }
      })

      // Convert to array, calculate avg, and sort by total funding
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

    // Chart data: Funding by Grant Type
    fundingByGrantTypeData() {
      const grantMap = {}

      this.allItems.forEach(item => {
        const grantType = item.grantType || item.grantCategory || 'Tidak Diketahui'
        if (!grantMap[grantType]) {
          grantMap[grantType] = 0
        }
        grantMap[grantType] += item.fundingAmount || 0
      })

      // Sort by funding amount and take top 10
      const sorted = Object.entries(grantMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)

      return {
        labels: sorted.map(([type]) => type.length > 40 ? type.substring(0, 40) + '...' : type),
        datasets: [{
          label: 'Dana (Juta Rp)',
          data: sorted.map(([, amount]) => amount / 1000000),
          backgroundColor: 'rgba(16, 185, 129, 0.8)',
          borderRadius: 4
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

    horizontalBarOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => `Rp ${ctx.raw.toFixed(1)} Juta`
            }
          }
        },
        scales: {
          x: {
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
      // Hapus gelar umum di Indonesia
      return name
        .replace(/,?\s*(S\.T\.|S\.E\.|S\.Kom\.|S\.Si\.|S\.P\.|M\.T\.|M\.M\.|M\.Kom\.|M\.Sc\.|M\.Acc\.|M\.Ak\.|MBA\.|Ak\.|Ir\.|Dr\.|Prof\.|Ph\.D\.|CSCA\.|CDMS\.|CPEC\.|CHCM\.)/gi, '')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase()
    },

    // Cek apakah nama termasuk DTPS
    isDTPS(normalizedName, dtpsSet) {
      if (!normalizedName || !dtpsSet) return false

      // Cek exact match dulu
      if (dtpsSet.has(normalizedName)) return true

      // Cek partial match (nama depan + tengah)
      for (const dtpsName of dtpsSet) {
        // Jika salah satu mengandung yang lain (untuk handle variasi penulisan nama)
        if (dtpsName.includes(normalizedName) || normalizedName.includes(dtpsName)) {
          return true
        }
        // Cek nama depan dan nama belakang saja
        const dtpsParts = dtpsName.split(' ')
        const nameParts = normalizedName.split(' ')
        if (dtpsParts.length >= 2 && nameParts.length >= 2) {
          // Cek nama depan dan nama belakang match
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
