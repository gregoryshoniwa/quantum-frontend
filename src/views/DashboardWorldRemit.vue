<template>
  <div>
     
    <v-layout row wrap justify-end>
      <v-flex xs12 md3 pa-2>
        <v-card hover>
          <v-flex mb-2 class="card cardRev1">
            <v-layout ma-1>
              <img src="../assets/imgs/bank.fw.png" class="image2">
               <v-flex style="text-align: right;padding: 3px;">
                <h2>Branches</h2>
                <h3 class="h4Rev">{{allBranchesCount}}</h3>
                
              </v-flex>
            </v-layout>
          </v-flex>
        </v-card>
        
      </v-flex>

      <v-flex xs12 md3 pa-2>
        <v-card hover>
          <v-flex mb-2 class="card cardRev2">
            <v-layout ma-1>
              <img src="../assets/imgs/clients.fw.png" class="image2">
              <v-flex style="text-align: right;padding: 3px;">
                <h2>Users</h2>
                <h3 class="h4Rev">{{allUsersCount}}</h3>
                
              </v-flex>
            </v-layout>
          </v-flex>
        </v-card>
        
      </v-flex>

      <!-- <v-flex xs12 md3 pa-2>
        <v-card hover>
          <v-flex mb-2 class="card cardRev3">
            <v-layout ma-1>
              <img src="../assets/imgs/gdp.fw.png" class="image2">
               <v-flex style="text-align: right;padding: 3px;">
                <h2>Clients</h2>
                <h3 class="h4Rev">{{allClientsCount}}</h3>
               
              </v-flex>
            </v-layout>
          </v-flex>
        </v-card>
        
      </v-flex> -->

      
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm12 md12 lg12 xl6 pa-2>
        <v-flex>
           <v-layout row wrap>
             <v-flex mr-3 mt-3>
            <h3>Branch Float Analysis</h3>
            </v-flex>
           </v-layout>
          <v-card hover>
              
            <BookingChart2 :ToggleCurrency="toggleCurr" class="echart" />
          </v-card>
        </v-flex>
      </v-flex>

      <v-flex xs12 sm12 md12 lg12 xl6 pa-2>
        <v-flex>
          <v-layout row wrap>
            <v-flex mr-3 mt-3>
              <h3>Transaction Analysis</h3>
            </v-flex> 
            <v-spacer></v-spacer>
            <v-flex>
             <v-btn-toggle mandatory v-model="toggle" color="primary">
                <v-btn flat value="1">
                  Today
                </v-btn>
                <v-btn flat value="2">
                  This Week
                </v-btn>
                <v-btn flat value="3">
                  Current Month
                </v-btn>
                <v-btn flat value="5">
                  Last Month
                </v-btn>
                <v-btn flat value="4">
                 Over-all
                </v-btn>
               
              </v-btn-toggle>
               <v-btn :disabled="disable" color="primary" @click="dialogdaterange = true">
                  Range
                </v-btn>
              </v-flex>
          </v-layout>
          <v-card hover>
            <MarketRates3 :TimePeriod="timeP" :ToggleCurrency="toggleCurr" class="echart2" />
          </v-card>
        </v-flex>
      </v-flex>
     

      <v-flex xs12 sm12 md12 lg12 xl6 pa-2>
        <v-flex>
          <v-layout row wrap>
            <v-flex mr-3 mt-3>
              <h3>Totals History </h3>
            </v-flex> 
            <v-spacer></v-spacer>
            <v-flex>
             <v-btn-toggle mandatory v-model="toggle2" color="primary">
                <v-btn flat value="1">
                  Last 7 days
                </v-btn>
                <v-btn flat value="2">
                  Last 30 days
                </v-btn>
               
               
              </v-btn-toggle>
               <v-btn :disabled="disable" color="primary" @click="dialogdaterange3 = true">
                  Range
                </v-btn>
              </v-flex>
          </v-layout>
          <v-card hover>
            <MarketRates4 :TimePeriod="timeS" :ToggleCurrency="toggleCurr" class="echart2" />
          </v-card>
        </v-flex>
      </v-flex>

       <v-flex xs12 sm12 md12 lg12 xl6 pa-2>
        <v-flex>
           <v-layout row wrap>
             <v-flex mr-3 mt-3>
            <h3>Teller Float Analysis</h3>
            </v-flex>
             <v-spacer></v-spacer>
            <v-flex>
            <v-select
                   
                    :items="branches"
                    label="Select Branch"
                    @input="selectedBranch"
                    item-text="branchname"
                    item-value="id"   
            ></v-select>
            </v-flex>
           </v-layout>
          <v-card hover>
              
             <SuperGraph11 :Branch="branch" :ToggleCurrency="toggleCurr" class="echart" />
          </v-card>
        </v-flex>
      </v-flex>

      <v-flex xs12 sm12 md12 lg12 xl6 pa-2>
        <v-flex>
          <v-layout row wrap>
            <v-flex mr-3 mt-3 md3>
              <h3>Teller Average R & T</h3>
            </v-flex> 
           
             <v-flex md2>
            <v-select
                   
                    :items="branches"
                    label="Select Branch"
                    @input="selectedBranch2"
                    item-text="branchname"
                    item-value="id"   
            ></v-select>
            </v-flex>
             <v-spacer></v-spacer>
            <v-flex mt-2 v-if="branchSelected">
             <v-btn-toggle mandatory v-model="togglebranch" color="primary">
                <v-btn flat value="1">
                  Today
                </v-btn>
                <v-btn flat value="2">
                  This Week
                </v-btn>
                <v-btn flat value="3">
                  Current Month
                </v-btn>
                <v-btn flat value="5">
                  Last Month
                </v-btn>
                <v-btn flat value="4">
                 Over-all
                </v-btn>
               
              </v-btn-toggle>
               <v-btn :disabled="disable" color="primary" @click="dialogdaterange2 = true">
                  Range
                </v-btn>
              </v-flex>
          </v-layout>
          <v-card hover>
           <SuperGraph22 :TimePeriod="timePP" :Branch="branch2" :ToggleCurrency="toggleCurr" class="echart2" />
          </v-card>
        </v-flex>
      </v-flex>
    </v-layout>

    <v-dialog v-model="dialogdaterange" persistent max-width="400px">
                  <v-card class="mx-auto">
                    <v-card-title class="yellow darken-2 white--text">
                    <span class="headline">Select Report Date Range</span>
                   
                    </v-card-title>
                   
                        <v-layout row wrap>
                        
                          <v-flex xs12 mt-3 mr-3 ml-3>
                            <v-text-field style="text-align: center;" @keyup.enter="daterange" v-model="start_date" autofocus type="date" label="Please enter from date" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 mr-3 ml-3>
                            <v-text-field style="text-align: center;" @keyup.enter="daterange" v-model="end_date" autofocus type="date" label="Please enter to date" required></v-text-field>
                        </v-flex>
                        </v-layout>  
                        <v-spacer></v-spacer>
                    <v-btn color="red" class="white--text" @click="dialogdaterange = false">Close</v-btn>
                    <v-btn  color="blue" class="white--text" @click="daterange">Filter</v-btn>
                   
                </v-card>
            </v-dialog>  

            <v-dialog v-model="dialogdaterange2" persistent max-width="400px">
                  <v-card class="mx-auto">
                    <v-card-title class="yellow darken-2 white--text">
                    <span class="headline">Select Report Date Range</span>
                   
                    </v-card-title>
                   
                        <v-layout row wrap>
                        
                          <v-flex xs12 mt-3 mr-3 ml-3>
                            <v-text-field style="text-align: center;" @keyup.enter="daterange2" v-model="start_date2" autofocus type="date" label="Please enter from date" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 mr-3 ml-3>
                            <v-text-field style="text-align: center;" @keyup.enter="daterange2" v-model="end_date2" autofocus type="date" label="Please enter to date" required></v-text-field>
                        </v-flex>
                        </v-layout>  
                        <v-spacer></v-spacer>
                    <v-btn color="red" class="white--text" @click="dialogdaterange2 = false">Close</v-btn>
                    <v-btn  color="blue" class="white--text" @click="daterange2">Filter</v-btn>
                   
                </v-card>
            </v-dialog>  

             <v-dialog v-model="dialogdaterange3" persistent max-width="400px">
                  <v-card class="mx-auto">
                    <v-card-title class="yellow darken-2 white--text">
                    <span class="headline">Select Report Date Range</span>
                   
                    </v-card-title>
                   
                        <v-layout row wrap>
                        
                          <v-flex xs12 mt-3 mr-3 ml-3>
                            <v-text-field style="text-align: center;" @keyup.enter="daterange3" v-model="start_date3" autofocus type="date" label="Please enter from date" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 mr-3 ml-3>
                            <v-text-field style="text-align: center;" @keyup.enter="daterange3" v-model="end_date3" autofocus type="date" label="Please enter to date" required></v-text-field>
                        </v-flex>
                        </v-layout>  
                        <v-spacer></v-spacer>
                    <v-btn color="red" class="white--text" @click="dialogdaterange3 = false">Close</v-btn>
                    <v-btn  color="blue" class="white--text" @click="daterange3">Filter</v-btn>
                   
                </v-card>
            </v-dialog>  
  </div>
</template>
<script>
  import BookingChart2 from '@/components/BookingChart2'
  import MarketRates3 from '@/components/MarketRates3'
  import MarketRates4 from '@/components/MarketRates4'
   import SuperGraph11 from '@/components/SuperGraph11'
  import SuperGraph22 from '@/components/SuperGraph22'
  import Axios from  'axios-observable';
  export default {
    components: {
      BookingChart2,
      MarketRates3,
      MarketRates4,
      SuperGraph11,
      SuperGraph22
    },
    data() {
      return {
        nodeApi: 'http://localhost:8081',
        //nodeApi: 'http://localhost:8081',
        CurrencyPair: '',
        allClients: [],
        allRates:[],
        toggleCurrencies: [],
        timeP: 0,
        timeS: 0,
        timePP: 0,
        start_date: null,
        end_date:null,
        start_date2: null,
        end_date2:null,
        start_date3: null,
        end_date3:null,
        disable: false,
        branch:0,
        branch2:0,
        dialogdaterange: false,
        dialogdaterange2: false,
        dialogdaterange3: false,
        branches:[],
        allClientsCount:0,
        allUsersCount:0,
        toggleCurr: '',
        toggle: '',
        toggle2: '',
        togglebranch: '',
        allBranchesCount:0,
        image: '/img/',
        allUsers: [],
        allBranches:[],
        totalFloat: [],
        branchSelected:false
      }
    },
    mounted() {
      this.toggleCurr = 'WR USD'
      this.getAllClients()
      this.getAllBranches()
      this.getAllUsers()
      this.getAllRates(this.toggleCurr)
      this.getAllToggleCurrencies()
      this.getBranches()
      this.toggle = '1'
      
      this.toggle2 = '1'
      this.togglebranch = '1'
      this.timeP = 1
      this.timeS = 7
      this.timePP = 1
    },
    watch: {
      toggleCurr(val){
       // console.log(val)
        this.getAllRates(val)
      },
      toggle2(val){
        if(val == '1'){
          this.timeS = 7
        }
         if(val == '2'){
          this.timeS = 30
        }
         
      },
      toggle(val){
        if(val == '1'){
          this.timeP = 1
        }
         if(val == '2'){
          this.timeP = 8
        }
         if(val == '3'){
          this.timeP = 31
        }
        if(val == '4'){
          this.timeP = 0
        }
         if(val == '5'){
          this.timeP = 62
        }
      },
      togglebranch(val){
        if(val == '1'){
          this.timePP = 1
        }
         if(val == '2'){
          this.timePP = 8
        }
         if(val == '3'){
          this.timePP = 31
        }
        if(val == '4'){
          this.timePP = 0
        }
        if(val == '5'){
          this.timePP = 62
        }
      }
    },
    methods: {
      daterange(){
      
        if(this.start_date && this.end_date){
          var currentdate = new Date(this.end_date);        
          currentdate.setDate(currentdate.getDate() + 1);
          var fulldate = currentdate.toISOString();
          this.end_date = fulldate.substring(0, 10);

        this.timeP = {
          start_date:this.start_date,
          end_date:this.end_date
        }



        this.dialogdaterange = false
        this.start_date = null
        this.end_date = null
        }else{
          this.$swal.fire({
                                type: 'error',
                                title: 'Date Range Filter Error',
                                text: 'Please input a date range to filter.'
                            })
        }

        
      },

      daterange2(){
      
        if(this.start_date2 && this.end_date2){
          var currentdate = new Date(this.end_date2);        
          currentdate.setDate(currentdate.getDate() + 1);
          var fulldate = currentdate.toISOString();
          this.end_date2 = fulldate.substring(0, 10);

        this.timePP = {
          start_date:this.start_date2,
          end_date:this.end_date2
        }



        this.dialogdaterange2 = false
        this.start_date2 = null
        this.end_date2 = null
        }else{
          this.$swal.fire({
                                type: 'error',
                                title: 'Date Range Filter Error',
                                text: 'Please input a date range to filter.'
                            })
        }

        
      },
       daterange3(){
      
        if(this.start_date3 && this.end_date3){
          var currentdate = new Date(this.end_date3);        
          currentdate.setDate(currentdate.getDate() + 1);
          var fulldate = currentdate.toISOString();
          this.end_date3 = fulldate.substring(0, 10);

        this.timeS = {
          start_date:this.start_date3,
          end_date:this.end_date3
        }



        this.dialogdaterange3 = false
        this.start_date3 = null
        this.end_date3 = null
        }else{
          this.$swal.fire({
                                type: 'error',
                                title: 'Date Range Filter Error',
                                text: 'Please input a date range to filter.'
                            })
        }

        
      },
      selectedBranch2(data){
        this.branch2 = data
        this.branchSelected = true
        
       // console.log(data)
      },
      selectedBranch(data){
         this.branch = data
       // console.log(data)
      },
      async getBranches(){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         // console.log(headers)
        await Axios.get(this.nodeApi+'/getAllBranches',{headers:headers})
          .subscribe(res =>{
            this.branches = res.data.data.one.recordset
            
            //console.log(this.allRates)
          },err => console.log(err))
      },
      async getAllRates(data){
            let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         // console.log(headers)
        await Axios.post(this.nodeApi+'/getAllRatesByCurrencyID',{currency_id: data},{headers:headers})
          .subscribe(res =>{
            this.allRates = res.data.data.one.recordset
            
            //console.log(this.allRates)
          },err => console.log(err))
        },

         async getAllToggleCurrencies(){
            let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         // console.log(headers)
        await Axios.get(this.nodeApi+'/getAllToggleCurrencies',{headers:headers})
          .subscribe(res =>{
            this.toggleCurrencies = res.data.data.one.recordset
            
            //console.log(this.allRates)
          },err => console.log(err))
        },
      
      async getAllClients(){
            let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         // console.log(headers)
        await Axios.get(this.nodeApi+'/getAllClients',{headers:headers})
          .subscribe(res =>{
            this.allClients = res.data.data.one.recordset
            this.allClientsCount = this.allClients.length
            //console.log(this.companyData)
          },err => console.log(err))
        },
       async getAllBranches(){
            let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         // console.log(headers)
         await Axios.get(this.nodeApi+'/getAllBranches',{headers:headers})
          .subscribe(res =>{
            this.allBranches = res.data.data.one.recordset
            this.allBranchesCount = this.allBranches.length
            //console.log(this.companyData)
          },err => console.log(err))
        },
       async getAllUsers(){
            let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         // console.log(headers)
        await Axios.get(this.nodeApi+'/getAllTellerUsers',{headers:headers})
          .subscribe(res =>{
            this.allUsers = res.data.data.one.recordset
            this.allUsersCount = this.allUsers.length
            //console.log(this.companyData)
          },err => console.log(err))
        },
      async  getTotalFloat(){
            let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         // console.log(headers)
        await Axios.get(this.nodeApi+'/getAllBranches',{headers:headers})
          .subscribe(res =>{
            this.totalFloat = res.data.data.one.recordset
            //console.log(this.companyData)
          },err => console.log(err))
        }
    },
  }
</script>

<style scoped>
.image{
    width: 150px;
    height: 100%;
    margin: 3px;
  }
  .image2{
    width: 50px;
    height: 100%;
    margin: 3px;
  }
  .echarts {
    height: 350px;
  }
  .card {
    height: 60px;
  }
  .cardRev1 {
    border-left: 5px solid #0cb2cf;
  }
  .cardRev2 {
    border-left: 5px solid #d4c706;
  }
  .cardRev3 {
    border-left: 5px solid #1adf34;
  }
  .cardRev4 {
    border-left: 5px solid #f52323;
  }
  .h4Rev{
    color: #088f08;
  }
</style>




