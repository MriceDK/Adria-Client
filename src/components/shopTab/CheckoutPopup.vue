<script setup>
import CheckoutItem from './CheckoutItem.vue'
import MainButton from "@/components/utilities/MainButton.vue";
import {createOrder} from "@/services/api/shop.js";
import {USER_ID} from "@/services/api/config.js";
const props = defineProps({
  cartItems: Array,
  cartAmount: Number,
  cartTotal: Number,
});

const emit = defineEmits(['close-checkout']);

function handleConfirmOrder() {
  const toSupplementAmounts = (items) =>
      items.map(item => ({
        supplementId: item.supplementId,
        amount: item.count,
      }));
  createOrder(USER_ID, toSupplementAmounts(props.cartItems)).then(() => {
    emit('close-checkout');
  });
}
</script>

<template>

  <div class="popup">
    <p class="title">Confirm Your Order</p>
    <p class="description">You are about to place an order for {{ cartAmount }} items totaling €{{ cartTotal }}.</p>
    <CheckoutItem v-for="item in props.cartItems" :item="item" />
    <div>
      <MainButton class="checkoutbutton" @click="emit('close-checkout')" :black="true">Cancel</MainButton>
      <MainButton class="checkoutbutton" @click="handleConfirmOrder">Confirm Order</MainButton>
    </div>
  </div>
  <div class="backgroundShadow" @click="emit('close-checkout')"></div>
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
  position: fixed;
  background-color: white;
  padding: 1em;
  border-radius: 1rem;
  width: 35%;
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
.checkoutbutton{
  margin-right: 1rem;
  margin-top: 1rem;
}
</style>
