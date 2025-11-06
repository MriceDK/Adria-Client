<template>
  <section class="body-stats-section">
    <div class="row">
      <div class="header-left">
        <div class="icon-circle stats-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round"
               class="lucide lucide-heart">
            <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>
          </svg>
        </div>
        <div class="text-block">
          <h2>Key Body Stats</h2>
          <p>Health measurements and vitals</p>
        </div>
      </div>
    </div>

    <div class="stats-list">
      <div
          v-for="stat in bodyStats"
          :key="stat.label"
          class="stat-card"
          :class="{
          red: ['Body Fat (%)', 'BMI', 'Blood Pressure'].includes(stat.label),
          blue: stat.label === 'Hydration (%)',
          gray: ['Resting Heart Rate', 'Fasting Blood Glucose'].includes(stat.label)
        }"
      >
        <div class="stat-header">
          <h4>{{ stat.label }}</h4>
          <p v-if="stat.targetMin !== undefined && stat.targetMax !== undefined">
            <template v-if="stat.targetMin === stat.targetMax">
              {{ stat.targetMax }}{{ stat.unit || '' }}
            </template>
            <template v-else>
              {{ stat.targetMin }}–{{ stat.targetMax }}{{ stat.unit || '' }}
            </template>
          </p>
        </div>

        <div class="stat-value">
          <span
              class="value-highlight"
              :class="{
              good: isNormal(stat) && stat.label !== 'Hydration (%)',
              warning: !isNormal(stat) && stat.label !== 'Hydration (%)',
              blueText: stat.label === 'Hydration (%)'
            }"
          >
            {{ stat.current }}
          </span>
          <span v-if="stat.unit" class="unit">{{ stat.unit }}</span>
          <ProgressBar
              v-if="stat.label === 'Hydration (%)'"
              :value="parseFloat(stat.current)"
              :max="100"
              color="linear-gradient(90deg, #60a5fa, #3b82f6)"
              class="mt-2"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue"
import ProgressBar from "@/components/ProgressBar.vue";

const bodyStats = ref([])

function isNormal(stat) {
  const num = parseFloat(stat.current.replace(/[^0-9.]/g, ""))
  if (stat.targetMin !== undefined && stat.targetMax !== undefined) {
    return num >= stat.targetMin && num <= stat.targetMax
  }
  return false
}

onMounted(() => {
  bodyStats.value = [
    { label: 'Body Fat (%)', current: '15%', targetMin: 10, targetMax: 25 },
    { label: 'BMI', current: '26.5', targetMin: 18.5, targetMax: 25 },
    { label: 'Blood Pressure', current: '135', targetMin: 0, targetMax: 120, unit: 'mmHg' },
    { label: 'Resting Heart Rate', current: '75', targetMin: 60, targetMax: 100, unit: 'bpm' },
    { label: 'Fasting Blood Glucose', current: '95', targetMin: 70, targetMax: 100, unit: 'mg/dL' },
    { label: 'Hydration (%)', current: '85%', targetMin: 100, targetMax: 100 }
  ]
})
</script>

<style scoped>
.body-stats-section {
  background: white;
  border: 0.1rem solid #E5E5E5;
  border-radius: 1rem;
  padding: 2rem;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icon-circle.stats-icon {
  background-color: #fee2e2;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-circle.stats-icon svg {
  width: 2rem;
  height: 2rem;
  stroke: #ef4444;
}

.text-block h2 {
  font-size: 1.7rem;
  font-weight: bold;
  margin: 0;
}

.text-block p {
  font-size: 1rem;
  color: #717182;
  margin: 0;
}

.stats-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  gap: 1rem;
}

.stat-card {
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.stat-card.red {
  border: 0.1rem solid #FD959A;
}

.stat-card.red h4 {
  color: #FB3841;
}

.stat-card.gray {
  border: 0.1rem solid #E5E5E5;
}

.stat-card.gray h4 {
  color: #717182;
}

.stat-card.blue {
  border: 0.1rem solid #2b7fff;
}

.stat-card.blue h4 {
  color: #2b7fff;
}

.stat-header {
  display: flex;
  justify-content: space-between;
}

.stat-header h4 {
  margin-bottom: 2rem;
  margin-top: 0;
  font-size: 1.25rem;
  font-weight: normal;
}

.stat-header p {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0.25rem 0;
}

.stat-value {
  margin-top: 0.25rem;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.stat-value .unit {
  color: #717182;
  font-size: 1.25rem;
}

.value-highlight.good {
  color: #37D477;
}

.value-highlight.warning {
  color: #F0B100;
}

.value-highlight.blueText {
  color: #2b7fff;
}

.mt-2 {
  margin-top: 0.5rem;
}
</style>