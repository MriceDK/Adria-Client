<template>
  <div class="progress-bar">
    <div class="progress-fill" :style="{ width: bar + '%' }"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: { type: Number, required: true },
  max: { type: Number, required: true }
})

const bar = computed(() => Math.min((props.value / props.max) * 100, 100))
</script>

<style scoped>

.progress-bar {
  width: 100%;
  height: 0.5rem;
  background: lightgray;
  border-radius: 1rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, darkgray, dimgray);
  border-radius: 1rem;
}

</style>
