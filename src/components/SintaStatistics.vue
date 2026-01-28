<template>
  <div class="card">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-gradient-to-br from-green-600 to-green-500 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
        </div>
        <div>
          <h3 class="text-lg font-bold text-slate-800">Data SINTA</h3>
          <p class="text-xs text-slate-500">Tridarma Perguruan Tinggi</p>
        </div>
      </div>
      <a
        href="https://sinta.kemdiktisaintek.go.id"
        target="_blank"
        class="text-xs text-primary-600 hover:text-primary-700 flex items-center gap-1"
      >
        <span>Buka SINTA</span>
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
        </svg>
      </a>
    </div>

    <!-- Stats Grid - Overview -->
    <div class="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
      <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center border border-blue-200">
        <div class="text-2xl font-bold text-blue-600">{{ stats.totalResearch }}</div>
        <div class="text-xs text-blue-700 mt-1 font-medium">Penelitian</div>
      </div>
      <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center border border-green-200">
        <div class="text-2xl font-bold text-green-600">{{ stats.totalServices }}</div>
        <div class="text-xs text-green-700 mt-1 font-medium">Pengabdian</div>
      </div>
      <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center border border-purple-200">
        <div class="text-2xl font-bold text-purple-600">{{ stats.totalBooks }}</div>
        <div class="text-xs text-purple-700 mt-1 font-medium">Buku</div>
      </div>
      <div class="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 text-center border border-amber-200">
        <div class="text-2xl font-bold text-amber-600">{{ aggregatedProfile.totalArticles }}</div>
        <div class="text-xs text-amber-700 mt-1 font-medium">Total Artikel</div>
      </div>
      <div class="bg-gradient-to-br from-rose-50 to-rose-100 rounded-xl p-4 text-center border border-rose-200">
        <div class="text-2xl font-bold text-rose-600">{{ aggregatedProfile.totalCitations }}</div>
        <div class="text-xs text-rose-700 mt-1 font-medium">Total Sitasi</div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="border-b border-slate-200 mb-4 overflow-x-auto">
      <nav class="flex gap-1 min-w-max">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="activeTab = tab.key"
          :class="[
            'pb-3 px-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
            activeTab === tab.key
              ? 'border-primary-500 text-primary-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          ]"
        >
          <span class="flex items-center gap-1.5">
            <component :is="tab.icon" class="w-4 h-4" />
            {{ tab.label }}
            <span class="bg-slate-100 text-slate-600 text-xs px-1.5 py-0.5 rounded-full">
              {{ getTabCount(tab.key) }}
            </span>
          </span>
        </button>
      </nav>
    </div>

    <!-- Tab Content -->
    <div class="max-h-[500px] overflow-y-auto">

      <!-- Profile/Statistik Tab -->
      <div v-if="activeTab === 'profile'" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="lecturer in lecturersWithProfile"
            :key="lecturer.sintaId"
            class="bg-slate-50 rounded-lg p-4 border border-slate-200"
          >
            <div class="flex items-center justify-between mb-3">
              <h4 class="font-semibold text-slate-800 text-sm">{{ lecturer.name }}</h4>
              <a
                :href="`https://sinta.kemdiktisaintek.go.id/authors/profile/${lecturer.sintaId}`"
                target="_blank"
                class="text-xs text-primary-600 hover:underline"
              >
                SINTA Profile
              </a>
            </div>
            <div class="grid grid-cols-3 gap-2">
              <div
                v-for="stat in lecturer.profileStats"
                :key="stat.title"
                class="text-center bg-white rounded p-2 border border-slate-100"
              >
                <div class="text-lg font-bold text-slate-700">{{ stat.value }}</div>
                <div class="text-xs text-slate-500">{{ stat.title }}</div>
              </div>
            </div>
          </div>
        </div>
        <p v-if="lecturersWithProfile.length === 0" class="text-center text-slate-500 py-8">
          Belum ada data profil
        </p>
      </div>

      <!-- Research Tab -->
      <div v-if="activeTab === 'research'" class="space-y-3">
        <div
          v-for="(item, index) in paginatedItems('research')"
          :key="index"
          class="bg-blue-50/50 rounded-lg p-3 border border-blue-100 hover:bg-blue-50 transition-colors"
        >
          <p class="text-sm font-medium text-slate-800 leading-relaxed">{{ item.title }}</p>
          <div class="flex items-center gap-3 mt-2 text-xs text-slate-500">
            <span class="inline-flex items-center gap-1">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              {{ item.lecturerName }}
            </span>
            <span v-if="item.year" class="inline-flex items-center gap-1">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              {{ item.year }}
            </span>
          </div>
        </div>
        <p v-if="allResearch.length === 0" class="text-center text-slate-500 py-8">
          Belum ada data penelitian
        </p>
      </div>

      <!-- Services Tab -->
      <div v-if="activeTab === 'services'" class="space-y-3">
        <div
          v-for="(item, index) in paginatedItems('services')"
          :key="index"
          class="bg-green-50/50 rounded-lg p-3 border border-green-100 hover:bg-green-50 transition-colors"
        >
          <p class="text-sm font-medium text-slate-800 leading-relaxed">{{ item.title }}</p>
          <div class="flex items-center gap-3 mt-2 text-xs text-slate-500">
            <span class="inline-flex items-center gap-1">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              {{ item.lecturerName }}
            </span>
            <span v-if="item.year" class="inline-flex items-center gap-1">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              {{ item.year }}
            </span>
          </div>
        </div>
        <p v-if="allServices.length === 0" class="text-center text-slate-500 py-8">
          Belum ada data pengabdian masyarakat
        </p>
      </div>

      <!-- Books Tab -->
      <div v-if="activeTab === 'books'" class="space-y-3">
        <div
          v-for="(item, index) in paginatedItems('books')"
          :key="index"
          class="bg-purple-50/50 rounded-lg p-3 border border-purple-100 hover:bg-purple-50 transition-colors"
        >
          <p class="text-sm font-medium text-slate-800 leading-relaxed">{{ item.title }}</p>
          <div class="flex items-center gap-3 mt-2 text-xs text-slate-500">
            <span class="inline-flex items-center gap-1">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              {{ item.lecturerName }}
            </span>
            <span v-if="item.isbn" class="inline-flex items-center gap-1 font-mono">
              ISBN: {{ item.isbn }}
            </span>
          </div>
        </div>
        <p v-if="allBooks.length === 0" class="text-center text-slate-500 py-8">
          Belum ada data buku
        </p>
      </div>

      <!-- Lecturers Tab -->
      <div v-if="activeTab === 'lecturers'" class="space-y-3">
        <div
          v-for="lecturer in sintaLecturers"
          :key="lecturer.sintaId"
          class="bg-slate-50 rounded-lg p-4 border border-slate-200 hover:border-slate-300 transition-colors"
        >
          <div class="flex items-start justify-between">
            <div>
              <h4 class="font-semibold text-slate-800">{{ lecturer.name }}</h4>
              <p class="text-xs text-slate-500 mt-1">{{ lecturer.prodi }}</p>
            </div>
            <a
              :href="`https://sinta.kemdiktisaintek.go.id/authors/profile/${lecturer.sintaId}`"
              target="_blank"
              class="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded hover:bg-primary-200 transition-colors"
            >
              ID: {{ lecturer.sintaId }}
            </a>
          </div>
          <div class="grid grid-cols-4 gap-2 mt-3">
            <div class="text-center bg-white rounded p-2 border border-slate-100">
              <div class="text-sm font-bold text-blue-600">{{ lecturer.research?.length || 0 }}</div>
              <div class="text-xs text-slate-500">Penelitian</div>
            </div>
            <div class="text-center bg-white rounded p-2 border border-slate-100">
              <div class="text-sm font-bold text-green-600">{{ lecturer.services?.length || 0 }}</div>
              <div class="text-xs text-slate-500">Pengabdian</div>
            </div>
            <div class="text-center bg-white rounded p-2 border border-slate-100">
              <div class="text-sm font-bold text-purple-600">{{ lecturer.books?.length || 0 }}</div>
              <div class="text-xs text-slate-500">Buku</div>
            </div>
            <div class="text-center bg-white rounded p-2 border border-slate-100">
              <div class="text-sm font-bold text-amber-600">{{ getArticleCount(lecturer) }}</div>
              <div class="text-xs text-slate-500">Artikel</div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Show More Button -->
    <div v-if="hasMoreItems" class="mt-4 text-center">
      <button
        @click="loadMore"
        class="text-sm text-primary-600 hover:text-primary-700 font-medium px-4 py-2 rounded-lg hover:bg-primary-50 transition-colors"
      >
        Tampilkan lebih banyak...
      </button>
    </div>

    <!-- Source Info -->
    <div class="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
      <span class="flex items-center gap-1">
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        Sumber: SINTA Kemdiktisaintek
      </span>
      <span v-if="metadata" class="flex items-center gap-1">
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        Update: {{ formatDate(metadata.generatedAt) }}
      </span>
    </div>
  </div>
</template>

<script>
import sintaData from '../data/sinta_data.json';

// Simple icon components
const IconProfile = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>`
};

const IconResearch = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>`
};

const IconService = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>`
};

const IconBook = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>`
};

const IconUsers = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`
};

export default {
  name: 'SintaStatistics',
  components: {
    IconProfile,
    IconResearch,
    IconService,
    IconBook,
    IconUsers
  },
  props: {
    selectedProdi: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      activeTab: 'profile',
      itemsPerPage: 10,
      currentPage: 1,
      tabs: [
        { key: 'profile', label: 'Profil', icon: 'IconProfile' },
        { key: 'research', label: 'Penelitian', icon: 'IconResearch' },
        { key: 'services', label: 'Pengabdian', icon: 'IconService' },
        { key: 'books', label: 'Buku', icon: 'IconBook' },
        { key: 'lecturers', label: 'Dosen', icon: 'IconUsers' }
      ]
    }
  },
  computed: {
    metadata() {
      return sintaData?.metadata || null;
    },

    sintaLecturers() {
      return sintaData?.lecturers || [];
    },

    stats() {
      if (!sintaData || !sintaData.lecturers) {
        return {
          totalResearch: 0,
          totalServices: 0,
          totalBooks: 0,
          lecturersWithData: 0
        };
      }

      let totalResearch = 0;
      let totalServices = 0;
      let totalBooks = 0;
      let lecturersWithData = 0;

      sintaData.lecturers.forEach(lecturer => {
        const hasData = (lecturer.research?.length > 0) ||
                       (lecturer.services?.length > 0) ||
                       (lecturer.books?.length > 0);

        if (hasData) lecturersWithData++;

        totalResearch += lecturer.research?.length || 0;
        totalServices += lecturer.services?.length || 0;
        totalBooks += lecturer.books?.length || 0;
      });

      return {
        totalResearch,
        totalServices,
        totalBooks,
        lecturersWithData
      };
    },

    aggregatedProfile() {
      if (!sintaData || !sintaData.lecturers) {
        return { totalArticles: 0, totalCitations: 0 };
      }

      let totalArticles = 0;
      let totalCitations = 0;

      sintaData.lecturers.forEach(lecturer => {
        if (lecturer.ipr && lecturer.ipr.length > 0) {
          lecturer.ipr.forEach(item => {
            if (item.title === 'Article') {
              totalArticles += parseInt(item.year) || 0;
            }
            if (item.title === 'Citation') {
              totalCitations += parseInt(item.year) || 0;
            }
          });
        }
      });

      return { totalArticles, totalCitations };
    },

    lecturersWithProfile() {
      if (!sintaData || !sintaData.lecturers) return [];

      return sintaData.lecturers
        .filter(l => l.ipr && l.ipr.length > 0)
        .map(lecturer => ({
          name: lecturer.name,
          sintaId: lecturer.sintaId,
          profileStats: lecturer.ipr.map(item => ({
            title: item.title,
            value: item.year || '0'
          }))
        }));
    },

    allResearch() {
      if (!sintaData || !sintaData.lecturers) return [];

      const items = [];
      sintaData.lecturers.forEach(lecturer => {
        if (lecturer.research && lecturer.research.length > 0) {
          lecturer.research.forEach(item => {
            items.push({
              ...item,
              lecturerName: lecturer.name
            });
          });
        }
      });
      return items;
    },

    allServices() {
      if (!sintaData || !sintaData.lecturers) return [];

      const items = [];
      sintaData.lecturers.forEach(lecturer => {
        if (lecturer.services && lecturer.services.length > 0) {
          lecturer.services.forEach(item => {
            items.push({
              ...item,
              lecturerName: lecturer.name
            });
          });
        }
      });
      return items;
    },

    allBooks() {
      if (!sintaData || !sintaData.lecturers) return [];

      const items = [];
      sintaData.lecturers.forEach(lecturer => {
        if (lecturer.books && lecturer.books.length > 0) {
          lecturer.books.forEach(item => {
            items.push({
              ...item,
              lecturerName: lecturer.name
            });
          });
        }
      });
      return items;
    },

    hasMoreItems() {
      const items = this.getCurrentTabItems();
      return items.length > this.currentPage * this.itemsPerPage;
    }
  },
  methods: {
    getTabCount(key) {
      if (key === 'profile') return this.lecturersWithProfile.length;
      if (key === 'research') return this.allResearch.length;
      if (key === 'services') return this.allServices.length;
      if (key === 'books') return this.allBooks.length;
      if (key === 'lecturers') return this.sintaLecturers.length;
      return 0;
    },

    getCurrentTabItems() {
      if (this.activeTab === 'research') return this.allResearch;
      if (this.activeTab === 'services') return this.allServices;
      if (this.activeTab === 'books') return this.allBooks;
      return [];
    },

    paginatedItems(type) {
      let items = [];
      if (type === 'research') items = this.allResearch;
      if (type === 'services') items = this.allServices;
      if (type === 'books') items = this.allBooks;

      return items.slice(0, this.currentPage * this.itemsPerPage);
    },

    loadMore() {
      this.currentPage++;
    },

    getArticleCount(lecturer) {
      if (!lecturer.ipr) return 0;
      const articleStat = lecturer.ipr.find(i => i.title === 'Article');
      return articleStat ? (parseInt(articleStat.year) || 0) : 0;
    },

    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  },
  watch: {
    activeTab() {
      this.currentPage = 1;
    }
  }
}
</script>
