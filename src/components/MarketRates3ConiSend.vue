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
            TimePeriod:'',
            ToggleCurrency:''
        },
        data() {
            return {
                polar: {},
                 nodeApi: 'http://localhost:8081',
                 rawData:[],
                 data: 500,
                 totalBuys:0,
                 totalSells:0,
                 totalCharges:0,
                 totalDeposits:0,
                 totalBuysRate:0,
                 totalSellsRate:0,
                 currSymbol: '',
                 dateValue: null,
            }
        }, 
        mounted() {
            this.currSymbol = "USD"
            //console.log(this.TimePeriod)
            this.loadGraphDataBuyDate(this.TimePeriod,this.currSymbol)
            // this.loadGraphData()
        },
        watch: {
             ToggleCurrency(val){
                 this.currSymbol = val
                 if(this.TimePeriod > 0){
                   this.loadGraphDataBuyDate(this.TimePeriod,this.currSymbol)
               }
               else if(this.TimePeriod == 0){
                  this.loadGraphData(this.currSymbol)
               }else{
                   this.loadGraphDataBuyDateSpecific(this.TimePeriod.start_date,this.TimePeriod.end_date,this.currSymbol) 
               }
              //this.loadGraphData(val)
               //console.log(val)
                
            },
            TimePeriod(val){
                this.dateValue = val
               if(val > 0){
                   this.loadGraphDataBuyDate(val,this.currSymbol)
               }
               else if(val == 0){
                  this.loadGraphData(this.currSymbol)
               }else{
                   this.loadGraphDataBuyDateSpecific(val.start_date,val.end_date,this.currSymbol) 
               }
                
            }
        },
        methods: {
             async loadGraphData(currSymbol){
                 let headers = {            
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.$session.get('user').token,
                        
                    }
                    // console.log(headers)
                    await Axios.post(this.nodeApi+'/getBranchSalesGraphByCurrCS',{currency_id:currSymbol},{headers:headers})
                    .subscribe(res =>{
                        this.rawData = res.data.data.one.recordset
                         
                        this.getData(this.rawData,currSymbol)
                        //console.log(this.rawData)
                    },err => console.log(err))
                    
            },
            async loadGraphDataBuyDate(dataTime,currSymbol){
                 let headers = {            
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.$session.get('user').token,
                        
                    }
                    // console.log(headers)
                    await Axios.post(this.nodeApi+'/getBranchSalesGraphByDateCurrCS',{currency_id:currSymbol,time:dataTime},{headers:headers})
                    .subscribe(res =>{
                        this.rawData = res.data.data.one.recordset
                         
                        this.getData(this.rawData,currSymbol) 
                        //console.log(this.rawData)
                    },err => console.log(err))
                    
            },
             async loadGraphDataBuyDateSpecific(start_date,end_date,currSymbol){
                 let headers = {            
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.$session.get('user').token, 
                        
                    }
                    // console.log(headers)
                    await Axios.post(this.nodeApi+'/getBranchSalesGraphByDateSpecificCurrCS',{currency_id:currSymbol, start_date:start_date,end_date:end_date},{headers:headers})
                    .subscribe(res =>{
                        this.rawData = res.data.data.one.recordset
                         
                        this.getData(this.rawData,currSymbol)
                        //console.log(this.rawData)
                    },err => console.log(err))
                    
            },
            getData(Data,currSymbol) {
                console.log(Data)
                

                

                var branches = []
                var branchBuys = []
                var branchSell = []
                var branchCharge = []
                var branchDeposit = []
                var buyRate = []
                var sellRate = []

                var newarray1 = []
                 var newarray2 = []
                 this.totalBuys = 0
                 this.totalSells = 0
                this.totalCharges = 0
                this.totalDeposits = 0
                 this.totalBuysRate = 0
                 this.totalSellsRate = 0

                Data.forEach(element => {
                    if(branches.indexOf(element.branch_name.replace(/\s/g, '')) == -1) {
                       branches.push(element.branch_name.replace(/\s/g, ''))
                    } 
                    
                });
                 Data.forEach(element1 => {
                        
                        branchSell.push(parseFloat(element1.disbured_sum).toFixed(2)) 
                        branchCharge.push(parseFloat(element1.charges).toFixed(2)) 
                        branchDeposit.push(parseFloat(element1.deposits).toFixed(2)) 
                        

                        // this.totalBuys += element1.received_sum
                        this.totalSells += element1.disbured_sum
                        this.totalCharges += element1.charges
                        this.totalDeposits += element1.deposits
                });
               

               

        //    console.log(result)
        //     //  console.log(branchBuys)
        //         console.log(newarray1)

        //     //  console.log(branchSell)

             
        //       console.log(newarray2)
        // console.log(branchCharge)
                this.polar = {
                    title: {
                        subtext: `Total PayOuts : ${currSymbol} ${parseFloat(this.totalSells).toFixed(2)} || Total Charges : ${currSymbol} ${parseFloat(this.totalCharges).toFixed(2)} || Total Deposit : ${currSymbol} ${parseFloat(this.totalDeposits).toFixed(2)}`,
                        left: 10,
                         subtextStyle: {
                            color: '#3949AB'
                        },
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
                        data: ['Total CS PayOuts','Total Collected Charges','Total Deposits']
                    },
                    xAxis: {
                        type: 'category',
                        data: branches
                    },
                    yAxis: { 
                        type: 'value'
                    },
                   series: [
                         {
                        name: 'Total CS PayOuts',
                        data: branchSell,
                        stack: '广告',
                        type: 'bar'
                        },
                        {
                            name:'Total Deposits',
                            type:'bar',
                            stack: '广告',
                            data:branchDeposit,
                            itemStyle: {color: '#1687a7'},
                        },
                        {
                            name:'Total Collected Charges',
                            type:'bar',
                            stack: '广告',
                            data:branchCharge,
                            itemStyle: {color: 'green'},
                        }
                    ]
                };
            }
        },
    }
</script>