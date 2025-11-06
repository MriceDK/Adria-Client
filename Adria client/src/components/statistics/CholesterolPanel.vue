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
.cholesterol-panel {
  margin-top: 2rem;
}

.panel-title {
  font-size: 1.5rem;
  color: #717182;
  margin-bottom: 1rem;;
}

.cholesterol-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(19rem, 1fr));
  gap: 1rem;
}

.cholesterol-card {
  border: 0.1rem solid #fb2c36;
  border-radius: 1rem;
  padding: 1rem;
  background: #ffe9eb;
}

.cholesterol-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.cholesterol-label {
  color: #fb2c36;
  font-weight: bold;
  margin: 0;
}

.cholesterol-goal {
  color: gray;
  font-size: 0.85rem;
  margin: 0;
}

.cholesterol-current {
  color: #fb2c36;
  font-size: 1rem;
  margin-top: 0.5rem;
}
</style>
