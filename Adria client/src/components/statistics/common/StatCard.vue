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
})
</script>

<style scoped>
.stat-card {
  border: 0.1rem solid #E5E5E5;
  border-radius: 1rem;
  padding: 1.5rem;
  background: #f8f8f8;
}
</style>