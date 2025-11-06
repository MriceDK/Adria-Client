<script setup>
import CheckoutItem from './CheckoutItem.vue'
const props = defineProps({
  cartItems: Array,
  cartAmount: Number,
  cartTotal: Number,
});
</script>

<template>
  <div class="popup">
    <p>Confirm Your Order</p>
    <p>You are about to order {{cartAmount}} totaling to {{cartTotal}}€</p>
    <CheckoutItem v-for="item in props.cartItems" :item="item"></CheckoutItem>
    <div>
      <button>Cancel</button>
      <button>Confirm Order</button>
    </div>
  </div>
  <div class="backgroundShadow">

  </div>
</template>

<style scoped>
.popup {

}
.backgroundShadow {

}
</style>