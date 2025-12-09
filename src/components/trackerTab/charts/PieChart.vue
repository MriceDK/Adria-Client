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
      labels: {boxWidth: 14, padding: 12},
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
      <div v-else >Data loading...</div>    </div>

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
  width: 25rem;
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