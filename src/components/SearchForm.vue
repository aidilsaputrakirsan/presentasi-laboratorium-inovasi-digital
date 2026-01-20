<template>
  <div class="card">
    <h3 class="text-lg font-semibold text-slate-800 mb-4">Cari Data Dosen</h3>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Author ID Input -->
      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium text-slate-700">
          Google Scholar Author ID atau Nama Dosen
        </label>
        <input 
          type="text" 
          v-model="authorId"
          placeholder="Contoh: kXEhAa8AAAAJ atau nama dosen"
          class="input-field"
          required
        />
        <p class="text-xs text-slate-500">
          Masukkan ID dari URL profil Google Scholar (contoh: scholar.google.com/citations?user=<strong>kXEhAa8AAAAJ</strong>)
        </p>
      </div>

      <!-- Author Name (optional) -->
      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium text-slate-700">
          Nama Dosen (Opsional)
        </label>
        <input 
          type="text" 
          v-model="authorName"
          placeholder="Nama dosen untuk ditampilkan"
          class="input-field"
        />
      </div>

      <!-- Submit Button -->
      <div class="flex gap-3">
        <button 
          type="submit" 
          class="btn-primary flex items-center gap-2"
          :disabled="loading"
        >
          <svg 
            v-if="loading" 
            class="animate-spin w-5 h-5" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          {{ loading ? 'Mencari...' : 'Cari Publikasi' }}
        </button>

        <button 
          v-if="!loading && authorId"
          type="button"
          @click="handleReset"
          class="btn-secondary"
        >
          Reset
        </button>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
        <div class="flex items-start gap-2">
          <svg class="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
          </svg>
          <div>
            <p class="font-medium">Error</p>
            <p>{{ errorMessage }}</p>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SearchForm',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      authorId: '',
      authorName: '',
      errorMessage: ''
    }
  },
  methods: {
    handleSubmit() {
      this.errorMessage = '';
      
      if (!this.authorId.trim()) {
        this.errorMessage = 'Mohon masukkan Google Scholar Author ID';
        return;
      }

      this.$emit('search', {
        authorId: this.authorId.trim(),
        authorName: this.authorName.trim() || this.authorId.trim()
      });
    },
    handleReset() {
      this.authorId = '';
      this.authorName = '';
      this.errorMessage = '';
      this.$emit('reset');
    },
    setError(message) {
      this.errorMessage = message;
    }
  }
}
</script>
