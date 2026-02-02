<template>
  <div class="min-h-screen py-8 px-4">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <header class="mb-6 text-center">
        <div class="inline-flex items-center gap-4 mb-3">
          <div class="relative">
            <div class="w-14 h-14 bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-500/30">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <div class="absolute inset-0 rounded-2xl bg-rose-500/20 animate-ping"></div>
          </div>
          <div class="text-left">
            <div class="flex items-center gap-3">
              <h1 class="text-3xl lg:text-4xl font-black bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                SINTA-Pulse
              </h1>
              <span class="px-2 py-0.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wider animate-pulse">Live</span>
            </div>
            <p class="text-slate-600 text-sm mt-1">Dashboard Monitoring Dosen | Laboratorium Inovasi Digital</p>
          </div>
        </div>
      </header>

      <!-- Main View Tabs -->
      <div class="flex justify-center gap-2 mb-6">
        <button 
          @click="activeView = 'dashboard'"
          :class="[
            'px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2',
            activeView === 'dashboard' 
              ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30' 
              : 'bg-white text-slate-600 border border-slate-200 hover:border-rose-300 hover:text-rose-600'
          ]"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
          Dashboard
        </button>
        <button 
          @click="activeView = 'gallery'"
          :class="[
            'px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2',
            activeView === 'gallery' 
              ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30' 
              : 'bg-white text-slate-600 border border-slate-200 hover:border-rose-300 hover:text-rose-600'
          ]"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
          Koleksi Karya
        </button>
        <button 
          @click="activeView = 'clusters'"
          :class="[
            'px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2',
            activeView === 'clusters' 
              ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/30' 
              : 'bg-white text-slate-600 border border-slate-200 hover:border-violet-300 hover:text-violet-600'
          ]"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          Kolaborasi Riset
        </button>
        <button 
          @click="activeView = 'roadmap'"
          :class="[
            'px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2',
            activeView === 'roadmap' 
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30' 
              : 'bg-white text-slate-600 border border-slate-200 hover:border-cyan-300 hover:text-cyan-600'
          ]"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
          Roadmap
        </button>
      </div>

      <!-- Dashboard View -->
      <template v-if="activeView === 'dashboard'">
        <!-- Prodi Selector -->
        <div class="animate-fade-in">
          <ProdiSelector 
            :selectedProdi="selectedProdi"
            @select="handleProdiSelect"
          />
        </div>

        <!-- SINTA Dashboard (shown when prodi is selected) -->
        <div v-if="selectedProdi" class="animate-fade-in">
          <SintaStatistics :selectedProdi="selectedProdi" />
        </div>
      </template>

      <!-- Research Gallery View -->
      <template v-if="activeView === 'gallery'">
        <div class="animate-fade-in">
          <ResearchGallery />
        </div>
      </template>

      <!-- Research Clusters View -->
      <template v-if="activeView === 'clusters'">
        <div class="animate-fade-in">
          <ResearchClusters />
        </div>
      </template>

      <!-- Research Roadmap View -->
      <template v-if="activeView === 'roadmap'">
        <div class="animate-fade-in">
          <ResearchRoadmap />
        </div>
      </template>

      <!-- Google Scholar Section - DISABLED but preserved -->
      <!-- 
      <template v-if="!loading && selectedProdi && lecturersData.length > 0">
        <ProdiStatistics :stats="prodiStats" />
        <ChartsSection
          :yearChartData="yearChartData"
          :categoryChartData="categoryChartData"
          :topLecturersData="topLecturersData"
        />
        <LecturerCard 
          v-for="lecturer in lecturersData"
          :key="lecturer.scholarId"
          :lecturer="lecturer"
        />
      </template>
      -->

      <!-- Footer -->
      <footer class="mt-12 text-center text-sm text-slate-500">
        <div class="flex items-center justify-center gap-2 mb-1">
          <span class="font-semibold text-slate-600">SINTA-Pulse</span>
          <span class="text-slate-300">|</span>
          <span>Laboratorium Inovasi Digital</span>
        </div>
        <p class="text-xs text-slate-400">Powered by SINTA Kemdiktisaintek | {{ currentYear }}</p>
      </footer>
    </div>
  </div>
</template>

<script>
import ProdiSelector from './components/ProdiSelector.vue';
import ProdiStatistics from './components/ProdiStatistics.vue';
import ChartsSection from './components/ChartsSection.vue';
import LecturerCard from './components/LecturerCard.vue';
import CacheStatus from './components/CacheStatus.vue';
import SintaStatistics from './components/SintaStatistics.vue';
import ResearchGallery from './components/ResearchGallery.vue';
import ResearchClusters from './components/ResearchClusters.vue';
import ResearchRoadmap from './components/ResearchRoadmap.vue';
import { fetchMultipleLecturers } from './services/serpApi.js';
import { 
  aggregateProdiData, 
  getPublicationsByYearData,
  getCategoryDistributionData,
  getTopLecturersData
} from './utils/aggregation.js';
import { exportToCSV } from './utils/csvExport.js';
import { categorizePublication } from './utils/categorization.js';
import lecturersJSON from './data/lecturers.json';

export default {
  name: 'App',
  components: {
    ProdiSelector,
    ProdiStatistics,
    ChartsSection,
    LecturerCard,
    CacheStatus,
    SintaStatistics,
    ResearchGallery,
    ResearchClusters,
    ResearchRoadmap
  },
  data() {
    return {
      activeView: 'dashboard', // 'dashboard' | 'gallery' | 'clusters' | 'roadmap'
      selectedProdi: null,
      lecturersData: [],
      loading: false,
      refreshing: false,
      loadedCount: 0,
      totalCount: 0,
      cacheInfo: null,
      activeMainTab: 'scholar' // 'scholar' | 'sinta'
    }
  },
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
    
    prodiStats() {
      if (this.lecturersData.length === 0) return {};
      return aggregateProdiData(this.lecturersData);
    },
    
    yearChartData() {
      if (!this.prodiStats.allPublications) return { labels: [], datasets: [] };
      return getPublicationsByYearData(this.prodiStats.allPublications);
    },
    
    categoryChartData() {
      if (!this.prodiStats.penelitianCount) return { labels: [], datasets: [] };
      return getCategoryDistributionData(
        this.prodiStats.penelitianCount,
        this.prodiStats.pengmasCount
      );
    },
    
    topLecturersData() {
      if (!this.prodiStats.topLecturers) return { labels: [], datasets: [] };
      return getTopLecturersData(this.prodiStats.topLecturers);
    }
  },
  methods: {
    async handleProdiSelect(prodiKey) {
      this.selectedProdi = prodiKey;
      this.loading = true;
      this.loadedCount = 0;
      this.lecturersData = [];

      const prodi = lecturersJSON.studyPrograms[prodiKey];
      if (!prodi) {
        this.loading = false;
        return;
      }

      this.totalCount = prodi.lecturers.length;

      try {
        // Fetch all lecturers data
        const results = await fetchMultipleLecturers(prodi.lecturers);
        this.lecturersData = results;
        
        // Update cache info from first lecturer
        if (results.length > 0) {
          const firstLecturer = results[0];
          
          if (firstLecturer.cacheMetadata || firstLecturer.fromCache !== undefined) {
            this.cacheInfo = {
              fromCache: firstLecturer.fromCache || false,
              cacheMetadata: firstLecturer.cacheMetadata || null
            };
          }
        }
      } catch (error) {
        console.error('Error fetching lecturers:', error);
      } finally {
        this.loading = false;
      }
    },
    
    async handleRefresh() {
      if (!this.selectedProdi) return;
      
      this.refreshing = true;
      
      const prodi = lecturersJSON.studyPrograms[this.selectedProdi];
      if (!prodi) {
        this.refreshing = false;
        return;
      }
      
      try {
        // Force refresh from API
        const results = await fetchMultipleLecturers(prodi.lecturers, true);
        this.lecturersData = results;
        
        // Update cache info
        if (results.length > 0 && results[0].cacheMetadata) {
          this.cacheInfo = {
            fromCache: results[0].fromCache,
            cacheMetadata: results[0].cacheMetadata
          };
        }
      } catch (error) {
        console.error('Error refreshing:', error);
        alert('Gagal memperbarui data. Silakan coba lagi.');
      } finally {
        this.refreshing = false;
      }
    },
    
    exportAllData() {
      if (!this.prodiStats.allPublications || this.prodiStats.allPublications.length === 0) {
        alert('Tidak ada data untuk diekspor');
        return;
      }

      const filename = `${this.selectedProdi}-${new Date().toISOString().split('T')[0]}.csv`;
      exportToCSV(this.prodiStats.allPublications, filename);
    }
  }
}
</script>
