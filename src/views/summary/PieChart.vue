<template>
    <div>
         <v-layout>
            <v-flex xs12 md4 pb-2 pr-2>
                <v-card hover>
                    <v-flex mb-2 class="card cardRev3">
                        <v-layout ma-1>
                        <img src="../../assets/logo.fw.png" width="70px" height="40px" style="padding:5px;">
                        <v-flex style="text-align: right;padding: 3px;">
                            <h3>Float Balance</h3>
                            <h2 class="h4Rev">{{parseFloat(conticashB).toFixed(2)}}</h2>
                        
                        </v-flex>
                        </v-layout>
                    </v-flex>
                </v-card>
             </v-flex>
             <!--
             <v-flex xs12 md4 pb-2 pr-2>
                <v-card hover>
                    <v-flex mb-2 class="card cardRev3">
                        <v-layout ma-1>
                        <img src="../../assets/worldremit.png" class="image2">
                        <v-flex style="text-align: right;padding: 3px;">
                            <h3>Float Balance</h3>
                            <h2 class="h4Rev">{{parseFloat(worldremitB).toFixed(2)}}</h2>
                        
                        </v-flex>
                        </v-layout>
                    </v-flex>
                </v-card>
            </v-flex> -->
             <!-- <v-flex xs12 md4 pb-2>
                <v-card hover>
                    <v-flex mb-2 class="card cardRev3">
                        <v-layout ma-1>
                        <img src="../../assets/contisendtr2.png" width="75px" height="35px" style="padding:5px;">
                        <v-flex style="text-align: right;padding: 3px;">
                            <h3>Float Balance</h3>
                            <h2 class="h4Rev">{{parseFloat(contisendB).toFixed(2)}}</h2>
                        
                        </v-flex>
                        </v-layout>
                    </v-flex>
                </v-card>
            </v-flex> -->
        </v-layout>
        <v-chart :options="polar" autoresize />
    </div>
    
</template>

<style scoped>
    /**
             * The default size is 600px×400px, for responsive charts
             * you may need to set percentage values as follows (also
             * don't forget to provide a size for the container).
             */
    .echarts {
        width: 100%;
        height: 500px;
        border-left: 5px solid #6fbe8d;
        border-bottom: 5px solid #6fbe8d;
         background-color: rgb(255, 255, 255);
    }
</style>

<script>
import Axios from  'axios-observable';
    import ECharts from 'vue-echarts'
    export default {
        components: {
            'v-chart': ECharts,
            
        },
        props: ['currency_id','date'],
        data() {
            return {
                polar: {},
                 nodeApi: '',
                 rawData1:[],
                 rawData2:[],
                 companyFloatTotal:[],
                 companyTransactionTotal:[],
                 allClientsCount:0,
                 contisendbalance:0,
                 worldremitbalance:0,
                 conticashbalance:0,
                 contisendT:0,
                 worldremitT:0,
                 conticashT:0,
                 contisendB:0,
                 worldremitB:0,
                 conticashB:0
            }
        },
        mounted() {
         
          
        },
        watch: {
            currency_id(val){
                //console.log(val)
                this.contisendbalance = 0
                this.worldremitbalance = 0
                this.conticashbalance = 0

                this.contisendB = 0
                this.conticashB = 0 
                this.worldremitB = 0 

                this.contisendT = 0
                this.conticashT = 0 
                this.worldremitT = 0 

                this.companyFloatTotal = []
                this.companyTransactionTotal = []
                this.getTellerFloatSummary()
            },
            date(val){
                this.contisendbalance = 0
                this.worldremitbalance = 0
                this.conticashbalance = 0

                this.contisendB = 0
                this.conticashB = 0 
                this.worldremitB = 0 

                this.contisendT = 0
                this.conticashT = 0 
                this.worldremitT = 0 

                this.companyFloatTotal = []
                this.companyTransactionTotal = []
                this.getTellerFloatSummary()
            },
           
        },
        methods: {
             async getTellerFloatSummary(){
                    let headers = {            
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.$session.get('user').token,
                    
                }
                // console.log(headers)
                await Axios.post(this.nodeApi+'/getCompanyBalance',{currency:this.currency_id},{headers:headers})
                .subscribe(res =>{
                    this.companyFloatTotal = res.data.data.one.recordset
                    this.companyFloatTotal.forEach(element => {
                        if(element.name == 'ContiCash'){
                            this.conticashB = element.value
                        }
                        if(element.name == 'ContiSend'){
                            this.contisendB = element.value
                        }
                        if(element.name == 'WorldRemit'){
                            this.worldremitB = element.value  
                        }
                    });
                   // this.getContiSendTransactionBalance()
                    this.getContiCashTransactionBalance()
                   // this.getWorldRemitTransactionBalance()
                    this.getData(this.companyFloatTotal,this.companyTransactionTotal)
                    //console.log(this.allRates)
                },err => console.log(err))
            },
             async getContiSendTransactionBalance(){
                    let headers = {            
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.$session.get('user').token,
                    
                }
                // console.log(headers)
                await Axios.post(this.nodeApi+'/getContiSendBalance',{currency:this.currency_id},{headers:headers})
                .subscribe(res =>{
                    
                    if(res.data.data.one.recordset.length == 0){
                        this.contisendbalance = 0
                    }else{
                        this.contisendbalance = res.data.data.one.recordset[0].disbursed
                    }
                    this.companyTransactionTotal.push({value:parseFloat(this.contisendbalance).toFixed(2),name:'ContiSend'})
                    //console.log(this.allRates)
                },err => console.log(err))
            },
             async getContiCashTransactionBalance(){
                    let headers = {            
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.$session.get('user').token,
                    
                }
                // console.log(headers)
                await Axios.post(this.nodeApi+'/getContiCashBalance',{currency:this.currency_id},{headers:headers})
                .subscribe(res =>{
                    
                    if(res.data.data.one.recordset.length == 0){
                        this.conticashbalance = 0
                    }else{
                        this.conticashbalance = res.data.data.one.recordset[0].disbursed
                    }
                    this.companyTransactionTotal.push({value:parseFloat(this.conticashbalance).toFixed(2),name:'Nenyasha BDC'})
                    //console.log(this.allRates)
                },err => console.log(err))
            },
            async getWorldRemitTransactionBalance(){
                    let headers = {            
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.$session.get('user').token,
                    
                }
                // console.log(headers)
                
                await Axios.post(this.nodeApi+'/getWorldRemitBalance',{currency:this.currency_id},{headers:headers})
                .subscribe(res =>{
                    
                     if(res.data.data.one.recordset.length == 0){
                        this.worldremitbalance = 0
                    }else{
                        this.worldremitbalance = res.data.data.one.recordset[0].disbursed
                    }
                     this.companyTransactionTotal.push({value: parseFloat(this.worldremitbalance).toFixed(2),name:'WorldRemit'})
                    //console.log(this.allRates)
                },err => console.log(err))
            },

            getData(data,data2) { 
               
                this.polar = {
                    title : {
                            text: 'Transaction & Float Summary',
                            subtext: 'Break-down of transaction total per product and float injection.',
                            x: 'center',
                            align: 'right'
                        },
                        legend: {
                             orient: 'vertical',
                             x: 'right',
                        },
                     tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                       
                        series: [ 
                           {
                                name: 'Treasury Injection',
                                type: 'pie',
                                selectedMode: 'single',
                                radius: [0, '30%'],
                                label: {
                                    position: 'inner',
                                    fontSize: 9,
                                },
                                labelLine: {
                                    show: false
                                },
                                data: data
                            },
                            {
                                name:'Transaction Summary',
                                type:'pie',
                                 radius: ['45%', '60%'],                               
                                data:data2
                            }
                    ]
                };
            }
        },
    }
</script>
<style>
.h4Rev{
    color: #088f08;
  }
   .cardRev3 {
    border-left: 5px solid #1adf34;
  }

  .card {
    height: 60px;
  }
   .image2{
    width: 50px;
    height: 100%;
    margin: 3px;
  }
</style>