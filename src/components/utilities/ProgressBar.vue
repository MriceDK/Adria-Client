<template>
  <div class="progress-bar">
    <div
        class="progress-fill"
        :style="{
        width: bar + '%',
        background: color || defaultColor
      }"
    ></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: { type: Number, required: true },
  max: { type: Number, required: true },
  color: { type: String, required: false }
})

const bar = computed(() => Math.min((props.value / props.max) * 100, 100))
const defaultColor = 'var(--progress-bar-default-color)'
</script>

<style scoped>
.progress-bar {
  width: 100%;
  height: 0.5rem;
  background: var(--progress-bar-bg-color);
  border-radius: 1rem;
}

.progress-fill {
  height: 100%;
  border-radius: 1rem;
}
</style>
