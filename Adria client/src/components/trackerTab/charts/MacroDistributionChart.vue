<template>
  <div class="card">
    <h3>Macro Distribution</h3>
    <p class="subtitle">Grams of protein, carbs, and fat consumed</p>

    <div class="chart">
      <Pie :data="chartData" :options="chartOptions" />
    </div>

  </div>
</template>

<script setup>
import {Pie} from "vue-chartjs";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const chartData = {
  labels: ["Carbs", "Fat", "Protein"],
  datasets: [
    {
      data: [15, 23, 90],
      backgroundColor: ["#10b981", "#f59e0b", "#3b82f6"],
    },
  ],
};

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
          const value = context.raw;
          return value.toFixed(1) + "g";
        }
      }
    }
  }
};
</script>

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
</style>