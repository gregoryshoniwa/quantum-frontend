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
    TimePeriod: "",
    ToggleCurrency: "",
  },
  data() {
    return {
      polar: {},
      nodeApi: "http://localhost:8081",
      rawData: [],
      data: 500,
      totalBuys: 0,
      totalSells: 0,
      totalBuysRate: 0,
      totalSellsRate: 0,
      currSymbol: "",
      dateValue: null,
    };
  },
  mounted() {
    this.currSymbol = "USD";
    //console.log(this.TimePeriod)
    this.loadGraphDataBuyDate(this.TimePeriod, this.currSymbol);
    // this.loadGraphData()
  },
  watch: {
    ToggleCurrency(val) {
      this.currSymbol = val;
      if (this.TimePeriod > 0) {
        this.loadGraphDataBuyDate(this.TimePeriod, this.currSymbol);
      } else if (this.TimePeriod == 0) {
        this.loadGraphData(this.currSymbol);
      } else {
        this.loadGraphDataBuyDateSpecific(
          this.TimePeriod.start_date,
          this.TimePeriod.end_date,
          this.currSymbol
        );
      }
      //this.loadGraphData(val)
      console.log(val);
    },
    TimePeriod(val) {
      this.dateValue = val;
      if (val > 0) {
        this.loadGraphDataBuyDate(val, this.currSymbol);
      } else if (val == 0) {
        this.loadGraphData(this.currSymbol);
      } else {
        this.loadGraphDataBuyDateSpecific(val.start_date, val.end_date, this.currSymbol);
      }
    },
  },
  methods: {
    async loadGraphData(currSymbol) {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      // console.log(headers)
      await Axios.post(
        this.nodeApi + "/getBranchSalesGraphByCurr",
        { currency_id: currSymbol },
        { headers: headers }
      ).subscribe(
        (res) => {
          this.rawData = res.data.data.one.recordset;

          this.getData(this.rawData, currSymbol);
          //console.log(this.rawData)
        },
        (err) => console.log(err)
      );
    },
    async loadGraphDataBuyDate(dataTime, currSymbol) {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      // console.log(headers)
      await Axios.post(
        this.nodeApi + "/getBranchSalesGraphByDateCurr",
        { currency_id: currSymbol, time: dataTime },
        { headers: headers }
      ).subscribe(
        (res) => {
          this.rawData = res.data.data.one.recordset;

          this.getData(this.rawData, currSymbol);
          //console.log(this.rawData)
        },
        (err) => console.log(err)
      );
    },
    async loadGraphDataBuyDateSpecific(start_date, end_date, currSymbol) {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$session.get("user").token,
      };
      // console.log(headers)
      await Axios.post(
        this.nodeApi + "/getBranchSalesGraphByDateSpecificCurr",
        { currency_id: currSymbol, start_date: start_date, end_date: end_date },
        { headers: headers }
      ).subscribe(
        (res) => {
          this.rawData = res.data.data.one.recordset;

          this.getData(this.rawData, currSymbol);
          //console.log(this.rawData)
        },
        (err) => console.log(err)
      );
    },
    getData(Data, currSymbol) {
      // console.log(Data)
      var result = [];
      Data.reduce(function (res, value) {
        if (!res[value.branch_name.replace(/\s/g, "")]) {
          res[value.branch_name.replace(/\s/g, "")] = {
            branch_name: value.branch_name.replace(/\s/g, ""),
            received_sum: 0,
            disbursed_sum: 0,
            average_rate_buy: 0,
            average_rate_sell: 0,
          };
          result.push(res[value.branch_name.replace(/\s/g, "")]);
        }
        if (value.tran_type.replace(/\s/g, "") == "Buy") {
          res[value.branch_name.replace(/\s/g, "")].received_sum = parseInt(
            value.received_sum,
            10
          );
          res[value.branch_name.replace(/\s/g, "")].average_rate_buy = parseFloat(
            value.average_rate
          ).toFixed(2);
        }
        if (value.tran_type.replace(/\s/g, "") == "Sell") {
          res[value.branch_name.replace(/\s/g, "")].disbursed_sum = parseInt(
            value.disbursed_sum,
            10
          );
          res[value.branch_name.replace(/\s/g, "")].average_rate_sell = parseFloat(
            value.average_rate
          ).toFixed(2);
        }

        return res;
      }, {});

      var branches = [];
      var branchBuys = [];
      var branchSell = [];
      var buyRate = [];
      var sellRate = [];

      var newarray1 = [];
      var newarray2 = [];
      this.totalBuys = 0;
      this.totalSells = 0;
      this.totalBuysRate = 0;
      this.totalSellsRate = 0;

      result.forEach((element) => {
        if (branches.indexOf(element.branch_name.replace(/\s/g, "")) == -1) {
          branches.push(element.branch_name.replace(/\s/g, ""));
        }
      });
      result.forEach((element1) => {
        branchBuys.push(parseFloat(element1.received_sum).toFixed(2));
        branchSell.push(parseFloat(element1.disbursed_sum).toFixed(2));
        buyRate.push(parseFloat(element1.average_rate_buy).toFixed(2));
        sellRate.push(parseFloat(element1.average_rate_sell).toFixed(2));

        this.totalBuys += element1.received_sum;
        this.totalSells += element1.disbursed_sum;
        this.totalBuysRate += element1.average_rate_buy;
        this.totalSellsRate += element1.average_rate_sell;
      });

      //    console.log(result)
      //     //  console.log(branchBuys)
      //         console.log(newarray1)

      //     //  console.log(branchSell)

      //       console.log(newarray2)
      this.polar = {
        title: {
          subtext: `Full-Total Buys : ${currSymbol} ${parseFloat(this.totalBuys).toFixed(
            2
          )} @ Ave Rate : ${parseFloat(this.totalBuysRate).toFixed(
            2
          )} | Full-Total Sells : ${currSymbol} ${parseFloat(this.totalSells).toFixed(
            2
          )} @ Ave Rate : ${parseFloat(this.totalSellsRate).toFixed(2)}`,
          left: 10,
          subtextStyle: {
            color: "#3949AB",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          x: "center",
          y: "bottom",
          data: ["Total FX Buy", "Total FX Sell", "Ave.Buy Rate", "Ave.Sell Rate"],
        },
        xAxis: {
          type: "category",
          data: branches,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "Total FX Buy",
            data: branchBuys,
            type: "bar",
          },
          {
            name: "Ave.Buy Rate",
            data: buyRate,
            type: "line",
          },
          {
            name: "Total FX Sell",
            data: branchSell,
            type: "bar",
          },
          {
            name: "Ave.Sell Rate",
            data: sellRate,
            type: "line",
          },
        ],
      };
    },
  },
};
</script>
