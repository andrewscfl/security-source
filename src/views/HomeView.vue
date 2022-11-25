<template>
  <div>
    <v-container class="pa-5">
      <v-row>
        <v-col cols="4">
          <statistic-card
            :stats="{ entry: stats.totalExams, title: 'Exams Active' }"
          />
        </v-col>
        <v-col cols="4">
          <statistic-card
            :stats="{
              entry: stats.totalExamResponses,
              title: 'Phishing Failures',
            }"
          />
        </v-col>
        <v-col cols="4">
          <statistic-card
            :stats="{ entry: stats.scansCompleted, title: 'Network Scans' }"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card class="gradient-bg">
            <v-card-text>
              <div class="d-flex justify-space-between">
                <div class="home__scanner-dialog-text">
                  <h2 class="white--text font-weight-black mb-2">
                    Want to make sure your network is secure?
                  </h2>
                  <p class="white--text pb-0 mb-0">
                    Utilize Security Source's built in NMAP scanner to find out
                    more about your systems and how to keep them secure
                  </p>
                </div>
                <div class="d-flex align-center">
                  <v-btn outlined color="white">Scanning Dashboard</v-btn>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <apex-chart
            width="100%"
            height="400px"
            type="bar"
            :options="chart.options"
            :series="chart.series"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ApexChart from "vue-apexcharts";
import StatisticCard from "@/components/Global/StatisticCard.vue";
import Requests from "../utils/requests";
import _ from "lodash";
import moment from "moment";
export default {
  components: {
    StatisticCard,
    ApexChart,
  },
  data: () => ({
    stats: {
      totalExams: 0,
      totalExamResponses: 0,
      scansCompleted: 0,
    },
    info: null,

    chart: {
      options: {
        chart: {
          id: "dashboard-chart",
        },
        xaxis: {
          // x axis labels
          categories: [],
        },
        fill: {
          colors: ["#9df378e7", "#E91E63", "#9C27B0"],
        },
      },
      series: [
        {
          name: "statisics",
          // y axis data
          data: [],
        },
      ],
    },
  }),
  mounted() {
    this.getInfo();
  },
  methods: {
    async getInfo() {
      try {
        console.log("running get info");
        const requests = new Requests();
        const { data: result } = await requests.get(
          "/api/phishing/active-phishing-campaigns"
        );
        const { data } = result;
        if (!data) throw new Error("request failed");
        this.info = _.cloneDeep(data);
        this.mapStatistics(_.cloneDeep(data));
        this.mapChart(_.cloneDeep(data));
      } catch (error) {
        if (error && error.request && error.request.status) Requests.logout();
      }
    },
    mapStatistics(data) {
      if (data && data.Test && Array.isArray(data.Test)) {
        this.stats.totalExams = data.Test.length;
        this.stats.totalExamResponses = data.Test.reduce(
          (prev, curr) =>
            prev +
            (curr && curr.Entry && Array.isArray(curr.Entry)
              ? curr.Entry.length
              : 0),
          0
        );
      }
    },
    mapChart(data) {
      if (data && data.Test && Array.isArray(data.Test)) {
        const allFailures = [];
        const dateEntryMap = {};

        data.Test.forEach((test) => {
          if (test.Entry && Array.isArray(test.Entry))
            test.Entry.forEach((entry) => allFailures.push(entry));
        });

        //filter out older than a week
        const legend = allFailures
          .filter(
            (item) =>
              item &&
              item.timestamp &&
              moment().diff(moment(item.timestamp), "days") < 5
          )
          .sort((a, b) => moment(a).valueOf() - moment(b).valueOf());

        //fill with week dates
        for (let i = 0; i < 5; i++) {
          const currentDate = moment().subtract(i, "days").format("MM/DD/YYYY");
          dateEntryMap[currentDate] = 0;
        }

        //group by dates
        for (let entry of legend) {
          const dayOfEntry = entry.timestamp
            ? moment(entry.timestamp).format("MM/DD/YYYY")
            : "Unknown Date";
          dayOfEntry in dateEntryMap
            ? (dateEntryMap[dayOfEntry] += 1)
            : (dateEntryMap[dayOfEntry] = 1);
        }

        const dates = Object.keys(dateEntryMap).reverse();
        const failures = Object.values(dateEntryMap).reverse();

        console.log(dates, failures);
        this.chart = {
          options: {
            chart: {
              id: "dashboard-chart",
            },
            xaxis: {
              // x axis labels
              categories: [...dates],
            },
          },
          series: [
            {
              name: "Phishing Failures",
              // y axis data
              data: [...failures],
            },
          ],
        };
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.home {
  &__scanner {
    &-dialog-text {
      max-width: 450px;
    }
  }
}
</style>