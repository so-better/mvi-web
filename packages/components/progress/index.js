import progress from './progress'

progress.install = Vue => {
    Vue.component(progress.name, progress)
}

export default progress
