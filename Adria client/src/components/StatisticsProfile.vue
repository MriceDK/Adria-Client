<template>
  <section class="goals-section">

    <div>
      <h1>Daily Intake Goals</h1>
      <p>Macronutrient targets</p>
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

</style>
