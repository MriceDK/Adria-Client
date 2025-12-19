<script setup>
import {Line} from 'vue-chartjs';
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

import { ref, onMounted } from "vue";
import { getHistory } from "@/services/api/history.js";
import { USER_ID } from "@/services/api/config.js";

const props = defineProps({isEditing: Boolean});

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

const chartData = ref(null);
const needsToBeHidden = ref(true);

async function loadMacrosTimeline() {
  const history = await getHistory(USER_ID);

  history.sort(
      (a, b) => new Date(a.scanDateTime) - new Date(b.scanDateTime)
  );

  const labels = [];
  const protein = [];
  const carbs = [];
  const fat = [];

  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;

  history.forEach(item => {
    const getAmount = (type) =>
        item.nutrients.find(n => n.type === type)?.amount ?? 0;

    totalProtein += getAmount("Protein");
    totalCarbs += getAmount("Carbohydrates");
    totalFat += getAmount("Fats");

    labels.push(
        new Date(item.scanDateTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        })
    );

    protein.push(totalProtein);
    carbs.push(totalCarbs);
    fat.push(totalFat);
  });

  chartData.value = {
    labels,
    datasets: [
      {
        label: "Carbs (g)",
        data: carbs,
        borderColor: "#22c55e",
        backgroundColor: "#22c55e",
        tension: 0.4,
        pointRadius: 3,
        fill: false
      },
      {
        label: "Fat (g)",
        data: fat,
        borderColor: "#f59e0b",
        backgroundColor: "#f59e0b",
        tension: 0.4,
        pointRadius: 3,
        fill: false
      },
      {
        label: "Protein (g)",
        data: protein,
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
        tension: 0.4,
        pointRadius: 3,
        fill: false
      }
    ]
  };
}

onMounted(loadMacrosTimeline);

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
};
</script>

<template>
  <div
      class="card"
      v-if="isEditing || (needsToBeHidden && !isEditing)"
      :class="{ hidden: !needsToBeHidden }"
  >
    <div class="card-header">
      <h3>Macros Timeline</h3>
      <input
          v-if="isEditing"
          v-model="needsToBeHidden"
          type="checkbox"
      />
    </div>

    <p class="subtitle">
      Cumulative protein, carbs, and fat over time
    </p>

    <div class="chart">
      <Line
          v-if="chartData"
          :data="chartData"
          :options="chartOptions"
      />
      <div v-else>Data loading...</div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: var(--border-default);
  padding: 1.5rem;
  border-radius: 1.5rem;
  background: var(--main-bg-color);
}

.card-header {
  display: flex;
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
  opacity: 0.5;
}
</style>