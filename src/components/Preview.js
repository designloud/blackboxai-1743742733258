export default {
  template: `
    <div class="preview-container bg-white h-full overflow-auto p-4">
      <h3 class="text-lg font-semibold mb-4">Preview</h3>
      <div class="preview-content bg-white shadow-lg mx-auto p-8" :style="{ width: '800px' }">
        <div 
          v-for="element in elements"
          :key="element.id"
          class="preview-element mb-4"
          :style="{
            width: element.width || '100%',
            backgroundColor: element.bgColor || 'transparent'
          }"
        >
          <!-- Text Preview -->
          <div 
            v-if="element.type === 'text'"
            :style="{
              color: element.color,
              fontSize: element.fontSize,
              fontFamily: element.fontFamily
            }"
          >
            {{ element.content }}
          </div>

          <!-- Image Preview -->
          <img
            v-else-if="element.type === 'image'"
            :src="element.src"
            class="max-w-full h-auto"
            :style="{ width: element.width }"
          />

          <!-- Button Preview -->
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
    </div>
  `,
  props: {
    elements: {
      type: Array,
      required: true
    }
  }
}