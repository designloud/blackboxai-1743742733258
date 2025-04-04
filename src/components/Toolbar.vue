<template>
  <div class="toolbar bg-white border-b p-3 flex items-center justify-between">
    <div v-if="selectedElement" class="flex-1 flex items-center space-x-4">
      <!-- Text Properties -->
      <div v-if="selectedElement.type === 'text'" class="flex items-center space-x-2">
        <input 
          type="text" 
          v-model="selectedElement.content" 
          class="px-2 py-1 border rounded"
          @input="updateElement"
        >
        <input 
          type="color" 
          v-model="selectedElement.color" 
          @change="updateElement"
        >
        <select 
          v-model="selectedElement.fontSize" 
          class="px-2 py-1 border rounded"
          @change="updateElement"
        >
          <option value="12px">Small</option>
          <option value="16px">Medium</option>
          <option value="24px">Large</option>
          <option value="32px">X-Large</option>
        </select>
      </div>

      <!-- Image Properties -->
      <div v-if="selectedElement.type === 'image'" class="flex items-center space-x-2">
        <input 
          type="text" 
          v-model="selectedElement.src" 
          placeholder="Image URL"
          class="px-2 py-1 border rounded flex-1"
          @input="updateElement"
        >
        <input 
          type="text" 
          v-model="selectedElement.width" 
          placeholder="Width (px)"
          class="px-2 py-1 border rounded w-20"
          @input="updateElement"
        >
      </div>

      <!-- Button Properties -->
      <div v-if="selectedElement.type === 'button'" class="flex items-center space-x-2">
        <input 
          type="text" 
          v-model="selectedElement.text" 
          class="px-2 py-1 border rounded"
          @input="updateElement"
        >
        <input 
          type="color" 
          v-model="selectedElement.bgColor" 
          @change="updateElement"
        >
        <input 
          type="color" 
          v-model="selectedElement.textColor" 
          @change="updateElement"
        >
      </div>
    </div>
    <div v-else class="text-gray-500">
      Select an element to edit
    </div>

    <div class="flex space-x-2">
      <button 
        @click="$emit('export-json')"
        class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        <i class="fas fa-file-export mr-1"></i> Export JSON
      </button>
      <button 
        @click="$emit('export-image')"
        class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
      >
        <i class="fas fa-image mr-1"></i> Export Image
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedElement: {
      type: Object,
      default: null
    }
  },
  methods: {
    updateElement() {
      this.$emit('update-element', this.selectedElement)
    }
  }
}
</script>

<style scoped>
.toolbar {
  min-height: 60px;
}
</style>