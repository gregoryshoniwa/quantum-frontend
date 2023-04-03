<template>
  <div>
    <v-layout row wrap>
      <h2 style="color: grey; margin-top: 15px">Dashboard : Manager | Treasury</h2>
      <v-btn-toggle
        v-if="dashboardPage == 1"
        mandatory
        v-model="toggleCurr"
        color="primary"
        style="margin-top: 15px; margin-left: 30px"
      >
        <v-btn :value="item.symbol" v-for="item in toggleCurrencies" :key="item.id">
          {{ item.symbol }}
        </v-btn>
      </v-btn-toggle>

      <!-- <v-btn-toggle
        mandatory
        v-model="dashboardPage"
        color="primary"
        style="margin-top: 15px; margin-left: 30px"
      >
        <v-btn :value="item.id" v-for="item in toggleDashboard" :key="item.id">
          {{ item.firm }}
        </v-btn>
      </v-btn-toggle> -->
      <v-btn
        small
        style="margin-top: 15px; margin-left: 30px"
        color="primary"
        @click="dialogSummaryAccount = true"
      >
        Transaction & Float Summary
      </v-btn>
      <v-dialog
        v-model="dialogSummaryAccount"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        style="z-index: 99"
      >
        <v-card color="#EBEFF3">
          <v-toolbar dark color="#1976D2">
            <v-toolbar-title>Transaction & Float Summary</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn depressed color="#1976D2" text @click="dialogSummaryAccount = false"
                >Close</v-btn
              >
            </v-toolbar-items>
          </v-toolbar>
          <component
            v-bind:is="page"
            v-bind:currency_id="toggleCurr"
            v-bind:date="dater"
          ></component>
        </v-card>
      </v-dialog>
    </v-layout>

    <div v-if="dashboardPage == 1">
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
        <v-flex xs12 md3 pa-2>
          <v-card hover>
            <v-flex mb-2 class="card cardRev1">
              <v-layout ma-1>
                <img src="../assets/imgs/bank.fw.png" class="image2" />
                <v-flex style="text-align: right; padding: 3px">
                  <h2>Branches</h2>
                  <h3 class="h4Rev">{{ allBranchesCount }}</h3>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-card>
        </v-flex>

        <v-flex xs12 md3 pa-2>
          <v-card hover>
            <v-flex mb-2 class="card cardRev2">
              <v-layout ma-1>
                <img src="../assets/imgs/clients.fw.png" class="image2" />
                <v-flex style="text-align: right; padding: 3px">
                  <h2>Users</h2>
                  <h3 class="h4Rev">{{ allUsersCount }}</h3>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-card>
        </v-flex>

        <v-flex xs12 md3 pa-2>
          <v-card hover>
            <v-flex mb-2 class="card cardRev3">
              <v-layout ma-1>
                <img src="../assets/imgs/gdp.fw.png" class="image2" />
                <v-flex style="text-align: right; padding: 3px">
                  <h2>Clients</h2>
                  <h3 class="h4Rev">{{ allClientsCount }}</h3>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 sm12 md12 lg12 pa-2>
          <v-flex>
            <v-layout row wrap>
              <v-flex mr-3 mt-3>
                <h3>Branch Float Analysis</h3>
              </v-flex>
            </v-layout>
            <v-card hover>
              <BookingChart :ToggleCurrency="toggleCurr" class="echart" />
            </v-card>
          </v-flex>
        </v-flex>

        <v-flex xs12 sm12 md12 lg12 pa-2>
          <v-flex>
            <v-layout row wrap>
              <v-flex mr-3 mt-3>
                <h3>Branch Average Rate & Transaction Analysis</h3>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex>
                <v-btn-toggle mandatory v-model="toggle" color="primary">
                  <v-btn flat value="1"> Today </v-btn>
                  <v-btn flat value="2"> This Week </v-btn>
                  <v-btn flat value="3"> Current Month </v-btn>
                  <v-btn flat value="4"> Over-all </v-btn>
                </v-btn-toggle>
                <v-btn
                  :disabled="disable"
                  color="#ECB530"
                  class="white--text"
                  @click="dialogdaterange = true"
                >
                  Range
                </v-btn>
              </v-flex>
            </v-layout>
            <v-card hover>
              <MarketRates
                :TimePeriod="timeP"
                :ToggleCurrency="toggleCurr"
                class="echart2"
              />
            </v-card>
          </v-flex>
        </v-flex>

        <v-flex xs12 sm12 md12 lg12 pa-2>
          <v-flex>
            <v-layout row wrap>
              <v-flex mr-3 mt-3>
                <h3>Totals History</h3>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex>
                <v-btn-toggle mandatory v-model="toggle2" color="primary">
                  <v-btn flat value="1"> Last 7 days </v-btn>
                  <v-btn flat value="2"> Last 30 days </v-btn>
                </v-btn-toggle>
                <v-btn
                  :disabled="disable"
                  color="#ECB530"
                  class="white--text"
                  @click="dialogdaterange3 = true"
                >
                  Range
                </v-btn>
              </v-flex>
            </v-layout>
            <v-card hover>
              <MarketRates2
                :TimePeriod="timeS"
                :ToggleCurrency="toggleCurr"
                class="echart2"
              />
            </v-card>
          </v-flex>
        </v-flex>

        <v-flex xs12 sm12 md12 lg12 pa-2>
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
              <SuperGraph1 :Branch="branch" :ToggleCurrency="toggleCurr" class="echart" />
            </v-card>
          </v-flex>
        </v-flex>

        <v-flex xs12 sm12 md12 lg12 pa-2>
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
              <v-flex mt-2>
                <v-btn-toggle mandatory v-model="togglebranch" color="primary">
                  <v-btn flat value="1"> Today </v-btn>
                  <v-btn flat value="2"> This Week </v-btn>
                  <v-btn flat value="3"> Current Month </v-btn>
                  <v-btn flat value="4"> Over-all </v-btn>
                </v-btn-toggle>
                <v-btn
                  :disabled="disable"
                  color="#ECB530"
                  class="white--text"
                  @click="dialogdaterange2 = true"
                >
                  Range
                </v-btn>
              </v-flex>
            </v-layout>
            <v-card hover>
              <SuperGraph2
                :TimePeriod="timePP"
                :Branch="branch2"
                :ToggleCurrency="toggleCurr"
                class="echart2"
              />
            </v-card>
          </v-flex>
        </v-flex>
      </v-layout>
    </div>

    <div v-if="dashboardPage == 2">
      <WorldRemit />
    </div>

    <div v-if="dashboardPage == 3">
      <ContiSend />
    </div>

    <v-dialog v-model="dialogdaterange" persistent max-width="400px">
      <v-card class="mx-auto">
        <v-card-title class="yellow darken-2 white--text">
          <span class="headline">Select Report Date Range</span>
        </v-card-title>

        <v-layout row wrap>
          <v-flex xs12 mt-3 mr-3 ml-3>
            <v-text-field
              style="text-align: center"
              @keyup.enter="daterange"
              v-model="start_date"
              autofocus
              type="date"
              label="Please enter from date"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 mr-3 ml-3>
            <v-text-field
              style="text-align: center"
              @keyup.enter="daterange"
              v-model="end_date"
              autofocus
              type="date"
              label="Please enter to date"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-spacer></v-spacer>
        <v-btn color="red" class="white--text" @click="dialogdaterange = false"
          >Close</v-btn
        >
        <v-btn color="blue" class="white--text" @click="daterange">Filter</v-btn>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogdaterange2" persistent max-width="400px">
      <v-card class="mx-auto">
        <v-card-title class="yellow darken-2 white--text">
          <span class="headline">Select Report Date Range</span>
        </v-card-title>

        <v-layout row wrap>
          <v-flex xs12 mt-3 mr-3 ml-3>
            <v-text-field
              style="text-align: center"
              @keyup.enter="daterange2"
              v-model="start_date2"
              autofocus
              type="date"
              label="Please enter from date"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 mr-3 ml-3>
            <v-text-field
              style="text-align: center"
              @keyup.enter="daterange2"
              v-model="end_date2"
              autofocus
              type="date"
              label="Please enter to date"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-spacer></v-spacer>
        <v-btn color="red" class="white--text" @click="dialogdaterange2 = false"
          >Close</v-btn
        >
        <v-btn color="blue" class="white--text" @click="daterange2">Filter</v-btn>
      </v-card>
    </v-dialog>
 
    <v-dialog v-model="dialogdaterange3" persistent max-width="400px">
      <v-card class="mx-auto">
        <v-card-title class="yellow darken-2 white--text">
          <span class="headline">Select Report Date Range</span>
        </v-card-title>

        <v-layout row wrap>
          <v-flex xs12 mt-3 mr-3 ml-3>
            <v-text-field
              style="text-align: center"
              @keyup.enter="daterange3"
              v-model="start_date3"
              autofocus
              type="date"
              label="Please enter from date"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 mr-3 ml-3>
            <v-text-field
              style="text-align: center"
              @keyup.enter="daterange3"
              v-model="end_date3"
              autofocus
              type="date"
              label="Please enter to date"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-spacer></v-spacer>
        <v-btn color="red" class="white--text" @click="dialogdaterange3 = false"
          >Close</v-btn
        >
        <v-btn color="blue" class="white--text" @click="daterange3">Filter</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import BookingChart from "@/components/BookingChart";
import MarketRates from "@/components/MarketRates";
import MarketRates2 from "@/components/MarketRates2";
import SuperGraph1 from "@/components/SuperGraph1";
import SuperGraph2 from "@/components/SuperGraph2";
import WorldRemit from "@/views/DashboardWorldRemit";
import TransactionSummary from "@/views/TransactionSummary";
import ContiSend from "@/views/DashboardContiSend";
import Axios from "axios-observable";
export default {
  components: {
    BookingChart,
    MarketRates,
    MarketRates2,
    SuperGraph1,
    SuperGraph2,
    WorldRemit,
    ContiSend,
    TransactionSummary,
  },
  data() {
    return {
      dashboardPage: "",
      page: "TransactionSummary",
      dialogSummaryAccount: false,
      nodeApi: "",
      //nodeApi: '',
      CurrencyPair: "",
      allClients: [],
      allRates: [],
      toggleCurrencies: [],
      toggleDashboard: [
        { id: 1, firm: "Bureau De Change" },
        { id: 2, firm: "WorldRemit" },
        { id: 3, firm: "ContiSend" },
      ],
      timeP: 0,
      timeS: 0,
      timePP: 0,
      start_date: null,
      end_date: null,
      start_date2: null,
      end_date2: null,
      start_date3: null,
      end_date3: null,
      disable: false,
      branch: 0,
      branch2: 0,
      dialogdaterange: false,
      dialogdaterange2: false,
      dialogdaterange3: false,
      branches: [],
      allClientsCount: 0,
      allUsersCount: 0,
      toggleCurr: "",
      toggle: "",
      toggle2: "",
      togglebranch: "",
      allBranchesCount: 0,
      image: "/img/",
      allUsers: [],
      allBranches: [],
      totalFloat: [],
      branchSelected: false,
      dater: 0,
    };
  },
  mounted() {
    this.toggleCurr = "USD";
    this.dashboardPage = 1;
    this.getAllClients();
    this.getAllBranches();
    this.getAllUsers();
    this.getAllRates(this.toggleCurr);
    this.getAllToggleCurrencies();
    this.getBranches();
    this.toggle = "1";

    this.toggle2 = "1";
    this.togglebranch = "1";
    this.timeP = 1;
    this.timeS = 7;
    this.timePP = 1;
  },
  watch: {
    dialogSummaryAccount(val) {
      if (val) {
        this.dater = Date.now();
      }
    },
    dashboardPage(val) {
      console.log(val);
    },
    toggleCurr(val) {
      // console.log(val)
      this.getAllRates(val);
    },
    toggle2(val) {
      if (val == "1") {
        this.timeS = 7;
      }
      if (val == "2") {
        this.timeS = 30;
      }
    },
    toggle(val) {
      if (val == "1") {
        this.timeP = 1;
      }
      if (val == "2") {
        this.timeP = 8;
      }
      if (val == "3") {
        this.timeP = 31;
      }
      if (val == "4") {
        this.timeP = 0;
      }
    },
    togglebranch(val) {
      if (val == "1") {
        this.timePP = 1;
      }
      if (val == "2") {
        this.timePP = 8;
      }
      if (val == "3") {
        this.timePP = 31;
      }
      if (val == "4") {
        this.timePP = 0;
      }
    },
  },
  methods: {
    daterange() {
      if (this.start_date && this.end_date) {
        var currentdate = new Date(this.end_date);
        currentdate.setDate(currentdate.getDate() + 1);
        var fulldate = currentdate.toISOString();
        this.end_date = fulldate.substring(0, 10);

        this.timeP = {
          start_date: this.start_date,
          end_date: this.end_date,
        };

        this.dialogdaterange = false;
        this.start_date = null;
        this.end_date = null;
      } else {
        this.$swal.fire({
          type: "error",
          title: "Date Range Filter Error",
          text: "Please input a date range to filter.",
        });
      }
    },

    daterange2() {
      if (this.start_date2 && this.end_date2) {
        var currentdate = new Date(this.end_date2);
        currentdate.setDate(currentdate.getDate() + 1);
        var fulldate = currentdate.toISOString();
        this.end_date2 = fulldate.substring(0, 10);

        this.timePP = {
          start_date: this.start_date2,
          end_date: this.end_date2,
        };

        this.dialogdaterange2 = false;
        this.start_date2 = null;
        this.end_date2 = null;
      } else {
        this.$swal.fire({
          type: "error",
          title: "Date Range Filter Error",
          text: "Please input a date range to filter.",
        });
      }
    },
    daterange3() {
      if (this.start_date3 && this.end_date3) {
        var currentdate = new Date(this.end_date3);
        currentdate.setDate(currentdate.getDate() + 1);
        var fulldate = currentdate.toISOString();
        this.end_date3 = fulldate.substring(0, 10);

        this.timeS = {
          start_date: this.start_date3,
          end_date: this.end_date3,
        };

        this.dialogdaterange3 = false;
        this.start_date3 = null;
        this.end_date3 = null;
      } else {
        this.$swal.fire({
          type: "error",
          title: "Date Range Filter Error",
          text: "Please input a date range to filter.",
        });
      }
    },
    selectedBranch2(data) {
      this.branch2 = data;
      this.branchSelected = true;

      // console.log(data)
    },
    selectedBranch(data) {
      this.branch = data;
      // console.log(data)
    },
    async getBranches() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      // console.log(headers)
      await Axios.get(this.nodeApi + "/getAllBranches", { headers: headers }).subscribe(
        (res) => {
          this.branches = res.data.data.one.recordset;

          //console.log(this.allRates)
        },
        (err) => console.log(err)
      );
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

    async getAllClients() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      // console.log(headers)
      await Axios.get(this.nodeApi + "/getAllClients", { headers: headers }).subscribe(
        (res) => {
          this.allClients = res.data.data.one.recordset;
          this.allClientsCount = this.allClients.length;
          //console.log(this.companyData)
        },
        (err) => console.log(err)
      );
    },
    async getAllBranches() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      // console.log(headers)
      await Axios.get(this.nodeApi + "/getAllBranches", { headers: headers }).subscribe(
        (res) => {
          this.allBranches = res.data.data.one.recordset;
          this.allBranchesCount = this.allBranches.length;
          //console.log(this.companyData)
        },
        (err) => console.log(err)
      );
    },
    async getAllUsers() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      // console.log(headers)
      await Axios.get(this.nodeApi + "/getAllTellerUsers", {
        headers: headers,
      }).subscribe(
        (res) => {
          this.allUsers = res.data.data.one.recordset;
          this.allUsersCount = this.allUsers.length;
          //console.log(this.companyData)
        },
        (err) => console.log(err)
      );
    },
    async getTotalFloat() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      // console.log(headers)
      await Axios.get(this.nodeApi + "/getAllBranches", { headers: headers }).subscribe(
        (res) => {
          this.totalFloat = res.data.data.one.recordset;
          //console.log(this.companyData)
        },
        (err) => console.log(err)
      );
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
.h4Rev {
  color: #088f08;
}
</style>
