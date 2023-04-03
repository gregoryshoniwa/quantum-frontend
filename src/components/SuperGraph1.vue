<template>
  <v-chart :options="polar" autoresize />
</template>

<style scoped>
/**
         * The default size is 600px×400px, for responsive charts
         * you may need to set percentage values as follows (also
         * don't forget to provide a size for the container).
         */
.echarts {
  width: 100%;
  height: 100%;
  border-left: 5px solid #ffd001;
}
</style>

<script>
import ECharts from "vue-echarts";
import Axios from "axios-observable";
export default {
  components: {
    "v-chart": ECharts,
  },
  props: {
    Branch: Number,
    ToggleCurrency: "",
  },
  data() {
    return {
      polar: {},
      graphAPi:
        "http://dev.contipay.co.zw:82/https://api-dev.contipay.co.zw/graphsApi?authorization=",
      nodeApi: "",
      //nodeApi: '',
      currencyData: [],
      currencyDataActive: [],
      branchData: [],
      branch_id: 1,
      graphData: [],
      rawData: [],
      currSymbol: "",
      dateValue: null,
    };
  },
  mounted() {
    this.currSymbol = "USD";
    if (this.$session.get("user").userdetails.user_type == 2) {
      this.loadGraphDataBuyBranch(this.branch_id, this.currSymbol);
    } else {
      this.loadGraphData(this.currSymbol);
    }
  },
  watch: {
    ToggleCurrency(val) {
      //console.log(val);
      if (this.$session.get("user").userdetails.user_type == 2) {
        this.currSymbol = val;
        this.loadGraphDataBuyBranch(this.Branch, this.currSymbol);
      } else {
        this.currSymbol = val;
        //  console.log(this.currSymbol);
        this.loadGraphData(this.currSymbol);
      }
    },
    Branch(val) {
      this.branch_id = val;
      this.loadGraphDataBuyBranch(this.branch_id, this.currSymbol);
    },
  },
  methods: {
    async loadGraphDataBuyBranch(id, currency) {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      // console.log(headers)
      await Axios.post(
        this.nodeApi + "/getTellerFloatGraph3",
        { branch_id: id },
        { headers: headers }
      ).subscribe(
        (res) => {
          this.rawData = res.data.data.one.recordset;

          this.getData(this.rawData, currency);
          //console.log(this.rawData)
        },
        (err) => console.log(err)
      );
    },
    async loadGraphData(currency) {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      // console.log(headers)
      await Axios.post(
        this.nodeApi + "/getTellerFloatGraph3",
        { branch_id: this.$session.get("user").userdetails.branch_id },
        { headers: headers }
      ).subscribe(
        (res) => {
          this.rawData = res.data.data.one.recordset;

          this.getData(this.rawData, currency);
          //console.log(this.rawData)
        },
        (err) => console.log(err)
      );
    },
    getData(Data, currSymbol) {
      var Currencies = [];
      var branches = [];

      var coins = [];
      var rtgs = [];
      var ecocash = [];
      var bond = [];
      var usd = [];

      Data.forEach((element) => {
        if (branches.indexOf(element.username.replace(/\s/g, "")) == -1) {
          branches.push(element.username.replace(/\s/g, ""));
        }
      });
      Data.forEach((element) => {
        if (Currencies.indexOf(element.symbol.replace(/\s/g, "")) == -1) {
          Currencies.push(element.symbol.replace(/\s/g, ""));
        }
      });

      Data.forEach((element, i) => {
        //    if(branches[i] == element.branch){
        if (element.symbol.replace(/\s/g, "") == "Coin") {
          coins.push(parseFloat(element.amount).toFixed(2));
        }
        if (element.symbol.replace(/\s/g, "") == "Bond") {
          bond.push(parseFloat(element.amount).toFixed(2));
        }
        if (element.symbol.replace(/\s/g, "") == "RTGS") {
          rtgs.push(parseFloat(element.amount).toFixed(2));
        }
        if (element.symbol.replace(/\s/g, "") == "Ecocash") {
          ecocash.push(parseFloat(element.amount).toFixed(2));
        }
        if (element.symbol.replace(/\s/g, "") == currSymbol) {
          usd.push(parseFloat(element.amount).toFixed(2));
        }
        //    }
      });

      // console.log(coins)
      this.polar = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          data: Currencies, //['ZW ', 'ZW', 'ZW Bond', 'ZW Bond', 'FX Income']
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: branches, //['Branch 1', 'Branch 2', 'Branch 3', 'Branch 4', 'Branch 5', 'Branch 4', 'Branch 7']
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Coin",
            type: "bar",
            stack: "广告",
            data: coins,
          },
          {
            name: "RTGS",
            type: "bar",
            stack: "广告",
            data: rtgs,
          },
          {
            name: "Ecocash",
            type: "bar",
            stack: "广告",
            data: ecocash,
          },
          {
            name: "Bond",
            type: "bar",
            stack: "广告",
            data: bond,
          },
          {
            name: currSymbol,
            type: "bar",
            data: usd,
          },
        ],
      };
    },
  },
};
</script>
