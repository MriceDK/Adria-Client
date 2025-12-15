<template>
  <section class="goals-section">
    <div class="header-row">
      <StatisticsHeader
          title="Daily Intake Goals"
          subtitle="Macronutrient targets"
          iconClass="goals-icon"
      >
        <template #icon>
          <IconDroplet />
        </template>
      </StatisticsHeader>

      <div class="actions">
        <main-button v-if="!isEditing" @click="isEditing = true" class="edit-charts">
          Change Goals
        </main-button>

        <div v-else>
          <main-button @click="cancelEdit">Cancel</main-button>
          <main-button @click="saveGoals" :black="true">Save</main-button>
        </div>
      </div>
    </div>

    <div class="goals-list">
      <statistic
          v-for="item in (isEditing ? editableGoals : goals)"
          :key="item.label"
          class="goal-card"
          :class="{ water: item.label === 'Water'}"

          :is-editing="isEditing"
          :item="item"
          :use-progress-bar="true"
      ></statistic>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStats } from "@/composables/useStats.js";
import { updateStatGoal } from "@/services/statsService.js";
import Statistic from "@/components/statisticsTab/Statistic.vue";
import MainButton from "@/components/utilities/MainButton.vue";
import IconDroplet from "@/components/icons/statisticsIcons/IconDroplet.vue";
import StatisticsHeader from "@/components/statisticsTab/common/StatisticsHeader.vue";

const isEditing = ref(false);
const goals = ref([]);
const editableGoals = ref([]);

onMounted(async () => {
  goals.value = await useStats("daily");
  editableGoals.value = JSON.parse(JSON.stringify(goals.value));
});

function cancelEdit() {
  editableGoals.value = JSON.parse(JSON.stringify(goals.value));
  isEditing.value = false;
}

async function saveGoals() {
  for (const stat of editableGoals.value) {
    await updateStatGoal(stat.bodyStatId, stat.goal);
  }

  goals.value = JSON.parse(JSON.stringify(editableGoals.value));
  isEditing.value = false;
}
</script>

<style scoped>
.goals-section {
  background: var(--main-bg-color);
  border: var(--border-default);
  border-radius: 1rem;
  padding: 2rem;
}

.text-block h2 {
  font-size: 1.7rem;
  font-weight: 700;
  color: var(--main-text-color);
  margin: 0;
}

.text-block p {
  font-size: 1rem;
  color: var(--secondary-text-color);
  margin: 0.25rem 0 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.goals-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 1rem;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}
</style>