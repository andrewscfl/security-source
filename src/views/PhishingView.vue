<template>
  <div>
    <v-container>
      <div class="d-flex justify-space-between mb-5">
        <div>
          <h1 class="gradient-text">Active Phishing Tests</h1>
          <p>Active tests with currently emails and phishing pages</p>
        </div>
        <div class="d-flex align-center">
          <v-btn
            large
            class="elevation-0 gradient-bg mb-5 white--text font-weight-black"
            >Create New</v-btn
          >
        </div>
      </div>
      <div>
        <v-row class="mb-5">
            <v-col cols="6">
                <statistic-card dense :stats="{ entry: info && info.name , title: 'Organization Phishing Exam Account'}"></statistic-card>
            </v-col>
            <v-col cols="6">
                <statistic-card dense :stats="{ entry: baseUrl , title: 'Phishing Test Server'}"></statistic-card>
            </v-col>
            
        </v-row>
        <v-card>
          <v-tabs v-for="(item, idx) in tests" :key="idx" v-model="currentTest">
            <v-tab>Phishing Test #{{ item.id }}</v-tab>
          </v-tabs>
          <v-card-text>
            <v-tabs-items v-model="currentTest">
              <v-tab-item v-for="(item, idx) in tests" :key="idx">
                <v-data-table :headers="phishingTableHeaders" :items="item.Entry">
                    <template #[`item.status`]>
                        <p class="red--text mb-0 font-weight-bold">FAILED</p>
                    </template>
                </v-data-table>
              </v-tab-item>
            </v-tabs-items>
          </v-card-text>
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script>
import Requests from "../utils/requests";
import StatisticCard from "../components/Global/StatisticCard.vue";
import _ from "lodash";
export default {
  components: {
    StatisticCard,
  },
  data: () => ({
    info: null,
    tests: [],
    currentTest: null,
    phishingTableHeaders: [
        {
            text: 'Email',
            align: 'start',
            value: 'employee.email'
        },
        {
            text: 'Employee ID',
            align: 'start',
            value: 'employeeId'
        },
        {
            text: 'Timestamp',
            align: 'start',
            value: 'timestamp'
        },
        {
            text: 'Status',
            align: 'center',
            value: 'status'
        }
    ]
  }),
  mounted() {
    this.getInfo();
  },
  computed: {
    baseUrl(){
        return new Requests().baseUrl
    }
  },
  methods: {
    async getInfo() {
      try {
        const requests = new Requests();
        const { data: result } = await requests.get(
          "/api/phishing/active-phishing-campaigns"
        );
        const { data } = result;
        if (!data) throw new Error("request failed");
        this.info = data;
        this.mapTests(_.cloneDeep(data));
      } catch (error) {
        if (error && error.request && error.request.status) Requests.logout();
      }
    },
    mapTests(data) {
      if (data && data.Test && Array.isArray(data.Test)) this.tests = data.Test;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>