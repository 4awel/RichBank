<script>
export default {
  name: 'delete-button'
}
</script>

<template>
  <button type="submit" class="delete-btn">
      <slot></slot>
  </button>
</template>

<style scoped>
.delete-btn {
  color: #fff;
  padding: 10px;
  margin: 20px 0 0 0;
  background-color: #e03131d2;
  border-radius: 20px;
  border: none;
}

.delete-btn:hover {
  transition: all 500ms;
  background-color: #a82d2dd2;
}
</style>