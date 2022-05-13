<template>
    <div id="app">
        <!-- <m-select :layer-props="{shadow:false}" style="width:6rem;margin:7rem auto;" @change="change" clearable placeholder="请选择" v-model="value" :options="options"></m-select> -->
        <m-date-chooser block :layer-props="{showTriangle:true,borderColor:'#f30',border:true}" style="margin-left: 5rem;width:7rem;" v-model="date">
            <m-field :value="date.toString()"></m-field>
        </m-date-chooser>
    </div>
</template>
<script>
export default {
    data() {
        return {
            value: '',
            value2: '',
            date: new Date(),
            options: [
                {
                    label: '安徽',
                    value: 10
                },
                {
                    label: '江苏',
                    value: 20
                }
            ],
            list: ['中国', '美国', '英国']
        }
    },
    methods: {
        change(res) {
            console.log(res)
        }
    }
}
</script>
<style lang="less">
html {
    font-size: 50px;
}

.app-full {
    width: 1rem !important;
    height: 1rem !important;
}

#app {
    height: 100%;
    overflow: auto;
    position: relative;
    width: 100%;
}
</style>
