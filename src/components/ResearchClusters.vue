<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="card bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-slate-700">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-4">
          <div class="relative">
            <div class="w-14 h-14 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/30">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <div class="absolute inset-0 rounded-2xl bg-violet-500/30 animate-ping"></div>
          </div>
          <div>
            <div class="flex items-center gap-3">
              <h1 class="text-2xl font-black text-white tracking-tight">Kolaborasi Riset</h1>
              <span class="px-2 py-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">AI-Powered</span>
            </div>
            <p class="text-sm text-slate-400 mt-0.5">Pengelompokan Topik Penelitian dengan TF-IDF + K-Means Clustering</p>
          </div>
        </div>
        <div v-if="metadata" class="hidden md:block text-right">
          <span class="text-xs uppercase tracking-wider text-slate-500 font-bold">Last Analysis</span>
          <p class="text-sm font-semibold text-slate-300">{{ formatDate(metadata.generatedAt) }}</p>
        </div>
      </div>

      <!-- Summary Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div class="bg-gradient-to-br from-violet-50 to-violet-100 rounded-xl p-4 text-center border border-violet-200">
          <div class="text-2xl font-black text-violet-600">{{ metadata?.totalClusters || 0 }}</div>
          <div class="text-xs uppercase tracking-wider text-violet-700 mt-1 font-bold">Total Cluster</div>
        </div>
        <div class="bg-gradient-to-br from-fuchsia-50 to-fuchsia-100 rounded-xl p-4 text-center border border-fuchsia-200">
          <div class="text-2xl font-black text-fuchsia-600">{{ metadata?.totalItems || 0 }}</div>
          <div class="text-xs uppercase tracking-wider text-fuchsia-700 mt-1 font-bold">Total Penelitian</div>
        </div>
        <div class="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 text-center border border-emerald-200">
          <div class="text-2xl font-black text-emerald-600">{{ summary?.crossProdiCount || 0 }}</div>
          <div class="text-xs uppercase tracking-wider text-emerald-700 mt-1 font-bold">Cross-Prodi</div>
        </div>
        <div class="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 text-center border border-amber-200">
          <div class="text-2xl font-black text-amber-600">{{ summary?.highPotentialCount || 0 }}</div>
          <div class="text-xs uppercase tracking-wider text-amber-700 mt-1 font-bold">High Potential</div>
        </div>
      </div>
    </div>

    <!-- Filter -->
    <div class="flex flex-wrap gap-3">
      <button 
        v-for="filter in filters" 
        :key="filter.key"
        @click="activeFilter = filter.key"
        :class="[
          'px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200',
          activeFilter === filter.key 
            ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg' 
            : 'bg-white text-slate-600 border border-slate-200 hover:border-violet-300'
        ]"
      >
        {{ filter.label }}
      </button>
    </div>

    <!-- No Data State -->
    <div v-if="!hasData" class="card text-center py-16">
      <svg class="w-20 h-20 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
      </svg>
      <h3 class="text-xl font-bold text-slate-600 mb-2">Belum Ada Data Cluster</h3>
      <p class="text-slate-500 mb-6">Jalankan script clustering terlebih dahulu:</p>
      <code class="bg-slate-100 px-4 py-2 rounded-lg text-sm text-slate-700 font-mono">
        python scripts/research_clustering.py
      </code>
    </div>

    <!-- Clusters Grid -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div 
        v-for="cluster in filteredClusters" 
        :key="cluster.id"
        class="card hover:shadow-lg transition-all duration-300"
        :class="{ 'ring-2 ring-emerald-400 ring-offset-2': cluster.isCrossProdi }"
      >
        <!-- Cluster Header -->
        <div class="flex items-start justify-between mb-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <h3 class="text-lg font-bold text-slate-800">{{ cluster.name }}</h3>
              <span v-if="cluster.isCrossProdi" class="px-2 py-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] font-bold rounded-full">
                CROSS-PRODI
              </span>
            </div>
            <div class="flex flex-wrap gap-1">
              <span 
                v-for="keyword in cluster.keywords" 
                :key="keyword"
                class="px-2 py-0.5 bg-violet-100 text-violet-700 text-xs rounded-full font-medium"
              >
                {{ keyword }}
              </span>
            </div>
          </div>
          <div class="text-right">
            <div :class="[
              'px-3 py-1 rounded-full text-xs font-bold',
              cluster.collaborationPotential === 'high' ? 'bg-amber-100 text-amber-700' :
              cluster.collaborationPotential === 'medium' ? 'bg-blue-100 text-blue-700' :
              'bg-slate-100 text-slate-600'
            ]">
              {{ cluster.collaborationPotential === 'high' ? '🔥 High' : 
                 cluster.collaborationPotential === 'medium' ? '✨ Medium' : '📌 Low' }}
            </div>
          </div>
        </div>

        <!-- Prodi Tags -->
        <div class="flex gap-2 mb-4">
          <span 
            v-for="prodi in cluster.prodis" 
            :key="prodi"
            :class="[
              'px-3 py-1 rounded-lg text-xs font-bold',
              prodi === 'Sistem Informasi' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
            ]"
          >
            {{ prodi === 'Sistem Informasi' ? 'SI' : 'BD' }}
          </span>
          <span class="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">
            {{ cluster.count }} items
          </span>
          <span class="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">
            {{ cluster.authors.length }} dosen
          </span>
        </div>

        <!-- Research Items (Collapsed) -->
        <div class="space-y-2 max-h-48 overflow-y-auto">
          <div 
            v-for="(item, idx) in cluster.items.slice(0, expandedClusters.includes(cluster.id) ? undefined : 3)" 
            :key="idx"
            class="p-3 bg-slate-50 rounded-lg border border-slate-100"
          >
            <p class="text-sm text-slate-700 font-medium line-clamp-2">{{ item.title }}</p>
            <div class="flex items-center gap-2 mt-1 text-xs text-slate-500">
              <span class="font-medium">{{ item.author }}</span>
              <span class="text-slate-300">|</span>
              <span :class="item.prodi === 'Sistem Informasi' ? 'text-blue-600' : 'text-pink-600'">
                {{ item.prodi === 'Sistem Informasi' ? 'SI' : 'BD' }}
              </span>
              <span v-if="item.year" class="text-slate-300">|</span>
              <span v-if="item.year">{{ item.year }}</span>
            </div>
          </div>
        </div>

        <!-- Expand Button -->
        <button 
          v-if="cluster.items.length > 3"
          @click="toggleExpand(cluster.id)"
          class="mt-3 text-sm text-violet-600 font-medium hover:text-violet-800 transition-colors"
        >
          {{ expandedClusters.includes(cluster.id) ? '↑ Tutup' : `↓ Lihat semua (${cluster.items.length})` }}
        </button>
      </div>
    </div>

    <!-- Info -->
    <div class="text-center text-sm text-slate-500 pt-4">
      <p>Clustering menggunakan <strong>TF-IDF + K-Means</strong> | Potensi kolaborasi dihitung berdasarkan cross-prodi dan jumlah dosen</p>
    </div>
  </div>
</template>

<script>
import clustersData from '../data/clusters_data.json';

export default {
  name: 'ResearchClusters',
  data() {
    return {
      activeFilter: 'all',
      expandedClusters: [],
      filters: [
        { key: 'all', label: 'Semua Cluster' },
        { key: 'crossProdi', label: '🤝 Cross-Prodi' },
        { key: 'highPotential', label: '🔥 High Potential' },
        { key: 'si', label: 'Sistem Informasi' },
        { key: 'bd', label: 'Bisnis Digital' }
      ]
    };
  },
  computed: {
    hasData() {
      return clustersData && clustersData.clusters && Object.keys(clustersData.clusters).length > 0;
    },
    metadata() {
      return clustersData?.metadata || null;
    },
    summary() {
      return clustersData?.summary || null;
    },
    clusters() {
      if (!clustersData?.clusters) return [];
      return Object.values(clustersData.clusters).sort((a, b) => b.count - a.count);
    },
    filteredClusters() {
      if (this.activeFilter === 'all') return this.clusters;
      if (this.activeFilter === 'crossProdi') return this.clusters.filter(c => c.isCrossProdi);
      if (this.activeFilter === 'highPotential') return this.clusters.filter(c => c.collaborationPotential === 'high');
      if (this.activeFilter === 'si') return this.clusters.filter(c => c.prodis.includes('Sistem Informasi') && !c.isCrossProdi);
      if (this.activeFilter === 'bd') return this.clusters.filter(c => c.prodis.includes('Bisnis Digital') && !c.isCrossProdi);
      return this.clusters;
    }
  },
  methods: {
    toggleExpand(clusterId) {
      const idx = this.expandedClusters.indexOf(clusterId);
      if (idx > -1) {
        this.expandedClusters.splice(idx, 1);
      } else {
        this.expandedClusters.push(clusterId);
      }
    },
    formatDate(dateStr) {
      if (!dateStr) return '';
      return new Date(dateStr).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }
};
</script>

<style scoped>
.card {
  @apply bg-white p-5 rounded-2xl border border-slate-200 shadow-sm;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
