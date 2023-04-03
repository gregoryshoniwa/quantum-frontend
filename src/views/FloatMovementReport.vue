<template>
  <div>
    <v-layout row wrap ma-2>
      <h2 style="color: grey; margin-top: 18px; margin-right: 20px">
        Float Movement Report
      </h2>

      <v-flex xs12 sm6 md4>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search by anything"
          single-line
          hide-details
        ></v-text-field>
      </v-flex>
      <!-- <v-btn-toggle
        mandatory
        v-model="company"
        color="primary"
        style="margin-top: 15px; margin-left: 30px"
      >
        <v-btn :value="item.id" v-for="item in companyData" :key="item.id">
          {{ item.name }}
        </v-btn>
      </v-btn-toggle> -->
      <v-spacer></v-spacer>
      <h2 style="color: grey; margin-top: 18px">{{ report_type }}</h2>
    </v-layout>
    <h2 style="margin-right: 20px">Show for : {{ SpecificRange }}</h2>
    <v-layout row wrap justify-end>
      <v-flex xs12 sm6 md2>
        <v-card
          hover
          @click="openpage('Displaying Teller to Teller', 5)"
          max-width="150px"
        >
          <v-flex mb-2 class="card cardRev4">
            <v-layout ma-1>
              <img src="../assets/imgs/tellertoteller.fw.png" class="image" />
            </v-layout>
          </v-flex>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md2>
        <v-card
          hover
          @click="openpage('Displaying Branch to Teller', 3)"
          max-width="150px"
        >
          <v-flex mb-2 class="card cardRev4">
            <v-layout ma-1>
              <img src="../assets/imgs/branchtoteller.fw.png" class="image" />
            </v-layout>
          </v-flex>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md2>
        <v-card
          hover
          @click="openpage('Displaying Teller to Branch', 4)"
          max-width="150px"
        >
          <v-flex mb-2 class="card cardRev4">
            <v-layout ma-1>
              <img src="../assets/imgs/tellertobranch.fw.png" class="image" />
            </v-layout>
          </v-flex>
        </v-card>
      </v-flex>
      <!-- <v-flex xs12 sm6 md2>
        <v-card
          hover
          @click="openpage('Displaying Branch to Branch', 6)"
          max-width="150px"
        >
          <v-flex mb-2 class="card cardRev4">
            <v-layout ma-1>
              <img src="../assets/imgs/branchtobranch.fw.png" class="image" />
            </v-layout>
          </v-flex>
        </v-card>
      </v-flex> -->
      <v-flex xs12 sm6 md2>
        <v-card
          hover
          @click="openpage('Displaying Treasary to Branch', 1)"
          max-width="150px"
        >
          <v-flex mb-2 class="card cardRev4">
            <v-layout ma-1>
              <img src="../assets/imgs/treasarytobranch.fw.png" class="image" />
            </v-layout>
          </v-flex>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md2>
        <v-card
          hover
          @click="openpage('Displaying Branch to Treasary', 2)"
          max-width="150px"
        >
          <v-flex mb-2 class="card cardRev4">
            <v-layout ma-1>
              <img src="../assets/imgs/branchtotreasary.fw.png" class="image" />
            </v-layout>
          </v-flex>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md2>
        <v-card
          hover
          @click="openpage('Displaying Treasary Float Injection', 7)"
          max-width="150px"
        >
          <v-flex mb-2 class="card cardRev4">
            <v-layout ma-1>
              <img src="../assets/imgs/floatadmin.fw.png" class="image" />
            </v-layout>
          </v-flex>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-btn color="green" dark @click="openpage2"> Today </v-btn>
        <v-btn color="primary" @click="dialogdaterange = true"> Specific Range </v-btn>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon @click="exportExcel">
              <export-excel
                class="btn btn-default"
                :data="rows"
                worksheet="Tran_Worksheet"
                name="Float_Movement_Report.xls"
              >
                <v-icon v-on="on" color="green darken-2">library_add</v-icon>
              </export-excel>
            </v-btn>
          </template>
          <span>Export to excel</span>
        </v-tooltip>
        <v-data-table
          :headers="paymentHeaders"
          :items="rows"
          item-key="tran_id"
          :pagination.sync="pagination"
          class="elevation-1"
          width="10"
          :search="search"
        >
          <template v-slot:items="props">
            <tr>
              <td>{{ props.item.id }}</td>
              <td>{{ props.item.date_time }}</td>
              <td>{{ props.item.handover_type }}</td>

              <td>
                {{ props.item.iso_code }} {{ parseFloat(props.item.amount).toFixed(2) }}
              </td>
              <td>
                {{ props.item.from_user_first_name }} {{ props.item.from_user_last_name }}
              </td>
              <td>
                {{ props.item.to_user_first_name }} {{ props.item.to_user_last_name }}
              </td>
              <td>{{ props.item.from_branch }}</td>
              <td>{{ props.item.to_branch }}</td>
              <td>{{ props.item.username }}</td>
              <td>{{ props.item.company }}</td>
            </tr>
          </template>
          <template v-slot:expand="props">
            <v-card flat>
              <v-card-text>{{ props.item.tran_description }}</v-card-text>
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
import * as jsPDF from "jspdf";
import * as autoTable from "jspdf-autotable";
import Axios from "axios-observable";
export default {
  data: () => ({
    dialogloader: false,
    dialogdaterange: false,
    company: 1,
    companyData: [
      { id: 1, name: "ContiCash" },
      { id: 2, name: "WorldRemit" },
      { id: 3, name: "ContiSend" },
    ],
    start_date: "",
    end_date: "",
    allRates: [],
    totalFloat: [],
    expand: false,
    show_start_date: false,
    nodeApi: "",
    start_date: null,
    is_charged: null,
    show_end_date: false,
    end_date: null,
    report_type: "",
    user_type: 0,
    center_id: "",
    centreCurrency: "",
    rowsFilter: [],
    paymentHeaders: [
      {
        text: "Tran Ref",
        value: "id",
      },
      {
        text: "Tran Date",
        value: "date_time",
      },
      {
        text: "Type",
        value: "handover_type",
      },

      {
        text: "Amount $",
        value: "amount",
      },
      {
        text: "From User",
        value: "from_user_first_name",
      },
      {
        text: "To User",
        value: "to_user_first_name",
      },
      {
        text: "From Branch",
        value: "from_branch",
      },
      {
        text: "To Branch",
        value: "to_branch",
      },
      {
        text: "Created By",
        value: "username",
      },
      {
        text: "Company",
        value: "company",
      },
    ],
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
    //Excel data
    json_fields: {
      id: "ID",
      date_time: "Date",
      tran_amount_total: "Total Amount",
      tran_amount: "Net Amount",
      tran_charge: "Tran Cost",
      tran_merchant: "Merchant",
      tran_account: "Account No",
      tran_provider: "Provider",
      handover_type: "Method",
      status: "Status",
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
    pageNumber: 5,
    SpecificRange: "Today",
  }),
  watch: {
    dialogdaterange(val) {
      if (val) {
        this.start_date = null;
        this.end_date = null;
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
  computed: {},
  mounted() {
    this.report_type = "Displaying Teller to Teller";
    this.getAllRates();
    this.user_type = this.$session.get("user").userdetails.user_type;
    this.getAllTransactions(5);
  },
  methods: {
    exportExcel() {},
    openpage(type, num) {
      this.report_type = type;
      this.pageNumber = num;
      this.getAllTransactions(this.pageNumber);
    },
    openpage2() {
      this.SpecificRange = `Today`;
      this.getAllTransactions(this.pageNumber);
    },
    async daterange() {
      this.dialogdaterange = false;
      this.SpecificRange = `${this.start_date} to ${this.end_date}`;
      this.dialogloader = true;
      var currentdate = new Date(this.end_date);
      currentdate.setDate(currentdate.getDate() + 1);
      var fulldate = currentdate.toISOString();
      this.end_date = fulldate.substring(0, 10);

      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };

      await Axios.post(
        this.nodeApi + "/getFloatTransactions2",
        {
          handover_id: this.pageNumber,
          start: this.start_date,
          end: this.end_date,
          company: this.company,
        },
        {
          headers: headers,
        }
      ).subscribe(
        (res) => {
          this.rows = res.data.data.one.recordset;
          this.dialogloader = false;
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
      await Axios.get(this.nodeApi + "/getAllRates", {
        headers: headers,
      }).subscribe(
        (res) => {
          this.allRates = res.data.data.one.recordset;
          //console.log(this.allRates)
        },
        (err) => console.log(err)
      );
    },
    async getAllTransactions(num) {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      await Axios.post(
        this.nodeApi + "/getFloatTransactions",
        { handover_id: num, company: this.company },
        {
          headers: headers,
        }
      ).subscribe(
        (res) => {
          this.rows = res.data.data.one.recordset;
          //console.log(this.companyData)
        },
        (err) => console.log(err)
      );
    },
    refresh() {
      this.getAllTransactions();
    },
  },
};
</script>
<style scoped>
.image {
  width: 100px;
  height: 100%;
  margin: 3px;
  margin-left: 15px;
}
.echarts {
  height: 300px;
}
.card {
  height: 90px;
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
#chip-usage-example .v-chip {
  margin: 8px;
}
</style>
