import tabs from './tabs'
import tab from './tab'
tabs.install = Vue => {
    Vue.component(tabs.name, tabs)
    Vue.component(tab.name, tab)
}

export default tabs
