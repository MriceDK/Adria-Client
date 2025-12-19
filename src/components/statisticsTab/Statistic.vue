<script setup>
import ProgressBar from "@/components/utilities/ProgressBar.vue";
const props = defineProps({
  isEditing: Boolean,
  item: {
    label: String,
    current: Number,
    goal: Number,
    unit: String,
  },
  index: Number,
  useProgressBar: Boolean,
});
</script>

<template>
  <div class="goal-card">
    <div v-if="!props.isEditing">
      <h4>{{ props.item.label }}</h4>
      <p>
        {{ Number(props.item.current).toFixed(1) }}{{ props.item.unit }}
        /
        {{ Number(props.item.goal).toFixed(1) }}{{ props.item.unit }}
      </p>

      <ProgressBar v-if="props.useProgressBar"
                   :value="props.item.current"
                   :max="props.item.goal"
                   :color="props.item.label === 'Water' ? 'linear-gradient(90deg, #60a5fa, #3b82f6)' : null"/>

      <p class="remaining" v-if="props.item.goal - props.item.current > 0">
        {{ (props.item.goal - props.item.current).toFixed(1) }}{{ props.item.unit }} remaining
      </p>
      <p class="remaining goal-reached" v-else>Goal reached!</p>
    </div>

    <div v-else class="goal-edit">
      <label>{{ props.item.label }} ({{ props.item.unit }})</label>
      <input type="number" v-model.number="props.item.goal" />
    </div>
  </div>
</template>

<style scoped>
.goal-card {
  border: var(--border-default);
  border-radius: 1rem;
  padding: 1rem;
  text-align: center;
  background: var(--main-bg-color);
}

.goal-card h4, .goal-edit label {
  margin-bottom: 0.25rem;
  font-weight: bold;
}

.goal-card p {
  margin: 0.25rem 0;
  font-size: 0.9rem;
}

.goal-edit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;

}

.goal-edit input {
  width: 4rem;
  padding: 0.25rem;
  border: var(--border-default);
  border-radius: 0.5rem;
  text-align: center;
}

.remaining {
  color: var(--main-text-color);
}

/*noinspection CssUnusedSymbol*/
.goal-card.water, .goal-card.water h4, .goal-card.water p {
  color: var(--main-light-blue-color);
}

/*noinspection CssUnusedSymbol*/
.goal-card.water {
  border-color: var(--main-light-blue-color);
}
</style>