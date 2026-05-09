<template>
  <div class="list-item" id="add-item" @click="addBoxActive = !addBoxActive">
    <svg width="64" height="64" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 17q.425 0 .713-.288Q13 16.425 13 16v-3h3.025q.425 0 .7-.288Q17 12.425 17 12t-.288-.713Q16.425 11 16 11h-3V7.975q0-.425-.287-.7Q12.425 7 12 7t-.712.287Q11 7.575 11 8v3H7.975q-.425 0-.7.287Q7 11.575 7 12t.287.712Q7.575 13 8 13h3v3.025q0 .425.288.7q.287.275.712.275Zm0 5q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"/>
    </svg>
  </div>
  <div class="add-item-backdrop" v-if="addBoxActive" @click="addBoxActive = false">
    <form @submit.prevent="addItem" @click.stop>
      <div class="form__field">
        <label for="item-name">Nazwa</label>
        <input type="text" id="item-name" v-model="newItem.name">
      </div>
      <div class="form__field">
        <label for="item-tech">Tech</label>
        <input type="text" id="item-tech" v-model="newItem.tech">
      </div>
      <div class="form__field">
        <label for="item-href">Href</label>
        <input type="text" id="item-href" v-model="newItem.href">
      </div>
      <DropZone @drop.prevent="drop" @fileChange="handleChange" />
      <img v-if="file" :src="temporaryURL" class="temporaryIMG">
      {{ temporaryUrl }}
      <button :disabled="disabled || !newItem.name.length || !newItem.tech.length || !newItem.href.length">submit</button>
      <img src="../assets/close.svg" @click="addBoxActive = !addBoxActive" class="close-icon">
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from '../pinia/store'
import DropZone from '../components/DropZone.vue'

const store = useStore()
const file = ref(null)
const newItem = ref({
  name: '',
  tech: '',
  href: '',
  order: null
})
const addBoxActive = ref(false)
const disabled = ref(true)
const temporaryURL = ref(null)

const handleChange = async (payload) => {
  temporaryURL.value = []
  if (payload) {
    file.value = payload
    temporaryURL.value = URL.createObjectURL(file.value)
    disabled.value = false
  } else {
    file.value = null
  }
}

const drop = (e) => {
  temporaryURL.value = []
  file.value = e.dataTransfer.files[0]
  temporaryURL.value = URL.createObjectURL(file.value)
  disabled.value = false
}

const addItem = async () => {
  disabled.value = true
  const downloadUrl = await store.storeImage(file.value)
  await store.addItem(newItem.value, downloadUrl)
  addBoxActive.value = false
  disabled.value = false
}
</script>

<style lang="scss" scoped>
.list-item {
  aspect-ratio: 1280/920;
  box-shadow: $box-shadow;
}
#add-item {
  @include flex-center;
  &:hover {
    svg path {
      fill: $blue !important;
    }
  }
  svg {
    path {
      fill: #ccc;
    }
  }
}
#add-item {
  cursor: pointer;
}
.add-item-backdrop {
  @include backdrop;
  z-index: 2;
  form {
    max-width: 36rem;
    background-color: white;
    padding: 2rem;
    @include flex-center;
    flex-direction: column;
    border: 1px solid transparent;
    border-radius: 5px;
    position: relative;
    .form__field {
      width: 100%;
      padding: 1rem;
      @include flex-space-between;
      flex-direction: row;
      column-gap: 2rem;
      input {
        border: none;
        border-bottom: 1px solid $black;
        padding: 0.5rem 0;
        &:focus {
          outline: none;
        }
      }
    }
    .temporaryIMG {
      width: 100%;
      margin-bottom: 2rem;
      object-fit: cover;
      object-position: top;
      aspect-ratio: 1280/800;
    }
    .close-icon {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      cursor: pointer;
    }
  }
}

button[disabled] {
  color: #ddd;
  &:hover {
    border-color: transparent;
  }
}
</style>