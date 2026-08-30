<template>
  <div class="space-y-6">
    <!-- Mode Banner -->
    <div class="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-bold text-slate-800">Modul Pengabdian kepada Masyarakat</p>
        <p class="text-xs text-slate-500">Data kegiatan PkM dosen, mitra, dan klaster kolaborasi — bersumber dari SINTA Kemendiktisaintek</p>
      </div>
    </div>

    <!-- Tab Navigation -->
    <div class="bg-white rounded-2xl border border-slate-200 p-1.5 shadow-sm inline-flex gap-1">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        @click="activeTab = tab.key"
        class="relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2"
        :class="activeTab === tab.key
          ? 'bg-blue-50 text-blue-700 shadow-sm'
          : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'"
      >
        <component :is="tab.icon" class="w-4 h-4" />
        <span>{{ tab.label }}</span>
      </button>
    </div>

    <!-- Tab Content -->
    <transition name="tab" mode="out-in">
      <div :key="activeTab">
        <ResearchGallery v-if="activeTab === 'kegiatan'" initial-tab="services" />
        <ResearchClusters v-else-if="activeTab === 'klaster'" initial-type="pengabdian" />
        <RoadmapMapping v-else-if="activeTab === 'pemetaan'" :prodiSlug="defaultProdi" dataset="services" />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { prodiList } from '../data/prodi/index.js'
import ResearchGallery from '../components/ResearchGallery.vue'
import ResearchClusters from '../components/ResearchClusters.vue'
import RoadmapMapping from '../components/RoadmapMapping.vue'

const ServiceIcon = { template: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>' }
const NetworkIcon = { template: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>' }

const MappingIcon = { template: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>' }

const tabs = [
  { key: 'kegiatan', label: 'Kegiatan PkM', icon: ServiceIcon },
  { key: 'klaster', label: 'Klaster & Mitra', icon: NetworkIcon },
  { key: 'pemetaan', label: 'Pemetaan Roadmap', icon: MappingIcon },
]

const activeTab = ref('kegiatan')
const defaultProdi = computed(() => prodiList.find(p => p.hasData)?.slug || null)
</script>

<style scoped>
.tab-enter-active,
.tab-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.tab-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.tab-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
