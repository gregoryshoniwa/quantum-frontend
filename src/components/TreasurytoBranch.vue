<template>
  <div>
    <v-toolbar flat color="yellow darken-3">
      <v-toolbar-title class="white--text"
        >Treasury To Branch Float Movement</v-toolbar-title
      >
      <v-divider class="mx-2" inset vertical></v-divider>
      <span class="white--text" style="font-size: 20px"
        >Treasury float is : {{ symbol }} {{ parseFloat(amount).toFixed(2) }}</span
      >
      <v-spacer></v-spacer>

      <v-btn color="error" @click="backstep">Back</v-btn>
      <v-btn v-if="e1 != 4" color="primary" @click="nextstep">Next</v-btn>
      <v-btn v-if="e1 == 4" color="success" @click="transferFloat">Transfer</v-btn>
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
          label="Select Currency"
        >
          <template slot="item" slot-scope="data">
            <v-avatar left tile>
              <img
                :src="image + data.item.image"
                style="max-width: 100px; height: auto; margin-right: 30px; padding: 5px"
              />
            </v-avatar>
            {{ data.item.iso_code }}
          </template>
        </v-combobox>
      </v-flex>

      <v-flex md3>
        <v-combobox
          v-if="e1 == 2"
          v-model="selectedtobranch"
          @input="frombranchSelected"
          :items="branchdata"
          item-text="name"
          item-value="id"
          label="Select To Branch"
        >
          <template slot="item" slot-scope="data">
            {{ data.item.name }}
          </template>
        </v-combobox>
      </v-flex>

      <v-flex md3>
        <v-text-field
          v-if="e1 == 3"
          v-model="treasurytobranchData.amount"
          prepend-icon="monetization_on"
          label="Transfer Amount"
          single-line
          hide-details
          type="number"
          style="margin: 5px"
        ></v-text-field>
      </v-flex>
    </v-layout>

    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step editable :complete="e1 > 1" step="1"
          >Selecting Movement Currency</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step editable :complete="e1 > 2" step="2"
          >Selecting From Float Data</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step editable :complete="e1 > 3" step="3"
          >Inputting Transfer Amount</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step editable step="4">Confirming Transfer</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1"> </v-stepper-content>

        <v-stepper-content step="2"> </v-stepper-content>

        <v-stepper-content step="3"> </v-stepper-content>

        <v-stepper-content step="4"> </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

    <v-layout row wrap v-if="e1 == 4" justify-center>
      <v-flex md3 pa-5>
        <v-card color="#385F73" dark hover height="140px">
          <v-card-text class="white--text">
            <img
              :src="image + selectedcurrency.image"
              style="max-width: 100px; height: auto; margin-right: 60px; padding: 5px"
            />
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex md3 pa-5>
        <v-card color="#385F73" dark hover height="140px">
          <v-card-text class="white--text">
            <div class="headline mb-2">Moving From</div>
            Treasury Department
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex md3 pa-5>
        <v-card color="#385F73" dark hover height="140px">
          <v-card-text class="white--text">
            <div class="headline mb-2">Moving To</div>

            {{ selectedtobranch.name }}
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex md3 pa-5>
        <v-card color="#385F73" dark hover height="140px">
          <v-card-text class="white--text justify-center">
            <div class="headline mb-2">Float Amount</div>
            {{ parseFloat(treasurytobranchData.amount).toFixed(2) }}
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
import Axios from "axios-observable";

export default {
  data() {
    return {
      e1: 0,
      // nodeApi: '',
      nodeApi: "",
      image: "/img/",
      selected: "",
      symbol: "",
      amount: null,
      selectedcurrency: "",
      dialogloader: false,
      selectedtobranch: "",
      treasurydata: [],
      selectedtotreasury: "",
      userdata: [],
      branchdata: [],
      treasurytobranchDataClear: {
        amount: 0,
        branch_id: null,
        user_id: null,
        currency_id: null,
        handover_type: 1,
        created_by: 0,
      },
      treasurytobranchData: {
        amount: 0,
        branch_id: null,
        user_id: null,
        currency_id: null,
        handover_type: 1,
        created_by: 0,
      },
      currencies: [],
    };
  },
  watch: {
    e1(val) {
      // console.log(val)
    },
  },
  mounted() {
    this.e1 = 0;
    this.getActiveCurrencies();
  },
  methods: {
    currencySelected() {
      this.treasurytobranchData.currency_id = this.selectedcurrency.id;
      this.treasurytobranchData.created_by = this.$session.get("user").userdetails.id;
      this.getTreasuryFloatbyCurrency();
      this.getBranchFloatbyCurrency();
    },
    frombranchSelected() {
      this.treasurytobranchData.branch_id = this.selectedtobranch.branch_id;

      //console.log(this.selectedfromuser)
    },

    getBranchFloatbyCurrency() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      // console.log(headers)
      Axios.post(
        this.nodeApi + "/getBranchFloatByCol",
        { col: "currency_id", value: this.treasurytobranchData.currency_id },
        { headers: headers }
      ).subscribe(
        (res) => {
          this.branchdata = res.data.data.one.recordset;
          //console.log(this.companyData)
        },
        (err) => console.log(err)
      );
    },
    async getTreasuryFloatbyCurrency() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      // console.log(headers)
      await Axios.post(
        this.nodeApi + "/getTreasuryFloatByCol",
        { col: "currency_id", value: this.treasurytobranchData.currency_id },
        { headers: headers }
      ).subscribe(
        (res) => {
          this.treasurydata = res.data.data.one.recordset;
          this.amount = this.treasurydata[0].amount;
          this.symbol = this.treasurydata[0].symbol;
          //console.log(this.companyData)
        },
        (err) => console.log(err)
      );
    },
    transferFloat() {
      if (!this.treasurytobranchData.currency_id) {
        this.$swal.fire({
          type: "error",
          title: "Transfer Failed",
          text: "Please enter a currency",
        });
      } else if (!this.treasurytobranchData.branch_id) {
        this.$swal.fire({
          type: "error",
          title: "Transfer Failed",
          text: "Please enter a receiving user float account",
        });
      } else if (!this.treasurytobranchData.amount) {
        this.$swal.fire({
          type: "error",
          title: "Transfer Failed",
          text: "Please enter a transfer amount",
        });
      } else if (this.treasurytobranchData.amount <= 0) {
        this.$swal.fire({
          type: "error",
          title: "Transfer Failed",
          text: "Please enter a transfer amount greater than 0",
        });
      } else if (this.treasurytobranchData.amount > this.amount) {
        this.$swal.fire({
          type: "error",
          title: "Transfer Failed",
          text: "Amount more than disbursement account",
        });
      } else {
        this.dialogloader = true;
        let headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$session.get("user").token,
        };

        Axios.post(
          this.nodeApi + "/updateTreasuryToBranchFloat",
          this.treasurytobranchData,
          { headers: headers }
        ).subscribe(
          (res) => {
            // console.log(res.data.data.one.recordset)
            if (res.data.data.one.recordset) {
              this.dialogloader = false;
              this.treasurytobranchData = this.treasurytobranchDataClear;
              (this.selectedcurrency = ""), (this.symbol = ""), (this.amount = null);
              (this.selectedtobranch = ""), (this.selectedtotreasury = ""), (this.e1 = 1);
              this.$swal.fire({
                type: "success",
                title: "Transfer Successful",
                text: "Your transfer was updated successfully",
              });
            } else {
              this.$swal.fire({
                type: "error",
                title: "Transfer Failed",
                text: res.data.message,
              });
            }
          },
          (err) => console.log(err)
        );
      }
    },
    nextstep() {
      if (this.e1 < 4) {
        this.e1 = parseInt(this.e1) + 1;
      }
    },
    backstep() {
      if (this.e1 > 1) {
        this.e1 -= 1;
      }
    },

    getActiveCurrencies() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      // console.log(headers)
      Axios.get(this.nodeApi + "/getAllCurrenciesActive", { headers: headers }).subscribe(
        (res) => {
          this.currencies = res.data.data.one.recordset;
          //console.log(this.companyData)
        },
        (err) => console.log(err)
      );
    },
  },
};
</script>
<style scoped></style>
