<template>
  <div>
    
   <v-layout row justify-end>
    
     <h2 style="color:green;">WorldRemit Pending Approvals</h2>
     <br>
     <br>
   </v-layout>
    <!-- <v-layout row wrap justify-end>
       
       <v-flex xs12 sm12 md3 pa-2 v-for="item in tranTotals" :key="item.id" >
        <v-card hover>
          <v-flex mb-2 class="card cardRev3">
            <v-layout ma-1>
              <img src="../assets/imgs/currency.fw.png" class="image">
              <v-flex style="text-align: right;padding: 3px;">
                <h2 style="color:green;">Total {{item.transaction_typeT}}</h2>
                <h3 style="color:blue;">{{item.receive_currencyT}} {{parseFloat(item.receive_amountT).toFixed(2)}}</h3>
                <h3 style="color:red;">Transactions# : {{item.counted}} </h3>
               
               
              </v-flex>
            </v-layout>
          </v-flex>
        </v-card>
        
      </v-flex>
    </v-layout> -->
    
    
       <!-- <v-layout row wrap justify-end>
         <v-flex xs12 sm6 md2 mb-2 mr-3>
            <v-text-field
                    v-model="transactionID"
                    append-icon="search"
                    label="Search By Reference ID#"
                    single-line
                    type="number"
                    hide-details
                    @keyup.enter="getAllTransactionsByID"
                    
            ></v-text-field>
         </v-flex>
        
         <v-flex xs12 sm4 md2 mr-3 v-show="toggle !== `3` && toggle !== `4` && toggle !== `1`">
            <v-select
                   
                    :items="branches"
                    label="Select Branch"
                    @input="selectedBranch"
                    item-text="branchname"
                    item-value="id"   
            ></v-select>
        </v-flex>
        <v-flex xs12 sm4 md2 mr-3 v-show="toggle !== `2` && toggle !== `4` && toggle !== `1`">
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

           <v-flex xs12 sm6 md3 mt-1>
              
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
                      :data   = "newrows"
                      :fields = "json_fields"
                      :title  = "json_title"
                      :before-generate = "addData"
                      worksheet = "Tran_Worksheet"
                      name    = "TransactionsReport.xls">
                  
                     <v-icon v-on="on" color="green darken-2">library_add</v-icon>
                  
                  </export-excel>
              </v-btn>
            </template>
            <span>Export to excel</span>
          </v-tooltip>
     
           <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon @click="exportExcel">
                <export-excel
                      class   = "btn btn-default"
                      :data   = "newrows2"
                      :fields = "json_fields_rbz"
                      :title  = "json_title_rbz"  
                       :before-generate = "addDataRBZ"                   
                      worksheet = "Tran_Worksheet"
                      name    = "ReportRBZ.xls">
                  
                     <v-icon v-on="on" color="red darken-2">library_add</v-icon>
                  
                  </export-excel>
              </v-btn>
            </template>
            <span>Export RBZ excel</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon @click="exportExcel">
                <export-excel
                      class   = "btn btn-default"
                      :data   = "newrows2"
                      :fields = "json_fields_rbz2"
                       :before-generate = "addDataRBZ"                 
                      worksheet = "Tran_Worksheet"
                      name    = "RBZ_Remittance.xls">
                  
                     <v-icon v-on="on" color="yellow darken-2">library_add</v-icon>
                  
                  </export-excel>
              </v-btn>
            </template>
            <span>Export RBZ Remittance</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon @click="exportExcel">
                <export-excel
                      class   = "btn btn-default"
                      :data   = "newrows2"
                      :fields = "json_fields_rbz3"
                       :before-generate = "addDataRBZ"                 
                      worksheet = "Tran_Worksheet"
                      name    = "RBZ_WorldRemit.xls">
                  
                     <v-icon v-on="on" color="purple darken-2">library_add</v-icon>
                  
                  </export-excel>
              </v-btn>
            </template>
            <span>Export WorldRemit</span>
          </v-tooltip>
            </v-flex>
      
        </v-layout> -->
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
                        <td >
                          
                           <v-chip @click="resendRBZ(props.item)" v-if="props.item.rbz == 0" label color="grey" text-color="white" >
                              {{ props.item.reference }}  
                            </v-chip>
                            <v-chip v-if="props.item.rbz == 1" label color="green" text-color="white" >
                              {{ props.item.reference }}  
                            </v-chip>
                           <v-chip @click="resendRBZ(props.item)" v-if="props.item.rbz == 2" label color="green" text-color="white" >
                              {{ props.item.reference }}  
                            </v-chip>
                        </td>
                        <td >{{new Date(props.item.createdAt).toLocaleString('en-GB') }}</td>
                        
                        <td >{{JSON.parse(props.item.senderData).firstName }} {{JSON.parse(props.item.senderData).lastName }}</td>
                       
                        <td >{{JSON.parse(props.item.transactionData).senderCurrency }} {{JSON.parse(props.item.transactionData).senderAmount }}</td>
                        
                         <td v-show="toggle !== `3`">{{ props.item.branch_id}}</td>
                          <td  v-show="toggle !== `2`">{{props.item.username }}</td>
                        
                         <td >
                           <v-chip label color="blue" text-color="white" >
                              {{ props.item.payOutSymbol }}  {{ parseFloat(props.item.payOut).toFixed(2) }}
                            </v-chip>
                           
                         </td>
                       
                        <td >{{JSON.parse(props.item.recipiantData).firstName }} {{JSON.parse(props.item.recipiantData).lastName }}</td>
                       
                         <td v-if="user_type == 2">
                           <v-chip v-if="props.item.status == 1" label color="blue" text-color="white" >
                              Pending
                            </v-chip>
                            <v-btn @click="Payout(props.item)" v-if="props.item.status == 17" label color="green" dark >
                              Payout
                            </v-btn>
                             <v-chip v-if="props.item.status == 18" label color="green" text-color="white" >
                              Paid
                            </v-chip>
                           
                         </td>
                          <td v-if="user_type != 2">
                           <v-btn @click="Approve(props.item)" v-if="props.item.status == 1" label color="orange" dark >
                              Approve
                            </v-btn>
                            <v-chip v-if="props.item.status == 17" label color="purple" text-color="white" >
                              Approved
                            </v-chip>
                            <v-chip v-if="props.item.status == 18" label color="green" text-color="white" >
                              Paid
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

            <v-dialog v-model="dialogloader" hide-overlay persistent width="300">
              <v-card color="#ECB530" dark>
                  <v-card-text>
                      Please stand by
                      <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                  </v-card-text>
                  </v-card>
            </v-dialog>




 <dialog> 

  <div class="invoice-box rtl" id="WorldRemitR">
        <table cellpadding="0" cellspacing="0">
            <tr class="top">
                <td colspan="2">
                    <table>
                        <tr>
                            <td class="title" style="text-align: centre;">
                                <img src="../assets/logo.fw.png" alt="ContiCash FX" style="width:100%; max-width:300px;">
                            </td>                         
                            
                        </tr>

                        <tr>
                         <br>
                        </tr> 

                        <tr>                          
                            <td style="text-align: center;font-size:12px;">
                                Invoice # <span style="font-weight: bold;">{{tranID}}</span><br>
                                {{ time | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}<br>
                                <br>
                                <br>
                                 <strong> Customer Copy</strong>
                                <br>
                                <br>
                                
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            
            <tr class="information">
                <td colspan="2">
                    <table>
                        <tr>
                            <td style="text-align: center;font-size:12px;">
                                1st Floor, Block 3,Tendeseka Office Park<br>
                                Samora Machel, Harare<br>
                                Zimbabwe<br>
                                704086,790148/9
                            </td>
                            
                           
                        </tr>
                    </table>
                </td>
            </tr>
             <tr class="item">
                <td>
                    Branch
                </td>
                
                <td style="text-align: right;font-weight: bold;">
                    {{teller_branch}} 
                </td>
            </tr>
            <tr class="item" >
                <td>
                   Teller
                </td>
                
                <td style="text-align: right;font-weight: bold;">
                    {{teller_first_name}} {{teller_last_name}} 
                </td>
            </tr>
            <tr class="item" >
                <td>
                   Client
                </td>
                
                <td style="text-align: right;font-weight: bold;">
                    {{recipient.firstName}} {{recipient.lastName}} 
                </td>
            </tr>
            <tr class="item" >
                <td>
                   Client Cell
                </td>
                
                <td style="text-align: right;font-weight: bold;">
                    {{recipient.mobilePhone}}  
                </td>
            </tr>
           
            <tr class="item" >
                <td>
                   Tran Type
                </td>
                
                <td style="text-align: right;font-weight: bold;">
                    {{transaction_type}}  
                </td>
            </tr>
              <tr class="heading">
                <td>
                    <br>
                </td>
                
               
            </tr>    
           
            
            <tr class="heading" style="font-weight: bold;">
                <td>
                    Item
                </td>
                
                <td style="text-align: right;">
                    Amount
                </td>
            </tr>
            <tr class="item">
                <td>
                    <br>
                </td>
                
                
            </tr>
           
            
            
           <tr class="item">
                <td>
                    Disbursement
                </td>
                
                <td  style="text-align: right;">
                     {{transaction.beneficiaryCurrency}} {{parseFloat(transaction.beneficiaryAmount).toFixed(2)}}
                </td>
            </tr>
            
            <tr class="item last">
                <td>
                    @Charge
                </td>
                
                <td  style="text-align: right;">
                     {{parseFloat(transaction.beneficiaryCharges).toFixed(2)}}
                </td>
            </tr>
             <tr class="item last">
                <td>
                    <br>
                </td>                
              
            </tr>
             <tr class="item last">
                <td>
                    <br>
                </td>                
              
            </tr>
            
           
        </table>
        

          <table cellpadding="0" cellspacing="0">
            <tr class="top">
                <td colspan="2">
                    <table>
                        <tr>
                            <td class="title" style="text-align: centre;">
                                <img src="../assets/logo.fw.png" alt="ContiCash FX" style="width:100%; max-width:300px;">
                            </td>                         
                            
                        </tr>

                        <tr>
                         <br>
                        </tr> 

                        <tr>                          
                            <td style="text-align: center;font-size:12px;">
                                Invoice # <span style="font-weight: bold;">{{tranID}}</span><br>
                                {{ time | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}<br>
                                 <br>
                                <br>
                               <strong> Merchant Copy</strong>
                                <br>
                                <br>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            
            <tr class="information">
                <td colspan="2">
                    <table>
                        <tr>
                            <td style="text-align: center;font-size:12px;">
                                 1st Floor, Block 3,Tendeseka Office Park<br>
                                Samora Machel, Harare<br>
                                Zimbabwe<br>
                                704086,790148/9
                            </td>
                            
                           
                        </tr>
                    </table>
                </td>
            </tr>
             <tr class="item">
                <td>
                    Branch
                </td>
                
                <td style="text-align: right;font-weight: bold;">
                    {{teller_branch}} 
                </td>
            </tr>
            <tr class="item" >
                <td>
                   Teller
                </td>
                
                <td style="text-align: right;font-weight: bold;">
                    {{teller_first_name}} {{teller_last_name}} 
                </td>
            </tr>
            <tr class="item" >
                <td>
                   Client
                </td>
                
                <td style="text-align: right;font-weight: bold;">
                    {{recipient.firstName}} {{recipient.lastName}} 
                </td>
            </tr>
            <tr class="item" >
                <td>
                   Client Cell
                </td>
                
                <td style="text-align: right;font-weight: bold;">
                    {{recipient.mobilePhone}}  
                </td>
            </tr>
            <tr class="item" >
                <td>
                   Tran Type
                </td>
                
                <td style="text-align: right;font-weight: bold;">
                    {{transaction_type}}  
                </td>
            </tr>
              <tr class="heading">
                <td>
                    <br>
                </td>
                
               
            </tr>    
           
            
            <tr class="heading" style="font-weight: bold;">
                <td>
                    Item
                </td>
                
                <td style="text-align: right;">
                    Amount
                </td>
            </tr>
            <tr class="item">
                <td>
                    <br>
                </td>
                
                
            </tr>
           
           
            
            <tr class="item">
                <td>
                    Disbursement
                </td>
                
                <td  style="text-align: right;">
                     {{transaction.beneficiaryCurrency}} {{parseFloat(transaction.beneficiaryAmount).toFixed(2)}}
                </td>
            </tr>
            
            <tr class="item last">
                <td>
                    @Charge
                </td>
                
                <td  style="text-align: right;">
                     {{parseFloat(transaction.beneficiaryCharges).toFixed(2)}}
                </td>
            </tr>
             <tr class="item last">
                <td>
                    <br>
                </td>                
              
            </tr>
             <tr class="item last">
                <td>
                    <br>
                </td>                
              
            </tr>
            
           
        </table>
    </div>   
    </dialog> 

       
  </div>
</template>
<script>
import * as jsPDF from 'jspdf'
import * as autoTable from 'jspdf-autotable'
import Axios from  'axios-observable';
  export default {
   
    data: () => ({
      dialogloader:false,
       SpecificRange:'',
       allRates:[],
       newrows:[],
       newrows2:[],
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
      tranID: 0,
      center_id :'',
      centreCurrency : '',
      rowsFilter: [],
      tranTotals: [],
      text: 'center',
      icon: 'justify',
      toggle_none: null,
      toggle_one: 0,
      time:0,
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
       transaction: {          
          senderAmount: "0",
          senderFees: "0",
          senderCurrency: null,
          senderSymbol: null,
          beneficiaryAmount: "",
          beneficiaryCharges: "",
          beneficiaryCurrency: "",
          beneficiarySymbol: "$",
          settlementAmount: "",
          settlementCommission: null,
          wrtId: "2003230701140001",
          wrtDateCreated: "2020-03-23T07:10:54.1862336Z"
        },
       transaction_type: 'WorldRemit',
        transactionType:'WorldRemit',
        clientName: '',
        disableCheck: true,
        first_name: '',
        last_name: '',
        id_number: '',
        cell : '',
        receive_symbol: null,
        disburse_symbol: null,
      teller_first_name: '',
        teller_last_name: '',
        teller_branch: '',
        sender:{
         firstName:'',
          lastName:'',
          nationalId: '',
          countryName:'',
          email:'',
          mobilePhone:''
        },
        recipient:{
          firstName:'',
          lastName:'',
          nationalId: '',
          countryName:'',
          email:'',
          mobilePhone:''
        },
      starterData: {
          'createdAt':'DD/MM/YYYY',
          'reference':'WorldRemit reference',
          'branch_id':'PayOut Branch',
          'username':'Banch Teller',

          'id':'Your reference',
          'clientCurrency' :'e.g. INR, UGX, COP ',
          'payOut' :'Pay-out / Return amount in pay-out currency',
          'fxRate' : 'Pay-out currency: Settlement currency',
          
           'sentCurrency':'e.g. EUR, GBP, USD',
           'sentAmount':'Transaction in settlement currency (including any funding applied)',
           'commission':'Amount charged per transaction',
           'transactionType':'e.g. Funding, Paid, Return',
           'balance':'Cumulative running total in settlement currency',
      },
       starterDataRBZ: {
         'createdAt':'Name of Sender',
          'reference':'Name of Beneficiary',
          'id':'Beneficiary Identity Number',
          'clientCurrency' :'Beneficiary Gender (M/F)',
          'payOut' :'Physical Address',
          'fxRate' : 'Beneficiary District',          
           'sentCurrency':'International Partner Code',
           'sentAmount':'Source Country Code',
           'commission':'Transaction Purpose Code',
           'transactionType':'Source of Funds',
           'balance':'Currency Code',
           'balance':'Amount',
           'balance':'Mode of Payout (Cash/Account)',
      },
      //Excel data
      

      rows: []
    }),
    watch: {
      dialogdaterange(val){
       if(val){
          this.start_date = null
          this.end_date = null
          this.SpecificRange = ''
        }
      },
      
    },
    beforeMount() {
      
    },
    computed:{
     paymentHeaders(){
        if(this.toggle == "1"){
          let paymentHeaders = [
        {
          text: 'Third Party Reference',
          value: 'reference'
        },
        {
          text: 'Transaction Date',
          value: 'createdAt'
        },
        ,
        {
          text: 'Sent By',
          value: 'createdAt'
        },
        
         {
          text: 'Sent Amount',
          value: 'createdAt'
        },
        {
          text: 'Branch',
          value: 'branch_id'
        },
        {
          text: 'Teller',
          value: 'username'
        },
        {
          text: 'Pay Out Amount',
          value: 'payOut'
        }
       ,
       
        {
          text: 'Client Name',
          value: 'first_name'
        },
        {
          text: 'Actions'
         
         
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
         // console.log(this.user_type)   
        if(this.user_type != 2){
           this.getAllTransactions()
        }else{
           this.getAllTransactionsByTellerID(this.$session.get('user').userdetails.id)
        }
       
        // console.log(this.now_date)
    },
    methods: {
      async Payout(data){
        this.dialogloader = true
         this.tranID = data.id
         this.time = Date.now()

         this.recipient = JSON.parse(data.recipiantData)
         this.transaction = JSON.parse(data.transactionData)
         this.teller_first_name = this.$session.get('user').userdetails.first_name
         this.teller_last_name = this.$session.get('user').userdetails.last_name
         this.teller_branch = this.$session.get('user').userdetails.branch_name
          console.log(data)
         let  tranData = {
           data: data,
           id:data.id,
           userId:this.$session.get('user').userdetails.id,
           payOut:data.payOut,
           payOutCurrency:data.payOutCurrency
         }

         let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         await  Axios.post(this.nodeApi+'/worldRemitApprovedPayout',tranData,{headers:headers})
          .subscribe(res =>{
             if(res.data.data.one){
               this.dialogloader = false
               this.$swal.fire(
                                'PayOut Successful',
                                'You have successfully paid this transaction.',
                                'success'
                            )
                         this.getAllTransactions()  
                          setTimeout(() => {
                            this.printPDFWorldRemit('WorldRemitR')
                          }, 2000)  
             }else{
               this.$swal.fire(
                                'PayOut Error',
                                res.data.message,
                                'error'
                            )
             }
            //console.log(this.companyData)
          },err => {
             this.dialogloader = false
            console.log(err)
            }) 
        
      },
       printPDFWorldRemit(divId) {
        var contentWorldRemit = document.getElementById(divId).innerHTML;
        var mywindowWorldRemit = window.open('', 'Print', 'height=600,width=800');
        mywindowWorldRemit.document.write('<html><head><title>Print</title>');
        mywindowWorldRemit.document.write('</head><body >');
        mywindowWorldRemit.document.write(contentWorldRemit);
        mywindowWorldRemit.document.write('</body></html>');
        mywindowWorldRemit.document.close();
        mywindowWorldRemit.focus();
        // mywindowLoyal.print();
        // mywindowLoyal.close();
        setTimeout(function() {
          mywindowWorldRemit.print();
          mywindowWorldRemit.close();
        }, 1000);
        return true;
      },
      async Approve(data){
       // console.log(data)
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         await  Axios.post(this.nodeApi+'/worldRemitApprove',{id:data.id,userId:this.$session.get('user').userdetails.id},{headers:headers})
          .subscribe(res =>{
             if(res.data.data.one){
               this.$swal.fire(
                                'PayOut Approval Successful',
                                'You have successfully approved this transaction for payOut.',
                                'success'
                            )
                         this.getAllTransactions()    
             }else{
               this.$swal.fire(
                                'PayOut Approval Error',
                                res.data.message,
                                'error'
                            )
             }
            //console.log(this.companyData)
          },err => console.log(err)) 
      },
      async getAllTransactionsByTellerID(data){
         let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         await  Axios.post(this.nodeApi+'/getAllWorldRemitApprovalsTeller',{userId:data},{headers:headers})
          .subscribe(res =>{
            this.rows = res.data.data.one.recordset
            //console.log(this.companyData)
          },err => console.log(err)) 
      },
     async resendRBZ(data){
                 let headers = {            
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + this.$session.get('user').token,
                      
                  }
                var transaction = JSON.parse(data.apiRespone)
                var transactionMain = transaction.message.transaction;
                var additionalInfo = JSON.parse(data.additionalInfo);
               
                var date = new Date()
                let rbzData = {
                    "bdxName": "Test Bureau",
                    "bdxBranch": "Newlands HQ",
                    "transactionDate": date.toISOString(),
                    "apiUsername": this.$session.get('user').userdetails.rbz_username,
                    "password": this.$session.get('user').userdetails.rbz_password,
                    "operatorName": `${this.$session.get('user').userdetails.username} from  ${this.$session.get('user').userdetails.branch_name} Branch`,
                    "senderName": `${transactionMain.sender.firstName} ${transactionMain.sender.lastName}`,
                    "clientName": `${transactionMain.recipient.firstName} ${transactionMain.recipient.lastName}`,
                    "clientNationalId": additionalInfo.clientID,
                    "clientGender": additionalInfo.clientGender,
                    "clientPhysicalAddress": {
                      "street": additionalInfo.clientAddress
                    },
                    "district": additionalInfo.clientDistrict,
                    "currencyCode": `${transactionMain.transaction.beneficiaryCurrency}`,
                    "sourceCountryCode": "",
                    "internationalPartnerCode": "WR",
                    "sourceCountryName": transactionMain.sender.countryName,
                    "internationalPartnerName": "World Remit",
                    "sourceOfFundsCode": additionalInfo.sourceFunds,
                    "transactionPurposeCode": additionalInfo.transactionPurpose,
                    "transferMode": "CASH",
                    "amount": transactionMain.transaction.beneficiaryAmount,
                    "originalReference": transactionMain.transaction.wrtId
            }
            // console.log(additionalInfo)
            // console.log(rbzData)
                this.dialogloader = true

                await Axios.post(this.nodeApi + '/postRBZ', rbzData, {headers: headers})
                  .subscribe(res => {
                   if(res.data.statusCode){
                     this.rbzTransactionUpdate(1,transactionMain.transaction.wrtId)
                   }else{
                     this.rbzTransactionUpdate(2,transactionMain.transaction.wrtId)
                   }
                   
                   // console.log(res)
                  }, err => {
                     console.log(err)
                  })
      },
      
      async rbzTransactionUpdate(data,ref){
         let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
        await Axios.post(this.nodeApi + '/postRBZUpdater', {data:data,reference:ref}, {headers: headers})
                  .subscribe(res => {
                  
                   this.dialogloader = false
                   if(res.data.data.one.recordset.affectedRows == 1){
                     this.$swal.fire(
                        'RBZ Sending Successful',
                        'You have successfully sent this transaction to the RBZ.',
                        'success'
                      )
                   }else{
                     this.$swal.fire(
                        'RBZ Sending Error',
                        'There was an error sending transction to the RBZ.',
                        'error'
                      )
                   }
                     
                    console.log(res.data)
                  }, err => {
                     console.log(err)
                  })
      },
      getFullYear(){
         let newDate = new Date.now();
        var dd = newDate.getDate();
        var mm = newDate.getMonth()+1; 
        var yyyy = newDate.getFullYear();

        return `${yyyy}`;
      },
      getFullDate(){
         let newDate = new Date.now();
        var dd = newDate.getDate();
        var mm = newDate.getMonth()+1; 
        var yyyy = newDate.getFullYear();

        return `${dd}/${mm}/${yyyy}`;
      },
      addData(){
        this.newrows = this.rows
        this.newrows.unshift(this.starterData)
       // console.log(this.rows)
        //console.log(this.starterData)
      },
       addDataRBZ(){
         this.newrows2 = this.rows
         //this.newrows2.unshift(this.starterDataRBZ)
       // console.log(this.json_fields_rbz)
        //console.log(this.starterDataRBZ)
      },
      convertDate(){
        var rawDate = new Date
        this.now_date = rawDate.toISOString();
      },

     async daterange(){
       this.json_title_rbz = [
            'EC-FORM-ADLA(I) ',' ',`INSTITUTION CODE: 0015000`,`FINANCIAL YEAR: ${new Date(Date.now()).getFullYear()}`,`START DATE: ${this.start_date}`,`END DATE: ${this.end_date}`,' '
        ]
       this.dialogdaterange = false
       this.SpecificRange = `${this.start_date} to ${this.end_date}`
        this.dialogloader = true
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
         await  Axios.post(this.nodeApi+'/getAllTransactionsSpecificUtilWorldRemit',{start:this.start_date,end:this.end_date},{headers:headers})
          .subscribe(res =>{
            this.rows = res.data.data.one.recordset
            this.dialogdaterange = false
             this.dialogloader = false
            //console.log(this.companyData)
          },err => console.log(err)) 

          await  Axios.post(this.nodeApi+'/getAllTransactionsSumSpecificUtilWorldRemit',{start:this.start_date,end:this.end_date},{headers:headers})
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
         await  Axios.post(this.nodeApi+'/getAllTransactionsSpecificUtilWorldRemit',{start:this.start_date,end:this.end_date},{headers:headers})
          .subscribe(res =>{
            this.rows = res.data.data.one.recordset
            this.dialogdaterange = false
             this.dialogloader = false
            //console.log(this.companyData)
          },err => console.log(err)) 

          await  Axios.post(this.nodeApi+'/getAllTransactionsSumSpecificUtilWorldRemit',{start:this.start_date,end:this.end_date},{headers:headers})
          .subscribe(res =>{
            this.tranTotals = res.data.data.one.recordset
            //this.dialogdaterange = false
            //console.log(this.companyData)
          },err => console.log(err)) 
      }
       if(this.toggle == '2' && this.toggleDates == '3' && this.branch_id == null){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         await  Axios.post(this.nodeApi+'/getAllTransactionsSpecificUtilWorldRemit',{start:this.start_date,end:this.end_date},{headers:headers})
          .subscribe(res =>{
            this.rows = res.data.data.one.recordset
            this.dialogdaterange = false
             this.dialogloader = false
            //console.log(this.companyData)
          },err => console.log(err)) 

          await  Axios.post(this.nodeApi+'/getAllTransactionsSumSpecificUtilWorldRemit',{start:this.start_date,end:this.end_date},{headers:headers})
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
         await  Axios.post(this.nodeApi+'/getAllBranchTransactionsSpecificUtilWorldRemit',{start:this.start_date,end:this.end_date,branch_id:this.branch_id},{headers:headers})
          .subscribe(res =>{
            this.rows = res.data.data.one.recordset
            this.dialogdaterange = false
             this.dialogloader = false
            //console.log(this.companyData)
          },err => console.log(err)) 

           await  Axios.post(this.nodeApi+'/getAllBranchTransactionsSumSpecificUtilWorldRemit',{start:this.start_date,end:this.end_date,branch_id:this.branch_id},{headers:headers})
          .subscribe(res =>{
            this.tranTotals = res.data.data.one.recordset
            //this.dialogdaterange = false
            //console.log(this.companyData)
          },err => console.log(err)) 

          
      }

      if(this.toggle == '1' && this.toggleDates == '3' && this.branch_id == null){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         await  Axios.post(this.nodeApi+'/getAllTransactionsSpecificUtilWorldRemit',{start:this.start_date,end:this.end_date},{headers:headers})
          .subscribe(res =>{
            this.rows = res.data.data.one.recordset
            this.dialogdaterange = false
             this.dialogloader = false
            //console.log(this.companyData)
          },err => console.log(err)) 

          await  Axios.post(this.nodeApi+'/getAllTransactionsSumSpecificUtilWorldRemit',{start:this.start_date,end:this.end_date},{headers:headers})
          .subscribe(res =>{
            this.tranTotals = res.data.data.one.recordset
            //this.dialogdaterange = false
            //console.log(this.companyData)
          },err => console.log(err)) 
      }
      if(this.toggle == '1' && this.toggleDates == '3' && this.branch_id != null){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         await  Axios.post(this.nodeApi+'/getAllBranchTransactionsSpecificUtilWorldRemit',{start:this.start_date,end:this.end_date,branch_id:this.branch_id},{headers:headers})
          .subscribe(res =>{
            this.rows = res.data.data.one.recordset
            this.dialogdaterange = false
             this.dialogloader = false
            //console.log(this.companyData)
          },err => console.log(err)) 

           await  Axios.post(this.nodeApi+'/getAllBranchTransactionsSumSpecificUtilWorldRemit',{start:this.start_date,end:this.end_date,branch_id:this.branch_id},{headers:headers})
          .subscribe(res =>{
            this.tranTotals = res.data.data.one.recordset
            //this.dialogdaterange = false
            //console.log(this.companyData)
          },err => console.log(err)) 

          
      }

      if(this.toggle == '2' && this.toggleDates == '3' && this.branch_id != null){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         await  Axios.post(this.nodeApi+'/getAllBranchTransactionsSpecificUtilWorldRemit',{start:this.start_date,end:this.end_date,branch_id:this.branch_id},{headers:headers})
          .subscribe(res =>{
            this.rows = res.data.data.one.recordset
            this.dialogdaterange = false
             this.dialogloader = false
            //console.log(this.companyData)
          },err => console.log(err)) 

           await  Axios.post(this.nodeApi+'/getAllBranchTransactionsSumSpecificUtilWorldRemit',{start:this.start_date,end:this.end_date,branch_id:this.branch_id},{headers:headers})
          .subscribe(res =>{
            this.tranTotals = res.data.data.one.recordset
            //this.dialogdaterange = false
            //console.log(this.companyData)
          },err => console.log(err)) 

          
      }

      if(this.toggle == '2' && this.toggleDates == '1' && this.branch_id != null){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         await  Axios.post(this.nodeApi+'/getAllBranchTransactionsSpecificUtilWorldRemit',{start:this.start_date,end:this.end_date,branch_id:this.branch_id},{headers:headers})
          .subscribe(res =>{
            this.rows = res.data.data.one.recordset
            this.dialogdaterange = false
             this.dialogloader = false
            //console.log(this.companyData)
          },err => console.log(err)) 

           await  Axios.post(this.nodeApi+'/getAllBranchTransactionsSumSpecificUtilWorldRemit',{start:this.start_date,end:this.end_date,branch_id:this.branch_id},{headers:headers})
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
             this.dialogloader = false
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
             this.dialogloader = false
            //console.log(this.companyData)
          },err => console.log(err)) 

           await  Axios.post(this.nodeApi+'/getAllTellerTransactionsSumSpecificUtil',{start:this.start_date,end:this.end_date,user_id:this.user_id},{headers:headers})
          .subscribe(res =>{
            this.tranTotals = res.data.data.one.recordset
            //this.dialogdaterange = false
            //console.log(this.companyData)
          },err => console.log(err)) 

          
      }


      
      if(this.toggle == '3' && this.toggleDates == '3' && this.user_id == null){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
        await  Axios.post(this.nodeApi+'/getAllTransactionsSpecificUtil',{start:this.start_date,end:this.end_date},{headers:headers})
          .subscribe(res =>{
            this.rows = res.data.data.one.recordset
            this.dialogdaterange = false
             this.dialogloader = false
            //console.log(this.companyData)
          },err => console.log(err)) 

          
          
      }

      if(this.toggle == '3' && this.toggleDates == '3' && this.user_id != null){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         await  Axios.post(this.nodeApi+'/getAllTellerTransactionsSpecificUtil',{start:this.start_date,end:this.end_date,user_id:this.user_id},{headers:headers})
          .subscribe(res =>{
            this.rows = res.data.data.one.recordset
            this.dialogdaterange = false
             this.dialogloader = false
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
             this.dialogloader = false
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
        if(this.toggle == '2' && this.toggleDates == '1' && this.SpecificRange == ''){
          this.getAllBranchTransactions(data)
         this.getAllBranchTransactionsSum(data)
         
         
        }
        if(this.toggle == '2' && this.toggleDates == '2' && this.SpecificRange == ''){
          this.getAllBranchTransactionsNowByID(data)
         this.getAllBranchTransactionsSumNow(data)
         
        }
        if(this.toggle == '2' && this.toggleDates == '3' && this.SpecificRange == ''){
          this.getAllBranchTransactionsMonthNowByID(data)
         this.getAllBranchTransactionsSumMonthNow(data)
        
        }




        if(this.toggle == '2' && this.toggleDates == '1' && this.SpecificRange != ''){
           this.getAllBranchTransactionsNowByIDSpec(data)
         this.getAllBranchTransactionsSumNowSpec(data)
         
        }
        if(this.toggle == '2' && this.toggleDates == '2' && this.SpecificRange != ''){
          this.getAllBranchTransactionsNowByIDSpec(data)
         this.getAllBranchTransactionsSumNowSpec(data)
         
        }
        if(this.toggle == '2' && this.toggleDates == '3' && this.SpecificRange != ''){
           this.getAllBranchTransactionsNowByIDSpec(data)
         this.getAllBranchTransactionsSumNowSpec(data)
        
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
        await   Axios.get(this.nodeApi+'/getAllWorldRemitApprovals',{headers:headers})
          .subscribe(res =>{
            this.rows = res.data.data.one.recordset
            // console.log( this.rows)
          },err => console.log(err)) 

       
          
      },
    },
 
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




