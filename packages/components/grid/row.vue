<template>
    <Row class="mvi-row" :style="rowStyle">
        <slot></slot>
    </Row>
</template>

<script>
export default {
    name: 'm-row',
    props: {
        //排列方式
        justify: {
            type: String,
            default: 'flex-start',
            validator(value) {
                return [
                    'flex-start',
                    'flex-end',
                    'space-around',
                    'space-between'
                ].includes(value)
            }
        },
        //垂直对齐方式
        align: {
            type: String,
            default: 'flex-start',
            validator(value) {
                return ['flex-start', 'flex-end', 'center'].includes(value)
            }
        },
        //渲染标签
        tag: {
            type: String,
            default: 'div'
        }
    },
    provide() {
        return {
            row: this
        }
    },
    computed: {
        rowStyle() {
            let style = {}
            style.justifyContent = this.justify
            style.alignItems = this.align
            return style
        }
    },
    components: {
        Row: {
            render(createElement) {
                return createElement(
                    this.$parent.tag,
                    {
                        on: Object.assign({}, this.$parent.$listeners)
                    },
                    this.$slots.default
                )
            }
        }
    }
}
</script>

<style scoped lang="less">
.mvi-row {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
}
</style>
