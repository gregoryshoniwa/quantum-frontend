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
     import Axios from  'axios-observable';
    export default {
        components: {
            'v-chart': ECharts
        },
         props: {
            ToggleCurrency:''
        },
        data() {
            return {
                polar: {},
                graphAPi: 'http://dev.contipay.co.zw:82/https://api-dev.contipay.co.zw/graphsApi?authorization=',
                nodeApi: 'http://localhost:8081',
                //nodeApi: 'http://localhost:8081',
                currencyData: [],
                currencyDataActive: [],
                branchData:[],
                graphData:[],
                rawData:[]
            }
        },
        mounted() {
             this.loadGraphData("USD")
            
           
        },
        watch: {
             ToggleCurrency(val){
              this.loadGraphData(val)
               //console.log(val)
                
            }
        },
        methods: {
          
         async loadGraphData(currency){
                 let headers = {            
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.$session.get('user').token,
                        
                    }
                    // console.log(headers)
                    await Axios.post(this.nodeApi+'/getBranchFloatGraph3ContiSend',{currency},{headers:headers})
                    .subscribe(res =>{
                        this.rawData = res.data.data.one.recordset
                        
                        this.getData(this.rawData,currency)
                        //console.log(this.rawData)
                    },err => console.log(err))
                    
            },
            getData(Data,currSymbol) {
                

                var Currencies = []
                var branches = []

                var coins = []
                var rtgs = []
                var ecocash = []
                var bond = []
                var usd = []
                var float = []
                var transaction = []

                var totalcoins = 0
                var totalrtgs = 0
                var totalecocash = 0
                var totalbond = 0
                var totalusd = 0
                 var totalfloat = 0
                var totaltran = 0


                 Data.forEach(element => {
                    if(branches.indexOf(element.branch.replace(/\s/g, '')) == -1) {
                       branches.push(element.branch.replace(/\s/g, ''))
                    } 
                    
                });
                 Data.forEach(element => {
                    if(Currencies.indexOf(element.symbol.replace(/\s/g, '')) == -1) {
                       Currencies.push(element.symbol.replace(/\s/g, ''))
                    } 
                    
                });

               Data.forEach((element,i) => {                      
                    //    if(branches[i] == element.branch){
                        //    if(element.symbol.replace(/\s/g, '') == 'Coin'){
                        //         coins.push(parseFloat(element.amount).toFixed(2))   
                        //         totalcoins += element.amount                            
                        //     } 
                        //     if(element.symbol.replace(/\s/g, '') == 'Bond'){                                
                        //         bond.push(parseFloat(element.amount).toFixed(2))
                        //         totalbond += element.amount
                        //     }
                        //     if(element.symbol.replace(/\s/g, '') == 'RTGS'){
                        //         rtgs.push(parseFloat(element.amount).toFixed(2))   
                        //         totalrtgs += element.amount                            
                        //     } 
                        //     if(element.symbol.replace(/\s/g, '') == 'Ecocash'){                                
                        //         ecocash.push(parseFloat(element.amount).toFixed(2))
                        //         totalecocash += element.amount
                        //     }
                            if(element.symbol.replace(/\s/g, '') == currSymbol){                                
                                usd.push(parseFloat(element.commssion).toFixed(2))
                                float.push(parseFloat(element.float_amount).toFixed(2))
                                transaction.push(element.num_transactions)
                                totalusd += element.commssion
                                totalfloat += element.float_amount
                                totaltran += element.num_transactions
                            }
                    //    }
                           
                });
                
             //console.log(Currencies)
                this.polar = {
                      title: {
                        subtext: `Total Volume : ${currSymbol} ${parseFloat(totalfloat).toFixed(2)} || Total Commissions : ${currSymbol} ${parseFloat(totalusd).toFixed(2)} || || Total Transactions : ${totaltran}  `,
                        subtextStyle: {
                            color: '#3949AB'
                        },
                        left: 10
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        x : 'center',
                         y : 'bottom',
                        data: ['No# Transactions', `${currSymbol} Pending Float`, `${currSymbol} Commssion`]
                    },
                    
                    xAxis: [{
                        type: 'category',
                        data: branches//['Branch 1', 'Branch 2', 'Branch 3', 'Branch 4', 'Branch 5', 'Branch 4', 'Branch 7']
                    }],
                    yAxis: [{
                        type: 'value'
                    }],
                    series: [
                        // {
                        //     name:'Coin',
                        //     type:'bar',
                        //     stack: '广告',
                        //     data:coins
                        // },
                        // {
                        //     name:'RTGS',
                        //     type:'bar',
                        //     stack: '广告',
                        //     data:rtgs
                        // },
                        // {
                        //     name:'Ecocash',
                        //     type:'bar',
                        //     stack: '广告',
                        //     data:ecocash
                        // },
                        // {
                        //     name:'Bond',
                        //     type:'bar',
                        //     stack: '广告',
                        //     data:bond
                        // },
                        {
                            name:'No# Transactions',
                            type:'bar',
                            stack: '广告',
                            data:transaction
                        },
                        
                        {
                            name:currSymbol+ ' Pending Float',
                            type:'bar',
                            stack: '广告',
                            data:float,
                            itemStyle: {color: 'green'},
                        },
                        {
                            name:currSymbol+ ' Commssion',
                            type:'bar',
                            data:usd,
                            stack: '广告',
                            itemStyle: {color: '#047EB7'},
                        }
                        
                    ]
                };
            }
        },
    }
</script>