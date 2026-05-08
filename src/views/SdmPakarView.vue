<template>
  <div class="space-y-6">
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
        <DTPSAkreditasi v-if="activeTab === 'akreditasi'" />
        <ExpertiseFinder v-else-if="activeTab === 'pakar'" />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DTPSAkreditasi from '../components/DTPSAkreditasi.vue'
import ExpertiseFinder from '../components/ExpertiseFinder.vue'

const DTPSIcon = { template: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>' }
const ExpertiseIcon = { template: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>' }

const tabs = [
  { key: 'akreditasi', label: 'DTPS Akreditasi', icon: DTPSIcon },
  { key: 'pakar', label: 'Cari Pakar', icon: ExpertiseIcon },
]

const activeTab = ref('akreditasi')
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
