<template>
  <div class="stroke-magic">
    <component :is="level" v-html="headingText"></component>
    <component :is="level" v-html="headingText"></component>
  </div>
</template>

<script setup>
const props = defineProps({
  headingText: String,
  level: {
    type: String,
    default: 'h2'
  }
})
</script>

<style lang="scss" scoped>
.stroke-magic {
  position: relative;
  h1:first-child {
    -webkit-text-stroke: 16px $black;
    @media (max-width: 500px) { -webkit-text-stroke: 10px $black; }
  }
  h2:first-child {
    -webkit-text-stroke: 8px $black;
  }
  h1 {
    @media (max-width: 800px) { font-size: 5rem; }
    @media (max-width: 500px) { font-size: 4rem; }
  }
  h1:last-child, h2:last-child  {
    width: 100%;
    color: white;
    position: absolute;
    top: 0;
    left: 0;
    :deep(span) {
      color: $blue;
    }
  }
}
</style>