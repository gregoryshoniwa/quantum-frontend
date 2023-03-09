<template>
    <div>
       
         <v-btn-toggle mandatory v-model="toggleCurr" color="primary" style="margin-top:15px;margin-left:30px;">
                <v-btn :value="item.id" v-for="item in toggleCurrencies" :key="item.id">
                 {{item.symbol}}
                </v-btn>
                
          </v-btn-toggle> 
         <v-layout row wrap>
             <v-flex xs12 md6 pa-3>
                 <v-toolbar flat color="green darken-4">
            <v-toolbar-title class="white--text">Teller Cash On-Hand</v-toolbar-title>
            <v-divider
              class="mx-2"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
             <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon @click="exportExcel">
                <export-excel
                      class   = "btn btn-default"
                      :data   = "UsersData"
                                    
                      worksheet = "Tran_Worksheet"
                      name    = "Teller_Cash-OnHand.xls">
                  
                     <v-icon v-on="on" color="white darken-2">library_add</v-icon>
                  
                  </export-excel>
              </v-btn>
            </template>
            <span>Export Teller Float Summary</span>
          </v-tooltip>
            </v-toolbar>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
            style="margin:5px;"
          ></v-text-field>

          <v-data-table
            :headers="headersStackManagment"
            :key="UsersData.id"
             :pagination.sync="pagination"
            :items="UsersData"
            :search="search"
            class="elevation-1"
          >
            <template v-slot:items="props">
                         
              <td class="text-xs-left">{{ props.item.username}} </td>
              <td class="text-xs-left">{{ props.item.branch }}</td>
                            
              <td class="text-xs-left">{{ parseFloat(props.item.USD).toFixed(2) }}</td>
              <!-- <td class="text-xs-left">{{ parseFloat(props.item.ZAR).toFixed(2) }}</td> -->
              <!-- <td class="text-xs-left">{{ parseFloat(props.item.WR_USD).toFixed(2) }}</td> -->
              <td class="text-xs-left">{{ parseFloat(props.item.ZW_Bond).toFixed(2) }}</td>
              <td class="text-xs-left">{{ parseFloat(props.item.ZW_RTGS).toFixed(2) }}</td>
              <td class="text-xs-left">{{ parseFloat(props.item.ZW_Ecocash).toFixed(2) }}</td>
            
            </template>
            <template v-slot:no-data>
              <h4>No records found</h4>
            </template>
            <template v-slot:no-results>
              <v-alert :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
              </v-alert>
            </template>
          </v-data-table>
             </v-flex>
              <v-flex xs12 md6 pa-3>
                <div style="height: 500px;">
                    <component 
                    v-bind:is="pieChart2"
                     v-bind:currency_id="toggleCurr" 
                     v-bind:date="dater"
                    ></component>  
                 </div>
              </v-flex>
         </v-layout>
    </div>
</template>
<script>
import ProductGroup from './summary/ProductGroup';
import Axios from  'axios-observable';
import StackPie from './summary/PieChart';
export default {
     components: {
      ProductGroup,
       'stack-pie':StackPie,
    },
    props: ['currency_id','date'],
    data() {
        return {
            toggleCurr : 2,
            stackCardData:[],
            toggleCurrencies:[],
            search:'',
            dater:0,
            selectedBranch:0,
            pieChart2:'stack-pie',
            UsersData: [],
            pagination: {
                    sortBy: 'id',
                    'descending': true,
                    rowsPerPage: 7
                },
            nodeApi: 'http://localhost:8081',
              headersStackManagment: [
                             
                { text: 'Teller', value: 'username' }, 
                { text: 'Branch', value: 'branch' }, 
                { text: 'USD', value: 'USD' }, 
                //  { text: 'ZAR', value: 'ZAR' }, 
                // { text: 'WR USD', value: 'WR_USD' },
                { text: 'ZW Bond', value: 'ZW_Bond' }, 
                 { text: 'ZW RTGS', value: 'ZW_RTGS' }, 
                { text: 'ZW Ecocash', value: 'ZW_Ecocash' },
               
            ],
            currency_id_data:null

        }
    },
    mounted() {
      
        // this.getStackData()
        // this.initializeUser()
    },
    watch: {
     toggleCurr(val){
      // console.log(val)
     },
      date(val){
         // console.log(val,this.currency_id)
         
          this.getTellerFloatSummary()
          this.getAllToggleCurrencies()
          this.dater = Date.now()
      },
      
    },
    methods: {
          exportExcel(){

      },
       async getAllToggleCurrencies(){
            let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         // console.log(headers)
        await Axios.get(this.nodeApi+'/getAllToggleCurrencies2',{headers:headers})
          .subscribe(res =>{
            this.toggleCurrencies = res.data.data.one.recordset
            
            //console.log(this.allRates)
          },err => console.log(err))
        },
        async getTellerFloatSummary(){
            let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         // console.log(headers)
        await Axios.get(this.nodeApi+'/getTellerFloatSummary',{headers:headers})
          .subscribe(res =>{
            this.UsersData = res.data.data.one.recordset
            
            //console.log(this.allRates)
          },err => console.log(err))
        },
    },
}
</script>
<style>
    
</style>