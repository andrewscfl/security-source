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
            @click="create.open = true"
            >Create New</v-btn
          >
        </div>
      </div>
      <div>
        <v-row class="mb-5">
          <v-col cols="6">
            <statistic-card
              dense
              :stats="{
                entry: info && info.name,
                title: 'Organization Phishing Exam Account',
              }"
            ></statistic-card>
          </v-col>
          <v-col cols="6">
            <statistic-card
              dense
              :stats="{ entry: baseUrl, title: 'Phishing Test Server' }"
            ></statistic-card>
          </v-col>
        </v-row>
        <v-card>
          <v-tabs  v-model="currentTest">
            <v-tab v-for="(item, idx) in tests" :key="idx">Phishing Test #{{ item.id }}</v-tab>
          </v-tabs>
          <v-card-text>
            <v-tabs-items v-model="currentTest">
              <v-tab-item v-for="(item, idx) in tests" :key="idx">
                <v-data-table
                  :headers="phishingTableHeaders"
                  :items="item.Entry"
                >
                  <template #[`item.status`]>
                    <p class="red--text mb-0 font-weight-bold">FAILED</p>
                  </template>
                  <template #[`item.timestamp`]>
                    {{ item.timestamp | formatTime }}
                  </template>
                </v-data-table>
              </v-tab-item>
            </v-tabs-items>
          </v-card-text>
        </v-card>
      </div>
    </v-container>
    <v-dialog v-model="create.open" max-width="600px">
      <v-card class="pt-5">
        <v-card-text>
          <h2 class="gradient-text text-h5 font-weight-bold">
            Create Phishing Test
          </h2>
          <v-text-field
            persistent-placeholder
            v-for="(item, idx) in create.emails"
            :key="idx"
            v-model="create.emails[idx]"
            label="Target Email"
            dense
            class="mt-5"
            hide-details
            outlined
            append-outer-icon="mdi-close"
            @click:append-outer="create.emails.splice(idx,1)"
          ></v-text-field>
          <div class="d-flex justify-center align-center">
            <v-btn icon @click="create.emails.push('')" class="mt-5">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>
          <div class="d-flex justify-end align-center">
            <v-btn
              class="elevation-0 gradient-bg white--text font-weight-black"
              @click="sendPhishingTest"
              :loading="create.loading"
              >Create New Test</v-btn
            >
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Requests from "../utils/requests";
import StatisticCard from "../components/Global/StatisticCard.vue";
import _ from "lodash";
import moment from "moment";
export default {
  components: {
    StatisticCard,
  },
  data: () => ({
    create: {
      open: false,
      emails: [""],
      loading: false,
    },
    info: null,
    tests: [],
    currentTest: null,
    phishingTableHeaders: [
      {
        text: "Email",
        align: "start",
        value: "employee.email",
      },
      {
        text: "Employee ID",
        align: "start",
        value: "employeeId",
      },
      {
        text: "Timestamp",
        align: "start",
        value: "timestamp",
      },
      {
        text: "Status",
        align: "center",
        value: "status",
      },
    ],
  }),
  mounted() {
    this.getInfo();
  },
  computed: {
    baseUrl() {
      return new Requests().baseUrl;
    },
  },
  filters: {
    formatTime(value) {
      return moment(value).format("MM/DD/YYYY hh:mm a");
    },
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
    async sendPhishingTest(){
      try {
        this.create.loading = true
        const requests = new Requests()
        const bccList = [...new Set([...this.create.emails].filter(x => x))]
        const response = requests.post('/api/phishing/create-phishing-exam', {
          bccList
        })
        console.log(response)
        this.create.loading = false
        this.create.open = false

      } catch (error) {
        console.log(error)
      }
    }
  },
};
</script>

<style lang="scss" scoped>
</style>