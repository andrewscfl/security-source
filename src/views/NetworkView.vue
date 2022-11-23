<template>
  <div class="pa-5">
    <v-container>
      <v-card class="mb-5">
        <v-toolbar flat class="grey lighten-4 fill-width">
          <div class="d-flex justify-space-between fill-width">
            <div>
              <h1 class="ma-0 pa-0 gradient-text">Scan A Network</h1>
            </div>
            <div>
              <v-icon>mdi-information-outline</v-icon>
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
            >Scan Network</v-btn
          >
        </v-card-actions>
      </v-card>
      <v-card class="mb-5">
        <v-toolbar flat class="grey lighten-4">
          <h1 class="ma-0 pa-0 gradient-text">Scan Results</h1>
        </v-toolbar>
        <v-tabs vertical class="text-left">
          <v-tab>
            <v-icon left> mdi-server-network </v-icon>
            Scan Results
          </v-tab>
          <v-tab>
            <v-icon left> mdi-console </v-icon>
            Console Output
          </v-tab>
          <v-tab>
            <v-icon left> mdi-information-outline </v-icon>
            Suggestions
          </v-tab>

          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p>
                  Sed aliquam ultrices mauris. Donec posuere vulputate arcu.
                  Morbi ac felis. Etiam feugiat lorem non metus. Sed a libero.
                </p>

                <p>
                  Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel,
                  lacus. Aenean tellus metus, bibendum sed, posuere ac, mattis
                  non, nunc. Aliquam lobortis. Aliquam lobortis. Suspendisse non
                  nisl sit amet velit hendrerit rutrum.
                </p>

                <p class="mb-0">
                  Phasellus dolor. Fusce neque. Fusce fermentum odio nec arcu.
                  Pellentesque libero tortor, tincidunt et, tincidunt eget,
                  semper nec, quam. Phasellus blandit leo ut odio.
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p>
                  Morbi nec metus. Suspendisse faucibus, nunc et pellentesque
                  egestas, lacus ante convallis tellus, vitae iaculis lacus elit
                  id tortor. Sed mollis, eros et ultrices tempus, mauris ipsum
                  aliquam libero, non adipiscing dolor urna a orci. Curabitur
                  ligula sapien, tincidunt non, euismod vitae, posuere
                  imperdiet, leo. Nunc sed turpis.
                </p>

                <p>
                  Suspendisse feugiat. Suspendisse faucibus, nunc et
                  pellentesque egestas, lacus ante convallis tellus, vitae
                  iaculis lacus elit id tortor. Proin viverra, ligula sit amet
                  ultrices semper, ligula arcu tristique sapien, a accumsan nisi
                  mauris ac eros. In hac habitasse platea dictumst. Fusce ac
                  felis sit amet ligula pharetra condimentum.
                </p>

                <p>
                  Sed consequat, leo eget bibendum sodales, augue velit cursus
                  nunc, quis gravida magna mi a libero. Nam commodo suscipit
                  quam. In consectetuer turpis ut velit. Sed cursus turpis vitae
                  tortor. Aliquam eu nunc.
                </p>

                <p>
                  Etiam ut purus mattis mauris sodales aliquam. Ut varius
                  tincidunt libero. Aenean viverra rhoncus pede. Duis leo. Fusce
                  fermentum odio nec arcu.
                </p>

                <p class="mb-0">
                  Donec venenatis vulputate lorem. Aenean viverra rhoncus pede.
                  In dui magna, posuere eget, vestibulum et, tempor auctor,
                  justo. Fusce commodo aliquam arcu. Suspendisse enim turpis,
                  dictum sed, iaculis a, condimentum nec, nisi.
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p>
                  Fusce a quam. Phasellus nec sem in justo pellentesque
                  facilisis. Nam eget dui. Proin viverra, ligula sit amet
                  ultrices semper, ligula arcu tristique sapien, a accumsan nisi
                  mauris ac eros. In dui magna, posuere eget, vestibulum et,
                  tempor auctor, justo.
                </p>

                <p class="mb-0">
                  Cras sagittis. Phasellus nec sem in justo pellentesque
                  facilisis. Proin sapien ipsum, porta a, auctor quis, euismod
                  ut, mi. Donec quam felis, ultricies nec, pellentesque eu,
                  pretium quis, sem. Nam at tortor in tellus interdum sagittis.
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    scan: {
      target: "",
      type: 0,
    },
    loading: false,
    scanTypes: [
      {
        type: 0,
        name: 'Full Scan'
      }, 
      {
        type: 1,
        name: 'OS and Port Scan'
      }
    ]
  }),
  mounted() {
    this.bindIpcListeners();
  },
  methods: {
    startScan() {
      this.loading = true;
      window.api.startNmapScan({
        ...this.scan
      });
    },
    bindIpcListeners() {
      window.api.onNmapScanFinish((event, args) => {
        console.log(args);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>