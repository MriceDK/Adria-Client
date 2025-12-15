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
);

// Cap the series out at 100% to deny visual overflow
const chartDataPercentMax100 = computed(() =>
    chartDataPercent.value.map(val => (val > 100 ? 100 : val))
);

const labels = computed(() => props.goals.map(g => g.label));

const chartDataReady = computed(() => {
  return !!props.goals && props.goals.length > 0;
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

      hollow: {
        size: '25%'
      },

      track: {
        strokeWidth: '40%'
      },

      stroke: {
        lineCap: 'round'
      },

      dataLabels: {
        name: {
          fontSize: '1rem',
          offsetY: -25
        },
        value: {
          fontSize: '1rem',
          offsetY: -20,
          formatter: (val) => {
            return chartDataPercent.value[
                chartDataPercentMax100.value.indexOf(parseInt(val))
                ] + '%';
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
          width="450"
          type="radialBar"
          :series="chartDataPercentMax100"
          :options="chartOptions"
      />
      <div v-else>Data loading...</div>
    </div>
  </div>
</template>


<style scoped>
.card {
  width: 33%;
  border: var(--border-default);
  padding: 2rem;
  border-radius: 1.5rem;
  background: var(--main-bg-color);
  text-align: center;
}

.card-header {
  display: flex;
  justify-content: center;
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
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
}

.hidden {
  opacity: 0.5;
}
</style>
