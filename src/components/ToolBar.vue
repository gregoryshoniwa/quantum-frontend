<template>
  <v-toolbar extended color="white gradient">
    <v-toolbar-title class="headline text-uppercase">
      <v-flex pr-1 class="hidden-sm-and-down">
        <div style="margin-top: 30px">
          <img
            src="../assets/main_logo.png"
            alt="sahwira"
            style="max-width: 100px; height: auto; margin-top: 2px; float: left"
          />
          <div>
            <span
              style="
                position: relative;
                top: 15px;
                left: 10px;
                font-weight: bold;
                font-size: 13px;
                color: goldenrod;
              "
              >Sahwira Money Transfer Agency</span
            >
          </div>

          <div>
            <span style="margin-left: 10px; font-size: 10px;position: relative; top: -5px;"
              >REGISTERED BUREAU DE CHANGE</span
            >
          </div>
        </div>
      </v-flex>
    </v-toolbar-title>

    <v-spacer></v-spacer>
    <v-layout row justify-end class="white--text hidden-sm-and-down">
      <!-- <div class="white--text hidden-sm-and-down time">
        <span style="font-size:20px;">{{ time | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</span>
      </div> -->
      <!-- <div class="white--text hidden-sm-and-down">
        <span color="red" style="font-size:20px;margin-left:20px;color:Crimson;">Your Password Has Expired</span>
      </div> -->
      <!-- <v-tooltip bottom>
        <template v-slot:activator="{ on }">         
                  <img
                  
                      src="../assets/contisendtr2.png"
                      alt="logo"
                      class="imgSend bounceIn" 
                      v-on="on"  
                     @click="createTransaction('ContiSend')"  
                          
                    >
        </template>
        <span>ContiSend</span>
      </v-tooltip>
      
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">         
                  <img
                      src="../assets/worldremit.png"
                      alt="logo"
                      class="imgUlt bounceIn" 
                      v-on="on"  
                     @click="createTransaction('WorldRemit')"  
                          
                    >
        </template>
        <span>World Remit</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">         
                  <img
                      src="../assets/utilities.png"
                      alt="logo"
                      class="imgUlt bounceIn" 
                      v-on="on"  
                     @click="createTransaction('Utility')"  
                          
                    >
        </template>
        <span>Sell Utilities</span>
      </v-tooltip> -->
      <v-tooltip bottom v-if="user_type == 2">
        <template v-slot:activator="{ on }">
          <img
            src="../assets/buy.png"
            alt="logo"
            class="img1 bounceIn"
            v-on="on"
            @click="createTransaction('Sell')"
          />
        </template>
        <span>Sell Forex</span>
      </v-tooltip>

      <v-tooltip bottom v-if="user_type == 2">
        <template v-slot:activator="{ on }">
          <img
            src="../assets/sell.png"
            alt="logo"
            class="img1 bounceIn"
            v-on="on"
            @click="createTransaction('Buy')"
          />
        </template>
        <span>Buy Forex</span>
      </v-tooltip>
    </v-layout>

    <v-layout row class="white--text hidden-md-and-up">
      <v-menu bottom origin="center center" transition="scale-transition">
        <template v-slot:activator="{ on }">
          <v-btn icon class="white--text" style="margin-left: -25px" v-on="on">
            <v-icon>menu</v-icon>
          </v-btn>
        </template>
        <v-card class="d-inline-block elevation-12">
          <v-list dense>
            <v-list-tile
              v-for="item in items"
              :key="item.title"
              @click="getMobileMenu(item.title)"
            >
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{ item.name }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-menu>

      <v-spacer></v-spacer>

      <v-flex>
        <v-tooltip bottom v-if="user_type == 2">
          <template v-slot:activator="{ on }">
            <img
              src="../assets/buy.png"
              alt="logo"
              class="img11 bounceIn"
              v-on="on"
              @click="createTransaction('Sell')"
            />
          </template>
          <span>Sell Forex</span>
        </v-tooltip>
      </v-flex>

      <v-flex>
        <v-tooltip bottom v-if="user_type == 2">
          <template v-slot:activator="{ on }">
            <img
              src="../assets/sell.png"
              alt="logo"
              class="img11 bounceIn"
              v-on="on"
              @click="createTransaction('Buy')"
            />
          </template>
          <span>Buy Forex</span>
        </v-tooltip>
      </v-flex>
    </v-layout>

    <v-dialog v-model="dialogTransaction" max-width="750px">
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">Transaction Type </v-stepper-step>
          <v-divider></v-divider>

          <v-stepper-step step="2">Transation Information</v-stepper-step>
          <v-divider></v-divider>

          <v-stepper-step step="3">Client Information</v-stepper-step>
          <v-divider></v-divider>

          <v-stepper-step step="4">Settlement Summary</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1" justify-center>
            <h3 style="margin-left: 200px">Please select one of the options below</h3>
            <v-flex xs12 mt-5>
              <v-layout row>
                <v-flex xs6 ml-5 mt-3>
                  <div class="ih-item circle effect3 bottom_to_top">
                    <a @click="e1 = 2">
                      <div class="img"><img src="@/assets/avator2.png" alt="img" /></div>
                      <div class="info">
                        <h3>Anonymous</h3>
                        <p>Select this option if the client does not what to be known.</p>
                      </div>
                    </a>
                  </div>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs6 ml-5 mt-3>
                  <div class="ih-item circle effect3 bottom_to_top">
                    <a @click="e1 = 3">
                      <div class="img"><img src="@/assets/avator.png" alt="img" /></div>
                      <div class="info">
                        <h3>Real Client</h3>
                        <p>
                          Select this option if the client wants to be known and be active
                          in our loyalty programs
                        </p>
                      </div>
                    </a>
                  </div>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-layout row wrap>
              <v-flex xs12 md4>
                <h1 style="margin-top: 20px; color: blue">
                  <span>Rate : {{ parseFloat(transactionData.rate).toFixed(2) }}</span>
                </h1>
              </v-flex>

              <v-flex pa-2 xs12 md8>
                <v-card hover>
                  <v-flex mb-2 class="card cardRev1">
                    <v-layout ma-1>
                      <v-flex style="text-align: right; padding: 3px">
                        <h1 class="card">
                          Floats:
                          <span style="color: grey">{{
                            parseFloat(zeroFloat).toFixed(2)
                          }}</span>
                        </h1>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-card>
              </v-flex>

              <!-- <v-flex 
                          v-for="item in userFloat"
                              :key="item.id" pa-2 xs12 md8>
                            
                            <v-card hover>
                              <v-flex mb-2 class="card cardRev1">
                                <v-layout ma-1>
                                  
                                  <v-flex style="text-align: right;padding: 3px;">
                                    <h1 
                                      class="card"                                                    
                                      >
                                      Floats: {{item.symbol}} <span style="color:green">{{parseFloat(item.amount).toFixed(2)}}</span>
                                      </h1>
                                  </v-flex>
                                </v-layout>
                              </v-flex>
                            </v-card>
                          </v-flex>  
                         
                             -->

              <v-flex xs12 sm6 md6>
                <v-combobox
                  v-model="transactionData.receive_currency_id"
                  :items="currencyData"
                  item-text="symbol"
                  item-value="id"
                  label="Select Currency Being Received"
                >
                  <template slot="item" slot-scope="data">
                    <v-avatar left tile>
                      <img
                        :src="image + data.item.image"
                        style="
                          max-width: 100px;
                          height: auto;
                          margin-right: 30px;
                          padding: 5px;
                        "
                      />
                    </v-avatar>
                    {{ data.item.iso_code }}
                  </template>
                </v-combobox>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  v-if="switch1"
                  prefix="$"
                  :disabled="disableCheck"
                  v-model="transactionData.receive_amount"
                  label="Receiveing Amount"
                  type="number"
                ></v-text-field>
                <v-text-field
                  v-if="!switch1"
                  prefix="$"
                  :disabled="disableCheck"
                  v-model="transactionData.disburse_amount"
                  label="Disbursing Amount"
                  type="number"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-combobox
                  v-model="transactionData.disburse_currency_id"
                  :items="currencyData"
                  item-text="symbol"
                  item-value="id"
                  @input="getRate"
                  label="Select Currency Being Disbursed"
                >
                  <template slot="item" slot-scope="data">
                    <v-avatar left tile>
                      <img
                        :src="image + data.item.image"
                        style="
                          max-width: 100px;
                          height: auto;
                          margin-right: 30px;
                          padding: 5px;
                        "
                      />
                    </v-avatar>
                    {{ data.item.iso_code }}
                  </template>
                </v-combobox>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <h2 v-if="switch1" style="margin-top: 15px">
                  Disburse Amount : ${{
                    parseFloat(transactionData.disburse_amount).toFixed(2)
                  }}
                </h2>
                <h2 v-if="!switch1" style="margin-top: 15px">
                  Receiveing Amount : ${{
                    parseFloat(transactionData.receive_amount).toFixed(2)
                  }}
                </h2>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs12 sm6 md6>
                <v-btn color="primary" @click="checkTransaction"> Continue </v-btn>

                <!-- <v-btn color="red" class="white--text" text @click="override = true"
                  >Request Rate Over-ride</v-btn
                > -->
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-switch
                  class="mb-3"
                  v-model="switch1"
                  :label="`Reverse Calculation : ${switch1.toString()}`"
                ></v-switch>
              </v-flex>
            </v-layout>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-layout row wrap justify-center>
              <v-flex xs10 sm8 md11>
                <v-combobox
                  v-model="clientID"
                  :disabled="clientDisabled"
                  :items="clientData"
                  item-text="first_name"
                  item-value="id"
                  @input="getClientByName"
                  label="Search by First Name"
                >
                  <template slot="item" slot-scope="data">
                    {{ data.item.first_name }} {{ data.item.last_name }}
                  </template>
                </v-combobox>
              </v-flex>

              <v-flex xs2 sm4 md1>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn flat icon color="green lighten-2" @click="openAddNewClient">
                      <v-icon v-on="on">add</v-icon>
                    </v-btn>
                  </template>
                  <span>Add New Client</span>
                </v-tooltip>
              </v-flex>

              <v-flex xs10 sm8 md11>
                <v-combobox
                  v-model="clientID"
                  :disabled="clientDisabled"
                  :items="clientData"
                  item-text="last_name"
                  item-value="id"
                  @input="getClientByName2"
                  label="Search by Last Name"
                >
                  <template slot="item" slot-scope="data">
                    {{ data.item.first_name }} {{ data.item.last_name }}
                  </template>
                </v-combobox>
              </v-flex>

              <v-flex xs2 sm4 md1>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn flat icon color="green lighten-2" @click="openAddNewClient">
                      <v-icon v-on="on">add</v-icon>
                    </v-btn>
                  </template>
                  <span>Add New Client</span>
                </v-tooltip>
              </v-flex>

              <!-- <v-flex xs10 sm8 md11>
                            <v-combobox
                              v-model="clientID"
                              :disabled="clientDisabled"
                              :items="clientData"
                               item-text="cell"
                                item-value="id"
                                @input="getClientByName3"
                              label="Search by Phone Number">

                              <template slot="item" slot-scope="data">
                                {{data.item.first_name}} {{data.item.last_name}}
                              </template>
                            </v-combobox>
                          </v-flex>

                           <v-flex xs2 sm4 md1>
                             <v-tooltip bottom>
                              <template v-slot:activator="{ on }">
                                <v-btn flat icon color="green lighten-2" @click="openAddNewClient">
                                  <v-icon v-on="on">add</v-icon>
                                </v-btn>
                              </template>
                            <span>Add New Client</span>
                          </v-tooltip>
                          </v-flex> -->

              <v-flex pa-1 xs12 md12>
                <v-layout row>
                  <v-flex style="text-align: left; padding: 3px">
                    <h2>
                      <span style="color: grey">{{ first_name }} {{ last_name }}</span>
                    </h2>
                    <span style="color: gray">ID No# : {{ id_number }}</span>
                  </v-flex>
                </v-layout>

                <v-card hover v-for="item in clientHistory" :key="item.id">
                  <v-flex
                    mb-2
                    class="card cardRev1 bounceIn"
                    @click="openClientHistory(item.client_id, item.transaction_type)"
                  >
                    <v-layout row wrap ma-1>
                      <img :src="image + item.image" class="image" />
                      <v-flex style="text-align: right; padding: 3px">
                        <h2>
                          Total {{ item.transaction_type }}'s
                          <span style="color: grey"
                            >{{ item.currency }}
                            {{ parseFloat(item.amount).toFixed(2) }}</span
                          >
                        </h2>

                        <h3 style="color: gray">
                          last transacted : {{ item.date_time | moment("calendar") }}
                        </h3>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-card>
              </v-flex>
            </v-layout>

            <v-btn color="primary" @click="gotToTransactionStep"> Next </v-btn>

            <!-- <v-btn v-if="!showLoyaltyReg" color="success" @click="registerClientLoyalty">
              Register Client for Loyality
            </v-btn>
            <v-btn v-if="showLoyaltyPoints" color="warning" @click="getLoyaltyBal">
              Registered Client Loyalty Balance.
            </v-btn>

            <v-btn
              v-if="!showLoyaltyReg || showLoyaltyPoints"
              color="error"
              @click="nameScan"
            >
              NameScan Client.
            </v-btn> -->

            <!-- 
                        <v-btn text @click="e1 = 1">back</v-btn> -->
          </v-stepper-content>

          <v-stepper-content step="4">
            <v-layout row wrap>
              <div class="invoice-box rtl">
                <table cellpadding="0" cellspacing="0">
                  <tr class="top">
                    <td colspan="2">
                      <table>
                        <tr>
                          <td class="title">
                            <img
                              src="../assets/main_logo2.png"
                              style="width: 100%; max-width: 300px"
                            />
                          </td>
                        </tr>

                        <tr></tr>

                        <tr>
                          <td>
                            Invoice #: 123<br />
                            Created: {{ time | moment("dddd, MMMM Do YYYY, h:mm:ss a")
                            }}<br />
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr class="information">
                    <td colspan="2">
                      <table>
                        <tr>
                          <td>
                            537 Syringa, Euphorbia Road<br />
                            Chiredzi<br />
                            0313221,+263 774 063 714
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr class="heading">
                    <td>Payment Method</td>
                    <td>Total Amount</td>
                  </tr>

                  <tr class="details">
                    <td>Cash</td>

                    <td>
                      {{ transactionData.receive_amount }}
                    </td>
                  </tr>

                  <tr class="heading">
                    <td>Item</td>

                    <td>Amount</td>
                  </tr>
                  <tr class="item">
                    <td>Branch</td>

                    <td>
                      {{ teller_branch }}
                    </td>
                  </tr>
                  <tr class="item">
                    <td>Teller</td>

                    <td>{{ teller_first_name }} {{ teller_last_name }}</td>
                  </tr>
                  <tr class="item">
                    <td>Client</td>

                    <td>{{ first_name }} {{ last_name }}</td>
                  </tr>

                  <tr class="item">
                    <td>Transaction Type</td>

                    <td>
                      {{ transaction_type }}
                    </td>
                  </tr>

                  <tr class="item">
                    <td>Received</td>

                    <td>
                      {{ receive_symbol }}
                      {{ parseFloat(transactionData.receive_amount).toFixed(2) }}
                    </td>
                  </tr>

                  <tr class="item">
                    <td>Disbursement</td>

                    <td>
                      {{ disburse_symbol }}
                      {{ parseFloat(transactionData.disburse_amount).toFixed(2) }}
                    </td>
                  </tr>

                  <tr class="item last">
                    <td>@Rate</td>

                    <td>
                      {{ parseFloat(transactionData.rate).toFixed(2) }}
                    </td>
                  </tr>
                </table>
              </div>
            </v-layout>

            <v-btn color="primary" @click="settleTransaction"> Settle and Print </v-btn>

            <!-- <v-btn text @click="e1 = 2">back</v-btn> -->
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-dialog>

    <v-dialog v-model="dialogTransactionSend" max-width="850px">
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">Transaction Type </v-stepper-step>
          <v-divider></v-divider>

          <v-stepper-step step="2">Client Information</v-stepper-step>
          <v-divider></v-divider>

          <v-stepper-step step="3">Transation Information</v-stepper-step>
          <v-divider></v-divider>

          <v-stepper-step step="4">Settlement Summary</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1" justify-center>
            <h3 style="margin-left: 250px">Please select one of the options below</h3>
            <v-flex xs12 mt-5>
              <v-layout row>
                <v-flex xs4 mt-3>
                  <div class="ih-item circle effect3 bottom_to_top">
                    <a @click="sendType('Send')">
                      <div class="img"><img src="@/assets/avator.png" alt="img" /></div>
                      <div class="info">
                        <h3>Send Money</h3>
                        <p>Select this option to initiate a send money transaction.</p>
                      </div>
                    </a>
                  </div>
                </v-flex>

                <v-flex xs4 ml-5 mt-3>
                  <div class="ih-item circle effect3 bottom_to_top">
                    <a @click="sendType('Payout')">
                      <div class="img"><img src="@/assets/avator3.png" alt="img" /></div>
                      <div class="info">
                        <h3>Payout</h3>
                        <p>Select this option to disburse cash to a client</p>
                      </div>
                    </a>
                  </div>
                </v-flex>

                <v-flex xs4 ml-5 mt-3>
                  <div class="ih-item circle effect3 bottom_to_top">
                    <a @click="sendType('Booking')">
                      <div class="img"><img src="@/assets/avator4.png" alt="img" /></div>
                      <div class="info">
                        <h3>Booking</h3>
                        <p>Select this option to confirm online booking</p>
                      </div>
                    </a>
                  </div>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-layout row wrap v-if="contisend.sendTypeData == 'Payout'">
              <v-flex pa-2 xs12>
                <v-card hover>
                  <v-flex mb-2 class="card cardRev1">
                    <v-layout ma-1>
                      <v-flex style="text-align: right; padding: 3px">
                        <h1 class="card">
                          Pay Out Amount:
                          <span style="color: grey"
                            >{{ contiPayout.symbol }}
                            {{ parseFloat(contiPayout.receive_amount).toFixed(2) }}</span
                          >
                        </h1>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-card>
                <v-text-field
                  v-model="recipient_address"
                  label="Enter Recipient Address Here"
                  type="text"
                  solo
                  outlined
                ></v-text-field>
              </v-flex>

              <v-flex style="text-align: left; padding: 3px" xs6>
                <v-card>
                  <v-card-text>
                    <h2>
                      <span style="color: grey"
                        >{{ contiPayout.first_name }} {{ contiPayout.last_name }} :
                        Sender</span
                      >
                    </h2>

                    <span style="color: gray">ID No# : {{ contiPayout.id_number }}</span>
                    <p></p>
                    <span style="color: gray">Cell Number# : {{ contiPayout.cell }}</span>
                    <p></p>
                    <!-- <span style="color:gray">Email# : {{sender.email}}</span>
                                         <p></p>
                                       <span style="color:gray">Country# : {{sender.countryName}}</span> -->
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex style="text-align: left; padding: 3px" xs6>
                <v-card>
                  <v-card-text>
                    <h2>
                      <span style="color: grey"
                        >{{ contiPayout.recipientFirstName }}
                        {{ contiPayout.recipientLastName }} : Recipient</span
                      >
                    </h2>

                    <span style="color: gray"
                      >ID No# : {{ contiPayout.recipientID }}</span
                    >
                    <p></p>
                    <span style="color: gray"
                      >Cell Number# : {{ contiPayout.recipientCell }}</span
                    >
                    <p></p>
                    <!-- <span style="color:gray">Email# : {{recipient.email}}</span>
                                          <p></p>
                                        <span style="color:gray">Country# : {{recipient.countryName}}</span> -->
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>

            <v-layout row wrap v-if="contisend.sendTypeData != 'Payout'">
              <v-flex xs12 md4>
                <h1 style="margin-top: 20px; color: blue">
                  <span>Charge : {{ parseFloat(commissions).toFixed(2) }}</span>
                </h1>
              </v-flex>

              <v-flex pa-2 xs12 md8>
                <v-card hover>
                  <v-flex mb-2 class="card cardRev1">
                    <v-layout ma-1>
                      <v-flex style="text-align: right; padding: 3px">
                        <h1 class="card">
                          Expected Amount:
                          <span style="color: grey">{{
                            parseFloat(full_send_amount).toFixed(2)
                          }}</span>
                        </h1>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-card>
              </v-flex>

              <v-flex xs12 sm6 md6>
                <v-combobox
                  v-model="transactionData.receive_currency_id"
                  :items="currencyData"
                  item-text="symbol"
                  item-value="id"
                  @input="getRateSend"
                  label="Select Currency Being Sent"
                >
                  <template slot="item" slot-scope="data">
                    <v-avatar left tile>
                      <img
                        :src="image + data.item.image"
                        style="
                          max-width: 100px;
                          height: auto;
                          margin-right: 30px;
                          padding: 5px;
                        "
                      />
                    </v-avatar>
                    {{ data.item.iso_code }}
                  </template>
                </v-combobox>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  prefix="$"
                  v-model="transactionData.receive_amount"
                  label="Sending Amount"
                  type="number"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-btn
              color="primary"
              @click="checkTransactionSend"
              :disabled="checkCommission"
              v-if="contisend.sendTypeData != 'Payout'"
            >
              Lock & Continue
            </v-btn>
            <v-btn
              color="primary"
              @click="checkTransactionSend"
              v-if="contisend.sendTypeData == 'Payout'"
            >
              Lock & Continue
            </v-btn>

            <v-btn
              v-if="contisend.sendTypeData == 'Send'"
              color="green"
              dark
              @click="checkRateSend"
            >
              Get Commissions
            </v-btn>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-layout row wrap justify-center v-if="contisend.sendTypeData == 'Send'">
              <v-flex xs10 sm8 md11>
                <v-combobox
                  v-model="clientID"
                  :disabled="clientDisabled"
                  :items="clientData"
                  item-text="firstName"
                  item-value="id"
                  @input="getClientByNameSend"
                  label="Search by First Name"
                >
                  <template slot="item" slot-scope="data">
                    {{ data.item.firstName }} {{ data.item.lastName }}
                  </template>
                </v-combobox>
              </v-flex>

              <v-flex xs2 sm4 md1>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn flat icon color="green lighten-2" @click="openAddNewClientCS">
                      <v-icon v-on="on">add</v-icon>
                    </v-btn>
                  </template>
                  <span>Add New Client</span>
                </v-tooltip>
              </v-flex>

              <!-- <v-flex xs10 sm8 md11>
                            <v-combobox
                              v-model="contisend.clientID"
                              :disabled="clientDisabled"
                              :items="clientData"
                               item-text="last_name"
                                item-value="id"
                                @input="getClientByName2"
                              label="Search by Last Name">

                              <template slot="item" slot-scope="data">
                                {{data.item.first_name}} {{data.item.last_name}}
                              </template>
                            </v-combobox>
                          </v-flex>

                           <v-flex xs2 sm4 md1>
                             <v-tooltip bottom>
                              <template v-slot:activator="{ on }">
                                <v-btn flat icon color="green lighten-2" @click="openAddNewClient">
                                  <v-icon v-on="on">add</v-icon>
                                </v-btn>
                              </template>
                            <span>Add New Client</span>
                          </v-tooltip>
                          </v-flex> -->

              <v-flex xs10 sm8 md12>
                <v-combobox
                  v-model="contisend.city_name"
                  :items="[
                    'Harare',
                    'Bulawayo',
                    'Chitungwiza',
                    'Mutare',
                    'Epworth',
                    'Gweru',
                    'Kwekwe',
                    'Kadoma',
                    'Masvingo',
                    'Chinhoyi',
                    'Norton',
                    'Marondera',
                    'Ruwa',
                    'Chegutu',
                    'Zvishavane',
                    'Bindura',
                    'Beitbridge',
                    'Redcliff',
                    'Victoria Falls',
                    'Hwange',
                    'Rusape',
                    'Chiredzi',
                    'Kariba',
                    'Karoi',
                    'Chipinge',
                    'Gokwe',
                    'Shurugwi',
                  ]"
                  label="Select city to send"
                >
                </v-combobox>
              </v-flex>

              <v-flex pa-1 xs12 md12>
                <v-layout row>
                  <v-flex style="text-align: left; padding: 3px">
                    <h2>
                      <span style="color: grey">{{ first_name }} {{ last_name }}</span>
                    </h2>
                    <span style="color: gray">ID No# : {{ id_number }}</span>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs6 md6 pr-2>
                    <v-text-field
                      v-model="contisend.recipientFirstName"
                      type="text"
                      placeholder="Recipient first name"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs6 md6 pr-2>
                    <v-text-field
                      v-model="contisend.recipientLastName"
                      type="text"
                      placeholder="Recipient last name"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs6 md6 pr-2>
                    <vue-tel-input
                      v-model="contisend.recipientCell"
                      @input="getTelePhone"
                      style="margin-top: 15px"
                      v-bind:style="{ color: isActive ? 'red' : 'blue' }"
                    ></vue-tel-input>
                  </v-flex>

                  <v-flex xs6 md6 pr-2>
                    <v-text-field
                      v-model="contisend.recipientID"
                      type="text"
                      placeholder="Recipient ID Number"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>

            <v-layout row wrap justify-center v-if="contisend.sendTypeData != 'Send'">
              <v-flex xs12 md12 pr-2>
                <v-text-field
                  v-model="contisend.refNumber"
                  label="Client Reference Code"
                  type="number"
                  placeholder=" "
                ></v-text-field>
              </v-flex>

              <v-flex xs12 md12 pr-2 v-if="contisend.sendTypeData == 'Booking'">
                <v-combobox
                  v-model="contisend.city_name"
                  :items="[
                    'Harare',
                    'Bulawayo',
                    'Chitungwiza',
                    'Mutare',
                    'Epworth',
                    'Gweru',
                    'Kwekwe',
                    'Kadoma',
                    'Masvingo',
                    'Chinhoyi',
                    'Norton',
                    'Marondera',
                    'Ruwa',
                    'Chegutu',
                    'Zvishavane',
                    'Bindura',
                    'Beitbridge',
                    'Redcliff',
                    'Victoria Falls',
                    'Hwange',
                    'Rusape',
                    'Chiredzi',
                    'Kariba',
                    'Karoi',
                    'Chipinge',
                    'Gokwe',
                    'Shurugwi',
                  ]"
                  label="Select city to send"
                >
                </v-combobox>
              </v-flex>
            </v-layout>

            <v-btn color="primary" @click="gotToTransactionStepSend"> Next </v-btn>
            <!-- <v-btn
                          
                          color="error"
                          @click="settleTransactionSendUnlock"
                        >
                          Unlock Reference
                        </v-btn> -->

            <v-btn v-if="!showLoyaltyReg" color="success" @click="registerClientLoyalty">
              Register Client for Loyality
            </v-btn>
            <v-btn v-if="showLoyaltyPoints" color="warning" @click="getLoyaltyBal">
              Registerd Client Loyalty Balance.
            </v-btn>

            <!-- 
                        <v-btn text @click="e1 = 1">back</v-btn> -->
          </v-stepper-content>

          <v-stepper-content step="4">
            <v-layout row wrap>
              <div class="invoice-box rtl">
                <table cellpadding="0" cellspacing="0">
                  <tr class="top">
                    <td colspan="2">
                      <table>
                        <tr>
                          <td class="title">
                            <img
                              src="../assets/main_logo2.png"
                              style="width: 100%; max-width: 300px"
                            />
                          </td>
                        </tr>

                        <tr></tr>

                        <tr>
                          <td>
                            Invoice #: 123<br />
                            Created: {{ time | moment("dddd, MMMM Do YYYY, h:mm:ss a")
                            }}<br />
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr class="information">
                    <td colspan="2">
                      <table>
                        <tr>
                          <td>
                            537 Syringa, Euphorbia Road<br />
                            Chiredzi<br />
                            0313221,+263 774 063 714
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr class="heading">
                    <td>Total Amount</td>
                    <td>Payment Method</td>
                  </tr>

                  <tr class="details" v-if="contisend.sendTypeData == 'Send'">
                    <td>
                      {{ transactionData.receive_amount }}
                    </td>

                    <td>Cash</td>
                  </tr>
                  <tr class="details" v-if="contisend.sendTypeData == 'Booking'">
                    <td>
                      {{ contiBooking.transaction.senderAmount }}
                    </td>

                    <td>Cash</td>
                  </tr>
                  <tr class="details" v-if="contisend.sendTypeData == 'Payout'">
                    <td>
                      {{ contiPayout.receive_amount }}
                    </td>

                    <td>Cash</td>
                  </tr>

                  <tr class="heading">
                    <td>Amount</td>

                    <td>Item</td>
                  </tr>
                  <tr class="item">
                    <td>
                      {{ teller_branch }}
                    </td>

                    <td>Branch</td>
                  </tr>
                  <tr class="item">
                    <td>{{ teller_first_name }} {{ teller_last_name }}</td>

                    <td>Teller</td>
                  </tr>
                  <tr class="item" v-if="contisend.sendTypeData == 'Payout'">
                    <td>{{ contiPayout.first_name }} {{ contiPayout.last_name }}</td>

                    <td>Sender</td>
                  </tr>

                  <tr class="item" v-if="contisend.sendTypeData == 'Payout'">
                    <td>
                      {{ contiPayout.recipientFirstName }}
                      {{ contiPayout.recipientLastName }}
                    </td>

                    <td>Recipient</td>
                  </tr>
                  <tr class="item" v-if="contisend.sendTypeData == 'Send'">
                    <td>{{ first_name }} {{ last_name }}</td>

                    <td>Sender</td>
                  </tr>
                  <tr class="item" v-if="contisend.sendTypeData == 'Booking'">
                    <td>
                      {{ contiBooking.sender.firstName }}
                      {{ contiBooking.sender.lastName }}
                    </td>

                    <td>Sender</td>
                  </tr>
                  <tr class="item" v-if="contisend.sendTypeData == 'Booking'">
                    <td>
                      <b>{{ contiBooking.sender.nationalId }} </b>
                    </td>

                    <td>
                      <b>Sender ID</b>
                    </td>
                  </tr>

                  <tr class="item" v-if="contisend.sendTypeData == 'Send'">
                    <td>
                      {{ contisend.recipientFirstName }} {{ contisend.recipientLastName }}
                    </td>

                    <td>Recipient</td>
                  </tr>
                  <tr class="item" v-if="contisend.sendTypeData == 'Booking'">
                    <td>
                      {{ contiBooking.recipient.firstName }}
                      {{ contiBooking.recipient.lastName }}
                    </td>

                    <td>Recipient</td>
                  </tr>

                  <tr class="item">
                    <td>
                      {{ transaction_type }}
                    </td>

                    <td>Transaction Type</td>
                  </tr>

                  <tr class="item" v-if="contisend.sendTypeData == 'Send'">
                    <td>
                      {{ receive_symbol }}
                      {{ parseFloat(transactionData.receive_amount).toFixed(2) }}
                    </td>

                    <td>Received</td>
                  </tr>
                  <tr class="item" v-if="contisend.sendTypeData == 'Booking'">
                    <td>
                      {{ contiBooking.transaction.senderCurrency }}
                      {{
                        parseFloat(contiBooking.transaction.beneficiaryAmount).toFixed(2)
                      }}
                    </td>

                    <td>Beneficiary Amount</td>
                  </tr>
                  <tr class="item" v-if="contisend.sendTypeData == 'Send'">
                    <td>{{ receive_symbol }} {{ parseFloat(commissions).toFixed(2) }}</td>

                    <td>Commissions</td>
                  </tr>
                  <tr class="item" v-if="contisend.sendTypeData == 'Booking'">
                    <td>
                      {{ contiBooking.transaction.senderCurrency }}
                      {{ parseFloat(contiBooking.transaction.senderFees).toFixed(2) }}
                    </td>

                    <td>Commissions</td>
                  </tr>
                  <tr class="item" v-if="contisend.sendTypeData == 'Send'">
                    <td>
                      <b>
                        {{ receive_symbol }} {{ parseFloat(full_send_amount).toFixed(2) }}
                      </b>
                    </td>

                    <td>
                      <b>Total</b>
                    </td>
                  </tr>
                  <tr class="item" v-if="contisend.sendTypeData == 'Booking'">
                    <td>
                      <b>
                        {{ contiBooking.transaction.senderCurrency }}
                        {{ parseFloat(contiBooking.transaction.senderAmount).toFixed(2) }}
                      </b>
                    </td>

                    <td>
                      <b>Total</b>
                    </td>
                  </tr>

                  <tr class="item" v-if="contisend.sendTypeData == 'Payout'">
                    <td>
                      {{ contiPayout.symbol }}
                      {{ parseFloat(contiPayout.receive_amount).toFixed(2) }}
                    </td>

                    <td>Disbursement</td>
                  </tr>
                  <tr class="item">
                    <td></td>

                    <td>Ts & Cs Apply</td>
                  </tr>
                </table>
              </div>
            </v-layout>

            <v-btn
              v-if="contisend.sendTypeData == 'Send'"
              color="primary"
              @click="settleTransactionSend"
            >
              Receive Deposit
            </v-btn>
            <v-btn
              v-if="contisend.sendTypeData == 'Booking'"
              color="primary"
              @click="settleTransactionSend"
            >
              Receive Deposit
            </v-btn>

            <v-btn
              v-if="contisend.sendTypeData == 'Payout'"
              color="primary"
              @click="settleTransactionSend"
            >
              Payout Client
            </v-btn>
            <v-btn
              v-if="contisend.sendTypeData == 'Payout'"
              color="error"
              @click="settleTransactionSendUnlock"
            >
              Unlock Reference
            </v-btn>

            <v-btn color="error" @click="nameScanSend"> NameScan Clients. </v-btn>

            <!-- <v-btn text @click="e1 = 2">back</v-btn> -->
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-dialog>

    <v-dialog v-model="dialogTransactionUtility" max-width="750px">
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">Utility Options</v-stepper-step>
          <v-divider></v-divider>

          <v-stepper-step step="2">Transaction Information</v-stepper-step>
          <v-divider></v-divider>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1" justify-center>
            <h3 style="margin-left: 200px">Please select one of the options below</h3>
            <v-flex xs12 mt-5>
              <v-layout row>
                <v-flex xs2 v-for="item in Utilities" :key="item.id">
                  <div class="ih-item circle colored effect6 scale_up imageUtilityIcon">
                    <a @click="utilitySelected(item.id)">
                      <div><img :src="image + item.image" alt="img" /></div>
                    </a>
                  </div>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-layout row wrap justify-center>
              <v-flex xs10 sm8 md11>
                <v-combobox
                  v-model="clientID"
                  :disabled="clientDisabled"
                  :items="clientData"
                  item-text="first_name"
                  item-value="id"
                  @input="getClientByName"
                  label="Search by First Name"
                >
                  <template slot="item" slot-scope="data">
                    {{ data.item.first_name }} {{ data.item.last_name }}
                  </template>
                </v-combobox>
              </v-flex>

              <v-flex xs2 sm4 md1>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn flat icon color="green lighten-2" @click="openAddNewClient">
                      <v-icon v-on="on">add</v-icon>
                    </v-btn>
                  </template>
                  <span>Add New Client</span>
                </v-tooltip>
              </v-flex>

              <v-flex xs10 sm8 md11>
                <v-combobox
                  v-model="clientID"
                  :disabled="clientDisabled"
                  :items="clientData"
                  item-text="last_name"
                  item-value="id"
                  @input="getClientByName2"
                  label="Search by Last Name"
                >
                  <template slot="item" slot-scope="data">
                    {{ data.item.first_name }} {{ data.item.last_name }}
                  </template>
                </v-combobox>
              </v-flex>

              <v-flex xs2 sm4 md1>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn flat icon color="green lighten-2" @click="openAddNewClient">
                      <v-icon v-on="on">add</v-icon>
                    </v-btn>
                  </template>
                  <span>Add New Client</span>
                </v-tooltip>
              </v-flex>

              <v-flex xs12 md12 pr-2 v-if="utility != '1274'">
                <v-combobox
                  v-model="utilityCurrency"
                  :items="currencyData"
                  item-text="symbol"
                  item-value="id"
                  @input="getRate"
                  label="Select Currency"
                >
                  <template slot="item" slot-scope="data">
                    <v-avatar left tile>
                      <img
                        :src="image + data.item.image"
                        style="
                          max-width: 100px;
                          height: auto;
                          margin-right: 30px;
                          padding: 5px;
                        "
                      />
                    </v-avatar>
                    {{ data.item.iso_code }}
                  </template>
                </v-combobox>
              </v-flex>

              <v-flex xs12 md12 pr-2 v-if="utility == '1274'">
                <v-combobox
                  v-model="utilityCurrency"
                  :items="dstvDataDown"
                  item-text="product"
                  item-value="id"
                  @input="getProduct"
                  label="Select DSTv Packages"
                >
                  <!-- <template slot="item" slot-scope="data">
                                <v-avatar left tile>
                                  <img :src="image+data.item.image" style="max-width: 100px; height: auto;margin-right:30px;padding:5px;" />
                                </v-avatar>
                                {{data.item.iso_code}}
                              </template> -->
                </v-combobox>
              </v-flex>
              <v-flex xs12 md6 pr-2>
                <v-text-field
                  v-model="meterNumber"
                  label="Enter Account/Meter Number"
                  type="number"
                ></v-text-field>
              </v-flex>

              <v-flex xs12 md6 pr-2 mt-2 v-if="utility == '1274'">
                <v-card hover>
                  <v-flex mb-2 class="cardDstv cardRev1">
                    <v-layout ma-1>
                      <v-flex style="text-align: right">
                        <h1 class="card">
                          USD:
                          <span style="color: grey">{{
                            parseFloat(dstvTotal).toFixed(2)
                          }}</span>
                        </h1>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-card>
              </v-flex>
              <v-flex xs12 md12 pl-2 v-if="utility == '1274'">
                <v-flex v-for="item in dstvDataCheck" :key="item.id">
                  <v-checkbox
                    v-model="productSelected"
                    :label="item.product"
                    :value="item"
                  ></v-checkbox>
                </v-flex>
              </v-flex>
              <v-flex xs12 md6 pr-2 v-if="utility != '1274'">
                <v-text-field
                  v-model="utilityAmount"
                  type="number"
                  placeholder="Transaction Amount"
                ></v-text-field>
              </v-flex>

              <v-flex pa-1 xs12 md12>
                <v-layout row>
                  <v-flex style="text-align: left; padding: 3px">
                    <h2>
                      <span style="color: grey">{{ first_name }} {{ last_name }}</span>
                    </h2>
                    <span style="color: gray">ID No# : {{ id_number }}</span>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>

            <v-btn color="primary" @click="utilityTransaction"> Save Transaction </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-dialog>

    <v-dialog persistent v-model="dialogTransactionWorldRemit" max-width="800px">
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1"
            >World Remit Cash Pick-Up</v-stepper-step
          >
          <v-divider></v-divider>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-layout row wrap justify-center>
              <v-flex xs12 md12 pr-2 v-if="!viewCheck">
                <v-text-field
                  v-model="worldremitRef"
                  label="Client Reference Code"
                  type="number"
                  placeholder=" "
                ></v-text-field>
              </v-flex>

              <!-- <v-flex xs12 md12 pr-2 v-if="viewCheck">
                            <v-text-field
                              v-model="worldremitRefPin"
                              label="Enter Verification OTP"
                              type="number"
                            ></v-text-field>
                          </v-flex> -->
              <v-flex xs12 md6 pr-2 v-if="viewCheck && searched == 2">
                <v-text-field
                  v-model="pinWorldRemit"
                  label="Enter Teller PIN"
                  type="password"
                ></v-text-field>
              </v-flex>

              <v-flex xs12 md6 pr-2 v-if="viewCheck && searched == 2">
                <v-text-field
                  v-model="clientIDWorldRemit"
                  label="Beneficiary ID No."
                ></v-text-field>
              </v-flex>

              <v-flex xs12 md12 pr-2 v-if="viewCheck && searched == 2">
                <v-text-field
                  v-model="clientAddress"
                  label="Physical Address"
                ></v-text-field>
              </v-flex>

              <v-flex xs12 md6 pr-2 v-if="viewCheck && searched == 2">
                <v-combobox
                  v-model="clientGender"
                  :items="['MALE', 'FEMALE']"
                  label="Beneficiary Gender"
                >
                </v-combobox>
              </v-flex>
              <v-flex xs12 md6 pr-2 v-if="viewCheck && searched == 2">
                <v-text-field
                  v-model="clientDistrict"
                  label="Beneficiary District"
                ></v-text-field>
              </v-flex>

              <v-flex xs12 md6 pr-2 v-if="viewCheck && searched == 2">
                <v-combobox
                  v-model="transactionPurpose"
                  :items="['GRC', 'GFT', 'UTB', 'SOWF', 'MED', 'CNT']"
                  label="Transaction Purpose"
                >
                </v-combobox>
              </v-flex>
              <v-flex xs12 md6 pr-2 v-if="viewCheck && searched == 2">
                <v-combobox
                  v-model="sourceFunds"
                  :items="['GFT', 'SAL']"
                  label="Source of funds"
                >
                </v-combobox>
              </v-flex>

              <v-flex pa-1 xs12 md12 v-if="viewCheck">
                <v-layout row wrap>
                  <v-flex pa-2 xs12>
                    <v-card hover>
                      <v-flex mb-2 class="card cardRev1">
                        <v-layout ma-1>
                          <v-flex style="text-align: right; padding: 3px">
                            <h1 class="card">
                              Pay Out Amount:
                              <span style="color: grey"
                                >{{ transaction.beneficiaryCurrency }}
                                {{
                                  parseFloat(transaction.beneficiaryAmount).toFixed(2)
                                }}</span
                              >
                            </h1>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-card>
                  </v-flex>

                  <v-flex style="text-align: left; padding: 3px" xs6>
                    <v-card>
                      <v-card-text>
                        <h2>
                          <span style="color: grey"
                            >{{ sender.firstName }} {{ sender.middleName }}
                            {{ sender.lastName }} : Sender</span
                          >
                        </h2>

                        <span style="color: gray">ID No# : {{ sender.nationalId }}</span>
                        <p></p>
                        <span style="color: gray"
                          >Cell Number# : {{ sender.mobilePhone }}</span
                        >
                        <p></p>
                        <span style="color: gray">Email# : {{ sender.email }}</span>
                        <p></p>
                        <span style="color: gray"
                          >Country# : {{ sender.countryName }}</span
                        >
                      </v-card-text>
                    </v-card>
                  </v-flex>

                  <v-flex style="text-align: left; padding: 3px" xs6>
                    <v-card>
                      <v-card-text>
                        <h2>
                          <span style="color: grey"
                            >{{ recipient.firstName }} {{ recipient.middleName }}
                            {{ recipient.lastName }} : Recipient</span
                          >
                        </h2>

                        <span style="color: gray"
                          >ID No# : {{ recipient.nationalId }}</span
                        >
                        <p></p>
                        <span style="color: gray"
                          >Cell Number# : {{ recipient.mobilePhone }}</span
                        >
                        <p></p>
                        <span style="color: gray">Email# : {{ recipient.email }}</span>
                        <p></p>
                        <span style="color: gray"
                          >Country# : {{ recipient.countryName }}</span
                        >
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>

            <v-btn
              v-if="!viewCheck && searched == 0"
              color="primary"
              @click="CheckReference"
            >
              Search Reference
            </v-btn>
            <v-btn
              v-if="viewCheck && searched == 1"
              color="purple"
              dark
              @click="LockReference"
            >
              Lock
            </v-btn>
            <v-btn
              v-if="viewCheck && searched == 1"
              color="red"
              dark
              @click="dialogTransactionWorldRemit = false"
            >
              Close Form
            </v-btn>
            <v-btn
              :disabled="disableButton"
              v-if="viewCheck && searched == 2"
              class="white--text"
              color="red"
              @click="ProcessReference"
            >
              Payout Reference
            </v-btn>

            <v-btn
              v-if="viewCheck && searched == 2"
              dark
              color="green"
              @click="dialogDeclineReference = true"
            >
              Un-lock Transaction
            </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-dialog>

    <v-dialog v-model="dialogDeclineReference" max-width="400px">
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1"
            >World Remit Decline Reason</v-stepper-step
          >
          <v-divider></v-divider>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-layout row wrap justify-center>
              <v-flex xs12 md12 pr-2>
                <v-textarea
                  v-model="declineMessage"
                  outlined
                  label="Decline Reason"
                ></v-textarea>
              </v-flex>
            </v-layout>

            <v-btn v-if="viewCheck" dark color="red" @click="DeclineReference">
              Submit
            </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-dialog>

    <v-dialog v-model="dialogDeclineReferenceCS" width="500px">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          ContiSend Unlock Reason
        </v-card-title>

        <v-card-text>
          <v-layout row wrap justify-center>
            <v-flex xs12 md12 pr-2>
              <v-textarea
                v-model="declineMessage"
                outlined
                label="Unlock Reason"
              ></v-textarea>
            </v-flex>
          </v-layout>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark color="red" @click="DeclineReferenceCS"> Submit </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogUser" max-width="600px">
      <v-stepper v-model="e11">
        <v-stepper-header>
          <v-stepper-step editable :complete="e11 > 1" step="1"
            >Personal Information</v-stepper-step
          >

          <v-divider></v-divider>

          <v-stepper-step editable step="2">Client Type</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-layout wrap justify-center>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  v-model="editedClient.first_name"
                  label="First Name"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  v-model="editedClient.last_name"
                  label="Last Name"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  v-model="editedClient.id_number"
                  label="National ID"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <vue-tel-input
                  v-model="editedClient.cell"
                  @input="getTelePhone"
                  style="margin-top: 15px"
                  v-bind:style="{ color: isActive ? 'red' : 'blue' }"
                ></vue-tel-input>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  v-model="editedClient.email"
                  label="Email Address"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  v-model="editedClient.date_of_birth"
                  label="Date of Birth(DD-MM-YYYY)"
                  type="date"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md12>
                <v-text-field
                  v-model="editedClient.address"
                  label="Address"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-btn color="primary" @click="e11 = 2"> Continue </v-btn>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-layout wrap justify-center>
              <v-flex xs12 sm md12>
                <v-select
                  v-model="editedClient.company_id"
                  label="Client Type"
                  item-text="status"
                  item-value="id"
                  :items="userlevelData"
                >
                </v-select>
              </v-flex>
            </v-layout>

            <v-btn color="primary" @click="saveNewClient"> Save </v-btn>

            <v-btn text @click="e11 = 1">back</v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-dialog>

    <v-dialog v-model="dialogUserCS" max-width="600px">
      <v-stepper v-model="e11">
        <v-stepper-header>
          <v-stepper-step editable :complete="e11 > 1" step="1"
            >Personal Information</v-stepper-step
          >

          <v-divider></v-divider>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-layout wrap justify-center>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  v-model="editedClient.first_name"
                  label="First Name"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  v-model="editedClient.last_name"
                  label="Last Name"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  v-model="editedClient.id_number"
                  label="National ID"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <vue-tel-input
                  v-model="editedClient.cell"
                  @input="getTelePhone"
                  style="margin-top: 15px"
                  v-bind:style="{ color: isActive ? 'red' : 'blue' }"
                ></vue-tel-input>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  v-model="editedClient.email"
                  label="Email Address"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-select
                  v-model="editedClient.gender"
                  label="Gender Type"
                  item-text="name"
                  item-value="value"
                  :items="genderData"
                >
                </v-select>
              </v-flex>
              <v-flex xs12 sm6 md12>
                <v-text-field
                  v-model="editedClient.address"
                  label="Address"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-btn color="primary" @click="saveNewClientCS"> Save </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-dialog>

    <v-dialog>
      <div class="invoice-box rtl" id="Sale">
        <table cellpadding="0" cellspacing="0">
          <tr class="top">
            <td colspan="2">
              <table>
                <tr>
                  <td class="title" style="text-align: centre">
                    <img
                      src="../assets/main_logo2.png"
                      alt="Sahwira"
                      style="width: 100%; max-width: 250px"
                    />
                  </td>
                </tr>

                <tr>
                  <br />
                </tr>

                <tr>
                  <td style="text-align: center; font-size: 12px">
                    Invoice # <span style="font-weight: bold">{{ tranID }}</span
                    ><br />
                    {{ time | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}<br />
                    <br />
                    <br />
                    <strong> Customer Copy</strong>
                    <br />
                    <br />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr class="information">
            <td colspan="2">
              <table>
                <tr>
                  <td style="text-align: center; font-size: 12px">
                    537 Syringa, Euphorbia Road<br />
                    Chiredzi<br />
                    0313221,+263 774 063 714
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr class="item">
            <td>Branch</td>

            <td style="text-align: right; font-weight: bold">
              {{ teller_branch }}
            </td>
          </tr>
          <tr class="item">
            <td>Teller</td>

            <td style="text-align: right; font-weight: bold">
              {{ teller_first_name }} {{ teller_last_name }}
            </td>
          </tr>
          <tr class="item">
            <td>Client</td>

            <td style="text-align: right; font-weight: bold">
              {{ first_name }} {{ last_name }}
            </td>
          </tr>
          <tr class="item">
            <td>Client Cell</td>

            <td style="text-align: right; font-weight: bold">
              {{ cell }}
            </td>
          </tr>

          <tr class="item">
            <td>Tran Type</td>

            <td style="text-align: right; font-weight: bold">
              {{ transaction_type }}
            </td>
          </tr>
          <tr class="heading">
            <td>
              <br />
            </td>
          </tr>

          <tr class="heading" style="font-weight: bold">
            <td>Item</td>

            <td style="text-align: right">Amount</td>
          </tr>
          <tr class="item">
            <td>
              <br />
            </td>
          </tr>

          <tr class="item">
            <td>Received</td>

            <td style="text-align: right">
              {{ receive_symbol }}
              {{ parseFloat(transactionData.receive_amount).toFixed(2) }}
            </td>
          </tr>

          <tr class="item">
            <td>Disbursement</td>

            <td style="text-align: right">
              {{ disburse_symbol }}
              {{ parseFloat(transactionData.disburse_amount).toFixed(2) }}
            </td>
          </tr>

          <tr class="item last">
            <td>Rate</td>

            <td style="text-align: right">
              {{ parseFloat(transactionData.rate).toFixed(2) }}
            </td>
          </tr>
          <tr class="item last">
            <td>
              <br />
            </td>
          </tr>
          <tr class="item last">
            <td>
              <br />
            </td>
          </tr>
        </table>

        <table cellpadding="0" cellspacing="0">
          <tr class="top">
            <td colspan="2">
              <table>
                <tr>
                  <td class="title" style="text-align: centre">
                    <img
                      src="../assets/main_logo2.png"
                      alt="ContiCash FX"
                      style="width: 100%; max-width: 250px"
                    />
                  </td>
                </tr>

                <tr>
                  <br />
                </tr>

                <tr>
                  <td style="text-align: center; font-size: 12px">
                    Invoice # <span style="font-weight: bold">{{ tranID }}</span
                    ><br />
                    {{ time | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}<br />
                    <br />
                    <br />
                    <strong> Merchant Copy</strong>
                    <br />
                    <br />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr class="information">
            <td colspan="2">
              <table>
                <tr>
                  <td style="text-align: center; font-size: 12px">
                    537 Syringa, Euphorbia Road<br />
                    Chiredzi<br />
                    0313221,+263 774 063 714
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr class="item">
            <td>Branch</td>

            <td style="text-align: right; font-weight: bold">
              {{ teller_branch }}
            </td>
          </tr>
          <tr class="item">
            <td>Teller</td>

            <td style="text-align: right; font-weight: bold">
              {{ teller_first_name }} {{ teller_last_name }}
            </td>
          </tr>
          <tr class="item">
            <td>Client</td>

            <td style="text-align: right; font-weight: bold">
              {{ first_name }} {{ last_name }}
            </td>
          </tr>
          <tr class="item">
            <td>Client Cell</td>

            <td style="text-align: right; font-weight: bold">
              {{ cell }}
            </td>
          </tr>
          <tr class="item">
            <td>Tran Type</td>

            <td style="text-align: right; font-weight: bold">
              {{ transaction_type }}
            </td>
          </tr>
          <tr class="heading">
            <td>
              <br />
            </td>
          </tr>

          <tr class="heading" style="font-weight: bold">
            <td>Item</td>

            <td style="text-align: right">Amount</td>
          </tr>
          <tr class="item">
            <td>
              <br />
            </td>
          </tr>

          <tr class="item">
            <td>Received</td>

            <td style="text-align: right">
              {{ receive_symbol }}
              {{ parseFloat(transactionData.receive_amount).toFixed(2) }}
            </td>
          </tr>

          <tr class="item">
            <td>Disbursement</td>

            <td style="text-align: right">
              {{ disburse_symbol }}
              {{ parseFloat(transactionData.disburse_amount).toFixed(2) }}
            </td>
          </tr>

          <tr class="item last">
            <td>Rate</td>

            <td style="text-align: right">
              {{ parseFloat(transactionData.rate).toFixed(2) }}
            </td>
          </tr>
          <tr class="item last">
            <td>
              <br />
            </td>
          </tr>
          <tr class="item last">
            <td>
              <br />
            </td>
          </tr>
        </table>
      </div>
    </v-dialog>

    <v-dialog>
      <div class="invoice-box rtl" id="WorldRemit">
        <table cellpadding="0" cellspacing="0">
          <tr class="top">
            <td colspan="2">
              <table>
                <tr>
                  <td class="title" style="text-align: centre">
                    <img
                      src="../assets/main_logo2.png"
                      alt="Sahwira"
                      style="width: 100%; max-width: 250px"
                    />
                  </td>
                </tr>

                <tr>
                  <br />
                </tr>

                <tr>
                  <td style="text-align: center; font-size: 12px">
                    Invoice # <span style="font-weight: bold">{{ tranID }}</span
                    ><br />
                    {{ time | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}<br />
                    <br />
                    <br />
                    <strong> Customer Copy</strong>
                    <br />
                    <br />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr class="information">
            <td colspan="2">
              <table>
                <tr>
                  <td style="text-align: center; font-size: 12px">
                    537 Syringa, Euphorbia Road<br />
                    Chiredzi<br />
                    0313221,+263 774 063 714
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr class="item">
            <td>Branch</td>

            <td style="text-align: right; font-weight: bold">
              {{ teller_branch }}
            </td>
          </tr>
          <tr class="item">
            <td>Teller</td>

            <td style="text-align: right; font-weight: bold">
              {{ teller_first_name }} {{ teller_last_name }}
            </td>
          </tr>
          <tr class="item">
            <td>Client</td>

            <td style="text-align: right; font-weight: bold">
              {{ recipient.firstName }} {{ recipient.lastName }}
            </td>
          </tr>
          <tr class="item">
            <td>Client Cell</td>

            <td style="text-align: right; font-weight: bold">
              {{ recipient.mobilePhone }}
            </td>
          </tr>

          <tr class="item">
            <td>Tran Type</td>

            <td style="text-align: right; font-weight: bold">
              {{ transaction_type }}
            </td>
          </tr>
          <tr class="heading">
            <td>
              <br />
            </td>
          </tr>

          <tr class="heading" style="font-weight: bold">
            <td>Item</td>

            <td style="text-align: right">Amount</td>
          </tr>
          <tr class="item">
            <td>
              <br />
            </td>
          </tr>

          <tr class="item">
            <td>Disbursement</td>

            <td style="text-align: right">
              {{ transaction.beneficiaryCurrency }}
              {{ parseFloat(transaction.beneficiaryAmount).toFixed(2) }}
            </td>
          </tr>

          <tr class="item last">
            <td>@Charge</td>

            <td style="text-align: right">
              {{ parseFloat(transaction.beneficiaryCharges).toFixed(2) }}
            </td>
          </tr>
          <tr class="item last">
            <td>
              <br />
            </td>
          </tr>
          <tr class="item last">
            <td>
              <br />
            </td>
          </tr>
        </table>

        <table cellpadding="0" cellspacing="0">
          <tr class="top">
            <td colspan="2">
              <table>
                <tr>
                  <td class="title" style="text-align: centre">
                    <img
                      src="../assets/main_logo2.png"
                      alt="ContiCash FX"
                      style="width: 100%; max-width: 250px"
                    />
                  </td>
                </tr>

                <tr>
                  <br />
                </tr>

                <tr>
                  <td style="text-align: center; font-size: 12px">
                    Invoice # <span style="font-weight: bold">{{ tranID }}</span
                    ><br />
                    {{ time | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}<br />
                    <br />
                    <br />
                    <strong> Merchant Copy</strong>
                    <br />
                    <br />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr class="information">
            <td colspan="2">
              <table>
                <tr>
                  <td style="text-align: center; font-size: 12px">
                    537 Syringa, Euphorbia Road<br />
                    Chiredzi<br />
                    0313221,+263 774 063 714
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr class="item">
            <td>Branch</td>

            <td style="text-align: right; font-weight: bold">
              {{ teller_branch }}
            </td>
          </tr>
          <tr class="item">
            <td>Teller</td>

            <td style="text-align: right; font-weight: bold">
              {{ teller_first_name }} {{ teller_last_name }}
            </td>
          </tr>
          <tr class="item">
            <td>Client</td>

            <td style="text-align: right; font-weight: bold">
              {{ recipient.firstName }} {{ recipient.lastName }}
            </td>
          </tr>
          <tr class="item">
            <td>Client Cell</td>

            <td style="text-align: right; font-weight: bold">
              {{ recipient.mobilePhone }}
            </td>
          </tr>
          <tr class="item">
            <td>Tran Type</td>

            <td style="text-align: right; font-weight: bold">
              {{ transaction_type }}
            </td>
          </tr>
          <tr class="heading">
            <td>
              <br />
            </td>
          </tr>

          <tr class="heading" style="font-weight: bold">
            <td>Item</td>

            <td style="text-align: right">Amount</td>
          </tr>
          <tr class="item">
            <td>
              <br />
            </td>
          </tr>

          <tr class="item">
            <td>Disbursement</td>

            <td style="text-align: right">
              {{ transaction.beneficiaryCurrency }}
              {{ parseFloat(transaction.beneficiaryAmount).toFixed(2) }}
            </td>
          </tr>

          <tr class="item last">
            <td>@Charge</td>

            <td style="text-align: right">
              {{ parseFloat(transaction.beneficiaryCharges).toFixed(2) }}
            </td>
          </tr>
          <tr class="item last">
            <td>
              <br />
            </td>
          </tr>
          <tr class="item last">
            <td>
              <br />
            </td>
          </tr>
        </table>
      </div>
    </v-dialog>

    <v-dialog>
      <div class="invoice-box rtl" id="ContiSend">
        <table cellpadding="0" cellspacing="0">
          <tr class="top">
            <td colspan="2">
              <table>
                <tr>
                  <td class="title" style="text-align: centre">
                    <img
                      src="../assets/CONTISEND.png"
                      alt="Sahwira"
                      style="width: 100%; max-width: 250px"
                    />
                  </td>
                </tr>

                <tr>
                  <br />
                </tr>

                <tr>
                  <td style="text-align: center; font-size: 12px">
                    Invoice # <span style="font-weight: bold">{{ tranID }}</span
                    ><br />
                    {{ time | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}<br />
                    <br />
                    <br />
                    <strong> Customer Copy</strong>
                    <br />
                    <br />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr class="information">
            <td colspan="2">
              <table>
                <tr>
                  <td style="text-align: center; font-size: 12px">
                    537 Syringa, Euphorbia Road<br />
                    Chiredzi<br />
                    0313221,+263 774 063 714
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr class="item">
            <td>Branch</td>

            <td style="text-align: right; font-weight: bold">
              {{ teller_branch }}
            </td>
          </tr>
          <tr class="item">
            <td>Teller</td>

            <td style="text-align: right; font-weight: bold">
              {{ teller_first_name }} {{ teller_last_name }}
            </td>
          </tr>
          <tr class="item">
            <td>Sender</td>

            <td style="text-align: right; font-weight: bold">
              {{ recipient.firstName }} {{ recipient.lastName }}
            </td>
          </tr>
          <tr class="item">
            <td>Recipient</td>

            <td style="text-align: right; font-weight: bold">
              {{ recipient.firstName }} {{ recipient.lastName }}
            </td>
          </tr>
          <tr class="item">
            <td>Client Cell</td>

            <td style="text-align: right; font-weight: bold">
              {{ recipient.mobilePhone }}
            </td>
          </tr>

          <tr class="heading">
            <td>
              <br />
            </td>
          </tr>

          <tr class="heading" style="font-weight: bold">
            <td>Item</td>

            <td style="text-align: right">Amount</td>
          </tr>
          <tr class="item">
            <td>
              <br />
            </td>
          </tr>

          <tr class="item">
            <td>Disbursement</td>

            <td style="text-align: right">
              {{ transaction.beneficiaryCurrency }}
              {{ parseFloat(transaction.beneficiaryAmount).toFixed(2) }}
            </td>
          </tr>

          <tr class="item last">
            <td>@Charge</td>

            <td style="text-align: right">
              {{ parseFloat(transaction.beneficiaryCharges).toFixed(2) }}
            </td>
          </tr>
          <tr class="item last">
            <td>
              <br />
            </td>
          </tr>
          <tr class="item last">
            <td>
              <br />
            </td>
          </tr>
          <tr class="item last">
            <td>Ts & Cs Apply</td>
          </tr>
        </table>

        <table cellpadding="0" cellspacing="0">
          <tr class="top">
            <td colspan="2">
              <table>
                <tr>
                  <td class="title" style="text-align: centre">
                    <img
                      src="../assets/main_logo2.png"
                      alt="Sahwira"
                      style="width: 100%; max-width: 250px"
                    />
                  </td>
                </tr>

                <tr>
                  <br />
                </tr>

                <tr>
                  <td style="text-align: center; font-size: 12px">
                    Invoice # <span style="font-weight: bold">{{ tranID }}</span
                    ><br />
                    {{ time | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}<br />
                    <br />
                    <br />
                    <strong> Merchant Copy</strong>
                    <br />
                    <br />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr class="information">
            <td colspan="2">
              <table>
                <tr>
                  <td style="text-align: center; font-size: 12px">
                    537 Syringa, Euphorbia Road<br />
                    Chiredzi<br />
                    0313221,+263 774 063 714
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr class="item">
            <td>Branch</td>

            <td style="text-align: right; font-weight: bold">
              {{ teller_branch }}
            </td>
          </tr>
          <tr class="item">
            <td>Teller</td>

            <td style="text-align: right; font-weight: bold">
              {{ teller_first_name }} {{ teller_last_name }}
            </td>
          </tr>
          <tr class="item">
            <td>Client</td>

            <td style="text-align: right; font-weight: bold">
              {{ recipient.firstName }} {{ recipient.lastName }}
            </td>
          </tr>
          <tr class="item">
            <td>Client Cell</td>

            <td style="text-align: right; font-weight: bold">
              {{ recipient.mobilePhone }}
            </td>
          </tr>
          <tr class="item">
            <td>Tran Type</td>

            <td style="text-align: right; font-weight: bold">
              {{ transaction_type }}
            </td>
          </tr>
          <tr class="heading">
            <td>
              <br />
            </td>
          </tr>

          <tr class="heading" style="font-weight: bold">
            <td>Item</td>

            <td style="text-align: right">Amount</td>
          </tr>
          <tr class="item">
            <td>
              <br />
            </td>
          </tr>

          <tr class="item">
            <td>Disbursement</td>

            <td style="text-align: right">
              {{ transaction.beneficiaryCurrency }}
              {{ parseFloat(transaction.beneficiaryAmount).toFixed(2) }}
            </td>
          </tr>

          <tr class="item last">
            <td>@Charge</td>

            <td style="text-align: right">
              {{ parseFloat(transaction.beneficiaryCharges).toFixed(2) }}
            </td>
          </tr>
          <tr class="item last">
            <td>
              <br />
            </td>
          </tr>
          <tr class="item last">
            <td>
              <br />
            </td>
          </tr>
          <tr class="item last">
            <td>Ts & Cs Apply</td>
          </tr>
        </table>
      </div>
    </v-dialog>

    <v-dialog v-model="dialogcheckPin" persistent max-width="400px">
      <v-card class="mx-auto">
        <v-card-title class="yellow darken-2 white--text">
          <span class="headline">Confirm Settlement</span>
        </v-card-title>

        <v-layout>
          <v-flex xs12 pa-3>
            <v-text-field
              style="text-align: center"
              @keyup.enter="checkPin"
              v-model="pin"
              autofocus
              loading
              type="password"
              label="Please enter you security pin"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-spacer></v-spacer>
        <v-btn color="red" class="white--text" @click="dialogcheckPin = false"
          >Close</v-btn
        >
        <v-btn color="green" class="white--text" @click="checkPin">Save</v-btn>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogcheckPinSend" persistent max-width="400px">
      <v-card class="mx-auto">
        <v-card-title class="yellow darken-2 white--text">
          <span class="headline">Confirm Settlement</span>
        </v-card-title>

        <v-layout wrap>
          <v-flex xs12 pa-3>
            <v-text-field
              style="text-align: center"
              @keyup.enter="checkPin"
              v-model="pin"
              autofocus
              loading
              type="password"
              label="Please enter you security pin"
              required
            ></v-text-field>
          </v-flex>

          <v-flex xs12 pl-3 pr-3 pb-3 v-if="contisend.sendTypeData == 'Payout'">
            <v-text-field
              v-model="contisend.transactionPin"
              label="Cash Out Pin"
              type="password"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-spacer></v-spacer>
        <v-btn color="red" class="white--text" @click="dialogcheckPinSend = false"
          >Close</v-btn
        >
        <v-btn color="green" class="white--text" @click="checkPinSend">Save</v-btn>
      </v-card>
    </v-dialog>

    <v-dialog v-model="override" persistent max-width="400px">
      <v-card class="mx-auto">
        <v-card-title class="red darken-2 white--text">
          <span class="headline">Over-Ride Request</span>
        </v-card-title>

        <v-layout row wrap>
          <v-flex xs12 md12 pr-3 pl-3>
            <v-text-field
              style="text-align: center"
              @keyup.enter="sendRequest"
              v-model="request_rate"
              autofocus
              loading
              type="number"
              label="Please enter the rate you want to offer"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md12 pr-3 pl-3>
            <v-combobox
              v-model="managerData"
              :items="managerList"
              item-text="first_name"
              item-value="id"
              label="Select Manager"
            >
              <template slot="item" slot-scope="data">
                {{ data.item.first_name }} {{ data.item.last_name }}
              </template>
            </v-combobox>
          </v-flex>
        </v-layout>
        <v-spacer></v-spacer>
        <v-btn color="red" class="white--text" @click="override = false">Close</v-btn>
        <v-btn color="green" class="white--text" @click="sendRequest">Save</v-btn>
      </v-card>
    </v-dialog>

    <v-dialog v-model="overrideConfirm" persistent max-width="400px">
      <v-card class="mx-auto">
        <v-card-title class="green darken-2 white--text">
          <span class="headline">Over-Ride Confirm</span>
        </v-card-title>

        <v-layout>
          <v-flex xs12 pa-3>
            <v-text-field
              style="text-align: center"
              @keyup.enter="confirmOverride"
              v-model="overridePinT"
              autofocus
              loading
              type="number"
              label="Please enter over-ride pin"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-spacer></v-spacer>
        <v-btn color="red" class="white--text" @click="overrideConfirm = false"
          >Close</v-btn
        >
        <v-btn color="green" class="white--text" @click="confirmOverride">Save</v-btn>
      </v-card>
    </v-dialog>

    <!-- add user to branch creation dialog -->
    <v-dialog v-model="dialogClientHistory" max-width="800px">
      <v-card>
        <v-card-title class="yellow darken-2 white--text">
          <span class="headline">Client Transaction History</span>
          <v-spacer></v-spacer>
          <v-btn color="red" class="white--text" @click="dialogClientHistory = false"
            >Close</v-btn
          >
        </v-card-title>

        <v-layout wrap ma-3>
          <v-flex>
            <v-text-field
              v-model="search2"
              append-icon="search"
              label="Search"
              single-line
              hide-details
              style="margin: 5px"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-data-table
          :headers="headersClients"
          :key="clientDataHistory.client_id"
          :items="clientDataHistory"
          must-sort
          :search="search2"
          class="elevation-1"
          hide-actions
        >
          <template v-slot:items="props">
            <td class="text-xs-left">
              {{ props.item.branch }}
            </td>
            <td class="text-xs-left">
              {{ props.item.first_name }} {{ props.item.last_name }}
            </td>
            <td class="text-xs-left">{{ props.item.tran_type }}</td>
            <td class="text-xs-left">
              <v-avatar left tile>
                <img
                  :src="image + props.item.image"
                  style="max-width: 100px; height: auto; margin-right: 30px; padding: 5px"
                />
              </v-avatar>
              ${{ props.item.client_amount }}
            </td>
            <td class="text-xs-left">{{ props.item.rate }}</td>
            <td class="text-xs-left">{{ props.item.date_time }}</td>
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
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogAddBranch" max-width="400px">
      <v-card>
        <v-card-title class="yellow darken-2 white--text">
          <span class="headline">Security Change Form</span>
          <v-spacer></v-spacer>
        </v-card-title>

        <v-tabs color="blue light-4" slider-color="red">
          <v-tab class="white--text"> Password Change </v-tab>
          <v-tab-item>
            <v-layout row wrap ma-3>
              <v-flex xs12>
                <v-text-field
                  @keyup.enter="updatePin"
                  v-model="passwordold"
                  placeholder="Enter Old Security Pin"
                  type="password"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <password
                  v-model="newPassword"
                  :toggle="true"
                  @score="showScore"
                  @keyup.enter="updatePin"
                />
              </v-flex>
              <v-flex xs12>
                <password
                  v-model="confirm"
                  :toggle="true"
                  @score="showScore"
                  @keyup.enter="updatePin"
                />
              </v-flex>
            </v-layout>

            <v-spacer></v-spacer>
            <v-btn color="red" class="white--text" @click="dialogAddBranch = false"
              >Close</v-btn
            >
            <v-btn color="green" class="white--text" @click="AddPassword">Save</v-btn>
          </v-tab-item>

          <v-tab class="white--text"> Pin Change </v-tab>
          <v-tab-item>
            <v-layout row wrap ma-3>
              <v-flex xs12>
                <v-text-field
                  @keyup.enter="updatePin"
                  v-model="pinold"
                  placeholder="Enter Old Security Pin"
                  type="password"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  @keyup.enter="updatePin"
                  v-model="pin"
                  placeholder="Enter Security Pin"
                  type="password"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  @keyup.enter="updatePin"
                  v-model="pinconfirm"
                  placeholder="Enter Security Pin"
                  type="password"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-spacer></v-spacer>
            <v-btn color="red" class="white--text" @click="dialogAddBranch = false"
              >Close</v-btn
            >
            <v-btn color="green" class="white--text" @click="updatePin">Save</v-btn>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogNameScan" persistent max-width="400px">
      <v-card class="mx-auto">
        <v-card-title class="red darken-2 white--text">
          <span class="headline">NameScan Dialog</span>
        </v-card-title>

        <v-layout row wrap>
          <v-flex xs12 md12 pr-3 pl-3>
            <v-text-field v-model="scanFullName" disabled type="text"></v-text-field>
          </v-flex>
          <v-flex xs12 md12 pr-3 pl-3>
            <v-combobox
              v-model="scanData"
              :items="scanTypes"
              item-text="name"
              item-value="id"
              label="Select Scan Type"
            >
              <template slot="item" slot-scope="data">
                {{ data.item.name }}
              </template>
            </v-combobox>
          </v-flex>
        </v-layout>
        <v-spacer></v-spacer>
        <v-btn color="red" class="white--text" @click="dialogNameScan = false"
          >Close</v-btn
        >
        <v-btn color="green" class="white--text" @click="scanRequest">Save</v-btn>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogNameScanSend" persistent max-width="400px">
      <v-card class="mx-auto">
        <v-card-title class="red darken-2 white--text">
          <span class="headline">NameScan Dialog</span>
        </v-card-title>

        <v-layout row wrap>
          <v-flex xs12 md12 pr-3 pl-3>
            <!-- <v-text-field v-model="scanFullName" placeholder="Full Name" type="text"></v-text-field> -->
            <v-combobox
              v-model="scanFullName"
              :items="scanFullNameSend"
              label="Select Client"
            >
            </v-combobox>
          </v-flex>
          <v-flex xs12 md12 pr-3 pl-3>
            <v-combobox
              v-model="scanData"
              :items="scanTypes"
              item-text="name"
              item-value="id"
              label="Select Scan Type"
            >
              <template slot="item" slot-scope="data">
                {{ data.item.name }}
              </template>
            </v-combobox>
          </v-flex>
        </v-layout>
        <v-spacer></v-spacer>
        <v-btn color="red" class="white--text" @click="dialogNameScanSend = false"
          >Close</v-btn
        >
        <v-btn color="green" class="white--text" @click="scanRequest">Save</v-btn>
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
  </v-toolbar>
</template>
<script>
import * as jsPDF from "jspdf";
import * as autoTable from "jspdf-autotable";
import Axios from "axios-observable";
import Password from "vue-password-strength-meter";
export default {
  components: {
    Password,
  },
  data() {
    return {
      isShopOpen: 0,
      searched: 0,
      switch1: true,
      full_send_amount: 0,
      commissions: 0,
      sendTypeData: "",
      genderData: [
        { value: "M", name: "Male" },
        { value: "F", name: "Female" },
      ],
      newScanData: null,
      clientIDWorldRemit: "",
      scanFullName: "",
      scanFullNameSend: [],
      contiBooking: {
        sender: {
          firstName: "Gregory",
          middleName: "-",
          lastName: "Shoniwa",
          nationalId: "631198624K40",
          idTypeCode: "NationalID",
          mobilePhone: "263772996330",
          email: "gshoniwa1@gmail.com",
          countryName: "ZIMBABWE",
        },
        recipient: {
          firstName: "Blessing",
          middleName: "--",
          lastName: "Shoniwa",
          nationalId: "45282299182K34",
          idTypeCode: "NationalID",
          mobilePhone: "263772996330",
          email: "bshoniwa@gmail.com",
          countryName: "ZIMBABWE",
        },
        transaction: {
          senderAmount: 125,
          senderFees: "6.25",
          senderCurrency: "USD",
          senderSymbol: "USD$",
          senderRate: "1",
          beneficiaryRate: "1",
          beneficiaryAmount: 118.75,
          beneficiaryCharges: "0",
          beneficiaryCurrency: "USD",
          beneficiarySymbol: "USD$",
          bookingID: "02918028",
        },
      },
      scanTypes: [
        { id: 1, name: "Individual Scan" },
        { id: 2, name: "Organisation Scan" },
      ],
      clientDistrict: "",
      scanData: "",
      clientAddress: "",
      user_type: 0,
      transactionPurpose: "GFT",
      sourceFunds: "GFT",
      clientGender: "MALE",
      clientDistrict: "Harare",
      //nodeApi: '',
      nodeApi: "",
      //phpService: 'https://cors-anywhere.herokuapp.com/https://api-dev.contipay.co.zw/request/loyalty',
      phpService: "/service.php?endPoint=request/loyalty",
      image: "/img/",
      //image: 'https://localhost/img/',
      time: 0,
      e1: 0,
      disableButton: false,
      dialogDeclineReference: false,
      dialogDeclineReferenceCS: false,
      dialogNameScan: false,
      dialogNameScanSend: false,
      declineMessage: "",
      dialogWorldRemit: false,
      viewCheck: false,
      sender: {
        firstName: "",
        lastName: "",
        nationalId: "",
        countryName: "",
        email: "",
        mobilePhone: "",
      },
      recipient: {
        firstName: "",
        lastName: "",
        nationalId: "",
        countryName: "",
        email: "",
        mobilePhone: "",
      },
      contisend: {
        clientID: null,
        sendTypeData: "",
        recipientFirstName: "",
        recipientLastName: "",
        recipientCell: "",
        transactionPin: "",
        recipientID: "",
        disburse_currency_id: null,
        disburse_amount: null,
        receive_currency_id: null,
        receive_amount: null,
        refNumber: "",
        sender_name: "",
        sender_cell: "",
        charge: "",
        city_name: "",
      },
      checkCommission: true,
      worldremitRef: "",
      worldremitRefPin: "",
      transactionID: null,
      productSelected: null,
      showLoyaltyReg: true,
      dialogloader: false,
      clientDisabled: false,
      showLoyaltyPoints: false,
      loyalty_client_id: 0,
      utilityAmount: null,
      meterNumber: null,
      product: null,
      dstvTotal: 0,
      utilityCurrency: null,
      tranID: 0,
      clientsPoint: null,
      drawer: false,
      annonimous: true,
      e11: 0,
      branch: "",
      recipient_address: "",
      clientHistory: [],
      Utilities: [],
      dialogreceitp: false,
      gotFloat: false,
      pin: null,
      pinWorldRemit: null,
      dialogAddBranch: false,
      dialogClientHistory: false,
      clientDataHistory: [],
      overridePinM: null,
      overridePinT: null,
      override: false,
      utility: null,
      request_rate: "",
      managerList: [],
      search2: "",
      managerData: "",
      overrideConfirm: false,
      dialogcheckPin: false,
      dialogcheckPinSend: false,
      zeroFloat: 0,
      dialogloader: false,
      dialogUser: false,
      dialogUserCS: false,
      userlevelData: [
        {
          status: "Individual",
          id: 1,
        },
        {
          status: "Company",
          id: 0,
        },
      ],
      UsersData: [],
      statusData: [
        {
          status: "Active",
          id: 2,
        },
        {
          status: "Disabled",
          id: 3,
        },
      ],
      headersClients: [
        {
          text: "Branch",
          value: "branch",
        },
        {
          text: "Full Name",
          align: "left",
          value: "first_name",
        },
        {
          text: "Tran Type",
          value: "tran_type",
        },
        {
          text: "Amount",
          value: "client_amount",
        },
        {
          text: "Rate",
          value: "rate",
        },
        {
          text: "Date",
          value: "date_time",
        },
      ],
      clientData: [],
      transaction_type: "",
      transactionType: "",
      clientName: "",
      disableCheck: true,
      first_name: "",
      last_name: "",
      id_number: "",
      cell: "",
      receive_symbol: null,
      disburse_symbol: null,
      clientID: null,
      editCheck: 0,
      isActive: true,
      isValidPhone: false,
      dialogTransactionSend: false,
      dialogTransaction: false,
      dialogTransactionUtility: false,
      dialogTransactionWorldRemit: false,
      userFloatUSD: null,
      userFloatZWD: null,
      teller_first_name: "",
      teller_last_name: "",
      teller_branch: "",
      userFloat: [],
      currencyData: [],
      dstvDataDown: [],
      dstvDataCheck: [],
      transactionData: {
        client_id: 0,
        transaction_type_id: 0,
        receive_amount: null,
        disburse_amount: null,
        rate: 0,
        branch_id: 0,
        disburse_currency_id: "",
        receive_currency_id: "",
        created_by: 0,
        status: 4,
      },
      transactionDataClear: {
        client_id: null,
        transaction_type_id: null,
        receive_amount: null,
        disburse_amount: null,
        rate: 0,
        branch_id: 0,
        disburse_currency_id: null,
        receive_currency_id: null,
        created_by: 0,
        status: 4,
      },
      editedClient: {
        id: 0,
        first_name: "",
        last_name: "",
        email: "",
        id_number: "",
        gender: "",
        date_of_birth: null,
        address: "",
        company_id: 1,
        branch_id: 0,
        user_type: 0,
        countrycode: "",
        nationality: "",
        status: 2,
        cell: "",
        created_by: 0,
      },
      overridePin: null,
      ClearUser: {
        id: 0,
        first_name: "",
        last_name: "",
        email: "",
        id_number: "",
        date_of_birth: null,
        address: "",
        company_id: 1,
        branch_id: 0,
        user_type: 0,
        nationality: "",
        status: 2,
        cell: "",
        created_by: 0,
      },
      group: null,
      items: [],
      pin: "",
      pinold: "",
      passwordold: "",
      pinconfirm: "",
      permanent: true,
      newPassword: "",
      confirm: "",
      score: 0,
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
        wrtDateCreated: "2020-03-23T07:10:54.1862336Z",
      },
      contiPayout: {},
      transactionIndex: 0,
      worldremitCurrency: 0,
      worldremitCurrencyFloat: 0,
      worldremitCurrencyError: null,
      transactionIDWorldRemit: null,
      transactionIDContiSend: null,
      needApproval: 0,
    };
  },
  watch: {
    clientID(val) {
      if (typeof val === "object") {
        this.id_number = this.clientID.nationalId;
        this.first_name = this.clientID.firstName;
        this.last_name = this.clientID.lastName;
      }
    },

    dialogNameScanSend(val) {
      if (val) {
        this.scanData = "";
        this.scanFullName = "";
      }
    },
    productSelected(val) {
      // console.log(val)
      this.getProduct(val);
    },
    loyalty_client_id(val) {
      //console.log(val)
    },
    override(val) {
      if (val) {
      } else {
      }
    },
    transactionID(val) {
      if (val != null) {
        this.tranID = val;
        // console.log(val)
        setTimeout(() => {
          this.printPDF("Sale");
        }, 2000);
        this.transactionID = null;
        // this.transactionData = this.transactionDataClear
      }
      //
    },
    transactionIDWorldRemit(val) {
      if (val != null) {
        this.tranID = val;
        // console.log(val)
        setTimeout(() => {
          this.printPDFWorldRemit("WorldRemit");
        }, 2000);
        this.transactionIDWorldRemit = null;
        // this.dialogTransactionWorldRemit = false
        // this.transactionData = this.transactionDataClear
      }

      //
    },
    transactionIDContiSend(val) {
      if (val != null) {
        this.tranID = val;
        // console.log(val)
        setTimeout(() => {
          this.printPDFContiSend("ContiSend");
        }, 2000);
        this.transactionIDContiSend = null;
        // this.dialogTransactionWorldRemit = false
        // this.transactionData = this.transactionDataClear
      }

      //
    },
    group() {
      this.drawer = false;
    },
    transactionData: {
      handler(val) {
        //console.log(val.receive_amount)
        if (val.receive_amount > 500) {
          // this.gotFloat = false
        }
        if (val.receive_amount < 500) {
          // this.gotFloat = true
        }
        if (this.transaction_type == "Buy") {
          if (this.switch1) {
            if (val.rate == NaN) {
              this.transactionData.disburse_amount = 0.0;
            } else {
              this.transactionData.disburse_amount = val.receive_amount * val.rate;
            }
          } else {
            if (val.rate == NaN) {
              this.transactionData.receive_amount = 0.0;
            } else {
              this.transactionData.receive_amount = val.disburse_amount / val.rate;
            }
          }
        }
        if (this.transaction_type == "Sell") {
          if (this.switch1) {
            if (val.rate == NaN) {
              this.transactionData.disburse_amount = 0.0;
            } else {
              this.transactionData.disburse_amount = val.receive_amount / val.rate;
            }
          } else {
            if (val.rate == NaN) {
              this.transactionData.receive_amount = 0.0;
            } else {
              this.transactionData.receive_amount = val.disburse_amount * val.rate;
            }
          }
        }
      },
      deep: true,
    },
    userFloat: {
      handler(val) {
        if (val.length == 0) {
          //  console.log(val)
          //this.gotFloat = true
        } else {
          this.zeroFloat = val[0].amount;
          // console.log(val)
          // this.gotFloat = false
        }
      },
      deep: true,
    },
    dialogTransactionWorldRemit(val) {
      if (val) {
        this.checkShopOpenLoader("dialogTransactionWorldRemit");
        if (this.isShopOpen == 0) {
          this.$swal.fire({
            type: "error",
            title: "Shop Open Failed",
            text:
              "Sorry but the shop has not been opened by managment, please contact them for assistance.",
          });
          this.dialogTransactionWorldRemit = false;
        } else {
          this.getManager();
        }
      } else {
        //console.log(val)
        this.Utilities = [];
        this.editedClient.first_name = "";
        this.editedClient.last_name = "";
        this.editedClient.email = "";
        this.editedClient.id_number = "";
        this.editedClient.date_of_birth = null;
        this.editedClient.address = "";
        this.editedClient.cell = "";
        this.annonimous = true;
        this.clientDisabled = false;
        this.transactionData.receive_currency_id = "";
        this.transactionData.disburse_currency_id = "";
        this.utilityCurrency = null;
        this.utilityAmount = null;
        this.utility = null;
        this.meterNumber = null;
        this.product = null;

        this.userFloat = [];
        this.currencyData = [];
        this.clientID = null;
        this.clientData = [];
        this.e1 = 1;
        this.clientHistory = [];
        this.viewCheck = false;
        this.searched = 0;
        this.worldremitRef = "";
        this.pinWorldRemit = null;
        this.disableButton = false;

        this.clientIDWorldRemit = "";
        this.clientDistrict = "";
        this.clientAddress = "";
        this.transactionPurpose = "GFT";
        this.sourceFunds = "GFT";
        this.clientGender = "MALE";
        this.clientDistrict = "Harare";

        //   this.sender = {
        //  firstName:'',
        //   lastName:'',
        //   nationalId: '',
        //   countryName:'',
        //   email:'',
        //   mobilePhone:''
        // }

        // this.recipient = {
        //   firstName:'',
        //   lastName:'',
        //   nationalId: '',
        //   countryName:'',
        //   email:'',
        //   mobilePhone:''
        // }
        // this.transactionIndex = 0
        // this.transaction = {
        //   senderAmount: "0",
        //   senderFees: "0",
        //   senderCurrency: null,
        //   senderSymbol: null,
        //   beneficiaryAmount: "0",
        //   beneficiaryCharges: "0",
        //   beneficiaryCurrency: "MXN",
        //   beneficiarySymbol: "$",
        //   settlementAmount: "0",
        //   settlementCommission: null,
        //   wrtId: "2003230701140001",
        //   wrtDateCreated: "2020-03-23T07:10:54.1862336Z"
        // }
      }
    },
    dialogTransactionUtility(val) {
      if (val) {
        this.checkShopOpenLoader("dialogTransactionUtility");

        if (this.isShopOpen == 0) {
          this.$swal.fire({
            type: "error",
            title: "Shop Open Failed",
            text:
              "Sorry but the shop has not been opened by managment, please contact them for assistance.",
          });
          this.dialogTransactionUtility = false;
        } else {
          this.getUtilities();
          this.getManager();
        }
      } else {
        //console.log(val)
        this.Utilities = [];
        this.editedClient.first_name = "";
        this.editedClient.last_name = "";
        this.editedClient.email = "";
        this.editedClient.id_number = "";
        this.editedClient.date_of_birth = null;
        this.editedClient.address = "";
        this.editedClient.cell = "";
        this.annonimous = true;
        this.clientDisabled = false;
        this.transactionData.receive_currency_id = "";
        this.transactionData.disburse_currency_id = "";
        this.utilityCurrency = null;
        this.utilityAmount = null;
        this.utility = null;
        this.meterNumber = null;
        this.product = null;
        this.dstvTotal = 0;

        //this.transactionData.receive_amount = 0
        // this.transactionData = this.transactionDataClear
        this.userFloat = [];
        this.currencyData = [];
        this.clientID = null;
        this.clientData = [];
        this.e1 = 1;
        this.clientHistory = [];
        // this.first_name = ''
        // this.last_name = ''
        // this.id_number = ''
        // this.cell = ''
      }
    },
    dialogTransaction(val) {
      if (val) {
        this.first_name = ''
        this.last_name = ''
        this.id_number = ''
        this.cell = ''
        this.checkShopOpenLoader("dialogTransaction");
        if (this.isShopOpen == 0) {
          this.$swal.fire({
            type: "error",
            title: "Shop Open Failed",
            text:
              "Sorry but the shop has not been opened by managment, please contact them for assistance.",
          });
          this.dialogTransaction = false;
        } else {
          this.getUtilities();
          this.getManager();
        }
      } else {
        //console.log(val)
        this.editedClient.first_name = "";
        this.editedClient.last_name = "";
        this.editedClient.email = "";
        this.editedClient.id_number = "";
        this.editedClient.date_of_birth = null;
        this.editedClient.address = "";
        this.editedClient.cell = "";
        this.annonimous = true;
        this.clientDisabled = false;
        this.transactionData.receive_currency_id = "";
        this.transactionData.disburse_currency_id = "";

        //this.transactionData.receive_amount = 0
        // this.transactionData = this.transactionDataClear
        this.userFloat = [];
        this.currencyData = [];
        this.clientID = null;
        this.clientData = [];
        this.e1 = 1;
        this.clientHistory = [];
        // this.first_name = ''
        // this.last_name = ''
        // this.id_number = ''
        // this.cell = ''
      }
    },
    dialogTransactionSend(val) {
      if (val) {
        this.checkShopOpenLoader("dialogTransactionSend");
        if (this.isShopOpen == 0) {
          this.$swal.fire({
            type: "error",
            title: "Shop Open Failed",
            text:
              "Sorry but the shop has not been opened by managment, please contact them for assistance.",
          });
          this.dialogTransactionSend = false;
        } else {
          this.showLoyaltyReg = true;
          this.showLoyaltyPoints = false;
          this.first_name = "";
          this.last_name = "";
          this.id_number = "";

          (this.contisend.clientID = ""),
            (this.contisend.sendTypeData = ""),
            (this.contisend.recipientFirstName = ""),
            (this.contisend.recipientLastName = ""),
            (this.contisend.recipientCell = ""),
            (this.contisend.recipientID = ""),
            (this.contisend.disburse_currency_id = ""),
            (this.contisend.disburse_amount = ""),
            (this.contisend.receive_currency_id = ""),
            (this.contisend.receive_amount = ""),
            (this.contisend.refNumber = ""),
            (this.contisend.sender_name = ""),
            (this.contisend.sender_cell = ""),
            (this.contisend.charge = ""),
            (this.contisend.city_name = ""),
            (this.contisend.transactionPin = ""),
            (this.pin = "");

          this.transactionData = {
            client_id: 0,
            transaction_type_id: 0,
            receive_amount: null,
            disburse_amount: null,
            rate: 0,
            branch_id: 0,
            disburse_currency_id: "",
            receive_currency_id: "",
            created_by: 0,
            status: 4,
          };
          (this.full_send_amount = 0), (this.commissions = 0), this.getManager();
        }
      } else {
        //console.log(val)
        this.editedClient.first_name = "";
        this.editedClient.last_name = "";
        this.editedClient.email = "";
        this.editedClient.id_number = "";
        this.editedClient.date_of_birth = null;
        this.editedClient.address = "";
        this.editedClient.cell = "";
        this.annonimous = true;
        this.clientDisabled = false;
        this.transactionData.receive_currency_id = "";
        this.transactionData.disburse_currency_id = "";

        //this.transactionData.receive_amount = 0
        // this.transactionData = this.transactionDataClear
        this.userFloat = [];
        this.currencyData = [];
        this.clientID = null;
        this.clientData = [];
        this.e1 = 1;
        this.clientHistory = [];
        // this.first_name = ''
        // this.last_name = ''
        // this.id_number = ''
        // this.cell = ''
      }
    },
    dialogUser(val) {
      if (val) {
      } else {
        this.editedClient = this.ClearUser;
      }
    },
  },
  mounted() {
    this.checkShopOpen();
    this.teller_first_name = this.$session.get("user").userdetails.first_name;
    this.teller_last_name = this.$session.get("user").userdetails.last_name;
    this.teller_branch = this.$session.get("user").userdetails.branch_name;
    this.intervalid1 = setInterval(() => {
      this.time = Date.now();
    }, 1000);
    this.user_type = this.$session.get("user").userdetails.user_type;
    if (this.$session.get("user").userdetails.user_type == 1) {
      this.items = [
        {
          title: "market-page",
          name: "Dashboard",
          icon: "dashboard",
        },
        {
          title: "overall-page",
          name: "Transactions",
          icon: "equalizer",
        },
        // { title: "overall_utility-page", icon: "sort", name: "Utilities" },
        // { title: "overall_world-page", icon: "language", name: "WorldRemit" },
        // { title: "booking_admin-page", icon: "how_to_reg", name: "Booking Admin" },
        {
          title: "exchange-page",
          name: "Clients",
          icon: "supervised_user_circle",
        },
        {
          title: "profile-page",
          name: "Users",
          icon: "account_circle",
        },
        {
          title: "rates-page",
          name: "Rates",
          icon: "monetization_on",
        },
        {
          title: "reports-page",
          name: "Branches",
          icon: "account_balance",
        },
        {
          title: "floatmove-page",
          name: "Float Report",
          icon: "swap_vertical_circle",
        },
        {
          title: "support-page",
          name: "Float Admin",
          icon: "compare_arrows",
        },
        {
          title: "Password",
          name: "Password Change",
          icon: "https",
        },
        {
          title: "Exit",
          name: "Logout",
          icon: "exit_to_app",
        },
      ];
    }
    if (this.$session.get("user").userdetails.user_type == 2) {
      this.items = [
        {
          title: "market-page",
          name: "Dashboard",
          icon: "dashboard",
        },
        {
          title: "exchange-page",
          name: "Clients",
          icon: "supervised_user_circle",
        },
        {
          title: "support-page",
          name: "Float Admin",
          icon: "compare_arrows",
        },
        {
          title: "Password",
          name: "Password Change",
          icon: "https",
        },
        {
          title: "Exit",
          name: "Logout",
          icon: "exit_to_app",
        },
      ];
    }
    if (this.$session.get("user").userdetails.user_type == 3) {
      this.items = [
        {
          title: "market-page",
          name: "Dashboard",
          icon: "dashboard",
        },
        {
          title: "dashboard-page",
          name: "Transactions",
          icon: "equalizer",
        },
        {
          title: "exchange-page",
          name: "Clients",
          icon: "supervised_user_circle",
        },
        {
          title: "support-page",
          name: "Float Admin",
          icon: "compare_arrows",
        },
        {
          title: "Password",
          name: "Password Change",
          icon: "https",
        },
        {
          title: "Exit",
          name: "Logout",
          icon: "exit_to_app",
        },
      ];
    }
    if (
      this.$session.get("user").userdetails.user_type >= 4 &&
      this.$session.get("user").userdetails.user_type <= 6
    ) {
      this.items = [
        {
          title: "market-page",
          name: "Dashboard",
          icon: "dashboard",
        },
        {
          title: "overall-page",
          name: "Transactions",
          icon: "equalizer",
        },
        // { title: "overall_utility-page", icon: "sort", name: "Utilities" },
        // { title: "overall_world-page", icon: "language", name: "WorldRemit" },
        // { title: "booking_admin-page", icon: "how_to_reg", name: "Booking Admin" },
        // { title: "contisend-page", icon: "sync_alt", name: "ConitSend" },

        {
          title: "exchange-page",
          name: "Clients",
          icon: "supervised_user_circle",
        },
        {
          title: "profile-page",
          name: "Users",
          icon: "account_circle",
        },
        {
          title: "rates-page",
          name: "Rates",
          icon: "monetization_on",
        },
        {
          title: "reports-page",
          name: "Branches",
          icon: "account_balance",
        },
        {
          title: "floatmove-page",
          name: "Float Report",
          icon: "swap_vertical_circle",
        },
        {
          title: "support-page",
          name: "Float Admin",
          icon: "compare_arrows",
        },
        {
          title: "Password",
          name: "Password Change",
          icon: "https",
        },
        {
          title: "Exit",
          name: "Logout",
          icon: "exit_to_app",
        },
      ];
    }

    if (this.$session.get("user").userdetails.user_type == 7) {
      this.items = [
        { title: "contisend-page", icon: "sync_alt", name: "ConitSend" },

        {
          title: "Password",
          name: "Password Change",
          icon: "https",
        },
        {
          title: "Exit",
          name: "Logout",
          icon: "exit_to_app",
        },
      ];
    }
  },
  computed: {},
  methods: {
    sendType(data) {
      this.contisend.sendTypeData = data;
      console.log(this.contisend.sendTypeData);
      this.e1 = 2;
    },
    checkRateSend() {
      if (this.transactionData.receive_currency_id == "") {
        this.$swal.fire({
          type: "error",
          title: "Check Commission Failed",
          text: "Please select a valid currency to send.",
        });
      } else if (this.transactionData.receive_amount == null) {
        this.$swal.fire({
          type: "error",
          title: "Check Commission Failed",
          text: "Please enter a valid amount to send.",
        });
      } else if (this.transactionData.receive_amount <= 0) {
        this.$swal.fire({
          type: "error",
          title: "Check Commission Failed",
          text: "Please enter a valid amount to send greater than 0.00.",
        });
      } else {
        let headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$session.get("user").token,
        };
        let data = {
          amount: this.transactionData.receive_amount,
          currencyCode: this.transactionData.receive_currency_id.symbol,
        };
        if (this.transactionData.receive_currency_id.symbol == "Bond") {
          data.currencyCode = "ZWL";
        }
        Axios.post(this.nodeApi + "/contiSendRate", data, {
          headers: headers,
        }).subscribe(
          (res) => {
            if (res.data.code == 1) {
              this.checkCommission = false;
              this.commissions = res.data.rates.sender.totalFees;
              this.full_send_amount = res.data.rates.sender.totalAmount;
            } else {
              this.$swal.fire({
                type: "error",
                title: "Check Commission Failed",
                text: res.data.message,
              });
            }
          },
          (err) => console.log(err)
        );
      }
    },
    async scanRequest() {
      this.dialogloader = true;
      //console.log(this.scanData)
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      if (this.scanData.id == 1) {
        let scanObject = { name: `${this.scanFullName}` };
        await Axios.post(this.nodeApi + "/personalScan", scanObject, {
          headers: headers,
        }).subscribe(
          (res) => {
            this.newScanData = res.data;
            if (this.newScanData.numberOfMatches == 0) {
              this.dialogloader = false;
              console.log(this.newScanData);
              this.dialogNameScan = false;
              this.dialogNameScanSend = false;
              this.$swal.fire({
                type: "success",
                title: "NameScan Done",
                text: `Your client has been successfully scanned by NameScan and No record has been found that stops your financial dealing with them.`,
              });
            } else {
              this.dialogloader = false;
              console.log(this.newScanData);
              this.dialogNameScan = false;
              this.dialogNameScanSend = false;
              this.$swal.fire({
                type: "error",
                title: "NameScan Done",
                text: `Sorry but your client has been flag ${this.newScanData.numberOfMatches} times by NameScan, It is not legal to financially deal with them.`,
              });
            }
          },
          (err) => console.log(err)
        );
      } else if (this.scanData.id == 2) {
        let scanObject = { name: `${this.scanFullName}` };
        await Axios.post(this.nodeApi + "/businessScan", scanObject, {
          headers: headers,
        }).subscribe(
          (res) => {
            if (this.newScanData.numberOfMatches == 0) {
              this.dialogloader = false;
              console.log(this.newScanData);
              this.dialogNameScan = false;
              this.$swal.fire({
                type: "success",
                title: "NameScan Done",
                text: `Your business client has been successfully scanned by NameScan and No record has been found that stops your financial dealing with them.`,
              });
            } else {
              this.dialogloader = false;
              console.log(this.newScanData);
              this.dialogNameScan = false;
              this.$swal.fire({
                type: "error",
                title: "NameScan Done",
                text: `Sorry but your business client has been flag ${this.newScanData.numberOfMatches} times by NameScan, It is not legal to financially deal with them.`,
              });
            }
          },
          (err) => console.log(err)
        );
      } else {
        this.dialogloader = false;

        this.$swal.fire({
          type: "error",
          title: "NameScan Failed",
          text: "Please select a valid scan type.",
        });
      }
    },
    async nameScan() {
      // console.log(this.clientID)
      this.scanFullName = `${this.clientID.first_name.replace(
        /\s/g,
        ""
      )} ${this.clientID.last_name.replace(/\s/g, "")}`;
      this.dialogNameScan = true;
    },
    async nameScanSend() {
      // console.log(this.clientID)
      this.scanFullNameSend = [];
      this.scanFullNameSend.push(`${this.contisend.sender_name}`);
      this.scanFullNameSend.push(
        `${this.contisend.recipientFirstName} ${this.contisend.recipientLastName}`
      );
      this.dialogNameScanSend = true;
    },
    async getUtilities() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      let utilObject = {
        branch_id: this.$session.get("user").userdetails.branch_id,
        user_id: this.$session.get("user").userdetails.id,
      };
      Axios.post(this.nodeApi + "/getAllUtils", utilObject, {
        headers: headers,
      }).subscribe(
        (res) => {
          this.Utilities = res.data.data.one.recordset;
        },
        (err) => console.log(err)
      );
    },
    async utilityTransaction() {
      this.dialogloader = true;

      if (
        this.clientID &&
        this.utility &&
        this.meterNumber &&
        this.utilityCurrency &&
        this.utilityAmount
      ) {
        let receiveAmount = null;
        let product = null;
        if (this.utilityCurrency.currency) {
          receiveAmount = this.utilityCurrency.currency;
          product = this.utilityCurrency.product;
        } else {
          receiveAmount = this.utilityCurrency.id;
        }

        let utilityObj = {
          client_id: this.clientID.id,
          transaction_type_id: 5,
          utility_id: this.utility,
          meter_number: this.meterNumber,
          product: product,
          receive_currency_id: receiveAmount,
          receive_amount: this.utilityAmount,
          branch_id: this.$session.get("user").userdetails.branch_id,
          created_by: this.$session.get("user").userdetails.id,
          status: 4,
        };

        //console.log(utilityObj)
        let headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$session.get("user").token,
        };

        let transactionObject = {
          transaction: utilityObj,
          floatincrease: {
            col: "amount",
            value: utilityObj.receive_amount,
            wcol: "user_id",
            wvalue: utilityObj.created_by,
            wcol2: "currency_id",
            wvalue2: utilityObj.utility_id,
          },
        };
        await Axios.post(this.nodeApi + "/addTransactionUtilitySell", transactionObject, {
          headers: headers,
        }).subscribe(
          (res) => {
            // console.log(res.data)
            if (res.data.data.one) {
              this.$swal.fire({
                type: "success",
                title: "Transaction Added",
                text: "Transaction was added successfully",
              });
              this.dialogTransactionUtility = false;
              this.dialogloader = false;
            } else {
              this.dialogloader = false;
              this.$swal.fire({
                type: "error",
                title: "Transaction Adding Failed",
                text: res.data.message.message,
              });
            }
          },
          (err) => console.log(err)
        );
      } else {
        this.dialogloader = false;
        this.$swal.fire({
          type: "error",
          title: "Utility Adding Failed",
          text: "Please fill in all empty fields.",
        });
      }
    },
    utilitySelected(data) {
      this.utility = data;
      this.e1 = 2;
    },
    async AddPassword() {
      if (this.score < 3) {
        this.$swal.fire({
          type: "error",
          title: "Password Update Failed",
          text: "Please enter a stronger password",
        });
      } else if (this.newPassword != this.confirm) {
        this.$swal.fire({
          type: "error",
          title: "Password Update Failed",
          text: "Your two passwords do not match",
        });
      } else if (!this.passwordold) {
        this.$swal.fire({
          type: "error",
          title: "Password Update Failed",
          text: "Please enter old password",
        });
      } else {
        let headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$session.get("user").token,
        };
        let logindetails = {
          email: this.$session.get("user").userdetails.email,
          password: this.passwordold,
        };
        await Axios.post(this.nodeApi + "/checkloginUser", logindetails).subscribe(
          (res) => {
            // console.log(res)
            if (res.data.message == "Success") {
              Axios.post(
                this.nodeApi + "/updateUserPassword",
                {
                  email: this.$session.get("user").userdetails.email,
                  password: this.newPassword,
                },
                {
                  headers: headers,
                }
              ).subscribe(
                (res) => {
                  //console.log(res.data)
                  if (res.data.message.one) {
                    this.dialogAddBranch = false;
                    this.newPassword = "";
                    this.confirm = "";
                    this.passwordold = "";
                    this.$swal.fire({
                      type: "success",
                      title: "Password Update",
                      text: "User Password was updated successfully",
                    });
                  } else {
                    this.$swal.fire({
                      type: "error",
                      title: "Password Update Failed",
                      text: res.data.message,
                    });
                  }
                },
                (err) => {
                  this.$swal.fire("Password Update Failed", err, "error");
                }
              );
            } else {
              this.$swal.fire({
                type: "error",
                title: "Password Update Failed",
                text: res.data.message,
              });
            }
          },
          (err) => {
            this.$swal.fire({
              type: "Old Password Check",
              title: "Old password check try again",
              text: err,
            });
          }
        );
        //console.log('done')
      }
    },
    async updatePin() {
      if (this.pin != this.pinconfirm) {
        this.$swal.fire({
          type: "error",
          title: "Pin Update Failed",
          text: "Your two passwords do not match",
        });
      } else if (!this.pinold) {
        this.$swal.fire({
          type: "error",
          title: "Pin Update Failed",
          text: "Please enter old pin",
        });
      } else {
        let dataOTP = {
          id: this.$session.get("user").userdetails.id,
          pin: this.pinold,
        };
        let headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$session.get("user").token,
        };
        await Axios.post(this.nodeApi + "/checkPin", dataOTP, {
          headers: headers,
        }).subscribe(
          (res) => {
            if (res.data.data.one.recordset.length != 0) {
              this.dialogcheckPin = false;
              Axios.put(
                this.nodeApi + "/updateUsersByCol",
                {
                  col: "pin",
                  value: this.pin,
                  wcol: "email",
                  wvalue: this.$session.get("user").userdetails.email,
                },
                {
                  headers: headers,
                }
              ).subscribe(
                (res) => {
                  //console.log(res.data)
                  if (res.data.data.one) {
                    this.dialogAddBranch = false;
                    this.pin = "";
                    this.pinconfirm = "";
                    this.pinold = "";
                    this.$swal.fire({
                      type: "success",
                      title: "Pin Update",
                      text: "User pin was updated successfully",
                    });
                  } else {
                    this.$swal.fire({
                      type: "error",
                      title: "Pin Update Failed",
                      text: res.data.message,
                    });
                  }
                },
                (err) => {
                  this.$swal.fire("Pin Update Failed", err, "error");
                }
              );
            } else {
              this.dialogloader = false;
              this.$swal.fire({
                type: "error",
                title: "Pin Update Failed",
                text: "Wrong old pin please try again",
              });
            }
          },
          (err) => console.log(err)
        );
        //console.log('done')
      }
    },
    async shopAdmin(data) {
      if (this.$session.get("user").userdetails.user_type == 1) {
        let dataOTP = {
          open: data,
        };
        let headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$session.get("user").token,
        };
        await Axios.post(this.nodeApi + "/adminShopOpen", dataOTP, {
          headers: headers,
        }).subscribe(
          (res) => {
            if (res.data.data.one) {
              this.$swal.fire(
                "Shop Admin Error",
                "You have successfully change the shop status.",
                "success"
              );
              this.isShopOpen = data;
            }
          },
          (err) => console.log(err)
        );
      } else if (this.$session.get("user").userdetails.user_type == 4) {
        let dataOTP = {
          open: data,
        };
        let headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$session.get("user").token,
        };
        await Axios.post(this.nodeApi + "/adminShopOpen", dataOTP, {
          headers: headers,
        }).subscribe(
          (res) => {
            if (res.data.data.one) {
              this.isShopOpen = data;
              this.$swal.fire(
                "Shop Admin Error",
                "You have successfully change the shop status.",
                "success"
              );
            }
          },
          (err) => console.log(err)
        );
      } else {
        this.$swal.fire(
          "Shop Admin Error",
          "Sorry your account is not allowed to perform this action, contact managment for assistance.",
          "error"
        );
      }
    },
    async checkShopOpen() {
      let dataOTP = {};
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      await Axios.post(this.nodeApi + "/checkShopOpen", dataOTP, {
        headers: headers,
      }).subscribe(
        (res) => {
          if (res.data.data.one.recordset.length != 0) {
            //console.log(res.data.data.one.recordset)
            this.isShopOpen = res.data.data.one.recordset[0].open;
          }
        },
        (err) => console.log(err)
      );
    },
    async checkShopOpenLoader(data) {
      let dataOTP = {};
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      await Axios.post(this.nodeApi + "/checkShopOpen", dataOTP, {
        headers: headers,
      }).subscribe(
        (res) => {
          if (res.data.data.one.recordset.length != 0) {
            //console.log(res.data.data.one.recordset)
            this.isShopOpen = res.data.data.one.recordset[0].open;
            if (this.isShopOpen == 0) {
              if (data == "dialogTransactionUtility") {
                this.dialogTransactionUtility = false;
              }
              if (data == "dialogTransactionWorldRemit") {
                this.dialogTransactionWorldRemit = false;
              }
              if (data == "dialogTransaction") {
                this.dialogTransaction = false;
              }
              if (data == "dialogTransactionSend") {
                this.dialogTransactionSend = false;
              }
            }
          }
        },
        (err) => console.log(err)
      );
    },
    showScore(score) {
      this.score = score;
      //console.log('💯', this)
    },
    getMobileMenu(data) {
      //console.log(data)
      if (data != "Password" && data != "Exit") {
        if (data == "market-page") {
          if (this.$session.get("user").userdetails.user_type == 1) {
            this.$emit("SelectedMenuItem", "dash-manager");
          }
          if (this.$session.get("user").userdetails.user_type == 2) {
            this.$emit("SelectedMenuItem", "dash-teller");
          }
          if (this.$session.get("user").userdetails.user_type == 3) {
            this.$emit("SelectedMenuItem", "dash-super");
          }
          if (
            this.$session.get("user").userdetails.user_type >= 4 &&
            this.$session.get("user").userdetails.user_type <= 6
          ) {
            this.$emit("SelectedMenuItem", "dash-manager");
          }
          if (this.$session.get("user").userdetails.user_type == 7) {
            this.$emit("SelectedMenuItem", "dash-manager");
          }
        } else {
          this.$emit("SelectedMenuItem", data);
        }
      } else {
        if (data == "Exit") {
          this.logout();
        }
        if (data == "Password") {
          this.dialogAddBranch = true;
        }
      }
    },
    logout() {
      this.$session.destroy();
      this.$router.push("/");
    },
    openClientHistory(data, type) {
      if (type.replace(/\s/g, "") === "Buy") {
        //console.log(type)
        let headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$session.get("user").token,
        };
        var datamain = {
          client_id: data,
          tran_type: 1,
        };
        // console.log(headers)
        Axios.post(this.nodeApi + "/getFullClientsTransactionsByID", datamain, {
          headers: headers,
        }).subscribe(
          (res) => {
            this.clientDataHistory = res.data.data.one.recordset;
            this.dialogClientHistory = true;
            //console.log(this.companyData)
          },
          (err) => console.log(err)
        );
      }
      if (type.replace(/\s/g, "") == "Sell") {
        let headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$session.get("user").token,
        };
        var datamain = {
          client_id: data,
          tran_type: 2,
        };
        // console.log(headers)
        Axios.post(this.nodeApi + "/getFullClientsTransactionsByID", datamain, {
          headers: headers,
        }).subscribe(
          (res) => {
            this.clientDataHistory = res.data.data.one.recordset;
            this.dialogClientHistory = true;
            //console.log(this.companyData)
          },
          (err) => console.log(err)
        );
      }
    },
    linkClient() {
      this.e1 = 2;
    },
    drawerchange() {
      if (this.drawer == false) {
        this.drawer = true;
        this.$emit("openmenu", this.drawer);
      }
      if (this.drawer == true) {
        this.drawer = false;
        this.$emit("openmenu", this.drawer);
      }
    },
    async getManager() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      await Axios.get(this.nodeApi + "/getManager", {
        headers: headers,
      }).subscribe(
        (res) => {
          this.managerList = res.data.data.one.recordset;
        },
        (err) => console.log(err)
      );
    },
    confirmOverride() {
      if (this.overridePinM == this.overridePinT) {
        this.transactionData.rate = this.request_rate;
        //console.log(this.transactionData.rate)
        this.overrideConfirm = false;
        //this.e1 = 3
      } else {
        this.$swal.fire(
          "Over-Ride Error",
          "Sorry the pin entered is wrong please try again or contact General Manager.",
          "error"
        );
      }
    },
    async sendRequest() {
      this.getManager();
      this.override = false;
      this.overrideConfirm = true;
      var cell = encodeURI(this.managerData.cell.replace(/\s/g, ""));
      //console.log(this.managerData)
      this.overridePinM = Math.floor(1000 + Math.random() * 9000);
      var emailDataPin = {
        email: this.managerData.email.replace(/\s/g, ""),
        username: this.$session.get("user").userdetails.username,
        branch: this.$session.get("user").userdetails.branch_name,
        rate: this.request_rate,
        pin: this.overridePinM,
        currency: this.disburse_symbol,
      };
      var msg = `Good day, the over-ride pin for ${
        this.$session.get("user").userdetails.branch_name
      } Branch, Teller : ${this.$session.get("user").userdetails.username} is : ${
        this.overridePinM
      } for ${this.request_rate} ${this.disburse_symbol} rate`;
      var newmessage = encodeURI(msg);
      //console.log(this.overridePinM);
      await fetch(
        "https://sms.contitouch.co.zw/api.json?cmd=sendwapp&username=contipay&password=password01&gsm=" +
          cell +
          "&msg=" +
          newmessage,
        {
          method: "GET",
          mode: "no-cors",
        }
      )
        .then(function (response) {
          if (response.status !== 200) {
            console.log(
              "Looks like there was a problem. Status Code: " +
                response.status +
                " error: " +
                response.text
            );
            return;
          }
          // Examine the text in the response
          response.json().then(function (data) {
            // console.log(data);
          });
        })
        .catch(function (err) {
          // console.log('Fetch Error :-S', err);
        });
      await fetch(
        "https://sms.contitouch.co.zw/api.json?cmd=sendwapp&username=contipay&password=password01&gsm=" +
          cell +
          "&msg=" +
          newmessage,
        {
          method: "GET",
          mode: "no-cors",
        }
      )
        .then(function (response) {
          if (response.status !== 200) {
            console.log(
              "Looks like there was a problem. Status Code: " +
                response.status +
                " error: " +
                response.text
            );
            return;
          }
          // Examine the text in the response
          response.json().then(function (data) {
            console.log(data);
          });
        })
        .catch(function (err) {
          console.log("Fetch Error :-S", err);
        });
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      await Axios.post(this.nodeApi + "/overridePinEmail", emailDataPin, {
        headers: headers,
      }).subscribe(
        (res) => {
          //console.log(res.data.message)
        },
        (err) => console.log(err)
      );
    },
    async getClientByName() {
      // console.log(this.clientID)
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      await Axios.post(
        this.nodeApi + "/getClientByName",
        {
          name: this.clientID,
        },
        {
          headers: headers,
        }
      ).subscribe(
        (res) => {
          this.clientData = res.data.data.one.recordset;
          this.getClientHistory();
        },
        (err) => console.log(err)
      );
    },
    async getClientByNameSend() {
      // console.log(this.clientID)
      this.contisend.clientID = this.clientID;
      if (typeof this.clientID !== "object") {
        let headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$session.get("user").token,
        };
        await Axios.post(
          this.nodeApi + "/contiSendSearch",
          {
            name: this.clientID,
          },
          {
            headers: headers,
          }
        ).subscribe(
          (res) => {
            this.clientData = res.data.clientsFound;

            //this.getClientHistory()
          },
          (err) => console.log(err)
        );
      }
    },
    async getClientByName2() {
      // console.log(this.clientID)
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      await Axios.post(
        this.nodeApi + "/getClientByLastName",
        {
          name: this.clientID,
        },
        {
          headers: headers,
        }
      ).subscribe(
        (res) => {
          this.clientData = res.data.data.one.recordset;
          this.getClientHistory();
        },
        (err) => console.log(err)
      );
    },
    async getClientByName3() {
      // console.log(this.clientID)
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      await Axios.post(
        this.nodeApi + "/getClientByCell",
        {
          name: this.clientID,
        },
        {
          headers: headers,
        }
      ).subscribe(
        (res) => {
          this.clientData = res.data.data.one.recordset;
          this.getClientHistory();
        },
        (err) => console.log(err)
      );
    },
    async getClientHistory() {
      if (this.clientID.id) {
        this.clientHistory = [];
        //console.log(this.clientID)
        if (this.clientID.loyalty_id > 0) {
          this.showLoyaltyReg = true;
          this.showLoyaltyPoints = true;
          this.loyalty_client_id = this.clientID.loyalty_id;
        } else {
          this.loyalty_client_id = 0;
          this.showLoyaltyReg = false;
          this.showLoyaltyPoints = false;
        }
        let headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$session.get("user").token,
        };
        await Axios.post(
          this.nodeApi + "/getClientsTransactionsByID",
          {
            id: this.clientID.id,
          },
          {
            headers: headers,
          }
        ).subscribe(
          (res) => {
            this.clientHistory = res.data.data.one.recordset;
            // this.gotFloat = false
            //console.log(this.clientID)
            this.first_name = this.clientID.first_name;
            this.last_name = this.clientID.last_name;
            this.id_number = this.clientID.id_number;
            this.cell = this.clientID.cell;
            this.clientDisabled = true;
          },
          (err) => console.log(err)
        );
      }
    },
    async registerClientLoyalty() {
      this.dialogloader = true;
      var date = new Date();
      let loyaltyObj = {
        email: this.clientID.email.replace(/\s/g, ""),
        firstName: this.clientID.first_name.replace(/\s/g, ""),
        lastName: this.clientID.last_name.replace(/\s/g, ""),
        countryCode: "ZW",
        cell: this.clientID.cell.replace(/\s/g, ""),
        nationalId: this.clientID.id_number.replace(/\s/g, ""),
        vasCentreId: "5",
        linkCard: true,
      };
      try {
        const response = await fetch(this.phpService + "/clientRegistration", {
          mode: "cors",
          method: "POST",
          body: JSON.stringify({
            data: loyaltyObj,
          }), //{data:loyaltyObj}
          // headers: {
          //     'Content-Type': 'application/json',
          //     'Authorisation': 'TTBKeGFqZERhMHg2VjNodEt6Sm1ZMmxIUlVScVFUMDkxMjM0NTY3ODE1NzA3MTgzOTA=',
          //     'timestamp': Math.floor(date.getTime()/1000)
          // }
        });
        const json = await response.json();
        //console.log(json);
        if (json.status == "Error") {
          this.dialogloader = false;
          this.$swal.fire("Loyalty Adding", json.message, "error");
        }
        if (json.status == "Success" && json.code == 1) {
          let headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.$session.get("user").token,
          };
          await Axios.put(
            this.nodeApi + "/updateClientLoyaltyId/" + this.clientID.id,
            {
              loyalty_id: json.clientId,
            },
            {
              headers: headers,
            }
          ).subscribe(
            (res) => {
              if (res.data.data.one.rowsAffected.length > 0) {
                this.loyalty_client_id = json.clientId;
                this.showLoyaltyReg = true;
                this.showLoyaltyPoints = true;
                this.dialogloader = false;
                this.$swal.fire(
                  "Loyalty Adding",
                  "Client has been successfully added to your loyalty program.",
                  "success"
                );
              } else {
                this.dialogloader = false;
                this.$swal.fire(
                  "Loyalty Adding",
                  "Failed to add client to your loyalty program.",
                  "error"
                );
              }
            },
            (err) => {
              this.dialogloader = false;
              console.log(err);
            }
          );
        }
      } catch (error) {
        console.error("Error:", error);
        this.dialogloader = false;
      }
    },
    checkTransaction() {
      // console.log(this.transactionData)
      // console.log(this.zeroFloat)
      if (this.transactionData.disburse_amount < 0.1) {
        this.$swal.fire(
          "Transaction Error",
          "Sorry your transaction is not yet complete, Only amount greater than 0.00 are allowed",
          "error"
        );
      } else if (this.transactionData.disburse_amount > this.zeroFloat) {
        this.$swal.fire(
          "Transaction Error",
          "Sorry you dont have float for this transaction .",
          "error"
        );
      }
      // else if(this.gotFloat == true){
      //   this.$swal.fire(
      //       'Transaction Error',
      //       'Sorry you dont have float for this transaction .',
      //       'error'
      //     )
      // }
      else {
        if (
          Number(this.transactionData.receive_amount) > 300 &&
          this.annonimous &&
          this.transactionData.receive_currency_id.id == 2
        ) {
          this.$swal.fire(
            "Transaction Error",
            "Sorry transaction above the USD $300 amount allowed for annonimous clients.",
            "error"
          );
          this.e1 = 1;
        } else if (
          Number(this.transactionData.receive_amount) > 4200 &&
          this.annonimous &&
          this.transactionData.receive_currency_id.id == 70
        ) {
          this.$swal.fire(
            "Transaction Error",
            "Sorry transaction above the RANDS $4500 amount allowed for annonimous clients.",
            "error"
          );
          this.e1 = 1;
        } else {
          this.e1 = 4;
        }
      }
    },
    async checkTransactionSend() {
      //console.log(this.transactionData)
      //console.log(this.zeroFloat)
      if (this.contisend.sendTypeData == "Send") {
        if (Number(this.transactionData.receive_amount) < 0.1) {
          this.$swal.fire(
            "Transaction Error",
            "Sorry your transaction is not yet complete, Only amount greater than 0.00 are allowed",
            "error"
          );
        } else {
          this.contisend.receive_amount = this.transactionData.receive_amount;
          this.e1 = 4;
        }
      } else {
        if (this.recipient_address.length < 5) {
          this.$swal.fire(
            "Transaction Error",
            "Please enter recipient physical address to proceed",
            "error"
          );
        } else {
          this.dialogloader = true;
          let headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.$session.get("user").token,
          };
          await Axios.post(
            this.nodeApi + "/contiSendLock",
            {
              transactionIndex: this.contiPayout.transactionIndex,
              oid: this.$session.get("user").userdetails.id,
              reference: this.contiPayout.refNumber,
            },
            {
              headers: headers,
            }
          ).subscribe(
            (res) => {
              if (res.data.status == "Success") {
                this.dialogloader = false;
                this.e1 = 4;
              } else {
                this.dialogloader = false;
                this.$swal.fire("Transaction Error", res.data.message, "error");
              }
            },
            (err) => console.log(err)
          );
        }
      }
    },
    async getRate2() {
      if (this.transaction_type == "Sell") {
        let headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$session.get("user").token,
        };
        await Axios.post(
          this.nodeApi + "/getRatesByCol",
          {
            col: "local_currency_id",
            value: this.transactionData.receive_currency_id.id,
            col2: "currency_id",
            value2: this.transactionData.disburse_currency_id.id,
          },
          {
            headers: headers,
          }
        ).subscribe(
          (res) => {
            if (res.data.data.one.recordset.length < 1) {
              this.$swal.fire(
                "Rate Check Error",
                "Sorry we do no have rate for this select selection.",
                "error"
              );
            } else {
              this.transactionData.rate = res.data.data.one.recordset[0].sell_rate;
              this.disableCheck = false;
            }
            //console.log(res.data.data.one.recordset.length)
          },
          (err) => console.log(err)
        );
      }
    },
    async getRate() {
      //console.log(this.transactionData)
      if (this.transactionData.receive_currency_id.symbol) {
        this.receive_symbol = this.transactionData.receive_currency_id.symbol;
      }
      if (this.transactionData.disburse_currency_id.symbol) {
        this.disburse_symbol = this.transactionData.disburse_currency_id.symbol;
      }
      if (this.transaction_type == "Sell") {
        let headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$session.get("user").token,
        };
        await Axios.post(
          this.nodeApi + "/getUserFloatByCol",
          {
            col: "user_id",
            value: this.$session.get("user").userdetails.id,
            col2: "currency_id",
            value2: this.transactionData.disburse_currency_id.id,
          },
          {
            headers: headers,
          }
        ).subscribe(
          (res) => {
            this.userFloat = res.data.data.one.recordset;
            //this.gotFloat = false
            //console.log(res.data.data.one.recordset)
          },
          (err) => console.log(err)
        );
        await Axios.post(
          this.nodeApi + "/getRatesByCol",
          {
            col: "local_currency_id",
            value: this.transactionData.receive_currency_id.id,
            col2: "currency_id",
            value2: this.transactionData.disburse_currency_id.id,
          },
          {
            headers: headers,
          }
        ).subscribe(
          (res) => {
            if (res.data.data.one.recordset.length < 1) {
              this.$swal.fire(
                "Rate Check Error",
                "Sorry we do no have rate for this select selection.",
                "error"
              );
            } else {
              this.transactionData.rate = res.data.data.one.recordset[0].sell_rate;
              this.disableCheck = false;
            }
            //console.log(res.data.data.one.recordset.length)
          },
          (err) => console.log(err)
        );
      }
      if (this.transaction_type == "Buy") {
        let headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$session.get("user").token,
        };
        await Axios.post(
          this.nodeApi + "/getUserFloatByCol",
          {
            col: "user_id",
            value: this.$session.get("user").userdetails.id,
            col2: "currency_id",
            value2: this.transactionData.disburse_currency_id.id,
          },
          {
            headers: headers,
          }
        ).subscribe(
          (res) => {
            this.userFloat = res.data.data.one.recordset;
            // this.gotFloat = false
            //console.log(res.data.data.one.recordset)
          },
          (err) => console.log(err)
        );
        await Axios.post(
          this.nodeApi + "/getRatesByCol",
          {
            col: "currency_id",
            value: this.transactionData.receive_currency_id.id,
            col2: "local_currency_id",
            value2: this.transactionData.disburse_currency_id.id,
          },
          {
            headers: headers,
          }
        ).subscribe(
          (res) => {
            if (res.data.data.one.recordset.length < 1) {
              this.$swal.fire(
                "Rate Check Error",
                "Sorry we do no have rate for this select selection.",
                "error"
              );
            } else {
              this.transactionData.rate = res.data.data.one.recordset[0].buy_rate;
              this.disableCheck = false;
            }
            //console.log(res.data.data.one.recordset.length)
          },
          (err) => console.log(err)
        );
      }
      //console.log(this.transactionData.receive_currency_id)
    },
    async getRateSend() {
      //console.log(this.transactionData)
      if (this.transactionData.receive_currency_id.symbol) {
        this.receive_symbol = this.transactionData.receive_currency_id.symbol;
        this.contisend.receive_currency_id = this.transactionData.receive_currency_id.id;
        this.contisend.receive_currency = this.receive_symbol;
      }
      if (this.transactionData.disburse_currency_id.symbol) {
        this.disburse_symbol = this.transactionData.disburse_currency_id.symbol;
        this.contisend.disburse_currency_id = this.transactionData.disburse_currency_id.id;
        // this.contisend.disburse_amount = this.transactionData.receive_amount
      }
      if (this.contisend.sendTypeData == "Send") {
        let headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$session.get("user").token,
        };
        await Axios.post(
          this.nodeApi + "/getUserFloatByCol",
          {
            col: "user_id",
            value: this.$session.get("user").userdetails.id,
            col2: "currency_id",
            value2: this.transactionData.receive_currency_id.id,
          },
          {
            headers: headers,
          }
        ).subscribe(
          (res) => {
            this.userFloat = res.data.data.one.recordset;
            //this.gotFloat = false
            //console.log(res.data.data.one.recordset)
          },
          (err) => console.log(err)
        );
      }
      if (this.contisend.sendTypeData == "Payout") {
        let headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$session.get("user").token,
        };
        await Axios.post(
          this.nodeApi + "/getUserFloatByCol",
          {
            col: "user_id",
            value: this.$session.get("user").userdetails.id,
            col2: "currency_id",
            value2: this.transactionData.disburse_currency_id.id,
          },
          {
            headers: headers,
          }
        ).subscribe(
          (res) => {
            this.userFloat = res.data.data.one.recordset;
            // this.gotFloat = false
            //console.log(res.data.data.one.recordset)
          },
          (err) => console.log(err)
        );
      }
      //console.log(this.transactionData.receive_currency_id)
    },
    async getProduct(data) {
      // console.log(this.utilityCurrency)
      // this.product = data.product
      if (data == null) {
        if (this.dstvTotal != 0) {
          this.dstvTotal -= 11;
        }
      } else {
        if (this.dstvTotal == 0) {
          if (data.type == 1) {
            this.dstvTotal += data.price;
          } else if (data.type == 0) {
            this.dstvTotal = data.price;
          }
        } else {
          if (data.type == 1) {
            this.dstvTotal += data.price;
          } else if (data.type == 0) {
            this.dstvTotal = data.price;
          }
        }
      }

      this.utilityAmount = this.dstvTotal;
      //console.log(data)
    },
    getAllCurrenciesActive() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      // console.log(headers)
      Axios.get(this.nodeApi + "/getAllCurrenciesActiveNoUtils", {
        headers: headers,
      }).subscribe(
        (res) => {
          this.currencyData = res.data.data.one.recordset;
          //console.log(this.companyData)
        },
        (err) => console.log(err)
      );
    },
    getDSTvSelect() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      // console.log(headers)
      Axios.get(this.nodeApi + "/getProductsDropDown", {
        headers: headers,
      }).subscribe(
        (res) => {
          this.dstvDataDown = res.data.data.one.recordset;
          //console.log(this.companyData)
        },
        (err) => console.log(err)
      );
    },
    getDSTvCheck() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      // console.log(headers)
      Axios.get(this.nodeApi + "/getProductsCheckBox", {
        headers: headers,
      }).subscribe(
        (res) => {
          this.dstvDataCheck = res.data.data.one.recordset;
          //console.log(this.companyData)
        },
        (err) => console.log(err)
      );
    },
    validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    getTelePhone(e, phoneData) {
      if (phoneData.isValid) {
        this.isActive = false;
        // console.log(phoneData)
        this.isValidPhone = phoneData.isValid;
        this.editedClient.nationality = phoneData.country.name;
        this.editedClient.countrycode = phoneData.country.iso2;
      }
      if (!phoneData.isValid) {
        this.isActive = true;
        //console.log(phoneData)
      }
    },
    printPDF(divId) {
      var content = document.getElementById(divId).innerHTML;
      var mywindow = window.open("", "Print", "height=600,width=800");
      mywindow.document.write("<html><head><title>Print</title>");
      mywindow.document.write("</head><body >");
      mywindow.document.write(content);
      mywindow.document.write("</body></html>");
      mywindow.document.close();
      mywindow.focus();
      setTimeout(function () {
        mywindow.print();
        mywindow.close();
      }, 1000);
      this.transactionData.receive_amount = null;
      this.transactionData.disburse_amount = 0;
      return true;
    },
    printPDFLoyal(divId) {
      var contentLoyal = document.getElementById(divId).innerHTML;
      var mywindowLoyal = window.open("", "Print", "height=600,width=800");
      mywindowLoyal.document.write("<html><head><title>Print</title>");
      mywindowLoyal.document.write("</head><body >");
      mywindowLoyal.document.write(contentLoyal);
      mywindowLoyal.document.write("</body></html>");
      mywindowLoyal.document.close();
      mywindowLoyal.focus();
      // mywindowLoyal.print();
      // mywindowLoyal.close();
      setTimeout(function () {
        mywindowLoyal.print();
        mywindowLoyal.close();
      }, 1000);
      return true;
    },
    printPDFWorldRemit(divId) {
      var contentWorldRemit = document.getElementById(divId).innerHTML;
      var mywindowWorldRemit = window.open("", "Print", "height=600,width=800");
      mywindowWorldRemit.document.write("<html><head><title>Print</title>");
      mywindowWorldRemit.document.write("</head><body >");
      mywindowWorldRemit.document.write(contentWorldRemit);
      mywindowWorldRemit.document.write("</body></html>");
      mywindowWorldRemit.document.close();
      mywindowWorldRemit.focus();
      // mywindowLoyal.print();
      // mywindowLoyal.close();
      setTimeout(function () {
        mywindowWorldRemit.print();
        mywindowWorldRemit.close();
      }, 1000);
      return true;
    },
    printPDFContiSend(divId) {
      var contentWorldRemit = document.getElementById(divId).innerHTML;
      var mywindowWorldRemit = window.open("", "Print", "height=600,width=800");
      mywindowWorldRemit.document.write("<html><head><title>Print</title>");
      mywindowWorldRemit.document.write("</head><body >");
      mywindowWorldRemit.document.write(contentWorldRemit);
      mywindowWorldRemit.document.write("</body></html>");
      mywindowWorldRemit.document.close();
      mywindowWorldRemit.focus();
      // mywindowLoyal.print();
      // mywindowLoyal.close();
      setTimeout(function () {
        mywindowWorldRemit.print();
        mywindowWorldRemit.close();
      }, 1000);
      return true;
    },
    openAddNewClient() {
      this.dialogTransaction = false;
      this.dialogUser = true;
    },
    openAddNewClientCS() {
      this.dialogTransactionSend = false;
      this.dialogUserCS = true;
    },

    async settleTransaction() {
      if (!this.transactionData.disburse_amount) {
        this.$swal.fire(
          "Settlement Error",
          "Please enter complete settlement form.",
          "error"
        );
      } else if (this.transactionData.disburse_amount > this.userFloat[0].amount) {
        this.$swal.fire(
          "Settlement Error",
          "Sorry your float is not enough to settle this transaction.",
          "error"
        );
      } else {
        this.dialogcheckPin = true;
      }
    },
    settleTransactionSendUnlock() {
      this.dialogDeclineReferenceCS = true;
    },
    async settleTransactionSend() {
      if (this.$session.get("user").userdetails.branch_id == 1) {
        this.$swal.fire(
          "Settlement Error",
          "Your account is not a teller account and you will not be able to complete this process.",
          "error"
        );
      } else {
        if (this.contisend.sendTypeData != "Payout") {
          this.contisend.refNumber2 = Date.now();
          this.contisend.created_by = this.$session.get("user").userdetails.id;
          this.contisend.branch_id = this.$session.get("user").userdetails.branch_id;

          if (!this.contisend.receive_amount) {
            if (this.contisend.sendTypeData == "Booking") {
              this.dialogcheckPinSend = true;
            } else {
              this.$swal.fire(
                "Settlement Error",
                "Please enter complete settlement form.",
                "error"
              );
            }
          } else {
            this.dialogcheckPinSend = true;
          }
        } else {
          this.contisend.created_by = this.$session.get("user").userdetails.id;
          this.contisend.branch_id = this.$session.get("user").userdetails.branch_id;

          this.contisend.receive_amount = this.contiPayout.receive_amount;
          this.contisend.receive_currency_id = this.contiPayout.receive_currency_id;
          this.contisend.recipientCell = this.contiPayout.recipientCell;
          this.contisend.recipientFirstName = this.contiPayout.recipientFirstName;
          this.contisend.recipientLastName = this.contiPayout.recipientLastName;
          this.contisend.sender_name = `${this.contiPayout.first_name} ${this.contiPayout.last_name}`;
          this.contisend.sender_cell = this.contiPayout.cell;

          if (!this.contisend.receive_amount) {
            this.$swal.fire(
              "Settlement Error",
              "Please enter complete settlement form.",
              "error"
            );
          } else {
            this.userFloat = [];
            let headers = {
              "Content-Type": "application/json",
              Authorization: "Bearer " + this.$session.get("user").token,
            };
            let col2_value = "symbol";
            if (typeof this.contiPayout.receive_currency_id == "number") {
              col2_value = "currency_id";
            }
            if (this.contiPayout.receive_currency_id == "ZWL") {
              this.contiPayout.receive_currency_id = "Bond";
            }
            // console.log(headers)
            await Axios.post(
              this.nodeApi + "/getUserFloatByCol",
              {
                col: "user_id",
                value: this.$session.get("user").userdetails.id,
                col2: col2_value,
                value2: this.contiPayout.receive_currency_id,
              },
              {
                headers: headers,
              }
            ).subscribe(
              (res) => {
                this.userFloat = res.data.data.one.recordset;
                if (this.contiPayout.receive_amount > this.userFloat[0].amount) {
                  this.$swal.fire(
                    "Settlement Error",
                    "Your current float is less than the amount you want to payout. Please contact mamagment.",
                    "error"
                  );
                } else {
                  this.dialogcheckPinSend = true;
                }
              },
              (err) => console.log(err)
            );
          }
        }
      }

      //  console.log(this.contisend)
    },
    async checkPin() {
      this.dialogloader = true;
      let dataOTP = {
        id: this.$session.get("user").userdetails.id,
        pin: this.pin,
      };
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      await Axios.post(this.nodeApi + "/checkPin", dataOTP, {
        headers: headers,
      }).subscribe(
        (res) => {
          //console.log(res.data.data.one.recordset)
          if (res.data.data.one.recordset.length != 0) {
            this.dialogcheckPin = false;
            this.pin = "";
            this.addsettlement();
          } else {
            this.dialogloader = false;
            this.$swal.fire({
              type: "error",
              title: "Transaction Adding Failed",
              text: "Wrong pin please try again",
            });
          }
        },
        (err) => console.log(err)
      );
    },

    // ContiSend
    async checkPinSend() {
      this.dialogloader = true;
      let dataOTP = {
        id: this.$session.get("user").userdetails.id,
        pin: this.pin,
      };
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      await Axios.post(this.nodeApi + "/checkPin", dataOTP, {
        headers: headers,
      }).subscribe(
        (res) => {
          //console.log(res.data.data.one.recordset)
          if (res.data.data.one.recordset.length != 0) {
            this.dialogcheckPinSend = false;
            this.pin = "";

            if (this.contisend.sendTypeData != "Payout") {
              this.addsettlementSend();
            } else {
              this.addsettlementPayout();
            }
          } else {
            this.dialogloader = false;
            this.$swal.fire({
              type: "error",
              title: "Transaction Adding Failed",
              text: "Wrong pin please try again",
            });
          }
        },
        (err) => console.log(err)
      );
    },
    async addsettlementPayout() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      if (this.contiPayout.symbol == "Bond") {
        this.contiPayout.symbol = "ZWL";
      }
      if (this.contiPayout.symbol == "Rand") {
        this.contiPayout.symbol = "ZAR";
      }
      let data = {
        reference: this.contiPayout.refNumber,
        validationCode: this.contisend.transactionPin,
        nationalId: this.contiPayout.recipientID,
        idTypeCode: "NationalID",
        paidAmount: this.contiPayout.receive_amount,
        paidCurrency: this.contiPayout.symbol,
        transactionIndex: this.contiPayout.transactionIndex,
        oid: this.$session.get("user").userdetails.id,
      };

      await Axios.post(this.nodeApi + "/contiSendComplete", data, {
        headers: headers,
      }).subscribe(
        (res) => {
          console.log(res.data);
          if (res.data.status == "Paid") {
            this.finalContiSend(this.contisend);
          } else {
            this.dialogloader = false;
            this.$swal.fire({
              type: "error",
              title: "Transaction Adding Failed",
              text: res.data.message,
            });
          }
        },
        (err) => console.log(err)
      );
    },
    async addsettlementSend() {
      var main_amount =
        Number(this.contisend.receive_amount) +
        Number(this.contisend.receive_amount) * 0.05;
      this.contisend.deposit = parseFloat(this.full_send_amount).toFixed(2);
      this.contisend.charge = parseFloat(this.commissions).toFixed(2);
      // console.log(this.contisend)
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      var url = "contiSendWR";
      let data = {};
      if (this.contisend.sendTypeData == "Booking") {
        url = "contiSendWRBooking";
        this.contisend.receive_amount = this.contiBooking.transaction.beneficiaryAmount;
        this.contisend.first_name = this.contiBooking.sender.firstName;
        this.contisend.last_name = this.contiBooking.sender.lastName;
        this.contisend.sender_name = `${this.contiBooking.sender.firstName} ${this.contiBooking.sender.lastName}`;
        this.contisend.sender_cell = this.contiBooking.sender.mobilePhone;
        this.contisend.receive_currency = this.contiBooking.transaction.senderCurrency;
        this.id_number = this.contiBooking.sender.nationalId;
        this.contisend.deposit = this.contiBooking.transaction.senderAmount;
        this.contisend.charge = this.contiBooking.transaction.senderFees;
        this.contisend.clientID = this.contiBooking.sender.nationalId;
        this.receive_symbol = this.contiBooking.transaction.senderCurrency;

        if (this.contiBooking.transaction.senderCurrency == "USD") {
          this.contisend.receive_currency_id = 2;
        }
        if (this.contiBooking.transaction.senderCurrency == "ZAR") {
          this.contisend.receive_currency_id = 70;
        }
        if (this.contiBooking.transaction.senderCurrency == "Bond") {
          this.contisend.receive_currency_id = 270;
        }
        if (this.contiBooking.transaction.senderCurrency == "ZWL") {
          this.contisend.receive_currency_id = 270;
        }

        this.contisend.recipientFirstName = this.contiBooking.recipient.firstName;
        this.contisend.recipientLastName = this.contiBooking.recipient.lastName;
        this.contisend.recipientCell = this.contiBooking.recipient.mobilePhone;
        this.contisend.recipientID = this.contiBooking.recipient.nationalId;

        data = {
          transaction: {
            CSID: this.contisend.refNumber,
          },
          merchant: {
            id: 1,
            oid: this.$session.get("user").userdetails.id,
          },
        };
      }
      if (this.contisend.sendTypeData != "Booking") {
        if (this.contisend.receive_currency == "Bond") {
          this.contisend.receive_currency = "ZWL";
        }
        data = {
          data: {
            transaction: {
              amount: this.full_send_amount, //this.contisend.receive_amount,
              message: "",
              channelCode: "CS",
              reference: this.contisend.refNumber2,
            },
            merchant: {
              id: 1,
              oid: this.$session.get("user").userdetails.id,
            },
            sender: {
              firstName: this.contisend.first_name.replace(/\s/g, ""),
              middleName: "",
              lastName: this.contisend.last_name.replace(/\s/g, ""),
              mobilePhone: this.contisend.sender_cell.replace(/[^A-Z0-9]+/gi, ""),
              email: "",
              gender: "",
              currencyCode: this.contisend.receive_currency,
              countryCode: "Zw",
              idNumber: this.id_number.replace(/[^A-Z0-9]+/gi, ""),
              address: {
                addressLine1: "",
                addressLine2: "",
                addressLine3: "",
                suburb: "",
                region: "",
                postalCode: "",
                city: "",
                state: "",
              },
            },
            receiver: {
              firstName: this.contisend.recipientFirstName,
              middleName: "",
              lastName: this.contisend.recipientLastName,
              mobilePhone: this.contisend.recipientCell.replace(/[^A-Z0-9]+/gi, ""),
              email: "",
              gender: "",
              currencyCode: this.contisend.receive_currency,
              countryCode: "Zw",
              idNumber: this.contisend.recipientID.replace(/[^A-Z0-9]+/gi, ""),
              address: {
                addressLine1: "",
                addressLine2: "",
                addressLine3: "",
                suburb: "",
                region: "",
                postalCode: "",
                city: "",
                state: "",
              },
            },
          },
        };
      }

      await Axios.post(this.nodeApi + "/" + url, data, {
        headers: headers,
      }).subscribe(
        (res) => {
          // console.log(res.data);
          if (res.data.status == "Success") {
            this.contisend.mainTransaction = res.data.transaction;
            this.contisend.refNumber = res.data.transaction.transaction.wrtId;
            this.contisend.transactionIndex = res.data.transaction.transactionIndex;
            this.contisend.recipientCell = this.contisend.recipientCell.replace(
              /[^A-Z0-9]+/gi,
              ""
            );
            this.contisend.recipientID = this.contisend.recipientID.replace(
              /[^A-Z0-9]+/gi,
              ""
            );
            this.contisend.sender_cell = this.contisend.sender_cell.replace(
              /[^A-Z0-9]+/gi,
              ""
            );
            this.contisend.first_name = this.contisend.first_name.replace(
              /[^A-Z0-9]+/gi,
              ""
            );
            this.contisend.last_name = this.contisend.last_name.replace(
              /[^A-Z0-9]+/gi,
              ""
            );

            this.finalContiSend(this.contisend);
          } else {
            this.dialogloader = false;
            this.$swal.fire({
              type: "error",
              title: "Transaction Adding Failed",
              text: res.data.message,
            });
          }
        },
        (err) => console.log(err)
      );
    },
    async finalContiSend(data) {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      if (this.contiPayout.ex) {
        data.sendTypeData = "Payout2";
        data.charge = this.contiPayout.charge;
        data.clientID = this.contiPayout.id_number;
        data.recipientID = this.contiPayout.recipientID;
        data.first_name = this.contiPayout.first_name;
        data.last_name = this.contiPayout.last_name;
        data.transactionIndex = this.contiPayout.transactionIndex;
      }
      data.recipient_address = this.recipient_address;
      await Axios.post(this.nodeApi + "/contiSendAPI", data, {
        headers: headers,
      }).subscribe(
        (res) => {
          // console.log(res.data)
          if (res.data.message.one.recordset) {
            this.dialogloader = false;
            this.contiPayout.ex = null;
            if (this.contisend.sendTypeData != "Payout") {
              this.sendSMS(this.contisend);
            } else {
              this.sendSMSPayout(this.contisend);
            }

            this.$swal.fire({
              type: "success",
              title: "Transaction Added",
              text: "Transaction was added successfully",
            });
          } else {
            this.dialogloader = false;
            this.$swal.fire({
              type: "error",
              title: "Transaction Adding Failed",
              text: res.data.message.message,
            });
          }
        },
        (err) => console.log(err)
      );
    },
    async sendSMSCreate(data) {
      // console.log(data.clientAccount);
      // var msg1 = `Good day,  ${data.clientAccount.firstName.replace(
      //   /\s/g,
      //   ""
      // )} ${data.clientAccount.lastName.replace(
      //   /\s/g,
      //   ""
      // )}, ContiCash has just created your ContiSend online account for you. Please go to http://dev.contisend.co.zw and login with the email you submitted and the following password : ${
      //   data.clientAccount.password
      // } which you should rest after logging in to your account for security purposes.`;

      // var newmessage1 = encodeURI(msg1);
      // //console.log(this.overridePinM);

      // await fetch(
      //   "https://sms.contitouch.co.zw/api.json?cmd=sendwapp&username=contipay&password=password01&gsm=" +
      //     data.clientAccount.mobilePhone.replace(/\s/g, "") +
      //     "&msg=" +
      //     newmessage1,
      //   {
      //     method: "GET",
      //     mode: "no-cors",
      //   }
      // )
      //   .then(function (response) {
      //     if (response.status !== 200) {
      //       console.log(
      //         "Looks like there was a problem. Status Code: " +
      //           response.status +
      //           " error: " +
      //           response.text
      //       );
      //       return;
      //     }
      //     // Examine the text in the response
      //     response.json().then(function (data) {
      //       console.log(data);
      //     });
      //   })
      //   .catch(function (err) {
      //     console.log("Fetch Error :-S", err);
      //   });
      this.$swal.fire({
        type: "success",
        title: "Client Added",
        text: "Client was added successfully",
      });
    },
    async sendSMS(data) {
      // if(this.contisend.sendTypeData == 'Booking'){

      // }
      //  var msg1 = `Good day,  ${this.contisend.recipientFirstName.replace(/\s/g, '')} ${this.contisend.recipientLastName.replace(/\s/g, '')}, ${this.contisend.first_name.replace(/\s/g, '')} ${this.contisend.last_name.replace(/\s/g, '')} has just sent you ${this.receive_symbol} ${parseFloat(this.contisend.receive_amount).toFixed(2)}. Your collection ContiSend Reference Number is : ${this.contisend.refNumber}. Please note that we would need your national ID, drivers licence or passport to identify you.`;
      //  var msg2 = `Good day,  ${this.contisend.first_name.replace(/\s/g, '')} ${this.contisend.last_name.replace(/\s/g, '')}, This is to confirm that you have successfully sent  ${this.receive_symbol} ${parseFloat(this.contisend.receive_amount).toFixed(2)} to ${this.contisend.recipientFirstName.replace(/\s/g, '')} ${this.contisend.recipientLastName.replace(/\s/g, '')}. Their Collection Reference number is : ${this.contisend.refNumber}. Please note that we would need them to produce their national ID, drivers licence or passport for identification.`;

      // var newmessage1 = encodeURI(msg1);
      // var newmessage2 = encodeURI(msg2);
      //console.log(this.overridePinM);

      // await fetch('https://sms.contitouch.co.zw/api.json?cmd=sendwapp&username=contipay&password=password01&gsm=' + data.recipientCell.replace(/\s/g, '') + '&msg=' + newmessage1, {
      //     method: "GET",
      //     mode: "no-cors"
      //   }).then(
      //     function(response) {
      //       if (response.status !== 200) {
      //         console.log('Looks like there was a problem. Status Code: ' +
      //           response.status + ' error: ' + response.text);
      //         return;
      //       }
      //       // Examine the text in the response
      //       response.json().then(function(data) {
      //         console.log(data);
      //       });
      //     }
      //   )
      //   .catch(function(err) {
      //     console.log('Fetch Error :-S', err);
      //   });

      //    await fetch('https://sms.contitouch.co.zw/api.json?cmd=sendwapp&username=contipay&password=password01&gsm=' + data.sender_cell.replace(/\s/g, '') + '&msg=' + newmessage2, {
      //     method: "GET",
      //     mode: "no-cors"
      //   }).then(
      //     function(response) {
      //       if (response.status !== 200) {
      //         console.log('Looks like there was a problem. Status Code: ' +
      //           response.status + ' error: ' + response.text);
      //         return;
      //       }
      //       // Examine the text in the response
      //       response.json().then(function(data) {
      //         console.log(data);
      //       });
      //     }
      //   )
      //   .catch(function(err) {
      //     console.log('Fetch Error :-S', err);
      //   });
      this.dialogTransactionSend = false;
    },
    async sendSMSPayout(data) {
      //  var msg1 = `Good day,  ${this.contisend.recipientFirstName.replace(/\s/g, '')} ${this.contisend.recipientLastName.replace(/\s/g, '')}, This message is to confirm that you have just collected ${this.contiPayout.symbol} ${parseFloat(this.contisend.receive_amount).toFixed(2)} from one of our branches.`;
      //  var msg2 = `Good day,  ${this.contisend.sender_name}, ${this.contisend.recipientFirstName.replace(/\s/g, '')} ${this.contisend.recipientLastName.replace(/\s/g, '')} has just collected  ${this.contiPayout.symbol} ${parseFloat(this.contisend.receive_amount).toFixed(2)} from one of our branches.`;

      // var newmessage1 = encodeURI(msg1);
      // var newmessage2 = encodeURI(msg2);
      // //console.log(this.overridePinM);

      // await fetch('https://sms.contitouch.co.zw/api.json?cmd=sendwapp&username=contipay&password=password01&gsm=' + data.recipientCell.replace(/\s/g, '') + '&msg=' + newmessage1, {
      //     method: "GET",
      //     mode: "no-cors"
      //   }).then(
      //     function(response) {
      //       if (response.status !== 200) {
      //         console.log('Looks like there was a problem. Status Code: ' +
      //           response.status + ' error: ' + response.text);
      //         return;
      //       }
      //       // Examine the text in the response
      //       response.json().then(function(data) {
      //         console.log(data);
      //       });
      //     }
      //   )
      //   .catch(function(err) {
      //     console.log('Fetch Error :-S', err);
      //   });

      //    await fetch('https://sms.contitouch.co.zw/api.json?cmd=sendwapp&username=contipay&password=password01&gsm=' + data.sender_cell.replace(/\s/g, '') + '&msg=' + newmessage2, {
      //     method: "GET",
      //     mode: "no-cors"
      //   }).then(
      //     function(response) {
      //       if (response.status !== 200) {
      //         console.log('Looks like there was a problem. Status Code: ' +
      //           response.status + ' error: ' + response.text);
      //         return;
      //       }
      //       // Examine the text in the response
      //       response.json().then(function(data) {
      //         console.log(data);
      //       });
      //     }
      //   )
      //   .catch(function(err) {
      //     console.log('Fetch Error :-S', err);
      //   });
      this.dialogTransactionSend = false;
    },
    async addsettlement() {
      if (this.annonimous) {
        this.transactionData.client_id = 70;
      } else {
        this.transactionData.client_id = this.clientID.id;
      }
      this.transactionData.branch_id = this.$session.get("user").userdetails.branch_id;
      this.transactionData.created_by = this.$session.get("user").userdetails.id;
      if (this.transaction_type == "Buy") {
        this.transactionData.transaction_type_id = 1;
      } else if (this.transaction_type == "Sell") {
        this.transactionData.transaction_type_id = 2;
      }
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      this.receive_symbol = this.transactionData.receive_currency_id.iso_code;
      this.disburse_symbol = this.transactionData.disburse_currency_id.iso_code;
      this.transactionData.receive_currency_id = this.transactionData.receive_currency_id.id;
      this.transactionData.disburse_currency_id = this.transactionData.disburse_currency_id.id;
      // if(this.transactionData.disburse_amount > 1000){
      //   this.transactionData.status = 6
      // }else{
      //   if (this.transactionData.disburse_currency_id == 272){
      //   this.transactionData.status = 5
      // }
      // if (this.transactionData.disburse_currency_id == 273){
      //   this.transactionData.status = 7
      // }
      // }
      var transID = 0;
      let transactionObject = {
        transaction: this.transactionData,
        floatincrease: {
          col: "amount",
          value: this.transactionData.receive_amount,
          wcol: "user_id",
          wvalue: this.transactionData.created_by,
          wcol2: "currency_id",
          wvalue2: this.transactionData.receive_currency_id,
        },
        floatdecrease: {
          col: "amount",
          value: this.transactionData.disburse_amount,
          wcol: "user_id",
          wvalue: this.transactionData.created_by,
          wcol2: "currency_id",
          wvalue2: this.transactionData.disburse_currency_id,
        },
      };
      await Axios.post(this.nodeApi + "/addTransactionBuySell", transactionObject, {
        headers: headers,
      }).subscribe(
        (res) => {
          // console.log(res.data)
          if (res.data.data.one.recordset) {
            this.dialogloader = false;
            // this.transactionData = this.transactionDataClear
            if (this.loyalty_client_id > 0) {
              //  console.log(this.loyalty_client_id)
              this.transactionID = res.data.data.three.recordset.insertId;
              this.finishTransactions(res.data.data.three.recordset.insertId);
              // this.loyaltyTransaction(
              //   this.transactionData.receive_amount,
              //   this.receive_symbol,
              //   this.disburse_symbol,
              //   res.data.data.three.recordset.insertId,
              //   this.transactionData.disburse_amount
              // );
            } else {
              //  console.log(this.loyalty_client_id)
              this.finishTransactions(res.data.data.three.recordset.insertId);
            }
          } else {
            this.dialogloader = false;
            this.$swal.fire({
              type: "error",
              title: "Transaction Adding Failed",
              text: res.data.message.message,
            });
          }
        },
        (err) => console.log(err)
      );
    },
    async getLoyaltyBal() {
      //console.log(this.loyalty_client_id)
      this.dialogloader = true;
      var date = new Date();
      let scope = this;
      let loyaltyObj = {
        currency: "USD",
        vasCentreId: "5",
        clientId: this.loyalty_client_id,
      };
      try {
        const response = await fetch(this.phpService + "/adminBalance", {
          mode: "cors",
          method: "POST",
          body: JSON.stringify({
            data: loyaltyObj,
          }), //{data:loyaltyObj}
          // headers: {
          //     'Content-Type': 'application/json',
          //     'Authorisation': 'TTBKeGFqZERhMHg2VjNodEt6Sm1ZMmxIUlVScVFUMDkxMjM0NTY3ODE1NzA3MTgzOTA=',
          //     'timestamp': Math.floor(date.getTime()/1000)
          // }
        });
        const json = await response.json();
        //console.log(json);
        if (json.status == "Error") {
          this.dialogloader = false;
          this.$swal.fire({
            type: "error",
            title: "Transaction Adding Failed",
            text: json.message,
          });
        }
        if (json.status == "Success" && json.code == 1) {
          this.dialogloader = false;
          this.$swal.fire({
            type: "success",
            title: "Client Balance Enquiry",
            text: "The Currenct Balance is : " + json.points + " Points", //json.message
          });
        }
      } catch (error) {
        this.dialogloader = false;
        console.error("Error:", error);
      }
    },
    finishTransactions(tran_id) {
      this.dialogloader = false;
      this.request_rate = "";
      this.managerList = [];
      // console.log(res.data.data.three.recordset[0].id)
      this.transactionID = tran_id;
      this.$swal.fire({
        type: "success",
        title: "Transaction Added",
        text: "Transaction was added successfully",
      });
      this.dialogTransaction = false;
      this.$emit("settlement", "complete");
    },
    finishTransactionsSend(tran_id) {
      this.dialogloader = false;
      this.request_rate = "";
      this.managerList = [];
      // console.log(res.data.data.three.recordset[0].id)
      this.transactionIDContiSend = tran_id;
      this.$swal.fire({
        type: "success",
        title: "Transaction Added",
        text: "Transaction was added successfully",
      });
      this.dialogTransactionSend = false;
      // this.$emit('settlement', 'complete')
      this.$emit("settlementSend", "complete");
    },
    async loyaltyTransaction(
      receive_amount,
      receive_symbol,
      disburse_symbol,
      tran_id,
      disburse_amount
    ) {
      var date = new Date();
      let scope = this;
      let loyaltyObj = {
        amount: receive_amount,
        currency: receive_symbol,
        clientId: this.loyalty_client_id,
        rate: this.transactionData.rate,
        description:
          "Currency exchange of  " +
          receive_symbol +
          " " +
          parseFloat(receive_amount).toFixed(2) +
          " for " +
          disburse_symbol +
          " " +
          parseFloat(disburse_amount).toFixed(2),
        vasCentreId: "5",
      };
      try {
        const response = await fetch(this.phpService + "/adminTransact", {
          mode: "cors",
          method: "POST",
          body: JSON.stringify({
            data: loyaltyObj,
          }), //{data:loyaltyObj}
          // headers: {
          //     'Content-Type': 'application/json',
          //     'Authorisation': 'TTBKeGFqZERhMHg2VjNodEt6Sm1ZMmxIUlVScVFUMDkxMjM0NTY3ODE1NzA3MTgzOTA=',
          //     'timestamp': Math.floor(date.getTime()/1000)
          // }
        });
        const json = await response.json();
        //console.log(json);
        if (json.status == "Error") {
          this.dialogTransaction = false;
          this.dialogloader = false;
          this.$swal.fire({
            type: "error",
            title: "Transaction Adding Failed",
            text: json.message,
          });
        }
        if (json.status == "Success" && json.code == 1) {
          this.dialogloader = false;
          this.request_rate = "";
          this.managerList = [];

          this.$swal.fire({
            type: "success",
            title: "Transaction Added",
            text: "Transaction was added successfully",
          });

          this.dialogTransaction = false;
          this.$emit("settlement", "complete");
        }
      } catch (error) {
        console.error("Error:", error);
        this.$swal.fire({
          type: "success",
          title: "Transaction Added - With Loyalty Error",
          text: "Transaction was added successfully but error : " + error,
        });
        this.$emit("settlement", "complete");
        this.dialogloader = false;
        this.dialogTransaction = false;
      }
    },
    async saveNewClient() {
      if (!this.editedClient.id_number) {
        this.$swal.fire("Client ID Error", "Please enter client ID.", "error");
      } else if (this.editedClient.id_number.length < 7) {
        this.$swal.fire("Client ID Error", "Please enter client ID.", "error");
      } else if (!this.isValidPhone) {
        this.$swal.fire("Phone Error", "Please enter a valid phone number.", "error");
      } else if (!this.editedClient.first_name || !this.editedClient.last_name) {
        this.$swal.fire("Name Error", "Please enter First Name and Last Name.", "error");
      } else if (!this.editedClient.date_of_birth) {
        this.$swal.fire("Email Error", "Please enter Date of birth.", "error");
      }
      // else if(!this.validateEmail(this.editedClient.email)){
      //    this.$swal.fire(
      //       'Email Error',
      //       'Please enter a valid email address.',
      //       'error'
      //     )
      //   }
      else {
        //console.log(this.editedClient)
        this.dialogUser = false;
        let headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$session.get("user").token,
        };
        this.editedClient.created_by = this.$session.get("user").userdetails.id;
        await Axios.post(this.nodeApi + "/addClients", this.editedClient, {
          headers: headers,
          timeout: 5000,
        }).subscribe(
          (res) => {
            try {
              if (res.data.data.one) {
                this.e11 = 1;
                this.editedClient = this.ClearUser;
                this.createTransaction2();
                this.dialogUser = false;
                this.$swal.fire({
                  type: "success",
                  title: "Client Added",
                  text: "Client was added successfully",
                });
              }
            } catch (error) {
              this.$swal.fire({
                type: "error",
                title: "Client Adding Failed",
                text: res.data.message.sqlMessage,
              });
            }
          },
          (err) => {
            this.editedClient = this.ClearUser;
            this.dialogloader = false;
            this.$swal.fire(
              "Client Adding",
              "Failed to add client account, probably because another client has the same email or phone number.",
              "error"
            );
          }
        );
      }
    },
    async saveNewClientCS() {
      if (!this.editedClient.id_number) {
        this.$swal.fire("Client ID Error", "Please enter client ID.", "error");
      } else if (this.editedClient.id_number.length < 7) {
        this.$swal.fire("Client ID Error", "Please enter client ID.", "error");
      } else if (!this.isValidPhone) {
        this.$swal.fire("Phone Error", "Please enter a valid phone number.", "error");
      } else if (!this.editedClient.first_name || !this.editedClient.last_name) {
        this.$swal.fire("Name Error", "Please enter First Name and Last Name.", "error");
      } else if (!this.editedClient.gender) {
        this.$swal.fire("Email Error", "Please enter Date of birth.", "error");
      }
      // else if(!this.validateEmail(this.editedClient.email)){
      //    this.$swal.fire(
      //       'Email Error',
      //       'Please enter a valid email address.',
      //       'error'
      //     )
      //   }
      else {
        //console.log(this.editedClient)
        this.dialogloader = true;
        let headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$session.get("user").token,
        };
        this.editedClient.created_by = this.$session.get("user").userdetails.id;
        var clientData = {
          firstName: this.editedClient.first_name,
          middleName: "-",
          lastName: this.editedClient.last_name,
          mobilePhone: this.editedClient.cell.replace(/\s/g, ""),
          email: this.editedClient.email,
          gender: this.editedClient.gender,
          countryCode: this.editedClient.countrycode,
          password: Date.now(),
          idNumber: this.editedClient.id_number,
          address: {
            addressLine1: this.editedClient.address,
            addressLine2: "",
            addressLine3: "",
            suburb: "",
            region: "",
            postalCode: "",
            city: "",
            state: "",
          },
        };
        // console.log(clientData);
        await Axios.post(this.nodeApi + "/addClientsCS", clientData, {
          headers: headers,
          timeout: 5000,
        }).subscribe(
          (res) => {
            if (res.data.status == "Success") {
              this.editedClient = this.ClearUser;
              this.dialogTransactionSend = true;
              this.dialogUserCS = false;
              this.dialogloader = false;
              this.sendSMSCreate(res.data);
            } else {
              this.dialogloader = false;
              // this.editedClient = this.ClearUser
              this.$swal.fire({
                type: "error",
                title: "Client Adding",
                text: res.data.message,
              });
            }
          },
          (err) => {
            // this.editedClient = this.ClearUser
            this.dialogloader = false;
            this.$swal.fire(
              "Client Adding",
              "Failed to add client account, probably because another client has the same email or phone number.",
              "error"
            );
          }
        );
      }
    },
    async gotToTransactionStepSend() {
      if (this.contisend.sendTypeData == "Send") {
        if (!this.contisend.clientID) {
          this.$swal.fire(
            "Client Error",
            "Please select a client or add new client.",
            "error"
          );
        } else if (!this.contisend.city_name) {
          this.$swal.fire(
            "Client Error",
            "Please select the city where the money is being sent.",
            "error"
          );
        } else if (!this.contisend.recipientFirstName) {
          this.$swal.fire(
            "Client Error",
            "Please enter a valid recipiant first name.",
            "error"
          );
        } else if (!this.contisend.recipientLastName) {
          this.$swal.fire(
            "Client Error",
            "Please enter a valid recipiant last name.",
            "error"
          );
        } else if (!this.contisend.recipientCell) {
          this.$swal.fire(
            "Client Error",
            "Please enter a valid recipiant phone number.",
            "error"
          );
        } else if (!this.contisend.recipientID) {
          this.$swal.fire(
            "Client Error",
            "Please enter a valid recipiant national id number.",
            "error"
          );
        } else {
          this.contisend.sender_name =
            this.contisend.clientID.firstName + " " + this.contisend.clientID.lastName;
          this.contisend.first_name = this.contisend.clientID.firstName;
          this.contisend.last_name = this.contisend.clientID.lastName;
          this.contisend.sender_cell = this.contisend.clientID.cell;

          this.contisend.clientID = this.contisend.clientID.nationalId;

          this.e1 = 3;
          console.log(this.contisend);
        }
      } else if (this.contisend.sendTypeData == "Booking") {
        if (this.contisend.city_name) {
          this.dialogloader = true;
          //this.contiBooking = null
          let headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.$session.get("user").token,
          };
          await Axios.post(
            this.nodeApi + "/contiSendAPICheckBooking",
            {
              refNumber: this.contisend.refNumber,
            },
            {
              headers: headers,
            }
          ).subscribe(
            (res) => {
              this.dialogloader = false;
              if (res.data.status == "Success") {
                this.contiBooking = res.data.booking;
                this.e1 = 4;
                this.contisend.sender_name = `${this.contiBooking.sender.firstName} ${this.contiBooking.sender.lastName}`;
                this.contisend.sender_id = this.contiBooking.sender.nationalId;
                this.contisend.recipientFirstName = this.contiBooking.recipient.firstName;
                this.contisend.recipientLastName = this.contiBooking.recipient.lastName;

                //console.log(res.data)
              } else {
                this.dialogloader = false;
                this.$swal.fire("Reference Error", res.data.message, "error");
              }
            },
            (err) => {
              this.dialogloader = false;
              this.$swal.fire("Reference Error", err, "error");
            }
          );
        } else {
          this.$swal.fire(
            "Reference Error",
            "Please select the city where the money is being sent.",
            "error"
          );
        }
      } else {
        if (!this.contisend.refNumber) {
          this.$swal.fire(
            "Client Error",
            "Please enter a valid reference number.",
            "error"
          );
        } else {
          this.checkContiSendRefWR(this.contisend.refNumber);
        }
      }
    },
    async checkContiSendRef(data, data2) {
      this.dialogloader = true;
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      await Axios.post(
        this.nodeApi + "/contiSendAPICheckRef",
        {
          reference: data,
        },
        {
          headers: headers,
        }
      ).subscribe(
        (res) => {
          this.dialogloader = false;
          if (res.data.data.one.recordset[0]) {
            this.contiPayout = res.data.data.one.recordset[0];
            this.contiPayout.first_name = data2.transaction.sender.firstName;
            this.contiPayout.last_name = data2.transaction.sender.lastName;
            this.contiPayout.id_number = data2.transaction.sender.nationalId;
            this.contiPayout.cell = data2.transaction.sender.mobilePhone;
            this.contiPayout.receive_amount =
              data2.transaction.transaction.beneficiaryAmount;
            this.e1 = 3;

            this.contisend.sender_name = `${data2.transaction.sender.firstName} ${data2.transaction.sender.lastName}`;
            this.contisend.recipientFirstName =
              res.data.data.one.recordset[0].recipientFirstName;
            this.contisend.recipientLastName =
              res.data.data.one.recordset[0].recipientLastName;
            //console.log(res.data)
          } else {
            this.dialogloader = false;
            // this.$swal.fire(
            //   "Reference Error",
            //   "Sorry but the reference you entered does not exit, please verify and try again.",
            //   "error"
            // );
            this.contiPayout.recipientFirstName = data2.transaction.recipient.firstName;
            this.contiPayout.recipientLastName = data2.transaction.recipient.lastName;
            this.contiPayout.recipientCell = data2.transaction.recipient.mobilePhone;
            this.contiPayout.recipientID = data2.transaction.recipient.nationalId;
            this.contiPayout.clientID = data2.transaction.recipient.nationalId;
            this.contiPayout.refNumber = data2.transaction.transaction.wrtId;

            this.contiPayout.transactionIndex = data2.transaction.transactionIndex;
            this.contiPayout.charge = data2.transaction.transaction.senderFees;
            this.contiPayout.receive_currency_id =
              data2.transaction.transaction.beneficiaryCurrency;
            this.contiPayout.symbol = data2.transaction.transaction.beneficiaryCurrency;
            this.contiPayout.ex = "out";

            this.contiPayout.first_name = data2.transaction.sender.firstName;
            this.contiPayout.last_name = data2.transaction.sender.lastName;
            this.contiPayout.id_number = data2.transaction.sender.nationalId;
            this.contiPayout.cell = data2.transaction.sender.mobilePhone;
            this.contiPayout.receive_amount =
              data2.transaction.transaction.beneficiaryAmount;
            this.e1 = 3;
          }
        },
        (err) => {
          this.dialogloader = false;
          this.$swal.fire("Check Error", err, "error");
        }
      );
    },
    async checkContiSendRefWR(data) {
      this.dialogloader = true;
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      await Axios.post(
        this.nodeApi + "/contiSendAPICheckRefWR",
        {
          refNumber: data,
        },
        {
          headers: headers,
        }
      ).subscribe(
        (res) => {
          if (res.data.status == "Success") {
            this.checkContiSendRef(data, res.data);
          } else {
            this.dialogloader = false;
            this.$swal.fire("Reference Error", res.data.message, "error");
          }
        },
        (err) => {
          this.dialogloader = false;
          this.$swal.fire("Check Error", err, "error");
        }
      );
    },
    gotToTransactionStep() {
      if (this.clientID == null) {
        this.$swal.fire(
          "Client Error",
          "Please select a client or add new client.",
          "error"
        );
      } else if (this.clientID) {
        this.annonimous = false;
        this.e1 = 2;
      } else if (!this.contisend.clientID.id) {
        this.$swal.fire(
          "Client Error",
          "Please select a client or add new client.",
          "error"
        );
      } else if (this.contisend.clientID.id) {
        this.contisend.clientID = this.contisend.clientID.id;

        this.e1 = 3;
        console.log(this.contisend);
      } else {
        this.$swal.fire(
          "Client Error",
          "Please select a client or add new client.",
          "error"
        );
      }
    },
    async getAllClients() {
      this.clientData = [];
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      // console.log(headers)
      await Axios.get(this.nodeApi + "/getAllClients", {
        headers: headers,
      }).subscribe(
        (res) => {
          this.clientData = res.data.data.one.recordset;
          //console.log(this.companyData)
        },
        (err) => console.log(err)
      );
    },
    async getUserFloat() {
      var float = [];
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      // console.log(headers)
      await Axios.post(
        this.nodeApi + "/getUserFloatByCol",
        {
          col: "user_id",
          value: this.$session.get("user").userdetails.id,
          col2: "currency_id",
          value2: this.transactionData.disburse_currency_id,
        },
        {
          headers: headers,
        }
      ).subscribe(
        (res) => {
          this.userFloat = res.data.data.one.recordset;
          //console.log(res.data.data.one.recordset)
        },
        (err) => console.log(err)
      );
    },

    async DeclineReference() {
      this.dialogloader = true;
      if (this.declineMessage.length > 5) {
        let headers = {
          "Content-Type": "application/json",
        };
        let body = {
          reference: this.worldremitRef,
          oid: Number(this.$session.get("user").userdetails.id),
          message: `Declined By ${this.$session.get("user").userdetails.username} from  ${
            this.$session.get("user").userdetails.branch_name
          }, Reason : ${this.declineMessage}`,
          transactionIndex: this.transactionIndex,
        };
        await Axios.post(
          this.nodeApi + "/unlockReference",
          { data: body },
          {
            headers: headers,
          }
        ).subscribe(
          (res) => {
            let temp = JSON.parse(res.data.message);
            //let temp2 = JSON.parse(temp.message)
            //console.log(temp)
            if (temp.status == "Success") {
              this.viewCheck = false;

              // console.log(res.data)
              this.dialogloader = false;
              this.dialogDeclineReference = false;
              this.dialogTransactionWorldRemit = false;
              this.$swal.fire({
                type: "success",
                title: "PayOut Unlocked Successful",
                text: "Your World-Remit PayOut Unlock Was successfully",
              });
              //  this.payWorldRemitTransaction()
              // console.log(res.data.message)
            } else {
              this.dialogloader = false;
              //console.log(res.data.message)
              this.$swal.fire("PayOut Unlock Error", temp.message, "error");
            }
          },
          (err) => {
            this.dialogloader = false;
            this.$swal.fire("PayOut Unlock Error", err, "error");
          }
        );
      } else {
        this.dialogloader = false;
        this.$swal.fire(
          "PayOut Unlock Error",
          "Please put a valid reason for declining this reference.",
          "error"
        );
      }
    },

    async DeclineReferenceCS() {
      this.dialogloader = true;
      if (this.declineMessage.length > 5) {
        let headers = {
          "Content-Type": "application/json",
        };
        let body = {
          reference: this.contiPayout.refNumber,
          oid: Number(this.$session.get("user").userdetails.id),
          message: `Declined By ${this.$session.get("user").userdetails.username} from  ${
            this.$session.get("user").userdetails.branch_name
          }, Reason : ${this.declineMessage}`,
          transactionIndex: this.contiPayout.transactionIndex,
        };
        await Axios.post(
          this.nodeApi + "/contiSendUnLock",
          { data: body },
          {
            headers: headers,
          }
        ).subscribe(
          (res) => {
            if (res.data.status == "Success") {
              this.dialogloader = false;
              this.dialogDeclineReferenceCS = false;
              this.dialogTransactionSend = false;
              this.$swal.fire({
                type: "success",
                title: "PayOut Unlocked Successful",
                text: "Your ContiSend PayOut Unlock Was successfully",
              });
            } else {
              this.dialogloader = false;
              //console.log(res.data.message)
              this.$swal.fire("PayOut Unlock Error", res.data.message, "error");
            }
          },
          (err) => {
            this.dialogloader = false;
            this.$swal.fire("PayOut Unlock Error", err, "error");
          }
        );
      } else {
        this.dialogloader = false;
        this.$swal.fire(
          "PayOut Unlock Error",
          "Please put a valid reason for unlocking this reference.",
          "error"
        );
      }
    },
    async CheckReference() {
      this.dialogloader = true;
      let headers = {
        "Content-Type": "application/json",
      };
      await Axios.post(
        this.nodeApi + "/checkReference",
        {
          reference: this.worldremitRef,
          oid: Number(this.$session.get("user").userdetails.id),
          description: `Checked By ${
            this.$session.get("user").userdetails.username
          } from  ${this.$session.get("user").userdetails.branch_name} Branch`,
        },
        {
          headers: headers,
        }
      ).subscribe(
        (res) => {
          this.dialogloader = false;

          let temp = JSON.parse(res.data.message);

          //  console.log(temp)
          if (temp.status == "Success") {
            this.viewCheck = true;
            this.searched = 1;
            //  console.log(res.data.message)
            this.sender = temp.transaction.sender;
            this.recipient = temp.transaction.recipient;
            this.transaction = temp.transaction.transaction;
            this.transactionIndex = temp.transaction.transactionIndex;
            this.transactionType = temp.transaction.transactionType;
            this.checkoid = temp.transaction.oid;
            // console.log(JSON.stringify(this.recipient).replace(/'/g, ''))
            this.getWorldRemit(this.transaction);
          } else {
            if (temp.code == 1) {
              this.viewCheck = true;
              this.searched = 2;
              //  console.log(res.data.message)
              this.sender = temp.transaction.sender;
              this.recipient = temp.transaction.recipient;
              this.transaction = temp.transaction.transaction;
              this.transactionIndex = temp.transaction.transactionIndex;
              this.transactionType = temp.transaction.transactionType;
              this.getWorldRemit(this.transaction);
            } else if (temp.code == 3) {
              //     this.sender = temp.transaction.sender
              // this.recipient = temp.transaction.recipient
              // this.transaction = temp.transaction.transaction
              // this.transactionIndex = temp.transaction.transactionIndex
              // this.transactionType = temp.transaction.transactionType
              this.checkReferenceAP(this.worldremitRef);
            } else if (temp.code == 4) {
              this.sender = temp.transaction.sender;
              this.recipient = temp.transaction.recipient;
              this.transaction = temp.transaction.transaction;
              this.transactionIndex = temp.transaction.transactionIndex;
              this.transactionType = temp.transaction.transactionType;
              this.checkoid = temp.transaction.oid;
              if (this.checkoid == this.$session.get("user").userdetails.id) {
                this.checkReferenceAP2(this.worldremitRef);
              } else {
                this.$swal.fire(
                  "Check Error",
                  "Sorry only the user who initiated this transaction can complete it.",
                  "error"
                );
              }
            } else {
              this.dialogloader = false;
              // console.log(res.data.message)
              this.postErrorWorldRemit();
              this.$swal.fire("Check Error", temp.message, "error");
            }
          }
        },
        (err) => {
          this.dialogloader = false;
          this.$swal.fire("Check Error", err, "error");
        }
      );
    },
    async checkReferenceAP(data) {
      // console.log(data)
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      await Axios.post(
        this.nodeApi + "/checkReferenceAP",
        {
          reference: data,
        },
        {
          headers: headers,
        }
      ).subscribe(
        (res) => {
          //  console.log(res.data.data.one.recordset)
          if (res.data.data.one.recordset.length > 0) {
            this.$swal.fire(
              "Check Error",
              `Reference ${data} is already paid and saved in the system.`,
              "error"
            );
          } else {
            this.$swal
              .fire({
                title: "Check Error",
                text: `World Remit has already recognized reference ${data} as paid but not saved in the system. Do you want to proceed to add it.`,
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, send it!",
              })
              .then((result) => {
                if (result.value) {
                  // this.$swal.fire(
                  // 'Submitted!',
                  // 'You reference has been submitted successfully.',
                  // 'success'
                  // )

                  this.getWorldRemitError(this.worldremitRef);
                }
              });
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    async checkReferenceAP2(data) {
      //console.log(data)
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      await Axios.post(
        this.nodeApi + "/checkReferenceAP",
        {
          reference: data,
        },
        {
          headers: headers,
        }
      ).subscribe(
        (res) => {
          //   console.log(res.data.data.one.recordset)
          if (res.data.data.one.recordset.length > 0) {
            this.$swal.fire(
              "Check Error",
              `Reference ${data} is already paid and saved in the system.`,
              "error"
            );
          } else {
            this.$swal
              .fire({
                title: "Check Error",
                text: `World Remit has already recognized reference ${data} as paid but not saved in the system. Do you want to proceed to add it.`,
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, send it!",
              })
              .then((result) => {
                if (result.value) {
                  this.viewCheck = true;
                  this.searched = 2;
                  this.needApproval = 1;

                  this.getWorldRemit(this.transaction);
                }
              });
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    async getWorldRemitError(data) {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      await Axios.post(
        this.nodeApi + "/getErrorWorldRemit",
        {
          reference: data,
        },
        {
          headers: headers,
        }
      ).subscribe(
        (res) => {
          if (res.data.data.one.recordset.length > 1) {
            this.sender = JSON.parse(res.data.data.one.recordset[0].senderData);
            //console.log(this.sender)
            this.recipient = JSON.parse(res.data.data.one.recordset[0].recipiantData);

            this.transaction = JSON.parse(res.data.data.one.recordset[0].transactionData);
            //  this.transactionIndex = temp.transaction.transactionIndex
            this.transactionType = "CASH PICKUP " + res.data.data.one.transactionType;
            // console.log(this.transaction)
            this.viewCheck = true;
            this.searched = 2;
            this.needApproval = 1;
          } else {
            //  this.viewCheck = true
            //       this.searched = 2
            //       this.needApproval = 1
            // this.getWorldRemit(this.transaction)
            this.$swal.fire(
              "Check Error",
              "Transaction is already paid by another service provider.",
              "error"
            );
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    async LockReference() {
      this.dialogloader = true;
      let headers = {
        "Content-Type": "application/json",
      };
      await Axios.post(
        this.nodeApi + "/lockReference",
        {
          reference: this.worldremitRef,
          description: `Checked By ${
            this.$session.get("user").userdetails.username
          } from  ${this.$session.get("user").userdetails.branch_name} Branch`,
          transactionIndex: this.transactionIndex,
          oid: Number(this.$session.get("user").userdetails.id),
        },
        {
          headers: headers,
        }
      ).subscribe(
        (res) => {
          this.dialogloader = false;
          let temp = JSON.parse(res.data.message);
          // let tempCode = JSON.parse(res.data.code)
          //console.log(temp)
          if (temp.status == "Success") {
            this.viewCheck = true;
            this.searched = 2;
            //  console.log(res.data.message)
            this.sender = temp.transaction.sender;
            this.recipient = temp.transaction.recipient;
            this.transaction = temp.transaction.transaction;
            this.transactionIndex = temp.transaction.transactionIndex;
            this.transactionType = temp.transaction.transactionType;
            this.getWorldRemit(this.transaction);
          } else {
            console.log(temp);
            if (temp.code == 1) {
              this.viewCheck = true;
              this.searched = 2;
              //  console.log(res.data.message)
              this.sender = temp.transaction.sender;
              this.recipient = temp.transaction.recipient;
              this.transaction = temp.transaction.transaction;
              this.transactionIndex = temp.transaction.transactionIndex;
              this.transactionType = temp.transaction.transactionType;
              this.getWorldRemit(this.transaction);
            } else if (temp.code == 3) {
              if (this.checkoid == this.$session.get("user").userdetails.id) {
                this.checkReferenceAP2(this.worldremitRef);
              } else {
                this.$swal.fire(
                  "Check Error",
                  "Sorry only the user who initiated this transaction can complete it.",
                  "error"
                );
              }
            } else {
              this.dialogloader = false;
              // console.log(res.data.message)
              this.postErrorWorldRemit();
              this.$swal.fire("Check Error", temp.message, "error");
            }
          }
        },
        (err) => {
          this.dialogloader = false;
          this.$swal.fire("Check Error", err, "error");
        }
      );
    },
    async postErrorWorldRemit() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      await Axios.post(
        this.nodeApi + "/postErrorWorldRemit",
        { currency: 1276, user_id: this.$session.get("user").userdetails.id },
        { headers: headers }
      ).subscribe(
        (res) => {
          // this.worldremitCurrency = res.data.data.one.recordset[0].id
          // this.worldremitCurrencyFloat = res.data.data.one.recordset[0].amount
          // console.log(res.data.data.one.rowsAffected.length)
        },
        (err) => {
          console.log(err);
        }
      );
    },
    async getWorldRemit(data) {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      await Axios.post(
        this.nodeApi + "/getWorldRemitCurrency",
        {
          currency: data.beneficiaryCurrency,
          user_id: this.$session.get("user").userdetails.id,
        },
        { headers: headers }
      ).subscribe(
        (res) => {
          this.worldremitCurrency = res.data.data.one.recordset[0].id;
          this.worldremitCurrencyFloat = res.data.data.one.recordset[0].amount;
          this.worldremitCurrencyError = res.data.data.one.recordset[0].worldremit;
          if (this.worldremitCurrencyError >= 100) {
            this.dialogTransactionWorldRemit = false;
            this.$swal.fire({
              type: "error",
              title: "WorldRemit PayOut Failed",
              text:
                "You have excided the number of error allowed today. Please contact your Manager for assistance.",
            });
          }
          //console.log(this.worldremitCurrencyFloat)
        },
        (err) => {
          console.log(err);
        }
      );
    },
    async ProcessReference() {
      this.disableButton = true;
      if (this.transaction.beneficiaryAmount > this.worldremitCurrencyFloat) {
        this.$swal.fire({
          type: "error",
          title: "WorldRemit PayOut Failed",
          text:
            "Insufficiant Float to finish this transaction. Please contact your Manager for assistance.",
        });
        this.disableButton = false;
      } else if (
        this.clientIDWorldRemit == "" ||
        this.clientDistrict == "" ||
        this.clientAddress == "" ||
        this.transactionPurpose == "" ||
        this.sourceFunds == "" ||
        this.clientGender == "" ||
        this.clientDistrict == ""
      ) {
        this.$swal.fire({
          type: "error",
          title: "WorldRemit PayOut Failed",
          text: "Please fill all empty fields to proceed.",
        });
        this.disableButton = false;
      } else {
        this.dialogloader = true;
        let dataOTP = {
          id: this.$session.get("user").userdetails.id,
          pin: this.pinWorldRemit,
        };
        let headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$session.get("user").token,
        };
        await Axios.post(this.nodeApi + "/checkPin", dataOTP, {
          headers: headers,
        }).subscribe(
          (res) => {
            //console.log(res.data.data.one.recordset)
            if (res.data.data.one.recordset.length != 0) {
              this.pinWorldRemit = "";
              this.ProcessReferenceFinal();
            } else {
              this.dialogloader = false;
              this.disableButton = false;
              this.$swal.fire({
                type: "error",
                title: "WorldRemit PayOut Failed",
                text: "Wrong Teller Pin please try again",
              });
            }
          },
          (err) => console.log(err)
        );
      }
    },
    async ProcessReferenceFinal() {
      let headers = {
        "Content-Type": "application/json",
      };
      console.log(this.needApproval);
      let body;
      if (this.needApproval > 0) {
        body = {
          reference: this.worldremitRef,
          validationCode: this.worldremitRefPin,
          nationalId: this.clientIDWorldRemit, //this.recipient.nationalId,
          idTypeCode: this.recipient.idTypeCode,
          paidAmount: this.transaction.beneficiaryAmount,
          paidCurrency: this.transaction.beneficiaryCurrency,
          transactionIndex: this.transactionIndex,
          needApproval: this.needApproval,
          oid: Number(this.$session.get("user").userdetails.id),
          description: `Paid By ${this.$session.get("user").userdetails.username} from  ${
            this.$session.get("user").userdetails.branch_name
          } Branch`,
        };
      } else {
        body = {
          reference: this.worldremitRef,
          validationCode: this.worldremitRefPin,
          nationalId: this.clientIDWorldRemit, //this.recipient.nationalId,
          idTypeCode: this.recipient.idTypeCode,
          paidAmount: this.transaction.beneficiaryAmount,
          paidCurrency: this.transaction.beneficiaryCurrency,
          transactionIndex: this.transactionIndex,
          oid: Number(this.$session.get("user").userdetails.id),
          description: `Paid By ${this.$session.get("user").userdetails.username} from  ${
            this.$session.get("user").userdetails.branch_name
          } Branch`,
        };
      }
      await Axios.post(
        this.nodeApi + "/ProcessReference",
        { data: body },
        {
          headers: headers,
        }
      ).subscribe(
        (res) => {
          // console.log(res.data.message)
          this.dialogloader = false;
          if (res.data.message.status == "Paid") {
            this.viewCheck = false;

            this.payWorldRemitTransaction(res.data);
            // console.log(res.data.message)
          } else {
            if (this.needApproval > 0) {
              this.viewCheck = false;

              this.payWorldRemitTransactionApprove(res.data);
            } else {
              if (res.data.message.code == 4) {
                this.viewCheck = false;

                this.payWorldRemitTransaction(res.data);
              } else {
                this.dialogloader = false;
                this.disableButton = false;
                //console.log(res.data.message)

                this.$swal.fire("PayOut Error", res.data.message.message, "error");
                this.payWorldRemitTransactionError(res.data);
              }
            }
          }
        },
        (err) => {
          this.dialogloader = false;
          this.disableButton = false;
          this.payWorldRemitTransactionError(err);
          this.$swal.fire("PayOut Error", err, "error");
        }
      );
    },
    async payWorldRemitTransactionApprove(data) {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      let worldremitRefData = this.worldremitRef;
      let additional = {
        clientID: this.clientIDWorldRemit,
        clientDistrict: this.clientDistrict,
        clientAddress: this.clientAddress,
        transactionPurpose: this.transactionPurpose,
        sourceFunds: this.sourceFunds,
        clientGender: this.clientGender,
        clientDistrict: this.clientDistrict,
      };
      let body = {
        reference: this.worldremitRef,
        apiRespone: JSON.stringify(data),
        additionalInfo: JSON.stringify(additional),
        transactionData: JSON.stringify(this.transaction),
        recipiantData: JSON.stringify(this.recipient).replace(/'/g, ""),
        senderData: JSON.stringify(this.sender).replace(/'/g, ""),
        payOut: this.transaction.beneficiaryAmount,
        payOutCurrency: this.worldremitCurrency,
        createdBy: this.$session.get("user").userdetails.id,
        branchID: this.$session.get("user").userdetails.branch_id,
        sentBy: JSON.stringify(
          `${this.sender.firstName} ${this.sender.middleName} ${this.sender.lastName}`
        ).replace(/'/g, ""),
        sentDate: `${this.transaction.wrtDateCreated}`,
        sentAmount: `${this.transaction.senderAmount}`,
        sentCurrency: `${this.transaction.senderCurrency}`,
        clientCurrency: `${this.transaction.beneficiaryCurrency}`,
        clientName: JSON.stringify(
          `${this.recipient.firstName} ${this.recipient.middleName} ${this.recipient.lastName}`
        ).replace(/'/g, ""),
        clientPhone: `${this.recipient.mobilePhone} `,
        commission: this.transaction.settlementCommission,
        transactionType: this.transactionType,
        needApproval: this.needApproval,
        fxRate: 0,
      };
      // console.log(body)
      await Axios.post(
        this.nodeApi + "/completeWorldRemitApprove",
        { data: body },
        { headers: headers }
      ).subscribe(
        (res) => {
          if (res.data.message) {
            this.$swal.fire(
              "PayOut Error",
              `Transaction ${this.worldremitRef} already paid!`,
              "error"
            );
            this.dialogTransactionWorldRemit = false;
          } else {
            // this.transactionIDWorldRemit = this.worldremitRef
            this.$swal.fire({
              type: "success",
              title: "Approval Sent",
              text: "Your World-Remit was successfully send for approval.",
            });
            this.dialogTransactionWorldRemit = false;
            // this.disableButton = false
            // this.$emit('settlement', 'complete')
            //this.dialogWorldRemit = true
            this.needApproval = 0;
          }

          // console.log(res)
        },
        (err) => {
          console.log(err);
        }
      );
    },
    async payWorldRemitTransaction(data) {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      let worldremitRefData = this.worldremitRef;
      let additional = {
        clientID: this.clientIDWorldRemit,
        clientDistrict: this.clientDistrict,
        clientAddress: this.clientAddress,
        transactionPurpose: this.transactionPurpose,
        sourceFunds: this.sourceFunds,
        clientGender: this.clientGender,
        clientDistrict: this.clientDistrict,
      };
      let body = {
        reference: this.worldremitRef,
        apiRespone: JSON.stringify(data),
        additionalInfo: JSON.stringify(additional),
        transactionData: JSON.stringify(this.transaction),
        recipiantData: JSON.stringify(this.recipient).replace(/'/g, ""),
        senderData: JSON.stringify(this.sender).replace(/'/g, ""),
        payOut: this.transaction.beneficiaryAmount,
        payOutCurrency: this.worldremitCurrency,
        createdBy: this.$session.get("user").userdetails.id,
        branchID: this.$session.get("user").userdetails.branch_id,
        sentBy: JSON.stringify(
          `${this.sender.firstName} ${this.sender.middleName} ${this.sender.lastName}`
        ).replace(/'/g, ""),
        sentDate: `${this.transaction.wrtDateCreated}`,
        sentAmount: `${this.transaction.senderAmount}`,
        sentCurrency: `${this.transaction.senderCurrency}`,
        clientCurrency: `${this.transaction.beneficiaryCurrency}`,
        clientName: JSON.stringify(
          `${this.recipient.firstName} ${this.recipient.middleName} ${this.recipient.lastName}`
        ).replace(/'/g, ""),
        clientPhone: `${this.recipient.mobilePhone} `,
        commission: this.transaction.settlementCommission,
        transactionType: this.transactionType,
        needApproval: this.needApproval,
        fxRate: 0,
      };
      // console.log(body)
      await Axios.post(
        this.nodeApi + "/completeWorldRemit",
        { data: body },
        { headers: headers }
      ).subscribe(
        (res) => {
          if (res.data.message) {
            this.$swal.fire(
              "PayOut Error",
              `Transaction ${this.worldremitRef} already paid!`,
              "error"
            );
            this.dialogTransactionWorldRemit = false;
          } else {
            this.transactionIDWorldRemit = this.worldremitRef;
            this.$swal.fire({
              type: "success",
              title: "PayOut Successful",
              text: "Your World-Remit PayOut Was successfully",
            });
            this.dialogTransactionWorldRemit = false;
            // this.disableButton = false
            this.$emit("settlement", "complete");
            //this.dialogWorldRemit = true
            this.needApproval = 0;
          }

          // console.log(res)
        },
        (err) => {
          console.log(err);
        }
      );
      var date = new Date();
      let rbzData = {
        bdxName: "Test Bureau",
        bdxBranch: "Newlands HQ",
        transactionDate: date.toISOString(),
        apiUsername: this.$session.get("user").userdetails.rbz_username,
        password: this.$session.get("user").userdetails.rbz_password,
        operatorName: `${this.$session.get("user").userdetails.username} from  ${
          this.$session.get("user").userdetails.branch_name
        } Branch`,
        senderName: `${this.sender.firstName} ${this.sender.middleName} ${this.sender.lastName}`,
        clientName: `${this.recipient.firstName} ${this.recipient.middleName} ${this.recipient.lastName}`,
        clientNationalId: this.clientIDWorldRemit,
        clientGender: this.clientGender,
        clientPhysicalAddress: {
          street: this.clientAddress,
        },
        district: this.clientDistrict,
        currencyCode: `${this.transaction.beneficiaryCurrency}`,
        sourceCountryCode: "",
        internationalPartnerCode: "WR",
        sourceCountryName: this.sender.countryName,
        internationalPartnerName: "World Remit",
        sourceOfFundsCode: this.sourceFunds,
        transactionPurposeCode: this.transactionPurpose,
        transferMode: "CASH",
        amount: this.transaction.beneficiaryAmount,
        originalReference: worldremitRefData,
      };

      await Axios.post(this.nodeApi + "/postRBZ", rbzData, {
        headers: headers,
      }).subscribe(
        (res) => {
          if (res.data.statusCode) {
            this.rbzTransactionUpdate(1, worldremitRefData);
          } else {
            this.rbzTransactionUpdate(2, worldremitRefData);
          }

          // console.log(res)
        },
        (err) => {
          console.log(err);
        }
      );
    },
    async rbzTransactionUpdate(data, ref) {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      await Axios.post(
        this.nodeApi + "/postRBZUpdater",
        { data: data, reference: ref },
        { headers: headers }
      ).subscribe(
        (res) => {
          console.log(res.data);
        },
        (err) => {
          console.log(err);
        }
      );
    },
    async payWorldRemitTransactionError(data) {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      let additional = {
        clientID: this.clientIDWorldRemit,
        clientDistrict: this.clientDistrict,
        clientAddress: this.clientAddress,
        transactionPurpose: this.transactionPurpose,
        sourceFunds: this.sourceFunds,
        clientGender: this.clientGender,
        clientDistrict: this.clientDistrict,
      };
      let body = {
        reference: this.worldremitRef,
        apiRespone: JSON.stringify(data),
        transactionData: JSON.stringify(this.transaction),

        additionalInfo: JSON.stringify(additional),

        recipiantData: JSON.stringify(this.recipient).replace(/\W/g, ""),
        senderData: JSON.stringify(this.sender).replace(/\W/g, ""),

        payOut: this.transaction.beneficiaryAmount,
        payOutCurrency: this.worldremitCurrency,
        createdBy: this.$session.get("user").userdetails.id,
        branchID: this.$session.get("user").userdetails.branch_id,
        sentBy: JSON.stringify(
          `${this.sender.firstName} ${this.sender.middleName} ${this.sender.lastName}`
        ).replace(/'/g, ""),
        sentDate: `${this.transaction.wrtDateCreated}`,
        sentAmount: `${this.transaction.senderAmount}`,
        sentCurrency: `${this.transaction.senderCurrency}`,
        clientCurrency: `${this.transaction.beneficiaryCurrency}`,
        clientName: JSON.stringify(
          `${this.recipient.firstName} ${this.recipient.middleName} ${this.recipient.lastName}`
        ).replace(/'/g, ""),
        clientPhone: `${this.recipient.mobilePhone} `,
        commission: this.transaction.settlementCommission,
        transactionType: "Error",
        fxRate: 0,
      };
      await Axios.post(
        this.nodeApi + "/completeWorldRemitError",
        { data: body },
        { headers: headers }
      ).subscribe(
        (res) => {
          if (res.data.message) {
            this.$swal.fire("PayOut Error", res.data.message, "error");
          } else {
            console.log(res.data);
            //   this.transactionIDWorldRemit = this.worldremitRef
            //   this.$swal.fire({
            //     type: 'success',
            //     title: 'PayOut Successful',
            //     text: 'Your World-Remit PayOut Was successfully'
            //   })
            //   this.dialogTransactionWorldRemit = false
            //  // this.disableButton = false
            //   this.$emit('settlement', 'complete')
            //    //this.dialogWorldRemit = true
          }

          // console.log(res)
        },
        (err) => {
          console.log(err);
        }
      );
    },
    createTransaction(transactionType) {
      if (transactionType == "WorldRemit") {
        this.dialogTransactionWorldRemit = true;
        this.transaction_type = transactionType;
        //this.getAllClients()
        this.getAllCurrenciesActive();
      } else if (transactionType == "Utility") {
        this.dialogTransactionUtility = true;
        this.transaction_type = transactionType;
        //this.getAllClients()
        this.getAllCurrenciesActive();
        this.getDSTvSelect();
        this.getDSTvCheck();
      } else if (transactionType == "ContiSend") {
        this.dialogTransactionSend = true;
        this.transaction_type = transactionType;
        //this.getAllClients()
        this.getAllCurrenciesActive();
      } else {
        this.dialogTransaction = true;
        this.transaction_type = transactionType;
        //this.getAllClients()
        this.getAllCurrenciesActive();
      }
    },
    createTransaction2() {
      if (!this.dialogTransactionSend) {
        this.dialogTransaction = true;
        //  this.getAllClients()
        this.getAllCurrenciesActive();
      }
    },
    saveTransaction() {
      //console.log(this.transactionData)
    },
    CurrencyPair(data) {
      this.$root.$emit("CurrencyPairSelected", data);
    },
  },
};
</script>
<style scoped>
.v-toolbar__title:not(:first-child) {
  margin-left: 20px;
  width: 400px;
}
.v-toolbar__content > *:first-child,
.v-toolbar__extension > *:first-child {
  margin-left: 0;
  width: 500px;
}
.image {
  width: 53px;
  height: 100%;
  margin: 3px;
}
.imageUtilityIcon {
  width: 100px;
  height: auto;
  margin: 3px;
}
.img1 {
  margin-top: 25px;
  margin-left: 25px;
  width: 80px;
  height: auto;
}
.img11 {
  margin-top: 8px;
  /* margin-left: 25px; */
  width: 130px;
  height: auto;
}
.imgUlt {
  margin-left: 25px;
  width: 50px;
  height: 50px;
}
.imgSend {
  margin-left: 25px;
  width: auto;
  height: 50px;
}
.imgUlt:hover {
  cursor: pointer;
  opacity: 0.5;
  -webkit-transform: scale3d(0.95, 0.95, 1);
  transform: scale3d(0.95, 0.95, 1);
}
.imgSend:hover {
  cursor: pointer;
  opacity: 0.5;
  -webkit-transform: scale3d(0.95, 0.95, 1);
  transform: scale3d(0.95, 0.95, 1);
}
.img1:hover {
  cursor: pointer;
  opacity: 0.5;
  -webkit-transform: scale3d(0.95, 0.95, 1);
  transform: scale3d(0.95, 0.95, 1);
}
.card {
  height: 60px;
}
.cardDstv {
  height: 40px;
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
.h4Rev {
  color: #23f523;
}
.gradient {
  background-image: url("bgtop2.png");
  background-repeat: repeat;

  /*background-image: linear-gradient(90deg, #020024 0%, #090979 35%, #00d4ff 100%);*/
}
.invoice-box {
  max-width: 800px;
  margin: auto;
  padding: 30px;
  border: 1px solid #eee;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 24px;
  font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
  color: #555;
}
.invoice-box table {
  width: 100%;
  line-height: inherit;
  text-align: left;
}
.invoice-box table td {
  padding: 5px;
  vertical-align: top;
}
.time {
  margin-top: 10px;
}
.invoice-box table tr td:nth-child(2) {
  text-align: right;
}
.invoice-box table tr.top table td {
  padding-bottom: 20px;
}
.invoice-box table tr.top table td.title {
  font-size: 45px;
  line-height: 45px;
  color: #333;
}
.invoice-box table tr.information table td {
  padding-bottom: 40px;
}
.invoice-box table tr.heading td {
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
}
.invoice-box table tr.details td {
  padding-bottom: 20px;
}
.invoice-box table tr.item td {
  border-bottom: 1px solid #eee;
}
.invoice-box table tr.item.last td {
  border-bottom: none;
}
.invoice-box table tr.total td:nth-child(2) {
  border-top: 2px solid #eee;
  font-weight: bold;
}
@media only screen and (max-width: 600px) {
  .invoice-box table tr.top table td {
    width: 100%;
    display: block;
    text-align: center;
  }
  .invoice-box table tr.information table td {
    width: 100%;
    display: block;
    text-align: center;
  }
}
/** RTL **/
.rtl {
  direction: rtl;
  font-family: Tahoma, "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
}
.rtl table {
  text-align: right;
}
.rtl table tr td:nth-child(2) {
  text-align: left;
}
</style>
