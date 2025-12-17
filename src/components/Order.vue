<script setup>
const props = defineProps({
  order : {
    adrianId : String,
    date : Date,
    orderId : String,
    supplements : [
      {
        supplementId : String,
        name : String,
        type : String,
        price : Number,
        amount : Number
      }
    ],
    totalPrice : Number
  }
});
</script>

<template>
  <div class="order">
    <p class="order-id"> {{ props.order.orderId }}</p>
    <p class="order-date"> {{ new Date(props.order.date).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) }}</p>
    <div class="supplement-list">
      <div v-for="supplement in props.order.supplements" :key="supplement.supplementId" class="supplement-item">
        <div class="left-info">
          <p class="supplement-name">{{ supplement.name }}</p>
          <p class="supplement-qty">Qty: {{ supplement.amount }}</p>
        </div>
        <p class="supplement-price">€{{ (supplement.price * supplement.amount).toFixed(2) }}</p>
      </div>
    </div>
    <div class="order-total">
      <p class="total-label">Total:</p>
      <p class="total-amount">€{{ props.order.totalPrice.toFixed(2) }}</p>
    </div>
  </div>
</template>

<style scoped>

.order {
  border: 1px solid var(--secondary-bg-color);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: var(--main-bg-color);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  width: 80%;
}

.order-id{
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
}

.order-date {
  font-size: 0.9rem;
  color: var(--secondary-text-color);
  margin: 0;
}

.supplement-item {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--secondary-bg-color);
}

.supplement-name {
  font-weight: 600;
  margin: 0;
}
.supplement-qty {
  font-size: 0.9rem;
  color: var(--secondary-text-color);
  margin: 0;
}

.supplement-price {
  color: var(--main-green-color);
  margin: 0;
}
.order-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.5rem;
  font-weight: 600;
}

.total-label {
  margin: 0;
}
.total-amount {
  font-weight: 700;
  color: var(--main-green-color);
  margin: 0;
}
</style>
