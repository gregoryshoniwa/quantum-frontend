<template>
  <div>
    <h2 style="color: grey">Branch Administration</h2>
    <v-layout row wrap>
      <!-- Company creation dialog -->
      <v-dialog v-model="dialogAddBranch" max-width="600px">
        <v-card>
          <v-card-title class="yellow darken-2 white--text">
            <span class="headline">Branch Creation Form</span>
          </v-card-title>

          <v-layout wrap ma-3>
            <v-flex xs12>
              <v-text-field
                v-model="companyFormData.branchname"
                label="Branch Name"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                v-model="companyFormData.address"
                label="Address"
                type="text"
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6>
              <vue-tel-input
                v-model="companyFormData.phone_number"
                @input="getTelePhone"
                style="margin-top: 15px"
                v-bind:style="{ color: isActive ? 'red' : 'blue' }"
              ></vue-tel-input>
            </v-flex>
          </v-layout>

          <v-spacer></v-spacer>
          <v-btn color="red" class="white--text" @click="dialogAddBranch = false"
            >Close</v-btn
          >
          <v-btn color="green" v-show="!editCheck" class="white--text" @click="AddBranch"
            >Save</v-btn
          >
          <v-btn color="green" v-show="editCheck" class="white--text" @click="EditBranch"
            >Update</v-btn
          >
        </v-card>
      </v-dialog>

      <!-- add user to branch creation dialog -->
      <v-dialog v-model="dialogAddUserList" max-width="400px">
        <v-card>
          <v-card-title class="yellow darken-2 white--text">
            <span class="headline">Click user to link</span>
            <v-spacer></v-spacer>
            <v-btn color="blue" class="white--text" @click="AddUser"
              >Create New User</v-btn
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
            :headers="headersUsersSelecter"
            :key="UserLinkDataNull.username"
            :items="UserLinkDataNull"
            must-sort
            :search="search2"
            class="elevation-1"
            hide-actions
          >
            <template v-slot:items="props">
              <td class="text-xs-left" @click="LinkUserToBranch(props.item.id)">
                {{ props.item.username }}
              </td>
              <td class="text-xs-left" @click="LinkUserToBranch(props.item.id)">
                {{ props.item.first_name }} {{ props.item.last_name }}
              </td>
              <td class="text-xs-left" @click="LinkUserToBranch(props.item.id)">
                {{ props.item.user_type }}
              </td>
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

      <!-- User creation dialog -->
      <v-dialog v-model="dialogAddUser" max-width="600px">
        <v-card>
          <v-card-title class="yellow darken-2 white--text">
            <span class="headline">Create New User Form</span>
          </v-card-title>

          <v-layout wrap ma-3>
            <v-flex xs6>
              <v-text-field
                v-model="UserCreateData.first_name"
                label="First Name"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                v-model="UserCreateData.last_name"
                label="Last Name"
                type="text"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                v-model="UserCreateData.username"
                label="Username"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                v-model="UserCreateData.email"
                label="Email"
                type="text"
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6>
              <v-select
                v-model="UserCreateData.user_type"
                :items="userlevelData"
                label="User Type"
                item-text="user_type"
                item-value="user_type_id"
              ></v-select>
            </v-flex>
            <v-flex xs12 sm6>
              <vue-tel-input
                v-model="UserCreateData.cell"
                @input="getTelePhoneUser"
                style="margin-top: 15px"
                v-bind:style="{ color: isActive ? 'red' : 'blue' }"
              ></vue-tel-input>
            </v-flex>
          </v-layout>

          <v-spacer></v-spacer>
          <v-btn color="red" class="white--text" @click="dialogAddUser = false"
            >Close</v-btn
          >
          <v-btn color="green" class="white--text" @click="AddUserData">Save</v-btn>
        </v-card>
      </v-dialog>

      <!-- Branch Section -->
      <v-flex xs12 md5 ma-2>
        <v-card hover>
          <v-flex mt-1 class="card1">
            <v-flex ma-1>
              <h4>Branch List</h4>
            </v-flex>
            <v-layout>
              <v-flex>
                <v-text-field
                  v-model="search"
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
                  style="margin: 5px"
                ></v-text-field>
              </v-flex>

              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn flat icon color="blue lighten-2" @click="dialogAddBranch = true">
                    <v-icon v-on="on">add</v-icon>
                  </v-btn>
                </template>
                <span>Create Branch</span>
              </v-tooltip>
            </v-layout>

            <v-data-table
              :headers="headersCompany"
              :items="companyData"
              :search="search"
              must-sort
              class="elevation-1"
              hide-actions
            >
              <template v-slot:items="props">
                <td @click="getBranchByCompanyID(props.item)">
                  {{ props.item.branchname }}
                </td>
                <td class="text-xs-left" @click="getBranchByCompanyID(props.item)">
                  {{ props.item.address }}
                </td>
                <td>
                  <v-icon small class="mr-2" @click="editItemUser(props.item)">
                    edit
                  </v-icon>
                </td>
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
          </v-flex>
        </v-card>
      </v-flex>

      <!-- User Link Section -->
      <v-flex xs12 md6 ma-2>
        <v-card hover>
          <v-flex mt-1 class="card3">
            <v-flex ma-1>
              <h4>Users linked to branch : {{ UserLinkFormData.branch_name }}</h4>
            </v-flex>
            <v-layout>
              <v-flex>
                <v-text-field
                  v-model="search1"
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
                  style="margin: 5px"
                ></v-text-field>
              </v-flex>

              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    flat
                    icon
                    color="blue lighten-2"
                    @click="getAllNullUsersByBranch"
                  >
                    <v-icon v-on="on">add</v-icon>
                  </v-btn>
                </template>
                <span>Link User</span>
              </v-tooltip>
            </v-layout>
            <v-data-table
              :headers="headersUsers"
              :key="UserLinkData.username"
              :items="UserLinkData"
              :search="search1"
              must-sort
              class="elevation-1"
              hide-actions
            >
              <template v-slot:items="props">
                <td>{{ props.item.id }}</td>
                <td class="text-xs-left">{{ props.item.username }}</td>
                <td class="text-xs-left">
                  {{ props.item.first_name }} {{ props.item.last_name }}
                </td>
                <td class="text-xs-left">{{ props.item.user_type }}</td>
                <td>
                  <v-icon small @click="deleteItemUser(props.item)"> delete </v-icon>
                </td>
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
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import Axios from "axios-observable";
export default {
  // props: ['value'],
  data() {
    return {
      nodeApi: "",
      userlevelData: [],
      phone: "",
      phoneData: "",
      counter: 0,
      isActive: true,
      isValidPhone: false,
      dialogAddUser: false,
      dialogUserEdit: false,
      dialogAddCompany: false,
      dialogAddUserList: false,
      dialogAddBranch: false,
      dialogLinkUser: false,
      userlevelData: [],
      UsersData: [],
      statusData: [
        { status: "Active", id: 1 },
        { status: "Disabled", id: 0 },
      ],
      headersCompany: [
        {
          text: "Branch Name",
          align: "left",

          value: "branchname",
        },
        {
          text: "Address",
          align: "left",

          value: "address",
        },

        { text: "Actions", value: "action" },
      ],

      headersUsers: [
        { text: "ID", value: "id" },
        {
          text: "User Name",
          align: "left",

          value: "username",
        },
        { text: "Full Name", value: "first_name" },
        { text: "User Type", value: "user_type" },
        { text: "Actions", value: "action" },
      ],
      headersUsersSelecter: [
        {
          text: "User Name",
          align: "left",

          value: "username",
        },
        { text: "Full Name", value: "first_name" },
        { text: "User Type", value: "user_type" },
      ],
      search: "",
      search1: "",
      search2: "",

      editCheck: false,

      editedIndexUser: -1,
      companyData: [],
      companybranchData: [],
      UserLinkData: [],

      companyFormData: {
        id: 0,
        branchname: "",
        address: "",

        phone_number: "",
        status: 2,

        country: "",
        country_code: "",
        created_by: "",
        created_at: "",
      },
      ClearCompanyFormData: {
        id: 0,
        branchname: "",
        address: "",

        phone_number: "",
        status: 2,

        country: "",
        country_code: "",
        created_by: "",
        created_at: "",
      },
      UserLinkFormData: {
        id: 0,
        user_id: 0,
        status: 2,
        branch_id: 0,
        branch_name: "",
        created_by: "",
      },
      UserCreateData: {
        first_name: "",
        last_name: "",
        email: "",
        branch_id: 2037,
        user_type: 0,
        status: 2,
        cell: "",
        created_by: 0,
      },
      ClearUserCreateData: {
        first_name: "",
        last_name: "",
        email: "",
        branch_id: 2037,
        user_type: 0,
        status: 2,
        cell: "",
        created_by: 0,
      },
      UserLinkDataNull: [],
      ClearBranchFormData: {
        id: 0,
        name: "",
        status: 2,
        company_id: 0,
        created_by: "",
        created_at: "",
      },
      headers: {},
    };
  },
  created() {
    //console.log(this.$session.get('user').token)
  },
  mounted() {
    this.initializeCompany();

    this.counter += 1;
  },
  watch: {
    phone(val) {
      //console.log(val)
    },
    counter(val) {
      //console.log(val)
    },
    dialogAddBranch(val) {
      if (val) {
        
      } else {
        // this.companyFormData = this.ClearCompanyFormData;
        this.companyFormData.branchname = "";
        this.companyFormData.address = "";
        this.companyFormData.phone_number = "";
        this.editCheck = false;
      }
    },
  },
  methods: {
    LinkUserToBranch(data) {
      // console.log(data)
      // console.log(this.UserLinkFormData.branch_id)
      this.dialogAddUserList = false;

      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      Axios.put(
        this.nodeApi + "/updateUsersByCol2",
        {
          col: "branch_id",
          value: this.UserLinkFormData.branch_id,
          wcol: "id",
          wvalue: data,
        },
        { headers: headers }
      ).subscribe(
        (res) => {
          //console.log(res.data)
          if (res.data.message.one) {
            this.getAllUsersByBranch(this.UserLinkFormData.branch_id);
            this.$swal.fire({
              type: "success",
              title: "User Link",
              text: "User Link was added successfully",
            });
          } else {
            this.$swal.fire({
              type: "error",
              title: "User Linking Failed",
              text: res.data.message,
            });
          }
        },
        (err) => {
          this.$swal.fire("User Link Error", err, "error");
        }
      );
    },
    AddUser() {
      this.dialogAddUser = true;
      this.getAllUserTypes();
    },
    AddUserData() {
      if (!this.UserCreateData.first_name) {
        this.$swal.fire("Add User Error", "Please enter first name", "error");
      } else if (!this.UserCreateData.last_name) {
        this.$swal.fire("Add User Error", "Please enter last name", "error");
      } else if (!this.UserCreateData.email) {
        this.$swal.fire("Add User Error", "Please enter email", "error");
      } else if (!this.UserCreateData.cell) {
        this.$swal.fire("Phone Error", "Please enter a telephone.", "error");
      } else if (!this.isValidPhone) {
        this.$swal.fire("Phone Error", "Please enter a valid phone number.", "error");
      } else if (!this.validateEmail(this.UserCreateData.email)) {
        this.$swal.fire("Email Error", "Please enter a valid email address.", "error");
      } else if (this.UserCreateData.user_type < 1) {
        this.$swal.fire("User Type Error", "Please enter a user type.", "error");
      } else {
        let headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$session.get("user").token,
        };
        this.UserCreateData.created_by = this.$session.get("user").userdetails.id;
        Axios.post(this.nodeApi + "/createUser", this.UserCreateData, {
          headers: headers,
        }).subscribe(
          (res) => {
            //console.log(res.data)
            if (res.data.message.one) {
              this.UserCreateData = this.ClearUserCreateData;
              this.getAllNullUsersByBranch();
              this.addUserFloat(res.data.message.one.recordset.insertId);
              this.dialogAddUser = false;
              this.$swal.fire({
                type: "success", 
                title: "User Added",
                text: "User was added successfully",
              });
            } else {
              this.$swal.fire({
                type: "error",
                title: "User Adding Failed",
                text: res.data.message,
              });
            }
          },
          (err) => console.log(err)
        );
      }
    },
    async addUserFloat(data) {
      let acountdata = {
        branch_id: 2037,
        user_id: data,
        amount: 0,
        currency_id: 2,
        handover_type: 1,
        status: 2,
        created_by: this.$session.get("user").userdetails.id,
      };
      //console.log(acountdata)

      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      await Axios.post(this.nodeApi + "/addUserFloat2", acountdata, {
        headers: headers,
        timeout: 5000,
      }).subscribe(
        (res) => {
          //console.log(res)
          if (res.data.data.one) {
            this.dialogloader = false;

            this.$swal.fire({
              type: "success",
              title: "User Account Adding",
              text: "User account was added successfully",
            });
          } else {
            this.$swal.fire({
              type: "error",
              title: "User Account Adding",
              text: res.data.message,
            });
          }
        },
        (err) => {
          this.dialogloader = false;
          this.$swal.fire(
            "User Account Adding Error",
            "Failed to add user account, probably because the user already has this type of account",
            "error"
          );
        }
      );
    },
    AddUsertoBranch() {},

    getBranchByCompanyID(data) {
      //console.log(data)
      this.UserLinkFormData.branch_id = data.id;
      this.UserLinkFormData.branch_name = data.branchname;
      this.getAllUsersByBranch(data.id);
    },
    AddBranch() {
      if (!this.companyFormData.branchname) {
        this.$swal.fire("Compnay Name Error", "Please enter a company name", "error");
      } else if (!this.companyFormData.address) {
        this.$swal.fire(
          "Compnay address Error",
          "Please enter a company address.",
          "error"
        );
      } else if (!this.companyFormData.phone_number) {
        this.$swal.fire("Phone Error", "Please enter a telephone.", "error");
      } else if (!this.isValidPhone) {
        this.$swal.fire("Phone Error", "Please enter a valid phone number.", "error");
      } else {
        let headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$session.get("user").token,
        };
        this.companyFormData.created_by = this.$session.get("user").userdetails.id;
        Axios.post(this.nodeApi + "/addBranches", this.companyFormData, {
          headers: headers,
        }).subscribe(
          (res) => {
            if ((res.data.data.one = "Success")) {
              this.closeUser();
              this.companyFormData = this.ClearCompanyFormData;
              this.initializeCompany();
              this.dialogAddBranch = false;
              this.$swal.fire({
                type: "success",
                title: "Branch Added",
                text: "Branch was added successfully",
              });
            } else {
              this.$swal.fire({
                type: "error",
                title: "Branch Adding Failed",
                text: res.data.message,
              });
            }
          },
          (err) => console.log(err)
        );
      }
      // console.log(this.companyFormData)
    },
    getTelePhone(e, phoneData) {
      if (phoneData.isValid) {
        this.isActive = false;
        //console.log(phoneData)
        this.isValidPhone = phoneData.isValid;
        this.companyFormData.country = phoneData.country.name;
        this.companyFormData.country_code = phoneData.country.iso2;
      }
      if (!phoneData.isValid) {
        this.isActive = true;
        //console.log(phoneData)
      }
    },
    getTelePhoneUser(e, phoneData) {
      if (phoneData.isValid) {
        this.isActive = false;
        //console.log(phoneData)
        this.isValidPhone = phoneData.isValid;
        // this.companyFormData.country = phoneData.country.name
        // this.companyFormData.country_code = phoneData.country.iso2
      }
      if (!phoneData.isValid) {
        this.isActive = true;
        //console.log(phoneData)
      }
    },
    getAllCompanies() {
      Axios.get(this.nodeApi + "/getAllCompanies").subscribe(
        (res) => {
          this.companyData = res.data.recordset;
          //console.log(this.companyData)
        },
        (err) => console.log(err)
      );
    },
    getAllUsersByBranch(data) {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      Axios.post(
        this.nodeApi + "/getUsersByCol",
        { col: "branch_id", value: data },
        { headers: headers }
      ).subscribe(
        (res) => {
          this.UserLinkData = res.data.data.one.recordset;
          //console.log(this.companyData)
        },
        (err) => console.log(err)
      );
    },
    getAllNullUsersByBranch() {
      if (this.UserLinkFormData.branch_name != "") {
        this.dialogAddUserList = true;
        let headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$session.get("user").token,
        };
        Axios.post(
          this.nodeApi + "/getUsersByCol",
          { col: "branch_id", value: 0 },
          { headers: headers }
        ).subscribe(
          (res) => {
            this.UserLinkDataNull = res.data.data.one.recordset;
            //console.log(this.companyData)
          },
          (err) => console.log(err)
        );
      } else {
        this.$swal.fire(
          "User Link Error",
          "Please select a branch to add a user.",
          "error"
        );
      }
    },
    getBranchPerCompany(companydata) {
      //   Axios.get(this.nodeApi+'/getAllCompanies')
      //   .subscribe(res =>{
      //     this.companybranchData = res.data.recordset
      //     //console.log(res.data.recordset)
      //   },err => console.log(err))
    },
    getUsersPerBranch(branchdata) {
      //   Axios.get(this.nodeApi+'/getAllCompanies')
      //   .subscribe(res =>{
      //     this.UserLinkData = res.data.recordset
      //     //console.log(res.data.recordset)
      //   },err => console.log(err))
    },
    openEditUser() {
      this.dialogUserEdit = true;
    },
    getUserStatus(status) {
      if (status == 0) {
        return "Disabled";
      }
      if (status == 1) {
        return "Active";
      }
    },
    openAddNewUser() {
      this.dialogUser = true;
      this.getAllUserTypes();
    },
    getAllUserTypes() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      Axios.get(this.nodeApi + "/getAllUserTypes", { headers: headers }).subscribe(
        (res) => {
          this.userlevelData = res.data.data.one.recordset;
          console.log(res.data.recordset);
        },
        (err) => console.log(err)
      );
    },
    getUserType(usertype) {
      if (usertype == 1) {
        return "Branch Clerk";
      }
      if (usertype == 2) {
        return "Branch Supervisor";
      }
      if (usertype == 3) {
        return "Treasury Officer";
      }
      if (usertype == 4) {
        return "Transporter";
      }
      if (usertype == 5) {
        return "Treasury Manager";
      }
      if (usertype == 6) {
        return "System Admin";
      }
    },

    saveNewUser() {
      if (this.editedUser.pass != this.editedUser.confirm_pass) {
        this.$swal.fire(
          "Password Error",
          "Password is different from the confirm password.",
          "error"
        );
      } else if (!this.editedUser.user_type) {
        this.$swal.fire("User type Error", "Please select a user type.", "error");
      } else if (!this.editedUser.username) {
        this.$swal.fire("User Name Error", "Please enter a User Name.", "error");
      } else if (!this.editedUser.first_name || !this.editedUser.last_name) {
        this.$swal.fire("Name Error", "Please enter Firt Name and Last Name.", "error");
      } else if (!this.editedUser.email) {
        this.$swal.fire("Email Error", "Please enter an email.", "error");
      } else if (!this.editedUser.cell) {
        this.$swal.fire("Phone Error", "Please enter a cell.", "error");
      } else if (!this.validateEmail(this.editedUser.email)) {
        this.$swal.fire("Email Error", "Please enter a valid email address.", "error");
      } else if (!this.isValidPhone) {
        this.$swal.fire("Phone Error", "Please enter a valid phone number.", "error");
      } else {
        // console.log(this.editedUser)
        let date = new Date();
        this.editedUser.created_by = this.$session.get("user").id;
        this.editedUser.created_at = date.toISOString();
        //console.log(this.editedUser)
        Axios.post(this.nodeApi + "/addUser", this.editedUser).subscribe(
          (res) => {
            if (res.data.rowsAffected) {
              this.closeUser();
              this.editedUser = this.ClearUser;
              this.initializeCompany();
              this.$swal.fire({
                type: "success",
                title: "User Added",
                text: "User was added successfully",
              });
            }
            if (!res.data.rowsAffected) {
              this.$swal.fire({
                type: "error",
                title: "User Adding Failed",
                text: res.data.originalError.info.message,
              });
            }
          },
          (err) => console.log(err)
        );
      }
    },
    validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    editItemUser(item) {
      // this.getAllUserTypes()
      //console.log(item)
      // this.editedIndexUser = this.UsersData.indexOf(item)
      this.companyFormData = Object.assign({}, item);
      this.editCheck = true;
      this.dialogAddBranch = true;
    },
    deleteItemUser(item) {
      // console.log(item)
      const index = this.UsersData.indexOf(item);
      this.$swal
        .fire({
          title: "Remove User?",
          text: "Are you sure you want to remove user from branch this !",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Remove!",
        })
        .then((result) => {
          if (result.value) {
            let headers = {
              "Content-Type": "application/json",
              Authorization: "Bearer " + this.$session.get("user").token,
            };
            Axios.put(
              this.nodeApi + "/updateUsersByCol",
              { col: "branch_id", value: 0, wcol: "id", wvalue: item.id },
              { headers: headers }
            ).subscribe(
              (res) => {
                //console.log(res.data)
                if (res.data.data.one) {
                  this.getAllUsersByBranch(this.UserLinkFormData.branch_id);
                  this.$swal.fire({
                    type: "success",
                    title: "User Removal",
                    text: "User removal was added successfully",
                  });
                } else {
                  this.$swal.fire({
                    type: "error",
                    title: "User Removal Failed",
                    text: res.data.message,
                  });
                }
              },
              (err) => {
                this.$swal.fire("User Removal Error", err, "error");
              }
            );
          }
        });
    },
    EditBranch() {
      if (!this.companyFormData.branchname) {
        this.$swal.fire("Compnay Name Error", "Please enter a company name", "error");
      } else if (!this.companyFormData.address) {
        this.$swal.fire(
          "Compnay address Error",
          "Please enter a company address.",
          "error"
        );
      } else if (!this.companyFormData.phone_number) {
        this.$swal.fire("Phone Error", "Please enter a telephone.", "error");
      } else if (!this.isValidPhone) {
        this.$swal.fire("Phone Error", "Please enter a valid phone number.", "error");
      } else {
        let headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$session.get("user").token,
        };
        Axios.put(
          this.nodeApi + "/updateBranches/" + this.companyFormData.id,
          this.companyFormData,
          { headers: headers }
        ).subscribe(
          (res) => {
            if (res.data.data.one) {
              this.closeUser();
              this.companyFormData = this.ClearCompanyFormData;
              this.initializeCompany();
              this.$swal.fire({
                type: "success",
                title: "User Update",
                text: "User was updated successfully",
              });
            }
            if (!res.data.data.one) {
              this.$swal.fire({
                type: "error",
                title: "User Update Failed",
                text: res.data.message,
              });
            }
          },
          (err) => console.log(err)
        );
      }
    },
    initializeCompany() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      // console.log(headers)
      Axios.get(this.nodeApi + "/getAllBranches", { headers: headers }).subscribe(
        (res) => {
          this.companyData = res.data.data.one.recordset;
          //console.log(this.companyData)
        },
        (err) => console.log(err)
      );
    },
    //this code is for the user admin dialog
    closeUser() {
      this.editCheck = false;
      this.dialogUser = false;
      this.dialogAddBranch = false;
      setTimeout(() => {
        this.editedUser = Object.assign({}, this.defaultUser);
        this.editedIndexUser = -1;
      }, 300);
    },
  },
};
</script>
<style scoped>
.card1 {
  border-left: 5px solid #cea51d;
}
.card2 {
  border-left: 5px solid #17c92f;
}
.card3 {
  border-left: 5px solid #cea51d;
}
</style>
