export default {
  template: `
    <div class="sidebar w-64 bg-white h-full border-r shadow-sm">
      <div class="p-4 border-b">
        <h2 class="text-lg font-semibold">Elements</h2>
      </div>
      <div class="p-4 space-y-3">
        <div 
          v-for="element in elements" 
          :key="element.id"
          class="element-item p-3 border rounded-lg cursor-move hover:bg-gray-50 transition-colors"
          draggable="true"
          @dragstart="dragStart(element)"
        >
          <div class="flex items-center space-x-3">
            <i :class="['fas', element.icon, 'text-gray-500']"></i>
            <span>{{ element.name }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  props: {
    elements: {
      type: Array,
      required: true
    }
  },
  methods: {
    dragStart(element) {
      this.$emit('add-element', element)
      event.dataTransfer.setData('text/plain', JSON.stringify(element))
    }
  }
}