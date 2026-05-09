<template>
<div class="backdrop" @click="emit('reject')">
  <div class="confirmation_box" @click.stop>
    <span>
      <slot></slot>
    </span>
    <div class="confirmation_buttons">
      <button @click="emit('reject')">Nie</button>
      <button @click="emit('confirm')">Tak</button>
    </div>
  </div>
</div>
</template>

<script setup>
const emit = defineEmits(['confirm', 'reject'])

</script>

<style scoped lang="scss">
.backdrop {
  @include backdrop;
  z-index: 2;
  .confirmation_box {
    width: 50rem;
    height: 20rem;
    background-color: white;
    font-size: 2.2rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 2rem;
    padding: 2rem;
    box-sizing: border-box;
    border: 1px solid transparent;
    border-radius: 3px;
    span {
      grid-column: 1/5;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .confirmation_buttons {
      grid-column: 1/5;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      column-gap: 2rem;
      button {
        cursor: pointer;
      }
    }
  }
}
</style>