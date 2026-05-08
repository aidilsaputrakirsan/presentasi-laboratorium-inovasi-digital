<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="card bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-slate-700">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-4">
          <div class="relative">
            <div class="w-14 h-14 bg-gradient-to-br from-cyan-500 via-sky-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
            <div class="absolute inset-0 rounded-2xl bg-cyan-500/30 animate-pulse"></div>
          </div>
          <div>
            <h1 class="text-2xl font-black text-white tracking-tight">Roadmap Riset</h1>
            <p class="text-sm text-slate-400 mt-0.5">Evolusi tematik penelitian dan pengabdian dosen ({{ metadata.yearRange }})</p>
          </div>
        </div>
      </div>

      <!-- Timeline Metrics -->
      <div class="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
        <div v-for="item in timeline" :key="item.year" class="bg-white/5 rounded-lg p-3 text-center border border-white/10">
          <div class="text-xl font-bold text-cyan-400">{{ item.count }}</div>
          <div class="text-[10px] text-slate-400 font-mono">{{ item.year }}</div>
        </div>
      </div>
    </div>

    <!-- AI Attribution Banner -->
    <div v-if="hasData" class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-4 flex items-start gap-4">
      <div class="w-10 h-10 rounded-xl bg-white border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-1">
          <p class="text-sm font-bold text-slate-800">Dianalisis oleh Agen AI</p>
          <span class="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full uppercase tracking-wider">Claude Opus</span>
        </div>
        <p class="text-xs text-slate-600 leading-relaxed">
          Topik, fase evolusi, dan rekomendasi strategis disusun oleh
          <strong class="text-slate-800">Claude Opus</strong> — model AI penalaran tingkat tinggi (high-level reasoning) dari Anthropic
          yang membaca seluruh judul karya 2018-2025 dan menyimpulkan benang merah riset lab.
        </p>
      </div>
    </div>

    <!-- Phases Timeline -->
    <div v-if="hasData && phases.length">
      <h2 class="text-lg font-black text-slate-900 mb-4">Fase Evolusi Riset</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="(phase, idx) in phases"
          :key="phase.name"
          class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm relative"
        >
          <div class="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-black text-slate-500">
            {{ idx + 1 }}
          </div>
          <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
            {{ formatYears(phase.years) }}
          </p>
          <h3 class="text-base font-bold text-slate-800 mb-2">{{ phase.name }}</h3>
          <p class="text-xs text-slate-600 leading-relaxed">{{ phase.narrative }}</p>
        </div>
      </div>
    </div>

    <!-- Sankey Chart -->
    <div class="card p-4 min-h-[600px] relative">
      <div v-if="!hasData" class="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-white/80 z-10">
        <svg class="w-16 h-16 mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
        <p class="font-bold">Belum ada data Roadmap</p>
        <p class="text-sm">Jalankan <code>scripts/build_roadmap.py</code></p>
      </div>

      <div class="mb-2 flex items-center justify-between">
        <p class="text-xs font-bold uppercase tracking-widest text-slate-500">Tren Topik per Tahun</p>
        <p class="text-[10px] text-slate-400">Klik titik pada garis untuk lihat judul</p>
      </div>
      <v-chart class="chart" :option="chartOption" autoresize @click="handleChartClick" />
    </div>

    <!-- Topic Narratives -->
    <div v-if="hasData && topics.length">
      <h2 class="text-lg font-black text-slate-900 mb-4">Topik & Saran Strategis</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="topic in topics"
          :key="topic.id"
          class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow"
        >
          <!-- Topic Header -->
          <div class="flex items-start gap-3 mb-3">
            <div
              class="w-2 h-12 rounded-full shrink-0"
              :style="{ backgroundColor: topic.color }"
            ></div>
            <div class="flex-1 min-w-0">
              <h3 class="text-base font-bold text-slate-800">{{ topic.name }}</h3>
              <div class="flex items-center gap-2 mt-1 flex-wrap">
                <span class="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase tracking-wider">
                  {{ topic.total_count }} karya
                </span>
                <span class="px-2 py-0.5 bg-amber-50 text-amber-700 text-[10px] font-bold rounded uppercase tracking-wider">
                  Peak {{ topic.peak_year }}
                </span>
                <span class="text-[10px] font-bold text-slate-400">
                  Aktif {{ topic.active_years[0] }}–{{ topic.active_years[topic.active_years.length - 1] }}
                </span>
              </div>
            </div>
          </div>

          <!-- Narrative -->
          <div class="space-y-3 pt-3 border-t border-slate-100">
            <div class="flex items-start gap-2.5">
              <span class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1 shrink-0 w-16">Observasi</span>
              <p class="text-xs text-slate-700 leading-relaxed flex-1">{{ topic.narrative }}</p>
            </div>
            <div class="flex items-start gap-2.5">
              <span class="text-[10px] font-bold uppercase tracking-widest text-blue-500 mt-1 shrink-0 w-16">Saran AI</span>
              <p class="text-xs text-slate-800 leading-relaxed flex-1 font-medium">{{ topic.recommendation }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Drill-down Modal -->
    <div v-if="selectedNode" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" @click.self="selectedNode = null">
      <div class="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] flex flex-col shadow-2xl animate-fade-in-up">
        <div class="p-6 border-b border-slate-100 flex justify-between items-start">
          <div>
            <span class="text-xs font-bold text-cyan-500 uppercase tracking-wider">Topik Riset</span>
            <h3 class="text-2xl font-black text-slate-800">{{ selectedNode.name }}</h3>
            <p class="text-slate-500 text-sm mt-1">{{ selectedNode.titles.length }} karya pada periode ini</p>
          </div>
          <button @click="selectedNode = null" class="text-slate-400 hover:text-slate-600 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="p-6 overflow-y-auto custom-scrollbar">
          <ul class="space-y-3">
            <li v-for="(title, idx) in selectedNode.titles" :key="idx" class="flex gap-3 text-sm text-slate-700 p-3 bg-slate-50 rounded-xl hover:bg-cyan-50 transition-colors border border-slate-100 hover:border-cyan-100">
              <span class="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-white rounded-full text-xs font-bold text-slate-400 border border-slate-200 shadow-sm">{{ idx + 1 }}</span>
              <span class="leading-relaxed">{{ title }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { use } from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import VChart, { THEME_KEY } from 'vue-echarts';

use([CanvasRenderer, LineChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent]);

import roadmapData from '../data/shared/roadmap_data.json';

export default {
  name: 'ResearchRoadmap',
  components: { VChart },
  provide: {
    [THEME_KEY]: 'light'
  },
  data() {
    return {
      selectedNode: null
    }
  },
  computed: {
    hasData() {
      return roadmapData?.sankey?.nodes?.length > 0;
    },
    metadata() {
      return roadmapData?.metadata || {};
    },
    timeline() {
      return roadmapData?.timeline || [];
    },
    phases() {
      return roadmapData?.phases || [];
    },
    topics() {
      return roadmapData?.topics || [];
    },
    yearAxis() {
      // All years across timeline (continuous range, no gaps)
      const years = (roadmapData?.timeline || []).map(t => t.year);
      if (!years.length) return [];
      const min = Math.min(...years);
      const max = Math.max(...years);
      const out = [];
      for (let y = min; y <= max; y++) out.push(y);
      return out;
    },
    nodeMap() {
      // Quick lookup: `${topic_id}|${year}` -> node (with titles)
      const m = {};
      (roadmapData?.sankey?.nodes || []).forEach(n => {
        m[`${n.topic_id}|${n.year}`] = n;
      });
      return m;
    },
    chartOption() {
      if (!this.hasData) return {};

      const years = this.yearAxis;
      const map = this.nodeMap;

      const series = this.topics.map(topic => {
        const data = years.map(y => {
          const n = map[`${topic.id}|${y}`];
          return n ? n.value : null;
        });
        return {
          name: topic.name,
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          showSymbol: true,
          connectNulls: false,
          data,
          itemStyle: { color: topic.color },
          lineStyle: { width: 2.5, color: topic.color },
          areaStyle: { opacity: 0.06, color: topic.color },
          emphasis: { focus: 'series', lineStyle: { width: 4 } },
        };
      });

      return {
        color: this.topics.map(t => t.color),
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'line', lineStyle: { color: '#94a3b8', type: 'dashed' } },
          backgroundColor: '#0f172a',
          borderWidth: 0,
          textStyle: { color: '#fff', fontSize: 12 },
          formatter: function(params) {
            if (!params || !params.length) return '';
            const year = params[0].axisValue;
            const rows = params
              .filter(p => p.value !== null && p.value !== undefined)
              .sort((a, b) => b.value - a.value)
              .map(p => `
                <div style="display:flex;align-items:center;gap:8px;margin:3px 0">
                  <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${p.color}"></span>
                  <span style="flex:1">${p.seriesName}</span>
                  <strong style="margin-left:12px">${p.value}</strong>
                </div>`).join('');
            return `<div style="font-weight:700;margin-bottom:6px">${year}</div>${rows || '<em style="color:#94a3b8">tidak ada karya</em>'}`;
          },
        },
        legend: {
          type: 'scroll',
          top: 0,
          left: 'center',
          itemWidth: 12,
          itemHeight: 12,
          textStyle: { fontSize: 11, color: '#475569', fontWeight: 600 },
          icon: 'roundRect',
        },
        grid: { top: 70, left: 50, right: 30, bottom: 40, containLabel: true },
        xAxis: {
          type: 'category',
          data: years,
          boundaryGap: false,
          axisLine: { lineStyle: { color: '#cbd5e1' } },
          axisTick: { show: false },
          axisLabel: { color: '#64748b', fontWeight: 600, fontSize: 11 },
        },
        yAxis: {
          type: 'value',
          name: 'Jumlah karya',
          nameTextStyle: { color: '#94a3b8', fontSize: 10, padding: [0, 0, 0, 30] },
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
          axisLabel: { color: '#94a3b8', fontSize: 11 },
        },
        series,
      };
    }
  },
  methods: {
    formatYears(years) {
      if (!years || !years.length) return '';
      const min = Math.min(...years);
      const max = Math.max(...years);
      return min === max ? `${min}` : `${min}–${max}`;
    },
    handleChartClick(params) {
      if (params.componentType === 'series' && params.value !== null && params.value !== undefined) {
        const topic = this.topics.find(t => t.name === params.seriesName);
        const year = this.yearAxis[params.dataIndex];
        if (!topic || !year) return;
        const node = this.nodeMap[`${topic.id}|${year}`];
        if (node && node.titles) {
          this.selectedNode = {
            name: `${topic.name} (${year})`,
            titles: node.titles,
          };
        }
      }
    }
  }
};
</script>

<style scoped>
.card {
  @apply bg-white rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden;
}
.chart {
  height: 600px;
  width: 100%;
}
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
</style>
