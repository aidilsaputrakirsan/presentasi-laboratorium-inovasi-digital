<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <section class="relative pt-20 pb-32 overflow-hidden">
      <div class="absolute inset-0 bg-white">
        <!-- Grid Pattern -->
        <div class="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-[0.03]"></div>
        <!-- Gradient Blob -->
        <div class="absolute top-0 right-0 -translate-y-12 translate-x-12 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold mb-8 animate-fade-in-up">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Baru: Analisis Riset Berbasis AI
        </div>
        
        <h1 class="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-8 leading-tight animate-fade-in-up" style="animation-delay: 100ms">
          Optimalkan Potensi <br>
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Riset Institusi Anda</span>
        </h1>
        
        <p class="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style="animation-delay: 200ms">
          Otomatisasi profil, klasifikasi topik, dan visualisasi luaran riset prodi Anda. 
          Ubah data mentah SINTA menjadi wawasan strategis dalam hitungan detik.
        </p>
        
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style="animation-delay: 300ms">
          <router-link to="/v2/login" class="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 text-white font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 hover:scale-105 active:scale-95">
            Mulai Uji Coba Gratis
          </router-link>
          <button class="w-full sm:w-auto px-8 py-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-lg hover:border-slate-300 hover:bg-slate-50 transition-all">
            Lihat Demo
          </button>
        </div>

        <!-- Dashboard Preview -->
        <div class="mt-20 relative mx-auto max-w-5xl animate-fade-in-up" style="animation-delay: 500ms">
          <div class="rounded-2xl border border-slate-200 bg-white/50 backdrop-blur-xl p-2 shadow-2xl">
             <div class="rounded-xl overflow-hidden bg-slate-50 aspect-video relative flex items-center justify-center border border-slate-100">
                <div class="text-center">
                  <div class="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">📊</div>
                  <h3 class="text-slate-400 font-bold text-lg">Pratinjau Dashboard Interaktif</h3>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Grid -->
    <section id="features" class="py-24 bg-slate-50 border-t border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-black text-slate-900 mb-4">Mengapa Memilih SINTA Intel?</h2>
          <p class="text-slate-500 max-w-2xl mx-auto">Kami menangani tugas berat pengumpulan dan analisis data sehingga Anda dapat fokus pada pengambilan keputusan strategis.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all group">
            <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">🤖</div>
            <h3 class="text-xl font-bold text-slate-900 mb-2">Klasterisasi Topik AI</h3>
            <p class="text-slate-500">Mesin AI kami membaca ribuan judul penelitian untuk secara otomatis mengidentifikasi tema riset inti dan topik yang sedang berkembang.</p>
          </div>

          <!-- Feature 2 -->
          <div class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-purple-500/5 transition-all group">
             <div class="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">📈</div>
            <h3 class="text-xl font-bold text-slate-900 mb-2">Peta Jalan Otomatis</h3>
            <p class="text-slate-500">Visualisasikan evolusi topik penelitian dari waktu ke waktu. Lihat rekam jejak departemen Anda dan arah masa depannya.</p>
          </div>

          <!-- Feature 3 -->
          <div class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all group">
             <div class="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">⚡</div>
            <h3 class="text-xl font-bold text-slate-900 mb-2">Pembuatan Profil Real-time</h3>
            <p class="text-slate-500">Tidak ada lagi entri data manual. Kami mengikis dan mengumpulkan data dari SINTA dan Google Scholar secara otomatis.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}
</style>
