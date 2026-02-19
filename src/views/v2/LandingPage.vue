<template>
  <div class="bg-white">

    <!-- ═══════════════════════════════════════
         VIDEO HERO — autoplay loop
    ═══════════════════════════════════════ -->
    <section class="relative h-screen overflow-hidden bg-black">
      <video
        ref="heroVideo"
        class="absolute inset-0 w-full h-full object-cover"
        autoplay
        loop
        muted
        playsinline
        preload="auto"
        :src="`${base}video/videonew.mp4`"
      ></video>

      <!-- Hero content overlay -->
      <div class="absolute inset-x-0 top-0 z-10 flex flex-col items-center text-center px-6 pt-32">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-white/15 text-white text-sm font-semibold mb-6 backdrop-blur-2xl" style="box-shadow: 0 4px 24px rgba(0,0,0,0.3)">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-400"></span>
          </span>
          Baru: Analisis Riset Berbasis AI
        </div>

        <h1 class="text-4xl md:text-6xl font-black text-white tracking-tight mb-5 leading-tight" style="text-shadow: 0 2px 32px rgba(0,0,0,0.9), 0 0 80px rgba(0,0,0,0.5)">
          Optimalkan Potensi<br>
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300">
            Riset Institusi Anda
          </span>
        </h1>

        <p class="text-lg text-white/90 max-w-xl mx-auto mb-8 leading-relaxed" style="text-shadow: 0 1px 20px rgba(0,0,0,1), 0 0 40px rgba(0,0,0,0.8)">
          Ubah data mentah SINTA menjadi wawasan strategis.<br>Otomatis, real-time, berbasis AI.
        </p>

        <div class="flex flex-wrap items-center justify-center gap-3">
          <router-link to="/v2/login"
            class="px-7 py-3 rounded-xl bg-white/90 backdrop-blur-sm text-slate-900 font-bold text-base hover:bg-white transition-all shadow-2xl hover:scale-105 active:scale-95">
            Mulai Uji Coba Gratis
          </router-link>
          <button
            class="px-7 py-3 rounded-xl bg-black/40 border border-white/25 text-white font-bold text-base hover:bg-black/60 transition-all backdrop-blur-2xl" style="box-shadow: 0 4px 20px rgba(0,0,0,0.3)">
            Lihat Demo
          </button>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         [BACKUP] FILMSTRIP — 8 frame, scroll-driven
         Uncomment bagian ini dan hapus section VIDEO HERO di atas untuk kembali ke mode frame PNG
    ═══════════════════════════════════════
    <section
      ref="filmstripSection"
      class="relative"
      :style="{ height: frames.length * 100 + 'vh' }"
    >
      <div class="sticky top-0 h-screen overflow-hidden bg-black">
        <div
          v-for="(frame, i) in frames"
          :key="frame.id"
          class="absolute inset-0 frame-crossfade"
          :style="{ opacity: frameOpacity(i) }"
        >
          <img
            :src="frame.src"
            :alt="frame.label"
            class="w-full h-full object-contain"
            :loading="i === 0 ? 'eager' : 'lazy'"
          />
        </div>
        <div
          class="absolute inset-x-0 top-0 z-10 flex flex-col items-center text-center px-6 pt-32 hero-text-wrap"
          :style="{ opacity: heroOpacity, transform: `translateY(${heroTranslate}px)`, pointerEvents: heroOpacity > 0.1 ? 'auto' : 'none' }"
        >
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-white/15 text-white text-sm font-semibold mb-6 backdrop-blur-2xl" style="box-shadow: 0 4px 24px rgba(0,0,0,0.3)">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-400"></span>
            </span>
            Baru: Analisis Riset Berbasis AI
          </div>
          <h1 class="text-4xl md:text-6xl font-black text-white tracking-tight mb-5 leading-tight" style="text-shadow: 0 2px 32px rgba(0,0,0,0.9), 0 0 80px rgba(0,0,0,0.5)">
            Optimalkan Potensi<br>
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300">
              Riset Institusi Anda
            </span>
          </h1>
          <p class="text-lg text-white/90 max-w-xl mx-auto mb-8 leading-relaxed" style="text-shadow: 0 1px 20px rgba(0,0,0,1), 0 0 40px rgba(0,0,0,0.8)">
            Ubah data mentah SINTA menjadi wawasan strategis.<br>Otomatis, real-time, berbasis AI.
          </p>
          <div class="flex flex-wrap items-center justify-center gap-3">
            <router-link to="/v2/login"
              class="px-7 py-3 rounded-xl bg-white/90 backdrop-blur-sm text-slate-900 font-bold text-base hover:bg-white transition-all shadow-2xl hover:scale-105 active:scale-95">
              Mulai Uji Coba Gratis
            </router-link>
            <button
              class="px-7 py-3 rounded-xl bg-black/40 border border-white/25 text-white font-bold text-base hover:bg-black/60 transition-all backdrop-blur-2xl" style="box-shadow: 0 4px 20px rgba(0,0,0,0.3)">
              Lihat Demo
            </button>
          </div>
        </div>
      </div>
    </section>
    -->

    <!-- ═══════════════════════════════════════
         SECTION: FEATURES
    ═══════════════════════════════════════ -->
    <section class="py-32 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div
          class="text-center mb-20 reveal-el"
          :class="{ 'is-visible': revealed.featTitle }"
          data-reveal="featTitle"
        >
          <span class="inline-block text-xs font-bold uppercase tracking-widest text-blue-500 mb-4">Fitur Unggulan</span>
          <h2 class="text-4xl font-black text-slate-900 mb-4">Satu Platform, Semua Insight</h2>
          <p class="text-slate-500 max-w-xl mx-auto text-lg">Dari scraping data hingga klasterisasi AI — semua otomatis, semua real-time.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="(feat, i) in features"
            :key="feat.title"
            class="reveal-el"
            :class="{ 'is-visible': revealed[`feat${i}`] }"
            :data-reveal="`feat${i}`"
            :style="{ transitionDelay: `${i * 120}ms` }"
          >
            <div class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group h-full">
              <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform" :class="feat.bg">
                {{ feat.icon }}
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-3">{{ feat.title }}</h3>
              <p class="text-slate-500 leading-relaxed">{{ feat.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         SECTION: STATS
    ═══════════════════════════════════════ -->
    <section class="py-24 bg-slate-50 border-y border-slate-200">
      <div class="max-w-7xl mx-auto px-6">
        <div
          class="text-center mb-16 reveal-el"
          :class="{ 'is-visible': revealed.statsTitle }"
          data-reveal="statsTitle"
        >
          <span class="inline-block text-xs font-bold uppercase tracking-widest text-indigo-500 mb-4">Dalam Angka</span>
          <h2 class="text-4xl font-black text-slate-900">Dampak Nyata di FSTI - ITK</h2>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div
            v-for="(stat, i) in stats"
            :key="stat.label"
            class="text-center p-8 bg-white rounded-2xl border border-slate-100 shadow-sm reveal-el"
            :class="{ 'is-visible': revealed[`stat${i}`] }"
            :data-reveal="`stat${i}`"
            :style="{ transitionDelay: `${i * 100}ms` }"
          >
            <div class="text-5xl font-black mb-2" :class="stat.color">
              {{ statsStarted ? displayStats[i] : 0 }}{{ stat.suffix }}
            </div>
            <div class="text-slate-500 text-sm font-semibold uppercase tracking-wider">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         SECTION: TESTIMONIAL
    ═══════════════════════════════════════ -->
    <section class="py-32 bg-white">
      <div class="max-w-4xl mx-auto px-6 text-center">
        <div
          class="reveal-el"
          :class="{ 'is-visible': revealed.quote }"
          data-reveal="quote"
        >
          <svg class="w-14 h-14 mx-auto mb-8 text-slate-200" fill="currentColor" viewBox="0 0 32 32">
            <path d="M10 8C6.686 8 4 10.686 4 14v10h10V14H7c0-1.657 1.343-3 3-3V8zm18 0c-3.314 0-6 2.686-6 6v10h10V14h-7c0-1.657 1.343-3 3-3V8z"/>
          </svg>
          <blockquote>
            <p class="text-2xl md:text-3xl font-semibold text-slate-800 leading-relaxed mb-10">
              "Platform ini mengubah cara kami memonitor produktivitas riset. Data yang dulu membutuhkan berminggu-minggu untuk dikompilasi, kini tersaji dalam hitungan detik secara otomatis."
            </p>
          </blockquote>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         SECTION: CTA
    ═══════════════════════════════════════ -->
    <section class="py-24 bg-slate-900 relative overflow-hidden">
      <div class="absolute inset-0">
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>
      </div>
      <div
        class="relative max-w-3xl mx-auto px-6 text-center reveal-el"
        :class="{ 'is-visible': revealed.cta }"
        data-reveal="cta"
      >
        <h2 class="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
          Siap Transformasi<br>Data Riset Anda?
        </h2>
        <p class="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
          Bergabunglah dengan institusi yang sudah memanfaatkan SINTA Intel untuk pengambilan keputusan yang lebih cepat dan akurat.
        </p>
        <router-link
          to="/v2/login"
          class="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-white text-slate-900 font-bold text-xl hover:bg-slate-100 transition-all shadow-2xl hover:scale-105 active:scale-95"
        >
          Mulai Sekarang — Gratis
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
          </svg>
        </router-link>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const base = import.meta.env.BASE_URL

// ── Frames ────────────────────────────────────────────────
const frames = [
  { id: 1, src: `${base}frames/frame-01.png`, label: 'Tampilan Dashboard IoT', desc: 'Monitoring perangkat IoT Laboratorium Inovasi Digital secara real-time' },
  { id: 2, src: `${base}frames/frame-02.png`, label: 'Koneksi Perangkat Cerdas', desc: 'Sistem mendeteksi dan menghubungkan seluruh perangkat IoT yang terdaftar' },
  { id: 3, src: `${base}frames/frame-03.png`, label: 'Data Sensor Masuk', desc: 'Pembacaan data real-time dari sensor suhu, kelembaban, dan energi' },
  { id: 4, src: `${base}frames/frame-04.png`, label: 'Visualisasi Aktif', desc: 'Grafik dan chart diperbarui secara langsung berdasarkan data terkini' },
  { id: 5, src: `${base}frames/frame-05.png`, label: 'Analitik Mendalam', desc: 'Pola dan anomali terdeteksi oleh mesin analitik berbasis AI' },
  { id: 6, src: `${base}frames/frame-06.png`, label: 'Laporan Otomatis', desc: 'Sistem menyusun ringkasan laporan periodik secara otomatis' },
  { id: 7, src: `${base}frames/frame-07.png`, label: 'Integrasi SINTA Intel', desc: 'Data IoT tersinkronisasi dengan platform riset SINTA Intel' },
  { id: 8, src: `${base}frames/frame-08.png`, label: 'Ekosistem Terintegrasi', desc: 'Seluruh data riset dan inovasi digital ITK dalam satu platform' },
]

// ── Features ──────────────────────────────────────────────
const features = [
  { icon: '🤖', bg: 'bg-blue-50',    title: 'Klasterisasi Topik AI',      desc: 'TF-IDF + K-Means mengelompokkan ribuan judul riset secara otomatis ke dalam klaster topik yang bermakna.' },
  { icon: '📈', bg: 'bg-purple-50',  title: 'Roadmap Riset Otomatis',     desc: 'Sankey Diagram menampilkan evolusi topik penelitian dari 2018 hingga kini — lihat tren dan proyeksi ke depan.' },
  { icon: '⚡', bg: 'bg-emerald-50', title: 'Profil Real-time SINTA',     desc: 'Data publikasi, sitasi, H-Index, dan penelitian seluruh dosen diambil otomatis dari SINTA & Google Scholar.' },
  { icon: '🔍', bg: 'bg-orange-50',  title: 'Expertise Finder',           desc: 'Temukan pembimbing atau kolaborator riset terbaik berdasarkan kecocokan topik dengan profil keahlian dosen.' },
  { icon: '💰', bg: 'bg-teal-50',    title: 'Dashboard Dana & Hibah',     desc: 'Pantau pendanaan riset dan pengabdian — breakdown sumber internal/BIMA, tren per tahun, dukungan LKPS & AMI.' },
  { icon: '🏆', bg: 'bg-rose-50',    title: 'Data Akreditasi DTPS',       desc: 'Data dosen tetap selalu ter-update sesuai format akreditasi. Minimasi beban administrasi tim akreditasi.' },
]

// ── Stats ─────────────────────────────────────────────────
const stats = [
  { target: 23,  suffix: '+', label: 'Dosen Aktif',     color: 'text-blue-600'    },
  { target: 480, suffix: '+', label: 'Total Publikasi',  color: 'text-indigo-600'  },
  { target: 2,   suffix: '',  label: 'Program Studi',    color: 'text-emerald-600' },
  { target: 95,  suffix: '%', label: 'Akurasi Data',     color: 'text-purple-600'  },
]
const statsStarted = ref(false)
const displayStats = ref(stats.map(() => 0))

function runCountUp() {
  if (statsStarted.value) return
  statsStarted.value = true
  stats.forEach((stat, i) => {
    const steps = 60
    const inc   = stat.target / steps
    let step    = 0
    const timer = setInterval(() => {
      step++
      displayStats.value[i] = Math.min(Math.round(inc * step), stat.target)
      if (step >= steps) clearInterval(timer)
    }, 1800 / steps)
  })
}

// ── Filmstrip scroll ──────────────────────────────────────
const currentFrame     = ref(0)
const heroOpacity      = ref(1)
const heroTranslate    = ref(0)
const filmstripSection = ref(null)

function getScrollContainer(el) {
  let parent = el?.parentElement
  while (parent) {
    const ov = window.getComputedStyle(parent).overflowY
    if (ov === 'auto' || ov === 'scroll') return parent
    parent = parent.parentElement
  }
  return window
}

let scrollContainer = null
let targetFrame     = 0
let rafId           = null

function animateFrame() {
  // Lerp: gerakkan currentFrame perlahan menuju targetFrame
  const cur  = currentFrame.value
  const diff = targetFrame - cur
  if (Math.abs(diff) < 0.01) {
    currentFrame.value = targetFrame
    rafId = null
    return
  }
  currentFrame.value = cur + diff * 0.12
  rafId = requestAnimationFrame(animateFrame)
}

function handleScroll() {
  const el = filmstripSection.value
  if (!el || !scrollContainer) return

  const isWin      = scrollContainer === window
  const scrollTop  = isWin ? window.scrollY    : scrollContainer.scrollTop
  const vpH        = isWin ? window.innerHeight : scrollContainer.clientHeight
  const cTop       = isWin ? 0 : scrollContainer.getBoundingClientRect().top
  const secTop     = scrollTop + el.getBoundingClientRect().top - cTop
  const scrollable = el.offsetHeight - vpH
  const progress   = Math.min(Math.max((scrollTop - secTop) / scrollable, 0), 1)

  targetFrame = Math.min(progress * frames.length, frames.length - 0.001)
  if (!rafId) rafId = requestAnimationFrame(animateFrame)

  // Hero text: fade out + slide up dalam 15% pertama scroll
  const heroFade = Math.max(0, 1 - progress / 0.15)
  heroOpacity.value   = heroFade
  heroTranslate.value = (1 - heroFade) * -40
}

// Frame visibility: tampilkan frame saat index-nya paling dekat currentFrame
function frameOpacity(i) {
  const cf = currentFrame.value
  // Frame aktif = yang paling dekat nilai cf
  const nearest = Math.round(cf)
  return nearest === i ? 1 : 0
}

// ── Reveal observer ───────────────────────────────────────
const revealed = reactive({})
let revealObserver = null

function initRevealObserver() {
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      const key = entry.target.dataset.reveal
      if (!key) return
      revealed[key] = true
      if (key.startsWith('stat')) runCountUp()
      revealObserver.unobserve(entry.target)
    })
  }, { threshold: 0.15 })

  document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el))
}

onMounted(() => {
  scrollContainer = getScrollContainer(filmstripSection.value)
  scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
  setTimeout(initRevealObserver, 150)
})

onUnmounted(() => {
  scrollContainer?.removeEventListener('scroll', handleScroll)
  revealObserver?.disconnect()
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<style scoped>
.frame-crossfade {
  transition: opacity 0.35s ease-in-out;
  will-change: opacity;
}

.hero-text-wrap {
  transition: opacity 0.1s linear, transform 0.1s linear;
  will-change: opacity, transform;
}

.reveal-el {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.75s ease, transform 0.75s ease;
}
.reveal-el.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
