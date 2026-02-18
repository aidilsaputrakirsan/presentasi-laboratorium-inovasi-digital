<template>
  <div class="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
    <nav class="absolute top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/30">
              S
            </div>
            <span class="font-bold text-xl tracking-tight text-white drop-shadow">SINTA Intel</span>
          </div>

          <div class="hidden md:flex items-center gap-8">
            <a href="#" class="text-sm font-medium text-white/70 hover:text-white transition-colors">Fitur Unggulan</a>
            <a href="#" class="text-sm font-medium text-white/70 hover:text-white transition-colors">Harga</a>
            <a href="#" class="text-sm font-medium text-white/70 hover:text-white transition-colors">Tentang Kami</a>
          </div>

          <div class="flex items-center gap-4">
            <router-link to="/dashboard" class="flex items-center gap-1.5 text-sm font-medium text-white/60 hover:text-white/90 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              V1
            </router-link>
            <router-link to="/v2/login" class="text-sm font-semibold text-white/80 hover:text-white transition-colors">
              Masuk
            </router-link>
            <router-link to="/v2/login" class="px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-semibold hover:bg-white/30 transition-all">
              Coba Gratis
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <main class="overflow-visible">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

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
