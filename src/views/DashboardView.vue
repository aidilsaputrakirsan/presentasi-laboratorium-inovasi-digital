<template>
  <div class="space-y-6">
    <!-- Prodi Selector -->
    <ProdiSelector 
      :selectedProdi="selectedProdi"
      @select="handleProdiSelect"
    />

    <!-- SINTA Dashboard (shown when prodi is selected) -->
    <transition name="fade" mode="out-in">
      <div v-if="selectedProdi">
        <SintaStatistics :selectedProdi="selectedProdi" />
      </div>
      <div v-else class="flex flex-col items-center justify-center py-20 text-slate-400 bg-white rounded-2xl border-2 border-dashed border-slate-200">
        <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
        </div>
        <p class="font-medium">Pilih Program Studi untuk melihat statistik</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProdiSelector from '../components/ProdiSelector.vue'
import SintaStatistics from '../components/SintaStatistics.vue'

const selectedProdi = ref(null)

const handleProdiSelect = (prodiKey) => {
  selectedProdi.value = prodiKey
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
