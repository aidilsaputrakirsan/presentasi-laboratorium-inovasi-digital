<template>
  <div class="flex h-screen bg-slate-50 text-slate-600 font-sans selection:bg-rose-500/30">
    <!-- Sidebar -->
    <aside 
      class="fixed inset-y-0 left-0 z-50 w-72 bg-white/80 backdrop-blur-xl border-r border-slate-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0 flex flex-col shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]"
      :class="mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <!-- Sidebar Header -->
      <div class="h-24 flex items-center px-8 border-b border-slate-100/80 bg-slate-50/50 backdrop-blur-sm">
        <div class="flex items-center gap-4 group cursor-pointer w-full">
          <div class="relative">
            <div class="w-10 h-10 bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-105 group-hover:rotate-3">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div class="absolute -inset-1 bg-blue-500/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div class="flex-1">
            <h1 class="font-black text-lg text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors leading-tight">Galeri Inovasi</h1>
            <p class="text-[9px] uppercase tracking-widest text-slate-400 font-bold group-hover:text-slate-500 transition-colors">Digital Laboratory</p>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto py-8 px-4 space-y-2 custom-scrollbar">
        <template v-for="(item, index) in menuItems" :key="item.path">
          <!-- Section Label -->
          <div 
            v-if="item.isHeader" 
            class="px-4 mt-6 mb-2 flex items-center gap-3 animate-fade-in-up"
            :style="{ animationDelay: `${index * 50}ms` }"
          >
             <span class="text-[10px] font-black text-slate-400/80 uppercase tracking-widest">{{ item.label }}</span>
             <div class="h-px bg-gradient-to-r from-slate-200 to-transparent flex-1"></div>
          </div>
          
          <!-- Menu Link -->
          <router-link 
            v-else
            :to="item.path"
            class="group flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 relative overflow-hidden animate-fade-in-left"
            :style="{ animationDelay: `${index * 50}ms` }"
            active-class="bg-blue-50/80 text-blue-600 shadow-sm border border-blue-100/50"
            :class="$route.path === item.path ? '' : 'text-slate-500 hover:text-slate-900 hover:bg-white hover:shadow-sm hover:border-slate-100 border border-transparent'"
          >
            <!-- Active Indicator -->
            <div 
              class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full transition-all duration-300"
              :class="$route.path === item.path ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-50 group-hover:scale-y-75 group-hover:opacity-30'"
            ></div>

            <component 
              :is="item.icon" 
              class="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-active:scale-95" 
              :class="$route.path === item.path ? 'text-blue-500' : 'text-slate-400 group-hover:text-blue-500'"
            />
            <span class="relative z-10 font-semibold tracking-wide">{{ item.label }}</span>
            
            <!-- Hover Shine Effect -->
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
          </router-link>
        </template>
      </nav>

      <!-- User Profile / Footer -->
      <div class="p-4 border-t border-slate-100 bg-slate-50/50">
        <div class="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white transition-colors cursor-pointer group border border-transparent hover:border-slate-200 hover:shadow-sm">
          <div class="w-9 h-9 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200 flex items-center justify-center shrink-0">
            <span class="font-bold text-xs text-slate-600">AD</span>
          </div>
          <div class="overflow-hidden">
             <p class="text-sm font-bold text-slate-700 truncate group-hover:text-rose-600 transition-colors">Admin Lab</p>
             <p class="text-xs text-slate-400 truncate">admin@itk.ac.id</p>
          </div>
          <button class="ml-auto text-slate-400 hover:text-slate-600 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </aside>

    <!-- Overlay for mobile -->
    <div 
      v-if="mobileMenuOpen" 
      class="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden transition-opacity"
      @click="mobileMenuOpen = false"
    ></div>

    <!-- Main Content Area -->
    <main class="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50 relative">
      <!-- Top Bar Mobile -->
      <div class="md:hidden h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 z-30">
         <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-gradient-to-tr from-rose-500 to-orange-500 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span class="font-bold text-slate-800">SINTA Pulse</span>
         </div>
         <button @click="mobileMenuOpen = true" class="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors">
           <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
           </svg>
         </button>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8 md:pt-10 scroll-smooth">
        <div class="max-w-7xl mx-auto w-full">
           <router-view v-slot="{ Component }">
            <transition 
              name="page" 
              mode="out-in"
              enter-active-class="transition-all duration-300 ease-out"
              leave-active-class="transition-all duration-200 ease-in"
              enter-from-class="opacity-0 translate-y-4"
              enter-to-class="opacity-100 translate-y-0"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-4"
            >
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const mobileMenuOpen = ref(false)

// Modern Minimalist Icons
const DashboardIcon = { template: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>' }
const GalleryIcon = { template: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>' }
const ClusterIcon = { template: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>' }
const RoadmapIcon = { template: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>' }
const ExpertiseIcon = { template: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>' }
const FundingIcon = { template: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>' }
const DTPSIcon = { template: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>' }

const menuItems = [
  { isHeader: true, label: 'Main Menu' },
  { path: '/dashboard', label: 'Dashboard', icon: DashboardIcon },
  
  { isHeader: true, label: 'Portofolio Riset' },
  { path: '/gallery', label: 'Koleksi Karya', icon: GalleryIcon },
  { path: '/collaboration', label: 'Kolaborasi & Lab', icon: ClusterIcon },
  { path: '/roadmap', label: 'Roadmap & Topik', icon: RoadmapIcon },
  
  { isHeader: true, label: 'Sumber Daya' },
  { path: '/accreditation', label: 'DTPS Akreditasi', icon: DTPSIcon },
  { path: '/expertise', label: 'Cari Pakar', icon: ExpertiseIcon },
  
  { isHeader: true, label: 'Finansial' },
  { path: '/funding', label: 'Dana & Hibah', icon: FundingIcon },
]
</script>

<style scoped>
/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 20px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background-color: #94a3b8;
}

/* Animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInLeft {
  from { opacity: 0; transform: translateX(-10px); }
  to { opacity: 1; transform: translateX(0); }
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out forwards;
  opacity: 0; /* Star hidden */
}

.animate-fade-in-left {
  animation: fadeInLeft 0.5s ease-out forwards;
  opacity: 0; /* Start hidden */
}

/* Page Transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
