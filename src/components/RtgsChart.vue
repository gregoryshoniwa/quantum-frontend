<template>
    <v-chart :options="polar" autoresize />
</template>

<style scoped>
    /**
         * The default size is 600px×400px, for responsive charts
         * you may need to set percentage values as follows (also
         * don't forget to provide a size for the container).
         */
    .echarts {
        width: 100%;
        height: 100%;
        border-left: 5px solid #ffd001;
    }
</style>

<script>
    import ECharts from 'vue-echarts'
    export default {
        components: {
            'v-chart': ECharts
        },
        computed: {
            polar(){
                var polar =  {
                    title: {
                        text: 'RTGS : 8.5',
                        subtext: 'Total Booking Sales and Buys'
                    },
                    legend: {
                        
                        left: 'right',
                        data: ['Sales', 'Buys']
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line',
                        name: 'Buys',
                        lineStyle: {color: '#43A047'},
                        areaStyle: {
                            color: '#388E3C'
                        }
                    },
                    {
                        data: [925, 393, 90, 593, 129, 133, 320],
                        type: 'line',
                        name: 'Sales',
                        
                        lineStyle: {color: '#0288D1'},
                        areaStyle: {
                            color: '#01579B'
                        }
                    }
                    
                    ]
                }
                 return polar
            }
        },
        data() {
            return {
                bondrate:'8.5'
               
            }
        },
        methods: {},
    }
</script>