<template>
  <div>
    
   <v-layout row justify-end>
     <h2 style="color:green;">Full Over-all Utilities Report</h2>
   </v-layout>
    <v-layout row wrap justify-end>
       
       <v-flex xs12 sm12 md3 pa-2 v-for="item in tranTotals" :key="item.id" >
        <v-card hover>
          <v-flex mb-2 class="card cardRev3">
            <v-layout ma-1>
              <img src="../assets/imgs/currency.fw.png" class="image">
              <v-flex style="text-align: right;padding: 3px;">
                <h2 style="color:green;">Total {{item.transaction_typeT}}</h2>
                <h3 style="color:blue;">{{item.receive_currencyT}} {{parseFloat(item.receive_amountT).toFixed(2)}}</h3>
                <!-- <h3 style="color:red;">{{item.disbursed_currencyT}} {{parseFloat(item.disburse_amountT).toFixed(2)}} </h3> -->
               
               
              </v-flex>
            </v-layout>
          </v-flex>
        </v-card>
        
      </v-flex>
    </v-layout>
    
    
       <v-layout row wrap justify-end>
         <v-flex xs12 sm6 md2 mb-2 mr-5>
            <v-text-field
                    v-model="transactionID"
                    append-icon="search"
                    label="Search By Transaction ID#"
                    single-line
                    type="number"
                    hide-details
                    @keyup.enter="getAllTransactionsByID"
                    
            ></v-text-field>
         </v-flex>
        
         <v-flex xs12 sm4 md2 mr-5 v-show="toggle !== `3` && toggle !== `4` && toggle !== `1`">
            <v-select
                   
                    :items="branches"
                    label="Select Branch"
                    @input="selectedBranch"
                    item-text="branchname"
                    item-value="id"   
            ></v-select>
        </v-flex>
        <v-flex xs12 sm4 md2 mr-5 v-show="toggle !== `2` && toggle !== `4` && toggle !== `1`">
            <v-select
                   
                    :items="tellers"
                    label="Select Teller"
                    @input="selectedTeller"
                    item-text="username"
                    item-value="id"   
            ></v-select>
        </v-flex> 

        <v-flex xs12 sm6 md3 mt-2>
              
              <v-btn-toggle mandatory v-model="toggle" color="primary">
                <v-btn flat value="1">
                  All
                </v-btn>
                <v-btn flat value="2">
                  Branches Only
                </v-btn>
                <v-btn flat value="3">
                  Tellers Only
                </v-btn>
                
              </v-btn-toggle>
            </v-flex>

           <v-flex xs12 sm6 md4 mt-1>
              
              <v-btn-toggle mandatory v-model="toggleDates" color="primary">
                
                <v-btn flat value="2">
                  Today
                </v-btn>
                <v-btn flat value="3">
                 This month
                </v-btn> 
              </v-btn-toggle>
               <v-btn color="primary" @click="dialogdaterange = true">
                  Specific Range
                </v-btn>

                <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon @click="exportExcel">
                <export-excel
                      class   = "btn btn-default"
                      :data   = "rows"
                      :fields = "json_fields"
                      worksheet = "Tran_Worksheet"
                      name    = "TransactionsReport.xls">
                  
                     <v-icon v-on="on" color="green darken-2">library_add</v-icon>
                  
                  </export-excel>
              </v-btn>
            </template>
            <span>Export to excel</span>
          </v-tooltip>
            </v-flex>
      
        </v-layout>
       <v-layout row justify-end>

        <v-flex xs12>


            <v-data-table
                   
                    :headers="paymentHeaders"
                    :items="rows"
                    item-key="tran_id"
                    must-sort
                   :pagination.sync="pagination"
                    class="elevation-1"
                    width="10"                  
                    :search="search"                   
            >
                
                <template v-slot:items="props">
                    <tr>                   
                        
                       
                        <td >{{ props.item.id}}</td>
                         <td >{{ props.item.created_at}}</td>
                         <td v-show="toggle !== `3`">{{ props.item.branch_name}}</td>
                         <td >
                           <v-chip label color="red" text-color="white" v-if="props.item.transaction_type.replace(/\s/g, '') == 'Sell'">
                              {{ props.item.transaction_type }}
                            </v-chip>
                            <v-chip label color="green" text-color="white" v-if="props.item.transaction_type.replace(/\s/g, '') == 'Buy'">
                              {{ props.item.transaction_type }}
                            </v-chip>
                             <v-chip label color="blue" text-color="white" v-if="props.item.transaction_type.replace(/\s/g, '') == 'FloatIn'">
                              {{ props.item.transaction_type }}
                            </v-chip>
                            <v-chip label color="purple" text-color="white" v-if="props.item.transaction_type.replace(/\s/g, '') == 'FloatOut'">
                              {{ props.item.transaction_type }}
                            </v-chip>
                            <v-chip label color="purple" text-color="white" v-if="props.item.transaction_type.replace(/\s/g, '') == 'Utility'">
                              {{ props.item.transaction_type }}
                            </v-chip>
                         </td>
                        <td >{{props.item.meter_number}}</td>
                        <td  >{{props.item.receive_currency +' '+ parseFloat(props.item.receive_amount).toFixed(2) }}</td>
                        <td  >
                          {{props.item.utility }}
                          <v-chip label color="green" text-color="white" v-if="props.item.utility == 'DStv'">
                              {{ props.item.product }}
                            </v-chip>

                        </td>
                        <td  >{{ props.item.first_name}} {{ props.item.last_name}}</td>
                        <td  v-show="toggle !== `2` ">{{props.item.created_by }}</td>
                        
                       
                        <td id="chip-usage-example">
                         
                            <v-chip label color="red" text-color="white" v-if="props.item.status.replace(/\s/g, '') == 'canceled'">
                              {{ props.item.status }}
                            </v-chip>
                             <v-chip label color="gray" v-if="props.item.status.replace(/\s/g, '') == 'pending'">
                              {{ props.item.status }}
                            </v-chip>
                             
                            <v-chip label color="red" text-color="white" v-if="props.item.status.replace(/\s/g, '') == 'declined'">
                             declined
                            </v-chip>
                             <v-chip label color="red" text-color="white" v-if="props.item.status.replace(/\s/g, '') == 'reversed'">
                             reversed
                            </v-chip>
                            <v-chip label color="blue" text-color="white" v-if="props.item.status.replace(/\s/g, '') == 'complete'">
                              {{ props.item.status }}
                            </v-chip>
                            <v-chip pill color="gray"  v-if="props.item.status.replace(/\s/g, '') == 'confirmed'">
                               <v-icon left color="blue">person_pin</v-icon>
                              
                             Teller
                            </v-chip>
                            <v-chip pill color="gray"  v-if="props.item.status.replace(/\s/g, '') == 'GM'">
                               <v-icon left color="red">person_pin</v-icon>
                              
                               
                             Manager
                            </v-chip>
                            <v-chip color="gray" v-if="props.item.status.replace(/\s/g, '') == 'SP'">
                               <v-icon left color="red">person_pin</v-icon>
                             Supervisor
                            </v-chip>
                            <v-chip pill color="gray"  v-if="props.item.status.replace(/\s/g, '') == 'TR'">
                              <v-icon left color="red">person_pin</v-icon>
                              Treasury
                            </v-chip>
                            
                           
                        </td>
                        <td>
                          <v-tooltip bottom v-if="props.item.status.replace(/\s/g, '') == 'complete' && props.item.transaction_type.replace(/\s/g, '') == 'Sell' || props.item.status.replace(/\s/g, '') == 'complete' && props.item.transaction_type.replace(/\s/g, '') == 'Buy'">
                                <template v-slot:activator="{ on }">
                              <v-btn small color="success" icon @click="Reverse(props.item)">
                                       
                                    
                                        <v-icon v-on="on" medium class="white--text">
                                        cached
                                        </v-icon>
                                    
                                </v-btn>
                                </template>
                                <span>Reverse Transaction</span>
                              </v-tooltip>

                              
                          <v-chip label color="red" text-color="white" v-if="props.item.status.replace(/\s/g, '') == 'reversed'">
                              {{ props.item.reversed_by }} @ {{ props.item.reversed_at }}
                            </v-chip>
                        </td>
                    </tr>
                </template>
                <template v-slot:expand="props">
                  <v-card flat>
                    <v-card-text>{{props.item.tran_description}}</v-card-text>
                  </v-card>
                </template>
            </v-data-table>

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
  </div>
</template>
<script>
import * as jsPDF from 'jspdf'
import * as autoTable from 'jspdf-autotable'
import Axios from  'axios-observable';
  export default {
   
    data: () => ({
       allRates:[],
       disable: false,
        totalFloat: [],
      expand: false,
      show_start_date: false,
      dialogdaterange: false,
      nodeApi: 'http://localhost:8081',
      start_date: null,
      is_charged:null,
      show_end_date: false,
      end_date: null,
      transactionID: null,
      now_date:null,
      branch_id:null,
      user_id:null,
      selectedBranches:null,
      selectedTellers:null,
      branches:[],
      tellers:[],
      user_type: 0,
      center_id :'',
      centreCurrency : '',
      rowsFilter: [],
      tranTotals: [],
      text: 'center',
      icon: 'justify',
      toggle_none: null,
      toggle_one: 0,
      toggle_exclusive: 2,
      toggle_multiple: [0, 1, 2],
      
      search:'',
      filters: {
        search: '',
        added_by: '',
        start_date: null,
        end_date: null,
      },
      authors: ['Buy', 'Sell'],
      pagination: {
         sortBy: 'id',
        'descending': true,
        rowsPerPage: 15
      },
      selected: [],
      filteredRow: [],
      symbol: '',
      toggle:"1",
      toggleDates:"2",
      //Excel data
      
        json_fields: {
          'Transaction ID':'id',
          'Transaction Date Time':'created_at',
           'Transaction Type' :'transaction_type',

           'Client First Name':'first_name',
           'Client Last Name':'last_name',
           'Client ID Number':'id_number',

           'Receive Currency':'receive_currency',
           'Receive Amount' :'receive_amount',
          

           'Transaction Status':'status',
           'Created By':'created_by',
           'Branch Name':'name',

            '_____________':'space',

           'Transaction Total Type': 'transaction_typeT',
           'Received Currency': 'receive_currencyT',
           'Total Received Amount': 'receive_amountT',
                       
               
        },
        json_data: [
            
        ],
        json_meta: [
            [
                {
                    'key': 'charset',
                    'value': 'utf-8'
                }
            ]
        ],
        //End of excel data

      rows: []
    }),
    watch: {
      dialogdaterange(val){
        if(val == true){

        }if(val == false){
          this.start_date = null
          this.end_date = null
        }
      },
      toggle(val){
        //  if(val == '1' && this.toggleDates == '1'){
        //    this.disable = false
        //    this.tranTotals = []
        //    this.getAllTransactions()
        // }
        if(val == '1' && this.toggleDates == '2'){
          this.disable = true
           this.tranTotals = []
           this.getAllTransactionsNow()
        }
        if(val == '1' && this.toggleDates == '3'){
          this.disable = true
           this.tranTotals = []
           this.getAllTransactionsMonthNow()
        }
        
        // if(val == '2' && this.toggleDates == '1'){
          
         
        //     this.disable = false
        //    if(this.branch_id == null){
        //      this.getBranches()
            
        //       this.tranTotals = []
        //       this.getAllTransactions()
        //    }else{
        //      this.getBranches()
        //    // this.tranTotals = []
        //       this.selectedBranch(this.branch_id)
        //    }

        // }
        if(val == '2' && this.toggleDates == '2'){
           
          this.disable = true
           if(this.branch_id == null){
             this.getBranches()
            
              this.tranTotals = []
              this.getAllTransactionsNow()
           }else{
             this.getBranches()
            //this.tranTotals = []
              this.selectedBranch(this.branch_id)
           }
          
        }
        if(val == '2' && this.toggleDates == '3'){
            
          this.disable = true
           if(this.branch_id == null){
             this.getBranches()
            
              this.tranTotals = []
              this.getAllBranchTransactionsMonthNow()
           }else{
             this.getBranches()
            //this.tranTotals = []
              this.selectedBranch(this.branch_id)
           }
        }
        // if(val == '3' && this.toggleDates == '1'){
                 

        //     this.disable = false
        //    if(this.user_id == null){
        //       this.tranTotals = []
             
        //        this.getTellers()
        //       this.getAllTransactions()
        //    }else{
        //      this.getTellers()
        //    // this.tranTotals = []
        //       this.selectedTeller(this.user_id)
        //    }
        // }
        if(val == '3' && this.toggleDates == '2'){
          
           this.disable = true
           if(this.user_id == null){
              this.getTellers()
            
              this.tranTotals = []
              this.getAllTransactionsNow()
           }else{
              this.getTellers()
            //this.tranTotals = []
              this.selectedTeller(this.user_id)
           }
        }
        if(val == '3' && this.toggleDates == '3'){
         this.disable = true
           if(this.user_id == null){
              this.getTellers()
            
           this.tranTotals = []
           this.getAllTransactionsMonthNow()
           }else{
              this.getTellers()
            //this.tranTotals = []
              this.selectedTeller(this.user_id)
           }
        }
        if(val == '4' && this.toggleDates == '2'){
          this.disable = true
           this.tranTotals = []
           //this.getAllTransactionsNow()
           this.getAllReversalsNow()
        }
        if(val == '4' && this.toggleDates == '3'){
          this.disable = true
           this.tranTotals = []
           //this.getAllTransactionsMonthNow()
           this.getAllReversalsMonthNow()
        }
      },
      
      toggleDates(val){
           if(val == '2' && this.toggle == '4'){
          this.disable = true
           this.tranTotals = []
           this.getAllReversalsNow()
        }
        if(val == '3' && this.toggle == '4'){
          this.disable = true
           this.tranTotals = []
          this.getAllReversalsMonthNow()
        }



         if(val == '1' && this.toggle == '1'){
           this.disable = false
           this.tranTotals = []
           this.getAllTransactions()
        }
        if(val == '2' && this.toggle == '1'){
          this.disable = true
           this.tranTotals = []
           this.getAllTransactionsNow()
        }
        if(val == '3' && this.toggle == '1'){
          this.disable = true
           this.tranTotals = []
           this.getAllTransactionsMonthNow()
        }

         if(val == '1' && this.toggle == '2'){
           
          this.disable = false
           if(this.branch_id == null){
             this.getBranches()
            
              this.tranTotals = []
              this.getAllTransactions()
           }else{
             this.getBranches()
           // this.tranTotals = []
              this.selectedBranch(this.branch_id)
           }
        }
         if(val == '2' && this.toggle == '2'){
           this.disable = true
           if(this.branch_id == null){
             this.getBranches()
            
              this.tranTotals = []
              this.getAllTransactionsNow()
           }else{
             this.getBranches()
           // this.tranTotals = []
              this.selectedBranch(this.branch_id)
           }
          
        }
         if(val == '3' && this.toggle == '2'){
           this.disable = true
           if(this.branch_id == null){
             this.getBranches()
            
              this.tranTotals = []
              this.getAllBranchTransactionsMonthNow()
           }else{
             this.getBranches()
            //this.tranTotals = []
              this.selectedBranch(this.branch_id)
           }
        }

        if(val == '1' && this.toggle == '3'){
            this.disable = false
           if(this.user_id == null){
              this.tranTotals = []
             
               this.getTellers()
              this.getAllTransactions()
           }else{
             this.getTellers()
           // this.tranTotals = []
              this.selectedTeller(this.user_id)
           }
        }
         if(val == '2' && this.toggle == '3'){
           this.disable = true
           if(this.user_id == null){
              this.getTellers()
            
              this.tranTotals = []
              this.getAllTransactionsNow()
           }else{
              this.getTellers()
            //this.tranTotals = []
              this.selectedTeller(this.user_id)
           }
        }
         if(val == '3' && this.toggle == '3'){
         this.disable = true
           if(this.user_id == null){
              this.getTellers()
            
           this.tranTotals = []
           this.getAllTransactionsMonthNow()
           }else{
              this.getTellers()
            //this.tranTotals = []
              this.selectedTeller(this.user_id)
           }
        }
      },
      tranTotals(val){
        if(val.length > 0){
          
          val.forEach(element => {
           //setTimeout(() =>{ this.rows.push(element);console.log(this.rows)},1000);             
          });
          
          
        }
        
      },
      rowsFilter(val){
       // console.log(val)
      },
      customFilter(val){
        //console.log(val)
      },
      rows(val){
        
      },
      filters(val){
        //console.log(val)
      }
    },
    beforeMount() {
      
    },
    computed:{
      paymentHeaders(){
        if(this.toggle == "1"){
          let paymentHeaders = [
        
        {
          text: 'Tran id',
          value: 'id'
        },
        {
          text: 'Date',
          
          value: 'created_at'
        },
        {
          text: 'Branch',
          value: 'name'
        },
        {
          text: 'Type',
          value: 'transaction_type'
        },
        {
          text: 'Account Number',
          value: 'meter_number'
        },
        {
          text: 'Received $',
          value: 'receive_amount'
        }
       ,
        {
          text: 'Utility',
          value: 'utility'
        },
        {
          text: 'Client',
          value: 'first_name'
        },
        {
          text: 'Teller',
          value: 'created_by',
         
        },
        {
          text: 'Status',
          value: 'status'
        }
      ]

        return paymentHeaders;
      
        }

        else if(this.toggle == "2"){
          let paymentHeaders = [
        
         {
          text: 'Tran id',
          value: 'id'
        },
        {
          text: 'Date',
          
          value: 'created_at'
        },
        {
          text: 'Branch',
          value: 'name'
        },
        {
          text: 'Type',
          value: 'transaction_type'
        },
        {
          text: 'Account Number',
          value: 'meter_number'
        },
        {
          text: 'Received $',
          value: 'receive_amount'
        }
       ,
        {
          text: 'Utility',
          value: 'utility'
        },
        {
          text: 'Client',
          value: 'first_name'
        },
        {
          text: 'Status',
          value: 'status'
        }
      ]

        return paymentHeaders;
      
        }

        else if(this.toggle == "3"){
          let paymentHeaders = [
        
         {
          text: 'Tran id',
          value: 'id'
        },
        {
          text: 'Date',
          
          value: 'created_at'
        },
        {
          text: 'Type',
          value: 'transaction_type'
        },
        {
          text: 'Account Number',
          value: 'meter_number'
        },
        {
          text: 'Received $',
          value: 'receive_amount'
        }
       ,
        {
          text: 'Utility',
          value: 'utility'
        },
        {
          text: 'Client',
          value: 'first_name'
        },
        {
          text: 'Teller',
          value: 'created_by',
         
        },
        {
          text: 'Status',
          value: 'status'
        }
      ]

        return paymentHeaders;
      
        }

        else if(this.toggle == "4"){
          let paymentHeaders = [
        
         {
          text: 'Tran id',
          value: 'id'
        },
        {
          text: 'Date',
          
          value: 'created_at'
        },
        {
          text: 'Branch',
          value: 'name'
        },
        {
          text: 'Type',
          value: 'transaction_type'
        },
        {
          text: 'Rate Cost',
          value: 'rate'
        },
        {
          text: 'Received $',
          value: 'receive_amount'
        }
        ,
        {
          text: 'Disbursed $',
          value: 'disburse_amount'
          
        },
        
        {
          text: 'Client',
          value: 'first_name'
        },
        {
          text: 'Teller',
          value: 'created_by',
         
        },
        {
          text: 'Status',
          value: 'status'
        } ,
        {
          text: 'Action',
          value: 'status'
        }
      ]

        return paymentHeaders;
      
        }


        else{
          let paymentHeaders = [
       {
          text: 'Tran id',
          value: 'id'
        },
        {
          text: 'Date',
          
          value: 'created_at'
        },
        {
          text: 'Branch',
          value: 'name'
        },
        {
          text: 'Type',
          value: 'transaction_type'
        },
        {
          text: 'Rate Cost',
          value: 'rate'
        },
        {
          text: 'Received $',
          value: 'receive_amount'
        }
        ,
        {
          text: 'Disbursed $',
          value: 'disburse_amount'
          
        },
        
        {
          text: 'Client',
          value: 'first_name'
        },
        {
          text: 'Teller',
          value: 'created_by',
         
        },
        {
          text: 'Status',
          value: 'status'
        } ,
        {
          text: 'Action',
          value: 'status'
        }
      ]

        return paymentHeaders;
      
        }
      }
    
     },
    mounted() {
      this.getAllRates()
       this.user_type = this.$session.get('user').userdetails.user_type
          this.convertDate()     
        
        this.getAllTransactions()
        // console.log(this.now_date)
    },
    methods: {
      convertDate(){
        var rawDate = new Date
        this.now_date = rawDate.toISOString();
      },

     async daterange(){

        var currentdate = new Date(this.end_date);        
        currentdate.setDate(currentdate.getDate() + 1);
        var fulldate = currentdate.toISOString();
        this.end_date = fulldate.substring(0, 10);

     //   console.log(this.start_date)
      //  console.log(this.end_date)
      if(this.toggle == '1' && this.toggleDates == '2'){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         await  Axios.post(this.nodeApi+'/getAllTransactionsSpecificUtil',{start:this.start_date,end:this.end_date},{headers:headers})
          .subscribe(res =>{
            this.rows = res.data.data.one.recordset
            this.dialogdaterange = false
            //console.log(this.companyData)
          },err => console.log(err)) 

          await  Axios.post(this.nodeApi+'/getAllTransactionsSumSpecificUtil',{start:this.start_date,end:this.end_date},{headers:headers})
          .subscribe(res =>{
            this.tranTotals = res.data.data.one.recordset
            //this.dialogdaterange = false
            //console.log(this.companyData)
          },err => console.log(err)) 
      }
       if(this.toggle == '2' && this.toggleDates == '2' && this.branch_id == null){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         await  Axios.post(this.nodeApi+'/getAllTransactionsSpecificUtil',{start:this.start_date,end:this.end_date},{headers:headers})
          .subscribe(res =>{
            this.rows = res.data.data.one.recordset
            this.dialogdaterange = false
            //console.log(this.companyData)
          },err => console.log(err)) 
          await  Axios.post(this.nodeApi+'/getAllTransactionsSumSpecificUtil',{start:this.start_date,end:this.end_date},{headers:headers})
          .subscribe(res =>{
            this.tranTotals = res.data.data.one.recordset
            //this.dialogdaterange = false
            //console.log(this.companyData)
          },err => console.log(err)) 
      }
      if(this.toggle == '2' && this.toggleDates == '2' && this.branch_id != null){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         await  Axios.post(this.nodeApi+'/getAllBranchTransactionsSpecificUtil',{start:this.start_date,end:this.end_date,branch_id:this.branch_id},{headers:headers})
          .subscribe(res =>{
            this.rows = res.data.data.one.recordset
            this.dialogdaterange = false
            //console.log(this.companyData)
          },err => console.log(err)) 

           await  Axios.post(this.nodeApi+'/getAllBranchTransactionsSumSpecificUtil',{start:this.start_date,end:this.end_date,branch_id:this.branch_id},{headers:headers})
          .subscribe(res =>{
            this.tranTotals = res.data.data.one.recordset
            //this.dialogdaterange = false
            //console.log(this.companyData)
          },err => console.log(err)) 

          
      }

      if(this.toggle == '3' && this.toggleDates == '2' && this.user_id == null){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
        await  Axios.post(this.nodeApi+'/getAllTransactionsSpecificUtil',{start:this.start_date,end:this.end_date},{headers:headers})
          .subscribe(res =>{
            this.rows = res.data.data.one.recordset
            this.dialogdaterange = false
            //console.log(this.companyData)
          },err => console.log(err)) 

          
          
      }

      if(this.toggle == '3' && this.toggleDates == '2' && this.user_id != null){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         await  Axios.post(this.nodeApi+'/getAllTellerTransactionsSpecificUtil',{start:this.start_date,end:this.end_date,user_id:this.user_id},{headers:headers})
          .subscribe(res =>{
            this.rows = res.data.data.one.recordset
            this.dialogdaterange = false
            //console.log(this.companyData)
          },err => console.log(err)) 

           await  Axios.post(this.nodeApi+'/getAllTellerTransactionsSumSpecificUtil',{start:this.start_date,end:this.end_date,user_id:this.user_id},{headers:headers})
          .subscribe(res =>{
            this.tranTotals = res.data.data.one.recordset
            //this.dialogdaterange = false
            //console.log(this.companyData)
          },err => console.log(err)) 

          
      }

      if(this.toggle == '4'){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         await  Axios.post(this.nodeApi+'/getAllReversalsSpecific',{start:this.start_date,end:this.end_date,user_id:this.user_id},{headers:headers})
          .subscribe(res =>{
            this.rows = res.data.data.one.recordset
            this.dialogdaterange = false
            //console.log(this.companyData)
          },err => console.log(err)) 

          
          
      }
        
      },
      Reverse(data){
         let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token
            
        }
            this.$swal.fire({ 
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Reverse transaction!'
            }).then((result) => {
            if (result.value) {
              //console.log(data)
           let transactionObject = {
                      id: data.id,
                      rev_id: this.$session.get('user').userdetails.id,                      
                      floatincrease: {col:'amount',value:data.disburse_amount,wcol:'user_id',wvalue:data.user_id,wcol2:'currency_id',wvalue2:data.disburse_currency_id},
                      floatdecrease: {col:'amount',value:data.receive_amount,wcol:'user_id',wvalue:data.user_id,wcol2:'currency_id',wvalue2:data.received_currency_id}
            }

       Axios.post(this.nodeApi+'/reverseTransactionBuySell',transactionObject,{headers:headers})
                      .subscribe(res =>{ 
                       //console.log(res.data.message)
                         
                        if(res.data.message){
                         this.$swal.fire({
                            type: 'error',
                            title: 'Transaction Reverse Failed',
                            text:  res.data.message
                          })
                           
                        }     
                        else {
                          this.getAllTransactions()
                        
                            this.$swal.fire({
                              type: 'success',
                              title: 'Transaction Added',
                              text:  'Transaction was added successfully'
                            })
                            this.dialogTransaction = false
                            
                            this.$emit('settlement','complete')
                          
                        }                 
                        
                      },err => {
                         this.$swal.fire({
                            type: 'error',
                            title: 'Transaction Adding Failed',
                            text:  res.data.message
                          })
                      })

       
            }
            })
        
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
     async getTellers(){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         // console.log(headers)
        await Axios.get(this.nodeApi+'/getAllTellerUsers',{headers:headers})
          .subscribe(res =>{
            this.tellers = res.data.data.one.recordset
            
            //console.log(this.allRates)
          },err => console.log(err))
      },
       selectedBranch(data){
        //console.log(data)
        this.branch_id = data
        if(this.toggle == '2' && this.toggleDates == '1'){
          this.getAllBranchTransactions(data)
         this.getAllBranchTransactionsSum(data)
         
         
        }
        if(this.toggle == '2' && this.toggleDates == '2'){
          this.getAllBranchTransactionsNowByID(data)
         this.getAllBranchTransactionsSumNow(data)
         
        }
        if(this.toggle == '2' && this.toggleDates == '3'){
          this.getAllBranchTransactionsMonthNowByID(data)
         this.getAllBranchTransactionsSumMonthNow(data)
        
        }
        
      },
      selectedTeller(data){
       // console.log(data)
       

        this.user_id = data
        if(this.toggle == '3' && this.toggleDates == '1'){
         this.getAllTellerTransactions(data)
        this.getAllTellerTransactionsSum(data)
       
        }
        if(this.toggle == '3' && this.toggleDates == '2'){
          this.getAllTellerTransactionsNowByID(data)
         this.getAllTellerTransactionsSumNow(data)
         
        }
        if(this.toggle == '3' && this.toggleDates == '3'){
          this.getAllTellerTransactionsMonthNowByID(data)
         this.getAllTellerTransactionsSumMonthNow(data)

         
        }
      },
      async getAllRates(){
            let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         // console.log(headers)
        await Axios.get(this.nodeApi+'/getAllRates',{headers:headers})
          .subscribe(res =>{
            this.allRates = res.data.data.one.recordset
            
            //console.log(this.allRates)
          },err => console.log(err))
        },
      
     async getAllTransactions(){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
        await   Axios.get(this.nodeApi+'/getAllTransactionsNowUtil',{headers:headers})
          .subscribe(res =>{
            this.rows = res.data.data.one.recordset
             //console.log(this.companyData)
          },err => console.log(err)) 

         await  Axios.get(this.nodeApi+'/getAllTransactionsSumNowUtil',{headers:headers})
          .subscribe(res =>{
            this.tranTotals = res.data.data.one.recordset
            //this.dialogdaterange = false
            //console.log(this.companyData)
          },err => console.log(err)) 
          
      },
     async getAllTransactionsNow(){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
       await   Axios.get(this.nodeApi+'/getAllTransactionsNowUtil',{headers:headers})
          .subscribe(res =>{
            this.rows = res.data.data.one.recordset
             //console.log(this.companyData)
          },err => console.log(err)) 

         await  Axios.get(this.nodeApi+'/getAllTransactionsSumNowUtil',{headers:headers})
          .subscribe(res =>{
            this.tranTotals = res.data.data.one.recordset
            //this.dialogdaterange = false
            //console.log(this.companyData)
          },err => console.log(err)) 
          
          
          
      },
      async getAllReversalsNow(){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         await  Axios.get(this.nodeApi+'/getAllReversalsNow',{headers:headers})
          .subscribe(res =>{
            this.rows = res.data.data.one.recordset
            //console.log(this.companyData)
          },err => console.log(err)) 

          //  await  Axios.get(this.nodeApi+'/getAllTransactionsSumNow',{headers:headers})
          // .subscribe(res =>{
          //   this.tranTotals = res.data.data.one.recordset
          //   //this.dialogdaterange = false
          //   //console.log(this.companyData)
          // },err => console.log(err)) 
          
          
      },
      async getAllReversalsMonthNow(){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         await  Axios.get(this.nodeApi+'/getAllReversalsMonthNow',{headers:headers})
          .subscribe(res =>{
            this.rows = res.data.data.one.recordset
            //console.log(this.companyData)
          },err => console.log(err)) 

          //  await  Axios.get(this.nodeApi+'/getAllTransactionsSumNow',{headers:headers})
          // .subscribe(res =>{
          //   this.tranTotals = res.data.data.one.recordset
          //   //this.dialogdaterange = false
          //   //console.log(this.companyData)
          // },err => console.log(err)) 
          
          
      },
      async getAllBranchTransactionsByID(data){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         await  Axios.post(this.nodeApi+'/getAllBranchTransactionsByID',{branch_id:data},{headers:headers})
          .subscribe(res =>{
            this.rows = res.data.data.one.recordset
            //console.log(this.companyData)
          },err => console.log(err)) 
          
      },
       async getAllTransactionsByID(data){
      //   console.log(this.transactionID)
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         await  Axios.post(this.nodeApi+'/getAllTransactionsByID',{tran_id:this.transactionID},{headers:headers})
          .subscribe(res =>{
            this.rows = res.data.data.one.recordset
            //console.log(this.companyData)
          },err => console.log(err)) 
          
      },
     async getAllTransactionsMonthNow(){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
        await  Axios.get(this.nodeApi+'/getAllTransactionsMonthNowUtil',{headers:headers})
          .subscribe(res =>{
            this.rows = res.data.data.one.recordset
            //console.log(this.companyData)
          },err => console.log(err)) 
          
      },
    async  getAllBranchTransactions(data){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         await  Axios.post(this.nodeApi+'/getAllBranchTransactionsUtil',{branch_id:data},{headers:headers})
          .subscribe(res =>{
            this.rows = res.data.data.one.recordset
            //console.log(this.companyData)
          },err => console.log(err)) 
          
      },
      async  getAllBranchTransactionsNowByID(data){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         await  Axios.post(this.nodeApi+'/getAllBranchTransactionsNowByIDUtil',{branch_id:data},{headers:headers})
          .subscribe(res =>{
            this.rows = res.data.data.one.recordset
            //console.log(this.companyData)
          },err => console.log(err)) 
          
      },
      async  getAllBranchTransactionsNow(data){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         await  Axios.post(this.nodeApi+'/getAllBranchTransactionsNowUtil',{branch_id:data},{headers:headers})
          .subscribe(res =>{
            this.rows = res.data.data.one.recordset
            //console.log(this.companyData)
          },err => console.log(err)) 
          
      },
      async  getAllBranchTransactionsMonthNow(data){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         await  Axios.get(this.nodeApi+'/getAllBranchTransactionsMonthNowUtil',{headers:headers})
          .subscribe(res =>{
            this.rows = res.data.data.one.recordset
            //console.log(this.companyData)
          },err => console.log(err)) 
          
      },
       async  getAllBranchTransactionsMonthNowByID(data){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         await  Axios.post(this.nodeApi+'/getAllBranchTransactionsMonthNowByIDUtil',{branch_id:data},{headers:headers})
          .subscribe(res =>{
            this.rows = res.data.data.one.recordset
            //console.log(this.companyData)
          },err => console.log(err)) 
          
      },
    async  getAllTellerTransactions(data){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         await  Axios.post(this.nodeApi+'/getAllTellerTransactionsUtil',{user_id:data},{headers:headers})
          .subscribe(res =>{
            this.rows = res.data.data.one.recordset
            //console.log(this.companyData)
          },err => console.log(err)) 
          
      },
      async  getAllTellerTransactionsNowByID(data){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         await  Axios.post(this.nodeApi+'/getAllTellerTransactionsNowByIDUtil',{user_id:data},{headers:headers})
          .subscribe(res =>{
            this.rows = res.data.data.one.recordset
            //console.log(this.companyData)
          },err => console.log(err)) 
          
      },
      async  getAllTellerTransactionsMonthNowByID(data){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         await  Axios.post(this.nodeApi+'/getAllTellerTransactionsMonthNowByIDUtil',{user_id:data},{headers:headers})
          .subscribe(res =>{
            this.rows = res.data.data.one.recordset
            //console.log(this.companyData)
          },err => console.log(err)) 
          
      },
    async  getAllBranchTransactionsSum(data){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
        await   Axios.post(this.nodeApi+'/getAllBranchTransactionsSumUtil',{branch_id:data},{headers:headers})
          .subscribe(res =>{
            this.tranTotals = res.data.data.one.recordset

            this.totalFloat.forEach(element => {
              this.rows.push(element)
            });
            //console.log(this.rows)
          },err => console.log(err)) 
          
      },
       async  getAllBranchTransactionsSumNow(data){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
        await   Axios.post(this.nodeApi+'/getAllBranchTransactionsSumNowUtil',{branch_id:data},{headers:headers})
          .subscribe(res =>{
            this.tranTotals = res.data.data.one.recordset
            
             this.totalFloat.forEach(element => {
              this.rows.push(element)
            });
            //console.log(this.rows)
          },err => console.log(err)) 
          
      },
      async  getAllBranchTransactionsSumNowByID(data){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
        await   Axios.post(this.nodeApi+'/getAllBranchTransactionsSumNowByIDUtil',{branch_id:data},{headers:headers})
          .subscribe(res =>{
            this.tranTotals = res.data.data.one.recordset
            
             this.totalFloat.forEach(element => {
              this.rows.push(element)
            });
            //console.log(this.rows)
          },err => console.log(err)) 
          
      },
       async  getAllBranchTransactionsSumMonthNow(data){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
        await   Axios.post(this.nodeApi+'/getAllBranchTransactionsSumMonthNowUtil',{branch_id:data},{headers:headers})
          .subscribe(res =>{
            this.tranTotals = res.data.data.one.recordset
            
             this.totalFloat.forEach(element => {
              this.rows.push(element)
            });
           // console.log(this.rows)
          },err => console.log(err)) 
          
      },
    async  getAllTellerTransactionsSum(data){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
        await   Axios.post(this.nodeApi+'/getAllTellerTransactionsSumUtil',{user_id:data},{headers:headers})
          .subscribe(res =>{
            this.tranTotals = res.data.data.one.recordset
            //console.log(this.companyData)
          },err => console.log(err)) 
          
      },
      async  getAllTellerTransactionsSumNow(data){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
        await   Axios.post(this.nodeApi+'/getAllTellerTransactionsSumNowUtil',{user_id:data},{headers:headers})
          .subscribe(res =>{
            this.tranTotals = res.data.data.one.recordset
            //console.log(this.companyData)
          },err => console.log(err)) 
          
      },
      async  getAllTellerTransactionsSumMonthNow(data){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
        await   Axios.post(this.nodeApi+'/getAllTellerTransactionsSumMonthNowUtil',{user_id:data},{headers:headers})
          .subscribe(res =>{
            this.tranTotals = res.data.data.one.recordset
            //console.log(this.companyData)
          },err => console.log(err)) 
          
      },
    async  getAllManagerTransactions(){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
        await   Axios.get(this.nodeApi+'/getAllManagerTransactions',{headers:headers})
          .subscribe(res =>{
            this.rows = res.data.data.one.recordset
            //console.log(this.companyData)
          },err => console.log(err)) 
          
      },
      refresh(){
       this.getAllTransactions()
      
      },
      exportPdf(){
      
        // let pdfName = 'TransactionsReport'; 
        //   var doc = new jsPDF();
        //   doc.text(this.rows, 10, 10);
        //   doc.save(pdfName + '.pdf');
        var vm = this
         //console.log(vm.rows)
        var columns = [
          {
          title: 'Tran Ref',
          dataKey: 'id'
          },
           {
          title: 'Date',         
          dataKey: 'created_at'
        },
        {
          title: 'Received $',
          dataKey: 'receive_amount'
        },
        {
          title: 'Disbursed $',
          dataKey: 'disburse_amount'
        },
        {
          title: 'Rate',
          dataKey: 'rate'
        },
        {
          title: 'Branch',
          dataKey: 'name'
        },
        {
          title: 'Disburse Curr.',
          dataKey: 'disburse_currency',
          
        },
        {
          title: 'Receive Curr.',
          dataKey: 'receive_currency',
          
        },
        {
          title: 'Client Name',
          dataKey: 'first_name'
        },
        {
          title: 'Client ID',
          dataKey: 'id_number'
        },
        {
          title: 'Type',
          dataKey: 'transaction_type'
        }
        ,
        {
          title: 'Status',
          dataKey: 'status'
        }

        ]
        var doc = new jsPDF('l','pt')
        var totalPagesExp = "{total_pages_count_string}";

        doc.setTextColor(100);
         //doc.text('Contipay Merchant Report', 10, 20);
        //doc.autoTable(columns,vm.rows)
        doc.autoTable(
        columns, 
        vm.rowsFilter,
        {
        didDrawPage: function (data) {
            // Header
            doc.setFontSize(20);
            doc.setTextColor(40);
            doc.setFontStyle('normal');
            
            doc.text("ContiCash Transaction Report", data.settings.margin.left + 15, 22);

            // Footer
            var str = "Page " + doc.internal.getNumberOfPages()
            // Total page number plugin only available in jspdf v1.0+
            if (typeof doc.putTotalPages === 'function') {
                str = str + " of " + totalPagesExp + "                                                                                                                                                                                                                                 @countitouch 2019";
            }
            doc.setFontSize(10);

            // jsPDF 1.4+ uses getWidth, <1.4 uses .width
            var pageSize = doc.internal.pageSize;
            var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
            doc.text(str, data.settings.margin.left, pageHeight - 10);
                  },
                  margin: {top: 30}
              });

              // Total page number plugin only available in jspdf v1.0+
              if (typeof doc.putTotalPages === 'function') {
                  doc.putTotalPages(totalPagesExp);
              }
           doc.save('TransactionReport.pdf')

      },
      exportExcel(){

      },
      
      customFilter(items, filters, filter, headers) {
        // Init the filter class.
        const cf = new this.$MultiFilters(items, filters, filter, headers);
        // Use regular function(),
        // arrow functions does not allow context binding.
        // Register the global standard filter.
        cf.registerFilter('search', function (searchWord, items) {
          if (searchWord.trim() === '') {return items;}
          return items.filter(item => {
            return item.name.toLowerCase().includes(searchWord.toLowerCase());
          }, searchWord);
        });
        // Use regular function(),
        // arrow functions does not allow context binding.
        // Register "added_by" filter.
        cf.registerFilter('added_by', function (added_by, items) {
          // If the filter has not been applied yet
          // just return all available items.
          if (added_by.trim() === '') return items;
          // Compare each item added_by and just return the matching ones.
          return items.filter(item => {
            return item.transaction_type.toLowerCase() === added_by.toLowerCase();
          }, added_by);
        });
        // Use regular function(),
        // arrow functions does not allow context binding.
        // Register "start_date" filter.
        cf.registerFilter('start_date', function (start_date, items) {
          // If the filter has not been applied yet
          // just return all available items.
          if (start_date === null) return items;
          // Compare each item start_date and just return the matching ones.
          return items.filter(item => {
            return item.tran_date >= start_date;
          }, start_date);
        });
        // Use regular function(),
        // arrow functions does not allow context binding.
        // Register "end_date" filter.
        cf.registerFilter('end_date', function (end_date, items) {
          // If the filter has not been applied yet
          // just return all available items.
          if (end_date === null) return items;
          // Compare each item end_date and just return the matching ones.
          return items.filter(item => {
            return item.tran_date <= end_date;
          }, end_date);
        });
        // Its time to run all created filters.
        // Will be executed in the order thay were defined.
        this.rowsFilter = cf.runFilters();
        return cf.runFilters();
      },
      /**
       * Toggle selected items with the master checkbox.
       */
      toggleAll() {
        if (this.selected.length) {
          this.selected = [];
        } else {
          this.selected = this.rows.slice();
        }
      },
      /**
       * Column shorting.
       *
       * @param column
       */
      changeSort(column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending;
        } else {
          this.pagination.sortBy = column;
          this.pagination.descending = false;
        }
      },
      /**
       * Handler when user input something at the "Filter" text field.
       */
      filterSearch(val) {
        this.filters = this.$MultiFilters.updateFilters(this.filters, {search: val});
      },
      /**
       * Handler when user  select some author at the "Author" select.
       */
      filterAuthor(val) {
        this.filters = this.$MultiFilters.updateFilters(this.filters, {added_by: val});
      },
      /**
       * Handler when select a date on "From" date picker.
       */
      filterStartDate(val) {
        // Close the date picker.
        this.$refs.show_start_date.save(val);
        //Convert the value to a timestamp before saving it.
        //const timestamp = new Date(val).getTime();
        this.filters = this.$MultiFilters.updateFilters(this.filters, {start_date: val});
      },
      /**
       * Handler when select a date on "To" date picker.
       */
      filterEndDate(val) {
        // Close the date picker.
        this.$refs.show_end_date.save(val);
        //Convert the value to a timestamp before saving it.
        //const timestamp = new Date(val).getTime();
        this.filters = this.$MultiFilters.updateFilters(this.filters, {end_date: val});
      },
    },
    filters: {
      /**
       * Format a timestamp into a d/m/yyy (because spanish format).
       *
       * @param value
       * @returns {string}
       */
      formatDate: function (value) {
        if (!value) return '';
        return new Date(value).toLocaleDateString("es-ES");
      }
    }
  };
</script>
<style scoped>
.image{
    width: 65px;
    height: 100%;
    margin: 3px;
  }
  .echarts {
    height: 300px;
  }
  .card {
    height: 80px;
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

  #chip-usage-example .v-chip {
    margin: 8px;
  }
  .btn-toggle {
  flex-direction: row;
}
</style>




