<template>
  <div class="cholesterol-panel">
    <p class="panel-title">Cholesterol Panel</p>

    <div class="cholesterol-list">
      <div v-for="item in cholesterol" :key="item.label" class="cholesterol-card">
        <div class="cholesterol-top">
          <h4 class="cholesterol-label">{{ item.label }}</h4>
          <p class="cholesterol-goal">{{ item.goalLabel }}</p>
        </div>

        <div class="cholesterol-current">
          {{ item.current }} {{ item.unit }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"

const cholesterol = ref([])

onMounted(() => {
  cholesterol.value = [
    { label: "Total", current: 210, goalLabel: "<200 mg/dL", unit: "mg/dL" },
    { label: "HDL", current: 38, goalLabel: "≥40 mg/dL", unit: "mg/dL" },
    { label: "LDL", current: 110, goalLabel: "<100 mg/dL", unit: "mg/dL" },
    { label: "Triglycerides", current: 160, goalLabel: "<150 mg/dL", unit: "mg/dL" }
  ]
})
</script>

<style scoped>

</style>
