<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-600">
    <!-- Dashboard Header -->
    <header class="bg-white border-b border-slate-200 sticky top-16 z-30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <h1 class="text-xl font-bold text-slate-800">Dashboard Intelijen Riset</h1>
        <div class="flex items-center gap-4">
           <!-- Prodi Selector Dropdown -->
           <select 
             v-model="selectedProdiSlug"
             @change="loadProdiData"
             class="px-3 py-2 rounded-lg bg-slate-100 border-none text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20"
           >
             <option v-for="prodi in prodis" :key="prodi.slug" :value="prodi.slug">
               {{ prodi.name }}
             </option>
           </select>
           
           <div class="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold text-xs">
             AD
           </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <!-- AI Insight Card -->
      <div class="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm relative overflow-hidden group">
         <!-- Decorative AI Gradient -->
         <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:opacity-75 transition-opacity duration-500"></div>

         <div class="relative z-10">
           <div class="flex items-center gap-3 mb-6">
             <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xl shadow-lg shadow-blue-500/30">
               ✨
             </div>
             <div>
               <h2 class="text-xl font-black text-slate-900">Ringkasan Eksekutif AI</h2>
               <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Dibuat oleh SINTA Intelligence Engine</p>
             </div>
           </div>

           <!-- Loading State -->
           <div v-if="loading" class="space-y-4 animate-pulse">
             <div class="h-4 bg-slate-100 rounded w-3/4"></div>
             <div class="h-4 bg-slate-100 rounded w-full"></div>
             <div class="h-4 bg-slate-100 rounded w-5/6"></div>
           </div>

           <!-- Content -->
           <div v-else class="prose prose-slate max-w-none">
             <p class="text-lg leading-relaxed text-slate-700">
               Berdasarkan analisis terhadap <span class="font-bold text-blue-600">{{ totalItems }}</span> judul penelitian, 
               <span class="font-bold text-slate-900">{{ currentProdiName }}</span> memiliki spesialisasi kuat pada topik
               <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mx-1 capitalize">{{ topKeywords[0] }}</span> 
               dan <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mx-1 capitalize">{{ topKeywords[1] }}</span>. 
               
               <br><br>
               Sistem mendeteksi peluang strategis untuk mengembangkan riset <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 mx-1 capitalize">{{ topKeywords[2] }}</span> menjadi produk unggulan karena relevansinya yang tinggi.
             </p>
           </div>
         </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Kolom Kiri: Topik & Renstra -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Keyword Cloud -->
          <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 class="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-blue-500"></span>
              Peta Topik Riset Dominan
            </h3>
            
            <div class="flex flex-wrap gap-2">
               <div 
                 v-for="(kw, idx) in topKeywords" 
                 :key="idx"
                 class="px-4 py-2 rounded-xl border text-sm font-semibold transition-all cursor-default capitalize"
                 :class="[
                   idx < 3 
                     ? 'bg-blue-50 text-blue-700 border-blue-100 shadow-sm' 
                     : 'bg-white text-slate-600 border-slate-200 hover:border-blue-200 hover:text-blue-600'
                 ]"
               >
                  {{ kw }}
               </div>
            </div>
          </div>
          
          <!-- Rekomendasi Renstra -->
          <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm border-l-4 border-l-purple-500">
             <h3 class="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span class="text-xl">🚀</span>
              Rekomendasi Strategis (Renstra)
            </h3>
            
            <div v-if="loading" class="space-y-4 animate-pulse">
                <div class="h-16 bg-slate-50 rounded-xl w-full"></div>
                <div class="h-16 bg-slate-50 rounded-xl w-full"></div>
            </div>
            <div v-else class="space-y-4">
                <div v-for="(rec, idx) in renstraRecs" :key="idx" class="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <h4 class="font-bold text-slate-800 mb-1 text-sm">{{ rec.title }}</h4>
                    <p class="text-sm text-slate-500 leading-relaxed">{{ rec.desc }}</p>
                </div>
            </div>
          </div>
        </div>

        <!-- Kolom Kanan: Pencarian Pakar -->
        <div class="space-y-8">
            <!-- Expert Finder Mock -->
            <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
               <h3 class="font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                Pencarian Pakar Otomatis
              </h3>
              
              <div class="relative mb-6">
                <input 
                  v-model="searchQuery"
                  type="text" 
                  placeholder="Cari kepakaran (mis: Data Mining)..." 
                  class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                >
                <span class="absolute left-3 top-2.5 text-slate-400">🔍</span>
              </div>
              
              <div v-if="loading" class="space-y-4 animate-pulse">
                  <div class="flex items-center gap-3"><div class="w-10 h-10 bg-slate-100 rounded-full"></div><div class="h-4 bg-slate-100 w-1/2 rounded"></div></div>
              </div>
              
              <div v-else>
                  <p class="text-xs font-bold text-slate-400 uppercase mb-4">
                    {{ searchQuery ? `Hasil Pencarian "${searchQuery}"` : `Rekomendasi Pakar untuk "${topKeywords[0]}"` }}
                  </p>
                  
                  <div v-if="expertRecs.length === 0" class="text-sm text-slate-500 italic p-4 text-center bg-slate-50 rounded-lg">
                    Tidak ditemukan pakar dengan topik tersebut.
                  </div>

                  <div class="space-y-4">
                      <div v-for="expert in expertRecs" :key="expert.name" class="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100 cursor-pointer">
                          <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-200 to-slate-300 flex items-center justify-center text-slate-600 font-bold text-xs">
                              {{ expert.name.charAt(0) }}
                          </div>
                          <div class="flex-1 min-w-0">
                              <h4 class="text-sm font-bold text-slate-800 truncate">{{ expert.name }}</h4>
                              <p class="text-xs text-slate-500 truncate">Ahli {{ expert.expertise }}</p>
                          </div>
                          <div class="flex flex-col items-end">
                            <div class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                {{ expert.score }}% Match
                            </div>
                          </div>
                      </div>
                  </div>
                  
                  <!-- Keterangan Score -->
                  <div class="mt-4 pt-4 border-t border-slate-100 text-[10px] text-slate-400 leading-relaxed">
                    * <strong>Match Score</strong> dihitung berdasarkan frekuensi kata kunci "{{ searchQuery || topKeywords[0] }}" yang muncul pada judul penelitian/pengabdian dosen terkait.
                  </div>
              </div>
            </div>
            
            <!-- Metric Stats -->
            <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
               <h3 class="font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-orange-500"></span>
                Metrik Performa (Live Data)
              </h3>
              
              <div class="space-y-6">
                 <!-- Produktivitas -->
                 <div class="group relative cursor-help">
                   <div class="flex justify-between text-sm mb-1">
                     <span class="text-slate-500 font-medium border-b border-dotted border-slate-300">Produktivitas Riset</span>
                     <span class="font-bold" :class="metrics.productivity.color">{{ metrics.productivity.label }}</span>
                   </div>
                   <div class="w-full bg-slate-100 rounded-full h-2">
                     <div class="h-2 rounded-full transition-all duration-1000" :class="metrics.productivity.barInfo" :style="{ width: metrics.productivity.score + '%' }"></div>
                   </div>
                   <!-- Tooltip -->
                   <div class="invisible group-hover:visible absolute bottom-full left-0 w-64 p-2 bg-slate-800 text-white text-[10px] rounded mb-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                     Dihitung dari rasio total judul penelitian dibagi jumlah dosen. (>2.5 judul/dosen = Sangat Tinggi)
                   </div>
                 </div>

                 <!-- Keragaman -->
                 <div class="group relative cursor-help">
                   <div class="flex justify-between text-sm mb-1">
                     <span class="text-slate-500 font-medium border-b border-dotted border-slate-300">Keragaman Topik</span>
                     <span class="font-bold" :class="metrics.diversity.color">{{ metrics.diversity.label }}</span>
                   </div>
                   <div class="w-full bg-slate-100 rounded-full h-2">
                     <div class="h-2 rounded-full transition-all duration-1000" :class="metrics.diversity.barInfo" :style="{ width: metrics.diversity.score + '%' }"></div>
                   </div>
                   <!-- Tooltip -->
                    <div class="invisible group-hover:visible absolute bottom-full left-0 w-64 p-2 bg-slate-800 text-white text-[10px] rounded mb-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                     Merefleksikan seberapa banyak variasi kata kunci unik yang terdeteksi dalam judul penelitian.
                   </div>
                 </div>

                 <!-- Kolaborasi -->
                 <div class="group relative cursor-help">
                   <div class="flex justify-between text-sm mb-1">
                     <span class="text-slate-500 font-medium border-b border-dotted border-slate-300">Indeks Kolaborasi</span>
                     <span class="font-bold" :class="metrics.collaboration.color">{{ metrics.collaboration.label }}</span>
                   </div>
                   <div class="w-full bg-slate-100 rounded-full h-2">
                     <div class="h-2 rounded-full transition-all duration-1000" :class="metrics.collaboration.barInfo" :style="{ width: metrics.collaboration.score + '%' }"></div>
                   </div>
                   <!-- Tooltip -->
                    <div class="invisible group-hover:visible absolute bottom-full left-0 w-64 p-2 bg-slate-800 text-white text-[10px] rounded mb-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                     Rata-rata jumlah anggota (mahasiswa/dosen) per judul penelitian. Indikasi kerja tim.
                   </div>
                 </div>
                 
                 <div class="text-[10px] text-slate-400 italic mt-4 text-center">
                   * Arahkan kursor ke label metrik untuk detail perhitungan.
                 </div>
              </div>
            </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { prodiRegistry, prodiList } from '../../data/prodi/index.js'

// Stopwords Bahasa Indonesia yang diperluas
const STOPWORDS = new Set([
  // Kata sambung umum
  'dan', 'di', 'ke', 'dari', 'untuk', 'pada', 'dengan', 'yang', 'adalah', 'ini', 'itu', 'atau', 'dalam', 'sebagai', 'oleh', 'akan', 'juga', 'dapat', 'bisa', 'ada', 'tidak', 'telah', 'menggunakan', 'berbasis', 'melalui', 'secara', 'antara', 'bagi', 'serta', 'terhadap',
  // Lokasi & Wilayah (Generic)
  'kota', 'kabupaten', 'provinsi', 'daerah', 'desa', 'kelurahan', 'kecamatan', 'indonesia', 'balikpapan', 'samarinda', 'kalimantan', 'timur', 'kaltim', 'jawa', 'jakarta', 'nasional', 'wilayah', 'negeri', 'lokal',
  // Kata Umum Akademis/Administratif
  'sistem', 'informasi', 'metode', 'analisis', 'studi', 'kasus', 'implementasi', 'pengembangan', 'perancangan', 'rancang', 'bangun', 'penerapan', 'evaluasi', 'aplikasi', 'teknologi', 'data', 'model', 'approach', 'design', 'development', 'analysis', 'system', 'information', 'based', 'using', 'study', 'case', 'peningkatan', 'upaya', 'pengaruh', 'hubungan', 'dampak', 'strategi', 'optimalisasi', 'efektivitas', 'pemanfaatan', 'penggunaan', 'media', 'sarana', 'prasaran', 'pengelolaan', 'manajemen', 'tinjauan', 'faktor', 'kinerja', 'kualitas', 'layanan', 'publik', 'masyarakat', 'pt', 'cv', 'ud', 'mitra', 'program', 'kegiatan', 'pelatihan', 'pendampingan', 'pemberdayaan', 'sosialisasi', 'workshop', 'bimtek'
])

const loading = ref(true)
const selectedProdiSlug = ref('sistem-informasi')
const topKeywords = ref([]) // Bigram phrases preferred
const renstraRecs = ref([])
const expertRecs = ref([])
const searchQuery = ref('')
const totalItems = ref(0)
const metrics = ref({
  productivity: { label: 'Sedang', score: 50, color: 'text-blue-600', barInfo: 'bg-blue-500' },
  diversity: { label: 'Rendah', score: 30, color: 'text-slate-600', barInfo: 'bg-slate-500' },
  collaboration: { label: 'Rendah', score: 0, color: 'text-purple-600', barInfo: 'bg-purple-500' }
})

const prodis = prodiList.filter(p => p.hasData)

const currentProdiName = computed(() => {
  const p = prodis.find(x => x.slug === selectedProdiSlug.value)
  return p ? p.name : 'Unknown'
})

// Fungsi Helper: Bersihkan teks
const cleanText = (text) => {
  return text.toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ') // Hapus simbol
    .replace(/\s+/g, ' ')         // Hapus spasi ganda
    .trim()
}

// Watcher untuk Search Real-time
watch(searchQuery, (newQuery) => {
    if (!newQuery) {
        // Jika kosong, kembalikan ke rekomendasi top topic
        if (topKeywords.value.length > 0) {
            const data = prodiRegistry[selectedProdiSlug.value]
            generateExpertRecs(data.sintaData.lecturers, topKeywords.value[0])
        }
        return
    }

    // Filter Logic
    const data = prodiRegistry[selectedProdiSlug.value]
    if (data && data.sintaData) {
        generateExpertRecs(data.sintaData.lecturers, newQuery, true)
    }
})

// Logika "AI" yang Lebih Cerdas: Ekstraksi Bigram (Frasa 2 Kata)
const loadProdiData = async () => {
  loading.value = true
  console.log('Starting loadProdiData for:', selectedProdiSlug.value)
  
  // Simulasi delay pemrosesan AI
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const data = prodiRegistry[selectedProdiSlug.value]
  console.log('Data found:', !!data, data?.sintaData ? 'Has Sinta Data' : 'No Sinta Data')

  if (!data || !data.sintaData) {
    console.warn('No data found for slug:', selectedProdiSlug.value)
    topKeywords.value = []
    loading.value = false 
    return
  }
  
  try {
    const allTitles = []
    let totalMembers = 0
    let lecturerCount = data.sintaData.lecturers.length
    
    // Kumpulkan semua judul & Statistik Anggota
    if (data.sintaData.lecturers) {
        data.sintaData.lecturers.forEach(lecturer => {
            if (lecturer.research) {
                lecturer.research.forEach(r => {
                    if (r.title) allTitles.push(cleanText(r.title))
                    if (r.members) totalMembers += r.members.length
                })
            }
            if (lecturer.services) {
                lecturer.services.forEach(s => {
                    if (s.title) allTitles.push(cleanText(s.title))
                    if (s.members) totalMembers += s.members.length
                })
            }
        })
    }
    
    totalItems.value = allTitles.length
    console.log('Total titles processed:', allTitles.length)
    
    // 1. Ekstraksi Unigram & Bigram 
    const phraseCounts = {}
    
    allTitles.forEach(title => {
        const words = title.split(' ')
        
        // Bigrams 
        for (let i = 0; i < words.length - 1; i++) {
            const w1 = words[i]
            const w2 = words[i+1]
            
            if (!STOPWORDS.has(w1) && !STOPWORDS.has(w2) && w1.length > 2 && w2.length > 2) {
                const phrase = `${w1} ${w2}`
                phraseCounts[phrase] = (phraseCounts[phrase] || 0) + 3 
            }
        }
        
        // Unigrams 
        words.forEach(w => {
            if (!STOPWORDS.has(w) && w.length > 4) { 
                phraseCounts[w] = (phraseCounts[w] || 0) + 1
            }
        })
    })
    
    // Ambil Top Topics
    const sortedPhrases = Object.entries(phraseCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15)
        .map(entry => entry[0])
        
    topKeywords.value = sortedPhrases
    console.log('Top keywords:', sortedPhrases)

    // 2. Generate Rekomendasi Renstra
    generateRenstraRecs(sortedPhrases)
    
    // 3. Generate Rekomendasi Pakar (Default: Top Topic)
    searchQuery.value = '' // Reset search
    generateExpertRecs(data.sintaData.lecturers, sortedPhrases[0])

    // 4. Hitung Metrik Performa (Real Data)
    calculateMetrics(totalItems.value, lecturerCount, sortedPhrases.length, totalMembers)

  } catch (error) {
    console.error('Error in AI processing:', error)
  } finally {
    loading.value = false
  }
}

const calculateMetrics = (items, lecturers, uniqueTopics, members) => {
    // 1. Produktivitas: Rata-rata judul per dosen
    const rationProd = lecturers > 0 ? items / lecturers : 0
    let prodLabel = 'Rendah', prodScore = 30, prodColor = 'text-red-600', prodBar = 'bg-red-500'
    
    if (rationProd > 2.5) { prodLabel = 'Sangat Tinggi'; prodScore=95; prodColor='text-emerald-600'; prodBar='bg-emerald-500'; }
    else if (rationProd > 1.5) { prodLabel = 'Tinggi'; prodScore=80; prodColor='text-emerald-500'; prodBar='bg-emerald-400'; }
    else if (rationProd > 0.8) { prodLabel = 'Sedang'; prodScore=60; prodColor='text-blue-500'; prodBar='bg-blue-400'; }

    // 2. Keragaman Topik
    const diversityScore = Math.min(uniqueTopics * 5, 100) // 15 topics = 75%
    let divLabel = 'Spesifik'
    if (diversityScore > 80) divLabel = 'Sangat Luas'
    else if (diversityScore > 50) divLabel = 'Cukup Beragam'
    
    // 3. Kolaborasi: Rata-rata anggota per judul
    const avgMembers = items > 0 ? members / items : 0
    let colLabel = 'Individual', colScore = 20, colColor = 'text-slate-500', colBar='bg-slate-400'
    
    if (avgMembers > 2) { colLabel = 'Sangat Kolaboratif'; colScore=90; colColor='text-purple-600'; colBar='bg-purple-500'; }
    else if (avgMembers > 1) { colLabel = 'Kolaboratif'; colScore=75; colColor='text-blue-600'; colBar='bg-blue-500'; }
    else if (avgMembers > 0.1) { colLabel = 'Mulai Tumbuh'; colScore=50; colColor='text-indigo-500'; colBar='bg-indigo-400'; }

    metrics.value = {
        productivity: { label: prodLabel, score: prodScore, color: prodColor, barInfo: prodBar },
        diversity: { label: divLabel, score: diversityScore, color: 'text-blue-600', barInfo: 'bg-blue-500' },
        collaboration: { label: colLabel, score: colScore, color: colColor, barInfo: colBar }
    }
}

const generateRenstraRecs = (keywords) => {
    if (keywords.length < 3) return
    
    renstraRecs.value = [
        {
            title: `Penguatan Klaster Riset "${keywords[0]}"`,
            desc: `Topik "${keywords[0]}" memiliki tren publikasi tertinggi. Disarankan membentuk grup riset spesifik untuk meningkatkan sitasi global.`
        },
        {
            title: `Hilirisasi Produk "${keywords[1]}"`,
            desc: `Riset bertema "${keywords[1]}" menunjukkan potensi terapan yang kuat. Perlu didorong menuju paten atau HAKI.`
        },
        {
            title: `Kolaborasi Lintas Prodi: "${keywords[2]}"`,
            desc: `Topik ini relevan dengan prodi lain. Disarankan skema hibah kolaborasi untuk memperluas dampak.`
        }
    ]
}

const generateExpertRecs = (lecturers, query, isSearch = false) => {
    if (!query) return
    
    const relevant = lecturers.map(l => {
        const research = l.research || []
        const services = l.services || []
        const combined = [...research, ...services]
        
        // Hitung frekuensi kata kunci muncul di judul
        const queryWords = cleanText(query).split(' ')
        let matchCount = 0
        
        const hasMatch = combined.some(item => {
             const t = cleanText(item.title || '')
             // Simple counting logic
             const matches = queryWords.reduce((acc, qw) => acc + (t.includes(qw) ? 1 : 0), 0)
             if (matches > 0) matchCount += matches
             return matches === queryWords.length // Strict match for inclusion
        })
        
        if (!hasMatch) return null

        // Scoring Logic: Base 60 + (Match Count * 10), Max 99
        let score = 60 + (matchCount * 10)
        if (score > 99) score = 99
        
        return {
            name: l.name,
            expertise: isSearch ? query : query,
            score: score,
            matchCount: matchCount // Debug info
        }
    })
    .filter(Boolean) // Hapus yang null
    .sort((a, b) => b.score - a.score) // Urutkan dari skor tertinggi
    .slice(0, 5) 
    
    expertRecs.value = relevant
}

watch(selectedProdiSlug, loadProdiData)

onMounted(() => {
  loadProdiData()
})
</script>
