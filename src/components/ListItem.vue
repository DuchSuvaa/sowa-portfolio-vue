<template>
  <div class="list-item"> 
    <div class="list-item__content" :style="{ backgroundImage: `url(${item.imageUrl})` }">
      <div>
        <input v-if="route.path === '/admin'" v-model="localItem.tech" @change="changesMade = true" >
        <span v-else class="input-tech"> {{ localItem.tech }} </span>
        <input v-if="route.path === '/admin'" v-model="localItem.href" class="input-href" @change="changesMade = true">
        <a :href="localItem.href" v-else class="input-href" target="_blank"> {{ localItem.href }} </a>
      </div>
      <div class="list-item__tools" v-if="route.path === '/admin'">
        <img src="../assets/save.svg" v-if="changesMade" class="save" @click="saveChanges">
        <img src="../assets/delete.svg" @click="showConfirmationBox = true">
      </div>
    </div>
    <div class="list-item__name">
      <input v-if="route.path === '/admin'" v-model="localItem.name" @change="changesMade = true">
      <span v-else> {{ localItem.name }} </span>
    </div>
  </div>
  <ConfirmationBox @confirm="deleteItem" @reject="showConfirmationBox = false" v-if="showConfirmationBox">
      Czy skasować item {{ item.name }}?
  </ConfirmationBox>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from '../pinia/store'
import { useRoute } from 'vue-router'
import ConfirmationBox from '../components/ConfirmationBox.vue'

const props = defineProps([ 'item', 'admin' ])
const emit = defineEmits([ 'removed' ])
const store = useStore()
const changesMade = ref(false)
const showConfirmationBox = ref(false)
const localItem = ref({
  id: props.item.id,
  name: props.item.name,
  tech: props.item.tech,
  href: props.item.href
})

const route = useRoute()

const saveChanges = () => {
  store.updateItem(localItem.value)
  changesMade.value = false
}

const deleteItem = () => {
  try {
    store.deleteItem(props.item.id)
    showConfirmationBox.value = false
    emit('removed', props.item.id )
  } catch (err) {
    store.setError(err)
  }
}

</script>

<style lang="scss" scoped>
.list-item {
  overflow: hidden;
  transition: transform 0.15s ease-in, z-index 0s 0.15s, box-shadow 0.15s;
  box-shadow: $box-shadow;
  z-index: 1;
  input, input:focus {
    color: white;
    border: none;
    outline: none;
    background-color: transparent;
    text-align: center;
    cursor: text;
  }
  .list-item__content {
    background-size: cover;
    aspect-ratio: 1280/800;
    position: relative;
    > div:first-child {
      width: 100%;
      height: 100%;
      padding: 2rem;
      overflow: hidden;
      color: white;
      opacity: 0;
      transition: opacity 0.6s ease-in, background-color 0.6s;
      @include flex-center;
      flex-direction: column;
      gap: 2rem;
      .input-tech {
        font-size: 1.6rem;
      }
      .input-href {
        border: 1px solid white;
        border-radius: 0.5rem;
        padding: 0.8rem 2.5rem;
        font-weight: bold;
        font-size: 1.2rem;
        color: white;
        visibility: hidden;
        &:hover, &:focus {
          color: $black;
          background-color: white;
        }
      }
    }
    .list-item__tools {
      position: absolute;
      bottom: 0;
      right: 0;
      background-color: transparent !important;
      padding: 0.5rem;
      display: none;
      flex-direction: row;
      img {
        display: block;
        &:hover {
          filter: invert(51%) sepia(46%) saturate(7024%) hue-rotate(334deg) brightness(102%) contrast(109%);
          cursor: pointer;
        }
        &.save {
          filter: invert(44%) sepia(94%) saturate(696%) hue-rotate(79deg) brightness(97%) contrast(87%);
        }
      }
    }
  }
  .list-item__name {
    background-color: white;
    padding: 0.5rem 1rem;
    position: relative;
    input, span {
      display: block;
      width: 100%;
      text-align: center;
      font-size: 1.4rem;
      color: $black;
      font-weight: bold;
    }
  }
  &:hover {
    transform: scale(1.2);
    z-index: 2;
    box-shadow: 0 0 10px rgba(0,0,0, .4);
    transition: transform 0.3s ease-in, box-shadow 0.3s;
    .list-item__content {
      > div:first-child {
        opacity: 1;
        background-color: rgba(0,0,0, 0.7);
        transition: opacity 0.6s ease-in;
        .input-href {
          visibility: visible;
          transition: visibility 0.3s 0.3s;
        }
      }
      .list-item__tools {
        display: flex;
      }
    }
  }
  // firefox
  &:has(input:focus) {
    transform: scale(1.15);
    .list-item__content {
      > div {
        opacity: 1;
        background-color: rgba(0,0,0, 0.7);
      }
    }
  }
}
</style>