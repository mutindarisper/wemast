<script>
import { Line } from "vue-chartjs";
import Chart from "chart.js";
export default {
  extends: Line,
  props: {
    Stats: {
      type: Object
    }
  },
  data() {
    return {
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              scaleLabel: {
                display: true,
                labelString: "Area in  ha"
              },
              gridLines: {
                display: true
              }
            }
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Classes"
              },
              gridLines: {
                display: false
              }
            }
          ]
        },
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  watch: {
    Stats: {
      // immediate:true,
      deep: true,
      handler(val) {
        if (process.env.DEV) console.log("line data watch", val);
        this.createChart();
      },
      deep: true
    }
  },
  // mounted () {
  //   this.renderChart(this.chartData, this.options)
  // },
  methods: {
    createChart() {
      const { labels, stats } = this.Stats;
      let chartData = {};
      const data = [];
      const chart_labels = [];
      const datasets = [];
      const borderColor = [];
      const backgroundColor = [];
      stats.forEach((stat, i) => {
        data.push((stat.nb / 10000).toFixed(2)); //get all the data
        borderColor.push(labels[i].color);
        backgroundColor.push(labels[i].color);
        chart_labels.push(labels[i].label);
      });
      datasets[0] = {
        borderWidth: 3,
        borderColor,
        fill: false,
        label: "Lulc",
        backgroundColor,
        data
      };
      chartData = { labels: chart_labels, datasets };
      Chart.defaults.global.plugins.datalabels.display = false;
      this.renderChart(chartData, this.options);
    }
  }
};
</script>
