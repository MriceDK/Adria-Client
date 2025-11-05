<script setup>
defineProps({
  image: String,
  title: String,
  description: String,
  cost: Number,
})
</script>

<template>
  <div class="shopitem">
    <!-- image -->
    <img :src="image" alt="" class="image">
    <!-- titel -->
    <p>{{ title }}</p>
    <!-- cost -->
    <p>{{cost}}</p>
    <!-- type -->
    <p>{{description}}</p>
    <!-- button -->
    <button>add to cart</button>
  </div>
</template>

<style scoped>
.shopitem{
  border: 1px solid lightgray;
  width: 30%;
  height: 100%;
  display: inline-block;
  margin: 1% 1% 0 1%;

  }
.image{
  width: 100%;
}
</style>