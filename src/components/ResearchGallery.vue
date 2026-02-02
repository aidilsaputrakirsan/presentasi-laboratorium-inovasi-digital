<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="card bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-slate-700">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-4">
          <div class="relative">
            <div class="w-14 h-14 bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-500/30">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <div class="absolute inset-0 rounded-2xl bg-rose-500/30 animate-ping"></div>
          </div>
          <div>
            <div class="flex items-center gap-3">
              <h1 class="text-2xl font-black text-white tracking-tight">Koleksi Karya</h1>
              <span class="px-2 py-0.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">{{ totalItems }} Items</span>
            </div>
            <p class="text-sm text-slate-400 mt-0.5">Kumpulan Penelitian, Pengabdian, Publikasi & HKI Dosen</p>
          </div>
        </div>
      </div>

      <!-- Filters Row -->
      <div class="flex flex-wrap gap-3 items-center">
        <!-- Prodi Filter -->
        <select v-model="selectedProdi" class="bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium border border-slate-600 focus:border-rose-500 focus:outline-none">
          <option value="all">Semua Prodi</option>
          <option value="Sistem Informasi">Sistem Informasi</option>
          <option value="Bisnis Digital">Bisnis Digital</option>
        </select>

        <!-- Search -->
        <div class="flex-1 min-w-[200px]">
          <div class="relative">
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Cari judul atau nama dosen..." 
              class="w-full bg-slate-700 text-white px-4 py-2 pl-10 rounded-lg text-sm border border-slate-600 focus:border-rose-500 focus:outline-none placeholder-slate-400"
            />
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>

        <!-- Year Filter -->
        <select v-model="selectedYear" class="bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium border border-slate-600 focus:border-rose-500 focus:outline-none">
          <option value="all">Semua Tahun</option>
          <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
        </select>
      </div>
    </div>

    <!-- Category Tabs -->
    <div class="flex flex-wrap gap-2">
      <button 
        v-for="tab in tabs" 
        :key="tab.key"
        @click="activeTab = tab.key"
        :class="[
          'px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2',
          activeTab === tab.key 
            ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/25' 
            : 'bg-white text-slate-600 border border-slate-200 hover:border-rose-300 hover:text-rose-600'
        ]"
      >
        <span>{{ tab.icon }}</span>
        <span>{{ tab.label }}</span>
        <span :class="[
          'px-2 py-0.5 rounded-full text-xs',
          activeTab === tab.key ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
        ]">{{ getTabCount(tab.key) }}</span>
      </button>
    </div>

    <!-- Content Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div 
        v-for="(item, index) in filteredItems" 
        :key="`${item.type}-${index}`"
        class="card group hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      >
        <!-- Category Badge -->
        <div class="flex items-center justify-between mb-3">
          <span :class="getBadgeClass(item)">{{ getBadgeText(item) }}</span>
          <span v-if="item.year" class="text-xs text-slate-400 font-medium">{{ item.year }}</span>
        </div>

        <!-- Title -->
        <h3 class="font-bold text-slate-800 text-sm leading-relaxed mb-3 group-hover:text-rose-600 transition-colors line-clamp-3">
          {{ item.title }}
        </h3>

        <!-- Author -->
        <div class="flex items-center gap-2 text-xs text-slate-500">
          <div class="w-6 h-6 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center">
            <svg class="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
          <span class="font-medium truncate">{{ item.author }}</span>
          <span class="text-slate-300">|</span>
          <span class="text-slate-400">{{ item.prodi }}</span>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredItems.length === 0" class="card text-center py-12">
      <svg class="w-16 h-16 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <h3 class="text-lg font-bold text-slate-600 mb-1">Tidak ada data ditemukan</h3>
      <p class="text-sm text-slate-400">Coba ubah filter atau kata kunci pencarian</p>
    </div>

    <!-- Stats Footer -->
    <div class="text-center text-sm text-slate-500 pt-4">
      <span>Menampilkan <strong class="text-slate-700">{{ filteredItems.length }}</strong> dari <strong class="text-slate-700">{{ totalItems }}</strong> karya</span>
    </div>
  </div>
</template>

<script>
import sintaData from '../data/sinta_data.json';

export default {
  name: 'ResearchGallery',
  data() {
    return {
      activeTab: 'research',
      selectedProdi: 'all',
      selectedYear: 'all',
      searchQuery: '',
      tabs: [
        { key: 'research', label: 'Penelitian', icon: '🔬' },
        { key: 'services', label: 'Pengabdian', icon: '🤝' },
        { key: 'scopus', label: 'Scopus', icon: '📊' },
        { key: 'sinta', label: 'SINTA', icon: '📑' },
        { key: 'books', label: 'Buku', icon: '📚' },
        { key: 'ipr', label: 'HKI', icon: '💡' }
      ]
    };
  },
  computed: {
    lecturers() {
      return sintaData?.lecturers || [];
    },

    allItems() {
      const items = [];
      
      this.lecturers.forEach(lec => {
        // Research
        (lec.research || []).forEach(r => {
          items.push({
            type: 'research',
            title: r.title,
            year: r.year,
            author: lec.name,
            prodi: lec.prodi
          });
        });

        // Services
        (lec.services || []).forEach(s => {
          items.push({
            type: 'services',
            title: s.title,
            year: s.year,
            author: lec.name,
            prodi: lec.prodi
          });
        });

        // Scopus & SINTA Documents
        (lec.documents?.list || []).forEach(d => {
          items.push({
            type: d.category === 'scopus' ? 'scopus' : 'sinta',
            title: d.title,
            q: d.q || '',
            rank: d.rank || '',
            author: lec.name,
            prodi: lec.prodi
          });
        });

        // Books
        (lec.books || []).forEach(b => {
          items.push({
            type: 'books',
            title: b.title,
            year: b.year,
            author: lec.name,
            prodi: lec.prodi
          });
        });

        // IPR
        (lec.ipr?.list || []).forEach(i => {
          items.push({
            type: 'ipr',
            title: i.title,
            category: i.category,
            author: lec.name,
            prodi: lec.prodi
          });
        });
      });

      return items;
    },

    totalItems() {
      return this.allItems.length;
    },

    availableYears() {
      const years = new Set();
      this.allItems.forEach(item => {
        if (item.year) years.add(item.year);
      });
      return [...years].sort((a, b) => b - a);
    },

    filteredItems() {
      return this.allItems.filter(item => {
        // Filter by tab/type
        if (item.type !== this.activeTab) return false;

        // Filter by prodi
        if (this.selectedProdi !== 'all' && item.prodi !== this.selectedProdi) return false;

        // Filter by year
        if (this.selectedYear !== 'all' && item.year !== this.selectedYear) return false;

        // Filter by search
        if (this.searchQuery) {
          const query = this.searchQuery.toLowerCase();
          const matchTitle = item.title?.toLowerCase().includes(query);
          const matchAuthor = item.author?.toLowerCase().includes(query);
          if (!matchTitle && !matchAuthor) return false;
        }

        return true;
      });
    }
  },

  methods: {
    getTabCount(tabKey) {
      let items = this.allItems.filter(i => i.type === tabKey);
      
      if (this.selectedProdi !== 'all') {
        items = items.filter(i => i.prodi === this.selectedProdi);
      }
      
      return items.length;
    },

    getBadgeClass(item) {
      const base = 'px-2 py-1 rounded-lg text-xs font-bold';
      
      if (item.type === 'research') return `${base} bg-blue-100 text-blue-700`;
      if (item.type === 'services') return `${base} bg-emerald-100 text-emerald-700`;
      if (item.type === 'scopus') {
        if (item.q === 'Q1') return `${base} bg-indigo-200 text-indigo-800`;
        if (item.q === 'Q2') return `${base} bg-indigo-100 text-indigo-700`;
        if (item.q === 'Q3') return `${base} bg-indigo-50 text-indigo-600`;
        if (item.q === 'Q4') return `${base} bg-slate-100 text-indigo-500`;
        return `${base} bg-slate-100 text-slate-500`;
      }
      if (item.type === 'sinta') {
        if (item.rank === 'S1') return `${base} bg-sky-200 text-sky-800`;
        if (item.rank === 'S2') return `${base} bg-sky-100 text-sky-700`;
        if (item.rank === 'S3') return `${base} bg-sky-50 text-sky-600`;
        return `${base} bg-slate-100 text-sky-500`;
      }
      if (item.type === 'books') return `${base} bg-teal-100 text-teal-700`;
      if (item.type === 'ipr') {
        if (item.category === 'hakCipta') return `${base} bg-amber-100 text-amber-700`;
        if (item.category === 'paten') return `${base} bg-purple-100 text-purple-700`;
        return `${base} bg-slate-100 text-slate-600`;
      }
      
      return `${base} bg-slate-100 text-slate-600`;
    },

    getBadgeText(item) {
      if (item.type === 'research') return 'Penelitian';
      if (item.type === 'services') return 'Pengabdian';
      if (item.type === 'scopus') return item.q ? `Scopus ${item.q}` : 'Scopus';
      if (item.type === 'sinta') return item.rank ? `SINTA ${item.rank}` : 'SINTA';
      if (item.type === 'books') return 'Buku';
      if (item.type === 'ipr') {
        if (item.category === 'hakCipta') return 'Hak Cipta';
        if (item.category === 'paten') return 'Paten';
        return 'HKI';
      }
      return item.type;
    }
  }
};
</script>

<style scoped>
.card {
  @apply bg-white p-5 rounded-2xl border border-slate-200 shadow-sm;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
