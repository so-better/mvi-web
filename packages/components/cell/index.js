import cell from './cell'
import cellGroup from './cell-group'

cell.install = Vue => {
    Vue.component(cellGroup.name, cellGroup)
    Vue.component(cell.name, cell)
}

export default cell
