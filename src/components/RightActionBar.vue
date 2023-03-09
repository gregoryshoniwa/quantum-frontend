<template>
    <div>
    <v-flex xs12 ma-2>
            <v-card color="blue lighten-3">
              <v-card-title primary-title>
                                
                <v-menu
                  ref="menu1"
                  color="success"                  
                  v-model="menu1"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="dateFormatted"
                      
                      label="Expected Date"
                      hint="DD/MM/YYYY"
                      persistent-hint
                      prepend-icon="event"
                      @blur="date = parseDate(dateFormatted)"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                </v-menu>
                
              
              </v-card-title>              
            </v-card>           
      </v-flex>

      <v-flex xs12 ma-2>
            <v-card color="blue lighten-3">
              <v-card-title >
                
                <v-text-field v-model="fValue" label="Amount" type="number" prepend-icon="attach_money" class="inputPrice" min="0"></v-text-field>
              </v-card-title>              
            </v-card>           
      </v-flex>

      <v-flex xs12 ma-2>
            <v-card color="blue lighten-3">
              <v-card-title primary-title>
                 <v-flex xs12>
                  <v-combobox
                    v-model="select"
                    :items="branches"
                  
                    label="Preferred Branch"
                  ></v-combobox>
                </v-flex>
              </v-card-title>              
            </v-card>           
      </v-flex>

      <v-flex xs12 ma-2 >
        
            <v-card color="green" class="white--text text-md-center" hover>
              <v-card-title primary-title>
               
               <v-layout column>
                 <v-flex>                  
                    <v-icon  dark>gavel</v-icon>
                  </v-flex>
                 <v-flex>                  
                    Book to Sell
                  </v-flex>
                  
               </v-layout>
              </v-card-title>              
            </v-card> 
                  
      </v-flex>

      <v-flex xs12 ma-2>
            <v-card color="red" class="white--text text-md-center" hover>
              <v-card-title primary-title>
                <v-layout column>
                 <v-flex>                  
                    <v-icon  dark>gavel</v-icon>
                  </v-flex>
                 <v-flex>                  
                    Book to buy
                  </v-flex>
                  
               </v-layout>
              </v-card-title>              
            </v-card>           
      </v-flex>
    </div>
</template>
<script>
  export default {
    data: vm => ({
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
      menu2: false,
      select: 'Beverly Court',
        branches: [
          'Beverly Court',
          'Rezende'
        ],

      value: ""
    })
    ,
    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
     
        fValue: {
          // getter
          get: function() {
            return this.value;
          },
          // setter
          set: function(newValue) {
            if (newValue.length > 2) {
              newValue = newValue.replace(".", "");
              this.value =
                newValue.substr(0, newValue.length - 2) +
                "." +
                newValue.substr(newValue.length - 2);

              // add thousend separator formatting here
            } else {
              this.value = newValue;
            }
          }
        
    }
    },

    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      }
    },
    methods: {
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      }
    }
  }
</script>
<style scoped>
  


</style>
