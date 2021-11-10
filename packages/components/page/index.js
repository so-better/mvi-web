import page from './page'

page.install = Vue => {
    Vue.component(page.name, page)
}

export default page
