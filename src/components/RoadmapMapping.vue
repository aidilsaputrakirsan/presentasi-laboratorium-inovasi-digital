<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="card bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-slate-700">
      <div class="flex items-start justify-between mb-6 gap-4">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30 shrink-0">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
            </svg>
          </div>
          <div>
            <h1 class="text-2xl font-black text-white tracking-tight">
              Pemetaan {{ kindLabel }} &mdash; {{ activeRef === 'ITK' ? 'Roadmap Institut' : 'Roadmap Fakultas' }}
            </h1>
            <p v-if="hasData" class="text-sm text-slate-400 mt-0.5">
              Judul {{ metadata.kindLabel }} {{ metadata.prodi }} terhadap {{ metadata.categoryLabel }} &mdash; {{ metadata.reference }}
            </p>
            <p v-else class="text-sm text-slate-400 mt-0.5">
              Acuan ini belum tersedia untuk {{ kindLabel }}
            </p>
          </div>
        </div>
        <div v-if="metadata.generatedAt" class="hidden md:block text-right shrink-0">
          <span class="text-xs uppercase tracking-wider text-slate-500 font-bold">Diperbarui</span>
          <p class="text-sm font-semibold text-slate-300">{{ formatDate(metadata.generatedAt) }}</p>
        </div>
      </div>

      <div class="flex gap-1 bg-white/5 border border-white/10 p-1 rounded-xl mb-4 w-fit">
        <button
          v-for="r in refOptions"
          :key="r.key"
          @click="activeRef = r.key; activePillar = 'all'"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-bold transition-all',
            activeRef === r.key ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-200'
          ]"
        >{{ r.label }}</button>
      </div>

      <!-- Pemilih tahun: audit AMI berjalan per tahun -->
      <div v-if="hasData" class="mb-4">
        <p class="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
          Tahun kegiatan &mdash; pilih satu tahun untuk melihat capaian tahun tersebut saja
        </p>
        <p class="text-[11px] text-slate-500 mb-2">
          Tanda <span class="text-amber-400 font-black">*</span> = tahun di luar masa berlaku dokumen acuan
          ({{ metadata.validFrom }}&ndash;{{ metadata.validTo }}); pemetaannya bersifat retrospektif.
        </p>
        <div class="flex gap-2 flex-wrap">
          <button
            @click="activeYear = 'all'; activePillar = 'all'"
            :class="[
              'px-3 py-1.5 rounded-lg text-xs font-bold border transition-all',
              activeYear === 'all'
                ? 'bg-white text-slate-900 border-white'
                : 'bg-white/5 text-slate-400 border-white/10 hover:text-slate-200'
            ]"
          >Semua Tahun</button>
          <button
            v-for="y in yearRecap"
            :key="y.year"
            @click="activeYear = y.year; activePillar = 'all'"
            :class="[
              'px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5',
              activeYear === y.year
                ? 'bg-white text-slate-900 border-white'
                : 'bg-white/5 text-slate-400 border-white/10 hover:text-slate-200'
            ]"
          >
            {{ y.year }}
            <span class="text-slate-500">({{ y.count }})</span>
            <span v-if="!y.inPeriod" class="text-amber-400 font-black" title="Di luar masa berlaku dokumen acuan">*</span>
          </button>
        </div>
      </div>

      <div v-if="hasData" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <div class="bg-white/5 rounded-xl p-4 text-center border border-white/10">
          <div class="text-2xl font-black text-cyan-300">{{ scopedSummary.totalUniqueResearch }}</div>
          <div class="text-xs uppercase tracking-wider text-slate-400 mt-1 font-bold">Judul Unik</div>
        </div>
        <div class="bg-white/5 rounded-xl p-4 text-center border border-white/10">
          <div class="text-2xl font-black text-emerald-300">{{ scopedSummary.mapped }}</div>
          <div class="text-xs uppercase tracking-wider text-slate-400 mt-1 font-bold">Terpetakan</div>
        </div>
        <div class="bg-white/5 rounded-xl p-4 text-center border border-white/10">
          <div class="text-2xl font-black text-amber-300">{{ scopedSummary.coveragePercent }}%</div>
          <div class="text-xs uppercase tracking-wider text-slate-400 mt-1 font-bold">Cakupan Roadmap</div>
        </div>
        <div class="bg-white/5 rounded-xl p-4 text-center border border-white/10">
          <div class="text-2xl font-black text-slate-300">{{ scopedSummary.unmapped }}</div>
          <div class="text-xs uppercase tracking-wider text-slate-400 mt-1 font-bold">Di Luar Acuan</div>
        </div>
        <div class="bg-white/5 rounded-xl p-4 text-center border border-white/10">
          <div class="text-2xl font-black text-violet-300">{{ filledCategories }}<span class="text-base text-slate-500">/{{ totalCategories }}</span></div>
          <div class="text-xs uppercase tracking-wider text-slate-400 mt-1 font-bold">{{ metadata.categoryLabel }} Tersentuh</div>
        </div>
      </div>
    </div>

    <div v-if="!hasData" class="card py-12 px-6">
      <div v-if="dataset === 'services' && activeRef === 'ITK'" class="max-w-3xl mx-auto text-center">
        <div class="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mx-auto mb-4">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 9v2m0 4h.01M5 19h14a2 2 0 001.84-2.75L13.74 4a2 2 0 00-3.48 0l-7.1 12.25A2 2 0 004.99 19z"/>
          </svg>
        </div>
        <p class="font-bold text-slate-700 mb-2">Pemetaan Abdimas terhadap Roadmap Institut belum disusun</p>
        <p class="text-sm text-slate-600 leading-relaxed">
          Panduan Penelitian dan PkM ITK memiliki <strong class="text-slate-800">roadmap Abdimas tersendiri</strong>
          (Gambar 8 halaman 59 dan Tabel 9 halaman 60), terpisah dari tabel Bidang Fokus Riset yang dipakai
          pada pemetaan penelitian. Salinan panduan yang tersedia saat ini hanya memuat sampai halaman 51,
          sehingga tabel tersebut belum dapat dibaca.
        </p>
        <p class="text-sm text-slate-600 leading-relaxed mt-3">
          Pemetaan sengaja tidak dibuat memakai tabel fokus riset sebagai penggantinya, karena hasilnya akan
          mengacu pada dokumen yang keliru. Silakan gunakan acuan
          <strong class="text-slate-800">Roadmap Fakultas</strong> di atas, yang pilarnya memang berlaku untuk
          penelitian sekaligus pengabdian.
        </p>
      </div>
      <div v-else class="text-center text-slate-400">
        <p class="font-bold text-slate-500">Belum ada data pemetaan untuk program studi ini</p>
        <p class="text-sm mt-1">Data pemetaan akan tampil setelah daftar kegiatan program studi ini dimuat.</p>
      </div>
    </div>

    <template v-else>
      <!-- Konteks AMI + batas acuan -->
      <div class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5">
        <p class="text-[10px] font-bold uppercase tracking-widest text-blue-500 mb-1">Butir Audit Mutu Internal</p>
        <p class="text-sm font-bold text-slate-800 mb-2">
          &ldquo;Apakah program studi memiliki pemetaan judul penelitian terhadap roadmap penelitian jurusan / ITK?&rdquo;
        </p>
        <p class="text-xs text-slate-600 leading-relaxed">
          Acuan aktif: <strong class="text-slate-800">{{ metadata.reference }}</strong>
          &mdash; {{ metadata.referenceDoc }}.
          {{ metadata.referenceScope }}
        </p>
        <p class="text-xs leading-relaxed mt-2 px-3 py-2 rounded-lg"
           :class="activeRef === 'ITK' ? 'bg-emerald-50 text-emerald-900 border border-emerald-100'
                                       : 'bg-amber-50 text-amber-900 border border-amber-100'">
          <strong>Asal kata kunci yang dipakai:</strong> {{ metadata.keywordBasis }}
        </p>
        <p class="text-xs text-slate-500 leading-relaxed mt-2 pt-2 border-t border-blue-100">
          <strong class="text-slate-700">Cara pemetaan dilakukan:</strong> {{ metadata.method }}
        </p>
        <p class="text-xs text-slate-500 leading-relaxed mt-2">
          <strong class="text-slate-700">Aturan kepemilikan judul:</strong> {{ metadata.ownershipRule }}
          Dari {{ items.length }} judul, {{ externalLeaderCount }} di antaranya diketuai dosen luar prodi
          dengan dosen {{ prodiCode }} sebagai anggota.
        </p>
      </div>

      <!-- Peringatan masa berlaku dokumen acuan -->
      <div v-if="periodWarning"
           class="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
        <div class="w-8 h-8 rounded-lg bg-white border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M5 19h14a2 2 0 001.84-2.75L13.74 4a2 2 0 00-3.48 0l-7.1 12.25A2 2 0 004.99 19z"/>
          </svg>
        </div>
        <div class="min-w-0">
          <p class="text-sm font-bold text-amber-900 mb-1">{{ periodWarning.title }}</p>
          <p class="text-xs text-amber-900 leading-relaxed">{{ metadata.validityNote }}</p>
        </div>
      </div>

      <!-- Kartu pilar -->
      <div>
        <div class="flex items-baseline justify-between flex-wrap gap-2 mb-4">
          <h2 class="text-lg font-black text-slate-900">
            Distribusi terhadap {{ metadata.categoryLabel }}
          </h2>
          <span class="text-xs font-bold px-2.5 py-1 rounded-lg"
                :class="activeYear === 'all' ? 'bg-slate-100 text-slate-600' : 'bg-blue-50 text-blue-700 border border-blue-100'">
            {{ activeYear === 'all' ? 'Seluruh tahun (' + yearOptions[yearOptions.length - 1] + '–' + yearOptions[0] + ')' : 'Tahun ' + activeYear }}
          </span>
        </div>

        <!-- Rekap per Pusat Penelitian (khusus acuan ITK) -->
        <div v-if="centerRecap.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <div v-for="c in centerRecap" :key="c.name"
               class="bg-white border border-slate-200 rounded-xl p-4">
            <div class="text-2xl font-black text-slate-800">{{ c.count }}</div>
            <div class="text-[11px] font-bold text-slate-500 leading-snug mt-1">{{ c.name }}</div>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            v-for="p in pillarCards"
            :key="p.key"
            @click="activePillar = activePillar === p.key ? 'all' : p.key"
            :class="[
              'text-left bg-white rounded-2xl border p-5 shadow-sm transition-all hover:shadow-md',
              activePillar === p.key ? 'border-blue-400 ring-2 ring-blue-100' : 'border-slate-200'
            ]"
          >
            <div class="flex items-start gap-3">
              <div class="w-2 h-14 rounded-full shrink-0" :style="{ backgroundColor: p.color }"></div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="px-2 py-0.5 rounded text-[10px] font-black tracking-wider"
                        :style="{ backgroundColor: p.color + '22', color: p.color }">{{ p.key }}</span>
                  <span class="text-xs font-bold text-slate-500">{{ p.count }} judul &middot; {{ p.percent }}%</span>
                </div>
                <h3 class="text-base font-bold text-slate-800 mt-1">{{ p.name }}</h3>
                <p v-if="p.center" class="text-xs text-slate-500 mt-1">
                  <span class="font-bold text-slate-600">Pusat Penelitian:</span> {{ p.center }}
                </p>
                <p v-if="p.flagship" class="text-xs text-slate-500 mt-1">
                  <span class="font-bold text-slate-600">Flagship:</span> {{ p.flagship }}
                </p>
                <p v-if="p.siRole" class="text-xs text-slate-600 leading-relaxed mt-2">
                  <span class="font-bold text-slate-700">Peran prodi:</span> {{ p.siRole }}
                </p>
                <p v-if="p.topik" class="text-xs text-slate-600 leading-relaxed mt-2">
                  <span class="font-bold text-slate-700">Topik dokumen:</span> {{ p.topik }}
                </p>
                <p class="text-[10px] text-slate-400 mt-2 font-mono">{{ p.source }}</p>
                <div class="mt-3 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div class="h-full rounded-full" :style="{ width: p.percent + '%', backgroundColor: p.color }"></div>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>

      <!-- Daftar judul + alasan -->
      <div class="card">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h2 class="text-lg font-black text-slate-900">Rincian Pemetaan Judul</h2>
            <p class="text-xs text-slate-500 mt-0.5">
              Menampilkan {{ filteredItems.length }} dari {{ scopedItems.length }} judul &mdash; setiap baris disertai alasan pemetaannya
            </p>
          </div>
          <div class="flex gap-2 flex-wrap">
            <button
              v-for="f in pillarFilters"
              :key="f.key"
              @click="activePillar = f.key"
              :class="[
                'px-3 py-1.5 rounded-lg text-xs font-bold border transition-all',
                activePillar === f.key
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
              ]"
            >{{ f.label }}</button>
          </div>
        </div>

        <div class="space-y-3">
          <div
            v-for="(item, idx) in filteredItems"
            :key="idx"
            class="border border-slate-200 rounded-xl p-4 hover:border-slate-300 transition-colors"
          >
            <div class="flex items-start gap-3">
              <span
                class="px-2 py-1 rounded text-[10px] font-black tracking-wider shrink-0"
                :style="{ backgroundColor: pillarColor(item.pillar) + '22', color: pillarColor(item.pillar) }"
              >{{ item.pillar || 'NA' }}</span>
              <div class="flex-1 min-w-0">
                <h3 class="text-sm font-bold text-slate-800 leading-snug">{{ titleCase(item.title) }}</h3>
                <div class="flex items-center gap-2 flex-wrap mt-1.5 text-[10px] font-bold uppercase tracking-wider">
                  <span class="px-2 py-0.5 bg-slate-100 text-slate-600 rounded">{{ item.year }}</span>
                  <span class="px-2 py-0.5 bg-slate-100 text-slate-600 rounded">{{ item.grantCategory || '&mdash;' }}</span>
                  <span class="text-slate-400 normal-case tracking-normal font-semibold">Ketua: {{ item.leader }}</span>
                  <span
                    v-if="item.leaderIsInternal"
                    class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100"
                  >Ketua {{ item.prodiCode }}</span>
                  <span
                    v-else
                    class="px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-100"
                  >Ketua dari prodi lain</span>
                </div>

                <!-- Dasar kepemilikan judul oleh prodi -->
                <p class="text-[11px] text-slate-600 mt-2">
                  <span class="font-bold text-slate-700">Anggota {{ item.prodiCode }}:</span>
                  <span
                    v-for="m in item.siMembers"
                    :key="m"
                    class="inline-block ml-1 px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100 font-semibold"
                  >{{ m }}</span>
                  <span v-if="!item.siMembers.length" class="ml-1 text-slate-400">&mdash;</span>
                </p>

                <p class="text-xs text-slate-600 leading-relaxed mt-2 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2">
                  <span class="font-bold text-slate-700">Alasan masuk kategori ini:</span> {{ item.reason }}
                </p>

                <p class="text-[11px] text-slate-500 mt-1.5">
                  <span class="font-bold">Keterlibatan program studi:</span> {{ item.affiliationBasis }}
                </p>

                <p v-if="item.supportingPillars && item.supportingPillars.length" class="text-[11px] text-slate-500 mt-1.5">
                  <span class="font-bold">Pilar pendukung:</span>
                  <span v-for="sp in item.supportingPillars" :key="sp" class="ml-1">
                    {{ sp }} &mdash; {{ pillars[sp].name }}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { prodiRegistry } from '../data/prodi/index.js'

// Warna per kategori. Acuan ITK diwarnai per tema smart city agar sub tema
// dalam satu tema terbaca sebagai satu rumpun.
const PILLAR_COLOR = {
  P1: '#2C5C8F', P2: '#6B4F9C', P3: '#2F7F5E', P4: '#A4661F',
  'SG-PS': '#2C5C8F', 'SG-BR': '#2C5C8F', 'SG-PP': '#2C5C8F',
  'SB-TO': '#B0457B', 'SB-BB': '#B0457B', 'SB-CA': '#B0457B',
  'SE-IN': '#A4661F', 'SE-WE': '#A4661F', 'SE-TR': '#A4661F',
  'SL-HA': '#6B4F9C', 'SL-HE': '#6B4F9C', 'SL-BU': '#6B4F9C',
  'SS-CO': '#0F7C8C', 'SS-LE': '#0F7C8C', 'SS-SE': '#0F7C8C',
  'SV-PR': '#2F7F5E', 'SV-WA': '#2F7F5E',
  'PP1-EM': '#767676', 'PP4-MA': '#767676', 'PP5-K3': '#767676',
  NA: '#767676'
}

export default {
  name: 'RoadmapMapping',
  props: {
    prodiSlug: { type: String, default: 'sistem-informasi' },
    // 'research' = judul penelitian, 'services' = judul pengabdian (Abdimas)
    dataset: { type: String, default: 'research' }
  },
  data() {
    return { activePillar: 'all', activeRef: 'FSTI', activeYear: 'all' }
  },
  computed: {
    refOptions() {
      return [
        { key: 'FSTI', label: 'Roadmap Fakultas (FSTI)' },
        { key: 'ITK', label: 'Roadmap Institut (ITK)' }
      ]
    },
    mapping() {
      const entry = prodiRegistry[this.prodiSlug]
      if (!entry) return null
      const key = this.dataset === 'services'
        ? (this.activeRef === 'ITK' ? 'abdimasMappingItk' : 'abdimasMapping')
        : (this.activeRef === 'ITK' ? 'roadmapMappingItk' : 'roadmapMapping')
      return entry[key] || null
    },
    kindLabel() { return this.dataset === 'services' ? 'Abdimas' : 'Penelitian' },
    hasData() { return !!(this.mapping && this.mapping.items && this.mapping.items.length) },
    metadata() { return (this.mapping && this.mapping.metadata) || {} },
    summary() { return (this.mapping && this.mapping.summary) || {} },
    pillars() { return (this.mapping && this.mapping.pillars) || {} },
    items() { return (this.mapping && this.mapping.items) || [] },

    // --- Penyaringan per tahun -------------------------------------------
    // Audit AMI berjalan per tahun, sehingga tahun diperlakukan sebagai
    // penyaring utama: seluruh metrik, kartu kategori, dan daftar judul
    // dihitung ulang mengikuti tahun yang dipilih.
    yearOptions() {
      const years = [...new Set(this.items.map(i => i.year).filter(Boolean))]
      return years.sort((a, b) => Number(b) - Number(a))
    },
    yearRecap() {
      const per = (this.summary && this.summary.perYear) || {}
      return this.yearOptions.map(y => {
        const rows = this.items.filter(i => i.year === y)
        return {
          year: y,
          count: rows.length,
          mapped: rows.filter(i => i.pillar).length,
          inPeriod: per[y] ? per[y].inPeriod : true
        }
      })
    },

    // Dokumen acuan punya masa berlaku. Tahun di luar masa itu tetap
    // ditampilkan karena berguna untuk melihat kesinambungan arah riset,
    // tetapi tidak boleh dibaca sebagai kepatuhan terhadap dokumen.
    periodWarning() {
      if (!this.hasData || !this.metadata.validFrom) return null
      if (this.activeYear !== 'all') {
        const y = Number(this.activeYear)
        if (y >= this.metadata.validFrom && y <= this.metadata.validTo) return null
        return {
          title: 'Tahun ' + this.activeYear + ' berada di luar masa berlaku dokumen acuan ('
            + this.metadata.validFrom + '–' + this.metadata.validTo + ')'
        }
      }
      const outside = this.yearRecap.filter(y => !y.inPeriod)
      if (!outside.length) return null
      return {
        title: 'Tampilan "Semua Tahun" mencakup ' + outside.length
          + ' tahun di luar masa berlaku dokumen acuan ('
          + this.metadata.validFrom + '–' + this.metadata.validTo + ')'
      }
    },
    scopedItems() {
      if (this.activeYear === 'all') return this.items
      return this.items.filter(i => i.year === this.activeYear)
    },

    // Rekap dihitung dari judul pada tahun terpilih, bukan dari angka
    // bawaan berkas, agar metrik selalu konsisten dengan yang tampil.
    scopedCounts() {
      const per = {}
      Object.keys(this.pillars).forEach(k => { per[k] = 0 })
      this.scopedItems.forEach(i => { if (i.pillar) per[i.pillar] += 1 })
      return per
    },
    scopedSummary() {
      const total = this.scopedItems.length
      const mapped = this.scopedItems.filter(i => i.pillar).length
      return {
        totalUniqueResearch: total,
        mapped,
        unmapped: total - mapped,
        coveragePercent: total ? Math.round((mapped / total) * 1000) / 10 : 0
      }
    },

    pillarCards() {
      const total = this.scopedSummary.totalUniqueResearch || 1
      return Object.entries(this.pillars).map(([key, p]) => {
        const count = this.scopedCounts[key] || 0
        return {
          key,
          ...p,
          count,
          percent: Math.round((count / total) * 1000) / 10,
          color: PILLAR_COLOR[key]
        }
      })
    },

    totalCategories() { return Object.keys(this.pillars).length },
    filledCategories() {
      return Object.values(this.scopedCounts).filter(v => v > 0).length
    },

    // Rekap per Pusat Penelitian - hanya terisi pada acuan yang berjenjang (ITK)
    centerRecap() {
      const per = {}
      Object.entries(this.pillars).forEach(([code, cat]) => {
        if (!cat.center) return
        per[cat.center] = (per[cat.center] || 0) + (this.scopedCounts[code] || 0)
      })
      return Object.entries(per)
        .filter(([, v]) => v > 0)
        .sort((a, b) => b[1] - a[1])
        .map(([name, count]) => ({ name, count }))
    },

    pillarFilters() {
      const f = [{ key: 'all', label: 'Semua' }]
      Object.keys(this.pillars).forEach(k => f.push({ key: k, label: k }))
      if (this.scopedSummary.unmapped) f.push({ key: 'NA', label: 'Di luar acuan' })
      return f
    },

    prodiCode() { return (this.items[0] && this.items[0].prodiCode) || '' },
    externalLeaderCount() { return this.scopedItems.filter(i => !i.leaderIsInternal).length },

    filteredItems() {
      const rows = this.scopedItems
      if (this.activePillar === 'all') return rows
      if (this.activePillar === 'NA') return rows.filter(i => !i.pillar)
      return rows.filter(i => i.pillar === this.activePillar)
    }
  },
  methods: {
    pillarColor(p) { return PILLAR_COLOR[p] || PILLAR_COLOR.NA },
    // Judul di SINTA banyak yang KAPITAL SEMUA - turunkan agar enak dibaca
    titleCase(t) {
      if (!t) return ''
      if (t !== t.toUpperCase()) return t
      return t.toLowerCase().replace(/(^|\s|\()([a-z])/g, (m, a, b) => a + b.toUpperCase())
    },
    formatDate(d) {
      if (!d) return ''
      return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    }
  }
}
</script>
