<template>
  <div>
    <h2 style="color: grey; margin-top: 20px">Dashboard : Supervisor</h2>
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
    <v-layout row justify-end>
      <v-flex md4 pa-2>
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
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm12 md12 lg6 pa-2>
        <v-flex mr-3 mt-3>
          <h3>Branch Float Analysis</h3>
          <v-card hover>
            <SuperGraph1 :ToggleCurrency="toggleCurr" class="echart" />
          </v-card>
        </v-flex>
      </v-flex>
      <v-flex xs12 sm12 md12 lg6 pa-2>
        <!-- <v-flex>
          <h3>Branch Average Rate & Transaction Analysis</h3>
          <v-card hover>
            <SuperGraph2 :ToggleCurrency="toggleCurr" class="echart2" />
          </v-card>
        </v-flex> -->
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
                @click="dialogdaterange2 = true"
              >
                Range
              </v-btn>
            </v-flex>
          </v-layout>
          <v-card hover>
            <SuperGraph2
              :TimePeriod="timeP"
              :Branch="branch2"
              :ToggleCurrency="toggleCurr"
              class="echart2"
            />
          </v-card>
        </v-flex>
      </v-flex>
    </v-layout>

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
  </div>
</template>
<script>
import SuperGraph1 from "@/components/SuperGraph1";
import SuperGraph2 from "@/components/SuperGraph2";

import Axios from "axios-observable";
export default {
  components: {
    SuperGraph1,
    SuperGraph2,
  },
  data() {
    return {
      nodeApi: "",
      image: "/img/",
      CurrencyPair: "",
      timeP: 0,
      disable: false,
      dialogdaterange2: false,
      allClients: [],
      totalFloat: [],
      branch2: 1,
      allClientsCount: 0,
      allUsersCount: 0,
      allBranchesCount: 0,
      toggleCurrencies: [],
      toggleCurr: "",
      toggle: "",
      allUsers: [],
      allRates: [],
      totalFloat: [],
      start_date2: null,
      end_date2: null,
    };
  },
  mounted() {
    this.branch2 = this.$session.get("user").userdetails.branch_id;
    this.timeP = 1;
    this.toggle = "1";
    this.toggleCurr = "USD";
    this.getAllRates();
    this.getAllUsers();
    this.getAllToggleCurrencies();
    this.getAllUserFloats();
  },
  watch: {
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
  },
  methods: {
    daterange2() {
      if (this.start_date2 && this.end_date2) {
        var currentdate = new Date(this.end_date2);
        currentdate.setDate(currentdate.getDate() + 1);
        var fulldate = currentdate.toISOString();
        this.end_date2 = fulldate.substring(0, 10);

        this.timeP = {
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
    async getAllUserFloats() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      // console.log(headers)
      await Axios.post(
        this.nodeApi + "/getBranchDashFloatByCol",
        { col: "branch_id", value: this.$session.get("user").userdetails.branch_id },
        { headers: headers }
      ).subscribe(
        (res) => {
          this.totalFloat = res.data.data.one.recordset;

          //console.log(this.allRates)
        },
        (err) => console.log(err)
      );
    },
    completeFuncton(complete) {
      console.log(complete);
      if (complete == "complete") {
        this.getAllUserFloats();
        this.refresh();
      }
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
    async getAllRates() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      // console.log(headers)
      await Axios.get(this.nodeApi + "/getAllRates", { headers: headers }).subscribe(
        (res) => {
          this.allRates = res.data.data.one.recordset;

          //console.log(this.allRates)
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
      await Axios.post(
        this.nodeApi + "/getUsersByCol",
        { col: "branch_id", value: this.$session.get("user").userdetails.branch_id },
        { headers: headers }
      ).subscribe(
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
</style>
