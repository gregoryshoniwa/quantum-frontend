<template>
  <v-app>
    <ToolBar
      @CurrencyPairSelected="selectedCurrencyPair"
      @SelectedMenuItem="selectedMenu"
    />
    <NavBar style="position: relative; top: -40px" @SelectedMenuItem="selectedMenu" />
    <v-content style="position: relative; top: -50px; padding: 20px">
      <v-layout row mt-3>
        <v-flex md12>
          <component
            @ApprovalData="getData"
            v-bind:is="page"
            :PropCurrencyPair="CurrencyPairData"
          ></component>
        </v-flex>
      </v-layout>
    </v-content>
  </v-app>
</template>

<script>
//Import components
import ToolBar from "@/components/ToolBar";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import RightActionBar from "@/components/RightActionBar";
import BookingChart from "@/components/BookingChart";

//Import pages
import Dashboard from "./Dashboard";

import HistoryReportsVue from "./HistoryReports.vue";
import SupportVue from "./Support.vue";
import MyProfileVue from "./MyProfile.vue";
import MarketPlaceVue from "./MarketPlace.vue";
import DashboardSuper from "./DashboardSuper";
import DashboardManager from "./DashboardManager";
import DashboardTeller from "./DashboardTeller";
import ExchangeStatusVue from "./ExchangeStatus.vue";
import Rates from "./Rate.vue";
import FloatMovementReport from "./FloatMovementReport.vue";
import BranchTransactions from "./BranchTransactions.vue";
import ApprovalList from "./ApprovalList.vue";
import OverAllTransactionsVue from "./OverAllTransactions.vue";
import OverAllTransactionsUtilVue from "./OverAllTransactionsUtil.vue";
import OverAllTransactionsWorldRemit from "./OverAllTransactionsWorldRemit";
import ContiSend from "./ContiSendReports";
import BookingAdmin from "./BookingAdmin";

export default {
  name: "App",
  components: {
    ToolBar,
    Footer,
    NavBar,
    RightActionBar,
    BookingChart,

    "dashboard-page": Dashboard,
    "overall-page": OverAllTransactionsVue,
    "overall_utility-page": OverAllTransactionsUtilVue,
    "overall_world-page": OverAllTransactionsWorldRemit,
    "approval-page": ApprovalList,
    "dashboardbranch-page": Dashboard,
    "booking_admin-page": BookingAdmin,
    "contisend-page": ContiSend,
    "exchange-page": ExchangeStatusVue,
    "market-page": MarketPlaceVue,
    "reports-page": HistoryReportsVue,
    "profile-page": MyProfileVue,
    "dash-super": DashboardSuper,
    "dash-manager": DashboardManager,
    "dash-teller": DashboardTeller,
    "support-page": SupportVue,
    "rates-page": Rates,
    "floatmove-page": FloatMovementReport,
  },
  data() {
    return {
      page: "",
      CurrencyPairData: "",

      //
    };
  },
  mounted() {
    if (this.$session.exists()) {
      const Toast = this.$swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });

      Toast.fire({
        type: "success",
        title: "Signed in successfully",
      });
    } else {
      this.$router.push({ name: "login" });
    }
  },
  watch: {
    CurrencyPairData(val) {
      console.log(val);
    },
  },
  methods: {
    getData(data) {
      console.log(data);
    },
    selectedCurrencyPair(pair) {
      //console.log(data)
      this.CurrencyPairData = pair;
    },
    selectedMenu(menu) {
      //console.log(data)
      if (menu != "Exit") {
        this.page = "";
        this.page = menu;
      } else {
        console.log(menu);
      }
    },
  },
};
</script>
<style>
html {
  overflow-y: auto;
  height: 100%;
}
</style>
