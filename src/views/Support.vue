<template>
  <div>
    <v-layout row wrap justify-end>
      <v-flex
        xs6
        md2
        v-if="user_type != 3 && user_type != 4 && user_type != 5 && user_type != 6"
      >
        <v-card hover @click="openpage('tellertoteller-page')" max-width="150px">
          <v-flex mb-2 class="card cardRev4">
            <v-layout ma-1>
              <img src="../assets/imgs/tellertoteller.fw.png" class="image" />
            </v-layout>
          </v-flex>
        </v-card>
      </v-flex>
      <!-- 
      <v-flex xs6 md2 v-if="user_type != 2 && user_type != 4 && user_type != 5 && user_type != 6">
        <v-card hover @click="openpage('tellertotellersuper-page')" max-width="150px">
          <v-flex mb-2 class="card cardRev4">
            <v-layout ma-1>
              <img src="../assets/imgs/tellertoteller.fw.png" class="image">
              
            </v-layout>
          </v-flex>
        </v-card>        
      </v-flex>

     

 <v-flex xs6 md2 v-if="user_type != 3 && user_type != 4 && user_type != 5 && user_type != 6" >
        <v-card hover @click="openpage('tellertobranch-page')" max-width="150px">
          <v-flex mb-2 class="card cardRev4">
            <v-layout ma-1>
              <img src="../assets/imgs/tellertobranch.fw.png" class="image">
              
            </v-layout>
          </v-flex>
        </v-card>        
      </v-flex>


<v-flex xs6 md2 v-if="user_type != 2 && user_type != 4 && user_type != 5 && user_type != 6">
        <v-card hover @click="openpage('branchtobranch-page')" max-width="150px">
          <v-flex mb-2 class="card cardRev4">
            <v-layout ma-1>
              <img src="../assets/imgs/branchtobranch.fw.png" class="image">
              
            </v-layout>
          </v-flex>
        </v-card>        
      </v-flex>

-->

      <v-flex
        xs6
        md2
        v-if="user_type != 2 && user_type != 4 && user_type != 5 && user_type != 6"
      >
        <v-card hover @click="openpage('branchtobranch-page')" max-width="150px">
          <v-flex mb-2 class="card cardRev4">
            <v-layout ma-1>
              <img src="../assets/imgs/branchtobranch.fw.png" class="image" />
            </v-layout>
          </v-flex>
        </v-card>
      </v-flex>
      <v-flex
        xs6
        md2
        v-if="user_type != 2 && user_type != 4 && user_type != 5 && user_type != 6"
      >
        <v-card hover @click="openpage('branchtoteller-page')" max-width="150px">
          <v-flex mb-2 class="card cardRev4">
            <v-layout ma-1>
              <img src="../assets/imgs/branchtoteller.fw.png" class="image" />
            </v-layout>
          </v-flex>
        </v-card>
      </v-flex>
      <v-flex
        xs6
        md2
        v-if="user_type != 2 && user_type != 4 && user_type != 5 && user_type != 6"
      >
        <v-card hover @click="openpage('branchtotreasury-page')" max-width="150px">
          <v-flex mb-2 class="card cardRev4">
            <v-layout ma-1>
              <img src="../assets/imgs/branchtotreasary.fw.png" class="image" />
            </v-layout>
          </v-flex>
        </v-card>
      </v-flex>

      <v-flex xs6 md2 v-if="user_type != 2 && user_type != 3">
        <v-card hover @click="openpage('refloat-page')" max-width="150px">
          <v-flex mb-2 class="card cardRev4">
            <v-layout ma-1>
              <img src="../assets/imgs/teller_refloat.png" class="image" />
            </v-layout>
          </v-flex>
        </v-card>
      </v-flex>

      <!-- <v-flex xs6 md2 v-if="user_type != 3">
        <v-card hover @click="openpage('refloat-page2')" max-width="150px">
          <v-flex mb-2 class="card cardRev3">
            <v-layout ma-1>
              <img src="../assets/imgs/teller_refloat.png" class="image" />
            </v-layout>
          </v-flex>
        </v-card>
      </v-flex> -->

      <v-flex xs6 md2 v-if="user_type != 2 && user_type != 3">
        <v-card hover @click="openpage('branchtotellersuper-page')" max-width="150px">
          <v-flex mb-2 class="card cardRev4">
            <v-layout ma-1>
              <img src="../assets/imgs/branchtoteller.fw.png" class="image" />
            </v-layout>
          </v-flex>
        </v-card>
      </v-flex>

      <v-flex xs6 md2 v-if="user_type != 2 && user_type != 3">
        <v-card hover @click="openpage('treasurytobranch-page')" max-width="150px">
          <v-flex mb-2 class="card cardRev4">
            <v-layout ma-1>
              <img src="../assets/imgs/treasarytobranch.fw.png" class="image" />
            </v-layout>
          </v-flex>
        </v-card>
      </v-flex>

      <v-flex xs6 md2 v-if="user_type != 2 && user_type != 3">
        <v-card hover @click="openpage('movementreport-page')" max-width="150px">
          <v-flex mb-2 class="card cardRev4">
            <v-layout ma-1>
              <img src="../assets/imgs/floatadmin.fw.png" class="image" />
            </v-layout>
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>

    <component v-bind:is="page"></component>
  </div>
</template>
<script>
import TellertoTeller from "@/components/TellertoTeller";
import TellertoTellerSuper from "@/components/TellerToTellerSuper";
import BranchtoTeller from "@/components/BranchtoTeller";
import BranchtoTellerSuper from "@/components/BranchtoTellerSuper";
import TellertoBranch from "@/components/TellertoBranch";
import BranchtoTreasury from "@/components/BranchtoTreasury";
import BranchtoBranch from "@/components/BranchtoBranch";
import TreasurytoBranch from "@/components/TreasurytoBranch";
import MovementReport from "@/components/MovementReport";
import TellerRefloat from "@/components/TellerRefloat";
import TellerRefloat2 from "@/components/TellerRefloat2";
export default {
  components: {
    "tellertoteller-page": TellertoTeller,
    "tellertotellersuper-page": TellertoTellerSuper,
    "branchtoteller-page": BranchtoTeller,
    "branchtotellersuper-page": BranchtoTellerSuper,
    "branchtobranch-page": BranchtoBranch,
    "tellertobranch-page": TellertoBranch,
    "branchtotreasury-page": BranchtoTreasury,
    "treasurytobranch-page": TreasurytoBranch,
    "movementreport-page": MovementReport,
    "refloat-page": TellerRefloat,
    "refloat-page2": TellerRefloat2,
  },
  data() {
    return {
      CurrencyPair: "",
      page: "",
      user_type: 0,
    };
  },
  mounted() {
    this.user_type = this.$session.get("user").userdetails.user_type;
    if (this.user_type == 2) {
      this.page = "tellertoteller-page";
    } else if (this.user_type == 3) {
      this.page = "branchtoteller-page";
    } else if (this.user_type == 4) {
      this.page = "treasurytobranch-page";
    } else if (this.user_type == 5) {
      this.page = "treasurytobranch-page";
    } else if (this.user_type == 6) {
      this.page = "refloat-page2";
    }
  },
  methods: {
    openpage(page) {
      this.page = "";
      this.page = page;
    },
  },
};
</script>
<style scoped>
main {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  /* align-items: center; */
  flex-wrap: wrap;
}
.kachel {
  background: #3f51b5;
  width: 27.3%;
  color: beige;
  text-align: center;
  margin: 10px;
  border: solid 1px rgb(51, 50, 50);
  padding: 10px;
  transition: all 0.3s ease-in;
}
.kachel:hover {
  transform: scale(1.1);
  z-index: 100;
  cursor: pointer;
  box-shadow: 2px 2px 2px #222;
}
.kachel h2 {
  font-size: 1.3rem;
}
.kachel span {
  font-size: 1.9rem;
}
@media (max-width: 610px) {
  main {
    width: 96%;
  }
  .kachel {
    padding: 0.8rem;
    width: 43%;
  }
}
@media (max-width: 420px) {
  main {
    width: 89%;
  }
  .kachel {
    width: 100%;
  }
}

.image {
  width: 100px;
  height: 100%;
  margin: 3px;
  margin-left: 15px;
}
.echarts {
  height: 300px;
}
.card {
  height: 110px;
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
.h4Rev {
  color: #23f523;
}
</style>
