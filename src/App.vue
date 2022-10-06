<template>
  <v-app app>
    <side-bar />
    <application-header/>
    <v-main app>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import SideBar from "@/components/Global/SideBar.vue";
import ApplicationHeader from "@/components/Global/ApplicationHeader.vue";
export default {
  name: "App",
  components: {
    SideBar,
    ApplicationHeader,
  },
};
</script>
