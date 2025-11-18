<script setup>

import MacroDistributionChart from "@/components/trackerTab/charts/MacroDistributionChart.vue";
</script>

<template>
  <div class="charts-row">
  <MacroDistributionChart/>
  <MacroDistributionChart/>
  <MacroDistributionChart/>
  </div>
</template>

<style scoped>
.charts-row {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: flex-start;
}
</style>