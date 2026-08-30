<template>
  <div class="space-y-6">
    <!-- Tab Navigation -->
    <div class="overflow-x-auto -mx-1 px-1 pb-1 tab-scroll">
      <div class="bg-white rounded-2xl border border-slate-200 p-1.5 shadow-sm inline-flex gap-1">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="activeTab = tab.key"
          class="relative px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap shrink-0"
          :class="activeTab === tab.key
            ? 'bg-blue-50 text-blue-700 shadow-sm'
            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'"
        >
          <component :is="tab.icon" class="w-4 h-4" />
          <span>{{ tab.label }}</span>
        </button>
      </div>
    </div>

    <!-- Tab Content -->
    <transition name="tab" mode="out-in">
      <div :key="activeTab">
        <SintaStatistics v-if="activeTab === 'statistik'" :selectedProdi="defaultProdi" />
        <ResearchGallery v-else-if="activeTab === 'gallery'" />
        <ResearchRoadmap v-else-if="activeTab === 'roadmap'" />
        <ResearchClusters v-else-if="activeTab === 'clusters'" />
        <RoadmapMapping v-else-if="activeTab === 'pemetaan'" :prodiSlug="defaultProdi" />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { prodiList } from '../data/prodi/index.js'
import SintaStatistics from '../components/SintaStatistics.vue'
import ResearchGallery from '../components/ResearchGallery.vue'
import ResearchClusters from '../components/ResearchClusters.vue'
import ResearchRoadmap from '../components/ResearchRoadmap.vue'
import RoadmapMapping from '../components/RoadmapMapping.vue'

const StatIcon = { template: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>' }
const GalleryIcon = { template: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>' }
const RoadmapIcon = { template: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>' }
const MappingIcon = { template: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>' }
const ClusterIcon = { template: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>' }

const tabs = [
  { key: 'statistik', label: 'Statistik', icon: StatIcon },
  { key: 'gallery', label: 'Koleksi Karya', icon: GalleryIcon },
  { key: 'roadmap', label: 'Roadmap & Topik', icon: RoadmapIcon },
  { key: 'clusters', label: 'Kolaborasi & Lab', icon: ClusterIcon },
  { key: 'pemetaan', label: 'Pemetaan Roadmap', icon: MappingIcon },
]

const activeTab = ref('statistik')
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
/* Hide scrollbar visual but keep scrollability for mobile tabs */
.tab-scroll {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.tab-scroll::-webkit-scrollbar {
  display: none;
}
</style>
