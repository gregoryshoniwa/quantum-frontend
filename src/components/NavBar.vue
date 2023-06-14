<template>
  <div>
    <v-toolbar dark color="#2D2D2D">
      <v-spacer></v-spacer>

      <!-- <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon @click="SelectedMenu('approval-page')" style="margin-left: 23px">
            <v-badge overlap color="red">
              <template v-slot:badge>
                <span>{{ approvalsCounter }}</span>
              </template>
              <v-icon v-on="on" medium class="white--text"> notifications </v-icon>
            </v-badge>
          </v-btn>
        </template>
        <span>Approval List</span>
      </v-tooltip> -->

      <v-tooltip bottom v-for="item in items" :key="item.title">
        <template v-slot:activator="{ on }">
          <v-btn icon class="white--text" @click="SelectedMenu(item.title)">
            <v-icon medium class="white--text" v-on="on">{{ item.icon }}</v-icon>
          </v-btn>
        </template>
        <span>{{ item.tooltip }}</span>
      </v-tooltip>
    </v-toolbar>

    <v-dialog v-model="dialogAddBranch" max-width="400px">
      <v-card>
        <v-card-title class="yellow darken-2 white--text">
          <span class="headline">Security Change Form</span>
          <v-spacer></v-spacer>
        </v-card-title>

        <v-tabs color="yellow darken-4" slider-color="white">
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
            <v-btn color="#ECB530" class="white--text" @click="AddPassword">Save</v-btn>
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
            <v-btn color="#ECB530" class="white--text" @click="updatePin">Save</v-btn>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import Axios from "axios-observable";
import Password from "vue-password-strength-meter";
//var bus = new Vue({});
export default {
  components: { Password },

  data: () => ({
    drawer: true,
    dialogAddBranch: false,
    nodeApi: "",
    //nodeApi: '',
    fixed: true,
    pin: "",
    pinold: "",
    passwordold: "",
    pinconfirm: "",
    approvalsCounter: 0,
    approvallist: [],
    permanent: true,
    newPassword: "",
    confirm: "",
    score: 0,
    mini: true,
    user_type: 0,
    right: null,
    intervalid: "",
  }),
  mounted() {
    this.user_type = this.$session.get("user").userdetails.user_type;
    // if(this.user_type){
    //    this.intervalid = setInterval(() => {
    //   if(this.user_type == 2){
    //     this.getApprovalsClose()
    //   }
    //   else if(this.user_type == 3){
    //     this.getApprovalsSP()
    //   }
    //   else if(this.user_type == 4){
    //     this.getApprovalsGM()
    //   }
    //   else if(this.user_type == 5){
    //     this.getApprovalsTR()
    //   }
    //   }, 5000);
    // }else{
    //   clearInterval(this.intervalid)
    // }
    this.SelectedMenu("market-page");
  },
  computed: {
    items() {
      if (this.user_type == 1) {
        let items = [
          { title: "market-page", icon: "dashboard", tooltip: "Dashboard" },
          { title: "overall-page", icon: "equalizer", tooltip: "Transactions" },
          // { title: "overall_utility-page", icon: "sort", tooltip: "Utilities" },
          // { title: "overall_world-page", icon: "language", tooltip: "WorldRemit" },
          // { title: "contisend-page", icon: "sync_alt", tooltip: "ConitSend" },
          // { title: "booking_admin-page", icon: "how_to_reg", tooltip: "Booking Admin" },
          { title: "exchange-page", icon: "supervised_user_circle", tooltip: "Clients" },
          { title: "profile-page", icon: "account_circle", tooltip: "Users" },
          { title: "rates-page", icon: "monetization_on", tooltip: "Rates" },
          { title: "branch-page", icon: "account_balance", tooltip: "Branches" },
          {
            title: "floatmove-page",
            icon: "swap_vertical_circle",
            tooltip: "Float Movement Report",
          },
          {
            title: "support-page",
            icon: "compare_arrows",
            tooltip: "Float Movement Admin",
          },
          { title: "Password", icon: "https", tooltip: "Password Change" },
          { title: "Exit", icon: "exit_to_app", tooltip: "Logout" },
        ];
        return items;
      }
      if (this.user_type == 2) {
        let items = [
          { title: "market-page", icon: "dashboard", tooltip: "Dashboard" },

          // { title: 'exchange-page', icon: 'supervised_user_circle',tooltip: 'Clients' },

          {
            title: "support-page",
            icon: "compare_arrows",
            tooltip: "Float Movement Admin",
          },
          { title: "Password", icon: "https", tooltip: "Password Change" },
          { title: "Exit", icon: "exit_to_app", tooltip: "Logout" },
        ];
        return items;
      }
      if (this.user_type == 3) {
        let items = [
          { title: "market-page", icon: "dashboard", tooltip: "Dashboard" },
          { title: "dashboard-page", icon: "equalizer", tooltip: "Transactions" },
          //{ title: 'exchange-page', icon: 'supervised_user_circle',tooltip: 'Clients' },

          {
            title: "support-page",
            icon: "compare_arrows",
            tooltip: "Float Movement Admin",
          },
          { title: "Password", icon: "https", tooltip: "Password Change" },
          { title: "Exit", icon: "exit_to_app", tooltip: "Logout" },
        ];
        return items;
      }
      if (this.user_type == 4) {
        let items = [
          { title: "market-page", icon: "dashboard", tooltip: "Dashboard" },
          { title: "overall-page", icon: "equalizer", tooltip: "Transactions" },
          // { title: "overall_utility-page", icon: "sort", tooltip: "Utilities" },
          // { title: "overall_world-page", icon: "language", tooltip: "WorldRemit" },
          // { title: "contisend-page", icon: "sync_alt", tooltip: "ConitSend" },
          // { title: "booking_admin-page", icon: "how_to_reg", tooltip: "Booking Admin" },
          { title: "exchange-page", icon: "supervised_user_circle", tooltip: "Clients" },
          { title: "profile-page", icon: "account_circle", tooltip: "Users" },
          { title: "rates-page", icon: "monetization_on", tooltip: "Rates" },
          { title: "branch-page", icon: "account_balance", tooltip: "Branches" },
          {
            title: "floatmove-page",
            icon: "swap_vertical_circle",
            tooltip: "Float Movement Report",
          },
          {
            title: "support-page",
            icon: "compare_arrows",
            tooltip: "Float Movement Admin",
          },
          { title: "Password", icon: "https", tooltip: "Password Change" },
          { title: "Exit", icon: "exit_to_app", tooltip: "Logout" },
        ];
        return items;
      }
      if (this.user_type == 5) {
        let items = [
          { title: "market-page", icon: "dashboard", tooltip: "Dashboard" },
          { title: "overall-page", icon: "equalizer", tooltip: "Transactions" },
          // { title: "overall_utility-page", icon: "sort", tooltip: "Utilities" },
          // { title: "overall_world-page", icon: "language", tooltip: "WorldRemit" },
          // { title: "contisend-page", icon: "sync_alt", tooltip: "ConitSend" },
          // { title: "booking_admin-page", icon: "how_to_reg", tooltip: "Booking Admin" },
          { title: "exchange-page", icon: "supervised_user_circle", tooltip: "Clients" },
          { title: "profile-page", icon: "account_circle", tooltip: "Users" },
          { title: "rates-page", icon: "monetization_on", tooltip: "Rates" },
          { title: "branch-page", icon: "account_balance", tooltip: "Branches" },
          {
            title: "floatmove-page",
            icon: "swap_vertical_circle",
            tooltip: "Float Movement Report",
          },
          {
            title: "support-page",
            icon: "compare_arrows",
            tooltip: "Float Movement Admin",
          },
          { title: "Password", icon: "https", tooltip: "Password Change" },
          { title: "Exit", icon: "exit_to_app", tooltip: "Logout" },
        ];
        return items;
      }
      if (this.user_type == 6) {
        let items = [
          { title: "market-page", icon: "dashboard", tooltip: "Dashboard" },
          { title: "overall-page", icon: "equalizer", tooltip: "Transactions" },
          // { title: "overall_utility-page", icon: "sort", tooltip: "Utilities" },
          // { title: "overall_world-page", icon: "language", tooltip: "WorldRemit" },
          // { title: "contisend-page", icon: "sync_alt", tooltip: "ConitSend" },
          // { title: "booking_admin-page", icon: "how_to_reg", tooltip: "Booking Admin" },
          // { title: 'exchange-page', icon: 'supervised_user_circle',tooltip: 'Clients' },
          // { title: 'profile-page', icon: 'account_circle',tooltip: 'Users' },
          // { title: 'rates-page', icon: 'monetization_on',tooltip: 'Rates' },
          // { title: 'reports-page', icon: 'account_balance',tooltip: 'Branches' },
          {
            title: "floatmove-page",
            icon: "swap_vertical_circle",
            tooltip: "Float Movement Report",
          },
          {
            title: "support-page",
            icon: "compare_arrows",
            tooltip: "Float Movement Admin",
          },
          { title: "Password", icon: "https", tooltip: "Password Change" },
          { title: "Exit", icon: "exit_to_app", tooltip: "Logout" },
        ];
        return items;
      }
    },
  },
  watch: {
    score(val) {
      //console.log(val)
    },
    pin(val) {
      console.log(val);
    },
    dialogAddBranch(val) {
      if (val) {
      } else {
        this.pinold = "";
        (this.passwordold = ""), (this.newPassword = ""), (this.pin = "");
      }
    },
  },
  methods: {
    approvalData(data) {
      //bus.$emit('ApprovalData', data)
      //this.$emit('ApprovalData', data)
    },
    getApprovalsClose() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };

      Axios.post(
        this.nodeApi + "/getTransactionsByColUserApprovalsClose",
        { user_id: this.$session.get("user").userdetails.id },
        { headers: headers }
      ).subscribe(
        (res) => {
          if (res.data.name == "TokenExpiredError") {
            this.$router.push({ name: "login" });
          } else {
            this.approvalsCounter = res.data.data.one.recordset.length;
            this.approvallist = res.data.data.one.recordset;
            this.approvalData(this.approvallist);
            //console.log(res.data.data)
          }
        },
        (err) => console.log(err)
      );
    },
    getApprovalsSP() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };

      Axios.post(
        this.nodeApi + "/getTransactionsByColBranchApprovals",
        { branch_id: this.$session.get("user").userdetails.branch_id },
        { headers: headers }
      ).subscribe(
        (res) => {
          if (res.data.name == "TokenExpiredError") {
            this.$router.push({ name: "login" });
          } else {
            this.approvalsCounter = res.data.data.one.recordset.length;
            this.approvallist = res.data.data.one.recordset;
            this.approvalData(this.approvallist);
            //console.log(res.data.data)
          }
        },
        (err) => console.log(err)
      );
    },
    getApprovalsGM() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };

      Axios.get(this.nodeApi + "/getTransactionsByColGMApprovals", {
        headers: headers,
      }).subscribe(
        (res) => {
          if (res.data.name == "TokenExpiredError") {
            this.$router.push({ name: "login" });
          } else {
            this.approvalsCounter = res.data.data.one.recordset.length;
            this.approvallist = res.data.data.one.recordset;
            this.approvalData(this.approvallist);
            //console.log(res.data.data)
          }
        },
        (err) => console.log(err)
      );
    },
    getApprovalsTR() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };

      Axios.get(this.nodeApi + "/getTransactionsByColTreasuryApprovals", {
        headers: headers,
      }).subscribe(
        (res) => {
          if (res.data.name == "TokenExpiredError") {
            this.$router.push({ name: "login" });
          } else {
            this.approvalsCounter = res.data.data.one.recordset.length;
            this.approvallist = res.data.data.one.recordset;
            this.approvalData(this.approvallist);
            //console.log(res.data.data)
          }
        },
        (err) => console.log(err)
      );
    },

    // async updatePin() {
    //   if (this.pin != this.pinconfirm) {
    //     this.$swal.fire({
    //       type: "error",
    //       title: "Pin Update Failed",
    //       text: "Your two passwords do not match",
    //     });
    //   } else if (!this.pinold) {
    //     this.$swal.fire({
    //       type: "error",
    //       title: "Pin Update Failed",
    //       text: "Please enter old pin",
    //     });
    //   } else {
    //     let dataOTP = {
    //       id: this.$session.get("user").userdetails.id,
    //       pin: this.pinold,
    //     };

    //     var token = this.$jwt.sign(dataOTP, this.$session.get("user").token, {
    //       expiresIn: 15,
    //     });

    //     let postData = {
    //       payload: token,
    //     };
    //     let headers = {
    //       "Content-Type": "application/json",
    //       Authorization: "Bearer " + this.$session.get("user").token,
    //     };
    //     await Axios.post(this.nodeApi + "/checkPin", postData, {
    //       headers: headers,
    //     }).subscribe(
    //       (res) => {
    //         var decoded = this.$jwt.decode(res.data.token, { complete: true });

    //         if (decoded.payload.results.length != 0) {
    //           this.dialogcheckPin = false;

    //           var token = this.$jwt.sign(
    //             {
    //               col: "pin",
    //               value: this.pin,
    //               wcol: "email",
    //               wvalue: this.$session.get("user").userdetails.email,
    //             },
    //             this.$session.get("user").token,
    //             {
    //               expiresIn: 15,
    //             }
    //           );

    //           let postData = {
    //             payload: token,
    //           };

    //           Axios.put(this.nodeApi + "/updateUsersByCol", postData, {
    //             headers: headers,
    //           }).subscribe(
    //             (res) => {
    //               //console.log(res.data)
    //               if (decoded.payload.results) {
    //                 this.dialogAddBranch = false;
    //                 this.pin = "";
    //                 this.pinconfirm = "";
    //                 this.pinold = "";
    //                 this.$swal.fire({
    //                   type: "success",
    //                   title: "Pin Update",
    //                   text: "User pin was updated successfully",
    //                 });
    //               } else {
    //                 this.$swal.fire({
    //                   type: "error",
    //                   title: "Pin Update Failed",
    //                   text: decoded.payload.message,
    //                 });
    //               }
    //             },
    //             (err) => {
    //               this.$swal.fire("Pin Update Failed", err, "error");
    //             }
    //           );
    //         } else {
    //           this.dialogloader = false;
    //           this.$swal.fire({
    //             type: "error",
    //             title: "Pin Update Failed",
    //             text: "Wrong old pin please try again",
    //           });
    //         }
    //       },
    //       (err) => console.log(err)
    //     );

    //     //console.log('done')
    //   }
    // },

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
                { headers: headers }
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
    showScore(score) {
      this.score = score;
      //console.log('💯', this)
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
        var token = this.$jwt.sign(logindetails, this.$session.get("user").token, {
          expiresIn: 15,
        });

        let postData = {
          payload: token,
        };
        await Axios.post(this.nodeApi + "/checkloginUser", postData, {
          headers: headers,
        }).subscribe(
          (res) => {
            var decoded = this.$jwt.decode(res.data.token, { complete: true });

            if (decoded.payload.message == "Success") {
              var token = this.$jwt.sign(
                {
                  email: this.$session.get("user").userdetails.email,
                  password: this.newPassword,
                },
                this.$session.get("user").token,
                {
                  expiresIn: 15,
                }
              );

              let postData = {
                payload: token,
              };

              Axios.post(this.nodeApi + "/updateUserPassword", postData, {
                headers: headers,
              }).subscribe(
                (res) => {
                  //console.log(res.data)
                  var decoded = this.$jwt.decode(res.data.token, { complete: true });

                  if (decoded.payload.results) {
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
                      text: decoded.payload.message,
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
                text: decoded.payload.message,
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
    logout() {
      this.$session.destroy();

      this.$router.push("/");
    },
    SelectedMenu(data) {
      if (data != "Password" && data != "Exit") {
        if (data == "market-page") {
          if (this.user_type == 1) {
            this.$emit("SelectedMenuItem", "dash-manager");
          }
          if (this.user_type == 2) {
            this.$emit("SelectedMenuItem", "dash-teller");
          }
          if (this.user_type == 3) {
            this.$emit("SelectedMenuItem", "dash-super");
          }
          if (this.user_type >= 4) {
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
  },
};
</script>
<style scoped></style>
