<script setup>
const props = defineProps({
  item: {
    SupplementId: String,
    title: String,
    description: String,
    cost: Number,
    count: Number
  }
});
</script>

<template>
  <p >{{props.item.title}} x {{props.item.count}}</p>
  <p>{{props.item.cost*props.item.count}}</p>
</template>

<style scoped>

</style>