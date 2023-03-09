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
                 rawData2:[],
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
                    else{
                        this.loadGraphDataBuyDateSpecific(this.TimePeriod.start_date,this.TimePeriod.end_date,this.currSymbol) 
                    }
              //this.loadGraphData(val)
            //    console.log(this.TimePeriod)
                
            },
            TimePeriod(val){
                //console.log(val)
               if(val > 0){
                   this.loadGraphDataBuyDate(val,this.currSymbol)
               }
               else{
                   this.loadGraphDataBuyDateSpecific(val.start_date,val.end_date,this.currSymbol) 
               }
                
            }
        },
        methods: {
            
            async loadGraphDataBuyDate(dataTime,currSymbol){
                 let headers = {            
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.$session.get('user').token,
                        
                    }
                 //console.log(currSymbol)
                    await Axios.post(this.nodeApi+'/getSalesByDateGraphCurr2CS',{currency_id:currSymbol,time:dataTime},{headers:headers})
                    .subscribe(res =>{ 
                       this.rawData = res.data.data.one.recordset
                        this.rawData2 = res.data.data.two.recordset
                         
                         
                        this.getData(this.rawData,this.rawData2,dataTime)
                       // console.log(this.rawData2)
                    },err => console.log(err))
                    
            },
             async loadGraphDataBuyDateSpecific(start_date,end_date,currSymbol){
                 let headers = {            
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.$session.get('user').token,
                        
                    }
                    // console.log(headers)
                    await Axios.post(this.nodeApi+'/getSalesByDateGraphSpecificCurrCS',{currency_id:currSymbol,start_date:start_date,end_date:end_date},{headers:headers})
                    .subscribe(res =>{
                         this.rawData = res.data.data.one.recordset
                         this.rawData2 = res.data.data.two.recordset
                         
                         
                        //this.getData2(this.rawData,this.rawData2)
                        this.getData(this.rawData,this.rawData2)
                        //console.log(this.rawData)
                    },err => console.log(err))
                    
            },
            getData(buys,sells,dataTime) {
           //console.log(dataTime)
            console.log(sells)

             var date1 = [];
             var date2= [];
             var data1 = [];
             var data2 = [];
             var buyRate = [];
             var sellRate = [];

            if(dataTime == 7){
                var counter = 0
                sells.forEach(element => {
                           date1.push(element.day_name)
                            data1.push(parseFloat(element.receive_amount).toFixed(2))
                           // buyRate.push(parseFloat(element.avg_rate).toFixed(2))
                           // console.log(sells.length)
                     if(sells.length > 0){
                         if(element.date_t == sells[counter].date_t){
                               
                               //console.log(sells[counter].day_name)
                              
                               date2.push(sells[counter].day_name)
                               data2.push(parseFloat(sells[counter].disburse_amount).toFixed(2))
                               //sellRate.push(parseFloat(sells[counter].avg_rate).toFixed(2))
                                counter += 1
                          }else{
                              date2.push(element.day_name)
                              data2.push(parseFloat(0).toFixed(2))
                             // sellRate.push(parseFloat(0).toFixed(2))
                          }
                     }else{
                        // date2.push(element.day_name)
                        //       data2.push(parseFloat(0).toFixed(2))
                        //       sellRate.push(parseFloat(0).toFixed(2))   
                     }
                          
                           
                      
                });
                
                // sells.forEach(element => {
                //     date2.push(element.day_name)
                //     data2.push(parseFloat(element.disbure_amount).toFixed(2))
                // });
            }

             else if(dataTime == 30){
                  var counter = 0
                sells.forEach(element => {
                           date1.push(element.date_t)
                            data1.push(parseFloat(element.receive_amount).toFixed(2))
                            // buyRate.push(parseFloat(element.avg_rate).toFixed(2))
                    if(sells.length > 0){
                          if(element.date_t == sells[counter].date_t){
                                                          
                              date2.push(sells[counter].date_t)
                               data2.push(parseFloat(sells[counter].disburse_amount).toFixed(2))
                             //  sellRate.push(parseFloat(sells[counter].avg_rate).toFixed(2))
                                counter += 1
                          }else{
                              date2.push(element.date_t)
                              data2.push(parseFloat(0).toFixed(2))
                             // sellRate.push(parseFloat(0).toFixed(2))
                          }
                    }
                      
                });

            }
             else {
                  var counter = 0
                sells.forEach(element => {
                           date1.push(element.date_t)
                            data1.push(parseFloat(element.receive_amount).toFixed(2))
                            // buyRate.push(parseFloat(element.avg_rate).toFixed(2))
                    if(sells.length > 0){
                          if(element.date_t == sells[counter].date_t){
                                                          
                              date2.push(sells[counter].date_t)
                               data2.push(parseFloat(sells[counter].disburse_amount).toFixed(2))
                             //  sellRate.push(parseFloat(sells[counter].avg_rate).toFixed(2))
                                counter += 1
                          }else{
                              date2.push(element.date_t)
                              data2.push(parseFloat(0).toFixed(2))
                             // sellRate.push(parseFloat(0).toFixed(2))
                          }
                    }
                      
                });

            }


            //console.log(data1)
             console.log(data2)


                this.polar = {
                            title: {
                                    text: 'PayOut Totals'
                                },
                                tooltip : {
                                    trigger: 'axis',
                                    axisPointer: {
                                        type: 'cross',
                                        label: {
                                            backgroundColor: '#6a7985'
                                        }
                                    }
                                },
                                legend: {
                                    data:['PayOuts'],
                                    itemGap: 5
                                },
                                
                                grid: {
                                    left: '3%',
                                    right: '4%',
                                    bottom: '3%',
                                    containLabel: true
                                },
                                xAxis : [
                                    {
                                        type : 'category',
                                        // boundaryGap : false,
                                        data : date1
                                    }
                                ],
                                yAxis : [
                                    {
                                        type : 'value'
                                    }
                                    ],
                                   
                             series : [
                                        
                                        {
                                            name:'PayOuts',
                                            type:'bar',                                            
                                            areaStyle: {},
                                            data:data2
                                        }
                                    ]
                        };
            },
            getData2(buys,sells) {
          
             var date1 = [];
             var date2= [];
             var data1 = [];
             var data2 = [];
             var buyRate = [];
             var sellRate = [];
            
                   var counter = 0
                buys.forEach(element => {
                          date1.push(element.day_name)
                            data1.push(parseFloat(element.receive_amount).toFixed(2))
                           // buyRate.push(parseFloat(element.avg_rate).toFixed(2))
                     
                     if(sells.length > 0){
                          if(element.date_t == sells[counter].date_t){
                               
                               //console.log(sells[counter].day_name)
                              
                              date2.push(sells[counter].day_name)
                               data2.push(parseFloat(sells[counter].disburse_amount).toFixed(2))
                              // sellRate.push(parseFloat(sells[counter].avg_rate).toFixed(2))
                                counter += 1
                          }else{
                              date2.push(element.day_name)
                              data2.push(parseFloat(0).toFixed(2))
                             // sellRate.push(parseFloat(0).toFixed(2))
                          }
                     }
                         
                           
                      
                });
           
                // buys.forEach(element => {
                //     date1.push(element.date_t)
                //     data1.push(parseFloat(element.receive_amount).toFixed(2))
                // });
                
                // sells.forEach(element => {
                //     date2.push(element.day_name)
                //     data2.push(parseFloat(element.disbure_amount).toFixed(2))
                // });
                       


                this.polar = {
                            title: {
                                    text: 'Buys and Sales Totals'
                                },
                                tooltip : {
                                    trigger: 'axis',
                                    axisPointer: {
                                        type: 'cross',
                                        label: {
                                            backgroundColor: '#6a7985'
                                        }
                                    }
                                },
                                legend: {
                                     data:['Buys','Sells','Ave.Buy Rate','Ave.Sell Rate'],
                                    itemGap: 5
                                },
                                
                                grid: {
                                    left: '3%',
                                    right: '4%',
                                    bottom: '3%',
                                    containLabel: true
                                },
                                xAxis : [
                                    {
                                        type : 'category',
                                        // boundaryGap : false,
                                        data : date1
                                    }
                                ],
                                yAxis : [
                                    {
                                        type : 'value'
                                    }
                                    ],
                                   
                             series : [
                                        {
                                            name:'Buys',
                                            type:'bar',
                                            
                                            areaStyle: {},
                                            data:data1
                                        },
                                        {
                                            name:'Sells',
                                            type:'bar',
                                            
                                            areaStyle: {},
                                            data:data2
                                        },
                                         {
                                            name:'Ave.Buy Rate',
                                            type:'line',
                                            
                                            areaStyle: {},
                                            data:buyRate
                                        },
                                        {
                                            name:'Ave.Sell Rate',
                                            type:'line',
                                            
                                            areaStyle: {},
                                            data:sellRate
                                        }
                                    ]
                        };
            }
        },
    }
</script>