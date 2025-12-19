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
import { ref, onMounted } from "vue"
import { getHistory } from "@/services/api/history.js"
import { USER_ID } from "@/services/api/config.js"

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
)

const chartData = ref(null)
const needsToBeHidden = ref(true)

async function fetchSortedHistory(userId) {
  const history = await getHistory(userId)
  return history.sort(
      (a, b) => new Date(a.scanDateTime) - new Date(b.scanDateTime)
  )
}

function buildCalorieTimeline(history) {
  const labels = []
  const calories = []
  let totalCalories = 0

  history.forEach(item => {
    const calorie = item.nutrients.find(n => n.type === "Calories")
    if (!calorie) return

    totalCalories += calorie.amount

    labels.push(
        new Date(item.scanDateTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        })
    )

    calories.push(totalCalories)
  })

  return {labels, calories}
}

function createCaloriesGradient(context) {
  const {ctx, chartArea} = context.chart
  if (!chartArea) return null

  const gradient = ctx.createLinearGradient(
      0,
      chartArea.top,
      0,
      chartArea.bottom
  )

  gradient.addColorStop(0, "rgba(59, 130, 246, 0.4)")
  gradient.addColorStop(1, "rgba(59, 130, 246, 0)")

  return gradient
}

function buildCalorieDataset(calories) {
  return [
    {
      data: calories,
      fill: true,
      backgroundColor: createCaloriesGradient,
      borderColor: "#3b82f6",
      borderWidth: 2,
      tension: 0.4
    }
  ]
}

async function loadCalorieTimeline() {
  const history = await fetchSortedHistory(USER_ID)
  const {labels, calories} = buildCalorieTimeline(history)

  chartData.value = {
    labels,
    datasets: buildCalorieDataset(calories)
  }
}

onMounted(loadCalorieTimeline)

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  elements: {
    point: {
      radius: 2
    }
  },
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      borderWidth: 1,
      padding: 10,
      displayColors: false,
      callbacks: {
        label: (context) => `${context.raw} kcal`
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
      right: 20,
      bottom: 10,
      left: 0
    }
  }
}
</script>

<template>
  <div
      class="card"
      v-if="isEditing || (needsToBeHidden && !isEditing)"
      :class="{ hidden: !needsToBeHidden }"
  >
    <div class="card-header">
      <h3>Caloric Timeline</h3>
      <input
          v-if="isEditing"
          v-model="needsToBeHidden"
          type="checkbox"
      />
    </div>

    <p class="subtitle">
      Cumulative caloric intake throughout the day
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