<template>
  <div>
    <v-toolbar flat color="yellow darken-3">
      <v-toolbar-title class="white--text hidden-sm-and-down"
        >Teller Refloating Page</v-toolbar-title
      >
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>

      <v-btn color="success" :disabled="disabled" @click="transferFloat">Transfer</v-btn>
    </v-toolbar>
    <v-layout row wrap>
      <v-flex xs12 lg5 mt-3 mr-4>
        <v-card hover>
          <v-toolbar flat color="blue">
            <v-toolbar-title class="white--text hidden-sm-and-down"
              >Select Refloating Data</v-toolbar-title
            >
          </v-toolbar>

          <v-flex pa-3>
            <v-combobox
              v-model="branch"
              @input="getBranchTellers"
              :items="branches"
              item-text="name"
              item-value="id"
              label="Select From Branch"
            >
              <template slot="item" slot-scope="data">
                {{ data.item.name }} {{ data.item.address }}
              </template>
            </v-combobox>

            <v-combobox
              v-model="teller"
              @input="getAllUserFloatsHistory"
              :items="tellers"
              item-text="first_name"
              item-value="id"
              label="Select To Teller"
            >
              <template slot="item" slot-scope="data">
                {{ data.item.first_name }} {{ data.item.last_name }}
              </template>
            </v-combobox>

            <v-subheader><strong>Previous Float Balances</strong></v-subheader>

            <v-flex pa-2 v-for="item in totalFloatHistory" :key="item.id">
              <v-card hover>
                <v-flex mb-2 class="card cardRev2">
                  <v-layout ma-1>
                    <img :src="image + item.image" class="image" />
                    <v-flex style="text-align: right; padding: 3px">
                      <h2>{{ item.symbol }}</h2>
                      <h3 class="h4Rev">{{ parseFloat(item.amount).toFixed(2) }}</h3>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-card>
            </v-flex>
          </v-flex>
        </v-card>
      </v-flex>

      <v-flex xs12 lg6 mt-3>
        <v-card hover>
          <v-toolbar flat color="success ">
            <v-toolbar-title class="white--text hidden-sm-and-down"
              >Edit & Verify Refloating Data : {{ branch_name }} Branch</v-toolbar-title
            >
          </v-toolbar>
          <v-flex pa-3>
            <v-data-table
              :headers="headersConfig"
              :items="branchFloats"
              :pagination.sync="pagination"
            >
              <template v-slot:items="props">
                <td>{{ props.item.iso_code }}</td>
                <td>{{ parseFloat(props.item.amount).toFixed(2) }}</td>

                <td>
                  {{ parseFloat(props.item.previous).toFixed(2) }}
                </td>

                <td class="text-xs-right">
                  <v-edit-dialog
                    :return-value.sync="props.item.current"
                    large
                    lazy
                    persistent
                    @save="save(props.item)"
                    @cancel="cancel"
                    @open="open"
                    @close="close"
                  >
                    <div>
                      <strong style="color: blue">{{
                        parseFloat(props.item.current).toFixed(2)
                      }}</strong>
                    </div>
                    <template v-slot:input>
                      <div class="mt-3 title">Update Teller Refloat</div>
                    </template>
                    <template v-slot:input>
                      <v-text-field
                        v-model="props.item.current"
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
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import Axios from "axios-observable";
export default {
  data: () => ({
    valid: true,
    nodeApi: "http://localhost:8081",
    image: "/img/",
    totalFloatHistory: [],
    headersConfig: [
      {
        text: "Currency",
        align: "left",
        sortable: false,
        value: "iso_code",
      },
      { text: "Currency Branch Float", value: "calories" },
      { text: "Previous Teller Float", value: "calories" },
      { text: "Click Row To Allocate", value: "calories" },
    ],
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    branch: null,
    branch_name: "",
    teller: null,
    select: null,
    branches: [],
    tellers: [],
    pagination: {
      sortBy: "id",
      descending: true,
      rowsPerPage: 15,
    },
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
    branchFloats: [],
    snack: false,
    snackColor: "",
    snackText: "",
    max25chars: (v) => v.length <= 25 || "Input too long!",
    disabled: true,
  }),
  mounted() {
    this.getBranches();
  },
  methods: {
    async save(val) {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },
    open() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Dialog opened";
    },
    close() {
      console.log("Dialog closed");
    },
    async getBranches() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      // console.log(headers)
      await Axios.post(
        this.nodeApi + "/getBranchFloatByCol",
        { col: "currency_id", value: 2 },
        { headers: headers }
      ).subscribe(
        (res) => {
          this.branches = res.data.data.one.recordset;
          //console.log(this.companyData)
        },
        (err) => console.log(err)
      );
    },
    async getBranchTellers() {
      this.branch_name = this.branch.name;
      // console.log(this.branch)
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      await Axios.post(
        this.nodeApi + "/getAllBranchFloatByBranch",
        { branch_id: this.branch.branch_id },
        { headers: headers }
      ).subscribe(
        (res) => {
          this.branchFloats = res.data.data.one.recordset;

          // console.log(this.branchFloats)
        },
        (err) => console.log(err)
      );

      // console.log(headers)
      await Axios.post(
        this.nodeApi + "/getUserFloatByCol4",
        {
          col: "currency_id",
          value: 2,
          col2: "branch_id",
          value2: this.branch.branch_id,
        },
        { headers: headers }
      ).subscribe(
        (res) => {
          this.tellers = res.data.data.one.recordset;
          //console.log(this.companyData)
        },
        (err) => console.log(err)
      );
    },
    async getAllUserFloatsHistory() {
      //  console.log(this.teller.user_id)
      //  console.log(this.branch.branch_id)
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };

      await Axios.post(
        this.nodeApi + "/getUserFloatByColHistory",
        { user_id: this.teller.user_id, branch_id: this.branch.branch_id },
        { headers: headers }
      ).subscribe(
        (res) => {
          this.totalFloatHistory = res.data.data.one.recordset;

          var newObj = [];
          var curr = [];

          //console.log(this.totalFloatHistory)
          this.branchFloats.forEach((element1, i) => {
            this.totalFloatHistory.forEach((element) => {
              if (element1.currency_id == element.currency_id) {
                newObj.push({
                  iso_code: element1.iso_code,
                  amount: element1.amount,
                  previous: element.amount,
                  current: element.amount,
                  currency_id: element1.currency_id,
                  user_id: this.teller.user_id,
                  branch_id: this.branch.branch_id,
                  created_by: this.$session.get("user").userdetails.id,
                });
                if (curr.indexOf(element1.iso_code) === -1) {
                  curr.push(element1.iso_code);
                  // console.log(curr);
                }
              }
            });
            if (curr.indexOf(element1.iso_code) === -1) {
              curr.push(element1.iso_code);
              // console.log(curr);
              newObj.push({
                iso_code: element1.iso_code,
                amount: element1.amount,
                previous: 0,
                current: 0,
                currency_id: element1.currency_id,
                user_id: this.teller.user_id,
                branch_id: this.branch.branch_id,
                created_by: this.$session.get("user").userdetails.id,
              });
            }

            //  this.totalFloatHistory.forEach(element => {
            //       if(element1.currency_id != element.currency_id){
            //        // newObj.push({iso_code:element1.iso_code,amount:element1.amount,previous:element.amount,current:element.amount,currency_id:element1.currency_id,user_id:this.teller.user_id,branch_id:this.branch.branch_id,created_by:this.$session.get('user').userdetails.id})
            //           newObj.push({iso_code:element1.iso_code,amount:element1.amount,previous:0,current:0,currency_id:element1.currency_id,user_id:this.teller.user_id,branch_id:this.branch.branch_id,created_by:this.$session.get('user').userdetails.id})

            //         //console.log( element.currency_id)
            //       }

            //   });

            // if(this.totalFloatHistory[i]){

            //  newObj.push({iso_code:element1.iso_code,amount:element1.amount,previous:0,current:0,currency_id:element1.currency_id,user_id:this.teller.user_id,branch_id:this.branch.branch_id,created_by:this.$session.get('user').userdetails.id})
            //  console.log(newObj)

            // }
          });
          //  console.log(newObj)
          this.updateTable(newObj);
        },
        (err) => console.log(err)
      );
    },
    updateTable(data) {
      this.branchFloats = data;
      this.disabled = false;
    },
    async transferFloat() {
      //console.log(this.branchFloats)
      var check = 0;
      this.branchFloats.forEach((element) => {
        if (element.amount < element.current) {
          check += 1;
        }
      });

      //console.log(check)
      if (check > 1) {
        this.$swal.fire({
          type: "warning",
          title: "Teller Re-Floating Error",
          text:
            "Sorry but there are " +
            check +
            " currencies that are more than what the branch has, please verify you data.",
        });
      } else if (check == 1) {
        this.$swal.fire({
          type: "warning",
          title: "Teller Re-Floating Error",
          text:
            "Sorry but there is " +
            check +
            " currency that are more than what the branch has, please verify you data.",
        });
      } else {
        let headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$session.get("user").token,
        };
        // console.log(this.totalFloat)

        if (this.branchFloats[0]) {
          let currency = this.branchFloats[0].iso_code;
          await Axios.post(
            this.nodeApi + "/updateBranchToTellerFloatQuick",
            this.branchFloats[0],
            { headers: headers }
          ).subscribe(
            (res) => {
              if (res.data.message) {
                console.log("Error for " + currency + " Message : " + res.data.message);
              }
            },
            (err) => console.log(err)
          );
        }
        if (this.branchFloats[1]) {
          let currency = this.branchFloats[1].iso_code;
          await Axios.post(
            this.nodeApi + "/updateBranchToTellerFloatQuick",
            this.branchFloats[1],
            { headers: headers }
          ).subscribe(
            (res) => {
              if (res.data.message) {
                console.log("Error for " + currency + " Message : " + res.data.message);
              }
            },
            (err) => console.log(err)
          );
        }
        if (this.branchFloats[2]) {
          let currency = this.branchFloats[2].iso_code;
          await Axios.post(
            this.nodeApi + "/updateBranchToTellerFloatQuick",
            this.branchFloats[2],
            { headers: headers }
          ).subscribe(
            (res) => {
              if (res.data.message) {
                console.log("Error for " + currency + " Message : " + res.data.message);
              }
            },
            (err) => console.log(err)
          );
        }
        if (this.branchFloats[3]) {
          let currency = this.branchFloats[3].iso_code;
          await Axios.post(
            this.nodeApi + "/updateBranchToTellerFloatQuick",
            this.branchFloats[3],
            { headers: headers }
          ).subscribe(
            (res) => {
              if (res.data.message) {
                console.log("Error for " + currency + " Message : " + res.data.message);
              }
            },
            (err) => console.log(err)
          );
        }
        if (this.branchFloats[4]) {
          let currency = this.branchFloats[4].iso_code;
          await Axios.post(
            this.nodeApi + "/updateBranchToTellerFloatQuick",
            this.branchFloats[4],
            { headers: headers }
          ).subscribe(
            (res) => {
              if (res.data.message) {
                console.log("Error for " + currency + " Message : " + res.data.message);
              }
            },
            (err) => console.log(err)
          );
        }
        if (this.branchFloats[5]) {
          let currency = this.branchFloats[5].iso_code;
          await Axios.post(
            this.nodeApi + "/updateBranchToTellerFloatQuick",
            this.branchFloats[5],
            { headers: headers }
          ).subscribe(
            (res) => {
              if (res.data.message) {
                console.log("Error for " + currency + " Message : " + res.data.message);
              }
            },
            (err) => console.log(err)
          );
        }
        if (this.branchFloats[6]) {
          let currency = this.branchFloats[6].iso_code;
          await Axios.post(
            this.nodeApi + "/updateBranchToTellerFloatQuick",
            this.branchFloats[6],
            { headers: headers }
          ).subscribe(
            (res) => {
              if (res.data.message) {
                console.log("Error for " + currency + " Message : " + res.data.message);
              }
            },
            (err) => console.log(err)
          );
        }

        if (this.branchFloats[7]) {
          let currency = this.branchFloats[7].iso_code;
          await Axios.post(
            this.nodeApi + "/updateBranchToTellerFloatQuick",
            this.branchFloats[7],
            { headers: headers }
          ).subscribe(
            (res) => {
              if (res.data.message) {
                console.log("Error for " + currency + " Message : " + res.data.message);
              }
            },
            (err) => console.log(err)
          );
        }

        if (this.branchFloats[8]) {
          let currency = this.branchFloats[7].iso_code;
          await Axios.post(
            this.nodeApi + "/updateBranchToTellerFloatQuick",
            this.branchFloats[7],
            { headers: headers }
          ).subscribe(
            (res) => {
              if (res.data.message) {
                console.log("Error for " + currency + " Message : " + res.data.message);
              }
            },
            (err) => console.log(err)
          );
        }

        if (this.branchFloats[9]) {
          let currency = this.branchFloats[7].iso_code;
          await Axios.post(
            this.nodeApi + "/updateBranchToTellerFloatQuick",
            this.branchFloats[7],
            { headers: headers }
          ).subscribe(
            (res) => {
              if (res.data.message) {
                console.log("Error for " + currency + " Message : " + res.data.message);
              }
            },
            (err) => console.log(err)
          );
        }

        await this.clearTransfer();
      }
    },
    async clearTransfer() {
      this.$swal.fire({
        type: "success",
        title: "Teller Re-Floating",
        text: "You have successfully re-floated you teller",
      });

      this.branch_name = "";
      this.branchFloats = [];
      this.totalFloatHistory = [];
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>
<style scoped>
.image {
  width: 60px;
  height: 100%;
  margin: 3px;
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
