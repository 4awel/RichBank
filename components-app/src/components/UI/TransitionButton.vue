<script>
export default {
  name: 'transition-button'
}
</script>

<template>
  <button class="btn-item-sb">
    <slot></slot>
  </button>
</template>

<style scoped>
.btn-item-sb {
  padding: 8px 16px;
  font-size: 24px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-item-sb:hover {
  background-color: rgb(83, 177, 125);
  box-shadow: 0px 0.5px 10px rgb(62, 126, 91);
}
</style>