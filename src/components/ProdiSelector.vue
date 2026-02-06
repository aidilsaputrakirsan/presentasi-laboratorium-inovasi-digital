<template>
  <div class="card mb-6">
    <h2 class="text-xl font-bold text-slate-800 mb-4">Pilih Program Studi</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <button
        v-for="(prodi, key) in studyPrograms"
        :key="key"
        @click="selectProdi(key)"
        :class="[
          'p-6 rounded-xl border-2 transition-all duration-300 text-left',
          selectedProdi === key
            ? 'border-primary-500 bg-primary-50 shadow-lg'
            : 'border-slate-200 bg-white hover:border-primary-300 hover:shadow-md'
        ]"
      >
        <div class="flex items-center gap-4">
          <div :class="[
            'w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold',
            selectedProdi === key
              ? 'bg-primary-500 text-white'
              : 'bg-slate-100 text-slate-600'
          ]">
            {{ prodi.code }}
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-slate-800">{{ prodi.name }}</h3>
            <p class="text-sm text-slate-600 mt-1">
              {{ prodi.lecturers.length }} Dosen
            </p>
          </div>
          <div v-if="selectedProdi === key" class="text-primary-500">
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
          </div>
        </div>
      </button>
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
    studyPrograms() {
      const programs = {};
      prodiList.filter(p => p.hasData).forEach(p => {
        const data = prodiRegistry[p.slug];
        if (data && data.config) {
          programs[p.name] = {
            name: data.config.name,
            code: data.config.code,
            lecturers: data.config.lecturers
          };
        }
      });
      return programs;
    }
  },
  methods: {
    selectProdi(prodiKey) {
      this.$emit('select', prodiKey);
    }
  }
}
</script>
