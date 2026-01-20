<template>
  <div class="card">
    <div class="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
      <!-- Filters -->
      <div class="flex flex-col sm:flex-row gap-3 flex-1">
        <!-- Year Filter -->
        <div class="flex flex-col gap-1">
          <label class="text-xs font-medium text-slate-600">Filter Tahun</label>
          <select 
            v-model="localFilters.yearRange" 
            @change="emitFilters"
            class="input-field text-sm"
          >
            <option value="all">Semua Tahun</option>
            <option value="2023-2026">2023 - 2026</option>
            <option value="2024-2026">2024 - 2026</option>
            <option value="2025-2026">2025 - 2026</option>
            <option value="2026">2026 Saja</option>
          </select>
        </div>

        <!-- Category Filter -->
        <div class="flex flex-col gap-1">
          <label class="text-xs font-medium text-slate-600">Kategori</label>
          <select 
            v-model="localFilters.category" 
            @change="emitFilters"
            class="input-field text-sm"
          >
            <option value="All">Semua</option>
            <option value="Penelitian">Penelitian</option>
            <option value="Pengmas">Pengabdian Masyarakat</option>
          </select>
        </div>

        <!-- Search -->
        <div class="flex flex-col gap-1 flex-1">
          <label class="text-xs font-medium text-slate-600">Cari</label>
          <input 
            type="text" 
            v-model="localFilters.search"
            @input="emitFilters"
            placeholder="Cari berdasarkan judul atau nama..."
            class="input-field text-sm"
          />
        </div>
      </div>

      <!-- Export Button -->
      <div class="flex flex-col gap-1">
        <label class="text-xs font-medium text-slate-600 opacity-0">Export</label>
        <button 
          @click="$emit('export')"
          class="btn-primary flex items-center gap-2 whitespace-nowrap"
          :disabled="disabled"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          Export CSV
        </button>
      </div>
    </div>

    <!-- Active Filters Display -->
    <div v-if="hasActiveFilters" class="mt-4 flex items-center gap-2 flex-wrap">
      <span class="text-xs text-slate-600">Filter Aktif:</span>
      <span v-if="localFilters.yearRange !== 'all'" class="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
        Tahun: {{ localFilters.yearRange }}
      </span>
      <span v-if="localFilters.category !== 'All'" class="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
        {{ localFilters.category }}
      </span>
      <span v-if="localFilters.search" class="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
        Pencarian: "{{ localFilters.search }}"
      </span>
      <button 
        @click="clearFilters"
        class="text-xs text-red-600 hover:text-red-700 underline"
      >
        Hapus Semua Filter
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterControls',
  props: {
    filters: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      localFilters: { ...this.filters }
    }
  },
  computed: {
    hasActiveFilters() {
      return this.localFilters.yearRange !== 'all' || 
             this.localFilters.category !== 'All' || 
             this.localFilters.search !== '';
    }
  },
  watch: {
    filters: {
      deep: true,
      handler(newVal) {
        this.localFilters = { ...newVal };
      }
    }
  },
  methods: {
    emitFilters() {
      this.$emit('update:filters', this.localFilters);
    },
    clearFilters() {
      this.localFilters = {
        yearRange: 'all',
        category: 'All',
        search: ''
      };
      this.emitFilters();
    }
  }
}
</script>
