<template>
  <div class="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
    <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/30">
              S
            </div>
            <span class="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">SINTA Intel</span>
          </div>

          <div class="hidden md:flex items-center gap-8">
            <a href="#" class="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">Fitur Unggulan</a>
            <a href="#" class="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">Harga</a>
            <a href="#" class="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">Tentang Kami</a>
          </div>

          <div class="flex items-center gap-4">
            <router-link to="/v2/login" class="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors">
              Masuk
            </router-link>
            <router-link to="/v2/login" class="px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 hover:shadow-xl hover:-translate-y-0.5">
              Coba Gratis
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer class="bg-slate-50 border-t border-slate-200 py-12 mt-20">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <p class="text-slate-400 text-sm">© 2024 SINTA Intelligence. Didukung oleh Kecerdasan Buatan.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
