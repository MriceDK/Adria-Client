<script setup>
defineProps({
  image: String,
  item: {
    title: String,
    description: String,
    cost: Number
  }
})
</script>

<template>
  <div class="shopitem">
    <!-- image -->
    <img :src="image" alt="" class="image">
    <div class="info">
      <!-- titel -->
      <p class="title">{{ item.title }}</p>
      <!-- cost -->
      <p class="price">{{item.cost}}</p>
      <!-- type -->
      <p>{{item.description}}</p>
      <!-- button -->
      <button>add to cart</button>
    </div>
  </div>
</template>

<style scoped>
.shopitem{
  border: 1px solid lightgray;
  width: 28%;
  height: 100%;
  display: inline-block;
  margin: 1% 1% 0 1%;
  border-radius: 1rem;
  }
.image{
  width: 100%;
  border-bottom: 1px solid lightgray;
}
.title{
   font-weight: bold;
}
.info{
margin: 1%;
}
</style>