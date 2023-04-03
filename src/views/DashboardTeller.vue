<template>
  <div>
    <v-layout row wrap>
      <h2 style="color: grey; margin-top: 20px">
        Dashboard : Teller | Float & Transactions
      </h2>
      <v-btn-toggle
        mandatory
        v-model="toggleCurr"
        color="primary"
        style="margin-top: 15px; margin-left: 30px"
      >
        <v-btn :value="item.symbol" v-for="item in toggleCurrencies" :key="item.id">
          {{ item.symbol }}
        </v-btn>
      </v-btn-toggle>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm12 md6 lg3 pa-2 v-for="item in allRates" :key="item.id">
        <v-card hover>
          <v-flex mb-2 class="card cardRev3">
            <v-layout ma-1>
              <img :src="image + item.image" class="image" />
              <v-flex style="text-align: right; padding: 3px">
                <h2 style="color: green">Buy@ {{ item.buy_rate }}</h2>
                <h3 style="color: red">Sell@ {{ item.sell_rate }}</h3>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-end>
      <v-flex
        md2
        pa-2
        v-for="item in totalFloat"
        :key="item.id"
        @settlement="completeFuncton"
      >
        <v-card hover>
          <v-flex mb-2 class="card cardRev2">
            <v-layout ma-1>
              <img :src="image + item.image" class="image2" />
              <v-flex style="text-align: right; padding: 3px">
                <h2>{{ item.symbol }}</h2>
                <h3 class="h4Rev">{{ parseFloat(item.amount).toFixed(2) }}</h3>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-end>
      <v-btn-toggle
        mandatory
        v-model="tableType"
        color="primary"
        style="margin-top: 15px; margin-left: 30px"
      >
        <v-btn :value="item.symbol" v-for="item in tablesReports" :key="item.id">
          {{ item.type }}
        </v-btn>
      </v-btn-toggle>
      <v-spacer></v-spacer>
      <v-flex xs12 sm4 md4 pl-5>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search by anything"
          single-line
          hide-details
        ></v-text-field>
        <!-- <v-select
                    :items="authors"
                    label="Transaction Type"
                    @change="filterAuthor"
            ></v-select> -->
      </v-flex>

      <v-flex xs12 sm4 md2 ma-0>
        <!-- <v-layout> -->
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon @click="refresh">
              <v-icon v-on="on" color="gray">refresh</v-icon>
            </v-btn>
          </template>
          <span>Refresh Report</span>
        </v-tooltip>

        <!-- <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon @click="exportPdf">
                  <v-icon v-on="on" color="red darken-2">picture_as_pdf</v-icon>
                </v-btn>
              </template>
              <span>Export to pdf</span>
            </v-tooltip> -->

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon @click="exportExcel">
              <export-excel
                class="btn btn-default"
                :data="rows"
                :fields="json_fields"
                worksheet="Tran_Worksheet"
                name="TransactionsReport.xls"
              >
                <v-icon v-on="on" color="green darken-2">library_add</v-icon>
              </export-excel>
            </v-btn>
          </template>
          <span>Export to excel</span>
        </v-tooltip>

        <!-- </v-layout> -->
      </v-flex>
      <v-flex xs12 sm4 md4 ma-0>
        <v-btn color="primary" @click="handover"> Handover </v-btn>
        <!-- <v-btn color="error" @click="handoverTreasury"> Treasury Handover </v-btn> -->
      </v-flex>

      <v-flex xs12>
        <v-data-table
          :headers="paymentHeaders"
          :items="rows"
          item-key="tran_id"
          :pagination.sync="pagination"
          class="elevation-1"
          width="10"
          must-sort
          :search="search"
        >
          <template v-slot:items="props">
            <tr v-if="!props.item.transaction_type">
              <td>{{ props.item.refNumber }}</td>
              <td v-if="tableType == 4">
                {{ new Date(props.item.collect_at).toLocaleString("en-GB") }}
              </td>
              <td v-if="tableType != 4">
                {{ new Date(props.item.created_at).toLocaleString("en-GB") }}
              </td>

              <td>
                {{ props.item.recipientFirstName }} {{ props.item.recipientLastName }}
              </td>
              <td>
                {{ props.item.sender_first_name }} {{ props.item.sender_last_name }}
              </td>
              <td>
                {{ props.item.currency_symbol }}
                {{ parseFloat(props.item.receive_amount + props.item.charge).toFixed(2) }}
              </td>
              <td>{{ props.item.currency_symbol }} {{ props.item.disburse_amount }}</td>
            </tr>
            <tr v-if="props.item.transaction_type">
              <td v-if="tableType != 2">{{ props.item.id }}</td>
              <td v-if="tableType != 2">{{ props.item.created_at }}</td>
              <td v-if="tableType == 2">{{ props.item.reference }}</td>
              <td v-if="tableType == 2">{{ props.item.created_at }}</td>
              <td v-if="tableType == 2">{{ props.item.clientName }}</td>
              <td v-if="tableType == 2">{{ props.item.sentBy }}</td>
              <td v-if="tableType != 2">
                {{ props.item.first_name }} {{ props.item.last_name }}
              </td>
              <td v-if="tableType == 0">{{ parseFloat(props.item.rate).toFixed(1) }}</td>
              <td v-if="tableType == 1">{{ props.item.meter_number }}</td>
              <td>
                {{
                  props.item.receive_currency +
                  " " +
                  parseFloat(props.item.receive_amount).toFixed(2)
                }}
              </td>
              <td v-if="tableType == 0">
                {{
                  props.item.disburse_currency +
                  " " +
                  parseFloat(props.item.disburse_amount).toFixed(2)
                }}
              </td>
              <td v-if="tableType == 2">
                {{
                  props.item.disburse_currency +
                  " " +
                  parseFloat(props.item.disburse_amount).toFixed(2)
                }}
              </td>

              <td v-if="tableType == 1">
                {{ props.item.utility }}
                <v-chip
                  label
                  color="green"
                  text-color="white"
                  v-if="props.item.utility == 'DStv'"
                >
                  {{ props.item.product }}
                </v-chip>
              </td>

              <td>
                <v-chip
                  label
                  color="red"
                  text-color="white"
                  v-if="props.item.transaction_type.replace(/\s/g, '') == 'Sell'"
                >
                  {{ props.item.transaction_type }}
                </v-chip>
                <v-chip
                  label
                  color="green"
                  text-color="white"
                  v-if="props.item.transaction_type.replace(/\s/g, '') == 'Buy'"
                >
                  {{ props.item.transaction_type }}
                </v-chip>
                <v-chip
                  label
                  color="blue"
                  text-color="white"
                  v-if="props.item.transaction_type.replace(/\s/g, '') == 'FloatIn'"
                >
                  {{ props.item.transaction_type }}
                </v-chip>
                <v-chip
                  label
                  color="purple"
                  text-color="white"
                  v-if="props.item.transaction_type.replace(/\s/g, '') == 'FloatOut'"
                >
                  {{ props.item.transaction_type }}
                </v-chip>
                <v-chip
                  label
                  color="purple"
                  text-color="white"
                  v-if="props.item.transaction_type.replace(/\s/g, '') == 'Utility'"
                >
                  {{ props.item.transaction_type }}
                </v-chip>
                <v-chip
                  label
                  color="purple"
                  text-color="white"
                  v-if="props.item.transaction_type.replace(/\s/g, '') == 'WorldRemit'"
                >
                  {{ props.item.transaction_type }}
                </v-chip>
              </td>
              <td id="chip-usage-example">
                <v-chip label color="red" text-color="white" v-if="props.item.status.replace(/\s/g, '') == 'declined'">
                              {{ props.item.status }}
                            </v-chip>
                             <v-chip label color="gray" v-if="props.item.status.replace(/\s/g, '') == 'pending'">
                              {{ props.item.status }}
                            </v-chip>
                             <v-chip label color="red" text-color="white" v-if="props.item.status.replace(/\s/g, '') == 'reversed'">
                             reversed
                            </v-chip>
                            <v-chip label color="blue" text-color="white" v-if="props.item.status.replace(/\s/g, '') == 'complete'">
                              {{ props.item.status }}
                            </v-chip>
                            <v-chip label color="green" text-color="white" v-if="props.item.status.replace(/\s/g, '') == 'confirmed'">
                              {{ props.item.status }}
                            </v-chip>

                <!-- <v-chip pill color="gray"  v-if="props.item.status.replace(/\s/g, '') == 'GM'">
                              
                              <v-avatar
                                  left
                                  color="red"
                                >
                                  {{ props.item.status }}
                                </v-avatar>
                             pending
                            </v-chip> -->
                <!-- <v-chip color="gray" v-if="props.item.status.replace(/\s/g, '') == 'SP'">
                              <v-avatar
                                  left
                                  color="warning"
                                >
                                  {{ props.item.status }}
                                </v-avatar>
                             pending
                            </v-chip> -->
                <!-- <v-chip pill color="gray"  v-if="props.item.status.replace(/\s/g, '') == 'TR'">
                             <v-avatar
                                  left
                                  color="purple"
                                >
                                  {{ props.item.status }} 
                                </v-avatar> 
                                pending
                            </v-chip> -->
              </td>
            </tr>
          </template>
          <template v-slot:expand="props">
            <v-card flat>
              <v-card-text>{{ props.item.tran_description }}</v-card-text>
            </v-card>
          </template>
        </v-data-table>
      </v-flex>

      <v-dialog v-model="dialogHandOver" max-width="350px">
        <v-card>
          <v-card-title class="yellow darken-2 white--text">
            <span class="headline">End of day handover slip</span>
          </v-card-title>

          <div class="invoice-box rtl">
            <table cellpadding="0" cellspacing="0">
              <tr class="top">
                <td colspan="2">
                  <table>
                    <tr>
                      <td class="title">
                        <img
                          src="../assets/main_logo2.png"
                          alt="Nenyahsa FX"
                          style="width: 100%; max-width: 300px"
                        />
                      </td>
                    </tr>

                    <tr></tr>

                    <tr>
                      <td>
                        Handover Ticket #<br />
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
                        Zimbabwe
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr class="heading">
                <td>Teller ID</td>
                <td>Tran Type</td>
              </tr>

              <tr class="details">
                <td>
                  {{ this.$session.get("user").userdetails.username }}
                </td>

                <td>Banking</td>
              </tr>

              <tr class="heading">
                <td>Total Amount</td>

                <td>Item</td>
              </tr>

              <tr class="item" v-for="item in totalFloat" :key="item.id">
                <td>
                  {{ parseFloat(item.amount).toFixed(2) }}
                </td>

                <td>
                  {{ item.symbol }}
                </td>
              </tr>

              <tr class="item last">
                <td></td>
              </tr>
              <tr class="item last">
                <td>---------------------</td>
                <td>Teller</td>
              </tr>
              <tr class="item last">
                <td>----------------------</td>
                <td>Supervisor</td>
              </tr>
            </table>
          </div>

          <v-spacer></v-spacer>
          <v-btn color="red" class="white--text" @click="dialogHandOver = false"
            >Close</v-btn
          >

          <v-btn color="green" class="white--text" @click="finalHandOver">Bank</v-btn>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogHandOverT" max-width="400px">
        <v-card>
          <v-card-title class="red darken-2 white--text">
            <span class="headline">Treasury handover slip</span>
          </v-card-title>

          <div class="invoice-box rtl">
            <table cellpadding="0" cellspacing="0">
              <tr class="top">
                <td colspan="2">
                  <table>
                    <tr>
                      <td class="title">
                        <img
                          src="../assets/main_logo2.png"
                          alt="ContiCash FX"
                          style="width: 100%; max-width: 300px"
                        />
                      </td>
                    </tr>

                    <tr></tr>

                    <tr>
                      <td>
                        Handover Ticket #<br />
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
                        1st Floor, Block 3,Tendeseka Office Park<br />
                        Samora Machel, Harare<br />
                        Zimbabwe
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr class="heading">
                <td>Teller ID</td>
                <td>Tran Type</td>
              </tr>

              <tr class="details">
                <td>
                  {{ this.$session.get("user").userdetails.username }}
                </td>

                <td>Banking</td>
              </tr>

              <tr class="heading">
                <td>Total Amount</td>

                <td>Item</td>
              </tr>

              <tr class="item" v-for="item in totalFloat" :key="item.id">
                <td>
                  {{ parseFloat(item.amount).toFixed(2) }}
                </td>

                <td>
                  {{ item.symbol }}
                </td>
              </tr>

              <tr class="item last">
                <td></td>
              </tr>
              <tr class="item last">
                <td>---------------------</td>
                <td>Teller</td>
              </tr>
              <tr class="item last">
                <td>----------------------</td>
                <td>Supervisor</td>
              </tr>
            </table>
          </div>

          <v-spacer></v-spacer>
          <v-btn color="red" class="white--text" @click="dialogHandOverT = false"
            >Close</v-btn
          >

          <v-btn color="green" class="white--text" @click="finalHandOverT">Bank</v-btn>
        </v-card>
      </v-dialog>
    </v-layout>

    <v-dialog v-model="dialogHandOverP" max-width="350px">
      <div class="invoice-box rtl" id="PrintMe">
        <table cellpadding="0" cellspacing="0">
          <tr class="top">
            <td colspan="2">
              <table>
                <tr>
                  <td class="title" style="text-align: centre">
                    <img
                      src="../assets/main_logo2.png"
                      alt="Sahwira FX"
                      style="width: 100%; max-width: 300px"
                    />
                  </td>
                </tr>

                <tr></tr>

                <tr>
                  <td style="text-align: center; font-size: 12px">
                    Handover Ticket #<br /><br />
                    {{ time | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}<br />
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <br /><br />
          </tr>
          <tr class="information">
            <td colspan="2">
              <table>
                <tr>
                  <td style="text-align: center; font-size: 12px">
                    1st Floor, Block 3,Tendeseka Office Park<br />
                    Samora Machel, Harare<br />
                    Zimbabwe
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr class="item last">
            <td>
              <br />
            </td>
          </tr>
          <tr class="heading" style="font-weight: bold">
            <td>Tran Type</td>
            <td style="text-align: right; font-weight: bold">Teller ID</td>
          </tr>

          <tr class="details">
            <td>Banking</td>

            <td style="text-align: right">
              {{ this.$session.get("user").userdetails.username }}
            </td>
          </tr>

          <tr class="heading" style="font-weight: bold">
            <td>Item</td>

            <td style="text-align: right; font-weight: bold">Total Amount</td>
          </tr>

          <tr class="item" v-for="item in totalFloat" :key="item.id">
            <td>
              {{ item.symbol }}
            </td>

            <td style="text-align: right">
              {{ parseFloat(item.amount).toFixed(2) }}
            </td>
          </tr>

          <tr class="item last">
            <td><br /><br /></td>
          </tr>
          <tr class="item last">
            <td>Teller</td>
            <td>---------------------</td>
          </tr>
          <tr class="item last">
            <td>
              <br />
            </td>
          </tr>
          <tr class="item last">
            <td>Supervisor</td>
            <td>---------------------</td>
          </tr>
          <tr class="item last">
            <td>
              <br />
            </td>
          </tr>
        </table>
      </div>
    </v-dialog>

    <v-dialog v-model="dialoghandoverRequest" persistent max-width="400px">
      <v-card class="mx-auto">
        <v-card-title class="red darken-2 white--text">
          <span class="headline">Hand-Over Request</span>
        </v-card-title>

        <v-layout row wrap>
          <v-flex xs12 md12 pr-3 pl-3>
            <v-combobox
              v-model="managerData"
              :items="managerList"
              item-text="first_name"
              item-value="id"
              @keyup.enter="sendRequest"
              label="Select Supervisor"
            >
              <template slot="item" slot-scope="data">
                {{ data.item.first_name }} {{ data.item.last_name }}
              </template>
            </v-combobox>
          </v-flex>
        </v-layout>
        <v-spacer></v-spacer>
        <v-btn color="red" class="white--text" @click="dialoghandoverRequest = false"
          >Close</v-btn
        >
        <v-btn color="green" class="white--text" @click="sendRequest">Save</v-btn>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialoghandoverConfirm" persistent max-width="400px">
      <v-card class="mx-auto">
        <v-card-title class="green darken-2 white--text">
          <span class="headline">Hand-Over Confirm</span>
        </v-card-title>

        <v-layout>
          <v-flex xs12 pa-3>
            <v-text-field
              style="text-align: center"
              @keyup.enter="confirmHandOver"
              v-model="overridePinT"
              autofocus
              loading
              type="password"
              label="Please enter over-ride pin"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-spacer></v-spacer>
        <v-btn color="red" class="white--text" @click="dialoghandoverConfirm = false"
          >Close</v-btn
        >
        <v-btn color="green" class="white--text" @click="confirmHandOver">Save</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import * as jsPDF from "jspdf";
import * as autoTable from "jspdf-autotable";
import Axios from "axios-observable";
import VScrollin from "vue-scrollin";
export default {
  props: ["PropData", "PropSymbol", "ProCharge", "PropCentre", "PropCurrency"],
  data: () => ({
    allRates: [],
    totalFloat: [],
    expand: false,
    show_start_date: false,
    //nodeApi: '',
    nodeApi: "",
    image: "/img/",
    //image: 'https://localhost/img/',
    start_date: null,
    is_charged: null,
    toggleCurrencies: [],
    whatsappNumbers: [],
    tablesReports: [
      { type: "Currencies" },
      // { type: "Utilities" },
      // { type: "WorldRemit" },
      // { type: "ContiSendIn" },
      // { type: "ContiSendOut" },
    ],
    toggleCurr: "",
    tableType: "",
    dialoghandoverRequest: false,
    dialoghandoverConfirm: false,
    dialogHandOver: false,
    dialogHandOverP: false,
    dialogHandOverT: false,
    show_end_date: false,
    end_date: null,
    time: 0,
    user_type: 0,
    center_id: "",
    centreCurrency: "",
    rowsFilter: [],
    search: "",
    filters: {
      search: "",
      added_by: "",
      start_date: null,
      end_date: null,
    },
    authors: ["Buy", "Sell"],
    pagination: {
      sortBy: "id",
      descending: true,
      rowsPerPage: 15,
    },
    selected: [],
    filteredRow: [],
    symbol: "",
    managerList: [],
    managerData: "",
    overridePinT: "",
    overridePinM: "",
    superviser_id: 0,

    //Excel data

    json_fields: {
      "Transaction ID": "id",
      "Transaction Date Time": "created_at",
      "Transaction Type": "transaction_type",

      "Client First Name": "first_name",
      "Client Last Name": "last_name",
      "Client ID Number": "id_number",

      "Receive Currency": "receive_currency",
      "Receive Amount": "receive_amount",
      "Disbursed Currency": "disburse_currency",
      "Disburse Amount": "disburse_amount",
      Rate: "rate",

      "Transaction Status": "status",
      "Created By": "created_by",
      "Branch Name": "name",

      _____________: "space",

      "Transaction Total Type": "transaction_typeT",
      "Received Currency": "receive_currencyT",
      "Total Received Amount": "receive_amountT",
      "Disburse Currency": "disbursed_currencyT",
      "Total Disbursed Amount": "disburse_amountT",
    },
    json_data: [],
    json_meta: [
      [
        {
          key: "charset",
          value: "utf-8",
        },
      ],
    ],
    //End of excel data

    rows: [],
    paymentHeaders: [],
  }),
  watch: {
    toggleCurr(val) {
      // console.log(val)
      this.getAllRates(val);
    },
    tableType(val) {
      //console.log(val)
      if (val == 0) {
        this.getAllTransactions();
        this.paymentHeaders = [
          {
            text: "Tran Ref",
            value: "id",
          },
          {
            text: "Tran Date",

            value: "created_at",
          },
          {
            text: "Client",
            value: "first_name",
          },
          {
            text: "Rate Cost",
            value: "rate",
          },
          {
            text: "Received Amount $",
            value: "receive_amount",
          },
          {
            text: "Disbursed Amount $",
            value: "disburse_amount",
          },

          {
            text: "Transaction Type",
            value: "transaction_type",
          },

          {
            text: "Status",
            value: "status",
          },
        ];
      }
      if (val == 1) {
        this.paymentHeaders = [
          {
            text: "Tran Ref",
            value: "id",
          },
          {
            text: "Tran Date",

            value: "created_at",
          },
          {
            text: "Client",
            value: "first_name",
          },
          {
            text: "Meter Number",
            value: "meter_number",
          },
          {
            text: "Received Amount $",
            value: "receive_amount",
          },
          {
            text: "Utility Name $",
            value: "utility",
          },

          {
            text: "Transaction Type",
            value: "transaction_type",
          },

          {
            text: "Status",
            value: "status",
          },
        ];
        this.getAllTransactionsUtility();
      }
      if (val == 2) {
        this.paymentHeaders = [
          {
            text: "Tran Ref",
            value: "reference",
          },
          {
            text: "Tran Date",

            value: "created_at",
          },
          {
            text: "Client",
            value: "first_name",
          },
          {
            text: "Sent By",
            value: "sentBy",
          },
          {
            text: "Received Amount $",
            value: "receive_amount",
          },
          {
            text: "Disbursed Amount $",
            value: "disburse_amount",
          },

          {
            text: "Transaction Type",
            value: "transaction_type",
          },

          {
            text: "Status",
            value: "status",
          },
        ];
        this.getAllTransactionsWorldRemit();
      }

      if (val == 3) {
        this.paymentHeaders = [
          {
            text: "Tran Ref",
            value: "reference",
          },
          {
            text: "Tran Date",

            value: "created_at",
          },
          {
            text: "Client",
            value: "first_name",
          },
          {
            text: "Sent By",
            value: "sentBy",
          },
          {
            text: "Received Amount $",
            value: "receive_amount",
          },
          {
            text: "Disbursed Amount $",
            value: "disburse_amount",
          },
        ];
        this.getAllTransactionsContiSendIn();
      }

      if (val == 4) {
        this.paymentHeaders = [
          {
            text: "Tran Ref",
            value: "reference",
          },
          {
            text: "Tran Date",

            value: "created_at",
          },
          {
            text: "Client",
            value: "first_name",
          },
          {
            text: "Sent By",
            value: "sentBy",
          },
          {
            text: "Received Amount $",
            value: "receive_amount",
          },
          {
            text: "Disbursed Amount $",
            value: "disburse_amount",
          },
        ];
        this.getAllTransactionsContiSendOut();
      }
    },
    rowsFilter(val) {
      // console.log(val)
    },
    customFilter(val) {
      //console.log(val)
    },
    rows(val) {
      //console.log(val)
    },
    filters(val) {
      //console.log(val)
    },
  },
  beforeMount() {},
  components: {
    "v-scrollin": VScrollin,
  },
  computed: {},
  mounted() {
    this.toggleCurr = "USD";
    this.tableType = 0;
    this.getAllRates(this.toggleCurr);
    this.user_type = this.$session.get("user").userdetails.user_type;
    this.getAllUserFloats();
    this.getAllTransactions();
    this.getAllToggleCurrencies();
  },
  methods: {
    async getAllToggleCurrencies() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      // console.log(headers)
      await Axios.get(this.nodeApi + "/getAllToggleCurrencies", {
        headers: headers,
      }).subscribe(
        (res) => {
          this.toggleCurrencies = res.data.data.one.recordset;

          //console.log(this.allRates)
        },
        (err) => console.log(err)
      );
    },
    async getSupervisor() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      await Axios.post(
        this.nodeApi + "/getSupervisor",
        { value: this.$session.get("user").userdetails.branch_id },
        { headers: headers }
      ).subscribe(
        (res) => {
          this.managerList = res.data.data.one.recordset;
        },
        (err) => console.log(err)
      );
    },

    async getSuperSupervisor() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      await Axios.post(
        this.nodeApi + "/getSuperSupervisor",
        { value: this.$session.get("user").userdetails.branch_id },
        { headers: headers }
      ).subscribe(
        (res) => {
          this.managerList = res.data.data.one.recordset;
        },
        (err) => console.log(err)
      );
    },

    async confirmHandOver() {
      // if (this.overridePinM == this.overridePinT) {
      //   this.printPDF("PrintMe");
      //   this.dialogHandOver = false;
      //   this.overrideConfirm = false;
      //   this.dialoghandoverConfirm = false;
      //   var dataArrray = [];
      //   var tellertotellerData = {
      //     amount: 0,
      //     branch_id: this.$session.get("user").userdetails.branch_id,
      //     user_id: this.$session.get("user").userdetails.id,
      //     currency_id: null,
      //     handover_type: 4,
      //     created_by: this.$session.get("user").userdetails.id,
      //   };

      //   this.tellertobranch();
      // } else {
      //   this.$swal.fire(
      //     "Over-Ride Error",
      //     "Sorry the pin enterd is wrong please try again or contact Branch Supervisor.",
      //     "error"
      //   );
      // }
      this.dialogloader = true;
      let dataOTP = {
        id: this.superviser_id,
        pin: this.overridePinT,
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
            this.overridePinT = "";
            this.printPDF("PrintMe");
            this.dialogHandOver = false;
            this.overrideConfirm = false;
            this.dialoghandoverConfirm = false;
            var dataArrray = [];

            var tellertotellerData = {
              amount: 0,
              branch_id: this.$session.get("user").userdetails.branch_id,
              user_id: this.$session.get("user").userdetails.id,
              currency_id: null,
              handover_type: 4,
              created_by: this.$session.get("user").userdetails.id,
            };
            this.tellertobranch();
          } else {
            this.dialogloader = false;
            this.$swal.fire({
              type: "error",
              title: "Float Handover Failed",
              text: "Wrong pin please try again",
            });
          }
        },
        (err) => console.log(err)
      );
    },
    async tellertobranch() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      console.log(this.totalFloat);
      var n = Date.now();
      var check = 0;

      if (this.totalFloat[0]) {
        this.totalFloat[0].handover_id = n;
        let currency = this.totalFloat[0].iso_code;
        await Axios.post(
          this.nodeApi + "/updateTellerToBranchFloatHandOver2",
          this.totalFloat[0],
          { headers: headers }
        ).subscribe(
          (res) => {
            if (res.data.message) {
              console.log("Error for " + currency + " Message : " + res.data.message);
              check += 1;
            }
          },
          (err) => console.log(err)
        );
      }
      if (this.totalFloat[1]) {
        this.totalFloat[1].handover_id = n;
        let currency = this.totalFloat[0].iso_code;
        await Axios.post(
          this.nodeApi + "/updateTellerToBranchFloatHandOver2",
          this.totalFloat[1],
          { headers: headers }
        ).subscribe(
          (res) => {
            if (res.data.message) {
              console.log("Error for " + currency + " Message : " + res.data.message);
              check += 1;
            }
          },
          (err) => console.log(err)
        );
      }
      if (this.totalFloat[2]) {
        this.totalFloat[2].handover_id = n;
        let currency = this.totalFloat[0].iso_code;
        await Axios.post(
          this.nodeApi + "/updateTellerToBranchFloatHandOver2",
          this.totalFloat[2],
          { headers: headers }
        ).subscribe(
          (res) => {
            if (res.data.message) {
              console.log("Error for " + currency + " Message : " + res.data.message);
              check += 1;
            }
          },
          (err) => console.log(err)
        );
      }
      if (this.totalFloat[3]) {
        this.totalFloat[3].handover_id = n;
        let currency = this.totalFloat[0].iso_code;
        await Axios.post(
          this.nodeApi + "/updateTellerToBranchFloatHandOver2",
          this.totalFloat[3],
          { headers: headers }
        ).subscribe(
          (res) => {
            if (res.data.message) {
              console.log("Error for " + currency + " Message : " + res.data.message);
              check += 1;
            }
          },
          (err) => console.log(err)
        );
      }
      if (this.totalFloat[4]) {
        this.totalFloat[4].handover_id = n;
        let currency = this.totalFloat[0].iso_code;
        await Axios.post(
          this.nodeApi + "/updateTellerToBranchFloatHandOver2",
          this.totalFloat[4],
          { headers: headers }
        ).subscribe(
          (res) => {
            if (res.data.message) {
              console.log("Error for " + currency + " Message : " + res.data.message);
              check += 1;
            }
          },
          (err) => console.log(err)
        );
      }
      if (this.totalFloat[5]) {
        this.totalFloat[5].handover_id = n;
        let currency = this.totalFloat[0].iso_code;
        await Axios.post(
          this.nodeApi + "/updateTellerToBranchFloatHandOver2",
          this.totalFloat[5],
          { headers: headers }
        ).subscribe(
          (res) => {
            if (res.data.message) {
              console.log("Error for " + currency + " Message : " + res.data.message);
              check += 1;
            }
          },
          (err) => console.log(err)
        );
      }
      if (this.totalFloat[6]) {
        this.totalFloat[6].handover_id = n;
        let currency = this.totalFloat[0].iso_code;
        await Axios.post(
          this.nodeApi + "/updateTellerToBranchFloatHandOver2",
          this.totalFloat[6],
          { headers: headers }
        ).subscribe(
          (res) => {
            if (res.data.message) {
              console.log("Error for " + currency + " Message : " + res.data.message);
              check += 1;
            }
          },
          (err) => console.log(err)
        );
      }

      if (this.totalFloat[7]) {
        this.totalFloat[7].handover_id = n;
        let currency = this.totalFloat[0].iso_code;
        await Axios.post(
          this.nodeApi + "/updateTellerToBranchFloatHandOver2",
          this.totalFloat[7],
          { headers: headers }
        ).subscribe(
          (res) => {
            if (res.data.message) {
              console.log("Error for " + currency + " Message : " + res.data.message);
              check += 1;
            }
          },
          (err) => console.log(err)
        );
      }

      if (this.totalFloat[8]) {
        this.totalFloat[8].handover_id = n;
        let currency = this.totalFloat[0].iso_code;
        await Axios.post(
          this.nodeApi + "/updateTellerToBranchFloatHandOver2",
          this.totalFloat[8],
          { headers: headers }
        ).subscribe(
          (res) => {
            if (res.data.message) {
              console.log("Error for " + currency + " Message : " + res.data.message);
              check += 1;
            }
          },
          (err) => console.log(err)
        );
      }

      if (this.totalFloat[9]) {
        this.totalFloat[9].handover_id = n;
        let currency = this.totalFloat[0].iso_code;
        await Axios.post(
          this.nodeApi + "/updateTellerToBranchFloatHandOver2",
          this.totalFloat[9],
          { headers: headers }
        ).subscribe(
          (res) => {
            if (res.data.message) {
              console.log("Error for " + currency + " Message : " + res.data.message);
              check += 1;
            }
          },
          (err) => console.log(err)
        );
      }

      if (this.totalFloat[10]) {
        this.totalFloat[10].handover_id = n;
        let currency = this.totalFloat[0].iso_code;
        await Axios.post(
          this.nodeApi + "/updateTellerToBranchFloatHandOver2",
          this.totalFloat[10],
          { headers: headers }
        ).subscribe(
          (res) => {
            if (res.data.message) {
              console.log("Error for " + currency + " Message : " + res.data.message);
              check += 1;
            }
          },
          (err) => console.log(err)
        );
      }

      if (this.totalFloat[11]) {
        this.totalFloat[11].handover_id = n;
        let currency = this.totalFloat[0].iso_code;
        await Axios.post(
          this.nodeApi + "/updateTellerToBranchFloatHandOver2",
          this.totalFloat[11],
          { headers: headers }
        ).subscribe(
          (res) => {
            if (res.data.message) {
              console.log("Error for " + currency + " Message : " + res.data.message);
              check += 1;
            }
          },
          (err) => console.log(err)
        );
      }

      if (this.totalFloat[12]) {
        this.totalFloat[12].handover_id = n;
        let currency = this.totalFloat[0].iso_code;
        await Axios.post(
          this.nodeApi + "/updateTellerToBranchFloatHandOver2",
          this.totalFloat[12],
          { headers: headers }
        ).subscribe(
          (res) => {
            if (res.data.message) {
              console.log("Error for " + currency + " Message : " + res.data.message);
              check += 1;
            }
          },
          (err) => console.log(err)
        );
      }

      await this.clearTransfer();
    },
    async tellertobranchT() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      console.log(this.totalFloat);
      var n = Date.now();
      var check = 0;

      if (this.totalFloat[0]) {
        this.totalFloat[0].handover_id = n;
        let currency = this.totalFloat[0].iso_code;
        this.totalFloat[0].to_branch_id = "1";
        this.totalFloat[0].to_user_id = "210";
        this.totalFloat[0].from_branch_id = this.$session.get(
          "user"
        ).userdetails.branch_id;
        this.totalFloat[0].from_user_id = this.$session.get("user").userdetails.id;
        this.totalFloat[0].created_by = this.$session.get("user").userdetails.id;
        this.totalFloat[0].approvalStatus = 14;
        if (this.totalFloat[0].amount > 0) {
          await Axios.post(this.nodeApi + "/addTreasuryToTeller", this.totalFloat[0], {
            headers: headers,
          }).subscribe(
            (res) => {
              if (res.data.message) {
                console.log("Error for " + currency + " Message : " + res.data.message);
                check += 1;
              }
            },
            (err) => console.log(err)
          );
        }
      }
      if (this.totalFloat[1]) {
        this.totalFloat[1].handover_id = n;
        let currency = this.totalFloat[1].iso_code;
        this.totalFloat[1].to_branch_id = "1";
        this.totalFloat[1].to_user_id = "210";
        this.totalFloat[1].from_branch_id = this.$session.get(
          "user"
        ).userdetails.branch_id;
        this.totalFloat[1].from_user_id = this.$session.get("user").userdetails.id;
        this.totalFloat[1].created_by = this.$session.get("user").userdetails.id;
        this.totalFloat[1].approvalStatus = 14;
        if (this.totalFloat[1].amount > 0) {
          await Axios.post(this.nodeApi + "/addTreasuryToTeller", this.totalFloat[1], {
            headers: headers,
          }).subscribe(
            (res) => {
              if (res.data.message) {
                console.log("Error for " + currency + " Message : " + res.data.message);
                check += 1;
              }
            },
            (err) => console.log(err)
          );
        }
      }
      if (this.totalFloat[2]) {
        this.totalFloat[2].handover_id = n;
        let currency = this.totalFloat[2].iso_code;
        this.totalFloat[2].to_branch_id = "1";
        this.totalFloat[2].to_user_id = "210";
        this.totalFloat[2].from_branch_id = this.$session.get(
          "user"
        ).userdetails.branch_id;
        this.totalFloat[2].from_user_id = this.$session.get("user").userdetails.id;
        this.totalFloat[2].created_by = this.$session.get("user").userdetails.id;
        this.totalFloat[2].approvalStatus = 14;
        if (this.totalFloat[2].amount > 0) {
          await Axios.post(this.nodeApi + "/addTreasuryToTeller", this.totalFloat[2], {
            headers: headers,
          }).subscribe(
            (res) => {
              if (res.data.message) {
                console.log("Error for " + currency + " Message : " + res.data.message);
                check += 1;
              }
            },
            (err) => console.log(err)
          );
        }
      }
      if (this.totalFloat[3]) {
        this.totalFloat[3].handover_id = n;
        let currency = this.totalFloat[3].iso_code;
        this.totalFloat[3].to_branch_id = "1";
        this.totalFloat[3].to_user_id = "210";
        this.totalFloat[3].from_branch_id = this.$session.get(
          "user"
        ).userdetails.branch_id;
        this.totalFloat[3].from_user_id = this.$session.get("user").userdetails.id;
        this.totalFloat[3].created_by = this.$session.get("user").userdetails.id;
        this.totalFloat[3].approvalStatus = 14;
        if (this.totalFloat[3].amount > 0) {
          await Axios.post(this.nodeApi + "/addTreasuryToTeller", this.totalFloat[3], {
            headers: headers,
          }).subscribe(
            (res) => {
              if (res.data.message) {
                console.log("Error for " + currency + " Message : " + res.data.message);
                check += 1;
              }
            },
            (err) => console.log(err)
          );
        }
      }
      if (this.totalFloat[4]) {
        this.totalFloat[4].handover_id = n;
        let currency = this.totalFloat[4].iso_code;
        this.totalFloat[4].to_branch_id = "1";
        this.totalFloat[4].to_user_id = "210";
        this.totalFloat[4].from_branch_id = this.$session.get(
          "user"
        ).userdetails.branch_id;
        this.totalFloat[4].from_user_id = this.$session.get("user").userdetails.id;
        this.totalFloat[4].created_by = this.$session.get("user").userdetails.id;
        this.totalFloat[4].approvalStatus = 14;
        if (this.totalFloat[4].amount > 0) {
          await Axios.post(this.nodeApi + "/addTreasuryToTeller", this.totalFloat[4], {
            headers: headers,
          }).subscribe(
            (res) => {
              if (res.data.message) {
                console.log("Error for " + currency + " Message : " + res.data.message);
                check += 1;
              }
            },
            (err) => console.log(err)
          );
        }
      }
      if (this.totalFloat[5]) {
        this.totalFloat[5].handover_id = n;
        let currency = this.totalFloat[5].iso_code;
        this.totalFloat[5].to_branch_id = "1";
        this.totalFloat[5].to_user_id = "210";
        this.totalFloat[5].from_branch_id = this.$session.get(
          "user"
        ).userdetails.branch_id;
        this.totalFloat[5].from_user_id = this.$session.get("user").userdetails.id;
        this.totalFloat[5].created_by = this.$session.get("user").userdetails.id;
        this.totalFloat[5].approvalStatus = 14;
        if (this.totalFloat[5].amount > 0) {
          await Axios.post(this.nodeApi + "/addTreasuryToTeller", this.totalFloat[5], {
            headers: headers,
          }).subscribe(
            (res) => {
              if (res.data.message) {
                console.log("Error for " + currency + " Message : " + res.data.message);
                check += 1;
              }
            },
            (err) => console.log(err)
          );
        }
      }
      if (this.totalFloat[6]) {
        this.totalFloat[6].handover_id = n;
        let currency = this.totalFloat[6].iso_code;
        this.totalFloat[6].to_branch_id = "1";
        this.totalFloat[6].to_user_id = "210";
        this.totalFloat[6].from_branch_id = this.$session.get(
          "user"
        ).userdetails.branch_id;
        this.totalFloat[6].from_user_id = this.$session.get("user").userdetails.id;
        this.totalFloat[6].created_by = this.$session.get("user").userdetails.id;
        this.totalFloat[6].approvalStatus = 14;
        if (this.totalFloat[6].amount > 0) {
          await Axios.post(this.nodeApi + "/addTreasuryToTeller", this.totalFloat[6], {
            headers: headers,
          }).subscribe(
            (res) => {
              if (res.data.message) {
                console.log("Error for " + currency + " Message : " + res.data.message);
                check += 1;
              }
            },
            (err) => console.log(err)
          );
        }
      }

      if (this.totalFloat[7]) {
        this.totalFloat[7].handover_id = n;
        let currency = this.totalFloat[7].iso_code;
        this.totalFloat[7].to_branch_id = "1";
        this.totalFloat[7].to_user_id = "210";
        this.totalFloat[7].from_branch_id = this.$session.get(
          "user"
        ).userdetails.branch_id;
        this.totalFloat[7].from_user_id = this.$session.get("user").userdetails.id;
        this.totalFloat[7].created_by = this.$session.get("user").userdetails.id;
        this.totalFloat[7].approvalStatus = 14;
        if (this.totalFloat[7].amount > 0) {
          await Axios.post(this.nodeApi + "/addTreasuryToTeller", this.totalFloat[7], {
            headers: headers,
          }).subscribe(
            (res) => {
              if (res.data.message) {
                console.log("Error for " + currency + " Message : " + res.data.message);
                check += 1;
              }
            },
            (err) => console.log(err)
          );
        }
      }

      if (this.totalFloat[8]) {
        this.totalFloat[8].handover_id = n;
        let currency = this.totalFloat[8].iso_code;
        this.totalFloat[8].to_branch_id = "1";
        this.totalFloat[8].to_user_id = "210";
        this.totalFloat[8].from_branch_id = this.$session.get(
          "user"
        ).userdetails.branch_id;
        this.totalFloat[8].from_user_id = this.$session.get("user").userdetails.id;
        this.totalFloat[8].created_by = this.$session.get("user").userdetails.id;
        this.totalFloat[8].approvalStatus = 14;
        if (this.totalFloat[8].amount > 0) {
          await Axios.post(this.nodeApi + "/addTreasuryToTeller", this.totalFloat[8], {
            headers: headers,
          }).subscribe(
            (res) => {
              if (res.data.message) {
                console.log("Error for " + currency + " Message : " + res.data.message);
                check += 1;
              }
            },
            (err) => console.log(err)
          );
        }
      }

      if (this.totalFloat[9]) {
        this.totalFloat[9].handover_id = n;
        let currency = this.totalFloat[9].iso_code;
        this.totalFloat[9].to_branch_id = "1";
        this.totalFloat[9].to_user_id = "210";
        this.totalFloat[9].from_branch_id = this.$session.get(
          "user"
        ).userdetails.branch_id;
        this.totalFloat[9].from_user_id = this.$session.get("user").userdetails.id;
        this.totalFloat[9].created_by = this.$session.get("user").userdetails.id;
        this.totalFloat[9].approvalStatus = 14;
        if (this.totalFloat[9].amount > 0) {
          await Axios.post(this.nodeApi + "/addTreasuryToTeller", this.totalFloat[9], {
            headers: headers,
          }).subscribe(
            (res) => {
              if (res.data.message) {
                console.log("Error for " + currency + " Message : " + res.data.message);
                check += 1;
              }
            },
            (err) => console.log(err)
          );
        }
      }

      if (this.totalFloat[10]) {
        this.totalFloat[10].handover_id = n;
        let currency = this.totalFloat[10].iso_code;
        this.totalFloat[10].to_branch_id = "1";
        this.totalFloat[10].to_user_id = "210";
        this.totalFloat[10].from_branch_id = this.$session.get(
          "user"
        ).userdetails.branch_id;
        this.totalFloat[10].from_user_id = this.$session.get("user").userdetails.id;
        this.totalFloat[10].created_by = this.$session.get("user").userdetails.id;
        this.totalFloat[10].approvalStatus = 14;
        if (this.totalFloat[10].amount > 0) {
          await Axios.post(this.nodeApi + "/addTreasuryToTeller", this.totalFloat[10], {
            headers: headers,
          }).subscribe(
            (res) => {
              if (res.data.message) {
                console.log("Error for " + currency + " Message : " + res.data.message);
                check += 1;
              }
            },
            (err) => console.log(err)
          );
        }
      }

      if (this.totalFloat[11]) {
        this.totalFloat[11].handover_id = n;
        let currency = this.totalFloat[11].iso_code;
        this.totalFloat[11].to_branch_id = "1";
        this.totalFloat[11].to_user_id = "210";
        this.totalFloat[11].from_branch_id = this.$session.get(
          "user"
        ).userdetails.branch_id;
        this.totalFloat[11].from_user_id = this.$session.get("user").userdetails.id;
        this.totalFloat[11].created_by = this.$session.get("user").userdetails.id;
        this.totalFloat[11].approvalStatus = 14;

        if (this.totalFloat[12].amount > 0) {
          await Axios.post(this.nodeApi + "/addTreasuryToTeller", this.totalFloat[11], {
            headers: headers,
          }).subscribe(
            (res) => {
              if (res.data.message) {
                console.log("Error for " + currency + " Message : " + res.data.message);
                check += 1;
              }
            },
            (err) => console.log(err)
          );
        }
      }

      if (this.totalFloat[12]) {
        this.totalFloat[12].handover_id = n;
        let currency = this.totalFloat[12].iso_code;
        this.totalFloat[12].to_branch_id = "1";
        this.totalFloat[12].to_user_id = "210";
        this.totalFloat[12].from_branch_id = this.$session.get(
          "user"
        ).userdetails.branch_id;
        this.totalFloat[12].from_user_id = this.$session.get("user").userdetails.id;
        this.totalFloat[12].created_by = this.$session.get("user").userdetails.id;
        this.totalFloat[12].approvalStatus = 14;

        if (this.totalFloat[12].amount > 0) {
          await Axios.post(this.nodeApi + "/addTreasuryToTeller", this.totalFloat[12], {
            headers: headers,
          }).subscribe(
            (res) => {
              if (res.data.message) {
                console.log("Error for " + currency + " Message : " + res.data.message);
                check += 1;
              }
            },
            (err) => console.log(err)
          );
        }
      }

      await this.clearTransferT();
    },
    async clearTransfer() {
      this.$swal.fire({
        type: "success",
        title: "Teller Float Hand-Over",
        text: "You have successfully completed float hand-over.",
      });

      this.refresh();
    },

    async clearTransferT() {
      this.printPDF("PrintMe");
      this.$swal.fire({
        type: "success",
        title: "Teller Float Hand-Over",
        text:
          "You have successfully completed Treasury float hand-over and it is pending approval.",
      });

      this.refresh();
    },
    async sendRequest() {
      console.log(this.managerData);
      this.superviser_id = this.managerData.id;
      this.dialoghandoverRequest = false;
      this.dialoghandoverConfirm = true;
      // await this.whatsappNumbers.forEach((element) => {
      //   this.sendWhatsappReport(element);
      // });

      // var cell = encodeURI(this.managerData.cell.replace(/\s/g, ""));
      // //console.log(this.managerData)

      // this.overridePinM = Math.floor(1000 + Math.random() * 9000);
      // //console.log(this.overridePinM)
      // var msg = `Good day, superviser hand-over pin is : ${this.overridePinM} for ${
      //   this.$session.get("user").userdetails.first_name
      // } ${this.$session.get("user").userdetails.last_name}`;
      // var newmessage = encodeURI(msg);
      // var emailDataPin = {
      //   email: this.managerData.email.replace(/\s/g, ""),
      //   username: this.$session.get("user").userdetails.username,
      //   branch: this.$session.get("user").userdetails.branch_name,

      //   pin: this.overridePinM,
      // };

      // //console.log(this.overridePinM);
      // await fetch(
      //   "https://sms.contitouch.co.zw/api.json?cmd=sendwapp&username=contipay&password=password01&gsm=" +
      //     cell +
      //     "&msg=" +
      //     newmessage,
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

      // await fetch(
      //   "https://sms.contitouch.co.zw/api.json?cmd=sendwapp&username=contipay&password=password01&gsm=" +
      //     cell +
      //     "&msg=" +
      //     newmessage,
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

      // let headers = {
      //   "Content-Type": "application/json",
      //   Authorization: "Bearer " + this.$session.get("user").token,
      // };

      // await Axios.post(this.nodeApi + "/handoverPinEmail", emailDataPin, {
      //   headers: headers,
      // }).subscribe(
      //   (res) => {
      //     console.log(res.data.message);
      //   },
      //   (err) => console.log(err)
      // );
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

      return true;
    },
    getDateNow() {
      return (this.time = Date.now());
    },
    async finalHandOver() {
      this.dialoghandoverRequest = true;

      // console.log(headers)
      await Axios.get(this.nodeApi + "/getMessageNumbers2").subscribe(
        (res) => {
          this.whatsappNumbers = res.data.data.one.recordset;

          //console.log(this.allRates)
        },
        (err) => console.log(err)
      );
    },
    async finalHandOverT() {
      this.$swal
        .fire({
          title: "Treasury Hand Over",
          text: `Are you sure you want to clear your float and hand over to treasury.`,
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, send it!",
        })
        .then((result) => {
          if (result.value) {
            this.sendHoverApprove();
          }
        });
    },
    sendHoverApprove() {
      this.dialogHandOverT = false;

      var dataArrray = [];
      var tellertotellerData = {
        amount: 0,
        branch_id: this.$session.get("user").userdetails.branch_id,
        user_id: this.$session.get("user").userdetails.id,
        currency_id: null,
        handover_type: 4,
        created_by: this.$session.get("user").userdetails.id,
      };

      this.tellertobranchT();
    },

    async sendWhatsappReport(manager) {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      today = dd + "/" + mm + "/" + yyyy;

      var handoverData = "";

      this.totalFloat.forEach((element) => {
        handoverData += `${element.symbol} *${parseFloat(element.amount).toFixed(2)}*%0A`;
      });

      var cell = encodeURI(manager.cell.replace(/\s/g, ""));
      var msg = `*Teller Hand-Over Report (${today})*%0A%0ABranch : *${
        this.$session.get("user").userdetails.branch_name
      }*%0ASupervisor : *${manager.first_name.replace(
        /\s/g,
        ""
      )}  ${manager.last_name.replace(/\s/g, "")}*%0ATeller : *${
        this.$session.get("user").userdetails.username
      }*%0A%0A`;
      var newmessage = encodeURI(msg + handoverData);

      try {
        const response = await fetch(
          "https://sms.contitouch.co.zw/api.json?cmd=sendwapp&username=contipay&password=password01&gsm=" +
            cell +
            "&msg=" +
            newmessage,
          {
            method: "GET",
            mode: "no-cors",
          }
        );
      } catch (error) {
        console.error("Error:", error);
      }
    },
    async handover() {
      this.time = Date.now();
      this.getSupervisor();
      this.dialogHandOver = true;

      // console.log(this.totalFloat)
      // console.log(this.rows)

      // let headers = {
      //     'Content-Type': 'application/json',
      //     'Authorization': 'Bearer ' + this.$session.get('user').token,

      // }
      //  Axios.put(this.nodeApi+'/updateTransactions/',{col:'banked',value:1,wcol:'created_by',wvalue:this.$session.get('user').userdetails.id},{headers:headers})
      //   .subscribe(res =>{
      //     //console.log(res)

      //        this.getAllTransactions()

      //       this.$swal.fire({
      //         type: 'success',
      //         title: 'Transaction Authorized',
      //         text:  'Transaction was authorized successfully'
      //       })

      //      },err => console.log(err))
    },
    async handoverTreasury() {
      this.time = Date.now();
      this.getSuperSupervisor();
      this.dialogHandOverT = true;
    },
    completeFuncton(complete) {
      console.log(complete);
      if (complete == "complete") {
        this.getAllUserFloats();
        this.refresh();
      }
    },
    async getAllRates(data) {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      // console.log(headers)
      await Axios.post(
        this.nodeApi + "/getAllRatesByCurrencyID",
        { currency_id: data },
        { headers: headers }
      ).subscribe(
        (res) => {
          this.allRates = res.data.data.one.recordset;

          //console.log(this.allRates)
        },
        (err) => console.log(err)
      );
    },
    async getAllUserFloats() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      // console.log(headers)
      await Axios.post(
        this.nodeApi + "/getUserFloatByCol2",
        { col: "user_id", value: this.$session.get("user").userdetails.id },
        { headers: headers }
      ).subscribe(
        (res) => {
          this.totalFloat = res.data.data.one.recordset;

          //console.log(this.allRates)
        },
        (err) => console.log(err)
      );
    },
    getAllTransactions() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      Axios.post(
        this.nodeApi + "/getTransactionsByColTellers",
        { user_id: this.$session.get("user").userdetails.id },
        { headers: headers }
      ).subscribe(
        (res) => {
          this.rows = res.data.data.one.recordset;
          //console.log(this.companyData)
        },
        (err) => console.log(err)
      );
    },
    getAllTransactionsUtility() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      Axios.post(
        this.nodeApi + "/getTransactionsByColTellersUtil",
        { user_id: this.$session.get("user").userdetails.id },
        { headers: headers }
      ).subscribe(
        (res) => {
          this.rows = res.data.data.one.recordset;
          //console.log(this.companyData)
        },
        (err) => console.log(err)
      );
    },
    getAllTransactionsWorldRemit() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      Axios.post(
        this.nodeApi + "/getTransactionsByColTellersWorldRemit",
        { user_id: this.$session.get("user").userdetails.id },
        { headers: headers }
      ).subscribe(
        (res) => {
          this.rows = res.data.data.one.recordset;
          //console.log(this.companyData)
        },
        (err) => console.log(err)
      );
    },
    getAllTransactionsContiSendIn() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      Axios.post(
        this.nodeApi + "/getTransactionsByColTellersContiSendIn",
        { user_id: this.$session.get("user").userdetails.id },
        { headers: headers }
      ).subscribe(
        (res) => {
          this.rows = res.data.data.one.recordset;
          //console.log(this.companyData)
        },
        (err) => console.log(err)
      );
    },
    getAllTransactionsContiSendOut() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      Axios.post(
        this.nodeApi + "/getTransactionsByColTellersContiSendOut",
        { user_id: this.$session.get("user").userdetails.id },
        { headers: headers }
      ).subscribe(
        (res) => {
          this.rows = res.data.data.one.recordset;
          //console.log(this.companyData)
        },
        (err) => console.log(err)
      );
    },
    async refresh() {
      if (this.tableType == 0) {
        await this.getAllTransactions();
      }
      if (this.tableType == 1) {
        await this.getAllTransactionsUtility();
      }
      if (this.tableType == 2) {
        await this.getAllTransactionsWorldRemit();
      }

      await this.getAllUserFloats();
      //await this.getAllToggleCurrencies()
      await this.getAllRates("USD");
    },
    exportPdf() {
      // let pdfName = 'TransactionsReport';
      //   var doc = new jsPDF();
      //   doc.text(this.rows, 10, 10);
      //   doc.save(pdfName + '.pdf');
      var vm = this;
      //console.log(vm.rows)
      var columns = [
        {
          title: "Tran Ref",
          dataKey: "id",
        },
        {
          title: "Date",
          dataKey: "created_at",
        },
        {
          title: "Received $",
          dataKey: "receive_amount",
        },
        {
          title: "Disbursed $",
          dataKey: "disburse_amount",
        },
        {
          title: "Rate",
          dataKey: "rate",
        },
        {
          title: "Branch",
          dataKey: "name",
        },
        {
          title: "Disburse Curr.",
          dataKey: "disburse_currency",
        },
        {
          title: "Receive Curr.",
          dataKey: "receive_currency",
        },
        {
          title: "Client Name",
          dataKey: "first_name",
        },
        {
          title: "Client ID",
          dataKey: "id_number",
        },
        {
          title: "Type",
          dataKey: "transaction_type",
        },
      ];
      var doc = new jsPDF("l", "pt");
      var totalPagesExp = "{total_pages_count_string}";

      doc.setTextColor(100);
      // doc.text('Contipay Merchant Report', 10, 20);
      //doc.autoTable(columns,vm.rows)
      doc.autoTable(columns, vm.rowsFilter, {
        didDrawPage: function (data) {
          // Header
          doc.setFontSize(20);
          doc.setTextColor(40);
          doc.setFontStyle("normal");

          doc.text("ContiCash Transaction Report", data.settings.margin.left + 15, 22);

          // Footer
          var str = "Page " + doc.internal.getNumberOfPages();
          // Total page number plugin only available in jspdf v1.0+
          if (typeof doc.putTotalPages === "function") {
            str =
              str +
              " of " +
              totalPagesExp +
              "                                                                                                                                                                                                                                 @countitouch 2019";
          }
          doc.setFontSize(10);

          // jsPDF 1.4+ uses getWidth, <1.4 uses .width
          var pageSize = doc.internal.pageSize;
          var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
          doc.text(str, data.settings.margin.left, pageHeight - 10);
        },
        margin: { top: 30 },
      });

      // Total page number plugin only available in jspdf v1.0+
      if (typeof doc.putTotalPages === "function") {
        doc.putTotalPages(totalPagesExp);
      }
      doc.save("TransactionReport.pdf");
    },
    exportExcel() {},

    customFilter(items, filters, filter, headers) {
      // Init the filter class.
      const cf = new this.$MultiFilters(items, filters, filter, headers);
      // Use regular function(),
      // arrow functions does not allow context binding.
      // Register the global standard filter.
      cf.registerFilter("search", function (searchWord, items) {
        if (searchWord.trim() === "") {
          return items;
        }
        return items.filter((item) => {
          return item.name.toLowerCase().includes(searchWord.toLowerCase());
        }, searchWord);
      });
      // Use regular function(),
      // arrow functions does not allow context binding.
      // Register "added_by" filter.
      cf.registerFilter("added_by", function (added_by, items) {
        // If the filter has not been applied yet
        // just return all available items.
        if (added_by.trim() === "") return items;
        // Compare each item added_by and just return the matching ones.
        return items.filter((item) => {
          return item.transaction_type.toLowerCase() === added_by.toLowerCase();
        }, added_by);
      });
      // Use regular function(),
      // arrow functions does not allow context binding.
      // Register "start_date" filter.
      cf.registerFilter("start_date", function (start_date, items) {
        // If the filter has not been applied yet
        // just return all available items.
        if (start_date === null) return items;
        // Compare each item start_date and just return the matching ones.
        return items.filter((item) => {
          return item.tran_date >= start_date;
        }, start_date);
      });
      // Use regular function(),
      // arrow functions does not allow context binding.
      // Register "end_date" filter.
      cf.registerFilter("end_date", function (end_date, items) {
        // If the filter has not been applied yet
        // just return all available items.
        if (end_date === null) return items;
        // Compare each item end_date and just return the matching ones.
        return items.filter((item) => {
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
      this.filters = this.$MultiFilters.updateFilters(this.filters, { search: val });
    },
    /**
     * Handler when user  select some author at the "Author" select.
     */
    filterAuthor(val) {
      this.filters = this.$MultiFilters.updateFilters(this.filters, { added_by: val });
    },
    /**
     * Handler when select a date on "From" date picker.
     */
    filterStartDate(val) {
      // Close the date picker.
      this.$refs.show_start_date.save(val);
      //Convert the value to a timestamp before saving it.
      //const timestamp = new Date(val).getTime();
      this.filters = this.$MultiFilters.updateFilters(this.filters, { start_date: val });
    },
    /**
     * Handler when select a date on "To" date picker.
     */
    filterEndDate(val) {
      // Close the date picker.
      this.$refs.show_end_date.save(val);
      //Convert the value to a timestamp before saving it.
      //const timestamp = new Date(val).getTime();
      this.filters = this.$MultiFilters.updateFilters(this.filters, { end_date: val });
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
      if (!value) return "";
      return new Date(value).toLocaleDateString("es-ES");
    },
  },
};
</script>
<style scoped>
.image {
  width: 150px;
  height: 100%;
  margin: 3px;
}
.image2 {
  width: 55px;
  height: 100%;
  margin: 3px;
}
.echarts {
  height: 300px;
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
.h4Rev {
  color: #088f08;
}

#chip-usage-example .v-chip {
  margin: 8px;
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
  text-align: center;
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
