<script setup>
import ShoppingCartItem from './ShoppingCartItem.vue'
import {computed, ref} from "vue";

const props = defineProps({
  cartItems: Array
});
const cartEnabled = ref(false)
const cartTotalPrice = computed(() => {
  return props.cartItems.reduce((total, item) => total + item.cost, 0);
});
const amountOfItems = computed(() => {
  return props.cartItems.reduce((total) => total + 1, 0);
});
function handleOpenCart() {
  cartEnabled.value = !cartEnabled.value
}

</script>

<template>
  <div class="cartIcon" @click="handleOpenCart" v-show="!cartEnabled">
    <img src="../../assets/icons/shopping-cart-outline-svgrepo-com.svg" alt="">
  </div>
  <div v-show="cartEnabled">
      <div class="cartcontainer" >
        <div class="top-row">
          <p>Shopping Cart</p>
          <p @click="cartEnabled = !cartEnabled;">X</p>
        </div>
        <p class="amount"> total items in cart {{amountOfItems}}</p>
        <div class="cartitems">
          <ShoppingCartItem v-for="(item, index) in props.cartItems" :key="index" :item="item" />
        </div>
        <div class="bottom-row">
          <p>total</p>
          <p>{{cartTotalPrice}}</p>
        </div>
      </div>
    <div class="backgroundShadow" @click="cartEnabled = !cartEnabled;">
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
    z-index: 5;
    position: fixed;
    width: 33%;
    height: 100%;
    right: 0;
    top: 0;
    background-color: white;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 98%;
  }

  .bottom-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 98%;
  }

  .cartitems{
    height: 80%;
    overflow-y: scroll;
    border-radius: 8px;
  }
  .backgroundShadow {
    background-color: black;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 50%;
  }
  .amount{
    color: gray;
  }
</style>