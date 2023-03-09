<template>
    <div style="text-align: center;">
       
        <v-card >
            <v-toolbar flat color="primary">
            

            <v-toolbar-title>
                  <h3 class="font-weight-bold display-3 white--text">ConitCash FX Booking</h3>
            </v-toolbar-title>

          
          </v-toolbar>
            <v-tabs
            v-model="tab"            
            color="primary"
            grow
            dark
            slider-color="white"
            
            >
            <v-tab
                v-for="item in items"
                :key="item"
            >
                {{ item }}
            </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
            <v-tab-item>
                  <v-flex xs12 ml-2 mr-5>
                    <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Search"
                        single-line7                   
                        hide-details></v-text-field>
                 </v-flex>
                 <v-data-table                   
                    :headers="usersHeaders"
                    :items="userData"
                    item-key="id"
                   :pagination.sync="pagination"
                    class="elevation-1"
                    width="10"
                    must-sort
                    :search="search"
                   
                  >
                
                <template v-slot:items="props">
                    <tr >                      
                        
                       
                        <td class="text-xs-left">{{ props.item.id}}</td>
                        <td class="text-xs-left">{{ props.item.firstName}}</td>
                         <td class="text-xs-left">{{ props.item.lastName}}</td>
                        <td class="text-xs-left">{{ props.item.emailAddress}}</td>
                        <td class="text-xs-left">{{ props.item.phoneNumber}}</td>
                        <td class="text-xs-left">{{ props.item.nationalId}}</td>
                        <td class="text-xs-left">{{ props.item.usertype}}</td>
                        <td class="text-xs-left">{{ props.item.status}}</td>
                        <td class="text-xs-left">
                            <v-tooltip bottom >
                                <template v-slot:activator="{ on }">
                                    <v-btn small color="blue" icon @click="ResetPin(props.item)">                                            
                                            
                                                <v-icon v-on="on" medium class="white--text">
                                                vpn_key
                                                </v-icon>                                            
                                    </v-btn>
                                </template>
                                <span>Rest Pin</span>
                              </v-tooltip>


                          <v-tooltip bottom v-if="props.item.active == 13">
                                <template v-slot:activator="{ on }">
                                    <v-btn small color="red" icon @click="DeActivateUser(props.item)">                                            
                                            
                                                <v-icon v-on="on" medium class="white--text">
                                                person_add_disabled
                                                </v-icon>                                            
                                    </v-btn>
                                </template>
                                <span>De-Activate</span>
                              </v-tooltip>

                             <v-tooltip bottom v-if="props.item.active == 14">
                                <template v-slot:activator="{ on }">
                                    <v-btn small color="green" icon @click="ActivateUser(props.item)">                                            
                                            
                                                <v-icon v-on="on" medium class="white--text">
                                                how_to_reg
                                                </v-icon>                                            
                                    </v-btn>
                                </template>
                                <span>Activate</span>
                              </v-tooltip>
                        </td>
                       
                    </tr>
                </template>
               
            </v-data-table>
            </v-tab-item>
            <v-tab-item>
                 <v-layout rows>
                 <v-flex xs8 ml-2 mr-5>
                    <v-text-field
                        v-model="search2"
                        append-icon="search"
                        label="Search"
                        single-line7                   
                        hide-details></v-text-field>
                
                 <v-data-table                   
                    :headers="pendingVerifyHeaders"
                    :items="pendingVerifyData"
                    item-key="id"
                   :pagination.sync="pagination"
                    class="elevation-1"
                    width="10"
                    must-sort
                    :search="search2"
                   
                  >
                
                <template v-slot:items="props">
                    <tr >
                       
                        <td class="text-xs-left" @click="clickTable(props.item)">{{ props.item.userId}}</td>
                        <td class="text-xs-left" @click="clickTable(props.item)">{{ props.item.firstName}}</td>
                         <td class="text-xs-left" @click="clickTable(props.item)"> {{ props.item.lastName}}</td>
                        <td class="text-xs-left" @click="clickTable(props.item)">{{ props.item.status}}</td>
                         <td class="text-xs-left" @click="clickTable(props.item)">{{ props.item.imageType}}</td>
                        <td class="text-xs-left" @click="clickTable(props.item)">{{ new Date(props.item.createdAt).toLocaleString('en-GB')}}</td>
                         <td class="text-xs-left">
                             
                              <v-tooltip bottom >
                                <template v-slot:activator="{ on }">
                                    <v-btn small color="blue" icon @click="verified(props.item)">                                            
                                            
                                                <v-icon v-on="on" medium class="white--text">
                                                thumb_up_alt
                                                </v-icon>                                            
                                    </v-btn>
                                </template>
                                <span>Positive Verification</span>
                              </v-tooltip>


                          <v-tooltip bottom >
                                <template v-slot:activator="{ on }">
                                    <v-btn small color="red" icon @click="decline(props.item)">                                            
                                            
                                                <v-icon v-on="on" medium class="white--text">
                                                thumb_down_alt
                                                </v-icon>                                            
                                    </v-btn>
                                </template>
                                <span>Decline Verification</span>
                              </v-tooltip>

                         </td>
                       
                    </tr>
                </template>
              
            </v-data-table>
             </v-flex>
             <v-flex xs4 v-if="avatar != ''">
                 <v-card hover max-width="300" class="mx-auto ma-2" color="blue lighten-5">
                    <v-flex pa-2>
                        <img :src="avatar" alt="Photo" width="100%" class="bounceIn">
                    </v-flex>       
                   
                </v-card>
             </v-flex>
             </v-layout>
            </v-tab-item>
            <v-tab-item>
                 <v-flex xs12 ml-2 mr-5>
                    <v-text-field
                        v-model="search3"
                        append-icon="search"
                        label="Search"
                        single-line7                   
                        hide-details></v-text-field>
                 </v-flex>
                 <v-data-table                   
                    :headers="headersAuthBookings"
                    :items="authBookings"
                    item-key="id"
                   :pagination.sync="pagination"
                    class="elevation-1"
                    width="10"
                    must-sort
                    :search="search3"
                   
                  >
                
                <template v-slot:items="props">
                    <tr >
                       
                        <td class="text-xs-left">{{ props.item.id}}</td>
                        <td class="text-xs-left">{{ new Date(props.item.expireDateTime).toLocaleString('en-GB')}}</td>                       
                        <td class="text-xs-left">{{ props.item.firstName}} {{ props.item.lastName}}</td>                                            
                        <td class="text-xs-left">{{ props.item.sellCurrency}}</td>
                        <td class="text-xs-left">{{ parseFloat(props.item.amount).toFixed(2)}}</td>
                        <td class="text-xs-left">{{ parseFloat(props.item.rate).toFixed(4)}}</td>
                        
                        <td class="text-xs-left">{{ props.item.buyCurrency}} {{ parseFloat(props.item.expectedAmount).toFixed(2)}}</td>
                        <td class="text-xs-left">
                             <v-chip 
                                             v-if="props.item.isForex == 2"                                   
                                            class="mb-2"
                                            color="red"
                                            label
                                            text-color="white"
                                            >
                                            {{ props.item.sellCurrency}}
                          {{ parseFloat(props.item.amount * 0.01).toFixed(2)}}
                          </v-chip>

                           <v-chip 
                                             v-if="props.item.isForex == 1"                                   
                                            class="mb-2"
                                            color="red"
                                            label
                                            text-color="white"
                                            >
                                            {{ props.item.buyCurrency}}
                          {{ parseFloat(props.item.expectedAmount * 0.01).toFixed(2)}}
                          </v-chip>

                          </td>
                         <td class="text-xs-left">{{ props.item.statusName}}</td>
                        <td class="text-xs-left">
                             <v-tooltip bottom >
                                <template v-slot:activator="{ on }">
                                    <v-btn small color="blue" icon @click="AuthApprove(props.item)">                                            
                                            
                                                <v-icon v-on="on" medium class="white--text">
                                                thumb_up_alt
                                                </v-icon>                                            
                                    </v-btn>
                                </template>
                                <span>Approve</span>
                              </v-tooltip>


                          <v-tooltip bottom >
                                <template v-slot:activator="{ on }">
                                    <v-btn small color="red" icon @click="AuthDecline(props.item)">                                            
                                            
                                                <v-icon v-on="on" medium class="white--text">
                                                thumb_down_alt
                                                </v-icon>                                            
                                    </v-btn>
                                </template>
                                <span>Decline</span>
                              </v-tooltip>
                        </td>
                       
                    </tr>
                </template>
                <template v-slot:expand="props">
                  <v-card flat>
                    <v-card-text>{{props.item.tran_description}}</v-card-text>
                  </v-card>
                </template>
            </v-data-table>
            </v-tab-item>
            <v-tab-item>
                 <v-flex xs12 ml-2 mr-5>
                    <v-text-field
                        v-model="search3"
                        append-icon="search"
                        label="Search"
                        single-line7                   
                        hide-details></v-text-field>
                 </v-flex>
                 <v-data-table                   
                    :headers="headersAuthBuysBookings"
                    :items="authBookingsBuy"
                    item-key="id"
                   :pagination.sync="pagination"
                    class="elevation-1"
                    width="10"
                    must-sort
                    :search="search3"
                   
                  >
                
                <template v-slot:items="props">
                    <tr >
                       
                        <td class="text-xs-left">{{ props.item.id}}</td>
                        <td class="text-xs-left">{{ new Date(props.item.expireDateTime).toLocaleString('en-GB')}}</td> 
                         <td class="text-xs-left">{{new Date(props.item.createdAt).toLocaleString('en-GB')}}</td>                      
                        <td class="text-xs-left">{{ props.item.firstName}} {{ props.item.lastName}}</td>                                            
                        <td class="text-xs-left">{{ props.item.buyCurrency}} {{ parseFloat(props.item.buyerAmount).toFixed(2)}}</td>                        
                        <td class="text-xs-left"> 
                            <v-chip 
                                             v-if="props.item.isForex == 2"                                   
                                            class="mb-2"
                                            color="red"
                                            label
                                            text-color="white"
                                            >
                                            {{ props.item.sellCurrency}}
                          {{ parseFloat((props.item.buyerAmount/props.item.sellerRate) * 0.01).toFixed(2)}}
                          </v-chip>

                           <v-chip 
                                             v-if="props.item.isForex == 1"                                   
                                            class="mb-2"
                                            color="red"
                                            label
                                            text-color="white"
                                            >
                                            {{ props.item.buyCurrency}}
                          {{ parseFloat(props.item.buyerAmount * 0.01).toFixed(2)}}
                          </v-chip>
                         
                        </td>
                        <td class="text-xs-left">{{ props.item.sellCurrency}} {{ parseFloat(props.item.buyerAmount/props.item.sellerRate).toFixed(2)}}</td>                        
                        <td class="text-xs-left">{{ parseFloat(props.item.sellerRate).toFixed(4)}}</td>
                         <td class="text-xs-left">{{ props.item.statusName}}</td>
                        <td class="text-xs-left">
                             <v-tooltip bottom >
                                <template v-slot:activator="{ on }">
                                    <v-btn small color="blue" icon @click="AuthApproveBuy(props.item)">                                            
                                            
                                                <v-icon v-on="on" medium class="white--text">
                                                thumb_up_alt
                                                </v-icon>                                            
                                    </v-btn>
                                </template>
                                <span>Approve</span>
                              </v-tooltip>


                          <v-tooltip bottom >
                                <template v-slot:activator="{ on }">
                                    <v-btn small color="red" icon @click="AuthDeclineBuy(props.item)">                                            
                                            
                                                <v-icon v-on="on" medium class="white--text">
                                                thumb_down_alt
                                                </v-icon>                                            
                                    </v-btn>
                                </template>
                                <span>Decline</span>
                              </v-tooltip>
                        </td>
                       
                    </tr>
                </template>
                <template v-slot:expand="props">
                  <v-card flat>
                    <v-card-text>{{props.item.tran_description}}</v-card-text>
                  </v-card>
                </template>
            </v-data-table>
            </v-tab-item>

            <v-tab-item>
                 <v-flex xs12 ml-2 mr-5>
                    <v-text-field
                        v-model="search3"
                        append-icon="search"
                        label="Search"
                        single-line7                   
                        hide-details></v-text-field>
                 </v-flex>
                 <v-data-table                   
                    :headers="withdrawalrequests"
                    :items="withdrawalRequests"
                    item-key="id"
                   :pagination.sync="pagination"
                    class="elevation-1"
                    width="10"
                    must-sort
                    :search="search3"
                   
                  >
                
                <template v-slot:items="props">
                    <tr >
                       
                        <td class="text-xs-left">{{ props.item.id}}</td>                        
                         <td class="text-xs-left">{{new Date(props.item.createdAt).toLocaleString('en-GB')}}</td>  
                          <td class="text-xs-left">{{ props.item.reference}}</td> 
                        <td class="text-xs-left">{{ props.item.description}} </td>                    
                        <td class="text-xs-left">{{ props.item.firstName}} </td>   
                        <td class="text-xs-left"> {{ props.item.lastName}}</td>  
                        <td class="text-xs-left"> {{ props.item.phoneNumber}}</td>                                         
                        <td class="text-xs-left">{{ props.item.iso_code}} </td>    
                                           
                        <td class="text-xs-left"> 
                            <v-chip 
                                                                             
                                            class="mb-2"
                                            color="red"
                                            label
                                            text-color="white"
                                            >
                                            
                          {{ parseFloat(props.item.amount).toFixed(2)}}
                          </v-chip>

                        
                         
                        </td>
                      
                         <td class="text-xs-left">{{ props.item.status}}</td>
                        <td class="text-xs-left">
                             <v-tooltip bottom >
                                <template v-slot:activator="{ on }">
                                    <v-btn small color="blue" icon @click="ApproveWithdraw(props.item)">                                            
                                            
                                                <v-icon v-on="on" medium class="white--text">
                                                thumb_up_alt
                                                </v-icon>                                            
                                    </v-btn>
                                </template>
                                <span>Approve</span>
                              </v-tooltip>


                          <v-tooltip bottom >
                                <template v-slot:activator="{ on }">
                                    <v-btn small color="red" icon @click="DeclineWithdraw(props.item)">                                            
                                            
                                                <v-icon v-on="on" medium class="white--text">
                                                thumb_down_alt
                                                </v-icon>                                            
                                    </v-btn>
                                </template>
                                <span>Decline</span>
                              </v-tooltip>
                        </td>
                       
                    </tr>
                </template>
                <template v-slot:expand="props">
                  <v-card flat>
                    <v-card-text>{{props.item.tran_description}}</v-card-text>
                  </v-card>
                </template>
            </v-data-table>
            </v-tab-item>

            <v-tab-item>
                
            </v-tab-item>
            </v-tabs-items>
        </v-card>

          <v-dialog
                v-model="dialogDecline" 
                max-width="350"
                class="mx-auto"
                >
                
                <v-card>
                    <v-card-title
                    class="headline blue white--text"          
                    primary-title
                    dark
                    >
                    Reason for decline
                    </v-card-title>
                    <v-layout row wrap>
                    
                
                    <v-flex xs12 pa-2>
                       <v-textarea
                        v-model="declineReason"
                        solo
                        outlined                        
                        label="Reason"
                        
                        ></v-textarea>
                    </v-flex>
                    
                    
                    </v-layout>
                    <v-divider></v-divider>

                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="green"
                        dark
                        @click="saveDecline"
                    >
                        Save
                    </v-btn>
                    </v-card-actions>
                </v-card>
    </v-dialog>

        <v-dialog
                v-model="dialogMiniDeposit" 
                max-width="350"
                class="mx-auto"
                >
                
                <v-card>
                    <v-card-title
                    class="headline blue white--text"          
                    primary-title
                    dark
                    >
                   Minimum Deposit Form
                    </v-card-title>
                    <v-layout row wrap>
                    
                
                    <v-flex xs12 pa-2>
                      <v-text-field
                                outlined
                                v-model="miniDeposit"
                                dense   
                                type="number"         
                                label="Enter Minimum Deposit"             
                                >
                            
                                </v-text-field>
                    </v-flex>
                    
                    
                    </v-layout>
                    <v-divider></v-divider>

                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="green"
                        dark
                        @click="saveMiniDeposit"
                    >
                        Save
                    </v-btn>
                    </v-card-actions>
                </v-card>
    </v-dialog>

    </div>
</template>
<script>
import Axios from  'axios-observable';
export default {
    data(){
       return {
        avatar:'',
        declineReason:'',
        tab: null,
        miniDeposit:'',
        dialogMiniDeposit:false,
        dialogDecline: false,
        dialogDeclineSell: false,
        dialogDeclineBuy: false,
         nodeAPI:'https://b.contitouch.co.zw',
         pagination: {
         sortBy: 'id',
        'descending': true,
        rowsPerPage: 15
      },
        items: [
          'User Administration', 'Pending Verifications', 'Authorize Sell Bookings', 'Authorize Buy Bookings','Withdrawal Requests', 'Deposits'
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        search: '',
        search2: '',
        search3: '',
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ],
        headersAuthBookings:[
          { text: 'Booking ID',value: 'id'},
          { text: 'Expecting By',value: 'expireDateTime'},
          { text: 'First Name', value: 'firstName'},  
          { text: 'Booked Currency', value: 'sellCurrency'},
          { text: 'Booked Amount', value: 'amount'},
          { text: 'Asking Rate', value: 'rate'},          
          { text: 'Asking Value', value: 'expectedAmount'},
          { text: 'Charge'},
          { text: 'Status', value: 'statusName'},
          {
            text: 'Action',           
            sortable: false,           
          },
        ],
        headersAuthBuysBookings:[
           { text: 'Booking ID',value: 'id'},
          { text: 'Sell Expecting By',value: 'expireDateTime'},
          { text: 'Buyer Date',value: 'createdAt'},
          { text: 'First Name', value: 'firstName'},  
         
          { text: 'Buy Amount', value: 'buyerAmount'},
          { text: 'Charge'},
         
          { text: 'Buy Value', value: 'amount'},
          { text: 'Seller Rate', value: 'sellerRate'},
           { text: 'Status', value: 'statusName'},
          {
            text: 'Action',           
            sortable: false,           
          },
        ],
        usersHeaders: [
          {
            text: 'User ID',
            align: 'start',
            sortable: false,
            value: 'id',
          },
          { text: 'First Name', value: 'firstName' },
          { text: 'Last Name', value: 'lastName' },
          { text: 'Email', value: 'emailAddress' },
          { text: 'Phone Number', value: 'phoneNumber' },
          { text: 'National ID', value: 'nationalId' },
          { text: 'User Type', value: 'usertype' },
          { text: 'Status', value: 'status' },
          {
            text: 'Action',           
            sortable: false,           
          },
        ],
        pendingVerifyHeaders: [
          {
            text: 'User ID',
            align: 'start',
            sortable: false,
            value: 'userId',
          },
          { text: 'First Name', value: 'firstName' },
          { text: 'Last Name', value: 'lastName' },
          { text: 'Status', value: 'status' },
          { text: 'Image Type', value: 'imageType' },
          { text: 'Upload Date', value: 'createdAt' },
           {
            text: 'Action',            
            sortable: false,           
          },
        ],
         withdrawalrequests: [
          {
            text: 'Request ID',
            align: 'start',
            sortable: false,
            value: 'id',
          },
          { text: 'Date', value: 'createdAt' },
          { text: 'Reference', value: 'reference' },
          { text: 'Description', value: 'description' },
          { text: 'First Name', value: 'firstName' },
          { text: 'Last Name', value: 'lastName' },         
          { text: 'Cell Number', value: 'phoneNumber' },
          { text: 'Currency', value: 'iso_code' },
          { text: 'Withdrawal Amount', value: 'amount' },
           { text: 'Status', value: 'status' },
           {
            text: 'Action',            
            sortable: false,           
          },
        ],
        desserts: [
        ],
        userData:[],
        pendingVerifyData:[],
        declineItem:null,
        declineItemBuy:null,
        declineItemSell:null,
        authBookings:[],
        authBookingsBuy:[],
        withdrawalRequests:[],
        authData: null,
        newPin: '',
        firstNameSMS: '',
        lastNameSMS: ''
      
      }
    },
    mounted() {
        this.getAllUsers()
        this.getAllPendingVerifications()
         this.$socket.off('authBookings')
        this.$socket.off('authBookingsBuy')
        this.$socket.off('withdrawalRequests')
        
        this.$socket.on('authBookings',(data) =>{
          //console.log(data.data)
          this.authBookings = data.data
        })
         this.$socket.on('authBookingsBuy',(data) =>{
         // console.log(data.data)
          this.authBookingsBuy = data.data
        })

         this.$socket.on('withdrawalRequests',(data) =>{
         // console.log(data.data)
          this.withdrawalRequests = data.data
        })

        this.$socket.off('authBookingsConfirmed'+this.$session.get('user').userdetails.id)
        this.$socket.on('authBookingsConfirmed'+this.$session.get('user').userdetails.id,(data) =>{
            if(data.message == 'Success'){
              if(data.authorized == 1){
                this.dialogMiniDeposit = false
                 this.$swal.fire(
                               
                                'Authorization Successful',
                                'You have successfully authorized this booking.',
                                 'success',
                            )
              }else{
                 this.$swal.fire(
                               
                                'Decline Successful',
                                'You have successfully declined this booking.',
                                 'success',
                            )
              }
              
            }else{
                 this.$swal.fire( 
                                'Authorization Failed',
                                'Authorization failed due to some technical problem.',
                                 'error'
                                 )
            }
        })
       

        this.$socket.off('authBookingsBuyConfirmed'+this.$session.get('user').userdetails.id)
        this.$socket.on('authBookingsBuyConfirmed'+this.$session.get('user').userdetails.id,(data) =>{
            if(data.message == 'Success'){
              if(data.authorized == 1){
                 this.$swal.fire(
                               
                                'Authorization Successful',
                                'You have successfully authorized this booking.',
                                 'success',
                            )
              }else{
                 this.$swal.fire(
                               
                                'Decline Successful',
                                'You have successfully declined this booking.',
                                 'success',
                            )
              }
              
            }else{
                 this.$swal.fire( 
                                'Authorization Failed',
                                'Authorization failed due to some technical problem.',
                                 'error'
                                 )
            }
        })

        this.$socket.off('DeActivateUser'+this.$session.get('user').userdetails.id)
        this.$socket.on('DeActivateUser'+this.$session.get('user').userdetails.id,(data) =>{
             if(data.message == 'Success'){
               this.$swal.fire(
                               
                                'User De-Activation Successful',
                                'You have successfully De-Activated this user.',
                                 'success',
                            )
               this.getAllUsers()
            }else{
                 this.$swal.fire( 
                                'User De-Activation Failed',
                                'User De-Activation failed due to some technical problem.',
                                 'error'
                                 )
            }
        })
        this.$socket.off('ActivateUser'+this.$session.get('user').userdetails.id)
        this.$socket.on('ActivateUser'+this.$session.get('user').userdetails.id,(data) =>{
            if(data.message == 'Success'){
               this.$swal.fire(
                               
                                'User Activation Successful',
                                'You have successfully Activated this user.',
                                 'success',
                            )
               this.getAllUsers()
            }else{
                 this.$swal.fire( 
                                'User Activation Failed',
                                'User Activation failed due to some technical problem.',
                                 'error'
                                 )
            }
        })
        this.$socket.off('ResetPin'+this.$session.get('user').userdetails.id)
        this.$socket.on('ResetPin'+this.$session.get('user').userdetails.id,(data) =>{
            if(data.message == 'Success'){
               this.$swal.fire(
                               
                                'ResetPin Successful',
                                'You have successfully Reset Pin.',
                                 'success',
                            )
               this.getAllUsers()
               this.sendPinSMS()
            }else{
                 this.$swal.fire( 
                                'ResetPin Failed',
                                'ResetPin failed due to some technical problem.',
                                 'error'
                                 )
            }
        })

         this.$socket.off('approveWithdrawal'+this.$session.get('user').userdetails.id)
        this.$socket.on('approveWithdrawal'+this.$session.get('user').userdetails.id,(data) =>{
            if(data.message == 'Success'){
               this.$swal.fire(
                               
                                'Approve Withdrawal',
                                'You have successfully Approve Withdrawal.',
                                 'success',
                            )
              
            }else{
             // console.log(data.message)
                 this.$swal.fire( 
                                'Approve Withdrawal',
                                'Approve Withdrawal failed due to some technical problem.',
                                 'error'
                                 )
            }
        })

         this.$socket.off('declineWithdrawal'+this.$session.get('user').userdetails.id)
        this.$socket.on('declineWithdrawal'+this.$session.get('user').userdetails.id,(data) =>{
            if(data.message == 'Success'){
               this.$swal.fire(
                               
                                'Decline Withdrawal',
                                'You have successfully Declined Withdrawal.',
                                 'success',
                            )
              
            }else{
                 this.$swal.fire( 
                                'Decline Withdrawal',
                                'Decline Withdrawal failed due to some technical problem.',
                                 'error'
                                 )
            }
        })
        this.getAuthorisations()
    },
    methods: {
      ApproveWithdraw(maindata){
    
       let data = {
         id: maindata.id,  
         walletId:maindata.walletId, 
         decision: `Authorized by ${this.$session.get('user').userdetails.username} from  ${this.$session.get('user').userdetails.branch_name}`,
         status:21,
         description: maindata.description,
         userId:this.$session.get('user').userdetails.id,
         fxuserId:maindata.userId,
         amount:maindata.amount,
         currencyId:maindata.currencyId
       }
     //console.log(data)
      this.$socket.emit('approveWithdrawal',data) 
      },
      DeclineWithdraw(maindata){
         let data = { 
         id: maindata.id,  
         walletId:maindata.walletId,        
         decision: `Declined By ${this.$session.get('user').userdetails.username} from  ${this.$session.get('user').userdetails.branch_name}`,         
         status:22,
         description: maindata.description,
         userId:this.$session.get('user').userdetails.id,
         fxuserId:maindata.userId,
         amount:maindata.amount,
         currencyId:maindata.currencyId
       }
       //console.log(data)
        this.$socket.emit('declineWithdrawal',data) 
      },
     async sendPinSMS(){
          var msg = `Good day ${this.firstNameSMS} ${this.lastNameSMS}%0A%0AYour Pin was rest by ContiCash%0Ayour new pin is ${this.newPin}%0A%0AContiCash Booking System`;
       
        var newmessage = encodeURI(msg);
        await fetch('https://sms.contitouch.co.zw/api.json?cmd=send&username=booking&password=kKiXdhhf&senderid=Booking&gsm='+this.pinPhoneNumber+'&msg='+newmessage,
                {
                  method: "GET",
                  mode: "no-cors"
              }).then(
                    function(response) {
                      if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                          response.status+ ' error: ' + response.text);
                        return;
                      }

                      // Examine the text in the response
                      response.json().then(function(data) {
                        console.log(data);
                      });
                    }
                  )
                  .catch(function(err) {
                    console.log('Fetch Error :-S', err);
                  });
      },
      DeActivateUser(maindata){
        let data = {
         id: maindata.id,
         userId:this.$session.get('user').userdetails.id,
         
       }
         this.$socket.emit('DeActivateUser',data) 
      },
      ActivateUser(maindata){
        let data = {
         id: maindata.id,
         userId:this.$session.get('user').userdetails.id,
         
       }
         this.$socket.emit('ActivateUser',data) 
      },
      ResetPin(maindata){
        this.newPin = Math.floor(1000 + Math.random() * 9000);
        this.pinPhoneNumber = maindata.phoneNumber
        this.firstNameSMS = maindata.firstName
        this.lastNameSMS = maindata.lastName
        let data = {
          bookingId: maindata.id,
          newPin: this.newPin,          
          createdBy:this.$session.get('user').userdetails.id,          
          oldPin:`Rest By ${this.$session.get('user').userdetails.username} from  ${this.$session.get('user').userdetails.branch_name}`,
        
       }
         this.$socket.emit('ResetPin',data) 
      },
      getAuthorisations(){
           this.$socket.emit('authBookings')
           this.$socket.emit('authBookingsBuy')      
      },
      saveMiniDeposit(){
          //console.log(data)
          let newStatus = 0
          if(this.authData.status == 12){
            newStatus = 1
          }
           if(this.authData.status == 17){
            newStatus = 6
          }
          if(this.miniDeposit != ''){
            let data = {
              id:  this.authData.id,
              isForex: this.authData.isForex,
              authorizedBy: `Authorized By ${this.$session.get('user').userdetails.username} from  ${this.$session.get('user').userdetails.branch_name}`,
              authorizedAt: Date.now(),
              status: newStatus,
              authorized: 1,              
              userId:this.$session.get('user').userdetails.id,
              fxuserId: this.authData.userId,
              amount: this.authData.amount,
              currencyId: this.authData.sellCurrencyID,
              currency: this.authData.sellCurrency,
              minimumDeposit: this.miniDeposit

            }
            this.$socket.emit('authBookingsUpdate',data) 
          }else{
             this.$swal.fire({
                                type: 'error',
                                title: 'Minimum Deposit Failure',
                                text: 'Please enter a valid minimum deposit for this booking.'
                            })
          }
       
      },
      AuthApprove(maindata){
        this.dialogMiniDeposit = true
        this.authData = maindata
     
      },
      AuthDecline(maindata){
       let data = {
          id: maindata.id,
          isForex: maindata.isForex,
         authorizedBy: `Declined By ${this.$session.get('user').userdetails.username} from  ${this.$session.get('user').userdetails.branch_name}`,
         authorizedAt: Date.now(),
         authorized: 2,
         status:16,
         userId:this.$session.get('user').userdetails.id,
         fxuserId:maindata.userId,
         amount:maindata.amount,
         currencyId:maindata.sellCurrencyID
       }
         this.$socket.emit('authBookingsUpdate',data) 
      },

       AuthApproveBuy(maindata){
      // console.log(maindata)
      let newStatus = 0
          if(maindata.status == 18){
            newStatus = 2
          }
           if(maindata.status == 19){
            newStatus = 6
          }
       let data = {
         id: maindata.id,
         bookingID: maindata.bookingID,
         isForex: maindata.isForex,
         authorizedBy: `Authorized by ${this.$session.get('user').userdetails.username} from  ${this.$session.get('user').userdetails.branch_name}`,
         authorizedAt: Date.now(),
         authorized: 1,
         status : newStatus,
         newStatus: 1,
         userId:this.$session.get('user').userdetails.id,
         sellerID:maindata.sellerID,
         buyerUserID:maindata.buyerUserId,
         buyerAmount:maindata.buyerAmount,
         buyerAmountBB: maindata.buyerAmount/maindata.sellerRate,
         sellerAmount: maindata.amount,
         sellCurrencyID:maindata.sellCurrencyID,
         buyCurrencyID:maindata.buyCurrencyID
       }
       //console.log(data)
       this.$socket.emit('authBookingsUpdateBuy',data) 
      },
      AuthDeclineBuy(maindata){
        let newStatus = 0
          if(maindata.status == 18){
            newStatus = 1
          }
           if(maindata.status == 19){
            newStatus = 6
          }
       let data = {
          id: maindata.id,
          bookingID: maindata.bookingID,
          isForex: maindata.isForex,
         authorizedBy: `Declined By ${this.$session.get('user').userdetails.username} from  ${this.$session.get('user').userdetails.branch_name}`,
         authorizedAt: Date.now(),
         authorized: 2,
         status:16,
         newStatus:newStatus,
         userId:this.$session.get('user').userdetails.id,
         sellerID:maindata.sellerID,
         buyerUserID:maindata.buyerUserId,
         buyerAmount:maindata.buyerAmount,
         sellerAmount: maindata.amount,
         sellCurrencyID:maindata.sellCurrencyID,
         buyCurrencyID:maindata.buyCurrencyID
       }
       //console.log(maindata)
        this.$socket.emit('authBookingsUpdateBuy',data) 
      },
   async sendVerifyWhatsApp(data){
      // console.log(data)
         var msg = `Good day ${data.firstName} ${data.lastName}%0A%0AYour ${data.imageType}%0Ahas just been verified.%0A%0AContiCash Booking System`;
       
        var newmessage = encodeURI(msg);
        await fetch('https://sms.contitouch.co.zw/api.json?cmd=sendwapp&username=booking&password=kKiXdhhf&senderid=Booking&gsm='+data.phoneNumber+'&msg='+newmessage,
                {
                  method: "GET",
                  mode: "no-cors"
              }).then(
                    function(response) {
                      if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                          response.status+ ' error: ' + response.text);
                        return;
                      }

                      // Examine the text in the response
                      response.json().then(function(data) {
                        console.log(data);
                      });
                    }
                  )
                  .catch(function(err) {
                    console.log('Fetch Error :-S', err);
                  });
           
    },
  async sendDeclineWhatsApp(){
        var msg = `Good day ${this.declineItem.firstName} ${this.declineItem.lastName}%0A%0AYour ${this.declineItem.imageType}%0Ahas been declined.%0A%0AReason%0A%0A${this.declineReason}`;
       
        var newmessage = encodeURI(msg);
        await fetch('https://sms.contitouch.co.zw/api.json?cmd=sendwapp&username=booking&password=kKiXdhhf&senderid=Booking&gsm='+this.declineItem.phoneNumber+'&msg='+newmessage,
                {
                  method: "GET",
                  mode: "no-cors"
              }).then(
                    function(response) {
                      if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                          response.status+ ' error: ' + response.text);
                        return;
                      }

                      // Examine the text in the response
                      response.json().then(function(data) {
                        console.log(data);
                      });
                    }
                  )
                  .catch(function(err) {
                    console.log('Fetch Error :-S', err);
                  });
           
    },
   async verified(data){
         var token = this.$jwt.sign({ status: 11,userId: data.userId,updatedBy:` ${this.$session.get('user').userdetails.first_name} ${this.teller_last_name = this.$session.get('user').userdetails.last_name} from ${this.teller_branch = this.$session.get('user').userdetails.branch_name}`}, 'fxbooking@@11',{expiresIn : 15});

          let imageData = {
                payload: token                
            }
         await Axios.put(this.nodeAPI+'/verify/'+data.id,imageData)
          .subscribe(res =>{
                if(res.data.message == 'success'){
                this.getAllPendingVerifications()
                this.sendVerifyWhatsApp(data)
                this.avatar = ''
                const Toast = this.$swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,                
                 
                })
                Toast.fire({
                  icon: 'success',
                  title: 'Image Verified successfully'
                })
            }else{
                this.overlay = false
                this.$swal.fire({
                                type: 'error',
                                title: 'Image Verification Failure',
                                text: 'Failed to verify image, please try again.'
                            })
            }
         
           
          },err => {
             
              console.log(err)
              })
    },
    decline(data){
        this.dialogDecline = true
        this.declineItem = data
    },
    declineBuy(data){
        this.dialogDeclineBuy = true
        this.declineItem = data
    },
    declineSell(data){
        this.dialogDeclineSell = true
        this.declineItem = data
    },
   async saveDecline(){
         var token = this.$jwt.sign({ status: 9,userId: this.declineItem.userId,updatedBy:` ${this.$session.get('user').userdetails.first_name} ${this.teller_last_name = this.$session.get('user').userdetails.last_name} from ${this.teller_branch = this.$session.get('user').userdetails.branch_name}`}, 'fxbooking@@11',{expiresIn : 15});

          let imageData = {
                payload: token                
            }
         await Axios.put(this.nodeAPI+'/verifyDecline/'+this.declineItem.id,imageData)
          .subscribe(res =>{
                if(res.data.message == 'success'){
                this.getAllPendingVerifications()
                this.avatar = ''
                this.sendDeclineWhatsApp()
                 this.dialogDecline = false
                 this.declineReason = ''
                const Toast = this.$swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,                
                 
                })
                Toast.fire({
                  icon: 'success',
                  title: 'Image Declined successfully'
                })
            }else{
                this.overlay = false
                this.$swal.fire({
                                type: 'error',
                                title: 'Image Verification Failure',
                                text: 'Failed to verify image, please try again.'
                            })
            }
         
           
          },err => {
             
              console.log(err)
              })
    },
    async saveDeclineSell(){
         var token = this.$jwt.sign({ status: 9,userId: this.declineItem.userId,updatedBy:` ${this.$session.get('user').userdetails.first_name} ${this.teller_last_name = this.$session.get('user').userdetails.last_name} from ${this.teller_branch = this.$session.get('user').userdetails.branch_name}`}, 'fxbooking@@11',{expiresIn : 15});

          let imageData = {
                payload: token                
            }
         await Axios.put(this.nodeAPI+'/verifyDecline/'+this.declineItem.id,imageData)
          .subscribe(res =>{
                if(res.data.message == 'success'){
                this.getAllPendingVerifications()
                this.avatar = ''
                this.sendDeclineWhatsApp()
                 this.dialogDeclineSell = false
                 this.declineReasonSell = ''
                const Toast = this.$swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,                
                 
                })
                Toast.fire({
                  icon: 'success',
                  title: 'Image Declined successfully'
                })
            }else{
                this.overlay = false
                this.$swal.fire({
                                type: 'error',
                                title: 'Image Verification Failure',
                                text: 'Failed to verify image, please try again.'
                            })
            }
         
           
          },err => {
             
              console.log(err)
              })
    },
    async saveDeclineBuy(){
         var token = this.$jwt.sign({ status: 9,userId: this.declineItem.userId,updatedBy:` ${this.$session.get('user').userdetails.first_name} ${this.teller_last_name = this.$session.get('user').userdetails.last_name} from ${this.teller_branch = this.$session.get('user').userdetails.branch_name}`}, 'fxbooking@@11',{expiresIn : 15});

          let imageData = {
                payload: token                
            }
         await Axios.put(this.nodeAPI+'/verifyDecline/'+this.declineItem.id,imageData)
          .subscribe(res =>{
                if(res.data.message == 'success'){
                this.getAllPendingVerifications()
                this.avatar = ''
                this.sendDeclineWhatsApp()
                 this.dialogDeclineBuy = false
                 this.declineReasonBuy = ''
                const Toast = this.$swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,                
                 
                })
                Toast.fire({
                  icon: 'success',
                  title: 'Image Declined successfully'
                })
            }else{
                this.overlay = false
                this.$swal.fire({
                                type: 'error',
                                title: 'Image Verification Failure',
                                text: 'Failed to verify image, please try again.'
                            })
            }
         
           
          },err => {
             
              console.log(err)
              })
    },
     clickTable(data){
         this.avatar = data.image
     },
      async getAllUsers(){
             var token = this.$jwt.sign({ userId: 1}, 'fxbooking@@11',{expiresIn : 15});

          let imageData = {
                payload: token                
            }
         await Axios.post(this.nodeAPI+'/getAllUser',imageData)
          .subscribe(res =>{
                if(res.data){
                    var decoded = this.$jwt.decode(res.data.token, {complete: true});
                    //console.log(decoded)
                    this.userData = decoded.payload.rows
                }else{
                    console.log('failed to load data')
                }
         
           
          },err => {
             
              console.log(err)
              })
        },
        async getAllPendingVerifications(){
             var token = this.$jwt.sign({ userId: 1}, 'fxbooking@@11',{expiresIn : 15});

          let imageData = {
                payload: token                
            }
         await Axios.post(this.nodeAPI+'/getAllPendingVerification',imageData)
          .subscribe(res =>{
               if(res.data){
                    var decoded = this.$jwt.decode(res.data.token, {complete: true});
                    //console.log(decoded)
                    this.pendingVerifyData = decoded.payload.rows
                }else{
                    console.log('failed to load data')
                }
           
          },err => {
              this.overlay = false
              console.log(err)
              })
        }
    },
}
</script>
<style scoped>
    .basil {
  background-color: #FFFBE6 !important;
}
.basil--text {
  color: #356859 !important;
}
</style>