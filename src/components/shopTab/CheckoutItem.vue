<script setup>
const props = defineProps({
  item: {
    supplementId: String,
    name: String,
    type: String,
    cost: Number,
    count: Number
  }
});
</script>

<template>
  <div class="checkoutitem">
    <p >{{props.item.name}} x {{props.item.count}}</p>
    <p>€{{(props.item.price*props.item.count).toFixed(2)}}</p>
  </div></template>

<style scoped>
.checkoutitem{
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: gray;
}
.checkoutitem p{
  margin:0.25rem;
}
</style>