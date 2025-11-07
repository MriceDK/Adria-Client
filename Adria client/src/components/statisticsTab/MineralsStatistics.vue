<template>
  <section class="minerals-section">
    <div class="row">
      <div class="header-left">
        <div class="icon-circle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
               stroke-linejoin="round" class="lucide lucide-activity">
            <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path>
          </svg>
        </div>

        <div class="text-block">
          <h2>Minerals</h2>
          <p>Daily mineral intake goals</p>
        </div>
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
.minerals-section {
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
  margin-top: 1rem;
  margin-bottom: 2rem;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icon-circle {
  background-color: #dcfce7;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-circle svg {
  width: 2rem;
  height: 2rem;
  stroke: #22c55e;
}

.text-block h2 {
  font-size: 1.7rem;
  font-weight: bold;
  color: black;
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
  align-items: center;
  gap: 0.5rem;
}

.btn {
  font-weight: bold;
  padding: 0.5rem 1rem;
  border: 0.1rem solid lightgray;
  border-radius: 0.5rem;
  background: white;
  cursor: pointer;
  font-size: 1rem;
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

.minerals-list, .minerals-edit {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(19rem, 1fr));
  gap: 1rem;
}

.mineral-card {
  border: 0.1rem solid #fb2c36;
  border-radius: 1rem;
  padding: 1rem;
  background: #ffe9eb;
}

.mineral-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.mineral-label {
  color: #fb2c36;
  font-weight: bold;
  margin: 0;
}

.mineral-goal {
  color: gray;
  font-size: 0.85rem;
  margin: 0;
}

.mineral-current {
  text-align: left;
  color: #fb2c36;
  font-size: 1rem;
  margin-top: 0.5rem;
}

.mineral-edit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border: 0.1rem solid lightgray;
  border-radius: 1rem;
}

.mineral-edit input {
  width: 4rem;
  padding: 0.25rem;
  border: 0.1rem solid lightgray;
  border-radius: 0.5rem;
  text-align: center;
}
</style>