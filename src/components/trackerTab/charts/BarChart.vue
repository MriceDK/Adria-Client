<script setup>
import {ref, computed} from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

const props = defineProps({
  isEditing: Boolean,
  goals: {
    label: String,
    current: Number,
    goal: Number,
    unit: String,
  },
});


ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const chartDataReady = computed(() => {
  return props.goals && props.goals.length > 0
})

const chartData = computed(() => ({
  labels: props.goals.map(g => g.label),
  datasets: [
    {
      label: 'Current',
      backgroundColor: '#3b82f6',
      data: props.goals.map(g => g.current)
    },
    {
      label: 'Goal',
      backgroundColor: '#e5e7eb',
      data: props.goals.map(g => g.goal)
    }
  ]
}))
const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      display: true,
      onClick: () => {}
    },
    tooltip: {
      borderWidth: 1,
      padding: 10,
      displayColors: false,
      callbacks: {
        label: (context) => {
          return context.raw + " " + props.goals.filter((nutrient) => nutrient.label === context.label)[0].unit
        }
      }
    }
  }
});

const needsToBeHidden = ref(true);


</script>

<template>
  <div class="card" v-if="isEditing || (needsToBeHidden && !isEditing)" :class="{hidden : !needsToBeHidden}">
    <div class="card-header">
      <h3>Current vs Goals</h3>
      <input v-model="needsToBeHidden" type="checkbox" v-if="isEditing" checked>
    </div>
    <p class="subtitle">Compare your intake to daily targets</p>
    <div class="chart">
      <Bar v-if="chartDataReady"
           :data="chartData"
           :options="chartOptions"

      />
      <div v-else>Data Loading...</div>
    </div>
  </div>

</template>

<style scoped>
.card {
  width: 33%;
  border: 0.1rem solid lightgray;
  padding: 2rem;
  border-radius: 1.5rem;
  background: white;
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
  color: var(--secondary-text-color);
  margin-bottom: 1.5rem;
  margin-top: 0.5rem;
  text-align: center;
}


.chart {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  height: 20rem;
}


.hidden {
  opacity: 0.5;
}
</style>