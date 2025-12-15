<script setup>
import {computed, ref} from 'vue';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'

const props = defineProps({
  isEditing: Boolean,
  goals: {
    label: String,
    current: Number,
    goal: Number,
    unit: String,
  },
});

const goalsFiltered = computed(() => props.goals.filter((nutrient) => nutrient.label !== "Water"));

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const chartDataReady = computed(() => {
  return goalsFiltered.value && goalsFiltered.value.length > 0
})

const chartData = computed(() => ({
  labels: goalsFiltered.value.map(g =>g.label),
  datasets: [
    {
      label: 'Current progress',
      backgroundColor: ["#10b981", "#f59e0b", "#3b82f6"],
      data: goalsFiltered.value.map(g => g.current)
    }
  ]
}));

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        font: {
          size: 15,
          weight: 'bold'
        },
        boxWidth: 14,
        padding: 12
      },
      onClick: () => {}
    },
    tooltip: {
      borderWidth: 1,
      padding: 10,
      displayColors: false,
      callbacks: {
        label: (context) => {
          return context.parsed + " " + goalsFiltered.value.filter((nutrient) => nutrient.label === context.label)[0].unit;
        }
      }
    }
  }
};

const needsToBeHidden = ref(true);

</script>
<template>
  <div v-if="isEditing || (needsToBeHidden && !isEditing)" class="card" :class="{hidden : !needsToBeHidden}">
    <div class="card-header">
      <h3>Macro Distribution</h3>
      <input v-model="needsToBeHidden" type="checkbox" v-if="isEditing" checked>
    </div>
    <p class="subtitle">Grams of protein, carbs, and fat consumed</p>

    <div class="chart">
      <Pie
          v-if="chartDataReady"
          :data="chartData"
          :options="chartOptions"
      />
      <div v-else >Data loading...</div>
    </div>

  </div>
</template>

<style scoped>
.card {
  width: 33%;
  border: 0.1rem solid lightgray;
  padding: 2rem;
  border-radius: 1.5rem;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.card-header {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1.25rem;
}

.card-header h3 {
  margin: 0;
}

.subtitle {
  color: #6b7280;
  margin-bottom: 1.5rem;
  margin-top: 0.5rem;
  text-align: center;
}

.chart {
  width: 25rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hidden {
  opacity: 0.5;
}
</style>