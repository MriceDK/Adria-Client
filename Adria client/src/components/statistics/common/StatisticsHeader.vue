<template>
  <div class="row">
    <div class="header-left">
      <div class="icon-circle" :class="iconClass">
        <slot name="icon"></slot>
      </div>
      <div class="text-block">
        <h2>{{ title }}</h2>
        <p>{{ subtitle }}</p>
      </div>
    </div>
    <div class="actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  subtitle: String,
  iconClass: String
})
</script>
