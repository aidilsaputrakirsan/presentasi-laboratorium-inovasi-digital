<template>
  <div class="space-y-8">
    <div v-for="(group, jurusanName) in groupedPrograms" :key="jurusanName" class="animate-fade-in-up">
      <!-- Jurusan Header -->
      <div class="flex items-center gap-4 mb-5 px-2">
        <div class="h-8 w-1.5 rounded-full bg-gradient-to-b" :class="getJurusanColor(jurusanName)"></div>
        <div>
          <h2 class="text-sm font-black text-slate-400 uppercase tracking-[0.2em] leading-tight">{{ jurusanName }}</h2>
          <div class="h-px bg-gradient-to-r from-slate-200 to-transparent mt-1 w-64"></div>
        </div>
      </div>
      
      <!-- Prodi Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <button
          v-for="prodi in group"
          :key="prodi.slug"
          @click="prodi.hasData && selectProdi(prodi.slug)"
          :disabled="!prodi.hasData"
          class="group relative text-left transition-all duration-300 transform hover:-translate-y-1"
          :class="[
            !prodi.hasData ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
          ]"
        >
          <div 
            class="h-full p-5 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden"
            :class="[
              selectedProdi === prodi.slug
                ? 'bg-white border-blue-500 shadow-[0_20px_40px_-15px_rgba(59,130,246,0.2)] ring-4 ring-blue-500/5'
                : prodi.hasData 
                  ? 'bg-white border-slate-100 shadow-sm hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5' 
                  : 'bg-slate-50 border-slate-200 grayscale'
            ]"
          >
            <!-- Background Decorative Pattern -->
            <div 
              class="absolute top-0 right-0 w-24 h-24 -translate-y-1/2 translate-x-1/2 rounded-full blur-3xl opacity-20 transition-opacity group-hover:opacity-40"
              :class="selectedProdi === prodi.slug ? 'bg-blue-600' : 'bg-slate-400'"
            ></div>

            <div class="relative flex items-center gap-4">
              <!-- Icon/Code Box -->
              <div 
                class="w-14 h-14 rounded-xl flex items-center justify-center text-lg font-black transition-all duration-500 group-hover:scale-110"
                :class="[
                  selectedProdi === prodi.slug
                    ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                    : prodi.hasData
                      ? 'bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600'
                      : 'bg-slate-200 text-slate-400'
                ]"
              >
                {{ prodi.code }}
              </div>

              <!-- Info -->
              <div class="flex-1 min-w-0">
                <h3 
                  class="font-bold text-slate-800 truncate transition-colors"
                  :class="{ 'text-blue-600': selectedProdi === prodi.slug }"
                >
                  {{ prodi.name }}
                </h3>
                <div class="flex items-center gap-2 mt-1">
                  <span v-if="prodi.hasData" class="flex items-center gap-1 text-[11px] font-bold text-slate-400">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {{ getLecturerCount(prodi.slug) }} Dosen
                  </span>
                  <span v-else class="text-[10px] uppercase tracking-wider font-extrabold text-slate-300">
                    No Data Available
                  </span>
                </div>
              </div>

              <!-- Selection Mark -->
              <div 
                class="transition-all duration-300"
                :class="selectedProdi === prodi.slug ? 'scale-100 opacity-100' : 'scale-50 opacity-0'"
              >
                <div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/40">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Bottom Progress Line (for selected) -->
            <div 
              v-if="selectedProdi === prodi.slug"
              class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600"
            ></div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { prodiRegistry, prodiList } from '../data/prodi/index.js';

export default {
  name: 'ProdiSelector',
  props: {
    selectedProdi: {
      type: String,
      default: null
    }
  },
  computed: {
    groupedPrograms() {
      const groups = {};
      prodiList.forEach(p => {
        if (!groups[p.jurusan]) {
          groups[p.jurusan] = [];
        }
        groups[p.jurusan].push(p);
      });
      return groups;
    }
  },
  methods: {
    selectProdi(prodiSlug) {
      this.$emit('select', prodiSlug);
    },
    getLecturerCount(slug) {
      const data = prodiRegistry[slug];
      if (data && data.config && data.config.lecturers) {
        return data.config.lecturers.length;
      }
      return 0;
    },
    getJurusanColor(jurusan) {
      if (jurusan.toLowerCase().includes('elektro')) {
        return 'from-blue-600 to-indigo-600';
      }
      if (jurusan.toLowerCase().includes('sains')) {
        return 'from-emerald-500 to-teal-600';
      }
      return 'from-slate-400 to-slate-600';
    }
  }
}
</script>

<style scoped>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}
</style>
