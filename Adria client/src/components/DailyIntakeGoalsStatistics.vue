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

    <div v-if="!isEditing" class="goals-list">
      <div v-for="item in goals" :key="item.label" class="goal-card" :class="{ water: item.label === 'Water' }">
      <h4>{{ item.label }}</h4>
        <p>{{ item.current }}{{ item.unit }} / {{ item.goal }}{{ item.unit }}</p>

        <ProgressBar
            :value="item.current"
            :max="item.goal"
            :color="item.label === 'Water' ? 'linear-gradient(90deg, #60a5fa, #3b82f6)' : null"/>

        <p class="remaining">{{ (item.goal - item.current).toFixed(1) }}{{ item.unit }} remaining</p>
      </div>
    </div>

    <div v-else class="goals-edit">
      <div v-for="(goal, index) in editableGoals" :key="goal.label" class="goal-edit">
        <label>{{ goal.label }} ({{ goal.unit }})</label>
        <input type="number" v-model.number="editableGoals[index].goal" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProgressBar from "@/components/ProgressBar.vue";

const isEditing = ref(false)
const goals = ref([])
const editableGoals = ref([])

onMounted(() => {
  goals.value = [
    { label: 'Protein', current: 75.7, goal: 150, unit: 'g' },
    { label: 'Carbohydrates', current: 120.9, goal: 250, unit: 'g' },
    { label: 'Fats', current: 17.3, goal: 65, unit: 'g' },
    { label: 'Water', current: 1750.4, goal: 2500, unit: 'ml' }
  ]
  editableGoals.value = goals.value
})

function cancelEdit() {
  editableGoals.value = goals.value
  isEditing.value = false
}

function saveGoals() {
  goals.value = editableGoals.value
  isEditing.value = false
}
</script>

<style scoped>
.goals-section {
  background: white;
  border: 0.1rem solid lightgray;
  border-radius: 1rem;
  padding: 1rem;
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
  font-weight: bold;
  padding: 0.5rem 1rem;
  border: 0.1rem solid lightgray;
  border-radius: 0.5rem;
  background: white;
  cursor: pointer;
  transition: 0.2s;
  font-size: 0.9rem;
}

.btn:hover {
  background: lightgray;
}

.btn.save {
  background: black;
  color: white;
}

.btn.save:hover {
  background: darkslategray;
}

.goals-list, .goals-edit {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 1rem;
}

.goal-card {
  border: 0.1rem solid lightgray;
  border-radius: 1rem;
  padding: 1rem;
  text-align: center;
  background: white;
}

.goal-card h4, .goals-edit label {
  margin-bottom: 0.25rem;
  font-weight: bold;
}

.goal-card p {
  margin: 0.25rem 0;
  font-size: 0.9rem;
}

.remaining {
  color: gray;
}

.goal-card.water, .goal-card.water h4, .goal-card.water p {
  color: deepskyblue;
}

.goal-card.water {
  border-color: deepskyblue;
}

.goal-edit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border: 0.1rem solid lightgray;
  border-radius: 1rem;
}

.goal-edit input {
  width: 4rem;
  padding: 0.25rem;
  border: 0.1rem solid lightgray;
  border-radius: 0.5rem;
  text-align: center;
}
</style>
