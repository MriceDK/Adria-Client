<template>
  <section class="goals-section">

    <div class="row">
      <div class="header-left">
        <div class="icon-circle goals-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round"
               class="lucide lucide-droplet">
            <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"></path>
          </svg>
        </div>

        <div class="text-block">
          <h2>Daily Intake Goals</h2>
          <p>Macronutrient targets</p>
        </div>
      </div>

      <div class="actions">
        <button v-if="!isEditing" @click="isEditing = true" class="btn">Change Goals</button>
        <template v-else>
          <button @click="cancelEdit" class="btn cancel">Cancel</button>
          <button @click="saveGoals" class="btn save">Save</button>
        </template>
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
  background: white;
  border: 0.1rem solid lightgray;
  border-radius: 1rem;
  padding: 2rem;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  margin-top: 1rem;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icon-circle.goals-icon {
  background-color: #dbeafe;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-circle.goals-icon svg {
  width: 2rem;
  height: 2rem;
  stroke: #2563eb;
}

.text-block h2 {
  font-size: 1.7rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.text-block p {
  font-size: 1rem;
  color: #6b7280;
  margin: 0.25rem 0 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.btn {
  cursor: pointer;
  font-family: var(--main-font-family),sans-serif;
  background-color: var(--main-bg-color);
  padding: 0.5rem 2rem;
  font-size: 1rem;
  border: solid 0.075rem var(--secondary-bg-color);
  border-radius: 0.35rem;
}

.btn:hover {
  background-color: var(--secondary-bg-color);
}

.btn.save {
  background: black;
  color: white;
}

.btn.save:hover {
  background: darkslategray;
}

.goals-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 1rem;
}

</style>