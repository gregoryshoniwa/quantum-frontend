<template>
  <div>
    <v-toolbar flat color="blue darken-4">
            <v-toolbar-title class="white--text hidden-sm-and-down">Teller to Teller Float Movement</v-toolbar-title>
            <v-divider
              class="mx-2"
              inset
              vertical
            ></v-divider>
            <span class="white--text hidden-sm-and-down" style="font-size:20px;">{{selectedfromuser.first_name}}'s float is : {{selectedfromuser.symbol}} {{parseFloat(selectedfromuser.amount).toFixed(2)}}</span>
            <v-spacer></v-spacer>      
            
            
            <v-btn color="error" @click="backstep">Back</v-btn>
            <v-btn v-if="e1 != 5" color="primary" @click="nextstep">Next</v-btn>
            <v-btn v-if="e1 == 5" color="success" @click="transferFloat">Transfer</v-btn>
          </v-toolbar>

          <v-layout row wrap justify-end>
          <v-flex md3>
          <v-combobox
            v-if="e1 == 1"
            v-model="selectedcurrency"
            @input="currencySelected"
            :items="currencies"
             item-text="iso_code"
             item-value="id"
             label="Select Currency">

            <template slot="item" slot-scope="data">
              <v-avatar left tile >
               <img :src="image+data.item.image" style="max-width: 100px; height: auto;margin-right:30px;padding:5px;" />    
              </v-avatar>  
            {{data.item.iso_code}}
            </template>
          </v-combobox>
          </v-flex>
 
          <v-flex md3>
             <v-combobox
             v-if="e1 == 2"
             :disabled="usercheck"
            v-model="selectedfromuser"
            @input="fromuserSelected"
            :items="userdata1"
             item-text="first_name"
             item-value="id"
            label="Select From Teller">

            <template slot="item" slot-scope="data">
              
           {{data.item.first_name}} {{data.item.last_name}}
            
            </template>
          </v-combobox>
          </v-flex>
          <v-flex md3>
             <v-combobox
             v-if="e1 == 3"
            v-model="selectedtouser"
            @input="touserSelected"
            :items="userdata"
             item-text="first_name"
             item-value="id"
            label="Select To Teller">

            <template slot="item" slot-scope="data">
              
            {{data.item.first_name}} {{data.item.last_name}}
            
            </template>
          </v-combobox>
          </v-flex>

          <v-flex md3>
            <v-text-field
            v-if="e1 == 4"
            v-model="tellertotellerData.amount"
            prepend-icon="monetization_on"
            label="Transfer Amount"
            single-line
            hide-details
            type="number"
            style="margin:5px;"
          ></v-text-field>
          </v-flex>
          </v-layout>

                  <v-stepper v-model="e1">
                    <v-stepper-header>
                      <v-stepper-step editable :complete="e1 > 1" step="1">Movement Currency</v-stepper-step>

                      <v-divider></v-divider>
                      
                      <v-stepper-step editable :complete="e1 > 2" step="2">From Float Data</v-stepper-step>

                      <v-divider></v-divider>

                      
                      <v-stepper-step editable :complete="e1 > 3" step="3">To Float Data</v-stepper-step>

                      <v-divider></v-divider>

                      
                      <v-stepper-step editable :complete="e1 > 4" step="4">Input Transfer Amount</v-stepper-step>

                      <v-divider></v-divider>

                      
                      <v-stepper-step editable step="5">Confirming Transfer</v-stepper-step>
                    </v-stepper-header>
 
                    <v-stepper-items>
                      <v-stepper-content step="1" > 
                      </v-stepper-content>

                     
                      <v-stepper-content step="2">
                      </v-stepper-content>

                      <v-stepper-content step="3">
                      </v-stepper-content>

                      <v-stepper-content step="4">
                      </v-stepper-content>

                      <v-stepper-content step="5">
                      </v-stepper-content>
                       
                    </v-stepper-items>
                  </v-stepper>

                  <v-layout row wrap v-if="e1 == 5" justify-center>
                    <v-flex md3 pa-5>
                      <v-card
                        color="#385F73"
                        dark
                        hover
                       height="140px"
                      >
                        <v-card-text class="white--text">
                         
                          <img :src="image+selectedcurrency.image" style="max-width: 100px; height: auto;margin-right:60px;padding:5px;" />    
           
                        </v-card-text>

                        
                      </v-card>
                    </v-flex>

                    <v-flex md3 pa-5>
                      <v-card
                        color="#385F73"
                        dark
                        hover
                        height="140px"
                      >
                        <v-card-text class="white--text">
                          <div class="headline mb-2">Moving From</div>
                          {{selectedfromuser.first_name}}  {{selectedfromuser.last_name}}
                        </v-card-text>

                        
                      </v-card>
                    </v-flex>

                    <v-flex md3 pa-5>
                      <v-card
                        color="#385F73"
                        dark
                        hover
                         height="140px"
                      >
                        <v-card-text class="white--text">
                          <div class="headline mb-2">Moving To</div>
                         {{selectedtouser.first_name}}  {{selectedtouser.last_name}}
                        </v-card-text>

                        
                      </v-card>
                    </v-flex>

                     <v-flex md3 pa-5>
                      <v-card
                        color="#385F73"
                        dark
                        hover
                         height="140px"
                         
                      >
                      
                        <v-card-text class="white--text justify-center" >
                          <div class="headline mb-2">Float Amount</div>
                          {{parseFloat(tellertotellerData.amount).toFixed(2)}}  
                        </v-card-text>

                        
                      </v-card>
                    </v-flex>
                  </v-layout>

                  <v-dialog v-model="dialogloader" hide-overlay persistent width="300">
                      <v-card color="#ECB530" dark>
                          <v-card-text>
                              Please stand by
                              <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                          </v-card-text>
                      </v-card>
                  </v-dialog>

  </div>
</template>
<script>
import Axios from  'axios-observable';

export default {
  data() {
    return {
      e1:0,
      dialogloader:false,
      nodeApi: '',
     image: '/img/',
      selected:'',
      selectedcurrency:'',
      selectedfromuser:'',
      selectedtouser:'',
      usercheck: true,
      userdata:[],
      userdata1:[],
      tellertotellerDataClear:{
        amount:0,
        to_user_id:null,
        from_user_id:null,
        currency_id:null,
        handover_type:5,
        created_by:0
      },
      tellertotellerData:{
        amount:0,
        to_user_id:null,
        from_user_id:null,
        currency_id:null,
        handover_type:5,
        created_by:0
      },
      currencies: [],
     
    }
     
  },
  watch: {
    e1(val){
     // console.log(val)
    },
    selectedcurrency(val){
    
    
      
    },
     selectedfromuser(val){
      
     }
  },
  mounted() {
    this.e1 = 0
    if(this.$session.get('user').userdetails.user_type == 2){
      this.usercheck = true
    }else{
      this.usercheck = false
    }
    this.getActiveCurrencies()
  },
  methods: {
   async currencySelected(){
      this.tellertotellerData.currency_id = this.selectedcurrency.id
      this.tellertotellerData.created_by = this.$session.get('user').userdetails.id
      var user_id = this.tellertotellerData.created_by
      var curr_id = this.tellertotellerData.currency_id
      if(this.$session.get('user').userdetails.user_type == 2){
          
        // console.log(curr_id)
          let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,            
        }
         // console.log(headers)
        await Axios.post(this.nodeApi+'/getUserFloatByCol',{col:'currency_id',value:this.tellertotellerData.currency_id,col2:'user_id',value2:user_id},{headers:headers})
          .subscribe(res =>{
            this.userdata1 = res.data.data.one.recordset
            //console.log(this.companyData)
          },err => console.log(err))
          this.e1 = 3
          console.log(this.userdata1)
      }else{
          this.getUserFloatbyCurrency1()
      }
      //console.log(this.selectedcurrency)
      this.getUserFloatbyCurrency()
      
    },
    fromuserSelected(){
      this.tellertotellerData.from_user_id = this.selectedfromuser.user_id 
      //console.log(this.selectedfromuser)
    },
    touserSelected(){
      this.tellertotellerData.to_user_id = this.selectedtouser.user_id 
    },
    getUserFloatbyCurrency(){
      let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,            
        }
         // console.log(headers)
          Axios.post(this.nodeApi+'/getUserFloatByCol2',{col:'currency_id',value:this.tellertotellerData.currency_id},{headers:headers})
          .subscribe(res =>{
            this.userdata = res.data.data.one.recordset
            //console.log(this.companyData)
          },err => console.log(err))
    },
    getUserFloatbyCurrency1(){
      let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,            
        }
         // console.log(headers)
          Axios.post(this.nodeApi+'/getUserFloatByCol2',{col:'currency_id',value:this.tellertotellerData.currency_id},{headers:headers})
          .subscribe(res =>{
            this.userdata1 = res.data.data.one.recordset
            //console.log(this.companyData)
          },err => console.log(err))
    },
   async transferFloat(){
      if(!this.tellertotellerData.currency_id){
        this.$swal.fire({
                type: 'error',
                title: 'Transfer Failed',
                text:  'Please enter a currency'
              })
      }
      else if(!this.tellertotellerData.from_user_id){
        this.$swal.fire({
                type: 'error',
                title: 'Transfer Failed',
                text:  'Please enter a transfering user float amount'
              })
      }
      else if(!this.tellertotellerData.to_user_id){
        this.$swal.fire({
                type: 'error',
                title: 'Transfer Failed',
                text:  'Please enter a receiving user float account'
              })
      }
      else if(!this.tellertotellerData.amount){
        this.$swal.fire({
                type: 'error',
                title: 'Transfer Failed',
                text:  'Please enter a transfer amount'
              })
      }
      else if(this.tellertotellerData.amount <= 0){
        this.$swal.fire({
                type: 'error',
                title: 'Transfer Failed',
                text:  'Please enter a transfer amount greater than 0'
              })
      }
      else if(this.tellertotellerData.to_user_id == this.tellertotellerData.from_user_id){
        this.$swal.fire({
                type: 'error',
                title: 'Transfer Failed',
                text:  'You can not transfer float to the same person'
              })
      }
      else if(this.tellertotellerData.amount > this.selectedfromuser.amount){
        this.$swal.fire({
                type: 'error',
                title: 'Transfer Failed',
                text:  'Amount more than disbursement account'
              })
      }
      else{
        this.dialogloader = true
       // console.log(this.tellertotellerData)
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,            
        }
         
        await Axios.post(this.nodeApi+'/updateTellerToTellerFloat',this.tellertotellerData,{headers:headers})
          .subscribe(res =>{
            //console.log(res.data)
            if(res.data.data.one.recordset){
             this.dialogloader = false
            this.tellertotellerData = this.tellertotellerDataClear
            this.e1 = 1
            this.selectedcurrency ='',
            this.selectedfromuser ='',
            this.selectedtouser ='',
              this.$swal.fire({
                type: 'success',
                title: 'Transfer Successful',
                text:  'Your transfer was updated successfully'
              })
              
            }else{
            this.$swal.fire({
                type: 'error',
                title: 'Transfer Failed',
                text:  res.data.message
              })
            }
          },err => console.log(err))
      }
    },
    nextstep(){
      if(this.e1 < 5){
        this.e1 = parseInt(this.e1) + 1
      }
    },
    backstep(){
      if(this.e1 > 1){
        this.e1 -= 1
      }
      
    },
      
      getActiveCurrencies(){
       let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,            
        }
         // console.log(headers)
          Axios.get(this.nodeApi+'/getAllCurrenciesActive',{headers:headers})
          .subscribe(res =>{
            this.currencies = res.data.data.one.recordset
            //console.log(this.companyData)
          },err => console.log(err))
    }
    }   
}
</script>
<style scoped>
  
</style>