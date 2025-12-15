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
  <div class="checkoutitem">
    <p >{{props.item.title}} x {{props.item.count}}</p>
    <p>€{{(props.item.cost*props.item.count).toFixed(2)}}</p>
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