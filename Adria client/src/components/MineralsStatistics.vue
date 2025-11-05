<template>
  <section class="minerals-section">
    <div class="row">
      <div>
        <h2>Minerals</h2>
        <p>Daily mineral intake goals</p>
      </div>
      <div class="actions">
        <button v-if="!isEditingMinerals" @click="isEditingMinerals = true" class="btn">Edit</button>
        <template v-else>
          <button @click="cancelEdit" class="btn cancel">Cancel</button>
          <button @click="saveMinerals" class="btn save">Save</button>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>

</script>

<style scoped>

</style>
