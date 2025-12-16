<script setup>
import ShoppingCartItem from './ShoppingCartItem.vue'
import {computed, ref} from "vue";
import CheckoutPopup from "./CheckoutPopup.vue";
import MainButton from "@/components/utilities/MainButton.vue";

const props = defineProps({
  cartItems: [
    {
      image: String,
      item: {
        SupplementId: String,
        title: String,
        description: String,
        cost: Number,
        count: Number
      },
    }
  ]
});
const emit = defineEmits(["clear-cart", "update-amount"]);

const cartEnabled = ref(false)
const checkoutEnable = ref(false)


const cartTotalPrice = computed(() => {
  return props.cartItems.reduce((total, item) => total + item.cost * item.count, 0).toFixed(2);
});
const amountOfItems = computed(() => {
  return props.cartItems.reduce((total, item) => total + (item.count || 0), 0);
});

function handleOpenCart() {
  cartEnabled.value = !cartEnabled.value
}

function handleChangeAmount(SupplementObject) {
  emit("update-amount", SupplementObject);
}

</script>

<template>
  <img src="../../assets/icons/shopping-cart-outline-svgrepo-com.svg" alt="Shopping Cart" class="cartIcon" @click="handleOpenCart" v-show="!cartEnabled">
  <div v-show="cartEnabled">
    <div class="cartcontainer">
      <div class="top-row">
        <p>Shopping Cart</p>
        <p @click="cartEnabled = !cartEnabled;" class="close-button">X</p>
      </div>
      <p class="amount"> total items in cart {{ amountOfItems }}</p>
      <div class="cartitems">
        <ShoppingCartItem
            v-for="(item) in props.cartItems"
            :key="item.SupplementId"
            :item="item"
            @update-amount="handleChangeAmount"/>
      </div>
      <div class="bottom-row">
        <p>total</p>
        <p>€{{ cartTotalPrice }}</p>
      </div>
      <div class="bottom-row">
        <main-button :black="true" @click="$emit('clear-cart')" class="cartbutton">clear cart</main-button>
        <main-button class="cartbutton" @click="checkoutEnable =! checkoutEnable">checkout</main-button>
      </div>
    </div>
    <div class="backgroundShadow" @click="cartEnabled = !cartEnabled">
    </div>
  </div>
  <CheckoutPopup v-if="checkoutEnable" :cart-items="cartItems" :cart-total="cartTotalPrice" :cart-amount="amountOfItems"
                 @close-checkout="checkoutEnable = false"></CheckoutPopup>
</template>

<style scoped>
.cartIcon {
  position: sticky;
  float: right;
  margin-right: .25%;
  top: 10%;
  z-index: 4;

  width: 3%;
  height: 3%;
  border: 2px solid var(--secondary-bg-color);
  border-radius: 0.35rem;
  box-shadow: 0.1rem 0.1rem 0.1rem var(--secondary-bg-color);
  padding: 0.25rem;
}

.cartIcon-pointer :hover {
  cursor: pointer;
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
  width: 96%;
  padding-left: 1rem;
  padding-right: 1rem;
}

.cartitems {
  height: 75%;
  overflow-y: scroll;
  border-radius: 8px;
  border-bottom: 1px solid lightgray;
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

.amount {
  color: gray;
}

.cartbutton {
  width: 49%;
  height: 2.5rem;
}

.close-button:hover {
  cursor: pointer;
}
</style>