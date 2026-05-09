<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div class="flex items-start gap-4 flex-wrap">
        <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <div class="flex-1 min-w-0">
          <h1 class="text-2xl font-black text-slate-900 mb-1">Pengajaran</h1>
          <p class="text-sm text-slate-500">
            Mata kuliah diampu, riwayat pendidikan, dan HKI per dosen — sumber: PDDikti.
          </p>
        </div>
        <div class="flex items-center gap-2">
          <label class="text-xs font-semibold text-slate-500">Prodi:</label>
          <select v-model="selectedProdi" class="text-sm font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-200">
            <option v-for="p in prodiWithData" :key="p.slug" :value="p.slug">{{ p.name }}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="!data" class="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center">
      <p class="text-sm text-slate-500">Data PDDikti untuk prodi ini belum tersedia.</p>
    </div>

    <template v-else>
      <!-- Summary Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div v-for="s in summary" :key="s.label" class="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400">{{ s.label }}</p>
          <p class="text-2xl font-black text-slate-900 mt-1">{{ s.value.toLocaleString('id-ID') }}</p>
          <p class="text-xs text-slate-500 mt-0.5">{{ s.hint }}</p>
        </div>
      </div>

      <!-- Two-column: lecturer list + detail panel -->
      <div class="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        <!-- Lecturer list -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="p-3 border-b border-slate-100 bg-slate-50/50">
            <input
              v-model="search"
              type="text"
              placeholder="Cari dosen..."
              class="w-full text-sm bg-white border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div class="max-h-[640px] overflow-y-auto">
            <button
              v-for="(lec, idx) in filteredLecturers"
              :key="lec.pddiktiId"
              @click="selectedIdx = data.lecturers.indexOf(lec)"
              class="w-full text-left px-4 py-3 border-b border-slate-100 transition-colors flex items-start gap-3"
              :class="data.lecturers.indexOf(lec) === selectedIdx ? 'bg-blue-50' : 'hover:bg-slate-50'"
            >
              <div
                class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                :class="data.lecturers.indexOf(lec) === selectedIdx ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'"
              >
                {{ initials(lec.name) }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-slate-800 truncate">{{ lec.name }}</p>
                <p class="text-[11px] text-slate-500 truncate">
                  {{ lec.profile?.jabatan_akademik || '—' }} · {{ lec.stats?.totalUniqueCourses || 0 }} matkul
                </p>
              </div>
            </button>
            <div v-if="!filteredLecturers.length" class="p-6 text-center text-sm text-slate-400">
              Tidak ada hasil.
            </div>
          </div>
        </div>

        <!-- Detail panel -->
        <div v-if="selected" class="space-y-4">
          <!-- Identity card -->
          <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div class="flex items-start gap-4 flex-wrap">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center text-lg font-bold shrink-0">
                {{ initials(selected.name) }}
              </div>
              <div class="flex-1 min-w-0">
                <h2 class="text-xl font-black text-slate-900">{{ selected.profile?.nama_dosen || selected.name }}</h2>
                <p class="text-sm text-slate-500 mt-0.5">
                  {{ selected.profile?.nama_prodi || '—' }} · {{ selected.profile?.nama_pt || '—' }}
                </p>
                <div class="mt-3 flex flex-wrap gap-2">
                  <span v-if="selected.profile?.jabatan_akademik" class="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                    {{ selected.profile.jabatan_akademik }}
                  </span>
                  <span v-if="selected.profile?.pendidikan_tertinggi" class="px-2.5 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full">
                    Pendidikan {{ selected.profile.pendidikan_tertinggi }}
                  </span>
                  <span v-if="selected.profile?.status_ikatan_kerja" class="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full">
                    {{ selected.profile.status_ikatan_kerja }}
                  </span>
                  <span v-if="selected.profile?.status_aktivitas" class="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full">
                    {{ selected.profile.status_aktivitas }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Mini stats -->
            <div class="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-slate-100">
              <div>
                <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Semester Mengajar</p>
                <p class="text-xl font-black text-slate-900 mt-0.5">{{ selected.stats.totalSemestersTaught }}</p>
              </div>
              <div>
                <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Mata Kuliah Unik</p>
                <p class="text-xl font-black text-slate-900 mt-0.5">{{ selected.stats.totalUniqueCourses }}</p>
              </div>
              <div>
                <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Kelas</p>
                <p class="text-xl font-black text-slate-900 mt-0.5">{{ selected.stats.totalClassesTaught }}</p>
              </div>
            </div>
          </div>

          <!-- Sub-tabs -->
          <div class="bg-white rounded-2xl border border-slate-200 p-1.5 shadow-sm inline-flex gap-1">
            <button
              v-for="t in subTabs"
              :key="t.key"
              @click="activeSubTab = t.key"
              class="px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2"
              :class="activeSubTab === t.key ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'"
            >
              <span>{{ t.label }}</span>
              <span class="text-[11px] font-bold px-1.5 rounded-full" :class="activeSubTab === t.key ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'">{{ t.count }}</span>
            </button>
          </div>

          <!-- Mata Kuliah -->
          <div v-if="activeSubTab === 'matkul'" class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
            <div v-if="!selected.teachingBySemester?.length" class="text-sm text-slate-400 text-center py-6">
              Belum ada riwayat mengajar.
            </div>
            <div v-for="sem in selected.teachingBySemester" :key="sem.semester">
              <div class="flex items-center gap-3 mb-3">
                <h3 class="text-sm font-bold text-slate-800">{{ sem.semester }}</h3>
                <span class="text-xs text-slate-400">{{ sem.classes.length }} kelas</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div v-for="(c, i) in sem.classes" :key="i" class="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <div class="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500 shrink-0">
                    {{ c.nama_kelas || '—' }}
                  </div>
                  <div class="min-w-0">
                    <p class="text-sm font-semibold text-slate-800 truncate">{{ c.nama_matkul }}</p>
                    <p class="text-[11px] text-slate-500 truncate">{{ c.kode_matkul }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Pendidikan -->
          <div v-if="activeSubTab === 'pendidikan'" class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div v-if="!selected.studyHistory?.length" class="text-sm text-slate-400 text-center py-6">
              Belum ada data pendidikan.
            </div>
            <div v-else class="relative pl-6 space-y-5">
              <div class="absolute left-2 top-2 bottom-2 w-px bg-slate-200"></div>
              <div v-for="(s, i) in sortedStudy" :key="i" class="relative">
                <span class="absolute -left-[18px] top-1.5 w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow"></span>
                <p class="text-sm font-bold text-slate-800">{{ s.jenjang }} — {{ s.nama_prodi }}</p>
                <p class="text-xs text-slate-500 mt-0.5">{{ s.nama_pt }}</p>
                <p class="text-[11px] text-slate-400 mt-1">
                  {{ s.tahun_masuk || '—' }} – {{ s.tahun_lulus || 'sekarang' }}
                  <span v-if="s.gelar_akademik"> · {{ s.gelar_akademik }}</span>
                  <span v-if="s.singkatan_gelar"> ({{ s.singkatan_gelar }})</span>
                </p>
              </div>
            </div>
          </div>

          <!-- HKI -->
          <div v-if="activeSubTab === 'hki'" class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div v-if="!selected.paten?.length" class="text-sm text-slate-400 text-center py-6">
              Belum ada HKI tercatat.
            </div>
            <div v-else class="space-y-2">
              <div v-for="(h, i) in sortedPaten" :key="i" class="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                <span class="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full shrink-0 mt-0.5">
                  {{ h.tahun_kegiatan || '—' }}
                </span>
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-semibold text-slate-800">{{ h.judul_kegiatan }}</p>
                  <p class="text-[11px] text-slate-500 mt-0.5">{{ h.jenis_kegiatan }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Bimbingan TA -->
          <div v-if="activeSubTab === 'bimbingan'" class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
            <div v-if="!supervisionFor(selected)?.totalSupervised" class="text-center py-10">
              <div class="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z M12 14l9-5-9-5-9 5 9 5zm0 0v6m-9-3l9 5 9-5" />
                </svg>
              </div>
              <p class="text-sm font-semibold text-slate-700">Belum ada data bimbingan TA</p>
              <p class="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Data sedang disinkronkan dari repository.itk.ac.id.
                Akan terisi otomatis setelah scraper selesai.
              </p>
            </div>
            <template v-else>
              <!-- Distribusi per tahun -->
              <div>
                <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Distribusi per Tahun</p>
                <div class="flex items-end gap-2 h-24 border-b border-slate-100 pb-1">
                  <div
                    v-for="(count, year) in supervisionFor(selected).byYear"
                    :key="year"
                    class="flex-1 flex flex-col items-center gap-1 min-w-0"
                    :title="`${year}: ${count} TA`"
                  >
                    <div class="w-full bg-blue-500 rounded-t" :style="{ height: barHeight(count, supervisionFor(selected).byYear) + '%' }"></div>
                    <span class="text-[10px] font-semibold text-slate-500">{{ year }}</span>
                    <span class="text-[10px] font-bold text-slate-700">{{ count }}</span>
                  </div>
                </div>
              </div>

              <!-- Breakdown peran -->
              <div v-if="Object.keys(supervisionFor(selected).byRole).length">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Peran</p>
                  <button
                    @click="showRoleInfo = !showRoleInfo"
                    class="text-[10px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    {{ showRoleInfo ? 'Tutup' : 'Apa arti label ini?' }}
                  </button>
                </div>
                <div v-if="showRoleInfo" class="mb-3 p-3 bg-blue-50 border border-blue-100 rounded-xl text-[11px] text-slate-700 leading-relaxed">
                  Repository ITK <strong>tidak menyimpan label "Pembimbing 1/2" secara eksplisit</strong>.
                  Label di sini diturunkan dari urutan kontributor pada tiap TA: kontributor pertama
                  konvensional dianggap <strong>Pembimbing Utama (Pembimbing 1)</strong>, kontributor kedua
                  <strong>Pembimbing Pendamping (Pembimbing 2)</strong>. <strong>Penguji</strong> adalah kontributor
                  dengan role <code>REV</code> (reviewer), bukan pembimbing.
                </div>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="r in sortedRoles"
                    :key="r.label"
                    class="px-2.5 py-1 text-xs font-semibold rounded-full"
                    :class="roleChipClass(r.label)"
                  >
                    {{ r.label }}: <span class="font-bold">{{ r.count }}</span>
                  </span>
                </div>
              </div>

              <!-- Daftar tesis -->
              <div>
                <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Daftar Tugas Akhir ({{ supervisionFor(selected).totalSupervised }})
                </p>
                <div class="space-y-2 max-h-[480px] overflow-y-auto pr-1">
                  <a
                    v-for="t in supervisionFor(selected).theses"
                    :key="t.eprintId"
                    :href="t.url"
                    target="_blank"
                    rel="noopener"
                    class="flex items-start gap-3 p-3 bg-slate-50 rounded-xl hover:bg-blue-50 transition-colors group"
                  >
                    <span class="px-2 py-0.5 bg-white border border-slate-200 text-slate-600 text-[10px] font-bold rounded-full shrink-0 mt-0.5">
                      {{ t.year || '—' }}
                    </span>
                    <div class="min-w-0 flex-1">
                      <p class="text-sm font-semibold text-slate-800 group-hover:text-blue-700 line-clamp-2">{{ t.title }}</p>
                      <p class="text-[11px] text-slate-500 mt-0.5 truncate">
                        <span v-if="t.students?.length">Mhs: {{ t.students.join(', ') }}</span>
                        <span v-else>—</span>
                      </p>
                      <p class="text-[10px] mt-0.5 flex items-center gap-2">
                        <span
                          class="px-1.5 py-0.5 rounded font-bold"
                          :class="roleChipClass(t.slot)"
                        >{{ t.slot || roleLabel(t.role) }}</span>
                        <span class="text-slate-400">ID #{{ t.eprintId }}</span>
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { prodiList, prodiRegistry } from '../data/prodi/index.js'

const prodiWithData = computed(() => prodiList.filter(p => prodiRegistry[p.slug]?.pddiktiData))
const selectedProdi = ref(prodiWithData.value[0]?.slug || null)
const data = computed(() => selectedProdi.value ? prodiRegistry[selectedProdi.value]?.pddiktiData : null)

const search = ref('')
const selectedIdx = ref(0)
const activeSubTab = ref('matkul')

watch(selectedProdi, () => {
  selectedIdx.value = 0
  search.value = ''
})

const filteredLecturers = computed(() => {
  if (!data.value) return []
  const q = search.value.trim().toLowerCase()
  if (!q) return data.value.lecturers
  return data.value.lecturers.filter(l => l.name.toLowerCase().includes(q))
})

const selected = computed(() => data.value?.lecturers[selectedIdx.value] || null)

const sortedStudy = computed(() => {
  if (!selected.value?.studyHistory) return []
  const order = { 'S3': 4, 'S2': 3, 'S1': 2, 'D4': 2, 'D3': 1 }
  return [...selected.value.studyHistory].sort((a, b) => (order[b.jenjang] || 0) - (order[a.jenjang] || 0))
})

const sortedPaten = computed(() => {
  if (!selected.value?.paten) return []
  return [...selected.value.paten].sort((a, b) => (b.tahun_kegiatan || 0) - (a.tahun_kegiatan || 0))
})

const supervisionData = computed(() => selectedProdi.value ? prodiRegistry[selectedProdi.value]?.supervisionData : null)

function supervisionFor(lec) {
  if (!supervisionData.value || !lec) return null
  return supervisionData.value.lecturers.find(l => l.name === lec.name) || null
}

const ROLE_LABELS = {
  THS: 'Pembimbing',
  REV: 'Penguji',
  ADP: 'Pembimbing',
  EDT: 'Editor',
  CRE: 'Pencipta',
  UNKNOWN: 'Tak Terklasifikasi',
}
function roleLabel(r) {
  return ROLE_LABELS[r] || r || '—'
}

const ROLE_ORDER = ['Pembimbing 1', 'Pembimbing 2', 'Pembimbing 3', 'Penguji']
function roleChipClass(label) {
  if (label === 'Pembimbing 1') return 'bg-blue-100 text-blue-800'
  if (label === 'Pembimbing 2') return 'bg-indigo-100 text-indigo-800'
  if (label && label.startsWith('Pembimbing')) return 'bg-violet-100 text-violet-800'
  if (label === 'Penguji') return 'bg-amber-100 text-amber-800'
  return 'bg-slate-100 text-slate-700'
}

const showRoleInfo = ref(false)
const sortedRoles = computed(() => {
  const map = supervisionFor(selected.value)?.byRole || {}
  const entries = Object.entries(map).map(([label, count]) => ({ label, count }))
  return entries.sort((a, b) => {
    const ai = ROLE_ORDER.indexOf(a.label); const bi = ROLE_ORDER.indexOf(b.label)
    if (ai !== -1 && bi !== -1) return ai - bi
    if (ai !== -1) return -1
    if (bi !== -1) return 1
    return b.count - a.count
  })
})

function barHeight(value, byYear) {
  const max = Math.max(...Object.values(byYear || {}), 1)
  return Math.max(8, Math.round((value / max) * 100))
}

const subTabs = computed(() => [
  { key: 'matkul', label: 'Mata Kuliah', count: selected.value?.stats?.totalUniqueCourses || 0 },
  { key: 'pendidikan', label: 'Pendidikan', count: selected.value?.studyHistory?.length || 0 },
  { key: 'hki', label: 'HKI / Paten', count: selected.value?.paten?.length || 0 },
  { key: 'bimbingan', label: 'Bimbingan TA', count: supervisionFor(selected.value)?.totalSupervised || 0 },
])

const summary = computed(() => {
  if (!data.value) return []
  const lecs = data.value.lecturers
  const totalClasses = lecs.reduce((s, l) => s + (l.stats?.totalClassesTaught || 0), 0)
  const totalUnique = new Set(lecs.flatMap(l => l.teachingHistory?.map(t => t.kode_matkul) || [])).size
  const totalPaten = lecs.reduce((s, l) => s + (l.stats?.totalPaten || 0), 0)
  return [
    { label: 'Dosen', value: lecs.length, hint: 'Tercatat di PDDikti' },
    { label: 'Mata Kuliah Unik', value: totalUnique, hint: 'Gabungan seluruh dosen' },
    { label: 'Total Kelas', value: totalClasses, hint: 'Lintas semester' },
    { label: 'HKI / Paten', value: totalPaten, hint: 'Akumulasi' },
  ]
})

function initials(name) {
  return name.split(' ').map(s => s[0]).filter(Boolean).slice(0, 2).join('').toUpperCase()
}
</script>
