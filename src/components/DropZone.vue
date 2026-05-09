<template>
  <div class="form__dropzone" 
    @dragenter.prevent="toggleActive" 
    @dragleave="toggleActive" 
    @dragover.prevent 
    @drop.prevent="toggleActive"
    :class="{ 'dropzone-active': dropzoneActive }"
  >
    <span>Przeciągnij plik, lub</span>
    <label for="item-image">Wybierz</label>
    <input type="file" id="item-image" accept="image/jpeg, image/png" @change="handleChange">
    <span v-if="file">{{ file.name }}</span>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits([ 'file' ])
const dropzoneActive = ref(false)

const toggleActive = () => { dropzoneActive.value = !dropzoneActive.value }

const handleChange = async (e) => {
  if (e.target.files[0]) {
    emit('fileChange', e.target.files[0])
  } else {
    emit('fileChange', null)
  }
}

</script>

<style lang="scss" scoped>
.form__dropzone {
  width: 100%;
  border: 2px dashed $blue;
  border-radius: 5px;
  @include flex-center;
  flex-direction: column;
  gap: 2rem;
  margin: 2rem auto;
  height: 17rem;
  font-size: 1.4rem;
  label {
    border: 2px solid $blue;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    background-color: $blue;
    color: white;
    text-transform: lowercase;
    font-weight: bold;
    cursor: pointer;
  }
  input {
    display: none;
  }
}
.dropzone-active {
  background-color: $blue;
  color: white;
  label {
    background-color: white;
    color: $blue;
  }
}
</style>