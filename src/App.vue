<template>
  <div class="min-h-screen py-8 px-4">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <header class="mb-8 text-center">
        <div class="inline-flex items-center gap-3 mb-3">
          <div class="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-500 rounded-xl flex items-center justify-center shadow-lg">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
            </svg>
          </div>
          <div>
            <h1 class="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
              Monitoring IKU/Akreditasi Dosen
            </h1>
            <p class="text-slate-600 text-sm mt-1">Sistem monitoring publikasi via Google Scholar</p>
          </div>
        </div>
      </header>

      <!-- Prodi Selector -->
      <div class="animate-fade-in">
        <ProdiSelector 
          :selectedProdi="selectedProdi"
          @select="handleProdiSelect"
        />
      </div>

      <!-- Cache Status (shown when data is loaded) -->
      <div v-if="!loading && selectedProdi && lecturersData.length > 0" class="mb-6 flex justify-end">
        <CacheStatus 
          :cacheInfo="cacheInfo"
          :refreshing="refreshing"
          @refresh="handleRefresh"
        />
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="card text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <p class="mt-4 text-slate-600">Memuat data {{ loadedCount }}/{{ totalCount }} dosen...</p>
      </div>

      <template v-if="!loading && selectedProdi && lecturersData.length > 0">
        <!-- Prodi Statistics -->
        <div class="mb-6 animate-fade-in">
          <ProdiStatistics :stats="prodiStats" />
        </div>

        <!-- Charts -->
        <div class="mb-6 animate-fade-in">
          <ChartsSection
            :yearChartData="yearChartData"
            :categoryChartData="categoryChartData"
            :topLecturersData="topLecturersData"
          />
        </div>

        <!-- SINTA Data (Penelitian, Pengabdian, Buku) -->
        <div class="mb-6 animate-fade-in">
          <SintaStatistics :selectedProdi="selectedProdi" />
        </div>

        <!-- Export Button -->
        <div class="mb-6 flex justify-end">
          <button 
            @click="exportAllData"
            class="btn-primary flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Export Semua Data CSV
          </button>
        </div>

        <!-- Lecturers List -->
        <div class="space-y-4">
          <h3 class="text-xl font-bold text-slate-800">Daftar Dosen ({{ lecturersData.length }})</h3>
          <LecturerCard 
            v-for="lecturer in lecturersData"
            :key="lecturer.scholarId"
            :lecturer="lecturer"
          />
        </div>
      </template>

      <!-- No Data State -->
      <div v-if="!loading && selectedProdi && lecturersData.length === 0" class="card text-center py-12">
        <svg class="w-16 h-16 text-slate-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="mt-4 text-slate-600">Belum ada data untuk prodi ini</p>
      </div>

      <!-- Footer -->
      <footer class="mt-12 text-center text-sm text-slate-500">
        <p>Powered by SerpApi & Google Scholar | {{ currentYear }}</p>
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
    SintaStatistics
  },
  data() {
    return {
      selectedProdi: null,
      lecturersData: [],
      loading: false,
      refreshing: false,
      loadedCount: 0,
      totalCount: 0,
      cacheInfo: null
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
