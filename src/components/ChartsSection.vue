<template>
  <div class="card">
    <h3 class="text-lg font-bold text-slate-800 mb-6">Visualisasi Data</h3>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Publications by Year -->
      <div class="bg-slate-50 rounded-lg p-4">
        <h4 class="text-sm font-semibold text-slate-700 mb-3 text-center">Publikasi per Tahun</h4>
        <Bar :data="yearChartData" :options="yearChartOptions" />
      </div>

      <!-- Category Distribution -->
      <div class="bg-slate-50 rounded-lg p-4">
        <h4 class="text-sm font-semibold text-slate-700 mb-3 text-center">Distribusi Kategori</h4>
        <Pie :data="categoryChartData" :options="pieChartOptions" />
      </div>

      <!-- Top Lecturers -->
      <div class="bg-slate-50 rounded-lg p-4">
        <h4 class="text-sm font-semibold text-slate-700 mb-3 text-center">Top 5 Dosen Produktif</h4>
        <Bar :data="topLecturersData" :options="topLecturersOptions" />
      </div>
    </div>
  </div>
</template>

<script>
import { Bar, Pie } from 'vue-chartjs';
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

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
);

export default {
  name: 'ChartsSection',
  components: {
    Bar,
    Pie
  },
  props: {
    yearChartData: {
      type: Object,
      required: true
    },
    categoryChartData: {
      type: Object,
      required: true
    },
    topLecturersData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      yearChartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            titleFont: {
              size: 14
            },
            bodyFont: {
              size: 13
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      },
      pieChartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 15,
              font: {
                size: 12
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12
          }
        }
      },
      topLecturersOptions: {
        responsive: true,
        maintainAspectRatio: true,
        indexAxis: 'y',
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    }
  }
}
</script>
