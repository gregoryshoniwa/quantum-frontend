<template>
    <div >
        <v-card color="white" hover>
             <v-img
               
                class="white--text"
                height="100px"
                src="https://c.contitouch.co.zw/bg2.jpg"
            >
              <v-layout row>
                  <v-layout column wrap>
                <v-flex ma-4>
                 
                   <h2 class="iCountUp">
                        {{product}}
                    </h2>
                  
                </v-flex>
                  </v-layout>
                  <v-layout column wrap justify-end>
                <v-flex ma-4>
                 
                   
                     <h2 class="iCountUp" style="text-align: right;">
                        <ICountUp
                        :delay="delay"
                        :endVal="stack_value"
                        :options="options"
                        @ready="onReadyOut"
                        />
                    </h2>
                    
                    
                  
                </v-flex>
                  </v-layout>
              </v-layout>
              </v-img>
              <v-divider light></v-divider>
              <v-card-actions>
                <h2>Product @ Branch</h2>
                <v-spacer></v-spacer>
                <h2>Total Value</h2>
              </v-card-actions>
            </v-card>
    </div>
</template>
<script>
import Axios from 'axios-observable';
import ICountUp from 'vue-countup-v2';
  export default {
      components: {
      ICountUp
    },
    props: ['currency','value','number','product'],
    data () {
      return {
      
        delay: 200,
        stack_number:'',
        stack_value: 0,
        options: {
          useEasing: true,
          useGrouping: true,
          separator: ',',
          decimal: '.',
          decimalPlaces:2,
          prefix: this.currency+' '+' ',
          suffix: ''
        },
         optionsStack: {
          useEasing: true,
          useGrouping: true,
          separator: ',',
          decimal: '.',
          decimalPlaces:0,
          prefix: this.product,
          suffix: '',
          stackCardData: []
        }
      }
      
    },
    mounted() {
     
      if(this.number){
         this.stack_number = this.number
      }
      if(this.value){
           this.stack_value = this.value
      }
    
     
    },
     methods: {
     
      onReadyIn: function(instance, CountUp) {
        const that = this;
        instance.update(that.stack_number);
      },
       onReadyOut: function(instance, CountUp) {
        const that = this;
        instance.update(that.stack_value);
      }
    }
  }
</script>
<style scoped>
     .iCountUp {
        /* font-size: 12em; */
        margin: 0;
        color: #ffffff;
        text-shadow: 2px 2px #333333;
    }
    .emojiGreen{
         color: transparent;  
         text-shadow: 0 0 0 rgb(57, 255, 8);
    }
</style>

