import Sidebar from './components/Sidebar.js'
import CanvasArea from './components/Canvas.js'
import Toolbar from './components/Toolbar.js'
import Preview from './components/Preview.js'

export default {
  components: {
    Sidebar,
    CanvasArea,
    Toolbar,
    Preview
  },
  template: `
    <div class="app-container flex h-screen">
      <sidebar :elements="elements" @add-element="addElement" />
      
      <div class="flex-1 flex flex-col">
        <toolbar 
          :selected-element="selectedElement" 
          @update-element="updateElement"
          @export-json="exportAsJson"
          @export-image="exportAsImage"
        />
        
        <canvas-area 
          :elements="canvasElements" 
          @select-element="selectElement"
          @update-position="updateElementPosition"
          class="flex-1 overflow-auto"
        />
      </div>
      
      <preview :elements="canvasElements" class="w-1/4 border-l" />
    </div>
  `,
  data() {
    return {
      elements: [
        { id: 1, type: 'text', name: 'Heading', icon: 'fa-heading', default: { content: 'New Heading', fontSize: '24px', color: '#000000' }},
        { id: 2, type: 'text', name: 'Paragraph', icon: 'fa-paragraph', default: { content: 'Lorem ipsum...', fontSize: '16px', color: '#333333' }},
        { id: 3, type: 'image', name: 'Image', icon: 'fa-image', default: { src: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg', width: '300px' }},
        { id: 4, type: 'button', name: 'Button', icon: 'fa-square', default: { text: 'Click Me', bgColor: '#3B82F6', textColor: '#FFFFFF' }}
      ],
      canvasElements: [],
      selectedElement: null
    }
  },
  methods: {
    addElement(element) {
      const newElement = {
        ...JSON.parse(JSON.stringify(element.default)),
        id: Date.now(),
        type: element.type,
        x: 100,
        y: 100,
        zIndex: this.canvasElements.length
      }
      this.canvasElements.push(newElement)
      this.selectElement(newElement)
    },
    selectElement(element) {
      this.selectedElement = element
    },
    updateElement(updatedProps) {
      Object.assign(this.selectedElement, updatedProps)
    },
    updateElementPosition({id, x, y}) {
      const element = this.canvasElements.find(el => el.id === id)
      if (element) {
        element.x = x
        element.y = y
      }
    },
    exportAsJson() {
      const dataStr = JSON.stringify(this.canvasElements)
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
      const link = document.createElement('a')
      link.href = dataUri
      link.download = 'page-design.json'
      link.click()
    },
    exportAsImage() {
      html2canvas(this.$refs.canvas).then(canvas => {
        const link = document.createElement('a')
        link.href = canvas.toDataURL('image/png')
        link.download = 'page-design.png'
        link.click()
      })
    }
  }
}