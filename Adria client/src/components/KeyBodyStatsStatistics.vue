<template>
  <section class="body-stats-section">
    <div class="row">
      <div class="header-left">
        <div class="text-block">
          <h2>Key Body Stats</h2>
          <p>Health measurements and vitals</p>
        </div>
      </div>
    </div>

    <div class="stats-list">
      <div v-for="stat in bodyStats" :key="stat.label" class="stat-card">
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
          <span class="value-highlight">{{ stat.current }}</span>
          <span v-if="stat.unit" class="unit">{{ stat.unit }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue"

const bodyStats = ref([])

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
.stats-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  gap: 1rem;
}

.stat-card {
  border-radius: 1rem;
  border: 0.1rem solid #E5E5E5;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.stat-header {
  display: flex;
  justify-content: space-between;
}

.stat-header h4 {
  margin-bottom: 2rem;
  font-size: 1.25rem;
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

.value-highlight {
  color: #111;
}
</style>
