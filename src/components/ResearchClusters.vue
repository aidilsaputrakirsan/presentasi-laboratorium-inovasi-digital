<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="card bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-slate-700">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-4">
          <div class="relative">
            <div class="w-14 h-14 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/30">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <div class="absolute inset-0 rounded-2xl bg-violet-500/30 animate-ping"></div>
          </div>
          <div>
            <div class="flex items-center gap-3">
              <h1 class="text-2xl font-black text-white tracking-tight">Kolaborasi Riset</h1>
              <span class="px-2 py-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">AI-Powered</span>
            </div>
            <p class="text-sm text-slate-400 mt-0.5">Pengelompokan topik dengan TF-IDF + K-Means Clustering</p>
          </div>
        </div>
        <div v-if="metadata" class="hidden md:block text-right">
          <span class="text-xs uppercase tracking-wider text-slate-500 font-bold">Last Analysis</span>
          <p class="text-sm font-semibold text-slate-300">{{ formatDate(metadata.generatedAt) }}</p>
        </div>
      </div>

      <!-- Summary Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div class="bg-white/5 rounded-xl p-4 text-center border border-white/10">
          <div class="text-2xl font-black text-violet-300">{{ activeSummary?.totalClusters || 0 }}</div>
          <div class="text-xs uppercase tracking-wider text-slate-400 mt-1 font-bold">Klaster Topik</div>
        </div>
        <div class="bg-white/5 rounded-xl p-4 text-center border border-white/10">
          <div class="text-2xl font-black text-fuchsia-300">{{ activeSummary?.totalItems || 0 }}</div>
          <div class="text-xs uppercase tracking-wider text-slate-400 mt-1 font-bold">
            {{ activeType === 'penelitian' ? 'Total Penelitian' : 'Total Pengabdian' }}
          </div>
        </div>
        <div class="bg-white/5 rounded-xl p-4 text-center border border-white/10">
          <div class="text-2xl font-black text-emerald-300">{{ activeSummary?.crossProdiCount || 0 }}</div>
          <div class="text-xs uppercase tracking-wider text-slate-400 mt-1 font-bold">Topik Lintas Prodi</div>
        </div>
        <div class="bg-white/5 rounded-xl p-4 text-center border border-white/10">
          <div class="text-2xl font-black text-amber-300">{{ activeSummary?.highPotentialCount || 0 }}</div>
          <div class="text-xs uppercase tracking-wider text-slate-400 mt-1 font-bold">Siap Kolaborasi</div>
        </div>
      </div>
    </div>

    <!-- Tabs + Filter -->
    <div class="flex flex-wrap items-center gap-3">
      <!-- Penelitian / Pengabdian -->
      <div class="flex gap-1 bg-slate-100 p-1 rounded-xl">
        <button
          @click="activeType = 'penelitian'; activeFilter = 'all'"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200',
            activeType === 'penelitian' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          ]"
        >🔬 Penelitian</button>
        <button
          @click="activeType = 'pengabdian'; activeFilter = 'all'"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200',
            activeType === 'pengabdian' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          ]"
        >🤝 Pengabdian</button>
      </div>

      <!-- Divider -->
      <div class="h-6 w-px bg-slate-200 hidden sm:block"></div>

      <!-- Filter chips — 3 opsi saja, label to the point -->
      <div class="flex gap-2 flex-wrap">
        <button
          v-for="filter in filters"
          :key="filter.key"
          @click="activeFilter = filter.key"
          :class="[
            'px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 border',
            activeFilter === filter.key
              ? 'bg-violet-600 text-white border-violet-600 shadow'
              : 'bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-600'
          ]"
        >{{ filter.label }}</button>
      </div>

      <!-- Count -->
      <span class="ml-auto text-xs text-slate-400 font-medium hidden sm:block">
        {{ filteredClusters.length }} klaster ditampilkan
      </span>
    </div>

    <!-- No Data -->
    <div v-if="!hasData" class="card text-center py-16">
      <svg class="w-20 h-20 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
      </svg>
      <h3 class="text-xl font-bold text-slate-600 mb-2">Belum Ada Data Cluster</h3>
      <p class="text-slate-500 mb-4">Jalankan script clustering terlebih dahulu:</p>
      <code class="bg-slate-100 px-4 py-2 rounded-lg text-sm text-slate-700 font-mono">
        python scripts/research_clustering.py
      </code>
    </div>

    <!-- Clusters Grid -->
    <div v-else class="grid grid-cols-1 xl:grid-cols-2 gap-5">
      <div
        v-for="cluster in filteredClusters"
        :key="cluster.id"
        class="bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
        :class="cluster.isCrossProdi ? 'border-violet-200' : 'border-slate-200'"
      >
        <!-- Card Header -->
        <div
          class="px-5 pt-5 pb-4 border-b"
          :class="cluster.isCrossProdi ? 'border-violet-100 bg-violet-50/40' : 'border-slate-100'"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="flex-1 min-w-0">
              <!-- Label -->
              <p class="text-[10px] font-bold uppercase tracking-widest text-violet-400 mb-1">Topik Rekomendasi</p>
              <!-- Nama cluster -->
              <h3 class="text-base font-bold text-slate-800 leading-snug mb-2">{{ clusterDisplayName(cluster) }}</h3>

              <!-- Keywords — sudah deduplikasi -->
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="kw in cleanKeywords(cluster.keywords)"
                  :key="kw"
                  class="px-2 py-0.5 bg-violet-100 text-violet-700 text-xs rounded-full font-medium"
                >{{ kw }}</span>
              </div>
            </div>

            <!-- Badge status kolaborasi -->
            <div class="shrink-0 flex flex-col items-end gap-1.5">
              <span
                v-if="cluster.isCrossProdi"
                class="inline-flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-blue-500 to-pink-500 text-white text-[10px] font-bold rounded-full"
              >
                <span class="w-1.5 h-1.5 bg-white rounded-full"></span>SI + BD
              </span>
              <span
                v-if="cluster.collaborationPotential === 'high'"
                class="px-2.5 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full"
              >🤝 Siap Kolaborasi</span>
            </div>
          </div>

          <!-- Meta row -->
          <div class="flex items-center gap-2 mt-3 flex-wrap">
            <span
              v-for="prodi in cluster.prodis"
              :key="prodi"
              :class="['px-2.5 py-0.5 rounded-md text-xs font-bold', prodi === 'Sistem Informasi' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700']"
            >{{ prodi === 'Sistem Informasi' ? 'SI' : 'BD' }}</span>
            <span class="px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-md text-xs font-bold">
              {{ cluster.count }} karya
            </span>
            <span class="px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-md text-xs font-bold">
              {{ cluster.authors.length }} dosen
            </span>
          </div>
        </div>

        <!-- Items List -->
        <div class="px-5 py-3 space-y-2">
          <div
            v-for="(item, idx) in displayedItems(cluster)"
            :key="idx"
            class="py-2.5 border-b border-slate-50 last:border-0"
          >
            <p class="text-sm text-slate-700 font-medium leading-snug line-clamp-2">{{ item.title }}</p>
            <div class="flex items-center gap-2 mt-1 text-xs text-slate-400">
              <span class="font-medium text-slate-500">{{ item.author }}</span>
              <span>·</span>
              <span :class="item.prodi === 'Sistem Informasi' ? 'text-blue-500' : 'text-pink-500'" class="font-semibold">
                {{ item.prodi === 'Sistem Informasi' ? 'SI' : 'BD' }}
              </span>
              <span v-if="item.year">· {{ item.year }}</span>
            </div>
          </div>
        </div>

        <!-- Footer: expand/collapse -->
        <div v-if="cluster.items.length > 3" class="px-5 pb-4">
          <button
            @click="toggleExpand(cluster.id)"
            class="w-full py-2 rounded-xl text-xs font-bold text-violet-600 bg-violet-50 hover:bg-violet-100 transition-colors"
          >
            {{ expandedClusters.includes(cluster.id)
              ? '↑ Sembunyikan'
              : `↓ Tampilkan semua ${cluster.items.length} karya` }}
          </button>
        </div>
      </div>
    </div>

    <!-- Footer info -->
    <p class="text-center text-xs text-slate-400 pt-2">
      Clustering menggunakan <strong>TF-IDF + K-Means</strong> · Keyword dipilih dari centroid TF-IDF tiap klaster
    </p>
  </div>
</template>

<script>
import { prodiRegistry, prodiList } from '../data/prodi/index.js';

export default {
  name: 'ResearchClusters',
  data() {
    return {
      activeType: 'penelitian',
      activeFilter: 'all',
      expandedClusters: [],
      filters: [
        { key: 'all',           label: 'Semua Klaster' },
        { key: 'crossProdi',    label: '🔗 Lintas Prodi (SI+BD)' },
        { key: 'highPotential', label: '🤝 Siap Kolaborasi' },
      ]
    };
  },
  computed: {
    combinedClustersData() {
      const result = {
        penelitian: {},
        pengabdian: {},
        metadata: { generatedAt: null, totalPenelitian: 0, totalPengabdian: 0, totalItems: 0 },
        summary: {
          penelitian: { crossProdiCount: 0, highPotentialCount: 0, totalClusters: 0, totalItems: 0 },
          pengabdian: { crossProdiCount: 0, highPotentialCount: 0, totalClusters: 0, totalItems: 0 }
        }
      };

      prodiList.filter(p => p.hasData).forEach(p => {
        const data = prodiRegistry[p.slug];
        if (!data?.clustersData) return;
        const cd = data.clustersData;

        if (cd.metadata) {
          result.metadata.generatedAt = cd.metadata.generatedAt;
          result.metadata.totalPenelitian += cd.metadata.totalPenelitian || 0;
          result.metadata.totalPengabdian += cd.metadata.totalPengabdian || 0;
          result.metadata.totalItems += cd.metadata.totalItems || 0;
        }

        const clustersPenelitian = cd.clusters?.penelitian || {};
        const clustersPengabdian = cd.clusters?.pengabdian || {};
        this._mergeClusters(result.penelitian, clustersPenelitian);
        this._mergeClusters(result.pengabdian, clustersPengabdian);
      });

      ['penelitian', 'pengabdian'].forEach(type => {
        const clusters = result[type];
        for (const cluster of Object.values(clusters)) {
          // Deduplikasi judul: judul yang sama (ketua + anggota) → ambil yang pertama saja
          const seen = new Set();
          cluster.items = cluster.items.filter(item => {
            const key = item.title.trim().toLowerCase();
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });

          const prodis = [...new Set(cluster.items.map(i => i.prodi))];
          cluster.prodis = prodis;
          cluster.isCrossProdi = prodis.length > 1;
          const authors = [...new Set(cluster.items.map(i => i.author))];
          cluster.authors = authors;
          cluster.count = cluster.items.length;
          cluster.collaborationPotential =
            cluster.isCrossProdi && authors.length >= 3 ? 'high' :
            cluster.isCrossProdi || authors.length >= 2 ? 'medium' : 'low';
        }
        const vals = Object.values(clusters);
        result.summary[type] = {
          totalClusters: vals.length,
          totalItems: vals.reduce((s, c) => s + c.count, 0),
          crossProdiCount: vals.filter(c => c.isCrossProdi).length,
          highPotentialCount: vals.filter(c => c.collaborationPotential === 'high').length,
        };
      });

      return result;
    },

    metadata() { return this.combinedClustersData.metadata; },
    activeSummary() { return this.combinedClustersData.summary[this.activeType]; },
    hasData() {
      const d = this.combinedClustersData;
      return Object.keys(d.penelitian).length > 0 || Object.keys(d.pengabdian).length > 0;
    },

    activeClusters() {
      return Object.values(this.combinedClustersData[this.activeType])
        .sort((a, b) => b.count - a.count);
    },

    filteredClusters() {
      const c = this.activeClusters;
      if (this.activeFilter === 'crossProdi')    return c.filter(x => x.isCrossProdi);
      if (this.activeFilter === 'highPotential') return c.filter(x => x.collaborationPotential === 'high');
      return c;
    }
  },
  methods: {
    // Kata-kata generik yang tidak bermakna sebagai label topik
    _genericWords() {
      return new Set([
        'home', 'itk', 'terpadu', 'institut', 'teknologi', 'digital',
        'sistem', 'informasi', 'aplikasi', 'data', 'model', 'platform',
        'metode', 'analisis', 'pengembangan', 'implementasi', 'perancangan',
        'indonesia', 'nasional', 'lokal', 'kota', 'daerah', 'wilayah',
        'masyarakat', 'kelompok', 'mahasiswa', 'dosen', 'siswa',
        'balikpapan', 'kalimantan', 'timur', 'lab', 'laboratorium',
        'hukum', // terlalu luas sebagai topik
      ]);
    },

    // Deduplikasi keyword: buang unigram yang sudah terkandung di dalam bigram,
    // dan buang kata-kata yang terlalu generik
    cleanKeywords(keywords) {
      if (!keywords?.length) return [];
      const generic  = this._genericWords();
      const bigrams  = keywords.filter(kw => kw.includes(' '));
      const unigrams = keywords.filter(kw => !kw.includes(' ') && !generic.has(kw.toLowerCase()));
      const bgWords  = new Set(bigrams.flatMap(bg => bg.split(' ')));
      return [...bigrams, ...unigrams.filter(u => !bgWords.has(u))];
    },

    // Nama cluster: pakai field name dari JSON (sudah dikurasi manual),
    // fallback ke keywords hanya kalau name kosong/masih format lama
    clusterDisplayName(cluster) {
      if (cluster.name && cluster.name.trim()) return cluster.name;
      const clean = this.cleanKeywords(cluster.keywords);
      if (!clean.length) return 'Topik Umum';
      return clean.slice(0, 3)
        .map(kw => kw.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()))
        .join(' & ');
    },

    // Tampilkan 3 item atau semua jika expanded
    displayedItems(cluster) {
      return this.expandedClusters.includes(cluster.id)
        ? cluster.items
        : cluster.items.slice(0, 3);
    },

    _mergeClusters(target, source) {
      for (const [id, cluster] of Object.entries(source)) {
        if (!target[id]) {
          target[id] = { ...cluster, items: [...cluster.items] };
        } else {
          target[id].items.push(...cluster.items);
          target[id].count = target[id].items.length;
        }
      }
    },

    toggleExpand(clusterId) {
      const idx = this.expandedClusters.indexOf(clusterId);
      if (idx > -1) this.expandedClusters.splice(idx, 1);
      else this.expandedClusters.push(clusterId);
    },

    formatDate(dateStr) {
      if (!dateStr) return '';
      return new Date(dateStr).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });
    }
  }
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
