<template>
    <div id="app">
        <m-button type="success" form-control @click="selectDate">选择日期</m-button>
        <m-date-native-picker ref="datepicker" type="time" v-model="date"></m-date-native-picker>
    </div>
</template>
<script>
export default {
    data() {
        return {
            page: 1,
            date: new Date(),
            active: 0,
            show: false,
            value: '',
            options: [
                {
                    label: 'LOL',
                    value: '0'
                }
            ]
        }
    },
    methods: {
        selectDate() {
            this.$refs.datepicker.trigger()
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
