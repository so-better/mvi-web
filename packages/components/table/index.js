import table from './table'

table.install = Vue => {
    Vue.component(table.name, table)
}

export default table
