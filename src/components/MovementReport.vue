<template>
     <div >
       <v-layout row wrap>
             
           <h2 style="margin-top:10px;">Float Account Administration </h2>
            
        
         </v-layout> 
       <v-tabs
     
      color="blue lighten-4"
      
      slider-color="red"
    >
      <v-tab>
        User Floats
      </v-tab>
      <v-tab-item>       
       <v-layout row wrap>
              <!-- Branch Section -->
        <v-flex xs12 md5 ma-2>
        <v-card hover>
             <v-flex mt-1 class="card1">
                <v-flex ma-1>
                    <h4>Users List</h4>
                </v-flex>   
         <v-layout> 
         <v-flex > 
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
            style="margin:5px;"
          ></v-text-field>
          </v-flex> 
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn flat icon color="blue lighten-2" @click="openAddNewUser">
                        <v-icon v-on="on">add</v-icon>
                    </v-btn>
                </template>
                <span>Create Users</span>
            </v-tooltip>
            
          
        </v-layout>  

        <v-dialog v-model="dialogUser" max-width="600px">                            
                
                  <v-stepper v-model="e1">
                    <v-stepper-header>
                      <v-stepper-step editable :complete="e1 > 1" step="1">Personal Information</v-stepper-step>

                      <v-divider></v-divider>

                      
                      <v-stepper-step editable step="2">System User Configuration</v-stepper-step>
                    </v-stepper-header>
 
                    <v-stepper-items>
                      <v-stepper-content step="1" >
                        <v-layout wrap justify-center>
                          
                          <v-flex xs12 sm6 md6>
                            <v-text-field v-model="editedUser.first_name" label="First Name"></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                            <v-text-field v-model="editedUser.last_name" label="Last Name"></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md12>
                            <v-text-field v-model="editedUser.email" label="Email Address"></v-text-field>
                          </v-flex>                            
                      
                    </v-layout>
                        <v-btn
                          color="primary"
                          @click="e1 = 2"
                        >
                          Continue
                        </v-btn>

                       
                      </v-stepper-content>

                     
                      <v-stepper-content step="2">
                        <v-layout wrap justify-center>
                          
                          <v-flex xs12 sm6 md12>
                            <v-text-field v-model="editedUser.username" label="User Name"></v-text-field>
                          </v-flex>
                          
                           <v-flex xs12 sm md12>
                            <v-select
                              v-model="editedUser.user_type"
                              label="User Type"
                              item-text="name"
                              item-value="id"                                                      
                              :items="userlevelData"
                            >
                            </v-select>
                          </v-flex>     
                          <v-flex xs12 sm md12>
                            <v-select
                            v-show="editCheck"
                              v-model="editedUser.status"
                              label="User Status"
                              item-text="status"
                              item-value="id"                                                      
                              :items="statusData"
                            >
                            </v-select>
                          </v-flex>                                       
                      
                    </v-layout>

                          <v-btn
                        
                          color="primary"
                          @click="saveNewUser"
                        >
                          Save
                        </v-btn>

                        

                        <v-btn text @click="e1 = 1">back</v-btn>
                      </v-stepper-content>
                       
                    </v-stepper-items>
                  </v-stepper>
            </v-dialog>


          <v-data-table
            :headers="headersCompany1"
            :items="companyData1"
            :search="search"
            class="elevation-1"
            hide-actions
          >
            <template v-slot:items="props">
              <td @click="getBranchByCompanyID1(props.item)">{{ props.item.username }}</td>
              <td class="text-xs-left" @click="getBranchByCompanyID1(props.item)">{{ props.item.first_name}} {{ props.item.last_name}}</td>
             
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
           </v-card>
          </v-flex>

            
            <!-- User Link Section -->
        <v-flex xs12 md6 ma-2>
        <v-card hover >
             <v-flex mt-1 class="card3">
                <v-flex ma-1>
                    <h4>Float Accounts for : {{UserLinkFormData1.branch_name}}</h4>
                </v-flex>  
        <v-layout> 
         <v-flex > 
          <v-text-field
            v-model="search1"
            append-icon="search"
            label="Search"
            single-line
            hide-details
            style="margin:5px;"
          ></v-text-field>
          </v-flex> 
         
             <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn flat icon color="blue lighten-2" @click="getAllNullUsersByBranch1">
                        <v-icon v-on="on">add</v-icon>
                    </v-btn>
                </template>
                <span>Create Account</span>
            </v-tooltip>
          
        </v-layout>  
          <v-data-table
            :headers="headersUsers1"
            :key="UserLinkData1.branch_id"
            :items="UserLinkData1"
            :search="search1"
            class="elevation-1"
            hide-actions
          >
            <template v-slot:items="props">
              <td>{{ props.item.id }}</td>
              <td class="text-xs-left">{{ props.item.symbol}}</td>
              <td class="text-xs-left">{{ parseFloat(props.item.amount).toFixed(2)}}</td>
              <td>
                 <v-tooltip bottom>
                  <template v-slot:activator="{ on }"> 
                        <v-icon
                          
                          class="mr-2"
                          @click="restCap(props.item)"
                          v-on="on"
                        >
                          cached
                        </v-icon>
                        </template>
                    <span>Rest WorldRemit Error Cap</span>
                  </v-tooltip>
              </td>

             
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
           </v-card>
          </v-flex>

       </v-layout>
     
     
      </v-tab-item>



      <v-tab>
        Branch Floats
      </v-tab>
      <v-tab-item>       
       <v-layout row wrap>
              <!-- Branch Section -->
        <v-flex xs12 md5 ma-2>
        <v-card hover>
             <v-flex mt-1 class="card1">
                <v-flex ma-1>
                    <h4>Branch List</h4>
                </v-flex>   
         <v-layout> 
         <v-flex > 
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
            style="margin:5px;"
          ></v-text-field>
          </v-flex> 

            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn flat icon color="blue lighten-2" @click="dialogAddBranch = true">
                        <v-icon v-on="on">add</v-icon>
                    </v-btn>
                </template>
                <span>Create Branch</span>
            </v-tooltip>
          
        </v-layout>  

          <v-data-table
            :headers="headersCompany"
            :items="companyData"
            :search="search"
            class="elevation-1"
            hide-actions
          >
            <template v-slot:items="props">
              <td @click="getBranchByCompanyID(props.item)">{{ props.item.branchname }}</td>
              <td class="text-xs-left" @click="getBranchByCompanyID(props.item)">{{ props.item.address}}</td>
             <!-- <td>
                <v-icon
                  small
                  class="mr-2"
                  @click="editItemUser(props.item)"
                >
                  edit
                </v-icon>
                
              </td> -->
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
           </v-card>
          </v-flex>

            
            <!-- User Link Section -->
        <v-flex xs12 md6 ma-2>
        <v-card hover >
             <v-flex mt-1 class="card3">
                <v-flex ma-1>
                    <h4>Float Accounts for : {{UserLinkFormData.branch_name}}</h4>
                </v-flex>  
        <v-layout> 
         <v-flex > 
          <v-text-field
            v-model="search1"
            append-icon="search"
            label="Search"
            single-line
            hide-details
            style="margin:5px;"
          ></v-text-field>
          </v-flex> 
         
             <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn flat icon color="blue lighten-2" @click="getAllNullUsersByBranch">
                        <v-icon v-on="on">add</v-icon>
                    </v-btn>
                </template>
                <span>Create Account</span>
            </v-tooltip>

            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn flat icon color="green lighten-2" @click="getAllNullUsersByBranch5">
                        <v-icon v-on="on">build</v-icon>
                    </v-btn>
                </template>
                <span>Float Limits Config</span>
            </v-tooltip>
          
        </v-layout>  
          <v-data-table
            :headers="headersUsers"
            :key="UserLinkData.branch_id"
            :items="UserLinkData"
            :search="search1"
            class="elevation-1"
            hide-actions
          >
            <template v-slot:items="props">
              <td>{{ props.item.branch_id }}</td>
              <td class="text-xs-left">{{ props.item.iso_code}}</td>
              <td class="text-xs-left">{{ parseFloat(props.item.amount).toFixed(2)}}</td>
             <!-- <td>
                 
              </td> -->
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
           </v-card>
          </v-flex>

       </v-layout>
     
     
      </v-tab-item>

      <v-tab>
        Treasury Floats
      </v-tab>
      <v-tab-item>       
       <v-layout row wrap>
              <!-- Branch Section -->
        <v-flex xs12 md12 ma-2>
        <v-card hover>
             <v-flex mt-1 class="card1">
                <v-flex ma-1>
                    <h4>Treasury Accounts</h4>
                </v-flex>   
         <v-layout> 
         <v-flex > 
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
            style="margin:5px;"
          ></v-text-field>
          </v-flex> 
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn flat icon color="blue lighten-2" @click="getAllNullUsersByBranch2">
                        <v-icon v-on="on">add</v-icon>
                    </v-btn>
                </template>
                <span>Create Account</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn flat icon color="blue lighten-2" @click="getAllNullUsersByBranch3">
                        <v-icon v-on="on">monetization_on</v-icon>
                    </v-btn>
                </template>
                <span>Upload Money</span>
            </v-tooltip>

            <!-- <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn flat icon color="green lighten-2" @click="getAllNullUsersByBranch4">
                        <v-icon v-on="on">build</v-icon>
                    </v-btn>
                </template>
                <span>Float Limits Config </span>
            </v-tooltip> -->
          
        </v-layout>  

          <v-data-table
            :headers="headersCompany2"
            :items="companyData2"
            :search="search"
            class="elevation-1"
            hide-actions
          >
            <template v-slot:items="props">
              <td @click="getBranchByCompanyID2(props.item)">{{ props.item.id }}</td>
              <td class="text-xs-left" @click="getBranchByCompanyID2(props.item)">{{ props.item.symbol}}</td>
             <td class="text-xs-left" @click="getBranchByCompanyID2(props.item)">{{ parseFloat(props.item.amount).toFixed(2)}}</td>
           
             <!-- <td>
                <v-icon
                  small
                  class="mr-2"
                  @click="editItemUser2(props.item)"
                >
                  edit
                </v-icon>
                
              </td> -->
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
           </v-card>
          </v-flex>

          

       </v-layout>
     
      </v-tab-item>
    </v-tabs>


         
         <v-layout row wrap>
           
            <!-- Company creation dialog -->
            <v-dialog v-model="dialogAddBranch" max-width="600px">
                  <v-card>
                    <v-card-title class="yellow darken-2 white--text">
                    <span class="headline">Branch Creation Form</span>
                    </v-card-title>
                   
                   
                        <v-layout wrap ma-3>
                        
                        <v-flex xs12>
                            <v-text-field v-model="companyFormData.name" label="Branch Name" required></v-text-field>
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field v-model="companyFormData.address" label="Address" type="text" required></v-text-field>
                        </v-flex>
                        
                        <v-flex xs12 sm6>
                             <vue-tel-input v-model="companyFormData.phone_number"  @input="getTelePhone" style="margin-top: 15px;" v-bind:style='{"color" : (isActive? "red" : "blue" )}'></vue-tel-input>
                           
                        </v-flex>
                        </v-layout>           
                   
                   
                   
                    <v-spacer></v-spacer>
                    <v-btn color="red" class="white--text" @click="dialogAddBranch = false">Close</v-btn>
                    <v-btn color="green" class="white--text" @click="AddBranch">Save</v-btn>
                   
                </v-card>
            </v-dialog>    


<!-- add user to branch creation dialog -->
            <v-dialog v-model="dialogAddUserList" max-width="400px">
                  <v-card>
                    <v-card-title class="yellow darken-2 white--text">
                    <span class="headline">Create Branch Float Account</span>
                   
                    </v-card-title>
                   
                   
                        <v-layout wrap ma-3>
                          <v-flex > 
                            <v-combobox
                              
                              v-model="selectedcurrencybranch"
                              
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
                        </v-layout>  
                        <v-spacer></v-spacer>
                    <v-btn color="red" class="white--text" @click="dialogAddUserList = false">Close</v-btn>
                    <v-btn color="green" class="white--text" @click="AddBranchFloat">Save</v-btn>
                   
                </v-card>
            </v-dialog>   
            
            <!-- add user to branch creation dialog -->
            <v-dialog v-model="dialogAddUserList1" max-width="400px">
                  <v-card>
                    <v-card-title class="yellow darken-2 white--text">
                    <span class="headline">Create User Float Account</span>
                   
                    </v-card-title>
                   
                   
                        <v-layout wrap ma-3>
                          <v-flex > 
                            <v-combobox
                              
                              v-model="selectedcurrencyuser"
                              
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
                        </v-layout>  
                        <v-spacer></v-spacer>
                    <v-btn color="red" class="white--text" @click="dialogAddUserList1 = false">Close</v-btn>
                    <v-btn color="green" class="white--text" @click="AddUserFloat">Save</v-btn>
                   
                </v-card>
            </v-dialog>   
            
             <!-- add user to branch creation dialog -->
            <v-dialog v-model="dialogAddUserList2Inject" max-width="400px">
                  <v-card>
                    <v-card-title class="yellow darken-2 white--text">
                    <span class="headline">Inject Float Into Account</span>
                   
                    </v-card-title>
                   
                   
                        <v-layout wrap ma-3>
                          <v-flex xs12> 
                            <v-combobox
                              
                              v-model="selectedcurrencytreasuryInject"
                              
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

                          <v-flex xs12> 
                            <v-combobox
                              
                              v-model="selectedcompany"
                              
                              :items="companies"
                              item-text="name"
                              item-value="id"
                              label="Select Product">
                            </v-combobox>          
                          </v-flex>
                          <v-flex xs12>
                            <v-text-field v-model="amount" label="Amount to inject" required></v-text-field>
                        </v-flex>
                        </v-layout>  
                        <v-spacer></v-spacer>
                    <v-btn color="red" class="white--text" @click="dialogAddUserList2Inject = false">Close</v-btn>
                    <v-btn color="green" class="white--text" @click="AddTreasuryFloatInject">Save</v-btn>
                   
                </v-card>
            </v-dialog>   

               <!-- add user to branch creation dialog -->
            <v-dialog v-model="dialogAddUserList3Inject" max-width="500px">
                  <v-card>
                    <v-card-title class="yellow darken-2 white--text">
                    <span class="headline">Configure Float Limits : {{UserLinkFormData.branch_name}}</span>
                   
                    </v-card-title>
                   
                    <v-data-table
                              :headers="headersConfig"
                              :items="FloatLimits"
                            >
                      <template v-slot:items="props">
                       <td>{{props.item.iso_code}}</td>
                        
                        <td class="text-xs-right">
                          <v-edit-dialog
                            :return-value.sync="props.item.top_limit"
                            large
                            lazy
                            persistent
                            @save="save(props.item)"
                            @cancel="cancel"
                            @open="open"
                            @close="close"
                          >
                            <div>{{ props.item.top_limit }}</div>
                            <template v-slot:input>
                              <div class="mt-3 title">Update High Float Limit</div>
                            </template>
                            <template v-slot:input>
                              
                              <v-text-field
                                v-model="props.item.top_limit"
                                label="Edit"
                                single-line
                                type="number"
                                autofocus
                              ></v-text-field>
                            </template>
                          </v-edit-dialog>
                        </td>

                        <td class="text-xs-right">
                          <v-edit-dialog
                            :return-value.sync="props.item.bottom_limit"
                            large
                            lazy
                            persistent
                            @save="save(props.item)"
                            @cancel="cancel"
                            @open="open"
                            @close="close"
                          >
                            <div>{{ props.item.bottom_limit }}</div>
                            <template v-slot:input>
                              <div class="mt-3 title">Update Low Float Limit</div>
                            </template>
                            <template v-slot:input>
                              <v-text-field
                                v-model="props.item.bottom_limit"
                                
                                label="Edit"
                                single-line
                                type="number"
                                autofocus
                              ></v-text-field>
                            </template>
                          </v-edit-dialog>
                        </td>
                      
                        
                        
                      </template>
                    </v-data-table>

                    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
                      {{ snackText }}
                      <v-btn flat @click="snack = false">Close</v-btn>
                    </v-snackbar>
                </v-card>
            </v-dialog>   

              <!-- add user to branch creation dialog -->
            <v-dialog v-model="dialogAddUserList2Create" max-width="400px">
                  <v-card>
                    <v-card-title class="yellow darken-2 white--text">
                    <span class="headline">Create Treasury Float Account</span>
                   
                    </v-card-title>
                   
                   
                        <v-layout wrap ma-3>
                          <v-flex xs12> 
                            <v-combobox
                              
                              v-model="selectedcurrencytreasuryCreate"
                              
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
                         
                        </v-layout>  
                        <v-spacer></v-spacer>
                    <v-btn color="red" class="white--text" @click="dialogAddUserList2Create = false">Close</v-btn>
                    <v-btn color="green" class="white--text" @click="AddTreasuryFloatCreate">Save</v-btn>
                   
                </v-card>
            </v-dialog>   
           
           
           
 <!-- User creation dialog -->
            <v-dialog v-model="dialogAddUser" max-width="600px">
                  <v-card>
                    <v-card-title class="yellow darken-2 white--text">
                    <span class="headline">Create New User Form</span>
                    </v-card-title>
                   
                   
                        <v-layout wrap ma-3>
                        
                        <v-flex xs6>
                            <v-text-field v-model="UserCreateData.first_name" label="First Name" required></v-text-field>
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field v-model="UserCreateData.last_name" label="Last Name" type="text" required></v-text-field>
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field v-model="UserCreateData.username" label="Username" required></v-text-field>
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field v-model="UserCreateData.email" label="Email" type="text" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-select
                              v-model="UserCreateData.user_type"
                              :items="userlevelData"
                              label="User Type"
                              item-text="name"
                              item-value="id"
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 sm6>
                             <vue-tel-input v-model="UserCreateData.cell"  @input="getTelePhoneUser" style="margin-top: 15px;" v-bind:style='{"color" : (isActive? "red" : "blue" )}'></vue-tel-input>
                           
                        </v-flex>
                        </v-layout>           
                   
                   
                   
                    <v-spacer></v-spacer>
                    <v-btn color="red" class="white--text" @click="dialogAddUser = false">Close</v-btn>
                    <v-btn color="green" class="white--text" @click="AddUserData">Save</v-btn>
                   
                </v-card>
            </v-dialog>   
            
           

         

     
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
  // props: ['value'],
    data() {
        return { 
            e1:0,
            //nodeApi: '',
            nodeApi: '',
            image: '/img/',
            userlevelData:[],
            dialogloader: false,
            phone: '',
            selectedcurrency:'',
            selectedcurrencytreasury:'',
            selectedcurrencytreasuryInject:'',
            selectedcurrencytreasuryCreate:'',
            selectedcurrencyuser:'',
            selectedcompany : '',
            selectedcurrencybranch:'',
            phoneData:'',
            counter: 0,
            amount:null,
            isActive: true,
            isValidPhone: false,
            dialogAddUser: false,
            dialogUser:false,
            dialogUserEdit: false,
            dialogAddCompany:false,
            dialogAddUserList:false,
            dialogAddUserList1:false,
            dialogAddUserList2Create:false,
            dialogAddUserList2Inject:false,
            dialogAddUserList3Inject:false,
            dialogAddBranch:false,
            dialogLinkUser:false,
            userlevelData:[],
            UsersData: [],
            snack: false,
            snackColor: '',
            snackText: '',
            max25chars: v => v.length <= 25 || 'Input too long!',
            pagination: {},
            headersConfig: [
              {
                text: 'Currency',
                align: 'left',
                sortable: false,
                value: 'iso_code',
              },
              { text: 'Float Top Limit', value: 'calories' },
              { text: 'Float Bottom Limit', value: 'calories' }
             
            ],
            editedUser: {
             id: 0,
              first_name:'',
              last_name:'',
              email:'',
              branch_id:2037,
              user_type:0,
              status:2,
              cell:'',
              created_by: 0  
            },
            ClearUser: {
              first_name:'',
              last_name:'',
              email:'',
              branch_id:2037,
              user_type:0,
              status:2,
              cell:'',
              created_by: 0 
            },
            statusData: [
              { status: 'Active', id: 1 },
              { status: 'Disabled', id: 0 },
            ],
             headersCompany1: [
              
                {
                text: 'User Name',
                align: 'left',
                sortable: false,
                value: 'username'
                },
                 {
                text: 'Full Name',
                align: 'left',
                sortable: false,
                value: 'first_name'
                },
             
                
            ],
            
            headersUsers1: [
              { text: 'Account ID', value: 'id' },
                {
                text: 'Currency',
                align: 'left',
                sortable: false,
                value: 'symbol'
                },
                { text: 'Float Amount', value: 'amount', sortable: false },
                { text: 'Action', value: 'amount', sortable: false },
              
            ],
            headersUsersSelecter1: [
             
                {
                text: 'Currency',
                align: 'left',
                sortable: false,
                value: 'local_currency_id'
                },
                { text: 'Status', value: 'status', sortable: false }
               
            ],
            headersCompany2: [
              
                {
                text: 'Account ID',
                align: 'left',
                sortable: false,
                value: 'id'
                },
                 {
                text: 'Currency',
                align: 'left',
                sortable: false,
                value: 'currency_id'
                }
                ,
                 {
                text: 'Amount',
                align: 'left',
                sortable: false,
                value: 'amount'
                }
            ],
            
            headersUsers2: [
              { text: 'Account ID', value: 'id' },
                {
                text: 'Currency',
                align: 'left',
                sortable: false,
                value: 'iso_code'
                },
                { text: 'Float Amount', value: 'amount', sortable: false }
            ],
            headersUsersSelecter2: [
             
                {
                text: 'Currency',
                align: 'left',
                sortable: false,
                value: 'local_currency_id'
                },
                { text: 'Status', value: 'status', sortable: false }
               
            ],
            headersCompany: [
              
                {
                text: 'Branch Name',
                align: 'left',
                sortable: false,
                value: 'branchname'
                },
                 {
                text: 'Address',
                align: 'left',
                sortable: false,
                value: 'address'
                },
             
               
            ],
            
            headersUsers: [
              { text: 'Branch ID', value: 'id' },
                {
                text: 'Currency',
                align: 'left',
                sortable: false,
                value: 'iso_code'
                },
                { text: 'Float Amount', value: 'amount', sortable: false },
                
            ],
            headersUsersSelecter: [
             
                {
                text: 'Currency',
                align: 'left',
                sortable: false,
                value: 'local_currency_id'
                },
                { text: 'Status', value: 'status', sortable: false }
               
            ],
            search: '',
            search1: '',
            search2: '',
           
            editCheck: false,
            currencies: [],
            companies: [],
            editedIndexUser: -1,
            companyData:[],
            companybranchData:[],
            companyData1:[],
            companybranchData1:[],
            companyData2:[],
            companybranchData2:[],
            UserLinkData1:[],
            UserLinkData2:[],
            UserLinkData:[],
            
            companyFormData: {
               id: 0,
              name: '',
              address: '',
              
              phone_number: '',
              status: 1,     
              
              country:'',
              country_code:'',
              created_by:'',
              created_at:''              
            },
            ClearCompanyFormData: {
               id: 0,
              name: '',
              address: '',
              
              phone_number: '',
              status: 2,     
              
              country:'',
              country_code:'',
              created_by:'',
              created_at:''   
            },
            UserLinkFormData: {
              id: 0,
              user_id:0,
              status: 2,              
              branch_id: null,
              branch_name:'',
              created_by:''             
            },
            UserCreateData:{
              first_name:'',
              last_name:'',
              email:'',
              branch_id:0,
              user_type:0,
              status:2,
              cell:'',
              created_by: 0
            },
            UserLinkFormData1: {
              id: 0,
              user_id:0,
              status: 2,              
              branch_id: 0,
              branch_name:'',
              created_by:''             
            },
            UserCreateData1:{
              first_name:'',
              last_name:'',
              email:'',
              branch_id:0,
              user_type:0,
              status:2,
              cell:'',
              created_by: 0
            },
            UserLinkFormData2: {
              id: 0,
              user_id:0,
              status: 2,              
              branch_id: null,
              branch_name:'',
              created_by:''             
            },
            UserCreateData2:{
              first_name:'',
              last_name:'',
              email:'',
              branch_id:0,
              user_type:0,
              status:2,
              cell:'',
              created_by: 0
            },
            ClearUserCreateData:{
              first_name:'',
              last_name:'',
              email:'',
              branch_id:0,
              user_type:0,
              status:2,
              cell:'',
              created_by: 0
            },
            UserLinkDataNull:[],
            ClearBranchFormData: {
               id: 0,
              name: '',
              status: 1,              
              company_id: 0,
              created_by:'',
              created_at:'',  
               
            },
            ClearUserCreateData2:{
              first_name:'',
              last_name:'',
              email:'',
              branch_id:0,
              user_type:0,
              status:2,
              cell:'',
              created_by: 0
            },
            UserLinkDataNull2:[],
            ClearBranchFormData2: {
               id: 0,
              name: '',
              status: 1,              
              company_id: 0,
              created_by:'',
              created_at:'',  
               
            },
            ClearUserCreateData1:{
              first_name:'',
              last_name:'',
              email:'',
              branch_id:0,
              user_type:0,
              status:2,
              cell:'',
              created_by: 0
            },
            UserLinkDataNull1:[],
            ClearBranchFormData1: {
               id: 0,
              name: '',
              status: 1,              
              company_id: 0,
              created_by:'',
              created_at:'',  
               
            },
            headers: {},
            FloatLimits:[],
            desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            iron: '16%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            iron: '5%',
          },
          {
            name: 'Eclair',
            calories: 262,
            iron: '25%',
          }]
        }
    },
    created() {
      //console.log(this.$session.get('user').token)
       
    },
    mounted() {
      this.getActiveCurrencies()
       this.getAllCompanies()
      this.initializeCompany1()
       this.initializeCompany2()
      this.initializeCompany()
       this.counter += 1
    },
     watch: {
       phone(val){
         //console.log(val)
       },
       counter(val){
         //console.log(val)
       }

     },
    methods: {
     async restCap(data){
         let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
            this.$swal.fire({
            title: 'World Remit Cap Rest?',
            text: "Are you sure you want to rest World Remit Cap for this float account?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Rest Account!'
            }).then((result) => {
            if (result.value) {
              
                
              Axios.post(this.nodeApi+'/restErrorWorldRemit',{id: data.id},{headers:headers})
                  .subscribe(res =>{ 
                    //console.log(res) 
                    if(res.data.data.one.rowsAffected.length > 0){
                        this.$swal.fire({
                        type: 'success',
                        title: 'WorldRemit Cap Rest',
                        text:  'WorldRemit Cap Rest rest successfully'
                      })        
                    }else{
                       this.$swal.fire(
                            'WorldRemit Cap Rest',
                            'There was an error in processing you request. Please try again.',
                            'error'
                          )
                    }
                      
                    
                    },err => console.log(err))        
       
            }
            })
      },
     async save (val) {
        //console.log(val)
       
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,            
        }
             
            await  Axios.put(this.nodeApi+'/updateFloatLimits/'+val.id,{top: val.top_limit,bottom:val.bottom_limit},{headers:headers})
              .subscribe(res =>{
                this.$swal.fire(
                            'Float Configs Edit !!',
                            'Configs where edited successfully.re-open to see changes',
                            'success'
                          )
              },err => { 
                 this.snack = true
                this.snackColor = 'error'
                this.snackText = err
              })

               
        // this.snack = true
        // this.snackColor = 'success'
        // this.snackText = 'Data saved'
      },
      cancel () {
        this.snack = true
        this.snackColor = 'error'
        this.snackText = 'Canceled'
      },
      open () {
        this.snack = true
        this.snackColor = 'info'
        this.snackText = 'Dialog opened'
      },
      close () {
        console.log('Dialog closed')
      },
      // AddTreasuryFloatInject(){
        
      //   let data = {
      //     amount: this.selectedcurrencytreasury.amount,
      //     currency_id: this.selectedcurrencytreasuryInject.id
      //   }
      //   console.log(data)
      // },
      AddTreasuryFloatCreate(){
        
        let data = {
                    
          currency_id: this.selectedcurrencytreasuryCreate.id
        }
        console.log(data)
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
    },
        userFloatMenu(){

        },
        branchFloatMenu(){

        },
      AddBranchFloat(data){
        
         this.dialogloader = true
        let acountdata = {
            branch_id: this.UserLinkFormData.branch_id,
            amount: 0,
            currency_id: this.selectedcurrencybranch.id,
            handover_type: 1,
            status: 2,
            created_by :this.$session.get('user').userdetails.id
        }
        //console.log(acountdata)
        this.dialogAddUserList = false
        
         let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        } 
           Axios.post(this.nodeApi+'/addBranchFloat',acountdata,{headers:headers,timeout: 5000})
          .subscribe(res =>{
            //console.log(res.data)
            if(res.data.data.one){
               this.dialogloader = false
              this.getAllUsersByBranch(this.UserLinkFormData.branch_id)
              
              this.$swal.fire({
                type: 'success',
                title: 'Branch Account Adding',
                text:  'Branch account was added successfully'
              })
              
            }else{
               this.dialogloader = false
            this.$swal.fire({
              
                type: 'error',
                title: 'Branch Account Adding',
                text:  res.data.message
              })
            }
            
          },err =>{
             this.dialogloader = false
             this.$swal.fire(
               'Branch Account Adding Error',
              'Failed to add branch account, probably because the user already has this type of account',
              'error'
            )
          } 
          ) 

      },
    async AddTreasuryFloatCreate(data){
        this.dialogloader = true
        
        let acountdata = {
            branch_id: this.UserLinkFormData2.branch_id,
            amount: 0,
            currency_id: this.selectedcurrencytreasuryCreate.id,
            handover_type: 1,
            status: 2,
            created_by :this.$session.get('user').userdetails.id
        }
         //console.log(acountdata)
        this.dialogAddUserList2Create = false
        
         let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
        await Axios.post(this.nodeApi+'/addTreasuryFloat',acountdata,{headers:headers,timeout: 5000})
          .subscribe(res =>{
            //console.log(res.data)
            if(res.data.message.one){
               this.dialogloader = false
              this.initializeCompany2()
              
              this.$swal.fire({
                type: 'success',
                title: 'Treasury Account Adding',
                text:  'Treasury account was added successfully'
              })
              
            }else{
               this.dialogloader = false
            this.$swal.fire({
                type: 'error',
                title: 'Treasury Account Adding',
                text:  res.data.message
              })
            }
            
          },err =>{
             this.dialogloader = false
             this.$swal.fire(
               'Treasury Account Adding Error',
              'Failed to add user account, probably because the user already has this type of account',
              'error'
            )
          } 
          ) 

      },
     async AddTreasuryFloatInject(){
         this.dialogloader = true
        
        let acountdata = {
            branch_id: this.UserLinkFormData2.branch_id,
            amount: this.amount,
            currency_id: this.selectedcurrencytreasuryInject.id,
            company:this.selectedcompany.id,
            handover_type: 7,
            status: 2,
            created_by :this.$session.get('user').userdetails.id
        }
       // console.log(acountdata)
        this.dialogAddUserList2Inject = false
        
         let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
        await Axios.put(this.nodeApi+'/updateTreasuryFloatIncrease2',acountdata,{headers:headers,timeout: 5000})
          .subscribe(res =>{
            //console.log(res.data)
            if(res.data.data.one){
               this.dialogloader = false
              this.initializeCompany2()
              this.selectedcompany = ''
              this.selectedcurrencytreasuryInject = ''
              this.amount = null
              this.$swal.fire({
                type: 'success',
                title: 'Treasury Account Adding',
                text:  'Treasury account was added successfully'
              })
              
            }else{
               this.dialogloader = false
            this.$swal.fire({
              
                type: 'error',
                title: 'Treasury Account Adding',
                text:  res.data.message
              })
            }
            
          },err =>{
             this.dialogloader = false
             this.$swal.fire(
              'Treasury Account Adding Error',
              err,
              'error'
            )
          } 
          ) 

      },
     async AddUserFloat(data){
        
        this.dialogloader = true
        let acountdata = {
            branch_id: this.UserLinkFormData1.branch_id,
            user_id: this.UserLinkFormData1.user_id,
            amount: 0,
            currency_id: this.selectedcurrencyuser.id,
            handover_type: 1,
            status: 2,
            created_by :this.$session.get('user').userdetails.id
        }
        //console.log(acountdata)
        this.dialogAddUserList1 = false
        
         let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         await Axios.post(this.nodeApi+'/addUserFloat',acountdata,{headers:headers,timeout: 5000})
          .subscribe(res =>{
            //console.log(res)
            if(res.data.data.one){
              this.dialogloader = false
              this.getAllUsersByBranch1(this.UserLinkFormData1.user_id)
              
              this.$swal.fire({
                type: 'success',
                title: 'User Account Adding',
                text:  'User account was added successfully'
              })
              
            }else{
              this.dialogloader = false
            this.$swal.fire({
                type: 'error',
                title: 'User Account Adding',
                text:  res.data.message
              })
            }
            
          },err =>{
            this.dialogloader = false
             this.$swal.fire(
              'User Account Adding Error',
              'Failed to add user account, probably because the user already has this type of account',
              'error'
            )
          } 
          ) 

      },
      AddUser(){
        this.dialogAddUser = true
        this.getAllUserTypes()
      },
      AddUserData(){
        if(!this.UserCreateData.first_name){
           this.$swal.fire(
              'Add User Error',
              'Please enter first name',
              'error'
            )
         }
        else if(!this.UserCreateData.last_name){
           this.$swal.fire(
              'Add User Error',
              'Please enter last name',
              'error'
            )
         }
         else if(!this.UserCreateData.email){
           this.$swal.fire(
              'Add User Error',
              'Please enter email',
              'error'
            )
         }
             
         else if(!this.UserCreateData.cell){
           this.$swal.fire(
              'Phone Error',
              'Please enter a telephone.',
              'error'
            )
          }
        
        else if(!this.isValidPhone){
           this.$swal.fire(
              'Phone Error',
              'Please enter a valid phone number.',
              'error'
            )
          }
          else if(!this.validateEmail(this.UserCreateData.email)){
           this.$swal.fire(
              'Email Error',
              'Please enter a valid email address.',
              'error'
            )
          }
          else if(this.UserCreateData.user_type < 1){
           this.$swal.fire(
              'User Type Error',
              'Please enter a user type.',
              'error'
            )
          }
        else{
           let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
        this.UserCreateData.created_by = this.$session.get('user').userdetails.id
        Axios.post(this.nodeApi+'/addUsers',this.UserCreateData,{headers:headers})
          .subscribe(res =>{ 
            //console.log(res.data)
            if(res.data.message){
              
              this.UserCreateData = this.ClearUserCreateData
              this.getAllNullUsersByBranch()
              this.dialogAddUser = false
              this.$swal.fire({
                type: 'success',
                title: 'User Added',
                text:  'User was added successfully'
              })
            }     
            else {
              
              this.$swal.fire({
                type: 'error',
                title: 'User Adding Failed',
                text:  res.data.message
              })
            }                 
             
          },err => console.log(err))        
        
 
        
        }
      },
      AddUsertoBranch(){

      },
      AddBranch(){

      },
      getBranchByCompanyID1(data){
        //console.log(data)
        this.UserLinkFormData1.user_id = data.id
        this.UserLinkFormData1.branch_id = data.branch_id
        this.UserLinkFormData1.branch_name = data.first_name+ ' '+ data.last_name
       // console.log(this.UserLinkFormData1)
        this.getAllUsersByBranch1(data.id)
        
      },
      getBranchByCompanyID2(data){
       // console.log(data)
        this.UserLinkFormData2.branch_id = data.id
        this.UserLinkFormData2.branch_name = data.branchname
        this. getAllUsersByBranch(data.id)
        
      },
      getBranchByCompanyID(data){
        //console.log(data)
        this.UserLinkFormData.branch_id = data.id
        this.UserLinkFormData.branch_name = data.branchname
        this. getAllUsersByBranch(data.id)
        
      },
        AddBranch(){
           if(!this.companyFormData.name){
           this.$swal.fire(
              'Compnay Name Error',
              'Please enter a company name',
              'error'
            )
         }
        else if(!this.companyFormData.address){
           this.$swal.fire(
              'Compnay address Error',
              'Please enter a company address.',
              'error'
            )
         }
             
         else if(!this.companyFormData.phone_number){
           this.$swal.fire(
              'Phone Error',
              'Please enter a telephone.',
              'error'
            )
          }
        
        else if(!this.isValidPhone){
           this.$swal.fire(
              'Phone Error',
              'Please enter a valid phone number.',
              'error'
            )
          }
        else{
           let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
          this.companyFormData.created_by = this.$session.get('user').userdetails.id;
          Axios.post(this.nodeApi+'/addBranches',this.companyFormData,{headers:headers})
          .subscribe(res =>{ 
            if(res.data.message = 'Success'){
              this.closeUser()
              this.companyFormData = this.ClearCompanyFormData
              this.initializeCompany()
              this.dialogAddBranch = false
              this.$swal.fire({
                type: 'success',
                title: 'Branch Added',
                text:  'Branch was added successfully'
              })
            }     
            else {
              
              this.$swal.fire({
                type: 'error',
                title: 'Branch Adding Failed',
                text:  res.data.message
              })
            }                 
             
          },err => console.log(err))        
        }
           // console.log(this.companyFormData)
        },
         getTelePhone(e,phoneData){
          if(phoneData.isValid){
            this.isActive = false
             //console.log(phoneData)
            this.isValidPhone = phoneData.isValid
            this.companyFormData.country = phoneData.country.name
            this.companyFormData.country_code = phoneData.country.iso2
          }
           if(!phoneData.isValid){
            this.isActive = true
             //console.log(phoneData)
          }
         
         
        },
        getTelePhoneUser(e,phoneData){
          if(phoneData.isValid){
            this.isActive = false
             //console.log(phoneData)
            this.isValidPhone = phoneData.isValid
            // this.companyFormData.country = phoneData.country.name
            // this.companyFormData.country_code = phoneData.country.iso2
          }
           if(!phoneData.isValid){
            this.isActive = true
             //console.log(phoneData)
          }
         
         
        },
      getAllCompanies(){
         let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
           Axios.get(this.nodeApi+'/getAllCompanies',{headers:headers})
          .subscribe(res =>{
            this.companies = res.data.data.one.recordset
            //console.log(this.companyData)
          },err => console.log(err)) 
      },
      getAllUsersByBranch(data){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
           Axios.post(this.nodeApi+'/getBranchFloatByCol',{col:'branch_id',value:data},{headers:headers})
          .subscribe(res =>{
            this.UserLinkData = res.data.data.one.recordset
            //console.log(this.companyData)
          },err => console.log(err)) 
      },
      getAllNullUsersByBranch(){
        if(this.UserLinkFormData.branch_name != ''){
          this.dialogAddUserList = true
          let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
           Axios.get(this.nodeApi+'/getAllRates',{headers:headers})
          .subscribe(res =>{
            this.UserLinkDataNull = res.data.data.one.recordset
            //console.log(this.companyData)
          },err => console.log(err)) 
        }else{
          this.$swal.fire(
              'User Link Error',
              'Please select a branch to add a user.',
              'error'
            )

        }
        
      },
      getAllCompanies2(){
           Axios.get(this.nodeApi+'/getAllCompanies')
          .subscribe(res =>{
            this.companyData = res.data.recordset
            //console.log(this.companyData)
          },err => console.log(err)) 
      },
      getAllUsersByBranch2(data){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
           Axios.post(this.nodeApi+'/getBranchFloatByCol',{col:'branch_id',value:data},{headers:headers})
          .subscribe(res =>{
            this.UserLinkData2 = res.data.data.one.recordset
            //console.log(this.companyData)
          },err => console.log(err)) 
      },
      getAllNullUsersByBranch2(){
       
          this.dialogAddUserList2Create = true
          let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
           Axios.get(this.nodeApi+'/getAllRates',{headers:headers})
          .subscribe(res =>{
            this.UserLinkDataNull2 = res.data.data.one.recordset
            //console.log(this.companyData)
          },err => console.log(err)) 
        
        
      },
      getAllNullUsersByBranch3(){
       
          this.dialogAddUserList2Inject = true
          let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
           Axios.get(this.nodeApi+'/getAllRates',{headers:headers})
          .subscribe(res =>{
            this.UserLinkDataNull2 = res.data.data.one.recordset
            //console.log(this.companyData)
          },err => console.log(err)) 
       
        
      },
       getAllNullUsersByBranch4(){
       
          this.dialogAddUserList3Inject = true
          let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
           Axios.get(this.nodeApi+'/getAllFloatLimits',{headers:headers})
          .subscribe(res =>{
            this.FloatLimits = res.data.data.one.recordset
            //console.log(this.companyData)
          },err => console.log(err)) 
       
        
      },
       getAllNullUsersByBranch5(){
        // console.log(this.UserLinkFormData)
       if(this.UserLinkFormData.branch_id){
          this.dialogAddUserList3Inject = true
          let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
           Axios.post(this.nodeApi+'/getBranchFloatLimits',{branch_id:this.UserLinkFormData.branch_id},{headers:headers})
          .subscribe(res =>{
            this.FloatLimits = res.data.data.one.recordset
            //console.log(this.companyData)
          },err => console.log(err)) 
       }else{
           this.$swal.fire(
              'Float Limit Error',
              'Please select a branch to configure float limits.',
              'error'
            )
       }
         
       
        
      },
      getAllCompanies1(){
           Axios.get(this.nodeApi+'/getAllCompanies')
          .subscribe(res =>{
            this.companyData = res.data.recordset
            //console.log(this.companyData)
          },err => console.log(err)) 
      },
      getAllUsersByBranch1(data){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
           Axios.post(this.nodeApi+'/getUserFloatByCol2',{col:'user_id',value:data},{headers:headers})
          .subscribe(res =>{
            this.UserLinkData1 = res.data.data.one.recordset
            //console.log(this.companyData)
          },err => console.log(err)) 
      },
      getAllNullUsersByBranch1(){
        if(this.UserLinkFormData1.branch_name != ''){
          this.dialogAddUserList1 = true
          let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
           Axios.get(this.nodeApi+'/getAllRates',{headers:headers})
          .subscribe(res =>{
            this.UserLinkDataNull1 = res.data.data.one.recordset
            //console.log(this.companyData)
          },err => console.log(err)) 
        }else{
          this.$swal.fire(
              'User Float Account Error',
              'Please select a user to add a float account.',
              'error'
            )

        }
        
      },
      getBranchPerCompany(companydata){
        //   Axios.get(this.nodeApi+'/getAllCompanies')
        //   .subscribe(res =>{
        //     this.companybranchData = res.data.recordset
        //     //console.log(res.data.recordset)
        //   },err => console.log(err))
      },
      getUsersPerBranch(branchdata){
        //   Axios.get(this.nodeApi+'/getAllCompanies')
        //   .subscribe(res =>{
        //     this.UserLinkData = res.data.recordset
        //     //console.log(res.data.recordset)
        //   },err => console.log(err))
      },
      openEditUser(){
        this.dialogUserEdit = true
      },
      getUserStatus(status){
        if(status == 0){
          return 'Disabled'
        }
        if(status == 1){
          return 'Active'
        }
      },
      openAddNewUser(){
        this.dialogUser = true
        this.getAllUserTypes()
      },
      getAllUserTypes(){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         Axios.get(this.nodeApi+'/getAllUserTypes',{headers:headers})
          .subscribe(res =>{
            this.userlevelData = res.data.data.one.recordset
            //console.log(res.data.recordset)
          },err => console.log(err))
      },
      getUserType(usertype){
        if(usertype == 1){
          return 'Branch Clerk'
        }
         if(usertype == 2){
          return 'Branch Supervisor'
        }
         if(usertype == 3){
          return 'Treasury Officer'
        }
        if(usertype == 4){
          return 'Transporter'
        }
        if(usertype == 5){
          return 'Treasury Manager'
        }
        if(usertype == 6){
          return 'System Admin'
        }
      },
        
        saveNewUser(){
         if(!this.editedUser.user_type){
           this.$swal.fire(
              'User type Error',
              'Please select a user type.',
              'error'
            )
         }
         else if(!this.editedUser.username){
           this.$swal.fire(
              'User Name Error',
              'Please enter a User Name.',
              'error'
            )
          }
        else if(!this.editedUser.first_name || !this.editedUser.last_name){
           this.$swal.fire(
              'Name Error',
              'Please enter Firt Name and Last Name.',
              'error'
            )
          }
         else if(!this.editedUser.email){
           this.$swal.fire(
              'Email Error',
              'Please enter an email.',
              'error'
            )
          }
        
        else if(!this.validateEmail(this.editedUser.email)){
           this.$swal.fire(
              'Email Error',
              'Please enter a valid email address.',
              'error'
            )
          }
        
        else{
         let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
        this.editedUser.created_by = this.$session.get('user').userdetails.id
        //console.log(this.editedUser)
        Axios.post(this.nodeApi+'/createUser',this.editedUser,{headers:headers})
          .subscribe(res =>{ 
            //console.log(res.data)
            if(res.data.message.one){
              
              this.editedUser = this.ClearUser
              this.initializeCompany1()
              this.addUserFloat2(res.data.message.one.recordset.insertId)
              this.dialogUser = false
              this.$swal.fire({
                type: 'success',
                title: 'User Added',
                text:  'User was added successfully'
              })
            }     
            else {
              
              this.$swal.fire({
                type: 'error',
                title: 'User Adding Failed',
                text:  res.data.message
              })
            }                 
             
          },err => console.log(err))        
        
 
        }
        },
       async addUserFloat2(data){
          
        let acountdata = {
            branch_id: 2037,
            user_id: data,
            amount: 0,
            currency_id: 2,
            handover_type: 1,
            status: 2,
            created_by :this.$session.get('user').userdetails.id
        }
        //console.log(acountdata)
        this.dialogAddUserList1 = false
        
         let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         await Axios.post(this.nodeApi+'/addUserFloat2',acountdata,{headers:headers,timeout: 5000})
          .subscribe(res =>{
            //console.log(res)
            if(res.data.data.one){
              this.dialogloader = false
              
              this.$swal.fire({
                type: 'success',
                title: 'User Account Adding',
                text:  'User account was added successfully'
              })
              
            }else{
              this.dialogloader = false
            this.$swal.fire({
                type: 'error',
                title: 'User Account Adding',
                text:  res.data.message
              })
            }
            
          },err =>{
            this.dialogloader = false
             this.$swal.fire(
              'User Account Adding Error',
              'Failed to add user account, probably because the user already has this type of account',
              'error'
            )
          } 
          ) 
        },
        validateEmail(email) {
              var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              return re.test(String(email).toLowerCase());
          },
        editItemUser(item){
          this.getAllUserTypes()
          this.editedIndexUser = this.UsersData.indexOf(item)
          this.editedUser = Object.assign({}, item)
          this.editCheck = true
          this.dialogUser = true
        },
        deleteItemUser(item){
         // console.log(item)
        const index = this.UsersData.indexOf(item)
        this.$swal.fire({
          title: 'Disable Float Account?',
          text: "Are you sure you want to disable float account from branch this !",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Remove!'
        }).then((result) => {           
          if (result.value) {
             let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
           Axios.put(this.nodeApi+'/updateBranchFloat',{col:'status',value:3,wcol:'branch_id',wvalue:item.branch_id},{headers:headers})
          .subscribe(res =>{
            //console.log(res.data)
            if(res.data.message){
              this.getAllUsersByBranch(this.UserLinkFormData.branch_id)
              this.$swal.fire({
                type: 'success',
                title: 'Float Account Disabled',
                text:  'Float account was disabled successfully'
              })
              
            }else{
            this.$swal.fire({
                type: 'error',
                title: 'Float Account Disabled',
                text:  res.data.message
              })
            }
            
          },err =>{
             this.$swal.fire(
              'User Removal Error',
              err,
              'error'
            )
          } 
          ) 

          }
        })
       
        },
        saveUser(){
          
        if(!this.editedUser.user_type){
           this.$swal.fire(
              'User type Error',
              'Please select a user type.',
              'error'
            )
         }
         else if(!this.editedUser.username){
           this.$swal.fire(
              'User Name Error',
              'Please enter a User Name.',
              'error'
            )
          }
        else if(!this.editedUser.first_name || !this.editedUser.last_name){
           this.$swal.fire(
              'Name Error',
              'Please enter Firt Name and Last Name.',
              'error'
            )
          }
         else if(!this.editedUser.email){
           this.$swal.fire(
              'Email Error',
              'Please enter an email.',
              'error'
            )
          }
         else if(!this.editedUser.cell){
           this.$swal.fire(
              'Phone Error',
              'Please enter a cell.',
              'error'
            )
          }
        else if(!this.validateEmail(this.editedUser.email)){
           this.$swal.fire(
              'Email Error',
              'Please enter a valid email address.',
              'error'
            )
          }
        else if(!this.isValidPhone){
           this.$swal.fire(
              'Phone Error',
              'Please enter a valid phone number.',
              'error'
            )
          }
        else{
          Axios.put(this.nodeApi+'/updateUser/'+this.editedUser.id,this.editedUser)
          .subscribe(res =>{ 
            if(res.data.rowsAffected){
              this.closeUser()
              this.editedUser = this.ClearUser
              this.initializeCompany()
              this.$swal.fire({
                type: 'success',
                title: 'User Update',
                text:  'User was updated successfully'
              })
            }     
            if(!res.data.rowsAffected) {
              
              this.$swal.fire({
                type: 'error',
                title: 'User Update Failed',
                text:  res.data.originalError.info.message
              })
            }
                 
             
          },err => console.log(err))
        }

        },
        initializeCompany(){
          let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         // console.log(headers)
          Axios.get(this.nodeApi+'/getAllBranches',{headers:headers})
          .subscribe(res =>{
            this.companyData = res.data.data.one.recordset
            //console.log(this.companyData)
          },err => console.log(err))
        },
        initializeCompany1(){
          let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         // console.log(headers)
          Axios.get(this.nodeApi+'/getAllFloatUsers',{headers:headers})
          .subscribe(res =>{
            this.companyData1 = res.data.data.one.recordset
            //console.log(this.companyData)
          },err => console.log(err))
        },
        initializeCompany2(){
          let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         // console.log(headers)
          Axios.get(this.nodeApi+'/getAllTreasuryFloat',{headers:headers})
          .subscribe(res =>{
            this.companyData2 = res.data.data.one.recordset
            //console.log(this.companyData)
          },err => console.log(err))
        },
         //this code is for the user admin dialog
      closeUser () {
        this.editCheck = false
        this.dialogUser = false
        setTimeout(() => {
          this.editedUser = Object.assign({}, this.defaultUser)
          this.editedIndexUser = -1
        }, 300)
      },

    },
}
</script>
<style scoped>

.card1 {     
        
        border-left: 5px solid #01b7ff;
    }
.card2 {     
        
        border-left: 5px solid #17c92f;
    }
.card3 {     
        
        border-left: 5px solid #cea51d;
    }
  
</style>