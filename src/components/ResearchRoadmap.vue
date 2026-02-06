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
            <div class="flex items-center gap-3">
              <h1 class="text-2xl font-black text-white tracking-tight">Roadmap Riset</h1>
              <span class="px-2 py-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">Evolution</span>
            </div>
            <p class="text-sm text-slate-400 mt-0.5">Visualisasi Evolusi Topik Penelitian (2018-2025)</p>
          </div>
        </div>
        <div v-if="metadata" class="hidden md:block text-right">
          <span class="text-xs uppercase tracking-wider text-slate-500 font-bold">Timeline</span>
          <p class="text-sm font-semibold text-slate-300">{{ metadata.yearRange }}</p>
        </div>
      </div>

      <!-- Timeline Metrics -->
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        <div v-for="item in timeline.slice(-6)" :key="item.year" class="bg-white/5 rounded-lg p-3 text-center border border-white/10">
          <div class="text-xl font-bold text-cyan-400">{{ item.count }}</div>
          <div class="text-[10px] text-slate-400 font-mono">{{ item.year }}</div>
        </div>
      </div>
    </div>

    <div class="card p-4 min-h-[600px] relative">
      <div v-if="!hasData" class="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-white/80 z-10">
        <svg class="w-16 h-16 mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
        <p class="font-bold">Belum ada data Roadmap</p>
        <p class="text-sm">Jalankan scripts/research_roadmap.py</p>
      </div>
      
      <v-chart class="chart" :option="chartOption" autoresize @click="handleChartClick" />
    </div>

    <!-- Drill-down Modal -->
    <div v-if="selectedNode" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" @click.self="selectedNode = null">
      <div class="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] flex flex-col shadow-2xl animate-fade-in-up">
        <!-- Modal Header -->
        <div class="p-6 border-b border-slate-100 flex justify-between items-start">
          <div>
            <span class="text-xs font-bold text-cyan-500 uppercase tracking-wider">Topik Riset</span>
            <h3 class="text-2xl font-black text-slate-800">{{ selectedNode.name }}</h3>
            <p class="text-slate-500 text-sm mt-1">Ditemukan dalam {{ selectedNode.titles.length }} judul penelitian</p>
          </div>
          <button @click="selectedNode = null" class="text-slate-400 hover:text-slate-600 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <!-- Modal Body (Scrollable) -->
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

    <div class="text-center text-xs text-slate-400">
      *Klik pada node (kotak) untuk melihat detail judul penelitian. Ketebalan garis menunjukkan volume kontinuitas topik.
    </div>
  </div>
</template>

<script>
import { use } from 'echarts/core';
import { SankeyChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import VChart, { THEME_KEY } from 'vue-echarts';

// Register ECharts components
use([
  CanvasRenderer,
  SankeyChart,
  TitleComponent,
  TooltipComponent
]);

// Import data
import roadmapData from '../data/shared/roadmap_data.json';

export default {
  name: 'ResearchRoadmap',
  components: {
    VChart
  },
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
      return roadmapData && roadmapData.sankey && roadmapData.sankey.nodes.length > 0;
    },
    metadata() {
      return roadmapData?.metadata || {};
    },
    timeline() {
      return roadmapData?.timeline || [];
    },
    chartOption() {
      if (!this.hasData) return {};
      
      return {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove',
          formatter: function(params) {
             if (params.dataType === 'node') {
               const count = params.data.real_count || params.value;
               return `${params.data.name}<br/>Jumlah Penelitian: <b>${count}</b>`;
             } else {
               return `${params.data.source} → ${params.data.target}<br/>Volume: ${params.value}`;
             }
          }
        },
        series: [
          {
            type: 'sankey',
            layoutIterations: 32,
            nodeAlign: 'left',
            nodeWidth: 20,
            nodeGap: 16,
            emphasis: {
              focus: 'adjacency'
            },
            data: roadmapData.sankey.nodes,
            links: roadmapData.sankey.links,
            dropped: true,
            sort: 'descending',
            itemStyle: {
              color: '#1f2937',
              borderColor: '#1f2937',
              borderWidth: 1,
              opacity: 0.8
            },
            lineStyle: {
              color: 'source',
              curveness: 0.5,
              opacity: 0.3
            },
            label: {
              color: '#374151',
              fontFamily: 'Inter',
              fontWeight: 600,
              fontSize: 10
            },
            levels: [
              {
                depth: 0,
                itemStyle: { color: '#fbcfe8' },
                lineStyle: { color: 'source', opacity: 0.2 }
              },
              {
                depth: 1,
                itemStyle: { color: '#f472b6' },
                lineStyle: { color: 'source', opacity: 0.2 }
              },
              {
                depth: 2,
                itemStyle: { color: '#e879f9' },
                lineStyle: { color: 'source', opacity: 0.2 }
              },
              {
                depth: 3,
                itemStyle: { color: '#c084fc' },
                lineStyle: { color: 'source', opacity: 0.2 }
              },
              {
                depth: 4,
                itemStyle: { color: '#818cf8' },
                lineStyle: { color: 'source', opacity: 0.2 }
              },
              {
                depth: 5,
                itemStyle: { color: '#38bdf8' },
                lineStyle: { color: 'source', opacity: 0.2 }
              }
            ]
          }
        ]
      };
    }
  },
  methods: {
    handleChartClick(params) {
      if (params.dataType === 'node') {
        const nodeData = params.data;
        // Node data contains titles now (from backend update)
        if (nodeData && nodeData.titles) {
          this.selectedNode = {
            name: nodeData.name,
            titles: nodeData.titles
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
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
