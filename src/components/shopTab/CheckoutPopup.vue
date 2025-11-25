<script setup>
import CheckoutItem from './CheckoutItem.vue'
const props = defineProps({
  cartItems: Array,
  cartAmount: Number,
  cartTotal: Number,
});

const emit = defineEmits(['close-checkout']);
</script>

<template>
  <div class="popup">
    <p class="title">Confirm Your Order</p>
    <p class="description">You are about to place an order for {{ cartAmount }} items totaling €{{ cartTotal }}.</p>
    <CheckoutItem v-for="item in props.cartItems" :item="item" />
    <div class="bottom-row">
      <button @click="emit('close-checkout')">Cancel</button>
      <button>Confirm Order</button>
    </div>
  </div>
  <div class="backgroundShadow" @click="emit('close-checkout')">
  </div>
</template>

<style scoped>
.backgroundShadow {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.5;
  z-index: 6;
}

.popup {
  background-color: white;
  padding: 1em;
  border-radius: 1rem;
  width: 35%;
  position: absolute;
  z-index: 7;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.title{
  font-weight: bold;
  margin-bottom: 0;
}
.description{
  color: gray;
  margin-top: 0.25rem;
}
.bottom-row {
  /*style for buttons are component not yet on this branch*/
}
</style>
