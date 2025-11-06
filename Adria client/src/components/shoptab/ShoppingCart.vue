<script setup>
import shoppingCartItem from './shoppingCartItem.vue'
import {ref} from "vue";

const cartEnabled = ref(false)
const selectedItems = {
  item: {
    title: "banaan",
    description: "een fruit",
    cost: 5
  },
  item2: {
    title: "banaan",
    description: "een fruit",
    cost: 5
  }};
</script>

<template>
  <div class="cartIcon" @click="cartEnabled = !cartEnabled; console.log(cartEnabled)" v-show="!cartEnabled">
    <img src="../../assets/icons/shopping-cart-outline-svgrepo-com.svg" alt="">
  </div>
  <div class="cartcontainer" v-show="cartEnabled">
    <p>your shoppingcart</p>
    <p @click="cartEnabled = !cartEnabled; console.log(cartEnabled)">close</p>
    <div>
      <shoppingCartItem v-for="item in selectedItems" :item="item" />
    </div>
  </div>
</template>

<style scoped>
  .cartIcon {
    position: fixed;
    width: 4rem;
    height: 4rem;
    right: 1%;
    top: 10%;
    background-color: gray;
    border-radius: 4rem;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cartIcon :hover {
    cursor: pointer;
  }
  .cartIcon img{
    width: 60%;
    height: 60%;
    object-fit: contain;
  }

  .cartcontainer {
    position: fixed;
    width: 33%;
    height: 80%;
    right: 0;
    top: 10%;
    background-color: lightgray;
    border-radius: 1rem 0 0 1rem;
    padding-left: 1rem;
  }
</style>