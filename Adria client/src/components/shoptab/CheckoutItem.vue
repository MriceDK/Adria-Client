<script setup>
const props = defineProps({
  item:{
    name: Number,
    price: Number,
    amount: Number
  }
});
</script>

<template>
  <p >{{props.item.title}} x {{props.item.amount}}</p>
  <p>{{props.item.price*props.item.amount}}</p>
</template>

<style scoped>

</style>