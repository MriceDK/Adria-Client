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
.stat-card.red {
  border-color: #fb2c36;
  background: #ffe9eb;
}
.stat-card.blue {
  border-color: #D5E5FF;
  background: #f5f7ff;
}
.stat-card.green {
  border-color: #22c55e;
  background: #dcfce7;
}
</style>
