<template>
  <section class="body-stats-section">
    <StatisticsHeader
        title="Key Body Stats"
        subtitle="Health measurements and vitals"
        iconClass="intake-icon"
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
            <p v-if="stat.targetMin !== undefined && stat.goal !== undefined">
              <template v-if="stat.targetMin === stat.goal">
                {{ stat.goal }}{{ stat.unit || '' }}
              </template>
              <template v-else>
                {{ stat.targetMin }}–{{ stat.goal }}{{ stat.unit || '' }}
              </template>
            </p>
          </div>
        </template>

        <template #content>
          <div class="stat-value">
            <span
                class="value-highlight"
                :class="{
                good: isNormal(stat) && stat.label !== 'Hydration',
                warning: !isNormal(stat) && stat.label !== 'Hydration',
                blueText: stat.label === 'Hydration'
              }"
            >
              {{ stat.current }}{{ stat.unit }}

            </span>

            <ProgressBar
                v-if="stat.label === 'Hydration'"
                :value="stat.current"
                :max="100"
                color="linear-gradient(90deg, #60a5fa, #3b82f6)"
                class="mt-2"
            />
          </div>
        </template>
      </StatCard>
    </div>

    <CholesterolPanel/>
  </section>
</template>

<script setup>
import "@/components/statisticsTab/common/common.css";
import {ref, onMounted} from "vue";
import {useStats} from "@/composables/useStats.js";
import StatisticsHeader from "@/components/statisticsTab/common/StatisticsHeader.vue";
import StatCard from "@/components/statisticsTab/common/StatCard.vue";
import IconHeart from "@/components/icons/statisticsIcons/IconHeart.vue";
import ProgressBar from "@/components/utilities/ProgressBar.vue";
import CholesterolPanel from "@/components/statisticsTab/statistics/CholesterolPanel.vue";

const bodyStats = ref([]);

function isNormal(stat) {
  return stat.current >= stat.targetMin && stat.current <= stat.goal;
}

function cardColor(label) {
  if (["Body Fat", "BMI", "Blood Pressure"].includes(label)) return "red";
  if (label === "Hydration") return "blue";
  return "gray";
}

onMounted(async () => {
  bodyStats.value = await useStats("body");
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

.stat-header h4 {
  font-size: 1.25rem;
  font-weight: normal;
  margin-top: 0;
}

.red h4 {
  color: #FB2C36;
}

.gray h4 {
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
</style>