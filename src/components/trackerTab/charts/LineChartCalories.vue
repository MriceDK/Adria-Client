<script setup>
import {Line} from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import {ref} from "vue";


const props = defineProps({
  isEditing: Boolean,
});

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);



const chartData = {
  labels: ["13:46", "13:48", "13:52", "14:53"],
  datasets: [
    {
      data: [180, 300, 450, 1500],
      fill: true,
      backgroundColor: (context) => {
        const ctx = context.chart.ctx
        const chartArea = context.chart.chartArea
        if (!chartArea) return null
        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.4)')
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)')
        return gradient
      },
      borderColor: '#3b82f6'
    }
  ],
};


const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  elements: {
    point: {
      radius: 2,
      color: "#3b82f6"
    },
    line: {
      tension: 0.4,
      borderWidth: 2,
      borderColor: '#3b82f6'
    }
  },
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: false
    },
    tooltip: {
      borderWidth: 1,
      padding: 10,
      displayColors: false,
      callbacks: {
        label: (context) => {
          return context.raw + " kcal";
        }
      }
    }
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false
      },
      ticks: {
        color: '#6b7280'
      }
    },
    y: {
      beginAtZero: true,
      grid: {
        color: '#e5e7eb',
        drawBorder: false
      },
      ticks: {
        color: '#6b7280',
        padding: 8
      }
    }
  },
  layout: {
    padding: {
      top: 10,
      right: 20,
      bottom: 10,
      left: 0
    }
  }
}

const needsToBeHidden = ref(true);

</script>

<template>
  <div class="card" v-if="isEditing || (needsToBeHidden && !isEditing)" :class="{hidden : !needsToBeHidden}">
    <div class="card-header">
      <h3>Caloric Timeline</h3>
      <input v-model="needsToBeHidden" type="checkbox" v-if="isEditing" checked>
    </div>
    <p class="subtitle">Cumulative caloric intake throughout the day</p>

    <div class="chart">
      <Line v-if="!chartData.empty" :data="chartData" :options="chartOptions"></Line>
      <div v-else >Data loading...</div>
    </div>

  </div>


</template>

<style scoped>
.card {
  border: 0.1rem solid lightgray;
  padding: 1.5rem;
  border-radius: 1.5rem;
  background: white;
}

.card-header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  font-size: 1.25rem;

}

.card-header h3 {
  margin: 0;
}

.subtitle {
  color: var(--secondary-text-color);
  margin-bottom: 1.5rem;
  margin-top: 0.5rem;
}

.chart {
  height: 20rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hidden {
  opacity: 50%;
}
</style>