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
        label: "Carbs (g)",
        data: [20, 45, 57, 57],
        borderColor: "#22c55e",
        backgroundColor: "#22c55e",
        tension: 0.4,
        pointRadius: 3,
        fill: false
      },
      {
        label: "Fat (g)",
        data: [2, 3, 6, 27],
        borderColor: "#f59e0b",
        backgroundColor: "#f59e0b",
        tension: 0.4,
        pointRadius: 3,
        fill: false
      },
      {
        label: "Protein (g)",
        data: [15, 16, 46, 73],
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
        tension: 0.4,
        pointRadius: 3,
        fill: false
      }
    ]
  }

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: "index",
    intersect: false
  },
  elements: {
    point: {
      radius: 3
    },
    line: {
      borderWidth: 2
    }
  },
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      labels: {
        usePointStyle: true,
        boxWidth: 8,
        color: "#374151"
      }
    },
    title: {
      display: false
    },
    tooltip: {
      borderWidth: 1,
      padding: 10,
      displayColors: false,
      callbacks: {
        label: (context) => `${context.dataset.label}: ${context.raw} g`
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
        color: "#6b7280"
      }
    },
    y: {
      beginAtZero: true,
      grid: {
        color: "#e5e7eb",
        drawBorder: false
      },
      ticks: {
        color: "#6b7280",
        padding: 8
      }
    }
  },
  layout: {
    padding: {
      top: 10,
      right: 16,
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
      <h3>Macros Timeline</h3>
      <input v-model="needsToBeHidden" type="checkbox" v-if="isEditing" checked>
    </div>
    <p class="subtitle">Cumulative protein, carbs, and fat over time</p>

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

.subtitle {
  color: #6b7280;
}

.chart {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
}

.hidden {
  opacity: 50%;
}
</style>