<template>
  <div class="flex h-screen bg-slate-50 text-slate-600 font-sans selection:bg-rose-500/30">
    <!-- Sidebar -->
    <aside 
      class="fixed inset-y-0 left-0 z-50 w-72 bg-white/80 backdrop-blur-xl border-r border-slate-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0 flex flex-col shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]"
      :class="mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <!-- Sidebar Header -->
      <div class="h-24 flex items-center px-6 border-b border-slate-100/80 bg-slate-50/50 backdrop-blur-sm">
        <div class="flex items-center gap-3 group cursor-pointer w-full">
          <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100 p-1.5 shrink-0 group-hover:shadow-md transition-shadow">
            <img :src="`${baseUrl}images/logoSITRIA.png`" alt="SITRIA" class="w-full h-full object-contain" />
          </div>
          <div class="flex-1 min-w-0">
            <h1 class="font-black text-lg text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors leading-tight">
              SITRIA <span class="text-slate-400 font-bold">·</span> FSTI
            </h1>
            <p class="text-[9px] uppercase tracking-widest text-slate-400 font-bold group-hover:text-slate-500 transition-colors leading-tight mt-0.5">Sistem Informasi Tridarma Akademik</p>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto py-8 px-4 space-y-2 custom-scrollbar">
        <template v-for="(item, index) in menuItems" :key="item.isHeader ? `h-${item.label}` : item.path">
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

      <!-- Data Source Info -->
      <div class="px-4 pt-3">
        <div class="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-lg shadow-slate-900/10 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-16 h-16 bg-blue-500/20 rounded-full blur-xl -translate-y-1/2 translate-x-1/2"></div>
          <div class="relative z-10">
            <div class="flex items-center gap-2 mb-2">
              <svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sumber Data</p>
            </div>
            <p class="text-xs text-slate-200 leading-relaxed mb-2">
              Data diambil otomatis dari:
            </p>
            <div class="space-y-1.5">
              <a href="https://sinta.kemdiktisaintek.go.id" target="_blank" rel="noopener" class="flex items-center gap-1.5 text-xs font-semibold text-white hover:text-blue-300 transition-colors group">
                <span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>SINTA Kemendiktisaintek</span>
                <svg class="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
              <a href="https://scholar.google.com" target="_blank" rel="noopener" class="flex items-center gap-1.5 text-xs font-semibold text-white hover:text-blue-300 transition-colors group">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Google Scholar</span>
                <svg class="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
              <a href="https://pddikti.kemdiktisaintek.go.id" target="_blank" rel="noopener" class="flex items-center gap-1.5 text-xs font-semibold text-white hover:text-blue-300 transition-colors group">
                <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>PDDikti Kemendiktisaintek</span>
                <svg class="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
              <a href="https://repository.itk.ac.id" target="_blank" rel="noopener" class="flex items-center gap-1.5 text-xs font-semibold text-white hover:text-blue-300 transition-colors group">
                <span class="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                <span>Repository ITK</span>
                <svg class="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Credit -->
      <div class="px-4 pt-3 pb-4">
        <div class="flex items-center gap-3 px-2 py-1">
          <img :src="`${baseUrl}images/profil.jpg`" alt="ADL" class="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm shrink-0" />
          <div class="overflow-hidden">
            <p class="text-[9px] uppercase tracking-widest text-slate-400 font-bold leading-none">Dibuat oleh</p>
            <p class="text-sm font-black text-slate-700 tracking-tight mt-1">ADL</p>
          </div>
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
         <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 bg-white rounded-lg flex items-center justify-center border border-slate-100 p-1">
              <img :src="`${baseUrl}images/logoSITRIA.png`" alt="SITRIA" class="w-full h-full object-contain" />
            </div>
            <div class="flex flex-col leading-tight">
              <span class="font-bold text-slate-800 text-sm">SITRIA <span class="text-slate-400">·</span> FSTI</span>
              <span class="text-[8px] uppercase tracking-widest text-slate-400 font-bold">Tridarma Akademik</span>
            </div>
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
const baseUrl = import.meta.env.BASE_URL

// Modern Minimalist Icons
const DashboardIcon = { template: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>' }
const TeachingIcon = { template: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>' }
const ResearchIcon = { template: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>' }
const ServiceIcon = { template: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>' }
const ExpertiseIcon = { template: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>' }
const FundingIcon = { template: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>' }

const menuItems = [
  { path: '/dashboard', label: 'Ringkasan', icon: DashboardIcon },

  { isHeader: true, label: 'Tridarma' },
  { path: '/pengajaran', label: 'Pengajaran', icon: TeachingIcon },
  { path: '/penelitian', label: 'Penelitian', icon: ResearchIcon },
  { path: '/pengabdian', label: 'Pengabdian', icon: ServiceIcon },

  { isHeader: true, label: 'Pendukung' },
  { path: '/sdm-pakar', label: 'SDM & Pakar', icon: ExpertiseIcon },
  { path: '/funding', label: 'Pendanaan', icon: FundingIcon },
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
