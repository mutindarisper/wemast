<script>
import { Pie } from "vue-chartjs";
import Chart from "chart.js";
// Chart.defaults.global.legend.labels.usePointStyle = true;
import datalabels from "chartjs-plugin-datalabels";
export default {
  extends: Pie,
  data() {
    return {
      options: {
        legend: {
          display: true,
          position: "right",
          labels: {
            fontColor: "black"
          }
        },
        plugins: {
          datalabels: {
            formatter: (value, ctx) =>{
             
              let sum = 0;
              let dataArr = ctx.chart.data.datasets[0].data;
              dataArr.map(data => {
                sum += +data;
              });
              let percentage = ((value * 100) / sum).toFixed(0) + "%";
               console.log("percentage ", dataArr)

              if ((value * 100) / sum > 3) {
                return percentage;
              } else {
                return "";
              }
            },
            color: "black"
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              //get the concerned dataset
              var dataset = data.datasets[tooltipItem.datasetIndex];
              //calculate the total of this data set
              var total = dataset.data.reduce(
                (previousValue, currentValue) => +previousValue + +currentValue
              );
              //get the current items value
              var currentValue = dataset.data[tooltipItem.index];
              //calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
              var percentage = ((currentValue / total) * 100).toFixed(0);
              return `${data.labels[tooltipItem.index]} ${(
                currentValue / 10000
              ).toFixed(2)} ha (${percentage} %)`;
            }
          }
        }
      }
    };
  },
  props: {
    Stats: {
      type: Object
    }
  },

  watch: {
    Stats: {
      // immediate:true,
      deep: true,
      handler(val) {
        console.log("piechart data watch", val);
        this.createChart();
      },
      deep: true
    }
  },
  methods: {
    createChart() {
      Chart.defaults.global.plugins.datalabels.display = true;
      const { labels, stats } = this.Stats;
      let chartData = {};
      const data = [];
      const chart_labels = [];
      const datasets = [];
      const borderColor = [];
      const backgroundColor = [];
      stats.forEach((stat, i) => {
        data.push(stat.nb.toFixed(2)); //get all the data
        borderColor.push(labels[i].color);
        backgroundColor.push(labels[i].color);
        chart_labels.push(labels[i].label);
      });
      datasets[0] = {
        borderWidth: 1,
        borderColor,
        backgroundColor,
        data
      };
      chartData = { labels: chart_labels, datasets };
      this.renderChart(chartData, this.options);
    }
  }
};
</script>
