<script setup>
import { ref } from "vue";

const emit = defineEmits(["search-enter"]);
const value = ref("");
</script>

<template>
  <div class="search-container">
    <div class="search-bar">
      <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
      >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 6.65a7.5 7.5 0 010 10.6z"
        />
      </svg>
      <input
          type="text"
          id="search-bar"
          name="search-bar"
          placeholder="Search for products..."
          v-model="value"
          @input="emit('search-enter', value)"
      />
    </div>
  </div>
</template>

<style scoped>
.search-container {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color:var(--secondary-bg-color);
  border-radius: 50em;
  padding: 0.5rem 1rem;
  width: 100%;
  max-width: 50em;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.search-bar input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  padding-left: 0.5rem;
}

.icon {
  width: 1.5em;
  height: 1.5em;
  color: #888;
}
</style>
