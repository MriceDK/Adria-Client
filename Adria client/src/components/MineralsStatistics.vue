<template>
  <section class="minerals-section">
    <div class="row">
      <div>
        <h2>Minerals</h2>
        <p>Daily mineral intake goals</p>
      </div>
      <div class="actions">
        <button v-if="!isEditingMinerals" @click="isEditingMinerals = true" class="btn">Edit</button>
        <template v-else>
          <button @click="cancelEdit" class="btn cancel">Cancel</button>
          <button @click="saveMinerals" class="btn save">Save</button>
        </template>
      </div>
    </div>


    <div v-if="!isEditingMinerals" class="minerals-list">
      <div v-for="item in minerals" :key="item.label" class="mineral-card">
        <div class="mineral-top">
          <h4 class="mineral-label">{{ item.label }}</h4>
          <p class="mineral-goal">{{ item.goal }}{{ item.unit }} goal</p>
        </div>
        <div class="mineral-current">
          {{ item.current }}{{ item.unit }}
        </div>
      </div>
    </div>

    <div v-else class="minerals-edit">
      <div v-for="(mineral, i) in editableMinerals" :key="mineral.label" class="mineral-edit">
        <label>{{ mineral.label }} ({{ mineral.unit }})</label>
        <input v-model.number="editableMinerals[i].goal" type="number" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isEditingMinerals = ref(false)
const minerals = ref([])
const editableMinerals = ref([])

function loadData() {
  minerals.value = [
    { label: 'Calcium', current: 800, goal: 1000, unit: 'mg' },
    { label: 'Iron', current: 15, goal: 18, unit: 'mg' },
    { label: 'Magnesium', current: 350, goal: 400, unit: 'mg' },
    { label: 'Phosphorus', current: 650, goal: 700, unit: 'mg' },
    { label: 'Potassium', current: 3200, goal: 3500, unit: 'mg' },
    { label: 'Sodium', current: 2500, goal: 2300, unit: 'mg' },
    { label: 'Zinc', current: 9, goal: 11, unit: 'mg' },
    { label: 'Copper', current: 0.8, goal: 0.9, unit: 'mg' },
    { label: 'Manganese', current: 2, goal: 2.3, unit: 'mg' },
    { label: 'Selenium', current: 50, goal: 55, unit: 'μg' },
    { label: 'Iodine', current: 140, goal: 150, unit: 'μg' }
  ]
  editableMinerals.value = minerals.value
}

function cancelEdit() {
  editableMinerals.value = minerals.value
  isEditingMinerals.value = false
}

function saveMinerals() {
  minerals.value = editableMinerals.value
  isEditingMinerals.value = false
}

onMounted(loadData)
</script>

<style scoped>

</style>
