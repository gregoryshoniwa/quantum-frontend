<template>
  <div>
    <v-toolbar flat color="yellow darken-3">
      <v-toolbar-title class="white--text hidden-sm-and-down"
        >{{ userTypeTitle }} Floating Page</v-toolbar-title
      >
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-layout row wrap>
      <v-flex xs12 lg3 mt-3 mr-4>
        <v-card hover>
          <v-toolbar flat color="blue">
            <v-toolbar-title class="white--text hidden-sm-and-down"
              >Enter Floating Data</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-btn color="red" :disabled="disabled" dark @click="saveFloatMovement"
              >Save</v-btn
            >
          </v-toolbar>

          <v-flex pa-3>
            <v-combobox
              v-if="userType != 2"
              :disabled="disabled"
              v-model="branch"
              @input="getBranchTellers"
              :items="branches"
              item-text="name"
              item-value="id"
              label="Select From Branch"
            >
            </v-combobox>
            <v-combobox
              v-if="userType != 2"
              v-model="teller"
              :disabled="disabled"
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

            <v-combobox
              v-if="userType == 2"
              v-model="selectFloatAccount"
              :disabled="disabled"
              :items="tellerFloat"
              item-text="symbol"
              label="Select To Teller Float"
            >
              <template slot="item" slot-scope="data">
                {{ data.item.symbol }}

                <v-chip class="ma-2" color="green" text-color="white">
                  {{ parseFloat(data.item.amount).toFixed(2) }}
                </v-chip>
              </template>
            </v-combobox>

            <v-combobox
              v-if="userType != 2"
              v-model="selectFloatAccount"
              :disabled="disabled"
              :items="treasuryFloat"
              item-text="symbol"
              label="Select Treasury Account"
            >
              <template slot="item" slot-scope="data">
                {{ data.item.symbol }}

                <v-chip class="ma-2" color="green" text-color="white">
                  {{ parseFloat(data.item.amount).toFixed(2) }}
                </v-chip>
              </template>
            </v-combobox>

            <v-text-field
              :disabled="disabled"
              v-model="floatAmount"
              label="Enter Float Amount"
            ></v-text-field>
          </v-flex>
        </v-card>
      </v-flex>

      <v-flex xs12 lg8 mt-3>
        <v-card hover>
          <v-toolbar flat color="success">
            <v-toolbar-title class="white--text hidden-sm-and-down"
              >Float Movement Approval/Acceptence</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <!-- <v-btn color="red" v-if="userType == 6" dark @click="openDialogApproveAll">Approval All</v-btn>
                         <v-btn color="red" v-if="userType != 6" dark @click="openDialogAcceptAll">Accept All</v-btn> -->
          </v-toolbar>
          <v-flex>
            <v-data-table
              :headers="headersConfig"
              :items="floatMovementData"
              :pagination.sync="pagination"
            >
              <template v-slot:items="props">
                <td>{{ new Date(props.item.createdAt).toLocaleString("en-GB") }}</td>
                <td>{{ props.item.symbol }}</td>
                <td>{{ parseFloat(props.item.amount).toFixed(2) }}</td>

                <td>{{ props.item.from_branch_name }} : {{ props.item.from_user }}</td>

                <td>{{ props.item.to_branch_name }} : {{ props.item.to_user }}</td>

                <td v-if="props.item.approvalStatus == 11 && userType == 6">
                  <v-chip
                    class="ma-2"
                    color="red"
                    text-color="white"
                    @click="openDialogApprove(props.item)"
                  >
                    <v-avatar left>
                      <v-icon>check_circle_outline</v-icon>
                    </v-avatar>
                    From Treasury Approve
                  </v-chip>
                </td>
                <td v-if="props.item.approvalStatus == 12 && userType == 2">
                  <v-chip
                    class="ma-2"
                    color="green"
                    text-color="white"
                    @click="openDialogAccept(props.item)"
                  >
                    <v-avatar left>
                      <v-icon>check_circle_outline</v-icon>
                    </v-avatar>
                    From Treasury Accept
                  </v-chip>
                </td>

                <td v-if="props.item.approvalStatus == 14 && userType == 6">
                  <v-chip
                    class="ma-2"
                    color="orange"
                    text-color="white"
                    @click="openDialogApprove(props.item)"
                  >
                    <v-avatar left>
                      <v-icon>check_circle_outline</v-icon>
                    </v-avatar>
                    From Teller Approve
                  </v-chip>
                </td>
                <td v-if="props.item.approvalStatus == 15 && userType == 5">
                  <v-chip
                    class="ma-2"
                    color="purple"
                    text-color="white"
                    @click="openDialogAccept(props.item)"
                  >
                    <v-avatar left>
                      <v-icon>check_circle_outline</v-icon>
                    </v-avatar>
                    From Teller Accept
                  </v-chip>
                </td>
                <td v-if="props.item.approvalStatus == 15 && userType == 4">
                  <v-chip
                    class="ma-2"
                    color="purple"
                    text-color="white"
                    @click="openDialogAccept(props.item)"
                  >
                    <v-avatar left>
                      <v-icon>check_circle_outline</v-icon>
                    </v-avatar>
                    From Teller Accept
                  </v-chip>
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

    <v-dialog v-model="dialogAcceptConfirm" persistent max-width="400px">
      <v-card class="mx-auto">
        <v-card-title class="green darken-2 white--text">
          <span class="headline">Move Float Confirmation</span>
        </v-card-title>

        <v-layout>
          <v-flex xs12 pa-3>
            <v-text-field
              style="text-align: center"
              @keyup.enter="acceptFloat"
              v-model="userPIN"
              autofocus
              loading
              type="number"
              label="Please enter user pin"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-spacer></v-spacer>
        <v-btn color="red" class="white--text" @click="dialogAcceptConfirm = false"
          >Close</v-btn
        >
        <v-btn color="green" class="white--text" @click="acceptFloat">Save</v-btn>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogApproveConfirm" persistent max-width="400px">
      <v-card class="mx-auto">
        <v-card-title class="green darken-2 white--text">
          <span class="headline">Approve Float Confirmation</span>
        </v-card-title>

        <v-layout>
          <v-flex xs12 pa-3>
            <v-text-field
              style="text-align: center"
              @keyup.enter="approveFloat"
              v-model="userPIN"
              autofocus
              loading
              type="number"
              label="Please enter you user pin"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-spacer></v-spacer>
        <v-btn color="red" class="white--text" @click="dialogApproveConfirm = false"
          >Close</v-btn
        >
        <v-btn color="green" class="white--text" @click="approveFloat">Save</v-btn>
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
import Axios from "axios-observable";
export default {
  data: () => ({
    valid: true,
    acceptAll: false,
    approveAll: false,
    dialogloader: false,
    userPIN: "",
    dialogApproveConfirm: false,
    dialogAcceptConfirm: false,
    pagination: {
      sortBy: "createdAt",
      descending: true,
      rowsPerPage: 15,
    },
    floatAmount: null,
    nodeApi: "http://localhost:8081",
    image: "/img/",
    totalFloatHistory: [],
    userTypeTitle: "",
    headersConfig: [
      { text: "Date", value: "calories" },
      {
        text: "Currency",
        align: "left",
        sortable: false,
        value: "iso_code",
      },
      { text: "Float Amount", value: "calories" },
      { text: "Movement From", value: "calories" },
      { text: "Movement To", value: "calories" },
      { text: "Action", value: "calories" },
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
    selectFloatAccount: null,
    select: null,
    branches: [],
    tellers: [],

    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
    branchFloats: [],
    snack: false,
    snackColor: "",
    snackText: "",
    max25chars: (v) => v.length <= 25 || "Input too long!",
    disabled: true,
    treasuryFloat: [],
    treasuryFloatObj: {
      from_branch_id: "",
      to_user_id: "",
      to_branch_id: "",
      from_user_id: "",
      currency_id: "",
      amount: 0,
    },
    floatBalance: 0,
    floatMovementData: [],
    tellerFloat: [],
    userType: null,
    selectedFloatData: null,
  }),
  mounted() {
    this.userType = this.$session.get("user").userdetails.user_type;

    this.getTreasuryFloats();
    this.getTellerFloats();
    this.getBranches();
    this.getFloatMovementData();
    if (this.userType == 6) {
      this.userTypeTitle = "Supervisor Approval";
    }
    if (this.userType == 2) {
      this.userTypeTitle = "Teller Float Movement";
      this.disabled = false;
    }
    if (this.userType == 4) {
      this.userTypeTitle = "Manager Float Movement";
      this.disabled = false;
    }
    if (this.userType == 5) {
      this.userTypeTitle = "Treasury Float Movement";
      this.disabled = false;
    }
    //  console.log(this.userType)
  },
  watch: {
    selectFloatAccount(val) {
      if (val) {
        this.floatBalance = val.amount;
      }

      // console.log(val)
    },
    dialogAcceptConfirm(val) {
      if (!val) {
        this.acceptAll = false;
      }
    },
    dialogApproveConfirm(val) {
      if (!val) {
        this.approveAll = false;
      }
    },
  },
  methods: {
    openDialogApprove(floatdata) {
      this.selectedFloatData = floatdata;
      this.dialogApproveConfirm = true;
      //  console.log(data)
    },
    openDialogApproveAll() {
      this.selectedFloatData = this.floatMovementData[0];
      this.dialogApproveConfirm = true;
      this.approveAll = true;
      //  console.log(data)
    },
    openDialogAccept(floatdata) {
      this.selectedFloatData = floatdata;
      this.dialogAcceptConfirm = true;
      // console.log(data)
    },
    openDialogAcceptAll() {
      this.selectedFloatData = this.floatMovementData[0];
      this.dialogAcceptConfirm = true;
      this.acceptAll = true;
      // console.log(data)
    },
    async approveFloat() {
      this.dialogloader = true;
      let endpoint = "";
      if (this.approveAll) {
        endpoint = "/updateFloatMovementAll";
      } else {
        endpoint = "/updateFloatMovement";
      }
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      await Axios.post(
        this.nodeApi + "/checkPin",
        { id: this.$session.get("user").userdetails.id, pin: this.userPIN },
        {
          headers: headers,
        }
      ).subscribe(
        (res) => {
          if (res.data.data.one.recordset) {
            let _this = this;
            Axios.post(
              this.nodeApi + endpoint,
              {
                approvalStatus: this.selectedFloatData.approvalStatus + 1,
                approvalStatus1: this.selectedFloatData.approvalStatus,
                createdBy: this.$session.get("user").userdetails.id,
                id: this.selectedFloatData.id,
              },
              {
                headers: headers,
              }
            ).subscribe(
              (res) => {
                if (res.data.data.one) {
                  _this.dialogApproveConfirm = false;
                  _this.userPIN = "";
                  _this.dialogloader = false;
                  _this.selectFloatAccount = "";
                  _this.branch = "";
                  _this.teller = "";
                  _this.floatAmount = "";
                  _this.acceptAll = false;
                  _this.approveAll = false;
                  _this.getFloatMovementData();
                  _this.$swal.fire({
                    type: "success",
                    title: "Record Approved",
                    text: "Float Movement Approved successfully",
                  });
                } else {
                  _this.dialogloader = false;
                  _this.$swal.fire({
                    type: "error",
                    title: "Record Approve Failed",
                    text: res.data.message,
                  });
                }
              },
              (err) => {
                _this.dialogloader = false;
                _this.$swal.fire("Record Approved Failed", err, "error");
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
    },
    async acceptFloat() {
      this.dialogloader = true;
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      await Axios.post(
        this.nodeApi + "/checkPin",
        { id: this.$session.get("user").userdetails.id, pin: this.userPIN },
        {
          headers: headers,
        }
      ).subscribe(
        (res) => {
          if (res.data.data.one.recordset) {
            let _this = this;
            Axios.post(
              this.nodeApi + "/updateFloatMovement",
              {
                approvalStatus: this.selectedFloatData.approvalStatus + 1,
                id: this.selectedFloatData.id,
              },
              {
                headers: headers,
              }
            ).subscribe(
              (res) => {
                if (res.data.data.one.recordset) {
                  _this.dialogAcceptConfirm = false;
                  _this.userPIN = "";

                  _this.selectFloatAccount = "";
                  _this.branch = "";
                  _this.teller = "";
                  _this.floatAmount = "";
                  _this.movementFloat();
                  //this.movementFloat()
                } else {
                  _this.dialogloader = false;
                  _this.$swal.fire({
                    type: "error",
                    title: "Float Accepted Failed",
                    text: res.data.message,
                  });
                }
              },
              (err) => {
                _this.dialogloader = false;
                _this.$swal.fire("Float Accepted Failed", err, "error");
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
    },
    async movementFloat() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      let data = {};
      if (this.userType == 2) {
        data = {
          amount: this.selectedFloatData.amount,
          currency_id: this.selectedFloatData.currency_id,
          branch_id: this.$session.get("user").userdetails.branch_id,
          user_id: this.$session.get("user").userdetails.id,
          user_type: this.userType,
        };
      } else {
        data = {
          amount: this.selectedFloatData.amount,
          currency_id: this.selectedFloatData.currency_id,
          branch_id: this.selectedFloatData.from_branch_id,
          user_id: this.selectedFloatData.from_user_id,
          user_type: this.userType,
          created_by: this.$session.get("user").userdetails.id,
        };
      }

      await Axios.post(this.nodeApi + "/floatMovementUpdate", data, {
        headers: headers,
      }).subscribe(
        (res) => {
          if (res.data.message) {
            this.$swal.fire("Float Hand-Over Error", res.data.message, "error");
            this.dialogloader = false;
          } else {
            // console.log(res.data)
            this.selectFloatAccount = "";
            this.branch = "";
            this.teller = "";
            this.floatAmount = "";
            this.$swal.fire({
              type: "success",
              title: "Float Hand-Over successful",
              text: "You have successfully received float.",
            });

            this.getTreasuryFloats();
            this.getTellerFloats();
            this.getBranches();

            this.getFloatMovementData();
            this.dialogloader = false;
          }
        },
        (err) => {
          console.log(err);
          this.dialogloader = false;
        }
      );
    },
    async saveFloatMovement() {
      // console.log(this.teller)
      if (this.userType == 2) {
        this.treasuryFloatObj.amount = this.floatAmount;
        this.treasuryFloatObj.currency_id = this.selectFloatAccount.currency_id;
        this.treasuryFloatObj.to_branch_id = "1";
        this.treasuryFloatObj.to_user_id = "210";
        this.treasuryFloatObj.from_branch_id = this.$session.get(
          "user"
        ).userdetails.branch_id;
        this.treasuryFloatObj.from_user_id = this.$session.get("user").userdetails.id;
        this.treasuryFloatObj.created_by = this.$session.get("user").userdetails.id;
        this.treasuryFloatObj.approvalStatus = 14;
      } else {
        this.treasuryFloatObj.amount = this.floatAmount;
        this.treasuryFloatObj.currency_id = this.selectFloatAccount.currency_id;
        this.treasuryFloatObj.to_branch_id = this.branch.branch_id;
        this.treasuryFloatObj.to_user_id = this.teller.user_id;
        this.treasuryFloatObj.from_branch_id = "1";
        this.treasuryFloatObj.from_user_id = this.$session.get("user").userdetails.id;
        this.treasuryFloatObj.created_by = this.$session.get("user").userdetails.id;
        this.treasuryFloatObj.approvalStatus = 11;
      }

      if (this.treasuryFloatObj.amount > this.floatBalance) {
        this.$swal.fire({
          type: "warning",
          title: "Teller Re-Floating Error",
          text:
            "Sorry but you entered an amount greater that your currency treasury/Teller Float balance.",
        });
      } else {
        console.log(this.treasuryFloatObj);

        let headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$session.get("user").token,
        };
        // console.log(headers)
        await Axios.post(this.nodeApi + "/addTreasuryToTeller", this.treasuryFloatObj, {
          headers: headers,
        }).subscribe(
          (res) => {
            if (res.data.message) {
              this.$swal.fire("Teller Re-Floating Error", res.data.message, "error");
            } else {
              // console.log(res.data)
              this.selectFloatAccount = "";
              this.branch = "";
              this.teller = "";
              this.floatAmount = "";
              this.$swal.fire({
                type: "success",
                title: "Teller Re-Floating successful",
                text: "You have successfully send float to a teller pending approval.",
              });
              this.getFloatMovementData();
            }
          },
          (err) => {
            console.log(err);
          }
        );
      }
    },
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
    async getTreasuryFloats() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      // console.log(headers)
      await Axios.get(this.nodeApi + "/getAllTreasuryFloat", {
        headers: headers,
      }).subscribe(
        (res) => {
          this.treasuryFloat = res.data.data.one.recordset;
          // console.log(this.treasuryFloat)
        },
        (err) => console.log(err)
      );
    },
    async getTellerFloats() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      // console.log(headers)
      await Axios.post(
        this.nodeApi + "/getAllTellerFloat",
        { user_id: this.$session.get("user").userdetails.id },
        { headers: headers }
      ).subscribe(
        (res) => {
          this.tellerFloat = res.data.data.one.recordset;
          // console.log(this.treasuryFloat)
        },
        (err) => console.log(err)
      );
    },
    async getFloatMovementData() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      // console.log(headers)
      await Axios.post(
        this.nodeApi + "/getFloatMovement",
        { user_type: this.userType },
        { headers: headers }
      ).subscribe(
        (res) => {
          this.floatMovementData = res.data.data.one.recordset;
          // console.log(this.treasuryFloat)
        },
        (err) => console.log(err)
      );
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
