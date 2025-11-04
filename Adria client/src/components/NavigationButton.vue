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
}
</style>