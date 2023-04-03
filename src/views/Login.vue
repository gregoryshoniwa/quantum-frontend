<template>
  <div class="main">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4 style="margin-bottom: 100px">
          <img src="../assets/main_logo.png" alt="logo" class="img1 bounceIn" />
          <div style="text-align: center">
            <h2>Sahwira Money Transfer Agency</h2>
            <h4>REGISTERED BUREAU DE CHANGE</h4>
          </div>
          <br />
          <v-card class="elevation-12 bounceIn">
            <!-- <v-toolbar dark color="primary">
              <v-toolbar-title>Login</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar> -->
            <v-card-text>
              <v-form>
                <v-text-field
                  @keyup.enter="login"
                  v-model="user_email"
                  prepend-inner-icon="person"
                  name="login"
                  label="Email"
                  type="text"
                  autocomplete="off"
                ></v-text-field>
                <v-text-field
                  @keyup.enter="login"
                  v-model="user_password"
                  prepend-inner-icon="lock"
                  name="password"
                  label="Password"
                  id="password"
                  type="password"
                  autocomplete="off"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                v-if="active"
                color="#ECB530"
                @click="login"
                :loading="loading"
                :disabled="loading"
              >
                Sign-In
              </v-btn>
               <v-btn
                v-if="!active"
                color="#ECB530"

                :loading="loading"
                :disabled="active"
              >
                Licence exired
              </v-btn>
              <!-- <v-btn color="error" @click="signup">Rest-Password</v-btn> -->
            </v-card-actions>
          </v-card>
          <br />

          <!-- <img src="../assets/sticky_logo.svg" alt="logo" class="img1 bounceIn"> -->
        </v-flex>
      </v-layout>
    </v-container>
    <!-- sign-up dialog -->
    <v-dialog v-model="dialogUser" max-width="600px">
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step editable :complete="e1 > 1" step="1"
            >Personal Information</v-stepper-step
          >
          <v-divider></v-divider>
          <v-stepper-step editable step="2">System User Configuration</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-layout wrap justify-center>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  v-model="editedUser.first_name"
                  label="First Name"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  v-model="editedUser.last_name"
                  label="Last Name"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  v-model="editedUser.email"
                  label="Email Address"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <vue-tel-input
                  v-model="editedUser.phone_number"
                  @input="getTelePhone"
                  style="margin-top: 15px"
                  v-bind:style="{ color: isActive ? 'red' : 'blue' }"
                ></vue-tel-input>
              </v-flex>
            </v-layout>
            <v-btn color="primary" @click="e1 = 2"> Continue </v-btn>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-layout wrap justify-center>
              <!-- <v-flex xs12 sm6 md12>
                                                        <v-text-field v-model="editedUser.username" label="User Name"></v-text-field>
                                                    </v-flex> -->
              <!-- <v-flex xs12 sm6 md6>
                                                        <v-text-field type="password" v-model="editedUser.pass" label="Password"></v-text-field>
                                                        <password v-model="editedUser.pass"
                                                            :strength-meter-only="true"
                                                            @score="showScorePass"

                                                        />
                                                    </v-flex>
                                                    <v-flex xs12 sm6 md6>

                                                        <v-text-field type="password" v-model="editedUser.confirm_pass" label="Confirm Password"></v-text-field>
                                                        <password v-model="editedUser.confirm_pass"
                                                            :strength-meter-only="true"                                    

                                                        />
                                                    </v-flex> -->
              <v-flex xs12 sm md12>
                <v-select
                  v-model="user_type"
                  label="User Type"
                  item-text="name"
                  item-value="id"
                  :items="usertypeData"
                >
                </v-select>
              </v-flex>
              <v-flex xs12 sm md12>
                <v-text-field
                  v-show="editCheck"
                  v-model="company"
                  label="Company Name"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-btn color="primary" @click="saveNewUser"> Save </v-btn>
            <v-btn text @click="e1 = 1">back</v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-dialog>

    <v-dialog v-model="dialogloader" hide-overlay persistent width="300">
      <v-card color="#ECB530" dark>
        <v-card-text>
          Please stand by
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogPassword" max-width="400px">
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
            <v-btn color="red" class="white--text" @click="dialogPassword = false"
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
            <v-btn color="red" class="white--text" @click="dialogPassword = false"
              >Close</v-btn
            >
            <v-btn color="green" class="white--text" @click="updatePin">Save</v-btn>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import Password from "vue-password-strength-meter";
import Axios from "axios-observable";
export default {
  components: {
    Password,
  },
  data() {
    return {
      nodeApi: "",
      e1: 0,
      pinold: "",
      passwordold: "",
      newPassword: "",
      confirm: "",
      pinconfirm: "",
      pin: "",
      dialogPassword: false,
      dialogloader: false,
      user_email: "",
      user_password: "",
      editCheck: 0,
      loader: null,
      loading: false,
      dialogUser: false,
      isActive: true,
      isValidPhone: false,
      usertypeData: [
        {
          id: 0,
          name: "Personal User",
        },
        {
          id: 1,
          name: "Company User",
        },
      ],
      active:false,
      leftDays: 0,
      user_type: 0,
      passwordScore: 0,
      editedUser: {
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        status: 1,
        company_id: 6,
        user_type: 0,
        country: "",
        country_code: "",
      },
      company: "",
      ClearUser: {
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        status: 1,
        company_id: 0,
        user_type: 0,
        country: "",
        country_code: "",
      },
    };
  },
  mounted() {
    this.check()
    console.log(this.$route.params.id);
  },
  watch: {
    user_type(val) {
      if (val == 1) {
        this.editCheck = 1;
        this.editedUser.user_type = val;
      } else {
        this.editCheck = 0;
        this.editedUser.user_type = val;
      }
    },
  },
  methods: {
     async check() {

        
         // console.log(headers)
        await Axios.get(this.nodeApi+'/getAdmin')
          .subscribe(res =>{
            
            if (res.data.data.one.recordset[0].leftDays > 0) {
                        this.active = true
                        this.leftDays = res.data.data.one.recordset[0].leftDays
                    } else {
                        this.active = false
                    }
            
            //console.log(this.allRates)
          },err => console.log(err))


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
                { headers: headers }
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
                    this.dialogPassword = false;
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
    showScorePass(score) {
      this.passwordScore = score;
    },
    async saveNewUser() {
      // if (this.editedUser.pass != this.editedUser.confirm_pass) {
      //     this.$swal.fire(
      //         'Password Error',
      //         'Password is different from the confirm password.',
      //         'error'
      //     )
      // }  else if (this.passwordScore < 3) {
      //     this.$swal.fire(
      //         'Password Error',
      //         'Please enter a strong password to secure your account.',
      //         'error'
      //     )
      // }
      if (!this.editedUser.first_name || !this.editedUser.last_name) {
        this.$swal.fire("Name Error", "Please enter Firt Name and Last Name.", "error");
      } else if (!this.editedUser.email) {
        this.$swal.fire("Email Error", "Please enter an email.", "error");
      } else if (!this.editedUser.phone_number) {
        this.$swal.fire("Phone Error", "Please enter a cell number.", "error");
      } else if (!this.validateEmail(this.editedUser.email)) {
        this.$swal.fire("Email Error", "Please enter a valid email address.", "error");
      } else if (!this.isValidPhone) {
        this.$swal.fire("Phone Error", "Please enter a valid phone number.", "error");
      } else {
        if (this.editedUser.user_type == 0) {
          let companyName = {
            name: "ContiCash",
          };
          let pass = {
            password: "",
          };
          let userdata = {
            email: this.editedUser.email,
          };
          this.dialogloader = true;
          await Axios.post(
            this.nodeApi + "/conticash/addUser",
            this.editedUser
          ).subscribe(
            (res) => {
              if (res.data.affectedRows > 0) {
                this.closeUser();
                Axios.post(
                  this.nodeApi + "/conticash/sendEmail",
                  this.editedUser
                ).subscribe(
                  (res) => {
                    pass.password = res.data;
                    Axios.put(this.nodeApi + "/conticash/updateUsersPassword", {
                      temp_pass: pass,
                      user_data: userdata,
                    }).subscribe(
                      (res) => {
                        this.dialogloader = false;
                        this.$swal.fire({
                          type: "success",
                          title: "User Added",
                          text: "User was added successfully",
                        });
                      },
                      (err) => {
                        this.closeUser();
                        this.$swal.fire({
                          type: "error",
                          title: "User Adding Failed",
                          text: err,
                        });
                      }
                    );
                  },
                  (err) => {
                    this.closeUser();
                    this.$swal.fire({
                      type: "error",
                      title: "User Adding Failed",
                      text: err,
                    });
                  }
                );
              } else if (res.data.affectedRows == 0) {
                this.closeUser();
                this.$swal.fire({
                  type: "error",
                  title: "User Adding Failed",
                  text: "Record was not added",
                });
              } else {
                this.closeUser();
                this.$swal.fire({
                  type: "error",
                  title: "User Adding Failed",
                  text: res.data.sqlMessage,
                });
              }
            },
            (err) => {
              this.closeUser();
              this.$swal.fire({
                type: "error",
                title: "User Adding Failed",
                text: err,
              });
            }
          );
        } else {
          let companyName = {
            name: this.company,
          };
          let pass = {
            password: "",
          };
          let userdata = {
            email: this.editedUser.email,
          };
          this.dialogloader = true;
          await Axios.post(this.nodeApi + "/conticash/addCompanyUser", {
            company: companyName,
            userdetails: this.editedUser,
          }).subscribe(
            (res) => {
              if (res.data.affectedRows > 0) {
                this.closeUser();
                Axios.post(
                  this.nodeApi + "/conticash/sendEmail",
                  this.editedUser
                ).subscribe(
                  (res) => {
                    pass.password = res.data;
                    Axios.put(this.nodeApi + "/conticash/updateUsersPassword", {
                      temp_pass: pass,
                      user_data: userdata,
                    }).subscribe(
                      (res) => {
                        this.dialogloader = false;
                        this.$swal.fire({
                          type: "success",
                          title: "User Added",
                          text: "User was added successfully",
                        });
                      },
                      (err) => {
                        this.closeUser();
                        this.$swal.fire({
                          type: "error",
                          title: "User Adding Failed",
                          text: err,
                        });
                      }
                    );
                  },
                  (err) => {
                    this.closeUser();
                    this.$swal.fire({
                      type: "error",
                      title: "User Adding Failed",
                      text: err,
                    });
                  }
                );
              } else if (res.data.affectedRows == 0) {
                this.closeUser();
                this.$swal.fire({
                  type: "error",
                  title: "User Adding Failed",
                  text: "Record was not added",
                });
              } else {
                this.closeUser();
                this.$swal.fire({
                  type: "error",
                  title: "User Adding Failed",
                  text: res.data.sqlMessage,
                });
              }
            }, 
            (err) => {
              this.closeUser();
              this.$swal.fire({
                type: "error",
                title: "User Adding Failed",
                text: err,
              });
            }
          );
        }
      }
    },
    closeUser() {
      this.dialogUser = false;
      this.editedUser = this.ClearUser;
      this.company = "";
      this.dialogloader = false;
    },
    validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    login() {
      this.loader = "loading";
      this.dialogloader = true;
      let logindetails = {
        email: this.user_email,
        password: this.user_password,
      };
      Axios.post(this.nodeApi + "/loginUser", logindetails).subscribe(
        (res) => {
          //console.log(res)
          if (res.data.token) {
            if (this.user_password == "123456789") {
              this.$session.start();
              this.$session.set("user", res.data);
              this.$swal
                .fire({
                  title: "Login Error",
                  text: `Your password is still the default system password and is a security risk to your account. Please click Yes to change your password with a new one.`,
                  type: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes!",
                })
                .then((result) => {
                  if (result.value) {
                    this.dialogPassword = true;
                    this.dialogloader = false;
                  }
                });
            } else {
              if (
                res.data.userdetails.user_type == 1 ||
                res.data.userdetails.user_type >= 4
              ) {
                this.closeUser();

                this.$swal.fire({
                  type: "success",
                  title: "Login Success",
                  text: "User logged in successfully",
                  showConfirmButton: false,
                  timer: 1500,
                });
                this.$session.start();
                this.$session.set("user", res.data);
                this.$router.push("/home");
              } else {
                if (res.data.userdetails.branch_id < 1) {
                  this.closeUser();
                  this.$swal.fire({
                    type: "error",
                    title: "Login Failure",
                    text: "Sorry your user has not been allocated a branch",
                  });
                } else {
                  this.closeUser();

                  this.$swal.fire({
                    type: "success",
                    title: "Login Success",
                    text: "User logged in successfully",
                  });
                  this.$session.start();
                  this.$session.set("user", res.data);
                  this.$router.push("/home");
                }
              }
            }
          } else {
            this.closeUser();
            this.$swal.fire({
              type: "error",
              title: "Login Failure",
              text: res.data.message,
            });
          }
        },
        (err) => {
          this.closeUser();
          this.$swal.fire({
            type: "Login Failure",
            title: "Login has failed please try again",
            text: err,
          });
        }
      );
    },
    signup() {
      this.dialogUser = true;
    },
    getTelePhone(e, phoneData) {
      if (phoneData.isValid) {
        this.isActive = false;
        //console.log(phoneData)
        this.isValidPhone = phoneData.isValid;
        this.editedUser.country = phoneData.country.name;
        this.editedUser.country_code = phoneData.country.iso2;
      }
      if (!phoneData.isValid) {
        this.isActive = true;
        //console.log(phoneData)
      }
    },
  },
};
</script>

<style scoped>
h2 {
  color: goldenrod;
  padding-bottom: 10px;
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}

@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@-o-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

.img1 {
  display: block;
  margin: 0 auto;
  width: 250px;
  height: auto;
  margin-bottom: 20px;
}

.main {
  background-image: url("../assets/bgtop2.png");
  height: 100%;
  /* Center and scale the image nicely */
  /* background-position: center; */
  background-repeat: repeat;
  /* background-size: 100% 100%; */
}

/* customizable snowflake styling */
.snowflake {
  color: rgba(255, 255, 255, 0.432);
  font-size: 1em;
  font-family: Arial;
  /* text-shadow: 0 0 1px #000; */
}

@-webkit-keyframes snowflakes-fall {
  0% {
    top: -10%;
  }

  100% {
    top: 100%;
  }
}

@-webkit-keyframes snowflakes-shake {
  0% {
    -webkit-transform: translateX(0px);
    transform: translateX(0px);
  }

  50% {
    -webkit-transform: translateX(80px);
    transform: translateX(80px);
  }

  100% {
    -webkit-transform: translateX(0px);
    transform: translateX(0px);
  }
}

@keyframes snowflakes-fall {
  0% {
    top: -10%;
  }

  100% {
    top: 100%;
  }
}

@keyframes snowflakes-shake {
  0% {
    transform: translateX(0px);
  }

  50% {
    transform: translateX(80px);
  }

  100% {
    transform: translateX(0px);
  }
}

.snowflake {
  position: fixed;
  top: -10%;
  z-index: 9999;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: default;
  -webkit-animation-name: snowflakes-fall, snowflakes-shake;
  -webkit-animation-duration: 10s, 3s;
  -webkit-animation-timing-function: linear, ease-in-out;
  -webkit-animation-iteration-count: infinite, infinite;
  -webkit-animation-play-state: running, running;
  animation-name: snowflakes-fall, snowflakes-shake;
  animation-duration: 10s, 3s;
  animation-timing-function: linear, ease-in-out;
  animation-iteration-count: infinite, infinite;
  animation-play-state: running, running;
}

.snowflake:nth-of-type(0) {
  left: 1%;
  -webkit-animation-delay: 0s, 0s;
  animation-delay: 0s, 0s;
}

.snowflake:nth-of-type(1) {
  left: 10%;
  -webkit-animation-delay: 1s, 1s;
  animation-delay: 1s, 1s;
}

.snowflake:nth-of-type(2) {
  left: 20%;
  -webkit-animation-delay: 6s, 0.5s;
  animation-delay: 6s, 0.5s;
}

.snowflake:nth-of-type(3) {
  left: 30%;
  -webkit-animation-delay: 4s, 2s;
  animation-delay: 4s, 2s;
}

.snowflake:nth-of-type(4) {
  left: 40%;
  -webkit-animation-delay: 2s, 2s;
  animation-delay: 2s, 2s;
}

.snowflake:nth-of-type(5) {
  left: 50%;
  -webkit-animation-delay: 8s, 3s;
  animation-delay: 8s, 3s;
}

.snowflake:nth-of-type(6) {
  left: 60%;
  -webkit-animation-delay: 6s, 2s;
  animation-delay: 6s, 2s;
}

.snowflake:nth-of-type(7) {
  left: 70%;
  -webkit-animation-delay: 2.5s, 1s;
  animation-delay: 2.5s, 1s;
}

.snowflake:nth-of-type(8) {
  left: 80%;
  -webkit-animation-delay: 1s, 0s;
  animation-delay: 1s, 0s;
}

.snowflake:nth-of-type(9) {
  left: 90%;
  -webkit-animation-delay: 3s, 1.5s;
  animation-delay: 3s, 1.5s;
}

/* Demo Purpose Only*/
.v-messages {
  min-height: 10px;
}
</style>
