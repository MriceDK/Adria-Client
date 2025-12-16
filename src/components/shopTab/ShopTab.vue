<script setup>
import ShopContainer from "/src/components/shopTab/ShopContainer.vue";
import ShoppingCart from "/src/components/shopTab/ShoppingCart.vue";
import {ref} from "vue";
import SearchBar from "@/components/utilities/SearchBar.vue";
import MainButton from "@/components/utilities/MainButton.vue";
const cartItems = ref([]);
const searchValue = ref("");

const displayPopup = ref(false);
const itemIndexToDelete = ref(null);


function handleAddToCart(item) {
  let found = false;
  for (let currentItem of cartItems.value) {
    if (currentItem.SupplementId === item.SupplementId) {
      currentItem.count++;
      found = true;
    }
  }
  if (!found) {
    item.count = 1;
    cartItems.value.push(item);
  }
}

function openPopup(index) {
  displayPopup.value = true;
  itemIndexToDelete.value = index;
}

function closePopup() {
  displayPopup.value = false;
  itemIndexToDelete.value = null;
}

function confirmDelete() {
  if (itemIndexToDelete.value !== null) {
    cartItems.value.splice(itemIndexToDelete.value, 1);
  }
  closePopup();
}

function handleUpdateAmount({SupplementId, newAmount}) {
  for (let i = 0; i < cartItems.value.length; i++) {

    if (cartItems.value[i].SupplementId === SupplementId) {
      if (newAmount <= 0) {
        openPopup(i);
      } else {
        cartItems.value[i].count = newAmount;
      }
    }
  }
}

function handleSearch(input) {
  searchValue.value = input;
}
function handleClear() {
  cartItems.value = [];
}
</script>

<template>
  <ShoppingCart @clear-cart="handleClear" @update-amount="handleUpdateAmount" :cart-items="cartItems" />
  <search-bar @search-enter="handleSearch" />
  <ShopContainer @add-to-cart="handleAddToCart" :search-input="searchValue" />
  <div class="confirmation popup" v-if="displayPopup">
    <p>Are you sure you want to delete this item?</p>
    <div class="button-row">
      <main-button :black="false" @click="closePopup">Cancel</main-button>
      <main-button :black="true" @click="confirmDelete">Confirm</main-button>
    </div>
  </div>
</template>

<style scoped>

.confirmation.popup {
  display: flex;
  flex-flow: column nowrap;
  font-family: var(--main-font-family), sans-serif;
  position: fixed;
  z-index: 15;
  gap: 0.5rem;
  background-color: var(--main-bg-color);
  padding: 1.25rem;
  border: solid 0.1rem var(--secondary-bg-color);
  border-radius: 1rem;
  top: 35%;
  left: 37.5%;
}

.confirmation.popup p {
  font-size: 1rem;
  text-align: center;
  margin-left: 0.25rem;
}

.button-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 98%;
}
</style>
