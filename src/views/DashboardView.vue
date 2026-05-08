<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
      <div>
        <h1 class="text-3xl font-black text-slate-900 tracking-tight">Ringkasan</h1>
        <p class="text-sm text-slate-500 mt-1 flex items-center gap-2">
          <span class="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>Data disinkron {{ lastSyncRelative }}</span>
          <span class="text-slate-300">•</span>
          <span>SINTA Kemendiktisaintek + Google Scholar</span>
        </p>
      </div>
    </div>

    <!-- Prodi Filter Chips -->
    <div class="flex flex-wrap items-center gap-2">
      <span class="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1">Lihat</span>
      <button
        @click="selectedProdi = 'all'"
        class="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
        :class="selectedProdi === 'all'
          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
          : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600'"
      >
        Semua Prodi
      </button>
      <button
        v-for="p in availableProdi"
        :key="p.slug"
        @click="selectedProdi = p.slug"
        :disabled="!p.hasData"
        class="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
        :class="[
          selectedProdi === p.slug
            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
            : p.hasData
              ? 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600'
              : 'bg-slate-50 text-slate-300 border border-slate-100 cursor-not-allowed'
        ]"
      >
        {{ p.code }}
        <span v-if="!p.hasData" class="ml-1 text-[10px] uppercase tracking-wider">soon</span>
      </button>
    </div>

    <!-- Stat Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="stat in statCards" :key="stat.key" class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-4">
          <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
            <component :is="stat.icon" class="w-5 h-5" />
          </div>
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">{{ stat.label }}</span>
        </div>
        <p class="text-3xl font-black text-slate-900 leading-none">{{ stat.value }}</p>
        <p v-if="stat.sub" class="text-xs text-slate-500 mt-2">{{ stat.sub }}</p>
      </div>
    </div>

    <!-- Insight Card -->
    <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div class="flex items-start gap-4">
        <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-3">
            <h2 class="text-lg font-black text-slate-900">Ringkasan Otomatis</h2>
            <span class="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-full uppercase tracking-wider">{{ scopeLabel }}</span>
          </div>
          <p class="text-base text-slate-700 leading-relaxed">{{ insightText }}</p>
        </div>
      </div>
    </div>

    <!-- Tridarma Performance -->
    <div>
      <h2 class="text-lg font-black text-slate-900 mb-4">Performa Tridarma</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <router-link
          v-for="card in tridarmaCards"
          :key="card.key"
          :to="card.to"
          class="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
        >
          <div class="flex items-start justify-between mb-4">
            <div class="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
              <component :is="card.icon" class="w-5 h-5" />
            </div>
            <span v-if="card.comingSoon" class="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full uppercase tracking-wider">Soon</span>
          </div>
          <h3 class="text-base font-bold text-slate-800 mb-2">{{ card.title }}</h3>
          <div v-if="!card.comingSoon" class="space-y-1.5">
            <div v-for="metric in card.metrics" :key="metric.label" class="flex items-center justify-between">
              <span class="text-xs text-slate-500">{{ metric.label }}</span>
              <span class="text-sm font-bold text-slate-800">{{ metric.value }}</span>
            </div>
          </div>
          <p v-else class="text-xs text-slate-500 leading-relaxed">{{ card.placeholder }}</p>
          <div class="mt-4 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-slate-500 group-hover:text-blue-600 transition-colors">
            <span>Lihat detail</span>
            <svg class="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { prodiRegistry, prodiList } from '../data/prodi/index.js'

const selectedProdi = ref('all')

// === Aggregation ===
const aggregatedData = computed(() => {
  const slugs = selectedProdi.value === 'all'
    ? prodiList.filter(p => p.hasData).map(p => p.slug)
    : [selectedProdi.value]

  let totalDosen = 0
  let totalResearch = 0
  let totalService = 0
  let totalResearchFunding = 0
  let totalServiceFunding = 0
  let totalCitations = 0
  let totalArticles = 0
  let latestSync = null

  slugs.forEach(slug => {
    const data = prodiRegistry[slug]
    if (!data?.sintaData) return
    const summary = data.sintaData.prodiSummary || {}
    totalDosen += summary.lecturerCount || 0
    totalResearch += summary.totalResearchCount || 0
    totalService += summary.totalServiceCount || 0
    totalResearchFunding += summary.totalResearchFunding || 0
    totalServiceFunding += summary.totalServiceFunding || 0

    ;(data.sintaData.lecturers || []).forEach(lec => {
      totalCitations += lec.stats?.googleCitations || 0
      totalArticles += lec.stats?.googleArticles || lec.stats?.articles || 0
    })

    const generated = data.sintaData.metadata?.generatedAt
    if (generated && (!latestSync || generated > latestSync)) latestSync = generated
  })

  return {
    totalDosen,
    totalResearch,
    totalService,
    totalResearchFunding,
    totalServiceFunding,
    totalFunding: totalResearchFunding + totalServiceFunding,
    totalCitations,
    totalArticles,
    latestSync,
  }
})

// === Available Prodi (chips) ===
const availableProdi = computed(() => prodiList)

// === Last sync (relative) ===
const lastSyncRelative = computed(() => {
  const iso = aggregatedData.value.latestSync
  if (!iso) return 'beberapa waktu lalu'
  const diffMs = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (days < 1) return 'hari ini'
  if (days < 30) return `${days} hari lalu`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months} bulan lalu`
  return `${Math.floor(months / 12)} tahun lalu`
})

// === Format Helpers ===
const formatNumber = (n) => new Intl.NumberFormat('id-ID').format(n)
const formatCurrency = (n) => {
  if (n >= 1_000_000_000) return `Rp ${(n / 1_000_000_000).toFixed(1)} M`
  if (n >= 1_000_000) return `Rp ${(n / 1_000_000).toFixed(1)} Jt`
  return `Rp ${formatNumber(n)}`
}

// === Icons (single color, heroicons-style) ===
const PubIcon = { template: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>' }
const ServiceIcon = { template: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>' }
const FundIcon = { template: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>' }
const PeopleIcon = { template: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>' }
const TeachIcon = { template: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>' }
const ResearchIcon = { template: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>' }

// === Stat Cards ===
const statCards = computed(() => [
  {
    key: 'pubs',
    label: 'Publikasi',
    icon: PubIcon,
    value: formatNumber(aggregatedData.value.totalArticles),
    sub: `${formatNumber(aggregatedData.value.totalCitations)} sitasi`,
  },
  {
    key: 'pkm',
    label: 'Pengabdian',
    icon: ServiceIcon,
    value: formatNumber(aggregatedData.value.totalService),
    sub: 'Kegiatan PkM tercatat',
  },
  {
    key: 'fund',
    label: 'Pendanaan',
    icon: FundIcon,
    value: formatCurrency(aggregatedData.value.totalFunding),
    sub: 'Penelitian + PkM',
  },
  {
    key: 'dosen',
    label: 'Dosen Aktif',
    icon: PeopleIcon,
    value: formatNumber(aggregatedData.value.totalDosen),
    sub: selectedProdi.value === 'all' ? `Lintas ${prodiList.filter(p => p.hasData).length} prodi` : null,
  },
])

// === Insight Text ===
const scopeLabel = computed(() => {
  if (selectedProdi.value === 'all') return 'Semua Prodi'
  const p = prodiList.find(x => x.slug === selectedProdi.value)
  return p?.name || ''
})

const insightText = computed(() => {
  const a = aggregatedData.value
  if (a.totalDosen === 0) return 'Belum ada data untuk prodi ini.'
  const scope = selectedProdi.value === 'all'
    ? `${a.totalDosen} dosen aktif di lintas prodi`
    : `${a.totalDosen} dosen di ${scopeLabel.value}`
  return `Berdasarkan data ${scope}, tercatat ${formatNumber(a.totalArticles)} publikasi dengan ${formatNumber(a.totalCitations)} sitasi, ${formatNumber(a.totalResearch)} kegiatan penelitian, dan ${formatNumber(a.totalService)} kegiatan pengabdian. Total pendanaan tridarma yang masuk mencapai ${formatCurrency(a.totalFunding)}.`
})

// === Tridarma Cards ===
const tridarmaCards = computed(() => [
  {
    key: 'pengajaran',
    title: 'Pengajaran',
    icon: TeachIcon,
    to: '/pengajaran',
    comingSoon: true,
    placeholder: 'Data MK, beban SKS, dan bimbingan TA akan tersedia setelah konsolidasi data internal fakultas selesai.',
  },
  {
    key: 'penelitian',
    title: 'Penelitian',
    icon: ResearchIcon,
    to: '/penelitian',
    metrics: [
      { label: 'Publikasi', value: formatNumber(aggregatedData.value.totalArticles) },
      { label: 'Penelitian', value: formatNumber(aggregatedData.value.totalResearch) },
      { label: 'Total Sitasi', value: formatNumber(aggregatedData.value.totalCitations) },
    ],
  },
  {
    key: 'pengabdian',
    title: 'Pengabdian',
    icon: ServiceIcon,
    to: '/pengabdian',
    metrics: [
      { label: 'Kegiatan PkM', value: formatNumber(aggregatedData.value.totalService) },
      { label: 'Dana PkM', value: formatCurrency(aggregatedData.value.totalServiceFunding) },
    ],
  },
])
</script>
