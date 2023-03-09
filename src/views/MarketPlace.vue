<template>
  <div>
    <h2 style="color:green;">Dashboard</h2>
    <v-layout row>
      <v-flex md3 pa-2>
        <v-card hover>
          <v-flex mb-2 class="card cardRev1">
            <v-layout ma-1>
              <img src="../assets/imgs/bank.fw.png" class="image">
               <v-flex style="text-align: right;padding: 3px;">
                <h5>Banking Market Information</h5>
                <h5 class="h4Rev">$100.36</h5>
                <p>Total income</p>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-card>
         
      </v-flex>

      <v-flex md3 pa-2>
        <v-card hover>
          <v-flex mb-2 class="card cardRev2">
            <v-layout ma-1>
              <img src="../assets/imgs/clients.fw.png" class="image">
              <v-flex style="text-align: right;padding: 3px;">
                <h5>Demand & Supply Information</h5>
                <h5 class="h4Rev">$100.36</h5>
                <p>Total income</p>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-card>
        
      </v-flex>

      <v-flex md3 pa-2>
        <v-card hover>
          <v-flex mb-2 class="card cardRev3">
            <v-layout ma-1>
              <img src="../assets/imgs/gdp.fw.png" class="image">
               <v-flex style="text-align: right;padding: 3px;">
                <h5>Economic Information</h5>
                <h5 class="h4Rev">$100.36</h5>
                <p>Total income</p>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-card>
        
      </v-flex>

      <v-flex md3 pa-2>
        <v-card hover>
          <v-flex mb-2 class="card cardRev4">
            <v-layout ma-1>
              <img src="../assets/imgs/currency.fw.png" class="image">
              <v-flex style="text-align: right;padding: 3px;">
                <h5>Currency Information</h5>
                <h5 class="h4Rev">$100.36</h5>
                <p>Total income</p>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-card>
        
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex md6 pa-2>
        <v-flex>
          <v-card hover>
            <BookingChart class="echart" />
          </v-card>
        </v-flex>
      </v-flex>
      <v-flex md6 pa-2>
        <v-flex>
          <v-card hover>
            <MarketRates class="echart2" />
          </v-card>
        </v-flex>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
  import BookingChart from '@/components/BookingChart'
  import MarketRates from '@/components/MarketRates'
  export default {
    components: {
      BookingChart,
      MarketRates
    },
    data() {
      return {
        CurrencyPair: ''
      }
    },
    mounted() {
      
    },
  }
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
    color: #23f523;
  }
</style>




