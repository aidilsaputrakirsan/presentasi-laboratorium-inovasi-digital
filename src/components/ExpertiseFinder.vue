<template>
  <div class="space-y-6">
    <!-- Header Hero -->
    <div class="rounded-2xl shadow-xl bg-gradient-to-r from-emerald-600 to-teal-600 border-none text-white p-8 relative overflow-hidden">
      <div class="relative z-10 max-w-2xl">
        <h1 class="text-3xl font-black tracking-tight mb-2">Cari Pakar & Pembimbing</h1>
        <p class="text-emerald-50 text-lg">Temukan dosen yang paling relevan dengan ide penelitianmu menggunakan AI Matchmaking.</p>
        
        <!-- Search Box -->
        <div class="mt-8 bg-white p-2 rounded-2xl shadow-xl flex flex-col md:flex-row gap-2">
          <textarea 
            v-model="query" 
            placeholder="Ketik ide atau judul penelitianmu di sini... (Contoh: Saya ingin membuat sistem deteksi sampah otomatis berbasis IoT dan AI)" 
            class="flex-1 p-3 text-slate-800 bg-transparent border-none focus:ring-0 resize-none h-20 md:h-auto placeholder:text-slate-400"
            @keyup.enter="findExperts"
            @input="hasSearched = false"
          ></textarea>
          <button 
            @click="findExperts" 
            class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <span>Analisis</span>
          </button>
        </div>
        <div class="flex justify-between items-start mt-2 px-1">
          <p class="text-xs text-emerald-100 opacity-80">*Sistem akan mencocokkan kata kunci idemu dengan riwayat publikasi dosen.</p>
          <p v-if="lastTokens.length > 0" class="text-xs text-emerald-100 bg-white/10 px-2 py-1 rounded">
             Kata kunci: <span class="font-mono font-bold text-yellow-300">{{ lastTokens.join(', ') }}</span>
          </p>
        </div>
      </div>

      <!-- Background Decoration -->
      <div class="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
      <div class="absolute bottom-0 right-20 w-32 h-32 bg-teal-400/20 rounded-full blur-2xl pointer-events-none"></div>
    </div>

    <!-- Results Section -->
    <div v-if="results.length > 0" class="animate-fade-in-up">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold text-slate-800 flex items-center gap-2">
          <span>🎯 Rekomendasi Dosen</span>
          <span class="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full">{{ results.length }} Ditemukan</span>
        </h2>
        <button @click="clearResults" class="text-sm text-slate-400 hover:text-red-500 transition-colors">Reset</button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div v-for="(result, idx) in results" :key="result.id" class="card group hover:ring-2 hover:ring-emerald-500/50 transition-all duration-300">
          <div class="p-5">
            <!-- Rank & Score -->
            <div class="flex justify-between items-start mb-4">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm" 
                  :class="idx === 0 ? 'bg-yellow-100 text-yellow-700' : (idx === 1 ? 'bg-gray-100 text-gray-600' : 'bg-orange-100 text-orange-700')">
                  #{{ idx + 1 }}
                </div>
                <div>
                   <h3 class="font-bold text-slate-800 line-clamp-1 group-hover:text-emerald-600 transition-colors">{{ result.name }}</h3>
                   <div class="text-xs text-slate-500 flex items-center gap-1">
                      <span>SINTA Score: {{ result.sinta_score }}</span>
                   </div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-2xl font-black text-emerald-500">{{ Math.round(result.score * 10) }}%</div>
                <div class="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">Match</div>
              </div>
            </div>

            <!-- Matched Keywords -->
            <div class="mb-4">
              <p class="text-xs text-slate-400 mb-2 font-semibold uppercase tracking-wider">Matched Keywords</p>
              <div class="flex flex-wrap gap-1.5">
                <span v-for="keyword in result.matched_keywords" :key="keyword" 
                  class="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-md border border-emerald-100 font-medium">
                  {{ keyword }}
                </span>
                <span v-if="result.matched_keywords.length === 0" class="text-xs text-slate-400 italic">No direct keyword match</span>
              </div>
            </div>
            
            <!-- Expertise Area (Top Keywords) -->
             <div class="pt-4 border-t border-slate-100">
               <p class="text-[10px] text-slate-400 mb-1">Top Expertise:</p>
               <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                 {{ Object.keys(result.keywords).slice(0, 5).join(', ') }}
               </p>
             </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Empty State / Intro -->
    <div v-else-if="hasSearched" class="text-center py-20 text-slate-400 animate-fade-in">
      <div class="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <p>Tidak ditemukan kecocokan yang spesifik. Coba gunakan kata kunci lain.</p>
    </div>

  </div>
</template>

<script>
// Import generated expertise profile data
import expertiseData from '../data/expertise_data.json';

export default {
  name: 'ExpertiseFinder',
  data() {
    return {
      query: '',
      results: [],
      hasSearched: false,
      lastTokens: [],
      profiles: expertiseData.profiles || []
    }
  },
  methods: {
    findExperts() {
      if (!this.query.trim()) return;
      
      this.hasSearched = true;
      const inputWords = this.tokenize(this.query);
      this.lastTokens = inputWords;
      
      const rankedProfiles = this.profiles.map(profile => {
        let score = 0;
        let matched = [];
        
        // Simple matching logic
        inputWords.forEach(word => {
          // Check for exact match or substring match in profile keywords
          // We iterate profile keywords to find best match
          for (const [key, weight] of Object.entries(profile.keywords)) {
            if (key.includes(word) || word.includes(key)) {
              score += weight;
              if (!matched.includes(key)) matched.push(key);
            }
          }
        });
        
        return {
          ...profile,
          score: score,
          matched_keywords: matched.slice(0, 6) // Limit display
        };
      })
      .filter(p => p.score > 0) // Only show processed matching results
      .sort((a, b) => b.score - a.score)
      .slice(0, 6); // Top 6 recommendations
      
      this.results = rankedProfiles;
    },
    tokenize(text) {
      // Simple client-side tokenization
      return text.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .split(/\s+/)
        .filter(w => w.length > 2);
    },
    clearResults() {
      this.query = '';
      this.results = [];
      this.hasSearched = false;
    }
  }
}
</script>

<style scoped>
.card {
  @apply bg-white rounded-2xl border border-slate-200 shadow-sm transition-all;
}
</style>
