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
    TimePeriod: "",
    ToggleCurrency: "",
  },
  data() {
    return {
      polar: {},
      nodeApi: "",
      rawData: [],
      branch_id: 1,
      time: 0,
      currSymbol: "",
      dateValue: null,
    };
  },
  mounted() {
    this.currSymbol = "USD";
    if (this.$session.get("user").userdetails.user_type == 2) {
      this.loadGraphDataBuyBranch(this.branch_id, this.currSymbol);
    } else {
      this.loadGraphData();
    }
  },
  watch: {
    Branch(val) {
      this.branch_id = val;
      this.loadGraphDataBuyBranch(this.branch_id, this.time, this.currSymbol);
    },
    ToggleCurrency(val) {
      // console.log(val)
      this.currSymbol = val;
      if (val > 0) {
        this.time = val;
        this.loadGraphDataBuyBranch(this.branch_id, this.TimePeriod, this.currSymbol);
      } else if (val == 0) {
        this.loadGraphDataBuyBranch2(this.branch_id, this.currSymbol);
      } else {
        if(this.TimePeriod.start_date){
          this.loadGraphDataBuyBranchSpecific(
          this.branch_id,
          this.TimePeriod.start_date,
          this.TimePeriod.end_date,
          this.currSymbol
        );
        }
        
      }
    },
    TimePeriod(val) {
      console.log(val);
      if (val > 0) {
        this.time = val;
        this.loadGraphDataBuyBranch(this.branch_id, val, this.currSymbol);
      } else if (val == 0) {
        this.loadGraphDataBuyBranch2(this.branch_id, this.currSymbol);
      } else {
        if(val.start_date){
          this.loadGraphDataBuyBranchSpecific(
          this.branch_id,
          val.start_date,
          val.end_date,
          this.currSymbol
        );
        }
        
      }
    },
  },
  methods: {
    async loadGraphDataBuyBranchSpecific(id, start_date, end_date, currSymbol) {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      // console.log(headers)
      await Axios.post(
        this.nodeApi + "/getTellerSalesGraphByDateSpecificCurr",
        {
          currency_id: currSymbol,
          branch_id: id,
          start_date: start_date,
          end_date: end_date,
        },
        { headers: headers }
      ).subscribe(
        (res) => {
          this.rawData = res.data.data.one.recordset;

          this.getData(this.rawData);
          //console.log(this.rawData)
        },
        (err) => console.log(err)
      );
    },
    async loadGraphDataBuyBranch(id, time, currSymbol) {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      // console.log(headers)
      await Axios.post(
        this.nodeApi + "/getTellerSalesGraphByDateCurr",
        { currency_id: currSymbol, branch_id: id, time: time },
        { headers: headers }
      ).subscribe(
        (res) => {
          this.rawData = res.data.data.one.recordset;

          this.getData(this.rawData);
          //console.log(this.rawData)
        },
        (err) => console.log(err)
      );
    },
    async loadGraphDataBuyBranch2(id, currSymbol) {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      // console.log(headers)
      await Axios.post(
        this.nodeApi + "/getTellerSalesGraphCurr",
        { currency_id: currSymbol, branch_id: id },
        { headers: headers }
      ).subscribe(
        (res) => {
          this.rawData = res.data.data.one.recordset;

          this.getData(this.rawData);
          //console.log(this.rawData)
        },
        (err) => console.log(err)
      );
    },
    async loadGraphData() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      // console.log(headers)
      await Axios.post(
        this.nodeApi + "/getTellerSalesGraph",
        { branch_id: this.$session.get("user").userdetails.branch_id },
        { headers: headers }
      ).subscribe(
        (res) => {
          this.rawData = res.data.data.one.recordset;

          this.getData(this.rawData);
          //console.log(this.rawData)
        },
        (err) => console.log(err)
      );
    },
    getData(Data) {
      var branches = [];
      var branchBuys = [];
      var branchSell = [];
      var buyRate = [];
      var sellRate = [];
      var mainSource = [["product", "Sells", "Buys"]];

      Data.forEach((element) => {
        if (branches.indexOf(element.username.replace(/\s/g, "")) == -1) {
          mainSource.push([element.username.replace(/\s/g, "")]);
        }
      });
      Data.forEach((element) => {
        if (element.tran_type.replace(/\s/g, "") == "Buy") {
          mainSource.forEach((element2, i) => {
            if (element2[0] == element.username) {
              mainSource[i].push(parseFloat(element.received_sum).toFixed(2));
            }
            // else {
            //   mainSource[i].push(parseFloat(0).toFixed(2));
            // }
          });
        }
        if (element.tran_type.replace(/\s/g, "") == "Sell") {
          // branchSell.push(parseFloat(element.disbursed_sum).toFixed(2));
          mainSource.forEach((element3, ii) => {
            if (element3[0] == element.username) {
              mainSource[ii].push(parseFloat(element.disbursed_sum).toFixed(2));
            }
            // else {
            //   mainSource[ii].push(parseFloat(0).toFixed(2));
            // }
          });
        }
      });

      // Data.forEach((element) => {
      //   if (element.tran_type.replace(/\s/g, "") == "Buy") {
      //     buyRate.push(parseFloat(element.average_rate).toFixed(2));
      //   }
      //   if (element.tran_type.replace(/\s/g, "") == "Sell") {
      //     sellRate.push(parseFloat(element.average_rate).toFixed(2));
      //   }
      // });
      console.log(mainSource);
      // console.log(Data);
      // console.log(branchSell);
      this.polar = {
        legend: {},
        tooltip: {},
        dataset: {
          source: mainSource,
        },
        xAxis: { type: "category" },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: "bar" }, { type: "bar" }],
        // tooltip: {
        //   trigger: "axis",
        //   axisPointer: {
        //     // 坐标轴指示器，坐标轴触发有效
        //     type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        //   },
        // },
        // legend: {
        //   data: ["Total FX Buy", "Total FX Sell", "Ave.Buy Rate", "Ave.Sell Rate"],
        // },
        // xAxis: {
        //   type: "category",
        //   data: branches,
        // },
        // yAxis: {
        //   type: "value",
        // },
        // series: [
        //   {
        //     name: "Total FX Buy",
        //     data: branchBuys,
        //     type: "bar",
        //   },
        //   {
        //     name: "Ave.Buy Rate",
        //     data: buyRate,
        //     type: "line",
        //   },
        //   {
        //     name: "Total FX Sell",
        //     data: branchSell,
        //     type: "bar",
        //   },
        //   {
        //     name: "Ave.Sell Rate",
        //     data: sellRate,
        //     type: "line",
        //   },
        // ],
      };
    },
  },
};
</script>
