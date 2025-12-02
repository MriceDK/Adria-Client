<script setup>

import ApexCharts from 'vue3-apexcharts';
import {computed, ref} from "vue";

const props = defineProps({
  isEditing: Boolean,
  goals: {
    label: String,
    current: Number,
    goal: Number,
    unit: String,
  },
});

const chartDataPercent = computed(() =>
    props.goals.map(g => Math.round((g.current / g.goal) * 100))
)

// Cap the series out at 100% to deny visual overflow
const chartDataPercentMax100 = computed(() =>
    chartDataPercent.value.map(val => (val > 100 ? 100 : val))
)

const labels = computed(() => props.goals.map(g => g.label))

const chartDataReady = computed(() => {
  return !!props.goals && props.goals.length > 0
});

const chartOptions = ref({
  chart: {
    height: 380,
    type: 'radialBar'
  },
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      dataLabels: {
        name: { fontSize: '1rem' },
        value: {
          fontSize: '1rem',
          formatter: (val) => {
            // Show the actual percentage, even if >100%
            return chartDataPercent.value[chartDataPercentMax100.value.indexOf(parseInt(val))] + '%'
          }
        }
      }
    }
  },
  labels: labels,
  colors: ['#f87979', '#a3c3fa', '#78e58b', '#ffe082']
});

const needsToBeHidden = ref(true);

</script>

<template>
  <div class="card" v-if="isEditing || (needsToBeHidden && !isEditing)" :class="{hidden : !needsToBeHidden}">
    <div class="card-header">
      <h3>Goals Progress</h3>
      <input v-model="needsToBeHidden" type="checkbox" v-if="isEditing" checked>
    </div>
    <p class="subtitle">Percentage of daily targets achieved</p>

    <div class="chart">
      <ApexCharts
          v-if="chartDataReady"
          width="380"
          type="radialBar"
          :series="chartDataPercentMax100"
          :options="chartOptions" />
      <div v-else >Data loading...</div>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 35%;
  border: 0.1rem solid lightgray;
  padding: 1.5rem;
  border-radius: 1.5rem;
  background: white;
}

.subtitle {
  color: #6b7280;
}

.chart {
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