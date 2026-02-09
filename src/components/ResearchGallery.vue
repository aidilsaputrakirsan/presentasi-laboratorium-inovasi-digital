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
          <option v-for="p in availableProdi" :key="p.slug" :value="p.name">{{ p.name }}</option>
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

    <!-- Trend Chart: Penelitian & Pengabdian per Tahun -->
    <div class="card hover:shadow-lg transition-shadow">
      <div class="mb-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"></span>
            <h3 class="text-lg font-bold text-slate-800">Tren Penelitian & Pengabdian</h3>
          </div>
          <div class="flex gap-2 text-[10px] uppercase tracking-tighter">
            <span class="px-2 py-0.5 bg-blue-100 text-blue-700 rounded flex items-center gap-1">
              <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
              Penelitian
            </span>
            <span class="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded flex items-center gap-1">
              <span class="w-2 h-2 bg-emerald-500 rounded-full"></span>
              Pengabdian
            </span>
          </div>
        </div>
        <p class="text-xs text-slate-400 mt-1">
          Data {{ selectedProdi === 'all' ? 'semua prodi' : selectedProdi }} dari tahun {{ chartYears[0] || '-' }} hingga {{ chartYears[chartYears.length - 1] || '-' }}
        </p>
      </div>
      <div class="h-64">
        <Line :data="trendChartData" :options="trendChartOptions" />
      </div>
      <!-- Summary Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-100">
        <div class="text-center">
          <div class="text-xl font-black text-blue-600">{{ totalResearchFiltered }}</div>
          <div class="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Total Penelitian</div>
        </div>
        <div class="text-center">
          <div class="text-xl font-black text-emerald-600">{{ totalServicesFiltered }}</div>
          <div class="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Total Pengabdian</div>
        </div>
        <div class="text-center">
          <div class="text-xl font-black text-purple-600">{{ peakYear.year || '-' }}</div>
          <div class="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Tahun Terbanyak</div>
        </div>
        <div class="text-center">
          <div class="text-xl font-black text-rose-600">{{ peakYear.total || 0 }}</div>
          <div class="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Karya di {{ peakYear.year || '-' }}</div>
        </div>
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
        <!-- Image -->
        <div class="aspect-video w-full rounded-lg overflow-hidden mb-3 bg-slate-100 relative group-hover:shadow-inner">
          <img 
            :src="item.image" 
            :alt="item.title"
            loading="lazy"
            class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <!-- Category Badge -->
        <div class="flex items-center justify-between mb-2">
          <span :class="getBadgeClass(item)">{{ getBadgeText(item) }}</span>
          <span v-if="item.year" class="text-xs text-slate-400 font-medium">{{ item.year }}</span>
        </div>

        <!-- Title -->
        <h3 class="font-bold text-slate-800 text-sm leading-relaxed mb-3 group-hover:text-rose-600 transition-colors line-clamp-2" :title="item.title">
          {{ item.title }}
        </h3>

        <!-- Author -->
        <div class="flex items-center gap-2 text-xs text-slate-500 mt-auto">
          <div class="w-6 h-6 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center flex-shrink-0">
            <svg class="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
          <div class="flex flex-col min-w-0">
             <span class="font-medium truncate">{{ item.author }}</span>
             <span class="text-slate-400 text-[10px] truncate">{{ item.prodi }}</span>
          </div>
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
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { prodiRegistry, prodiList } from '../data/prodi/index.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default {
  name: 'ResearchGallery',
  components: {
    Line
  },
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
        { key: 'google', label: 'G.Scholar', icon: '🎓' },
        { key: 'rama', label: 'RAMA', icon: '📝' },
        { key: 'books', label: 'Buku', icon: '📚' },
        { key: 'ipr', label: 'HKI', icon: '💡' }
      ],
      trendChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            titleColor: '#fff',
            bodyColor: '#cbd5e1',
            borderColor: 'rgba(148, 163, 184, 0.2)',
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            displayColors: true,
            callbacks: {
              title: (items) => `Tahun ${items[0].label}`,
              label: (item) => ` ${item.dataset.label}: ${item.raw} karya`
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#64748b',
              font: {
                weight: 'bold',
                size: 11
              }
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(148, 163, 184, 0.1)'
            },
            ticks: {
              color: '#64748b',
              font: {
                weight: 'bold'
              },
              stepSize: 5
            }
          }
        },
        elements: {
          line: {
            tension: 0.4
          },
          point: {
            radius: 4,
            hoverRadius: 6
          }
        }
      }
    };
  },
  computed: {
    availableProdi() {
      return prodiList.filter(p => p.hasData);
    },
    lecturers() {
      const allLecturers = [];
      prodiList.filter(p => p.hasData).forEach(p => {
        const data = prodiRegistry[p.slug];
        if (data?.sintaData?.lecturers) allLecturers.push(...data.sintaData.lecturers);
      });
      return allLecturers;
    },

    // Filtered lecturers based on prodi selection
    filteredLecturers() {
      if (this.selectedProdi === 'all') {
        return this.lecturers;
      }
      return this.lecturers.filter(lec => lec.prodi === this.selectedProdi);
    },

    // Get all years for the chart (sorted ascending)
    chartYears() {
      const years = new Set();
      this.filteredLecturers.forEach(lec => {
        (lec.research || []).forEach(r => {
          if (r.year) years.add(String(r.year));
        });
        (lec.services || []).forEach(s => {
          if (s.year) years.add(String(s.year));
        });
      });
      return [...years].sort((a, b) => Number(a) - Number(b));
    },

    // Research data by year (filtered by prodi)
    researchByYear() {
      const data = {};
      this.chartYears.forEach(y => data[y] = 0);
      this.filteredLecturers.forEach(lec => {
        (lec.research || []).forEach(r => {
          const y = String(r.year);
          if (data[y] !== undefined) data[y]++;
        });
      });
      return data;
    },

    // Services data by year (filtered by prodi)
    servicesByYear() {
      const data = {};
      this.chartYears.forEach(y => data[y] = 0);
      this.filteredLecturers.forEach(lec => {
        (lec.services || []).forEach(s => {
          const y = String(s.year);
          if (data[y] !== undefined) data[y]++;
        });
      });
      return data;
    },

    // Total research filtered
    totalResearchFiltered() {
      return Object.values(this.researchByYear).reduce((a, b) => a + b, 0);
    },

    // Total services filtered
    totalServicesFiltered() {
      return Object.values(this.servicesByYear).reduce((a, b) => a + b, 0);
    },

    // Peak year (most combined research + services)
    peakYear() {
      let maxYear = null;
      let maxTotal = 0;
      this.chartYears.forEach(y => {
        const total = (this.researchByYear[y] || 0) + (this.servicesByYear[y] || 0);
        if (total > maxTotal) {
          maxTotal = total;
          maxYear = y;
        }
      });
      return { year: maxYear, total: maxTotal };
    },

    // Chart data for Line chart
    trendChartData() {
      return {
        labels: this.chartYears,
        datasets: [
          {
            label: 'Penelitian',
            data: this.chartYears.map(y => this.researchByYear[y] || 0),
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.15)',
            fill: true,
            borderWidth: 3,
            pointBackgroundColor: '#3b82f6',
            pointBorderColor: '#fff',
            pointBorderWidth: 2
          },
          {
            label: 'Pengabdian',
            data: this.chartYears.map(y => this.servicesByYear[y] || 0),
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            fill: true,
            borderWidth: 3,
            pointBackgroundColor: '#10b981',
            pointBorderColor: '#fff',
            pointBorderWidth: 2
          }
        ]
      };
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
            prodi: lec.prodi,
            image: this.getItemImage(r.title, 'research')
          });
        });

        // Services
        (lec.services || []).forEach(s => {
          items.push({
            type: 'services',
            title: s.title,
            year: s.year,
            author: lec.name,
            prodi: lec.prodi,
            image: this.getItemImage(s.title, 'services')
          });
        });

        // Documents (Scopus, SINTA, Google Scholar, RAMA)
        (lec.documents?.list || []).forEach(d => {
          let type = 'sinta'; // Default
          let categoryUpper = (d.category || '').toUpperCase();
          
          if (categoryUpper.includes('SCOPUS')) type = 'scopus';
          else if (categoryUpper.includes('SINTA')) type = 'sinta';
          else if (categoryUpper.includes('GOOGLE')) type = 'google';
          else if (categoryUpper.includes('RAMA')) type = 'rama';

          items.push({
            type: type,
            title: d.title,
            q: d.category, // Pass original category string for display logic
            year: d.year,
            author: lec.name,
            prodi: lec.prodi,
            image: this.getItemImage(d.title, type)
          });
        });

        // Books
        (lec.books || []).forEach(b => {
          items.push({
            type: 'books',
            title: b.title,
            year: b.year,
            author: lec.name,
            prodi: lec.prodi,
            image: this.getItemImage(b.title, 'books')
          });
        });

        // IPR
        (lec.ipr?.list || []).forEach(i => {
          items.push({
            type: 'ipr',
            title: i.title,
            category: i.category,
            author: lec.name,
            prodi: lec.prodi,
            image: this.getItemImage(i.title, 'ipr')
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
        const cat = (item.q || '').toUpperCase();
        if (cat.includes('Q1')) return `${base} bg-indigo-200 text-indigo-800`;
        if (cat.includes('Q2')) return `${base} bg-indigo-100 text-indigo-700`;
        if (cat.includes('Q3')) return `${base} bg-indigo-50 text-indigo-600`;
        if (cat.includes('Q4')) return `${base} bg-slate-100 text-indigo-500`;
        return `${base} bg-slate-100 text-slate-500`;
      }
      
      if (item.type === 'sinta') {
        const cat = (item.q || '').toUpperCase();
        if (cat.includes('S1')) return `${base} bg-sky-200 text-sky-800`;
        if (cat.includes('S2')) return `${base} bg-sky-100 text-sky-700`;
        if (cat.includes('S3')) return `${base} bg-sky-50 text-sky-600`;
        return `${base} bg-slate-100 text-sky-500`;
      }

      if (item.type === 'google') return `${base} bg-orange-100 text-orange-700`;
      if (item.type === 'rama') return `${base} bg-pink-100 text-pink-700`;
      
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
      if (item.type === 'scopus') return item.q || 'Scopus';
      if (item.type === 'sinta') return item.q || 'SINTA';
      if (item.type === 'google') return 'Google Scholar';
      if (item.type === 'rama') return 'RAMA';
      if (item.type === 'books') return 'Buku';
      if (item.type === 'ipr') {
        if (item.category === 'hakCipta') return 'Hak Cipta';
        if (item.category === 'paten') return 'Paten';
        return 'HKI';
      }
      return item.type;
    },

    getItemImage(title, type) {
      const lowerTitle = title.toLowerCase();
      let tags = ['technology'];

      if (lowerTitle.includes('iot') || lowerTitle.includes('internet of things')) tags.push('iot', 'sensor', 'internet');
      else if (lowerTitle.includes('informasi') || lowerTitle.includes('software')) tags.push('software', 'coding', 'data');
      else if (lowerTitle.includes('web') || lowerTitle.includes('aplikasi')) tags.push('website', 'ui', 'ux');
      else if (lowerTitle.includes('jaringan') || lowerTitle.includes('network')) tags.push('network', 'server');
      else if (lowerTitle.includes('bisnis') || lowerTitle.includes('manajemen')) tags.push('business', 'workspace');
      else if (lowerTitle.includes('elektro') || lowerTitle.includes('robot')) tags.push('robot', 'arduino', 'circuit');
      else if (type === 'research') tags.push('science', 'laboratory');
      else if (type === 'services') tags.push('community', 'social', 'collaboration');
      else if (type === 'books') tags.push('book', 'library');
      else if (type === 'ipr') tags.push('innovation', 'patent');
      else tags.push('digital', 'abstract');

      // Use loremflickr for high quality themed images
      return `https://loremflickr.com/800/600/${tags.join(',')}?lock=${Math.abs(this.hashCode(title))}`;
    },

    hashCode(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
      }
      return hash;
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
