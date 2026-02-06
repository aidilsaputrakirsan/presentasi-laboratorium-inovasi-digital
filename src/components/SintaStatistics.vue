<template>
  <div class="space-y-6">

    <!-- ==================== TV DISPLAY MODE ==================== -->
    <div v-if="tvMode" class="tv-display fixed inset-0 z-50 bg-slate-950 overflow-hidden" @mouseenter="pauseTv" @mouseleave="resumeTv">
      <!-- TV Header Bar -->
      <div class="relative h-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 flex items-center justify-between px-8">
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 bg-gradient-to-br from-rose-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-rose-500/20">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-lg font-black text-white tracking-tight">SINTA-Pulse</span>
              <span class="px-2 py-0.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[9px] font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span>
                Live
              </span>
            </div>
            <p class="text-slate-500 text-xs font-medium">{{ currentProdiName }}</p>
          </div>
        </div>
        <div class="flex items-center gap-6">
          <div class="text-right">
            <div class="text-slate-500 text-[10px] uppercase tracking-wider font-bold">Dosen</div>
            <div class="text-white text-lg font-black leading-none">{{ tvCurrentIndex + 1 }} <span class="text-slate-500 font-normal text-sm">/ {{ sintaLecturers.length }}</span></div>
          </div>
          <button @click="toggleTvMode" class="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 transition-all flex items-center justify-center">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- TV Main Content -->
      <div v-if="currentTvLecturer" class="h-[calc(100vh-4rem-6px)] flex">
        <!-- Left Panel: Photo + Identity -->
        <div class="w-[380px] flex-shrink-0 bg-gradient-to-b from-slate-900 to-slate-950 border-r border-slate-800/50 flex flex-col items-center justify-center p-8">
          <!-- Photo -->
          <div class="relative mb-6">
            <div class="w-44 h-44 rounded-full overflow-hidden border-4 border-slate-700 shadow-2xl shadow-black/50 bg-slate-800">
              <img
                :src="getPhotoUrl(currentTvLecturer)"
                :alt="currentTvLecturer.name"
                class="w-full h-full object-cover"
                @error="$event.target.style.display='none'; $event.target.nextElementSibling.style.display='flex'"
              />
              <div class="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center" style="display:none">
                <span class="text-5xl font-black text-white/90">{{ getInitials(currentTvLecturer.name) }}</span>
              </div>
            </div>
            <div class="absolute -bottom-1 -right-1 w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full border-4 border-slate-950 flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>

          <!-- Name -->
          <h2 class="text-2xl font-black text-white text-center leading-tight mb-2">{{ getShortDisplayName(currentTvLecturer.name) }}</h2>
          <p class="text-slate-500 text-sm font-medium mb-1">{{ currentTvLecturer.prodi }}</p>
          <p class="text-slate-600 text-xs font-mono">SINTA ID: {{ currentTvLecturer.sintaId }}</p>

          <!-- Quick Stats under photo -->
          <div class="grid grid-cols-2 gap-3 mt-8 w-full px-4">
            <div class="bg-slate-800/80 rounded-xl p-3 text-center border border-slate-700/50">
              <div class="text-2xl font-black text-rose-400">{{ currentTvLecturer.stats?.citations || 0 }}</div>
              <div class="text-[10px] uppercase tracking-wider text-slate-500 font-bold mt-0.5">Sitasi</div>
            </div>
            <div class="bg-slate-800/80 rounded-xl p-3 text-center border border-slate-700/50">
              <div class="text-2xl font-black text-purple-400">{{ currentTvLecturer.stats?.hIndex || 0 }}</div>
              <div class="text-[10px] uppercase tracking-wider text-slate-500 font-bold mt-0.5">H-Index</div>
            </div>
            <div class="bg-slate-800/80 rounded-xl p-3 text-center border border-slate-700/50">
              <div class="text-2xl font-black text-blue-400">{{ currentTvLecturer.researchTotal || currentTvLecturer.research?.length || 0 }}</div>
              <div class="text-[10px] uppercase tracking-wider text-slate-500 font-bold mt-0.5">Penelitian</div>
            </div>
            <div class="bg-slate-800/80 rounded-xl p-3 text-center border border-slate-700/50">
              <div class="text-2xl font-black text-emerald-400">{{ currentTvLecturer.servicesTotal || currentTvLecturer.services?.length || 0 }}</div>
              <div class="text-[10px] uppercase tracking-wider text-slate-500 font-bold mt-0.5">Pengabdian</div>
            </div>
          </div>
        </div>

        <!-- Right Panel: Detailed Stats -->
        <div class="flex-1 p-8 overflow-hidden flex flex-col gap-6">
          <!-- Row 1: Publication Cards -->
          <div class="grid grid-cols-2 gap-5">
            <!-- Scopus Card -->
            <div class="bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 rounded-2xl p-6 border border-indigo-500/20">
              <div class="flex items-center gap-2 mb-4">
                <div class="w-3 h-3 rounded-full bg-indigo-400"></div>
                <h3 class="text-lg font-bold text-indigo-300">Scopus (Internasional)</h3>
                <span class="ml-auto text-3xl font-black text-indigo-400">{{ currentTvLecturer.documents?.scopus?.total || 0 }}</span>
              </div>
              <div class="grid grid-cols-5 gap-2">
                <div v-for="q in ['q1','q2','q3','q4','noq']" :key="q" class="text-center">
                  <div class="text-2xl font-black" :class="(currentTvLecturer.documents?.scopus?.[q] || 0) > 0 ? 'text-indigo-300' : 'text-slate-700'">
                    {{ currentTvLecturer.documents?.scopus?.[q] || 0 }}
                  </div>
                  <div class="text-[10px] uppercase tracking-wider font-bold" :class="(currentTvLecturer.documents?.scopus?.[q] || 0) > 0 ? 'text-indigo-500' : 'text-slate-700'">
                    {{ q === 'noq' ? 'N/A' : q.toUpperCase() }}
                  </div>
                </div>
              </div>
            </div>

            <!-- SINTA Card -->
            <div class="bg-gradient-to-br from-sky-500/10 to-sky-600/5 rounded-2xl p-6 border border-sky-500/20">
              <div class="flex items-center gap-2 mb-4">
                <div class="w-3 h-3 rounded-full bg-sky-400"></div>
                <h3 class="text-lg font-bold text-sky-300">SINTA (Nasional)</h3>
                <span class="ml-auto text-3xl font-black text-sky-400">{{ currentTvLecturer.documents?.sinta?.total || 0 }}</span>
              </div>
              <div class="grid grid-cols-7 gap-2">
                <div v-for="s in ['s1','s2','s3','s4','s5','s6','unknown']" :key="s" class="text-center">
                  <div class="text-2xl font-black" :class="(currentTvLecturer.documents?.sinta?.[s] || 0) > 0 ? 'text-sky-300' : 'text-slate-700'">
                    {{ currentTvLecturer.documents?.sinta?.[s] || 0 }}
                  </div>
                  <div class="text-[10px] uppercase tracking-wider font-bold" :class="(currentTvLecturer.documents?.sinta?.[s] || 0) > 0 ? 'text-sky-500' : 'text-slate-700'">
                    {{ s === 'unknown' ? 'N/A' : s.toUpperCase() }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Row 2: Additional Stats + Chart -->
          <div class="grid grid-cols-3 gap-5 flex-1">
            <!-- Google Scholar -->
            <div class="bg-slate-800/60 rounded-2xl p-5 border border-slate-700/50 flex flex-col items-center justify-center">
              <div class="text-4xl font-black text-orange-400 mb-1">{{ currentTvLecturer.documents?.googlescholar?.total || 0 }}</div>
              <div class="text-xs uppercase tracking-wider text-slate-500 font-bold">Google Scholar</div>
            </div>

            <!-- IPR -->
            <div class="bg-slate-800/60 rounded-2xl p-5 border border-slate-700/50 flex flex-col items-center justify-center">
              <div class="text-4xl font-black text-amber-400 mb-1">{{ currentTvLecturer.ipr?.total || 0 }}</div>
              <div class="text-xs uppercase tracking-wider text-slate-500 font-bold">IPR / HKI</div>
            </div>

            <!-- Books -->
            <div class="bg-slate-800/60 rounded-2xl p-5 border border-slate-700/50 flex flex-col items-center justify-center">
              <div class="text-4xl font-black text-teal-400 mb-1">{{ currentTvLecturer.booksTotal || currentTvLecturer.books?.length || 0 }}</div>
              <div class="text-xs uppercase tracking-wider text-slate-500 font-bold">Buku</div>
            </div>
          </div>

          <!-- Row 3: Recent Publications List -->
          <div class="bg-slate-800/40 rounded-2xl p-5 border border-slate-700/30 flex-1 overflow-hidden">
            <div class="flex items-center gap-2 mb-3">
              <div class="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
              <h3 class="text-sm font-bold text-slate-400 uppercase tracking-wider">Publikasi Terbaru</h3>
            </div>
            <div class="space-y-2">
              <div
                v-for="(pub, pi) in getRecentPublications(currentTvLecturer)"
                :key="pi"
                class="flex items-start gap-3 py-2 border-b border-slate-800/50 last:border-0"
              >
                <span class="flex-shrink-0 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mt-0.5"
                  :class="pub.category.includes('Scopus') ? 'bg-indigo-500/20 text-indigo-400' : pub.category.includes('SINTA') ? 'bg-sky-500/20 text-sky-400' : 'bg-slate-700 text-slate-400'"
                >{{ pub.category }}</span>
                <span class="text-sm text-slate-300 leading-snug line-clamp-2">{{ pub.title }}</span>
                <span v-if="pub.year" class="flex-shrink-0 text-xs text-slate-600 font-mono">{{ pub.year }}</span>
              </div>
              <div v-if="getRecentPublications(currentTvLecturer).length === 0" class="text-center text-slate-600 text-sm py-4">
                Belum ada data publikasi
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- TV Progress Bar -->
      <div class="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-800">
        <div
          class="h-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 transition-none"
          :class="{ 'tv-progress-animate': !tvPaused }"
          :style="{ animationDuration: tvInterval + 'ms' }"
        ></div>
      </div>

      <!-- TV Navigation (visible on hover) -->
      <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 opacity-0 hover:opacity-100 transition-opacity duration-300" style="pointer-events: auto;">
        <button @click.stop="prevSlide" class="w-10 h-10 rounded-full bg-slate-800/90 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 transition-all flex items-center justify-center backdrop-blur-sm">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <div class="px-4 py-2 rounded-full bg-slate-800/90 border border-slate-700 backdrop-blur-sm">
          <span class="text-xs font-bold text-slate-400">
            {{ tvPaused ? 'PAUSED' : 'AUTO' }} | {{ Math.round(tvInterval / 1000) }}s
          </span>
        </div>
        <button @click.stop="nextSlide" class="w-10 h-10 rounded-full bg-slate-800/90 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 transition-all flex items-center justify-center backdrop-blur-sm">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- ==================== NORMAL TABLE MODE ==================== -->

    <!-- Header -->
    <!-- Header -->
    <div class="relative overflow-hidden rounded-2xl bg-slate-900 shadow-xl border border-slate-800">
      <!-- Background Effects -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      <div class="relative p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="flex items-center gap-5">
          <!-- Pulse Logo -->
          <div class="relative group">
            <div class="w-16 h-16 bg-gradient-to-br from-rose-500 via-pink-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform duration-300">
              <svg class="w-8 h-8 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <!-- Pulse ring -->
            <div class="absolute inset-0 rounded-2xl bg-rose-500/40 animate-ping opacity-75"></div>
          </div>
          <div>
            <div class="flex items-center gap-3 mb-1">
              <h1 class="text-3xl font-black text-white tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">SINTA-Pulse</h1>
              <span class="px-2.5 py-0.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold rounded-full uppercase tracking-wider backdrop-blur-sm flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span>
                Live Sync
              </span>
            </div>
            <p class="text-slate-400 font-medium">Dashboard Monitoring Performa Dosen & Tridarma</p>
          </div>
        </div>
        
        <div class="flex items-center gap-4 z-10">
          <div class="hidden md:flex flex-col items-end">
            <span class="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Total Dosen</span>
            <span class="text-2xl font-bold text-white leading-none">{{ sintaLecturers.length }}</span>
          </div>
          <!-- TV Display Toggle -->
          <button
            @click="toggleTvMode"
            class="group bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:from-purple-500 hover:to-indigo-500 transition-all flex items-center gap-2 shadow-lg shadow-purple-500/25 border border-white/10"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <span>TV Display</span>
          </button>
          <a
            href="https://sinta.kemdiktisaintek.go.id"
            target="_blank"
            class="group bg-gradient-to-r from-rose-600 to-pink-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:from-rose-500 hover:to-pink-500 transition-all flex items-center gap-2 shadow-lg shadow-rose-500/25 border border-white/10"
          >
            <span>Buka SINTA</span>
            <svg class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </a>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center border border-blue-200 hover:shadow-md transition-all group">
          <div class="text-2xl font-black text-blue-600 group-hover:scale-110 transition-transform">{{ stats.totalResearch }}</div>
          <div class="text-xs uppercase tracking-wider text-blue-700 mt-1 font-bold">Penelitian</div>
        </div>
        <div class="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 text-center border border-emerald-200 hover:shadow-md transition-all group">
          <div class="text-2xl font-black text-emerald-600 group-hover:scale-110 transition-transform">{{ stats.totalServices }}</div>
          <div class="text-xs uppercase tracking-wider text-emerald-700 mt-1 font-bold">Pengabdian</div>
        </div>
        <div class="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 text-center border border-indigo-200 hover:shadow-md transition-all group">
          <div class="text-2xl font-black text-indigo-600 group-hover:scale-110 transition-transform">{{ stats.totalScopus }}</div>
          <div class="text-xs uppercase tracking-wider text-indigo-700 mt-1 font-bold">Scopus</div>
        </div>
        <div class="bg-gradient-to-br from-sky-50 to-sky-100 rounded-xl p-4 text-center border border-sky-200 hover:shadow-md transition-all group">
          <div class="text-2xl font-black text-sky-600 group-hover:scale-110 transition-transform">{{ stats.totalSinta }}</div>
          <div class="text-xs uppercase tracking-wider text-sky-700 mt-1 font-bold">SINTA</div>
        </div>
        <div class="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 text-center border border-orange-200 hover:shadow-md transition-all group">
          <div class="text-2xl font-black text-orange-600 group-hover:scale-110 transition-transform">{{ stats.totalGoogle }}</div>
          <div class="text-xs uppercase tracking-wider text-orange-700 mt-1 font-bold">G.Scholar</div>
        </div>
        <div class="bg-gradient-to-br from-rose-50 to-rose-100 rounded-xl p-4 text-center border border-rose-200 hover:shadow-md transition-all group">
          <div class="text-2xl font-black text-rose-600 group-hover:scale-110 transition-transform">{{ stats.totalCitations }}</div>
          <div class="text-xs uppercase tracking-wider text-rose-700 mt-1 font-bold">Sitasi</div>
        </div>
        <div class="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 text-center border border-amber-200 hover:shadow-md transition-all group">
          <div class="text-2xl font-black text-amber-600 group-hover:scale-110 transition-transform">{{ stats.totalIpr }}</div>
          <div class="text-xs uppercase tracking-wider text-amber-700 mt-1 font-bold">IPR/HKI</div>
        </div>
        <div class="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-4 text-center border border-teal-200 hover:shadow-md transition-all group">
          <div class="text-2xl font-black text-teal-600 group-hover:scale-110 transition-transform">{{ stats.totalBooks }}</div>
          <div class="text-xs uppercase tracking-wider text-teal-700 mt-1 font-bold">Buku</div>
        </div>
        <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center border border-purple-200 hover:shadow-md transition-all group">
          <div class="text-2xl font-black text-purple-600 group-hover:scale-110 transition-transform">{{ sintaLecturers.length }}</div>
          <div class="text-xs uppercase tracking-wider text-purple-700 mt-1 font-bold">Dosen</div>
        </div>
      </div>
    </div>

    <!-- Charts Row 1 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Publikasi Breakdown -->
      <div class="card hover:shadow-lg transition-shadow">
        <div class="mb-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 bg-indigo-500 rounded-full"></span>
              <h3 class="text-lg font-bold text-slate-800">Kategori Publikasi</h3>
            </div>
            <div class="flex gap-2 text-[10px] uppercase tracking-tighter">
              <span class="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded">Scopus</span>
              <span class="px-2 py-0.5 bg-sky-100 text-sky-700 rounded">SINTA</span>
            </div>
          </div>
          <p class="text-xs text-slate-400 mt-1">Data kumulatif keseluruhan karir dosen</p>
        </div>
        <div class="h-64">
          <Bar v-if="hasPublicationData" :data="publicationChartData" :options="publicationChartOptions" />
          <div v-else class="h-full flex items-center justify-center text-slate-400 text-sm">Data publikasi tidak tersedia</div>
        </div>
      </div>

      <!-- Top Dosen by Sitasi -->
      <div class="card hover:shadow-lg transition-shadow">
        <div class="mb-4">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 bg-rose-500 rounded-full"></span>
            <h3 class="text-lg font-bold text-slate-800">Top Dosen - Sitasi</h3>
          </div>
          <p class="text-xs text-slate-400 mt-1">Sitasi kumulatif dari Google Scholar (lebih komprehensif)</p>
        </div>
        <div class="h-64">
          <Bar :data="citationChartData" :options="horizontalBarOptions" />
        </div>
      </div>
    </div>

    <!-- Charts Row 2 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Distribusi IPR -->
      <div class="card hover:shadow-lg transition-shadow">
        <div class="mb-4">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 bg-amber-500 rounded-full"></span>
            <h3 class="text-lg font-bold text-slate-800">Proporsi IPR/HKI</h3>
          </div>
          <p class="text-xs text-slate-400 mt-1">Hak Kekayaan Intelektual terdaftar</p>
        </div>
        <div class="h-64 flex items-center justify-center">
          <div v-if="stats.totalIpr > 0" class="w-full h-full">
            <Doughnut :data="iprChartData" :options="doughnutOptions" />
          </div>
          <div v-else class="flex flex-col items-center justify-center text-slate-400 space-y-2">
            <svg class="w-12 h-12 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <p class="text-sm font-medium">Belum ada data IPR terverifikasi</p>
          </div>
        </div>
      </div>

      <!-- Produktivitas Dosen -->
      <div class="card hover:shadow-lg transition-shadow">
        <div class="mb-4">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 bg-emerald-500 rounded-full"></span>
            <h3 class="text-lg font-bold text-slate-800">Produktivitas Tridarma</h3>
          </div>
          <p class="text-xs text-slate-400 mt-1">Top 10 dosen | Publikasi = Scopus + SINTA Garuda</p>
        </div>
        <div class="h-64">
          <Bar :data="productivityChartData" :options="stackedBarOptions" />
        </div>
      </div>
    </div>

    <!-- Tabel Detail -->
    <div class="card">
      <div class="flex items-center justify-between mb-4">
        <div class="flex flex-col">
          <div class="flex items-center gap-3">
            <h3 class="text-lg font-bold text-slate-800">Detail Performa Dosen</h3>
            <!-- Year Filter -->
            <select
              v-model="yearFilter"
              class="px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 font-medium text-slate-600"
            >
              <option value="all">Semua Tahun</option>
              <option value="3">3 Tahun Terakhir</option>
              <option value="5">5 Tahun Terakhir</option>
            </select>
            <span v-if="yearFilter !== 'all'" class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
              Filter Aktif: Penelitian, Pengabdian, Scopus, SINTA
            </span>
          </div>
          <p class="text-sm text-slate-500">{{ yearFilter === 'all' ? 'Data kumulatif keseluruhan karir' : 'Filter ' + yearFilter + ' tahun terakhir (Penelitian, Pengabdian, Scopus, SINTA)' }} | Kolom "-" = tanpa kategori</p>
        </div>
      </div>

      <div class="overflow-x-auto rounded-xl border border-slate-100">
        <table class="w-full">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200">
              <th class="text-left py-4 px-4 font-bold text-slate-600 uppercase tracking-wider text-xs" rowspan="2">
                <button @click="sortBy('name')" class="flex items-center gap-1 hover:text-slate-900 transition-colors">
                  Nama Dosen
                  <SortIcon :active="sortColumn === 'name'" :direction="sortDirection" />
                </button>
              </th>
              <th class="text-center py-3 px-2 font-bold text-blue-600 uppercase tracking-wider text-xs" rowspan="2">
                <button @click="sortBy('research')" class="flex items-center gap-1 justify-center w-full">
                  Penelitian
                  <SortIcon :active="sortColumn === 'research'" :direction="sortDirection" />
                </button>
              </th>
              <th class="text-center py-3 px-2 font-bold text-emerald-600 uppercase tracking-wider text-xs" rowspan="2">
                <button @click="sortBy('services')" class="flex items-center gap-1 justify-center w-full">
                  Pengabdian
                  <SortIcon :active="sortColumn === 'services'" :direction="sortDirection" />
                </button>
              </th>
              <th class="text-center py-3 px-2 font-bold text-orange-600 uppercase tracking-wider text-xs" rowspan="2">
                <div class="flex items-center justify-center gap-1 group/tooltip relative">
                  <button @click="sortBy('google')" class="flex items-center gap-1 justify-center">
                    G.Scholar
                    <SortIcon :active="sortColumn === 'google'" :direction="sortDirection" />
                  </button>
                  <div class="hidden group-hover/tooltip:block absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 p-2 bg-slate-800 text-white text-[10px] font-medium rounded shadow-lg z-50 normal-case leading-tight text-center">
                    Data diambil langsung (real-time) dari profil Google Scholar, mungkin berbeda dengan sinkronisasi SINTA.
                    <div class="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-slate-800"></div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3 h-3 text-orange-400 cursor-help">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" />
                  </svg>
                </div>
              </th>
              <th class="text-center py-2 px-2 font-bold text-indigo-600 uppercase tracking-wider text-xs border-l border-slate-200 bg-indigo-50/50" colspan="6">
                Scopus (Internasional)
              </th>
              <th class="text-center py-2 px-2 font-bold text-sky-600 uppercase tracking-wider text-xs border-l border-slate-200 bg-sky-50/50" colspan="8">
                SINTA (Nasional)
              </th>
              <th class="text-center py-3 px-2 font-bold text-rose-600 uppercase tracking-wider text-xs border-l border-slate-200" rowspan="2">
                <button @click="sortBy('citations')" class="flex items-center gap-1 justify-center w-full">
                  Sitasi
                  <SortIcon :active="sortColumn === 'citations'" :direction="sortDirection" />
                </button>
              </th>
              <th class="text-center py-3 px-2 font-bold text-purple-600 uppercase tracking-wider text-xs" rowspan="2">
                <button @click="sortBy('hIndex')" class="flex items-center gap-1 justify-center w-full">
                  H-Index
                  <SortIcon :active="sortColumn === 'hIndex'" :direction="sortDirection" />
                </button>
              </th>
              <th class="text-center py-3 px-2 font-bold text-amber-600 uppercase tracking-wider text-xs" rowspan="2">
                <button @click="sortBy('ipr')" class="flex items-center gap-1 justify-center w-full">
                  IPR
                  <SortIcon :active="sortColumn === 'ipr'" :direction="sortDirection" />
                </button>
              </th>
              <th class="text-center py-3 px-2 font-bold text-teal-600 uppercase tracking-wider text-xs" rowspan="2">
                Buku
              </th>
              <th class="text-center py-3 px-4 font-bold text-slate-400 uppercase tracking-wider text-xs" rowspan="2">Link</th>
            </tr>
            <tr class="bg-slate-50/50 border-b border-slate-200">
              <th class="text-center py-2 px-1 font-semibold text-indigo-800 text-[11px] border-l border-slate-200 bg-indigo-100/50">Q1</th>
              <th class="text-center py-2 px-1 font-semibold text-indigo-700 text-[11px] bg-indigo-50/50">Q2</th>
              <th class="text-center py-2 px-1 font-semibold text-indigo-600 text-[11px] bg-indigo-50/30">Q3</th>
              <th class="text-center py-2 px-1 font-semibold text-indigo-500 text-[11px] bg-indigo-50/20">Q4</th>
              <th class="text-center py-2 px-1 font-semibold text-slate-400 text-[11px]" title="Tanpa Quartile">-</th>
              <th class="text-center py-2 px-1 font-semibold text-indigo-600 text-[11px] bg-indigo-100/30">Jml</th>
              <th class="text-center py-2 px-1 font-semibold text-sky-800 text-[11px] border-l border-slate-200 bg-sky-100/50">S1</th>
              <th class="text-center py-2 px-1 font-semibold text-sky-700 text-[11px] bg-sky-50/50">S2</th>
              <th class="text-center py-2 px-1 font-semibold text-sky-600 text-[11px] bg-sky-50/40">S3</th>
              <th class="text-center py-2 px-1 font-semibold text-sky-500 text-[11px] bg-sky-50/30">S4</th>
              <th class="text-center py-2 px-1 font-semibold text-sky-400 text-[11px] bg-sky-50/20">S5</th>
              <th class="text-center py-2 px-1 font-semibold text-sky-300 text-[11px]">S6</th>
              <th class="text-center py-2 px-1 font-semibold text-slate-400 text-[11px]" title="Tanpa Akreditasi">-</th>
              <th class="text-center py-2 px-1 font-semibold text-sky-600 text-[11px] bg-sky-100/30">Jml</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr
              v-for="(lecturer, index) in sortedLecturers"
              :key="lecturer.sintaId"
              class="group hover:bg-slate-50/80 transition-all duration-200"
            >
              <td class="py-3 px-4">
                <div class="font-bold text-slate-800 group-hover:text-green-700 transition-colors text-sm">{{ lecturer.name }}</div>
                <div class="text-xs text-slate-400 font-medium">SINTA ID: {{ lecturer.sintaId }}</div>
              </td>
              <td class="text-center py-3 px-2">
                <span :class="[
                  'inline-flex items-center justify-center min-w-[2rem] h-8 px-2 rounded-lg font-bold text-sm border',
                  yearFilter !== 'all' ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-blue-50 text-blue-700 border-blue-100'
                ]">
                  {{ getFilteredResearchCount(lecturer) }}
                </span>
              </td>
              <td class="text-center py-3 px-2">
                <span :class="[
                  'inline-flex items-center justify-center min-w-[2rem] h-8 px-2 rounded-lg font-bold text-sm border',
                  yearFilter !== 'all' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                ]">
                  {{ getFilteredServicesCount(lecturer) }}
                </span>
              </td>
              <!-- Google Scholar & RAMA -->
              <td class="text-center py-3 px-2">
                <span :class="[
                  'inline-flex items-center justify-center min-w-[2rem] h-8 px-2 rounded-lg font-bold text-sm border',
                  (lecturer.documents?.googlescholar?.total || 0) > 0 ? 'bg-orange-50 text-orange-700 border-orange-100' : 'bg-slate-50 text-slate-300 border-slate-100'
                ]">
                  {{ lecturer.documents?.googlescholar?.total || 0 }}
                </span>
              </td>
              <!-- Scopus Q1-Q4 (with year filtering) -->
              <td class="text-center py-3 px-1 border-l border-slate-100 bg-indigo-50/20">
                <span :class="['font-bold text-sm', getFilteredScopusCounts(lecturer).q1 > 0 ? 'text-indigo-800' : 'text-slate-300']">
                  {{ getFilteredScopusCounts(lecturer).q1 }}
                </span>
              </td>
              <td class="text-center py-3 px-1 bg-indigo-50/10">
                <span :class="['font-bold text-sm', getFilteredScopusCounts(lecturer).q2 > 0 ? 'text-indigo-700' : 'text-slate-300']">
                  {{ getFilteredScopusCounts(lecturer).q2 }}
                </span>
              </td>
              <td class="text-center py-3 px-1">
                <span :class="['font-bold text-sm', getFilteredScopusCounts(lecturer).q3 > 0 ? 'text-indigo-600' : 'text-slate-300']">
                  {{ getFilteredScopusCounts(lecturer).q3 }}
                </span>
              </td>
              <td class="text-center py-3 px-1">
                <span :class="['font-bold text-sm', getFilteredScopusCounts(lecturer).q4 > 0 ? 'text-indigo-500' : 'text-slate-300']">
                  {{ getFilteredScopusCounts(lecturer).q4 }}
                </span>
              </td>
              <td class="text-center py-3 px-1">
                <span :class="['font-bold text-sm', getFilteredScopusCounts(lecturer).noq > 0 ? 'text-slate-500' : 'text-slate-300']">
                  {{ getFilteredScopusCounts(lecturer).noq }}
                </span>
              </td>
              <td class="text-center py-3 px-1">
                <span :class="[
                  'inline-flex items-center justify-center min-w-[1.5rem] h-6 px-1 rounded font-bold text-xs',
                  yearFilter !== 'all' ? 'bg-indigo-200 text-indigo-800' : 'bg-indigo-100 text-indigo-700'
                ]">
                  {{ getFilteredScopusCounts(lecturer).total }}
                </span>
              </td>
              <!-- SINTA S1-S6 (with year filtering) -->
              <td class="text-center py-3 px-1 border-l border-slate-100 bg-sky-50/20">
                <span :class="['font-bold text-sm', getFilteredSintaCounts(lecturer).s1 > 0 ? 'text-sky-800' : 'text-slate-300']">
                  {{ getFilteredSintaCounts(lecturer).s1 }}
                </span>
              </td>
              <td class="text-center py-3 px-1 bg-sky-50/10">
                <span :class="['font-bold text-sm', getFilteredSintaCounts(lecturer).s2 > 0 ? 'text-sky-700' : 'text-slate-300']">
                  {{ getFilteredSintaCounts(lecturer).s2 }}
                </span>
              </td>
              <td class="text-center py-3 px-1">
                <span :class="['font-bold text-sm', getFilteredSintaCounts(lecturer).s3 > 0 ? 'text-sky-600' : 'text-slate-300']">
                  {{ getFilteredSintaCounts(lecturer).s3 }}
                </span>
              </td>
              <td class="text-center py-3 px-1">
                <span :class="['font-bold text-sm', getFilteredSintaCounts(lecturer).s4 > 0 ? 'text-sky-500' : 'text-slate-300']">
                  {{ getFilteredSintaCounts(lecturer).s4 }}
                </span>
              </td>
              <td class="text-center py-3 px-1">
                <span :class="['font-bold text-sm', getFilteredSintaCounts(lecturer).s5 > 0 ? 'text-sky-400' : 'text-slate-300']">
                  {{ getFilteredSintaCounts(lecturer).s5 }}
                </span>
              </td>
              <td class="text-center py-3 px-1">
                <span :class="['font-bold text-sm', getFilteredSintaCounts(lecturer).s6 > 0 ? 'text-sky-300' : 'text-slate-300']">
                  {{ getFilteredSintaCounts(lecturer).s6 }}
                </span>
              </td>
              <td class="text-center py-3 px-1">
                <span :class="['font-bold text-sm', getFilteredSintaCounts(lecturer).unknown > 0 ? 'text-slate-500' : 'text-slate-300']">
                  {{ getFilteredSintaCounts(lecturer).unknown }}
                </span>
              </td>
              <td class="text-center py-3 px-1">
                <span :class="[
                  'inline-flex items-center justify-center min-w-[1.5rem] h-6 px-1 rounded font-bold text-xs',
                  yearFilter !== 'all' ? 'bg-sky-200 text-sky-800' : 'bg-sky-100 text-sky-700'
                ]">
                  {{ getFilteredSintaCounts(lecturer).total }}
                </span>
              </td>
              <!-- Sitasi -->
              <td class="text-center py-3 px-2 border-l border-slate-100">
                <span class="font-bold text-rose-700 text-sm">{{ lecturer.stats?.citations || 0 }}</span>
              </td>
              <!-- H-Index -->
              <td class="text-center py-3 px-2">
                <span class="font-bold text-purple-700 text-sm">{{ lecturer.stats?.hIndex || 0 }}</span>
              </td>
              <!-- IPR -->
              <td class="text-center py-3 px-2">
                <span :class="[
                  'inline-flex items-center justify-center min-w-[1.5rem] h-6 px-2 rounded font-bold text-sm',
                  lecturer.ipr?.total > 0 ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-slate-50 text-slate-300'
                ]">
                  {{ lecturer.ipr?.total || 0 }}
                </span>
              </td>
              <!-- Buku -->
              <td class="text-center py-3 px-2">
                <span :class="[
                  'inline-flex items-center justify-center min-w-[1.5rem] h-6 px-2 rounded font-bold text-sm',
                  lecturer.books?.length > 0 ? 'bg-teal-100 text-teal-700 border border-teal-200' : 'bg-slate-50 text-slate-300'
                ]">
                  {{ lecturer.books?.length || 0 }}
                </span>
              </td>
              <td class="text-center py-3 px-4">
                <a
                  :href="`https://sinta.kemdiktisaintek.go.id/authors/profile/${lecturer.sintaId}`"
                  target="_blank"
                  class="text-slate-300 hover:text-green-600 transition-colors"
                >
                  <svg class="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </a>
              </td>
            </tr>
          </tbody>
          <!-- Footer totals -->
          <tfoot class="bg-slate-100 border-t-2 border-slate-300">
            <tr class="font-bold">
              <td class="py-4 px-4 text-slate-700 text-sm">TOTAL</td>
              <td class="text-center py-4 px-2 text-blue-700 text-sm">{{ filteredTotalResearch }}</td>
              <td class="text-center py-4 px-2 text-emerald-700 text-sm">{{ filteredTotalServices }}</td>
              <td class="text-center py-4 px-2 text-orange-700 text-sm">{{ stats.totalGoogle }}</td>
              <td class="text-center py-4 px-1 border-l border-slate-200 text-indigo-800 text-sm">{{ filteredScopusTotals.q1 }}</td>
              <td class="text-center py-4 px-1 text-indigo-700 text-sm">{{ filteredScopusTotals.q2 }}</td>
              <td class="text-center py-4 px-1 text-indigo-600 text-sm">{{ filteredScopusTotals.q3 }}</td>
              <td class="text-center py-4 px-1 text-indigo-500 text-sm">{{ filteredScopusTotals.q4 }}</td>
              <td class="text-center py-4 px-1 text-slate-500 text-sm">{{ filteredScopusTotals.noq }}</td>
              <td class="text-center py-4 px-1 text-indigo-700 text-sm bg-indigo-100 rounded">{{ filteredScopusTotals.total }}</td>
              <td class="text-center py-4 px-1 border-l border-slate-200 text-sky-800 text-sm">{{ filteredSintaTotals.s1 }}</td>
              <td class="text-center py-4 px-1 text-sky-700 text-sm">{{ filteredSintaTotals.s2 }}</td>
              <td class="text-center py-4 px-1 text-sky-600 text-sm">{{ filteredSintaTotals.s3 }}</td>
              <td class="text-center py-4 px-1 text-sky-500 text-sm">{{ filteredSintaTotals.s4 }}</td>
              <td class="text-center py-4 px-1 text-sky-400 text-sm">{{ filteredSintaTotals.s5 }}</td>
              <td class="text-center py-4 px-1 text-sky-300 text-sm">{{ filteredSintaTotals.s6 }}</td>
              <td class="text-center py-4 px-1 text-slate-500 text-sm">{{ filteredSintaTotals.unknown }}</td>
              <td class="text-center py-4 px-1 text-sky-700 text-sm bg-sky-100 rounded">{{ filteredSintaTotals.total }}</td>
              <td class="text-center py-4 px-2 border-l border-slate-200 text-rose-700 text-sm">{{ stats.totalCitations }}</td>
              <td class="text-center py-4 px-2 text-purple-700 text-sm">-</td>
              <td class="text-center py-4 px-2 text-amber-700 text-sm">{{ stats.totalIpr }}</td>
              <td class="text-center py-4 px-2 text-teal-700 text-sm">{{ stats.totalBooks }}</td>
              <td class="py-4 px-4"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>

    <!-- Info Update -->
    <div class="text-center text-sm text-slate-500 pb-6 space-y-2">
      <div class="flex items-center justify-center gap-3">
        <div class="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full">
          <div class="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
          <span class="text-xs font-semibold text-slate-600">SINTA-Pulse Active</span>
        </div>
        <span v-if="metadata" class="text-slate-400">|</span>
        <span v-if="metadata" class="text-slate-500">Last sync: {{ formatDate(metadata.generatedAt) }}</span>
      </div>
      <p class="text-xs text-slate-400">
        Data kumulatif keseluruhan karir dosen dari SINTA Kemdiktisaintek
      </p>
    </div>
  </div>
</template>

<script>
import { Bar, Doughnut } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
} from 'chart.js';

import { prodiRegistry, prodiList } from '../data/prodi/index.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
);

const SortIcon = {
  props: ['active', 'direction'],
  template: `
    <svg class="w-3 h-3 transition-opacity" :class="{ 'opacity-10': !active, 'rotate-180': active && direction === 'asc' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path>
    </svg>
  `
};

export default {
  name: 'SintaStatistics',
  components: { Bar, Doughnut, SortIcon },
  props: {
    selectedProdi: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      sortColumn: 'scopus',
      sortDirection: 'desc',
      yearFilter: 'all', // 'all', '3', '5'
      // TV Display mode
      tvMode: false,
      tvCurrentIndex: 0,
      tvTimer: null,
      tvInterval: 8000,
      tvPaused: false
    };
  },
  beforeUnmount() {
    this.stopTvTimer();
  },
  computed: {
    metadata() {
      for (const p of prodiList.filter(p => p.hasData)) {
        const data = prodiRegistry[p.slug];
        if (data?.sintaData?.metadata) return data.sintaData.metadata;
      }
      return null;
    },
    sintaLecturers() {
      if (!this.selectedProdi) {
        const allLecturers = [];
        prodiList.filter(p => p.hasData).forEach(p => {
          const data = prodiRegistry[p.slug];
          if (data?.sintaData?.lecturers) allLecturers.push(...data.sintaData.lecturers);
        });
        return allLecturers;
      }
      const prodi = prodiList.find(p => p.name === this.selectedProdi);
      if (prodi && prodiRegistry[prodi.slug]?.sintaData?.lecturers) {
        return prodiRegistry[prodi.slug].sintaData.lecturers;
      }
      return [];
    },
    sortedLecturers() {
      const lecturers = [...this.sintaLecturers];
      const col = this.sortColumn;
      const dir = this.sortDirection === 'asc' ? 1 : -1;
      return lecturers.sort((a, b) => {
        let valA, valB;
        if (col === 'name') {
          valA = a.name.toLowerCase(); valB = b.name.toLowerCase();
          return valA < valB ? -1 * dir : valA > valB ? 1 * dir : 0;
        }
        if (col === 'research') { valA = a.research?.length || 0; valB = b.research?.length || 0; }
        else if (col === 'services') { valA = a.services?.length || 0; valB = b.services?.length || 0; }
        else if (col === 'google') { valA = a.documents?.googlescholar?.total || 0; valB = b.documents?.googlescholar?.total || 0; }
        else if (col === 'rama') { valA = a.documents?.rama?.total || 0; valB = b.documents?.rama?.total || 0; }
        else if (col === 'scopus') { valA = a.documents?.scopus?.total || 0; valB = b.documents?.scopus?.total || 0; }
        else if (col === 'sinta') { valA = a.documents?.sinta?.total || 0; valB = b.documents?.sinta?.total || 0; }
        else if (col === 'citations') { valA = a.stats?.citations || 0; valB = b.stats?.citations || 0; }
        else if (col === 'hIndex') { valA = a.stats?.hIndex || 0; valB = b.stats?.hIndex || 0; }
        else if (col === 'ipr') { valA = a.ipr?.total || 0; valB = b.ipr?.total || 0; }
        return (valA - valB) * dir;
      });
    },
    stats() {
      const s = { totalResearch: 0, totalServices: 0, totalScopus: 0, totalSinta: 0, totalCitations: 0, totalIpr: 0, totalBooks: 0, totalGoogle: 0, totalRama: 0 };
      this.sintaLecturers.forEach(l => {
        s.totalResearch += l.researchTotal || l.research?.length || 0;
        s.totalServices += l.servicesTotal || l.services?.length || 0;
        s.totalScopus += l.documents?.scopus?.total || 0;
        s.totalSinta += l.documents?.sinta?.total || 0;
        s.totalGoogle += l.documents?.googlescholar?.total || 0;
        s.totalRama += l.documents?.rama?.total || 0;
        s.totalCitations += l.stats?.citations || 0;
        s.totalIpr += l.ipr?.total || 0;
        s.totalBooks += l.books?.length || 0;
      });
      return s;
    },
    scopusTotals() {
      const t = { q1: 0, q2: 0, q3: 0, q4: 0, noq: 0 };
      this.sintaLecturers.forEach(l => {
        t.q1 += l.documents?.scopus?.q1 || 0;
        t.q2 += l.documents?.scopus?.q2 || 0;
        t.q3 += l.documents?.scopus?.q3 || 0;
        t.q4 += l.documents?.scopus?.q4 || 0;
        t.noq += l.documents?.scopus?.noq || 0;
      });
      return t;
    },
    sintaTotals() {
      const t = { s1: 0, s2: 0, s3: 0, s4: 0, s5: 0, s6: 0, unknown: 0 };
      this.sintaLecturers.forEach(l => {
        t.s1 += l.documents?.sinta?.s1 || 0;
        t.s2 += l.documents?.sinta?.s2 || 0;
        t.s3 += l.documents?.sinta?.s3 || 0;
        t.s4 += l.documents?.sinta?.s4 || 0;
        t.s5 += l.documents?.sinta?.s5 || 0;
        t.s6 += l.documents?.sinta?.s6 || 0;
        t.unknown += l.documents?.sinta?.unknown || 0;
      });
      return t;
    },
    hasPublicationData() { return this.stats.totalScopus > 0 || this.stats.totalSinta > 0; },
    publicationChartData() {
      const scopus = { q1: 0, q2: 0, q3: 0, q4: 0 };
      const sinta = { s1: 0, s2: 0, s3: 0, s4: 0, s5: 0, s6: 0 };
      this.sintaLecturers.forEach(l => {
        if (l.documents?.scopus) {
          scopus.q1 += l.documents.scopus.q1 || 0; scopus.q2 += l.documents.scopus.q2 || 0;
          scopus.q3 += l.documents.scopus.q3 || 0; scopus.q4 += l.documents.scopus.q4 || 0;
        }
        if (l.documents?.sinta) {
          sinta.s1 += l.documents.sinta.s1 || 0; sinta.s2 += l.documents.sinta.s2 || 0;
          sinta.s3 += l.documents.sinta.s3 || 0; sinta.s4 += l.documents.sinta.s4 || 0;
          sinta.s5 += l.documents.sinta.s5 || 0; sinta.s6 += l.documents.sinta.s6 || 0;
        }
      });
      return {
        labels: ['Q1', 'Q2', 'Q3', 'Q4', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6'],
        datasets: [
          { label: 'Scopus Q-Index', data: [scopus.q1, scopus.q2, scopus.q3, scopus.q4, 0, 0, 0, 0, 0, 0], backgroundColor: '#4f46e5', borderRadius: 4 },
          { label: 'SINTA Rank', data: [0, 0, 0, 0, sinta.s1, sinta.s2, sinta.s3, sinta.s4, sinta.s5, sinta.s6], backgroundColor: '#0ea5e9', borderRadius: 4 }
        ]
      };
    },
    citationChartData() {
      const data = this.sintaLecturers.map(l => ({ name: this.getShortName(l.name), val: l.stats?.citations || 0 }))
        .sort((a,b) => b.val - a.val).slice(0, 8);
      return { labels: data.map(d => d.name), datasets: [{ label: 'Sitasi', data: data.map(d => d.val), backgroundColor: '#f43f5e', borderRadius: 4 }] };
    },
    iprChartData() {
      let hc = 0, p = 0, other = 0;
      this.sintaLecturers.forEach(l => {
        hc += l.ipr?.hakCipta || 0;
        p += l.ipr?.paten || 0;
        other += l.ipr?.other || 0;
      });
      // Only include non-zero categories
      const labels = [];
      const data = [];
      const colors = [];
      if (hc > 0) { labels.push('Hak Cipta'); data.push(hc); colors.push('#f59e0b'); }
      if (p > 0) { labels.push('Paten'); data.push(p); colors.push('#3b82f6'); }
      if (other > 0) { labels.push('Lainnya'); data.push(other); colors.push('#94a3b8'); }
      return { labels, datasets: [{ data, backgroundColor: colors, borderWidth: 0 }] };
    },
    productivityChartData() {
      const data = this.sintaLecturers.map(l => ({
        name: this.getShortName(l.name),
        res: l.research?.length || 0,
        ser: l.services?.length || 0,
        pub: (l.documents?.scopus?.total || 0) + (l.documents?.sinta?.total || 0)
      })).sort((a,b) => (b.res+b.ser+b.pub) - (a.res+a.ser+a.pub)).slice(0, 10);
      return {
        labels: data.map(d => d.name),
        datasets: [
          { label: 'Penelitian', data: data.map(d => d.res), backgroundColor: 'rgba(59, 130, 246, 0.7)', stack: 'a' },
          { label: 'Pengabdian', data: data.map(d => d.ser), backgroundColor: 'rgba(16, 185, 129, 0.7)', stack: 'a' },
          { label: 'Publikasi', data: data.map(d => d.pub), backgroundColor: 'rgba(99, 102, 241, 0.7)', stack: 'a' }
        ]
      };
    },
    publicationChartOptions: () => ({ 
      responsive: true, 
      maintainAspectRatio: false, 
      plugins: { 
        legend: { display: false },
        tooltip: {
          titleFont: { size: 14 },
          bodyFont: { size: 13 },
          padding: 12
        }
      },
      scales: {
        x: { ticks: { font: { size: 12, weight: 'bold' } } },
        y: { ticks: { font: { size: 12 } }, grid: { color: 'rgba(0,0,0,0.05)' } }
      }
    }),
    horizontalBarOptions: () => ({ 
      responsive: true, 
      maintainAspectRatio: false, 
      indexAxis: 'y', 
      plugins: { 
        legend: { display: false },
        tooltip: { titleFont: { size: 14 }, bodyFont: { size: 13 } }
      },
      scales: {
        x: { ticks: { font: { size: 12 } }, grid: { color: 'rgba(0,0,0,0.05)' } },
        y: { ticks: { font: { size: 12, weight: 'bold' } } }
      }
    }),
    stackedBarOptions: () => ({ 
      responsive: true, 
      maintainAspectRatio: false, 
      plugins: { 
        legend: { position: 'bottom', labels: { boxWidth: 10, usePointStyle: true, font: { size: 12 } } },
        tooltip: { titleFont: { size: 14 }, bodyFont: { size: 13 } }
      }, 
      scales: { 
        x: { stacked: true, ticks: { font: { size: 11, weight: 'bold' } } }, 
        y: { stacked: true, ticks: { font: { size: 12 } } } 
      } 
    }),
    doughnutOptions: () => ({ 
      responsive: true, 
      maintainAspectRatio: false, 
      cutout: '70%', 
      plugins: { 
        legend: { position: 'bottom', labels: { font: { size: 12, weight: 'bold' } } },
        tooltip: { titleFont: { size: 14 }, bodyFont: { size: 13 } }
      } 
    }),
    // Computed for filtered totals
    filteredTotalResearch() {
      return this.sintaLecturers.reduce((sum, l) => sum + this.getFilteredResearchCount(l), 0);
    },
    filteredTotalServices() {
      return this.sintaLecturers.reduce((sum, l) => sum + this.getFilteredServicesCount(l), 0);
    },
    filteredScopusTotals() {
      const t = { q1: 0, q2: 0, q3: 0, q4: 0, noq: 0, total: 0 };
      this.sintaLecturers.forEach(l => {
        const c = this.getFilteredScopusCounts(l);
        t.q1 += c.q1; t.q2 += c.q2; t.q3 += c.q3; t.q4 += c.q4; t.noq += c.noq; t.total += c.total;
      });
      return t;
    },
    filteredSintaTotals() {
      const t = { s1: 0, s2: 0, s3: 0, s4: 0, s5: 0, s6: 0, unknown: 0, others: 0, total: 0 };
      this.sintaLecturers.forEach(l => {
        const c = this.getFilteredSintaCounts(l);
        t.s1 += c.s1; t.s2 += c.s2; t.s3 += c.s3; t.s4 += c.s4; t.s5 += c.s5; t.s6 += c.s6; 
        t.unknown += c.unknown; t.others += c.others; t.total += c.total;
      });
      return t;
    },
    minYear() {
      if (this.yearFilter === 'all') return 0;
      const currentYear = new Date().getFullYear();
      return currentYear - parseInt(this.yearFilter);
    },
    // TV Display computed
    currentTvLecturer() {
      return this.sintaLecturers[this.tvCurrentIndex] || null;
    },
    currentProdiName() {
      if (this.currentTvLecturer?.prodi) return this.currentTvLecturer.prodi;
      if (this.selectedProdi) return this.selectedProdi;
      return 'Semua Prodi';
    },
  },
  methods: {
    sortBy(column) {
      if (this.sortColumn === column) this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      else { this.sortColumn = column; this.sortDirection = 'desc'; }
    },
    getShortName(name) { const p = name.split(' '); return p.length <= 2 ? name : p.slice(0,2).join(' '); },
    // TV Display methods
    toggleTvMode() {
      this.tvMode = !this.tvMode;
      if (this.tvMode) {
        this.tvCurrentIndex = 0;
        this.tvPaused = false;
        this.startTvTimer();
      } else {
        this.stopTvTimer();
      }
    },
    startTvTimer() {
      this.stopTvTimer();
      this.tvTimer = setInterval(() => {
        if (!this.tvPaused) this.nextSlide();
      }, this.tvInterval);
    },
    stopTvTimer() {
      if (this.tvTimer) { clearInterval(this.tvTimer); this.tvTimer = null; }
    },
    nextSlide() {
      this.tvCurrentIndex = (this.tvCurrentIndex + 1) % this.sintaLecturers.length;
    },
    prevSlide() {
      this.tvCurrentIndex = (this.tvCurrentIndex - 1 + this.sintaLecturers.length) % this.sintaLecturers.length;
    },
    pauseTv() { this.tvPaused = true; },
    resumeTv() { this.tvPaused = false; },
    getPhotoUrl(lecturer) {
      const name = encodeURIComponent(this.getShortDisplayName(lecturer.name));
      return `https://ui-avatars.com/api/?name=${name}&size=200&background=random&color=fff&bold=true&format=svg`;
    },
    getInitials(name) {
      return name.split(' ').filter(w => w.length > 1 && w[0] === w[0].toUpperCase()).slice(0, 2).map(w => w[0]).join('');
    },
    getShortDisplayName(name) {
      // Remove degree suffixes for cleaner TV display
      return name.replace(/,?\s*(S\.\w+\.?|M\.\w+\.?|Ph\.?D\.?|Dr\.?|Ir\.?|Prof\.?|CSCA\.?|CDMS\.?|Ak\.?|MBA\.?)/gi, '').replace(/,\s*$/, '').trim();
    },
    getRecentPublications(lecturer) {
      const pubs = lecturer.documents?.list || [];
      return pubs.slice(0, 5);
    },
    formatDate(ds) { if (!ds) return ''; return new Date(ds).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }); },
    getFilteredResearchCount(lecturer) {
      if (this.yearFilter === 'all') return lecturer.researchTotal || lecturer.research?.length || 0;
      return (lecturer.research || []).filter(r => {
        const year = parseInt(r.year);
        return year && year > this.minYear;
      }).length;
    },
    getFilteredServicesCount(lecturer) {
      if (this.yearFilter === 'all') return lecturer.servicesTotal || lecturer.services?.length || 0;
      return (lecturer.services || []).filter(s => {
        const year = parseInt(s.year);
        return year && year > this.minYear;
      }).length;
    },
    // Scopus year filtering - returns object with q1,q2,q3,q4,noq,total
    getFilteredScopusCounts(lecturer) {
      const scopus = lecturer.documents?.scopus;
      if (this.yearFilter === 'all' || !scopus?.scopusList) {
        return {
          q1: scopus?.q1 || 0,
          q2: scopus?.q2 || 0,
          q3: scopus?.q3 || 0,
          q4: scopus?.q4 || 0,
          noq: scopus?.noq || 0,
          total: scopus?.total || 0
        };
      }
      const counts = { q1: 0, q2: 0, q3: 0, q4: 0, noq: 0, total: 0 };
      (scopus.scopusList || []).forEach(item => {
        const year = parseInt(item.year);
        if (year && year > this.minYear) {
          const q = item.q?.toUpperCase() || '';
          if (q === 'Q1') counts.q1++;
          else if (q === 'Q2') counts.q2++;
          else if (q === 'Q3') counts.q3++;
          else if (q === 'Q4') counts.q4++;
          else counts.noq++;
      counts.total++;
        }
      });
      return counts;
    },
    // SINTA year filtering - returns object with s1-s6, unknown, others, total
    getFilteredSintaCounts(lecturer) {
      const sinta = lecturer.documents?.sinta;
      if (this.yearFilter === 'all' || !sinta?.sintaList) {
        // Calculate known sum to find 'others' (hidden due to pagination limit)
        const total = sinta?.total || 0;
        const s1 = sinta?.s1 || 0;
        const s2 = sinta?.s2 || 0;
        const s3 = sinta?.s3 || 0;
        const s4 = sinta?.s4 || 0;
        const s5 = sinta?.s5 || 0;
        const s6 = sinta?.s6 || 0;
        const unknown = sinta?.unknown || 0;
        
        // Others = Total - Known Items. Ensure not negative.
        const knownSum = s1 + s2 + s3 + s4 + s5 + s6 + unknown;
        const others = Math.max(0, total - knownSum);

        return { s1, s2, s3, s4, s5, s6, unknown, others, total };
      }
      
      const counts = { s1: 0, s2: 0, s3: 0, s4: 0, s5: 0, s6: 0, unknown: 0, others: 0, total: 0 };
      let listTotal = 0;
      
      (sinta.sintaList || []).forEach(item => {
        const year = parseInt(item.year);
        if (year && year > this.minYear) {
          const rank = (item.rank || '').toUpperCase();
          if (rank === 'S1') counts.s1++;
          else if (rank === 'S2') counts.s2++;
          else if (rank === 'S3') counts.s3++;
          else if (rank === 'S4') counts.s4++;
          else if (rank === 'S5') counts.s5++;
          else if (rank === 'S6') counts.s6++;
          else counts.unknown++;
          listTotal++;
        }
      });

      // For filtered view, 'others' is tricky because we don't know the years of hidden items.
      // We assume filtered view only shows what we HAVE. 
      // So others = 0 for filtered view to be safe/accurate to what represents "filtered".
      // OR we could estimate, but better to be strict: "Shown filtered items".
      
      counts.total = listTotal; 
      return counts;
    }
  }
}
</script>

<style scoped>
.card { @apply bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all; }

/* TV Display animations */
@keyframes tvProgress {
  from { width: 0%; }
  to { width: 100%; }
}

.tv-progress-animate {
  animation: tvProgress linear forwards;
}

.tv-display {
  font-family: 'Inter', system-ui, sans-serif;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
