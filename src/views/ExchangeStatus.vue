<template>
  <div>
    <v-toolbar flat color="yellow darken-3">
      <v-toolbar-title class="white--text">Client Administration Form</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="openAddNewUser">Create Client</v-btn>

      <v-dialog v-model="dialogUser" max-width="600px">
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step editable :complete="e1 > 1" step="1"
              >Personal Information</v-stepper-step
            >

            <v-divider></v-divider>

            <v-stepper-step editable step="2">Client Type</v-stepper-step>
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
                    v-model="editedUser.id_number"
                    label="National ID"
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
                <v-flex xs12 sm6 md6>
                  <v-text-field
                    v-model="editedUser.email"
                    label="Email Address"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field
                    v-model="editedUser.date_of_birth"
                    label="Date of Birth(DD-MM-YYYY)"
                    type="date"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md12>
                  <v-text-field
                    v-model="editedUser.address"
                    label="Address"
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-btn color="primary" @click="e1 = 2"> Continue </v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-layout wrap justify-center>
                <v-flex xs12 sm md12>
                  <v-select
                    v-model="editedUser.company_id"
                    label="Client Type"
                    item-text="status"
                    item-value="id"
                    :items="userlevelData"
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
      :key="UsersData.id"
      :items="UsersData"
      must-sort
      :search="search"
      :pagination.sync="pagination"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>

        <td class="text-xs-left">
          {{ props.item.first_name }} {{ props.item.last_name }}
        </td>
        <td class="text-xs-left">{{ props.item.id_number }}</td>
        <td class="text-xs-left">{{ convertToDate(props.item.date_of_birth) }}</td>
        <td class="text-xs-left">{{ props.item.cell }}</td>

        <td class="text-xs-left">{{ props.item.nationality }}</td>
        <td>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn small color="red" icon @click="ClientHistory(props.item, 'Sell')">
                <v-icon v-on="on" medium class="white--text"> trending_up </v-icon>
              </v-btn>
            </template>
            <span>Client Sell History</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn small color="blue" icon @click="ClientHistory(props.item, 'Buy')">
                <v-icon v-on="on" medium class="white--text"> trending_down </v-icon>
              </v-btn>
            </template>
            <span>Client Buy History</span>
          </v-tooltip>
        </td>
        <!-- <td class="justify-left">
                <v-icon
                  small
                  class="mr-2"
                  @click="editItemUser(props.item)"
                >
                  edit
                </v-icon>
                
              </td> -->
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

    <!-- add user to branch creation dialog -->
    <v-dialog v-model="dialogClientHistory" max-width="800px">
      <v-card>
        <v-card-title class="yellow darken-2 white--text">
          <span class="headline">Client Transaction History</span>
          <v-spacer></v-spacer>
          <v-btn color="red" class="white--text" @click="dialogClientHistory = false"
            >Close</v-btn
          >
        </v-card-title>

        <v-layout row wrap ma-3 justify-end>
          <v-flex xs12 md4>
            <v-text-field
              v-model="search2"
              append-icon="search"
              label="Search"
              single-line
              hide-details
              style="margin: 5px"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md8>
            <v-btn-toggle mandatory v-model="toggleDates" color="primary">
              <v-btn flat value="1"> Today </v-btn>
              <v-btn flat value="2"> This Week </v-btn>
              <v-btn flat value="3"> Month </v-btn>
            </v-btn-toggle>
            <v-btn color="primary" @click="dialogdaterange = true">
              Specific Range
            </v-btn>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon>
                  <export-excel
                    class="btn btn-default"
                    :data="clientData"
                    :fields="json_fields"
                    worksheet="Tran_Worksheet"
                    name="ClientTransactionsReport.xls"
                  >
                    <v-icon v-on="on" color="green darken-2">library_add</v-icon>
                  </export-excel>
                </v-btn>
              </template>
              <span>Export to excel</span>
            </v-tooltip>
          </v-flex>
        </v-layout>
        <v-data-table
          :headers="headersClients"
          :key="clientData.client_id"
          :items="clientData"
          must-sort
          :pagination.sync="pagination1"
          :search="search2"
          class="elevation-1"
        >
          <template v-slot:items="props">
            <td class="text-xs-left">{{ props.item.branch }}</td>
            <td class="text-xs-left">
              {{ props.item.first_name }} {{ props.item.last_name }}
            </td>
            <td class="text-xs-left">{{ props.item.tran_type }}</td>
            <td class="text-xs-left">
              <v-avatar left tile>
                <img
                  :src="image + props.item.image"
                  style="max-width: 100px; height: auto; margin-right: 30px; padding: 5px"
                />
              </v-avatar>
              ${{ props.item.client_amount }}
            </td>
            <td class="text-xs-left">{{ props.item.rate }}</td>
            <td class="text-xs-left">{{ props.item.date_time }}</td>
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
  </div>
</template>
<script>
import Axios from "axios-observable";
export default {
  // props: ['value'],
  data() {
    return {
      nodeApi: "",
      image: "/img/",
      //nodeApi: '',
      userlevelData: [],
      phone: "",
      phoneData: "",
      counter: 0,
      isActive: true,

      toggleDates: "1",
      end_date: null,
      start_date: null,
      dialogdaterange: false,
      search2: "",
      dialogClientHistory: false,
      isValidPhone: false,
      clientData: [],
      dialogUserEdit: false,
      userlevelData: [
        { status: "Individual", id: 1 },
        { status: "Company", id: 0 },
      ],
      UsersData: [],
      statusData: [
        { status: "Active", id: 2 },
        { status: "Disabled", id: 3 },
      ],
      headersUsers: [
        { text: "Client ID", value: "id" },
        {
          text: "Full Name",
          align: "left",

          value: "first_name",
        },
        { text: "National ID", value: "fullname" },
        { text: "Date of Birth", value: "date_of_birth" },
        { text: "Cell Number", value: "cell" },
        { text: "Nationality", value: "nationality" },
        { text: "Actions", value: "nationality" },
      ],
      headersClients: [
        { text: "Branch", value: "branch" },
        {
          text: "Full Name",
          align: "left",

          value: "first_name",
        },
        { text: "Tran Type", value: "tran_type" },
        { text: "Amount", value: "client_amount" },
        { text: "Rate", value: "rate" },
        { text: "Date", value: "date_time" },
      ],
      search: "",
      dialogUser: false,
      e1: 0,
      editCheck: false,
      editedIndexUser: -1,
      pagination: {
        rowsPerPage: 10,
      },
      pagination1: {
        rowsPerPage: 10,
      },
      search: "",
      editedUser: {
        id: 0,
        first_name: "",
        last_name: "",
        email: "",
        id_number: "",
        date_of_birth: null,
        address: "",
        countryCode: "",
        company_id: 1,
        branch_id: 0,
        user_type: 0,
        nationality: "",
        status: 2,
        cell: "",
        created_by: 0,
      },
      json_fields: {
        "Branch Name": "branch",
        "Transaction Date Time": "date_time",
        "Transaction Type": "tran_type",

        "Client First Name": "first_name",
        "Client Last Name": "last_name",

        Currency: "symbol",
        Amount: "client_amount",

        Rate: "rate",
      },
      ClearUser: {
        id: 0,
        first_name: "",
        last_name: "",
        email: "",
        id_number: "",
        date_of_birth: null,
        address: "",
        countryCode: "",
        company_id: 1,
        branch_id: 0,
        user_type: 0,
        nationality: "",
        status: 2,
        cell: "",
        created_by: 0,
      },
      selectedClientData: null,
      clientTransactionType: null,
    };
  },
  created() {
    this.initializeUser();
    this.counter += 1;
  },
  watch: {
    toggleDates(val) {
      if (val == "1") {
        this.ClientHistory(this.selectedClientData, this.clientTransactionType);
      }
      if (val == "2") {
        this.ClientHistory(this.selectedClientData, this.clientTransactionType);
      }
      if (val == "3") {
        this.ClientHistory(this.selectedClientData, this.clientTransactionType);
      }
    },
    phone(val) {
      //console.log(val)
    },
    counter(val) {
      //console.log(val)
    },
    dialogUser(val) {
      if (val == false) {
        this.editCheck = false;
        //this.editedUser = this.ClearUser
        this.editedUser.first_name = "";
        this.editedUser.last_name = "";
        this.editedUser.email = "";
        this.editedUser.id_number = "";
        this.editedUser.date_of_birth = null;
        this.editedUser.address = "";
        this.editedUser.cell = "";
        this.e1 = 1;
      }
    },
  },
  methods: {
    async daterange() {
      var currentdate = new Date(this.end_date);
      currentdate.setDate(currentdate.getDate() + 1);
      var fulldate = currentdate.toISOString();
      this.end_date = fulldate.substring(0, 10);

      //   console.log(this.start_date)
      //  console.log(this.end_date)

      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      var datamain = {
        client_id: this.selectedClientData.id,
        tran_type: 1,
        start: this.start_date,
        end: this.end_date,
      };
      await Axios.post(
        this.nodeApi + "/getFullClientsTransactionsByIDSpecific",
        datamain,
        { headers: headers }
      ).subscribe(
        (res) => {
          this.clientData = res.data.data.one.recordset;
          this.dialogdaterange = false;
          //console.log(this.companyData)
        },
        (err) => console.log(err)
      );
    },
    ClientHistory(data, type) {
      this.selectedClientData = data;
      this.clientTransactionType = type;
      if (type == "Buy") {
        if (this.toggleDates == "1") {
          let headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.$session.get("user").token,
          };
          var datamain = {
            client_id: data.id,
            tran_type: 1,
          };
          // console.log(headers)
          Axios.post(this.nodeApi + "/getFullClientsTransactionsByIDNow", datamain, {
            headers: headers,
          }).subscribe(
            (res) => {
              this.clientData = res.data.data.one.recordset;
              this.dialogClientHistory = true;
              //console.log(this.companyData)
            },
            (err) => console.log(err)
          );
        }
        if (this.toggleDates == "2") {
          let headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.$session.get("user").token,
          };
          var datamain = {
            client_id: data.id,
            tran_type: 1,
          };
          // console.log(headers)
          Axios.post(this.nodeApi + "/getFullClientsTransactionsByIDWeek", datamain, {
            headers: headers,
          }).subscribe(
            (res) => {
              this.clientData = res.data.data.one.recordset;
              this.dialogClientHistory = true;
              //console.log(this.companyData)
            },
            (err) => console.log(err)
          );
        }
        if (this.toggleDates == "3") {
          let headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.$session.get("user").token,
          };
          var datamain = {
            client_id: data.id,
            tran_type: 1,
          };
          // console.log(headers)
          Axios.post(this.nodeApi + "/getFullClientsTransactionsByIDMonth", datamain, {
            headers: headers,
          }).subscribe(
            (res) => {
              this.clientData = res.data.data.one.recordset;
              this.dialogClientHistory = true;
              //console.log(this.companyData)
            },
            (err) => console.log(err)
          );
        }
      }
      if (type == "Sell") {
        if (this.toggleDates == "1") {
          let headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.$session.get("user").token,
          };
          var datamain = {
            client_id: data.id,
            tran_type: 2,
          };
          // console.log(headers)
          Axios.post(this.nodeApi + "/getFullClientsTransactionsByIDNow", datamain, {
            headers: headers,
          }).subscribe(
            (res) => {
              this.clientData = res.data.data.one.recordset;
              this.dialogClientHistory = true;
              //console.log(this.companyData)
            },
            (err) => console.log(err)
          );
        }
        if (this.toggleDates == "2") {
          let headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.$session.get("user").token,
          };
          var datamain = {
            client_id: data.id,
            tran_type: 2,
          };
          // console.log(headers)
          Axios.post(this.nodeApi + "/getFullClientsTransactionsByIDWeek", datamain, {
            headers: headers,
          }).subscribe(
            (res) => {
              this.clientData = res.data.data.one.recordset;
              this.dialogClientHistory = true;
              //console.log(this.companyData)
            },
            (err) => console.log(err)
          );
        }
        if (this.toggleDates == "3") {
          let headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.$session.get("user").token,
          };
          var datamain = {
            client_id: data.id,
            tran_type: 2,
          };
          // console.log(headers)
          Axios.post(this.nodeApi + "/getFullClientsTransactionsByIDMonth", datamain, {
            headers: headers,
          }).subscribe(
            (res) => {
              this.clientData = res.data.data.one.recordset;
              this.dialogClientHistory = true;
              //console.log(this.companyData)
            },
            (err) => console.log(err)
          );
        }
      }
    },
    convertToDate(date) {
      const months = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ];
      let current_datetime = new Date(date);
      let formatted_date =
        current_datetime.getDate() +
        "-" +
        months[current_datetime.getMonth()] +
        "-" +
        current_datetime.getFullYear();
      // console.log(formatted_date)
      // var newdate = new Date(date).toDateString()
      return formatted_date;
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
    getTelePhone(e, phoneData) {
      if (phoneData.isValid) {
        this.isActive = false;
        //console.log(phoneData)
        this.isValidPhone = phoneData.isValid;
        this.editedUser.nationality = phoneData.country.name;
        this.editedUser.countryCode = phoneData.country.iso2;
      }
      if (!phoneData.isValid) {
        this.isActive = true;
        //console.log(phoneData)
      }
    },
    async saveNewUser() {
      if (!this.editedUser.id_number) {
        this.$swal.fire("Client ID Error", "Please enter client ID.", "error");
      } else if (this.editedUser.id_number.length < 7) {
        this.$swal.fire("Client ID Error", "Please enter client ID.", "error");
      } else if (!this.isValidPhone) {
        this.$swal.fire("Phone Error", "Please enter a valid phone number.", "error");
      } else if (!this.editedUser.first_name || !this.editedUser.last_name) {
        this.$swal.fire("Name Error", "Please enter First Name and Last Name.", "error");
      }
      //  else if(!this.editedUser.email){
      //    this.$swal.fire(
      //       'Email Error',
      //       'Please enter an email.',
      //       'error'
      //     )
      //   }

      // else if(!this.validateEmail(this.editedUser.email)){
      //    this.$swal.fire(
      //       'Email Error',
      //       'Please enter a valid email address.',
      //       'error'
      //     )
      //   }
      else {
        let headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$session.get("user").token,
        };
        this.editedUser.created_by = this.$session.get("user").userdetails.id;
        var tran_id = 0;
        await Axios.post(this.nodeApi + "/addClients", this.editedUser, {
          headers: headers,
          timeout: 5000,
        }).subscribe(
          (res) => {
            try {
              if (res.data.data.one.recordset) {
                tran_id = res.data.data.one.recordset.insertId;
                this.editedUser = this.ClearUser;
                this.initializeUser();
                this.dialogUser = false;
                this.$swal.fire({
                  type: "success",
                  title: "Client Added",
                  text: "Client was added successfully",
                });
              }
            } catch (error) {
              this.$swal.fire({
                type: "error",
                title: "Client Adding Failed",
                text: res.data.message.sqlMessage,
              });
            }
          },
          (err) => {
            this.dialogloader = false;
            this.$swal.fire(
              "Client Adding",
              "Failed to add client account, probably because another client has the same email or phone number.",
              "error"
            );
          }
        );

        //  var data =  {
        //         email: this.editedUser.email,
        //         firstName: this.editedUser.first_name,
        //         lastName: this.editedUser.last_name,
        //         countryCode: this.editedUser.countryCode,
        //         cell: this.editedUser.cell,
        //         nationalId: this.editedUser.id_number,
        //         centreId:"5"
        //     }
        //      let headersloyal = {
        //             'Content-Type': 'application/json',
        //             'Authorisation': 'SzJObE1sWlFUVEp0UkVremN6ZFplRUprUlVReFp6MDlCVlJ2eWY4VzE1NTY4OTI4MjQ=',
        //             'timestamp':'1556893117'

        //         }
        //   await Axios.post('http://dev.contipay.co.zw:82/https://api-dev.contipay.co.zw/request/loyalty/clientRegistration',data,{headers:headersloyal,timeout: 5000,crossDomain: true})
        //           .subscribe(res =>{
        //             console.log(res)

        //           },err =>{
        //             console.log(err)
        //             //  this.dialogloader = false
        //             //  this.$swal.fire(
        //             //    'Client Adding',
        //             //   'Failed to add client account, probably because another client has the same email or phone number.',
        //             //   'error'
        //             // )
        //           }
        //           )

        s;
      }
    },
    validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    editItemUser(item) {
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
          text: "Are you sure you want to disable this !",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, disable!",
        })
        .then((result) => {
          if (result.value) {
            Axios.put(this.nodeApi + "/disableUser/" + item.id, { status: 0 }).subscribe(
              (res) => {
                if (res.data.rowsAffected) {
                  this.$swal.fire(
                    "Disabled!",
                    "User account has been disabled.",
                    "success"
                  );
                }
                if (!res.data.rowsAffected) {
                  this.$swal.fire({
                    type: "error",
                    title: "User Disable Failed",
                    text: res.data.originalError.info.message,
                  });
                }
                this.initializeUser();
                //console.log(res.data)
              },
              (err) => {}
            );
          }
        });
    },
    saveUser() {
      if (!this.editedUser.id_number) {
        this.$swal.fire("Client ID Error", "Please enter client ID.", "error");
      } else if (this.editedUser.id_number.length < 7) {
        this.$swal.fire("Client ID Error", "Please enter client ID.", "error");
      } else if (!this.isValidPhone) {
        this.$swal.fire("Phone Error", "Please enter a valid phone number.", "error");
      } else if (!this.editedUser.first_name || !this.editedUser.last_name) {
        this.$swal.fire("Name Error", "Please enter Firt Name and Last Name.", "error");
      } else if (!this.editedUser.email) {
        this.$swal.fire("Email Error", "Please enter an email.", "error");
      } else if (!this.validateEmail(this.editedUser.email.replace(/\s/g, ""))) {
        this.$swal.fire("Email Error", "Please enter a valid email address.", "error");
      } else {
        let headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$session.get("user").token,
        };
        Axios.put(
          this.nodeApi + "/updateClients/" + this.editedUser.id,
          this.editedUser,
          { headers: headers }
        ).subscribe(
          (res) => {
            if (res.data.message) {
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
          (err) => console.log(err)
        );
      }
    },
    initializeUser() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      // console.log(headers)
      Axios.get(this.nodeApi + "/getAllClients", { headers: headers }).subscribe(
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
