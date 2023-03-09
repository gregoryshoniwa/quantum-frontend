<template>
  <div>
    <v-layout row justify-end class="white--text hidden-md-and-up">
      <h2 style="color: grey">User Administration Form</h2>
    </v-layout>
    <v-toolbar flat color="yellow darken-3">
      <v-toolbar-title class="white--text">User Administration Form</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="openAddNewUser">Create User</v-btn>
      <!-- <v-btn class="white--text" color="green" @click="openAddNewUser1"
        >Whatsapp Alert List</v-btn
      > -->

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
                    v-model="editedUser.cell"
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
                <v-flex xs12 sm6 md12>
                  <v-text-field
                    v-model="editedUser.username"
                    label="User Name"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm md12>
                  <v-select
                    v-model="editedUser.user_type"
                    label="User Type"
                    item-text="user_type"
                    item-value="user_type_id"
                    :items="userlevelData"
                  >
                  </v-select>
                </v-flex>
                <v-flex xs12 sm md12>
                  <v-select
                    v-show="editCheck"
                    v-model="editedUser.status"
                    label="User Status"
                    item-text="status"
                    item-value="id"
                    :items="statusData"
                  >
                  </v-select>
                </v-flex>
              </v-layout>

              <v-btn v-show="!editCheck" color="primary" @click="saveNewUser">
                Save
              </v-btn>

              <v-btn v-show="editCheck" color="primary" @click="saveUser"> Update </v-btn>

              <v-btn text @click="e1 = 1">back</v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-dialog>

      <v-dialog v-model="dialogUserRBZ" max-width="600px">
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step editable :complete="e1 > 1" step="1"
              >RBZ User Credentials</v-stepper-step
            >

            <v-divider></v-divider>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-layout wrap justify-center>
                <v-flex xs12 sm12 md12>
                  <v-text-field v-model="rbz_username" label="User Name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    v-model="rbz_password"
                    label="Password"
                    type="password"
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-btn color="primary" @click="saveRBZCredentials"> Save </v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-dialog>

      <!-- add user to branch creation dialog -->
      <v-dialog v-model="dialogAddUserList" max-width="500px">
        <v-card>
          <v-card-title class="yellow darken-2 white--text">
            <span class="headline">Click user to add to list</span>
            <v-spacer></v-spacer>
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
                {{ getUserType(props.item.user_type) }}
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

      <!-- add user to branch creation dialog -->
      <v-dialog v-model="dialogAddUserList5" max-width="500px">
        <v-card>
          <v-card-title class="yellow darken-2 white--text">
            <span class="headline">Click user to add to list</span>
            <v-spacer></v-spacer>
          </v-card-title>

          <v-layout wrap ma-3>
            <v-flex>
              <v-text-field
                v-model="search5"
                append-icon="search"
                label="Search"
                single-line
                hide-details
                style="margin: 5px"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-data-table
            :headers="headersUsersSelecter5"
            :key="UserLinkDataNull5.username"
            :items="UserLinkDataNull5"
            must-sort
            :search="search5"
            class="elevation-1"
            hide-actions
          >
            <template v-slot:items="props">
              <td class="text-xs-left" @click="LinkUserToBranch5(props.item.id)">
                {{ props.item.username }}
              </td>
              <td class="text-xs-left" @click="LinkUserToBranch5(props.item.id)">
                {{ props.item.first_name }} {{ props.item.last_name }}
              </td>
              <td class="text-xs-left" @click="LinkUserToBranch5(props.item.id)">
                {{ getUserType(props.item.user_type) }}
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

      <v-dialog v-model="dialogUser1" max-width="800px">
        <v-stepper v-model="e11">
          <v-stepper-header>
            <v-stepper-step editable :complete="e11 > 1" step="1"
              >Sales & Float Report List</v-stepper-step
            >

            <v-divider></v-divider>

            <v-stepper-step editable step="2">Float Limit Alert List</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
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
                :headers="headersUsers2"
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
                  <td class="text-xs-left">{{ getUserType(props.item.user_type) }}</td>
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
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-layout>
                <v-flex>
                  <v-text-field
                    v-model="search4"
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
                      @click="getAllNullUsersByBranch5"
                    >
                      <v-icon v-on="on">add</v-icon>
                    </v-btn>
                  </template>
                  <span>Link User</span>
                </v-tooltip>
              </v-layout>
              <v-data-table
                :headers="headersUsers5"
                :key="UserLinkData5.username"
                :items="UserLinkData5"
                :search="search4"
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
                  <td class="text-xs-left">{{ getUserType(props.item.user_type) }}</td>
                  <td>
                    <v-icon small @click="deleteItemUser5(props.item)"> delete </v-icon>
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
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-dialog>
    </v-toolbar>
    <v-text-field
      v-model="search"
      append-icon="search"
      label="Search"
      single-line
      hide-details
      style="margin: 5px"
    ></v-text-field>

    <v-data-table
      :headers="headersUsers"
      :key="UsersData.username"
      :items="UsersData"
      :search="search"
      must-sort
      :pagination.sync="pagination"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>
        <td class="text-xs-left">{{ props.item.username }}</td>
        <td class="text-xs-left">
          {{ props.item.first_name }} {{ props.item.last_name }}
        </td>
        <td class="text-xs-left">{{ props.item.user_type }}</td>

        <td class="text-xs-left">{{ props.item.email }}</td>
        <td class="text-xs-left">{{ props.item.cell }}</td>
        <td class="text-xs-left">{{ props.item.status }}</td>
        <td class="justify-left">
          <v-tooltip bottom v-if="user_type == 1">
            <template v-slot:activator="{ on }">
              <v-icon small class="mr-2" @click="editItemUser(props.item)" v-on="on">
                edit
              </v-icon>
            </template>
            <span>Edit User</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon small class="mr-2" @click="restPassword(props.item)" v-on="on">
                vpn_key
              </v-icon>
            </template>
            <span>Rest Password</span>
          </v-tooltip>

          <!-- <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon small class="mr-2" @click="openRBZ(props.item)" v-on="on">
                account_balance
              </v-icon>
            </template>
            <span>RBZ Credentials</span>
          </v-tooltip> -->
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
  // props: ['value'],
  data() {
    return {
      nodeApi: "http://localhost:8081",
      userlevelData: [],
      dialogUserRBZ: false,
      dialogloader: false,
      phone: "",
      phoneData: "",
      counter: 0,
      isActive: true,
      rbz_username: "",
      rbz_password: "",
      selected_user: 0,
      isValidPhone: false,
      dialogUserEdit: false,
      dialogUser1: false,
      UserLinkFormData: [],
      pagination: {
        rowsPerPage: 15,
      },
      userlevelData: [],
      UsersData: [],
      UserLinkData5: [],
      dialogAddUserList: false,
      dialogAddUserList5: false,
      UserLinkData: [],
      search2: "",
      search5: "",
      search4: "",
      search1: "",
      UserLinkDataNull: [],
      UserLinkDataNull5: [],
      statusData: [
        { status: "Active", id: 2 },
        { status: "Disabled", id: 3 },
      ],
      headersUsers: [
        { text: "User ID", value: "id" },
        {
          text: "User Name",
          align: "left",
          sortable: false,
          value: "username",
        },
        { text: "Full Name", value: "first_name" },
        { text: "User Type", value: "user_type" },
        { text: "Email", value: "email" },
        { text: "Cell No#", value: "cell" },
        { text: "Status", value: "status" },
        { text: "Actions", sortable: false },
      ],
      search: "",
      dialogUser: false,
      e1: 0,
      e11: 0,
      editCheck: false,
      editedIndexUser: -1,
      search: "",
      editedUser: {
        id: 0,
        first_name: "",
        last_name: "",
        email: "",
        branch_id: 2037,
        user_type: 0,
        status: 2,
        cell: "",
        created_by: 0,
      },
      ClearUser: {
        first_name: "",
        last_name: "",
        email: "",
        branch_id: 1020,
        user_type: 0,
        status: 2,
        cell: "",
        created_by: 0,
      },
      headersUsers2: [
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
      headersUsers5: [
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
      headersUsersSelecter5: [
        {
          text: "User Name",
          align: "left",

          value: "username",
        },
        { text: "Full Name", value: "first_name" },
        { text: "User Type", value: "user_type" },
      ],
      user_type: 0,
    };
  },
  created() {
    this.initializeUser();
    this.counter += 1;
  },
  mounted() {
    this.user_type = this.$session.get("user").userdetails.user_type;
    // console.log(this.user_type)
  },
  watch: {
    phone(val) {
      //console.log(val)
    },
    counter(val) {
      //console.log(val)
    },
    dialogUser(val) {
      if (val == false) {
        this.editCheck = false;
        this.editedUser = this.ClearUser;
        this.e1 = 1;
      }
    },
  },
  methods: {
    openRBZ(data) {
      this.rbz_username = data.rbz_username;
      this.rbz_password = data.rbz_password;
      this.selected_user = data.id;
      this.dialogUserRBZ = true;
      console.log(this.rbz_password);
    },
    saveRBZCredentials() {
      if (!this.rbz_username) {
        this.$swal.fire({
          type: "error",
          title: "Update RBZ Credentials Failed",
          text: "Please enter a valid user name",
        });
      } else if (!this.rbz_password) {
        this.$swal.fire({
          type: "error",
          title: "Update RBZ Credentials Failed",
          text: "Please enter a valid password",
        });
      } else {
        this.dialogloader = true;
        let headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$session.get("user").token,
        };
        let rbzData = {
          selected_user: this.selected_user,
          rbz_username: this.rbz_username,
          rbz_password: this.rbz_password,
        };
        Axios.post(this.nodeApi + "/updateUsersRBZCredentials", rbzData, {
          headers: headers,
        }).subscribe(
          (res) => {
            //console.log(res.data)
            if (res.data.data.one) {
              this.initializeUser();
              this.dialogUserRBZ = false;
              this.dialogloader = false;

              this.$swal.fire({
                type: "success",
                title: "Update RBZ Credentials",
                text: "You have successfully updated this users rbz credentials",
              });
            } else {
              this.$swal.fire({
                type: "error",
                title: "Update RBZ Credentials Failed",
                text: res.data.message,
              });
            }
          },
          (err) => {
            this.$swal.fire("User Link Error", err, "error");
          }
        );
      }
    },
    LinkUserToBranch(data) {
      // console.log(data)
      // console.log(this.UserLinkFormData.branch_id)
      this.dialogAddUserList = false;

      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      Axios.put(
        this.nodeApi + "/updateUsersWhatsList/" + data,
        { value: 1 },
        { headers: headers }
      ).subscribe(
        (res) => {
          //console.log(res.data)
          if (res.data.data.one) {
            this.getAllUserTypes2();
            this.$swal.fire({
              type: "success",
              title: "User Added",
              text: "User Added was added successfully",
            });
          } else {
            this.$swal.fire({
              type: "error",
              title: "User Adding Failed",
              text: res.data.message,
            });
          }
        },
        (err) => {
          this.$swal.fire("User Link Error", err, "error");
        }
      );
    },
    LinkUserToBranch5(data) {
      // console.log(data)
      // console.log(this.UserLinkFormData.branch_id)
      this.dialogAddUserList5 = false;

      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      Axios.put(
        this.nodeApi + "/updateUsersWhatsList5/" + data,
        { value: 1 },
        { headers: headers }
      ).subscribe(
        (res) => {
          //console.log(res.data)
          if (res.data.data.one) {
            this.getAllUserTypes2();
            this.$swal.fire({
              type: "success",
              title: "User Added",
              text: "User Added was added successfully",
            });
          } else {
            this.$swal.fire({
              type: "error",
              title: "User Adding Failed",
              text: res.data.message,
            });
          }
        },
        (err) => {
          this.$swal.fire("User Link Error", err, "error");
        }
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
        Axios.get(this.nodeApi + "/getAllUserTypesAlertsNun", {
          headers: headers,
        }).subscribe(
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
    getAllNullUsersByBranch5() {
      if (this.UserLinkFormData.branch_name != "") {
        this.dialogAddUserList5 = true;
        let headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$session.get("user").token,
        };
        Axios.get(this.nodeApi + "/getAllUserTypesAlertsNun5", {
          headers: headers,
        }).subscribe(
          (res) => {
            this.UserLinkDataNull5 = res.data.data.one.recordset;
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
    restPassword(data) {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      this.$swal
        .fire({
          title: "Are you sure you want to rest password?",
          text: "default password is : 123456789",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Rest Password!",
        })
        .then((result) => {
          if (result.value) {
            let dataPost = {
              password: 123456789,
              email: data.email,
            };

            Axios.post(this.nodeApi + "/updateUserPassword", dataPost, {
              headers: headers,
            }).subscribe(
              (res) => {
                //console.log(res)

                this.$swal.fire({
                  type: "success",
                  title: "Password Rest",
                  text: "Password rest successfully",
                });
              },
              (err) => console.log(err)
            );
          }
        });
    },
    addFloatAccount(data) {
      console.log(data);
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
    getUserType(status) {
      if (status == 1) {
        return "Admin";
      }
      if (status == 2) {
        return "Teller";
      }
      if (status == 3) {
        return "Supervisor";
      }
      if (status == 4) {
        return "Manager";
      }
      if (status == 5) {
        return "Treasury";
      }
    },
    openAddNewUser() {
      this.dialogUser = true;
      this.getAllUserTypes();
    },
    openAddNewUser1() {
      this.dialogUser1 = true;
      this.getAllUserTypes2();
    },
    getAllUserTypes() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      Axios.get(this.nodeApi + "/getAllUserTypes", { headers: headers }).subscribe(
        (res) => {
          this.userlevelData = res.data.data.one.recordset;
          //console.log(this.userlevelData)
        },
        (err) => console.log(err)
      );
    },
    async getAllUserTypes2() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      await Axios.get(this.nodeApi + "/getAllUserTypesAlerts", {
        headers: headers,
      }).subscribe(
        (res) => {
          this.UserLinkData = res.data.data.one.recordset;
          //console.log(this.userlevelData)
        },
        (err) => console.log(err)
      );

      await Axios.get(this.nodeApi + "/getAllUserTypesAlerts5", {
        headers: headers,
      }).subscribe(
        (res) => {
          this.UserLinkData5 = res.data.data.one.recordset;
          //console.log(this.userlevelData)
        },
        (err) => console.log(err)
      );
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
    saveNewUser() {
      if (!this.editedUser.user_type) {
        this.$swal.fire("User type Error", "Please select a user type.", "error");
      } else if (!this.editedUser.username) {
        this.$swal.fire("User Name Error", "Please enter a User Name.", "error");
      } else if (!this.editedUser.first_name || !this.editedUser.last_name) {
        this.$swal.fire("Name Error", "Please enter Firt Name and Last Name.", "error");
      } else if (!this.editedUser.email) {
        this.$swal.fire("Email Error", "Please enter an email.", "error");
      } else if (!this.validateEmail(this.editedUser.email)) {
        this.$swal.fire("Email Error", "Please enter a valid email address.", "error");
      } else if (!this.isValidPhone) {
        this.$swal.fire("Phone Error", "Please enter a valid phone number.", "error");
      } else {
        let headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$session.get("user").token,
        };
        this.editedUser.created_by = this.$session.get("user").userdetails.id;
        Axios.post(this.nodeApi + "/createUser", this.editedUser, {
          headers: headers,
          timeout: 5000,
        }).subscribe(
          (res) => {
            //console.log(res.data)
            if (res.data.message.one) {
              this.editedUser = this.ClearUser;
              this.initializeUser();
              this.addUserFloat(res.data.message.one.recordset.insertId);
              this.dialogUser = false;
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
          (err) => {
            this.dialogloader = false;
            this.$swal.fire(
              "User Adding",
              "Failed to add branch account, probably because the user already has this type of account",
              "error"
            );
          }
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
            this.$swal.fire({
              type: "success",
              title: "User Account Adding",
              text: "User account was added successfully",
            });
          } else {
            this.dialogloader = false;
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
    validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    editItemUser(item) {
      this.getAllUserTypes();
      // console.log(item)
      this.editedIndexUser = this.UsersData.indexOf(item);
      this.editedUser = Object.assign({}, item);
      this.editCheck = true;
      this.dialogUser = true;
    },
    deleteItemUser(item) {
      // console.log(item)
      const index = this.UsersData.indexOf(item);
      this.$swal
        .fire({
          title: "Disable User?",
          text: "Are you sure you want to remove this user from list !",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, disable!",
        })
        .then((result) => {
          if (result.value) {
            let headers = {
              "Content-Type": "application/json",
              Authorization: "Bearer " + this.$session.get("user").token,
            };

            Axios.put(
              this.nodeApi + "/updateUsersWhatsList/" + item.id,
              { value: 0 },
              { headers: headers }
            ).subscribe(
              (res) => {
                //console.log(res.data)
                if (res.data.data.one) {
                  this.getAllUserTypes2();
                  this.$swal.fire({
                    type: "success",
                    title: "User Removed",
                    text: "User Removed was added successfully",
                  });
                } else {
                  this.$swal.fire({
                    type: "error",
                    title: "User Removing Failed",
                    text: res.data.message,
                  });
                }
              },
              (err) => {
                this.$swal.fire("User Link Error", err, "error");
              }
            );
          }
        });
    },
    deleteItemUser5(item) {
      // console.log(item)
      const index = this.UsersData.indexOf(item);
      this.$swal
        .fire({
          title: "Disable User?",
          text: "Are you sure you want to remove this user from list !",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, disable!",
        })
        .then((result) => {
          if (result.value) {
            let headers = {
              "Content-Type": "application/json",
              Authorization: "Bearer " + this.$session.get("user").token,
            };

            Axios.put(
              this.nodeApi + "/updateUsersWhatsList5/" + item.id,
              { value: 0 },
              { headers: headers }
            ).subscribe(
              (res) => {
                //console.log(res.data)
                if (res.data.data.one) {
                  this.getAllUserTypes2();
                  this.$swal.fire({
                    type: "success",
                    title: "User Removed",
                    text: "User Removed was added successfully",
                  });
                } else {
                  this.$swal.fire({
                    type: "error",
                    title: "User Removing Failed",
                    text: res.data.message,
                  });
                }
              },
              (err) => {
                this.$swal.fire("User Link Error", err, "error");
              }
            );
          }
        });
    },
    saveUser() {
      this.editedUser.email = this.editedUser.email.replace(/\s/g, "");
      if (!this.editedUser.user_type) {
        this.$swal.fire("User type Error", "Please select a user type.", "error");
      } else if (!this.editedUser.username) {
        this.$swal.fire("User Name Error", "Please enter a User Name.", "error");
      } else if (!this.editedUser.first_name || !this.editedUser.last_name) {
        this.$swal.fire("Name Error", "Please enter Firt Name and Last Name.", "error");
      } else if (!this.editedUser.email) {
        this.$swal.fire("Email Error", "Please enter an email.", "error");
      } else if (!this.isValidPhone) {
        this.$swal.fire("Phone Error", "Please enter a valid phone number.", "error");
      } else if (!this.validateEmail(this.editedUser.email)) {
        this.$swal.fire("Email Error", "Please enter a valid email address.", "error");
      } else {
        let headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$session.get("user").token,
        };

        Axios.put(this.nodeApi + "/updateUsers/" + this.editedUser.id, this.editedUser, {
          headers: headers,
          timeout: 5000,
        }).subscribe(
          (res) => {
            if (res.data.data.one) {
              this.editedUser = this.ClearUser;
              this.initializeUser();
              this.dialogUser = false;
              this.$swal.fire({
                type: "success",
                title: "User edit",
                text: "User was edit successfully",
              });
            } else {
              this.$swal.fire({
                type: "error",
                title: "User Adding Edit",
                text: res.data.message,
              });
            }
          },
          (err) => {
            this.dialogloader = false;
            this.$swal.fire(
              "User Adding",
              "Failed to edit user, probably because another user has the same email or phone number.",
              "error"
            );
          }
        );
      }
    },
    initializeUser() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      // console.log(headers)
      Axios.get(this.nodeApi + "/getAllUsers", { headers: headers }).subscribe(
        (res) => {
          this.UsersData = res.data.data.one.recordset;
          //console.log(this.companyData)
        },
        (err) => console.log(err)
      );
    },
    //this code is for the user admin dialog
    closeUser() {
      this.editCheck = false;
      this.dialogUser = false;
      setTimeout(() => {
        this.editedUser = Object.assign({}, this.defaultUser);
        this.editedIndexUser = -1;
      }, 300);
    },
  },
};
</script>
<style scoped></style>
