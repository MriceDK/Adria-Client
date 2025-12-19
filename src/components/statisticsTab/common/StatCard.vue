<template>
  <div class="stat-card" :class="color">
    <slot name="header"></slot>
    <slot name="content"></slot>
  </div>
</template>

<script setup>
defineProps({
  color: {
    type: String,
    default: "default"
  }
});
</script>

<style scoped>
.stat-card {
  border: var(--border-default);
  border-radius: 1rem;
  padding: 1.5rem;
  background: var(--gray-bg-color);
}
</style>