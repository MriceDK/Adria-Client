<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
<button @click="$emit('NavigationClick',title)">
  {{ title }}
</button>
</template>

<style scoped>
button {
  padding: 10px 10px;
  border-radius: 50px;
  cursor: pointer;
  border: 0;
  background-color: white;
  box-shadow: rgb(0 0 0 / 5%) 0 0 8px;
  text-transform: uppercase;
  transition: all 0.5s ease;
  width: 25%;
}
</style>