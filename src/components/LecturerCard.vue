<template>
  <div class="card animate-fade-in">
    <!-- Header -->
    <div 
      class="flex items-center justify-between cursor-pointer"
      @click="toggleExpand"
    >
      <div class="flex-1">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold">
            {{ initials }}
          </div>
          <div>
            <h3 class="font-semibold text-slate-800">{{ lecturer.name }}</h3>
            <p v-if="!loading && !error" class="text-sm text-slate-600">
              {{ stats.totalPublications }} Publikasi 
              <span class="mx-1">•</span> 
              {{ stats.totalCitations }} Sitasi
            </p>
            <p v-if="loading" class="text-sm text-primary-600">Loading...</p>
            <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <!-- Quick Stats -->
        <div v-if="!loading && !error" class="hidden md:flex gap-4 mr-4">
          <div class="text-center">
            <p class="text-xs text-slate-600">3 Tahun</p>
            <p class="text-lg font-bold text-primary-600">{{ stats.recent3Years }}</p>
          </div>
          <div class="text-center">
            <p class="text-xs text-slate-600">Penelitian</p>
            <p class="text-lg font-bold text-blue-600">{{ stats.penelitian }}</p>
          </div>
          <div class="text-center">
            <p class="text-xs text-slate-600">Pengmas</p>
            <p class="text-lg font-bold text-green-600">{{ stats.pengmas }}</p>
          </div>
        </div>

        <!-- Expand Icon -->
        <svg 
          :class="['w-6 h-6 text-slate-600 transition-transform', { 'rotate-180': isExpanded }]"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </div>

    <!-- Expanded Content -->
    <transition name="expand">
      <div v-if="isExpanded && !loading && !error" class="mt-6 pt-6 border-t border-slate-200">
        <!-- Publications Table -->
        <PublicationTable :publications="processedPublications" />
      </div>
    </transition>
  </div>
</template>

<script>
import { categorizePublication } from '../utils/categorization.js';
import PublicationTable from './PublicationTable.vue';

export default {
  name: 'LecturerCard',
  components: {
    PublicationTable
  },
  props: {
    lecturer: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isExpanded: false
    }
  },
  computed: {
    initials() {
      const words = this.lecturer.name.split(' ');
      if (words.length >= 2) {
        return (words[0][0] + words[1][0]).toUpperCase();
      }
      return this.lecturer.name.substring(0, 2).toUpperCase();
    },
    
    loading() {
      return !this.lecturer.loaded;
    },
    
    error() {
      return this.lecturer.error;
    },
    
    processedPublications() {
      if (!this.lecturer.publications) return [];
      
      return this.lecturer.publications.map(pub => ({
        ...pub,
        author: this.lecturer.name,
        category: categorizePublication(pub.title)
      }));
    },
    
    stats() {
      const pubs = this.processedPublications;
      const currentYear = new Date().getFullYear();
      const threeYearsAgo = currentYear - 3;
      
      return {
        totalPublications: pubs.length,
        totalCitations: pubs.reduce((sum, p) => sum + (p.citations || 0), 0),
        recent3Years: pubs.filter(p => parseInt(p.year) >= threeYearsAgo).length,
        penelitian: pubs.filter(p => p.category === 'Penelitian').length,
        pengmas: pubs.filter(p => p.category === 'Pengmas').length
      };
    }
  },
  methods: {
    toggleExpand() {
      if (!this.loading && !this.error) {
        this.isExpanded = !this.isExpanded;
      }
    }
  }
}
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  max-height: 2000px;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
