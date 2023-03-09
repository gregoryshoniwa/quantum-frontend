<template>
  <div>
    <v-layout row justify-end class="white--text hidden-md-and-up">
      <h2 style="color: grey">Rates Administration Form</h2>
    </v-layout>
    <v-toolbar flat color="yellow darken-3">
      <v-toolbar-title class="white--text">Rates Administration Form</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="openAddNewUser">Create New Currency Rates</v-btn>
      <!-- <v-btn color="error" @click="openAddNewUser2">Update Inter-Bank Rate</v-btn> -->

      <v-dialog v-model="dialogUser" max-width="600px">
        <v-card>
          <v-card-title class="yellow darken-2 white--text">
            <span class="headline">Currency Rates Form</span>
          </v-card-title>

          <v-layout wrap ma-3>
            <v-flex xs12 sm6>
              <v-combobox
                :disabled="editCheck"
                v-model="editedUser.currency_id"
                :items="currencyData"
                label="Select Foreign Currency"
                item-text="iso_code"
                item-value="id"
              >
                <template slot="item" slot-scope="data">
                  <v-avatar left tile>
                    <img
                      :src="image + data.item.image"
                      style="
                        max-width: 100px;
                        height: auto;
                        margin-right: 30px;
                        padding: 5px;
                      "
                    />
                  </v-avatar>
                  {{ data.item.iso_code }}
                </template>
              </v-combobox>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field
                v-model="editedUser.buy_rate"
                label="Buying Rate"
                type="text"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-combobox
                :disabled="editCheck"
                v-model="editedUser.local_currency_id"
                :items="currencyData"
                label="Select Local Currency"
                item-text="iso_code"
                item-value="id"
              >
                <template slot="item" slot-scope="data">
                  <v-avatar left tile>
                    <img
                      :src="image + data.item.image"
                      style="
                        max-width: 100px;
                        height: auto;
                        margin-right: 30px;
                        padding: 5px;
                      "
                    />
                  </v-avatar>
                  {{ data.item.iso_code }}
                </template>
              </v-combobox>
            </v-flex>

            <v-flex xs12 sm6>
              <v-text-field
                v-model="editedUser.sell_rate"
                label="Selling Rate"
                type="text"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-spacer></v-spacer>
          <v-btn color="red" class="white--text" @click="dialogUser = false">Close</v-btn>
          <v-btn
            v-show="!editCheck"
            color="green"
            class="white--text"
            @click="saveNewUser"
            >Save</v-btn
          >
          <v-btn v-show="editCheck" color="green" class="white--text" @click="saveUser"
            >Update</v-btn
          >
        </v-card>
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
      :pagination.sync="pagination"
      :key="UsersData.id"
      :items="UsersData"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>

        <td class="text-xs-left">
          <v-avatar left tile>
            <img
              :src="image + props.item.currency_image"
              style="max-width: 100px; height: auto; margin-right: 30px; padding: 5px"
            />
          </v-avatar>
          {{ props.item.currency_id }}
        </td>
        <td class="text-xs-left">{{ props.item.buy_rate }}</td>
        <td class="text-xs-left">{{ props.item.sell_rate }}</td>
        <td class="text-xs-left">
          <v-avatar left tile>
            <img
              :src="image + props.item.local_currency_image"
              style="max-width: 100px; height: auto; margin-right: 30px; padding: 5px"
            />
          </v-avatar>
          {{ props.item.local_currency_id }}
        </td>

        <td class="text-xs-left">{{ props.item.status }}</td>

        <td class="justify-left">
          <v-icon small class="mr-2" @click="editItemUser(props.item)"> edit </v-icon>
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

    <v-dialog v-model="dialogUser2" max-width="600px">
      <v-card>
        <v-card-title class="yellow darken-2 white--text">
          <span class="headline">Inter-Bank Rates Form</span>
        </v-card-title>

        <v-layout wrap ma-3>
          <v-flex xs12 sm6>
            <v-combobox
              :disabled="editCheck"
              v-model="editedUser.currency_id"
              :items="currencyData"
              label="Select Foreign Currency"
              item-text="iso_code"
              item-value="id"
            >
              <template slot="item" slot-scope="data">
                <v-avatar left tile>
                  <img
                    :src="image + data.item.image"
                    style="
                      max-width: 100px;
                      height: auto;
                      margin-right: 30px;
                      padding: 5px;
                    "
                  />
                </v-avatar>
                {{ data.item.iso_code }}
              </template>
            </v-combobox>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field
              v-model="editedUser.buy_rate"
              label="Buying Rate"
              type="text"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-combobox
              :disabled="editCheck"
              v-model="editedUser.local_currency_id"
              :items="currencyData"
              label="Select Local Currency"
              item-text="iso_code"
              item-value="id"
            >
              <template slot="item" slot-scope="data">
                <v-avatar left tile>
                  <img
                    :src="image + data.item.image"
                    style="
                      max-width: 100px;
                      height: auto;
                      margin-right: 30px;
                      padding: 5px;
                    "
                  />
                </v-avatar>
                {{ data.item.iso_code }}
              </template>
            </v-combobox>
          </v-flex>

          <v-flex xs12 sm6>
            <v-text-field
              v-model="editedUser.sell_rate"
              label="Selling Rate"
              type="text"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-spacer></v-spacer>
        <v-btn color="red" class="white--text" @click="dialogUser2 = false">Close</v-btn>
        <v-btn v-show="!editCheck" color="green" class="white--text" @click="saveNewUser"
          >Save</v-btn
        >
        <v-btn v-show="editCheck" color="green" class="white--text" @click="saveUser"
          >Update</v-btn
        >
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
      imagezwd: "/img/zwd.png",
      imageusd: "/img/usd.png",
      image: "/img/",
      phone: "",
      phoneData: "",
      counter: 0,
      isActive: true,
      isValidPhone: false,
      dialogUserEdit: false,
      currencyData: [],
      pagination: {
        sortBy: "currency_id",
        descending: true,
        rowsPerPage: 25,
      },
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
        { text: "Rate ID", value: "id" },
        {
          text: "Currency",
          align: "left",
          sortable: false,
          value: "currency_id",
        },
        { text: "Buying Rate", value: "buy_rate" },
        { text: "Selling Rate", value: "sell_rate" },
        { text: "Local Currency Type", value: "local_currency" },
        { text: "Status", value: "status" },

        { text: "Actions", value: "username", sortable: false },
      ],
      search: "",
      dialogUser: false,
      dialogUser2: false,
      e1: 0,
      editCheck: false,
      editedIndexUser: -1,
      search: "",
      editedUser: {
        id: 0,
        currency_id: null,
        local_currency_id: null,
        buy_rate: 0,
        sell_rate: 0,

        status: 2,

        created_by: 0,
      },
      ClearUser: {
        id: 0,
        currency_id: null,
        local_currency_id: null,
        buy_rate: 0,
        sell_rate: 0,

        status: 2,

        created_by: 0,
      },
    };
  },
  created() {
    this.initializeUser();
    this.getAllCurrencies();
    this.counter += 1;
  },
  watch: {
    dialogUser(val){
      if(!val){
        this.editedUser = {
        id: 0,
        currency_id: null,
        local_currency_id: null,
        buy_rate: 0,
        sell_rate: 0,

        status: 2,

        created_by: 0,
      }
      }
    },
    phone(val) {
      //console.log(val)
    },
    counter(val) {
      //console.log(val)
    },
  },
  methods: {
    convertToDate(date) {
      var newdate = new Date(date).toDateString();
      return newdate;
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
      this.editCheck = false;
      this.editedUser = this.ClearUser;
    },
    openAddNewUser2() {
      this.dialogUser2 = true;
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
      }
      if (!phoneData.isValid) {
        this.isActive = true;
        //console.log(phoneData)
      }
    },
    saveNewUser() {
      if (!this.editedUser.currency_id) {
        this.$swal.fire("Rate Error", "Please enter a foreign currency.", "error");
      } else if (!this.editedUser.local_currency_id) {
        this.$swal.fire("Rate Error", "Please enter a local currency.", "error");
      } else if (!this.editedUser.buy_rate) {
        this.$swal.fire("Rate Error", "Please enter a buy rate.", "error");
      } else if (!this.editedUser.sell_rate) {
        this.$swal.fire("Rate Error", "Please enter a sell rate.", "error");
      } else {
        let headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$session.get("user").token,
        };
        this.editedUser.created_by = this.$session.get("user").userdetails.id;
        this.editedUser.currency_id = this.editedUser.currency_id.id;
        this.editedUser.local_currency_id = this.editedUser.local_currency_id.id;
        //console.log(this.editedUser)
        Axios.post(this.nodeApi + "/addRates", this.editedUser, {
          headers: headers,
        }).subscribe(
          (res) => {
            //console.log(res.data)
            if (res.data.data.one) {
              this.editedUser = this.ClearUser;
              this.initializeUser();
              this.dialogUser = false;
              this.$swal.fire({
                type: "success",
                title: "Rate Added",
                text: "Rate was added successfully",
              });
            } else {
              this.$swal.fire({
                type: "error",
                title: "Rate Adding Failed",
                text: res.data.message,
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
      this.editedIndexUser = this.UsersData.indexOf(item);

      this.editedUser = Object.assign({}, item);
      //console.log(this.editedUser)
      this.editCheck = true;
      this.dialogUser = true;
    },
    deleteItemUser(item) {
      // console.log(item)
      const index = this.UsersData.indexOf(item);
      this.$swal
        .fire({
          title: "Delete Rates?",
          text: "Are you sure you want to delete this !",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete!",
        })
        .then((result) => {
          if (result.value) {
            let headers = {
              "Content-Type": "application/json",
              Authorization: "Bearer " + this.$session.get("user").token,
            };
            Axios.post(
              this.nodeApi + "/deleteRates",
              { wcol: "id", wvalue: item.id },
              { headers: headers }
            ).subscribe(
              (res) => {
                if (res.data.data.one) {
                  this.$swal.fire(
                    "Deleted!",
                    "Currency rate has been deleted.",
                    "success"
                  );
                } else {
                  this.$swal.fire({
                    type: "error",
                    title: "Rates Delete Failed",
                    text: res.data.message,
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
      if (!this.editedUser.currency_id) {
        this.$swal.fire("Rates Error", "Please enter Foreign Currency.", "error");
      } else if (!this.editedUser.local_currency_id) {
        this.$swal.fire("Client ID Error", "Please enter local currency.", "error");
      } else {
        console.log(this.editedUser);
        let headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$session.get("user").token,
        };
        this.editedUser.created_by = this.$session.get("user").userdetails.id;
        this.editedUser.username = this.$session.get("user").userdetails.username;
        Axios.put(this.nodeApi + "/updateRates/" + this.editedUser.id, this.editedUser, {
          headers: headers,
        }).subscribe(
          (res) => {
            if (res.data.data.one) {
              this.editedUser = this.ClearUser;
              this.initializeUser();
              this.dialogUser = false;
              this.$swal.fire({
                type: "success",
                title: "Rates edit",
                text: "Rate was edited successfully",
              });
            } else {
              this.$swal.fire({
                type: "error",
                title: "Rates Edit",
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
      Axios.get(this.nodeApi + "/getAllRates", { headers: headers }).subscribe(
        (res) => {
          this.UsersData = res.data.data.one.recordset;
          //console.log(this.companyData)
        },
        (err) => console.log(err)
      );
    },
    getAllCurrencies() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      // console.log(headers)
      Axios.get(this.nodeApi + "/getAllCurrenciesActive", { headers: headers }).subscribe(
        (res) => {
          this.currencyData = res.data.data.one.recordset;
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
