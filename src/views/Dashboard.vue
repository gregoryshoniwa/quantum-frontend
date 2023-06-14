<template>
  <div>
    
    <h2 style="color:green;">Full Branch Transaction Report</h2>
    
    <v-layout row wrap justify-end>
       
         <v-flex xs12 sm6 md4>
            <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Search by anything"
                    single-line
                    hide-details
                    
            ></v-text-field>
        </v-flex>
        

        <v-flex xs12 sm6 md3>

            <!-- <v-menu
                    ref="show_start_date"
                    :close-on-content-click="false"
                    v-model="show_start_date"
                    :nudge-right="40"
                    :return-value.sync="start_date"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
            >
                <v-text-field
                        slot="activator"
                        v-model="start_date"
                        label="From"
                        prepend-icon="event"
                        readonly
                ></v-text-field>
                <v-date-picker
                        v-model="start_date"
                        @input="filterStartDate"
                ></v-date-picker>

            </v-menu> -->

        </v-flex>

        <v-flex xs12 sm6 md3>
            <!-- <v-menu
                    ref="show_end_date"
                    :close-on-content-click="false"
                    v-model="show_end_date"
                    :nudge-right="40"
                    :return-value.sync="end_date"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
            >
                <v-text-field
                        slot="activator"
                        v-model="end_date"
                        label="To"
                        prepend-icon="event"
                        readonly
                ></v-text-field>
                <v-date-picker
                        v-model="end_date"
                        @input="filterEndDate"
                ></v-date-picker>

            </v-menu> -->
        </v-flex>
       
        

        <v-flex xs12 sm6 md2 ma-0>
          <!-- <v-layout>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon @click="refresh">
                  <v-icon v-on="on" color="gray">refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh Report</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon @click="exportPdf">
                  <v-icon v-on="on" color="red darken-2">picture_as_pdf</v-icon>
                </v-btn>
              </template>
              <span>Export to pdf</span>
            </v-tooltip>
            <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon @click="exportExcel">
                <export-excel
                      class   = "btn btn-default"
                      :data   = "rowsFilter"
                      
                      worksheet = "Tran_Worksheet"
                      name    = "TransactionsReport.xls">
                  
                     <v-icon v-on="on" color="green darken-2">library_add</v-icon>
                  
                  </export-excel>
              </v-btn>
            </template>
            <span>Export to excel</span>
          </v-tooltip>
          </v-layout> -->
        </v-flex>
       

        <v-flex xs12>


            <v-data-table
                   
                    :headers="paymentHeaders"
                    :items="rows"
                    must-sort
                    item-key="tran_id"
                   :pagination.sync="pagination"
                    class="elevation-1"
                    width="10"
                    
                    :search="search"
                   
            >
                
                <template v-slot:items="props">
                    <tr >
                        
                        
                       
                        <td >{{ props.item.id}}</td>
                         <td >{{ props.item.created_at}}</td>
                         <td >
                           <v-chip label color="red" text-color="white" v-if="props.item.transaction_type.replace(/\s/g, '') == 'Sell'">
                              {{ props.item.transaction_type }}
                            </v-chip>
                            <v-chip label color="green" text-color="white" v-if="props.item.transaction_type.replace(/\s/g, '') == 'Buy'">
                              {{ props.item.transaction_type }}
                            </v-chip>
                            <v-chip label color="blue" text-color="white" v-if="props.item.transaction_type.replace(/\s/g, '') == 'FloatIn'">
                              {{ props.item.transaction_type }}
                            </v-chip>
                            <v-chip label color="purple" text-color="white" v-if="props.item.transaction_type.replace(/\s/g, '') == 'FloatOut'">
                              {{ props.item.transaction_type }}
                            </v-chip>
                         </td>
                        <td >{{parseFloat(props.item.rate).toFixed(1)}}</td>
                        <td  >{{props.item.receive_currency +' '+ parseFloat(props.item.receive_amount).toFixed(2) }}</td>
                        <td  >{{props.item.disburse_currency +' '+ parseFloat(props.item.disburse_amount).toFixed(2) }}</td>
                        <td  >{{ props.item.first_name}} {{ props.item.last_name}}</td>
                        <td  >{{props.item.created_by }}</td>
                        
                       
                        <td id="chip-usage-example">
                         
                            <v-chip label color="red" text-color="white" v-if="props.item.status.replace(/\s/g, '') == 'canceled'">
                              {{ props.item.status }}
                            </v-chip>
                             <v-chip label color="gray" v-if="props.item.status.replace(/\s/g, '') == 'pending'">
                              {{ props.item.status }}
                            </v-chip>
                             
                            <v-chip label color="red" text-color="white" v-if="props.item.status.replace(/\s/g, '') == 'declined'">
                             declined
                            </v-chip>
                            <v-chip label color="blue" text-color="white" v-if="props.item.status.replace(/\s/g, '') == 'complete'">
                              {{ props.item.status }}
                            </v-chip>
                            <v-chip pill color="gray"  v-if="props.item.status.replace(/\s/g, '') == 'confirmed'">
                               <v-icon left color="blue">person_pin</v-icon>
                              
                             Teller
                            </v-chip>
                            <v-chip pill color="gray"  v-if="props.item.status.replace(/\s/g, '') == 'GM'">
                               <v-icon left color="red">person_pin</v-icon>
                              
                               
                             Manager
                            </v-chip>
                            <v-chip color="gray" v-if="props.item.status.replace(/\s/g, '') == 'SP'">
                               <v-icon left color="red">person_pin</v-icon>
                             Supervisor
                            </v-chip>
                            <v-chip pill color="gray"  v-if="props.item.status.replace(/\s/g, '') == 'TR'">
                              <v-icon left color="red">person_pin</v-icon>
                              Treasury
                            </v-chip>
                            
                           
                        </td>
                    </tr>
                </template>
                <template v-slot:expand="props">
                  <v-card flat>
                    <v-card-text>{{props.item.tran_description}}</v-card-text>
                  </v-card>
                </template>
            </v-data-table>

        </v-flex>
        

    </v-layout>
  </div>
</template>
<script>
import * as jsPDF from 'jspdf'
import * as autoTable from 'jspdf-autotable'
import Axios from  'axios-observable';
  export default {
   
    data: () => ({
       allRates:[],
        totalFloat: [],
      expand: false,
      show_start_date: false,
      nodeApi: '',
      start_date: null,
      is_charged:null,
      show_end_date: false,
      end_date: null,
      user_type: 0,
      center_id :'',
      centreCurrency : '',
      rowsFilter: [],
      paymentHeaders : [
        
        {
          text: 'Tran Ref',
          value: 'id'
        },
        {
          text: 'Tran Date',
          
          value: 'created_at'
        },
        {
          text: 'Type',
          value: 'transaction_type'
        },
        {
          text: 'Rate Cost',
          value: 'rate'
        },
        {
          text: 'Received Amount $',
          value: 'receive_amount'
        }
        ,
        {
          text: 'Disbursed Amount $',
          value: 'disburse_amount'
          
        },
        
        {
          text: 'Client',
          value: 'first_name'
        },
        {
          text: 'User',
          value: 'account',
         
        },
        {
          text: 'Status',
          value: 'status'
        }
      ],
      search:'',
      filters: {
        search: '',
        added_by: '',
        start_date: null,
        end_date: null,
      },
      authors: ['Buy', 'Sell'],
      pagination: {
        sortBy: 'date',
        rowsPerPage: 15
      },
      selected: [],
      filteredRow: [],
      symbol: '',

      //Excel data
      
        json_fields: {
          'tran_id': 'ID',
                'created_by': 'Date',
                
                'tran_amount_total': 'Total Amount',
                'tran_amount': 'Net Amount',
                'tran_charge': 'Tran Cost',
                'tran_merchant': 'Merchant',
                'tran_account': 'Account No',
                'tran_provider': 'Provider',
                'transaction_type': 'Method',
                'status': 'Status',
        },
        json_data: [
            
        ],
        json_meta: [
            [
                {
                    'key': 'charset',
                    'value': 'utf-8'
                }
            ]
        ],
        //End of excel data

      rows: []
    }),
    watch: {
      rowsFilter(val){
       // console.log(val)
      },
      customFilter(val){
        //console.log(val)
      },
      rows(val){
        //console.log(val)
      },
      filters(val){
        //console.log(val)
      }
    },
    beforeMount() {
      
    },
    computed:{
      
     },
    mounted() {
      this.getAllRates()
       this.user_type = this.$session.get('user').userdetails.user_type
       
        this.getAllTransactions()
    },
    methods: {
      async getAllRates(){
            let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
         // console.log(headers)
        await Axios.get(this.nodeApi+'/getAllRates',{headers:headers})
          .subscribe(res =>{
            this.allRates = res.data.data.one.recordset
            
            //console.log(this.allRates)
          },err => console.log(err))
        },
      
      getAllTransactions(){
        let headers = {            
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$session.get('user').token,
            
        }
           Axios.post(this.nodeApi+'/getTransactionsByColBranch',{branch_id:this.$session.get('user').userdetails.branch_id},{headers:headers})
          .subscribe(res =>{
            this.rows = res.data.data.one.recordset
            //console.log(this.companyData)
          },err => console.log(err)) 
      },
      refresh(){
       this.getAllTransactions()
      
      },
      exportPdf(){
      
        // let pdfName = 'TransactionsReport'; 
        //   var doc = new jsPDF();
        //   doc.text(this.rows, 10, 10);
        //   doc.save(pdfName + '.pdf');
        var vm = this
         //console.log(vm.rows)
        var columns = [
          {
          title: 'Tran Ref',
          dataKey: 'id'
          },
           {
          title: 'Date',         
          dataKey: 'created_at'
        },
        {
          title: 'Received $',
          dataKey: 'receive_amount'
        },
        {
          title: 'Disbursed $',
          dataKey: 'disburse_amount'
        },
        {
          title: 'Rate',
          dataKey: 'rate'
        },
        {
          title: 'Branch',
          dataKey: 'name'
        },
        {
          title: 'Disburse Curr.',
          dataKey: 'disburse_currency',
          
        },
        {
          title: 'Receive Curr.',
          dataKey: 'receive_currency',
          
        },
        {
          title: 'Client Name',
          dataKey: 'first_name'
        },
        {
          title: 'Client ID',
          dataKey: 'id_number'
        },
        {
          title: 'Type',
          dataKey: 'transaction_type'
        }

        ]
        var doc = new jsPDF('l','pt')
        var totalPagesExp = "{total_pages_count_string}";

        doc.setTextColor(100);
        // doc.text('Contipay Merchant Report', 10, 20);
        //doc.autoTable(columns,vm.rows)
        doc.autoTable(
        columns, 
        vm.rowsFilter,
        {
        didDrawPage: function (data) {
            // Header
            doc.setFontSize(20);
            doc.setTextColor(40);
            doc.setFontStyle('normal');
            
            doc.text("ContiCash Transaction Report", data.settings.margin.left + 15, 22);

            // Footer
            var str = "Page " + doc.internal.getNumberOfPages()
            // Total page number plugin only available in jspdf v1.0+
            if (typeof doc.putTotalPages === 'function') {
                str = str + " of " + totalPagesExp + "                                                                                                                                                                                                                                 @countitouch 2019";
            }
            doc.setFontSize(10);

            // jsPDF 1.4+ uses getWidth, <1.4 uses .width
            var pageSize = doc.internal.pageSize;
            var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
            doc.text(str, data.settings.margin.left, pageHeight - 10);
                  },
                  margin: {top: 30}
              });

              // Total page number plugin only available in jspdf v1.0+
              if (typeof doc.putTotalPages === 'function') {
                  doc.putTotalPages(totalPagesExp);
              }
           doc.save('TransactionReport.pdf')

      },
      exportExcel(){

      },
      
      customFilter(items, filters, filter, headers) {
        // Init the filter class.
        const cf = new this.$MultiFilters(items, filters, filter, headers);
        // Use regular function(),
        // arrow functions does not allow context binding.
        // Register the global standard filter.
        cf.registerFilter('search', function (searchWord, items) {
          if (searchWord.trim() === '') {return items;}
          return items.filter(item => {
            return item.name.toLowerCase().includes(searchWord.toLowerCase());
          }, searchWord);
        });
        // Use regular function(),
        // arrow functions does not allow context binding.
        // Register "added_by" filter.
        cf.registerFilter('added_by', function (added_by, items) {
          // If the filter has not been applied yet
          // just return all available items.
          if (added_by.trim() === '') return items;
          // Compare each item added_by and just return the matching ones.
          return items.filter(item => {
            return item.transaction_type.toLowerCase() === added_by.toLowerCase();
          }, added_by);
        });
        // Use regular function(),
        // arrow functions does not allow context binding.
        // Register "start_date" filter.
        cf.registerFilter('start_date', function (start_date, items) {
          // If the filter has not been applied yet
          // just return all available items.
          if (start_date === null) return items;
          // Compare each item start_date and just return the matching ones.
          return items.filter(item => {
            return item.tran_date >= start_date;
          }, start_date);
        });
        // Use regular function(),
        // arrow functions does not allow context binding.
        // Register "end_date" filter.
        cf.registerFilter('end_date', function (end_date, items) {
          // If the filter has not been applied yet
          // just return all available items.
          if (end_date === null) return items;
          // Compare each item end_date and just return the matching ones.
          return items.filter(item => {
            return item.tran_date <= end_date;
          }, end_date);
        });
        // Its time to run all created filters.
        // Will be executed in the order thay were defined.
        this.rowsFilter = cf.runFilters();
        return cf.runFilters();
      },
      /**
       * Toggle selected items with the master checkbox.
       */
      toggleAll() {
        if (this.selected.length) {
          this.selected = [];
        } else {
          this.selected = this.rows.slice();
        }
      },
      /**
       * Column shorting.
       *
       * @param column
       */
      changeSort(column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending;
        } else {
          this.pagination.sortBy = column;
          this.pagination.descending = false;
        }
      },
      /**
       * Handler when user input something at the "Filter" text field.
       */
      filterSearch(val) {
        this.filters = this.$MultiFilters.updateFilters(this.filters, {search: val});
      },
      /**
       * Handler when user  select some author at the "Author" select.
       */
      filterAuthor(val) {
        this.filters = this.$MultiFilters.updateFilters(this.filters, {added_by: val});
      },
      /**
       * Handler when select a date on "From" date picker.
       */
      filterStartDate(val) {
        // Close the date picker.
        this.$refs.show_start_date.save(val);
        //Convert the value to a timestamp before saving it.
        //const timestamp = new Date(val).getTime();
        this.filters = this.$MultiFilters.updateFilters(this.filters, {start_date: val});
      },
      /**
       * Handler when select a date on "To" date picker.
       */
      filterEndDate(val) {
        // Close the date picker.
        this.$refs.show_end_date.save(val);
        //Convert the value to a timestamp before saving it.
        //const timestamp = new Date(val).getTime();
        this.filters = this.$MultiFilters.updateFilters(this.filters, {end_date: val});
      },
    },
    filters: {
      /**
       * Format a timestamp into a d/m/yyy (because spanish format).
       *
       * @param value
       * @returns {string}
       */
      formatDate: function (value) {
        if (!value) return '';
        return new Date(value).toLocaleDateString("es-ES");
      }
    }
  };
</script>
<style scoped>
.image{
    width: 53px;
    height: 100%;
    margin: 3px;
  }
  .echarts {
    height: 300px;
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
  .h4Rev{
    color: #088f08;
  }

  #chip-usage-example .v-chip {
    margin: 8px;
  }
</style>




