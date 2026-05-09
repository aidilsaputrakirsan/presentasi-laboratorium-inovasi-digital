<template>
  <div class="min-h-[70vh] flex items-center justify-center px-6">
    <div class="max-w-xl w-full text-center">
      <!-- Logo / brand mark -->
      <div class="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-500/30 mb-8">
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <!-- Big 404 with gradient -->
      <h1 class="text-7xl md:text-8xl font-black tracking-tight bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 bg-clip-text text-transparent leading-none">
        404
      </h1>

      <h2 class="mt-4 text-2xl md:text-3xl font-black text-slate-900">
        Halaman tidak ditemukan
      </h2>

      <p class="mt-3 text-sm md:text-base text-slate-500 leading-relaxed max-w-md mx-auto">
        URL yang Anda tuju tidak ada di SITRIA. Kemungkinan tautan sudah berubah,
        salah ketik, atau modul belum tersedia.
      </p>

      <!-- Pretty path indicator -->
      <div v-if="path" class="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-xs font-mono text-slate-600">
        <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        <span>{{ path }}</span>
      </div>

      <!-- Actions -->
      <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
        <router-link
          to="/dashboard"
          class="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Kembali ke Ringkasan
        </router-link>
        <button
          @click="$router.back()"
          class="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-xl border border-slate-200 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Halaman Sebelumnya
        </button>
      </div>

      <!-- Quick links to known modules -->
      <div class="mt-10 pt-8 border-t border-slate-200">
        <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">Atau buka modul</p>
        <div class="flex flex-wrap items-center justify-center gap-2">
          <router-link
            v-for="m in modules"
            :key="m.path"
            :to="m.path"
            class="px-3 py-1.5 bg-white hover:bg-blue-50 hover:text-blue-700 text-xs font-semibold text-slate-600 rounded-full border border-slate-200 transition-colors"
          >
            {{ m.label }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const path = route.fullPath

const modules = [
  { path: '/dashboard', label: 'Ringkasan' },
  { path: '/pengajaran', label: 'Pengajaran' },
  { path: '/penelitian', label: 'Penelitian' },
  { path: '/pengabdian', label: 'Pengabdian' },
  { path: '/sdm-pakar', label: 'SDM & Pakar' },
  { path: '/funding', label: 'Pendanaan' },
]
</script>
