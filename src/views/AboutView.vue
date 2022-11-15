<template>
  <div>
    <v-container class="pa-5">
      <div class="mb-10">
        <h2 class="mb-3">About Security Source</h2>
        <p>
          Security Source is an open source project dedicated to helping small
          businesses tackle their cyber security needs. We utilize visual cues
          and user frieldy interface elements in order to guide users into a
          better understanding of their organization's security needs.
        </p>
        <p>
          In many case's hiring dedicated cyber security professionals is
          infeasible for small to medium sized businesses, security source aims
          to provide these companies with the resources they need in order to
          make sure their staff is trained, their network is secure, and any
          security mechanisms they have implemented are battle ready.
        </p>
      </div>
      <div class="mb-10">
        <h2 class="mb-3">About The Developers</h2>
        <v-row>
          <v-col v-for="(item, idx) in team" :key="idx">
            <v-card>
              <v-card-text>
                <h3 class="mb-3" v-text="item.name"></h3>
                <p v-text="item.bio"></p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    team: [
      {
        name: "Andrew Caldwell",
        bio: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      },
      {
        name: "Hojun Lee",
        bio: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      },
      {
        name: "Abdullah Naseem",
        bio: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      },
    ],
  }),
};
</script>

<style lang="scss" scoped>
</style>