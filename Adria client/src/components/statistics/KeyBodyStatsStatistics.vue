<template>
  <section class="body-stats-section">
    <StatisticsHeader
        title="Key Body Stats"
        subtitle="Health measurements and vitals"
        iconClass="stats-icon"
    >
      <template #icon>
        <IconHeart />
      </template>
    </StatisticsHeader>

    <div class="stats-list">
      <StatCard
          v-for="stat in bodyStats"
          :key="stat.label"
          :color="cardColor(stat.label)"
      >
        <template #header>
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
        </template>

        <template #content>
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
        </template>
      </StatCard>
    </div>

    <CholesterolPanel />
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import StatisticsHeader from "./common/StatisticsHeader.vue";
import StatCard from "./common/StatCard.vue";
import ProgressBar from "../ProgressBar.vue";
import CholesterolPanel from "./CholesterolPanel.vue";
import bodyStatsData from "@/data/bodyStats.js";
import "@/components/statistics/common/common.css";
import IconHeart from "@/components/icons/statisticsIcons/IconHeart.vue";

const bodyStats = ref([]);

function isNormal(stat) {
  const num = parseFloat(stat.current.replace(/[^0-9.]/g, ""));
  if (stat.targetMin !== undefined && stat.targetMax !== undefined) {
    return num >= stat.targetMin && num <= stat.targetMax;
  }
  return false;
}

function cardColor(label) {
  if (["Body Fat (%)", "BMI", "Blood Pressure"].includes(label)) return "red";
  if (label === "Hydration (%)") return "blue";
  if (["Resting Heart Rate", "Fasting Blood Glucose"].includes(label)) return "gray";
  return "default";
}

onMounted(() => {
  bodyStats.value = bodyStatsData;
});
</script>

<style scoped>
.body-stats-section {
  background: white;
  border: 0.1rem solid #E5E5E5;
  border-radius: 1rem;
  padding: 2rem;
}

.stats-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  gap: 1rem;
}

.stat-header {
  display: flex;
  justify-content: space-between;
}

.stat-header p {
  color: #717182;
  margin: 0;
}

.stat-header h4{
  font-size: 1.25rem;
  font-weight: normal;
  margin-top: 0;
}

.red h4{
  color: #FB2C36;
}

.gray h4{
  color: #717182;
}

.blue h4 {
  color: #2B7FFF;
}

.stat-value {
  margin-top: 0.25rem;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.unit {
  color: #717182;
}
</style>