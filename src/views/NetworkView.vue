<template>
  <div class="pa-5">
    <v-container>
      <div class="d-flex justify-space-between mb-5">
        <div>
          <h1 class="gradient-text">Network Scanning</h1>
          <p>
            Utilize Security Source to more easily operate and better understand
            NMAP
          </p>
        </div>
        <div class="d-flex align-center">
          <v-btn
            class="elevation-0 gradient-bg mb-5 white--text font-weight-black"
            large
            >Verify NMAP installation</v-btn
          >
        </div>
      </div>
      <v-alert border="left" color="error" dark>
        <div class="d-flex">
          <div><v-icon class="mr-2">mdi-information-outline</v-icon></div>
          <div>
            Scanning a network you do not own without permission could be
            against the law, ensure you have proper permissions before scanning
            any network you do not own
          </div>
        </div>
      </v-alert>
      <v-card class="mb-5">
        <v-toolbar flat class="grey lighten-4 fill-width">
          <div class="d-flex justify-space-between fill-width">
            <div>
              <h1 class="ma-0 pa-0 gradient-text">Scan A Network</h1>
            </div>
          </div>
        </v-toolbar>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field
                outlined
                persistent-placeholder
                label="Target"
                block
                v-model="scan.target"
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-select
                outlined
                persistent-placeholder
                label="Scan Type"
                hide-details
                :items="scanTypes"
                item-text="name"
                item-value="type"
                v-model="scan.type"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field
                readonly
                outlined
                persistent-placeholder
                label="nmap command"
                block
                hide-details
                :value="scan.target ? `nmap -A -Pn ${scan.target}` : ''"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            elevation="0"
            class="gradient-bg white--text font-weight-black"
            large
            @click="startScan"
            :loading="loading"
            :disabled="loading"
            >Scan Network</v-btn
          >
        </v-card-actions>
      </v-card>
      <v-card class="mb-5" min-height="500px">
        <v-toolbar flat class="grey lighten-4">
          <h1 class="ma-0 pa-0 gradient-text">Scan Results</h1>
        </v-toolbar>
        <v-tabs vertical class="text-left" v-if="result">
          <v-tab>
            <v-icon left> mdi-server-network </v-icon>
            Scan Results
          </v-tab>

          <v-tab>
            <v-icon left> mdi-information-outline </v-icon>
            Suggestions
          </v-tab>

          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <template v-if="result && Array.isArray(result)">
                  <div v-for="(item, idx) in result" :key="idx">
                    <v-alert text color="info">
                      <h3 class="mb-0 pb-0" v-if="item && item.ip">
                        Scan report:
                        <span class="font-weight-bold">{{ item.ip }}</span>
                      </h3>
                      <p v-if="item && item.hostname">
                        hostname:
                        <span class="font-weight-bold">{{
                          item.hostname
                        }}</span>
                      </p>
                      <template
                        v-if="item.openPorts && Array.isArray(item.openPorts)"
                      >
                        <v-data-table
                          :headers="portHeaders"
                          :items="item.openPorts"
                          hide-default-footer
                          class="elevation-0"
                        >
                          <template #[`item.port`]="{ item }">
                            <div class="d-flex">
                              <div
                                class="mr-2 d-flex justify-center align-center"
                              >
                                <div class="port-icon"></div>
                              </div>
                              <div>{{ item.port }}</div>
                            </div>
                          </template>
                        </v-data-table>
                      </template>
                    </v-alert>
                  </div>
                </template>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
        <div v-else class="d-flex justify-center align-center flex-column">
          <img src="noresults.jpg" width="50%" />
          <p class="text-center mt-3 font-weight-black grey--text">
            No Scan Results
          </p>
        </div>
      </v-card>
    </v-container>
    <v-dialog v-model="error" max-width="500px">
      <v-card>
        <v-card-text class="pa-5">
          <div class="d-flex justify-center mb-0">
            <v-icon large>mdi-information-outline</v-icon>
          </div>
          <h2 class="text-center mt-5 mb-2">
            Ensure you have the NMAP CLI installed and you are scanning a valid ip address or host
          </h2>
          <p class="text-center">
            NMAP is a command line utility for port scanning that is free and
            open source. Security Source provides an interface for this tool
            which allows for more user friendly scanning and suggestions. If you
            do not have the NMAP cli installed, you can download it
            <a href="#" @click="openNmapDownload">here</a>.
          </p>
          <p class="text-center">
            after downloading, restart Security Source to use the network
            scanning portion of the application
          </p>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

export default {
  data: () => ({
    scan: {
      target: "",
      type: 0,
    },
    portHeaders: [
      {
        text: "Open Port",
        value: "port",
        align: "start",
      },
      {
        text: "Protocol",
        value: "protocol",
        align: "start",
      },
      {
        text: "Service",
        value: "service",
        align: "start",
      },
      {
        text: "Method of detection",
        value: "method",
        align: "start",
      },
    ],
    result: null,
    loading: false,
    error: false,
    scanTypes: [
      {
        type: 0,
        name: "Full Scan",
      },
    ],
  }),
  mounted() {
    this.bindIpcListeners();
  },
  methods: {
    openNmapDownload() {
      window.open("https://nmap.org/download");
    },
    startScan() {
      this.loading = true;
      window.api.startNmapScan({
        ...this.scan,
      });
    },
    bindIpcListeners() {
      window.api.onNmapScanFinish((event, result) => {
        this.loading = false;
        this.result = result;
      });
      window.api.onNmapScanError(() => {
        this.error = true;
        this.loading = false
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.port-icon {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: #7ddf53;
}
</style>