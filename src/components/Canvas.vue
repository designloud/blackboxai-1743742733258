<template>
  <div 
    class="canvas bg-gray-50 h-full relative overflow-hidden"
    ref="canvas"
    @dragover.prevent
    @drop="handleDrop"
  >
    <div
      v-for="element in elements"
      :key="element.id"
      class="element absolute border-2 border-transparent hover:border-blue-300 transition-all"
      :style="{
        transform: `translate(${element.x}px, ${element.y}px)`,
        width: element.width || 'auto',
        zIndex: element.zIndex,
        backgroundColor: element.bgColor || 'transparent'
      }"
      @mousedown="selectElement(element)"
      @mousemove="handleDrag(element, $event)"
      @mouseup="stopDrag"
    >
      <!-- Text Element -->
      <div 
        v-if="element.type === 'text'"
        class="p-2"
        :style="{
          color: element.color,
          fontSize: element.fontSize,
          fontFamily: element.fontFamily
        }"
      >
        {{ element.content }}
      </div>

      <!-- Image Element -->
      <img
        v-else-if="element.type === 'image'"
        :src="element.src"
        class="max-w-full h-auto"
        :style="{ width: element.width }"
      />

      <!-- Button Element -->
      <button
        v-else-if="element.type === 'button'"
        class="px-4 py-2 rounded"
        :style="{
          backgroundColor: element.bgColor,
          color: element.textColor
        }"
      >
        {{ element.text }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    elements: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isDragging: false,
      startX: 0,
      startY: 0,
      currentElement: null
    }
  },
  methods: {
    handleDrop(event) {
      const elementData = JSON.parse(event.dataTransfer.getData('text/plain'))
      this.$emit('add-element', elementData)
    },
    selectElement(element) {
      this.$emit('select-element', element)
      this.currentElement = element
      this.isDragging = true
      this.startX = event.clientX - element.x
      this.startY = event.clientY - element.y
    },
    handleDrag(element, event) {
      if (!this.isDragging) return
      element.x = event.clientX - this.startX
      element.y = event.clientY - this.startY
      this.$emit('update-position', {
        id: element.id,
        x: element.x,
        y: element.y
      })
    },
    stopDrag() {
      this.isDragging = false
    }
  }
}
</script>

<style scoped>
.canvas {
  min-height: calc(100vh - 4rem);
}
.element {
  cursor: move;
  user-select: none;
}
</style>