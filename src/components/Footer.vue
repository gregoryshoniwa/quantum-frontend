<template>
  <v-footer color="blue" class="justify-center pl-0" inset app>
     <v-flex style="margin-left: 70px;" md1>
      <v-btn
        class="white--text text-none"
        color="green darken-1"
        small 
            
      >        
        <v-icon>attach_money</v-icon>
        Deposit
      </v-btn>
      
    </v-flex>
    <v-flex>
      <span class="white--text text-none" style="font-size:16px">{{currency}} : </span>
      <span class="white--text text-none" style="font-size:16px">{{balance}}</span>
    </v-flex>
    <v-spacer></v-spacer>
    
    <div class="white--text">
      <span>{{ time | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</span>
    </div>
  </v-footer>
</template>
<script>
export default {
    data() {
        return {
          intervalid1:null,
          time:0,
          currency:'AUD',
          balance:0
        }
        
    },
    watch: {
      currency(val){

      }
    },
    mounted() {
       this.$root.$on('CurrencyPairSelected',(data) =>{
       this.currency = data
       })

       this.intervalid1 = setInterval(() => {
        this.time = Date.now()        
        }, 1000);
    },
    
}
</script>

<style scoped>

</style>
