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
            'v-chart': ECharts,
            
        },
        data() {
            return {
                polar: {},
                 nodeApi: 'http://localhost:8081',
                 rawData:[]
            }
        },
        mounted() {
            this.loadGraphData()
            
        },
        methods: {
            async loadGraphData(){
                 let headers = {            
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.$session.get('user').token,
                        
                    }
                    // console.log(headers)
                    await Axios.get(this.nodeApi+'/getBranchSalesGraph',{headers:headers})
                    .subscribe(res =>{
                        this.rawData = res.data
                         this.getAllCurrenciesActive()
                        this.getData(this.rawData)
                        //console.log(this.rawData)
                    },err => console.log(err))
                    
            },
            getData(rawData) {
                this.polar = {
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [120, 200, 150, 80, 70, 110, 130],
                        type: 'bar'
                    }, {
                        data: [120, 200, 150, 80, 70, 110, 130],
                        type: 'line'
                    }]
                };
            }
        },
    }
</script>