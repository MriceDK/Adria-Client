<template>
  <section class="goals-section">

    <div>
      <h1>Daily Intake Goals</h1>
      <p>Macronutrient targets</p>
      <div class="actions">
        <button v-if="!isEditing" @click="isEditing = true" class="btn">Change Goals</button>

        <template v-else>
          <button class="btn cancel">Cancel</button>
          <button class="btn save">Save</button>
        </template>
      </div>
    </div>

  </section>
</template>

<script setup>
import { ref} from 'vue'

const isEditing = ref(false)
</script>

<style scoped>

</style>
