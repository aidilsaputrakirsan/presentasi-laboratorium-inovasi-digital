<template>
  <div class="flex items-center gap-3 text-sm">
    <!-- Cache Status Badge -->
    <div v-if="cacheInfo" class="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
      <svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
        <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z"></path>
        <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z"></path>
        <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z"></path>
      </svg>
      <div class="flex flex-col">
        <span class="text-green-700 font-medium">
          {{ cacheInfo.fromCache ? 'Dari Cache' : 'Data Baru' }}
        </span>
        <span v-if="cacheInfo.cacheMetadata && cacheInfo.cacheMetadata.lastUpdated" class="text-xs text-green-600">
          {{ formatLastUpdated(cacheInfo.cacheMetadata.lastUpdated) }}
        </span>
      </div>
    </div>

    <!-- Refresh Button -->
    <button
      @click="handleRefresh"
      :disabled="refreshing"
      class="flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-primary-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      :class="{ 'animate-pulse': refreshing }"
    >
      <svg 
        :class="['w-4 h-4 text-slate-600', { 'animate-spin': refreshing }]" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
      </svg>
      <span class="text-slate-700 font-medium">
        {{ refreshing ? 'Memperbarui...' : 'Perbarui Data' }}
      </span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'CacheStatus',
  props: {
    cacheInfo: {
      type: Object,
      default: null
    },
    refreshing: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleRefresh() {
      this.$emit('refresh');
    },
    
    formatLastUpdated(isoString) {
      if (!isoString) return '';
      
      const date = new Date(isoString);
      const now = new Date();
      
      // Format tanggal Indonesia
      const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
      
      const dayName = days[date.getDay()];
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      
      // Cek apakah hari ini
      const isToday = date.toDateString() === now.toDateString();
      
      if (isToday) {
        return `Hari ini, ${hours}:${minutes}`;
      }
      
      // Cek apakah kemarin
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      const isYesterday = date.toDateString() === yesterday.toDateString();
      
      if (isYesterday) {
        return `Kemarin, ${hours}:${minutes}`;
      }
      
      // Format lengkap: Senin, 20 Jan 2026 14:30
      return `${dayName}, ${day} ${month} ${year} ${hours}:${minutes}`;
    }
  }
}
</script>
