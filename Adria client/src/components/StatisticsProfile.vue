<template>
  <section class="goals-section">

    <div class="row">
      <div>
        <h1>Daily Intake Goals</h1>
        <p>Macronutrient targets</p>
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
      <div v-for="item in goals" :key="item.label" class="goal-card">
        <h4>{{ item.label }}</h4>
        <p>{{ item.current }}{{ item.unit }} / {{ item.goal }}{{ item.unit }}</p>
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

const isEditing = ref(false)
const goals = ref([])
const editableGoals = ref([])

onMounted(() => {
  goals.value = [
    { label: 'Protein', current: 75, goal: 150, unit: 'g' },
    { label: 'Carbohydrates', current: 120, goal: 250, unit: 'g' },
    { label: 'Fats', current: 20, goal: 65, unit: 'g' },
    { label: 'Water', current: 1750, goal: 2500, unit: 'ml' }
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
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

h1 {
  font-size: 1.7rem;
  font-weight: bold;
  margin: 0;
}

p {
  font-size: 1rem;
  color: gray;
  margin-top: 0.25rem;
}

.goals-section {
  background: white;
  border: 0.1rem solid lightgray;
  border-radius: 1rem;
  padding: 1rem;
  max-width: 80%;
  margin: auto;
  font-family: system-ui, sans-serif;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.goals-list, .goals-edit {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 1rem;
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
  background: dodgerblue;
  color: white;
}

.btn.save:hover {
  background: blue;
}

.goal-card {
  border: 0.1rem solid lightgray;
  border-radius: 1rem;
  padding: 1rem;
  text-align: center;
  background: white;
}

.goal-card h4 {
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