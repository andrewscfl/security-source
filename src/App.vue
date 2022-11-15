<template>
  <v-app app>
    <side-bar />
    <application-header />
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
<style lang="scss">
.gradient-bg {
  background: linear-gradient(
    180deg,
    #9df378e7 9.52%,
    rgba(39, 115, 228, 0.46) 94.58%
  );
}
.gradient-text {
  background: -webkit-linear-gradient(
    180deg,
    #7ddf53 9.52%,
    rgba(39, 115, 228, 0.855) 94.58%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
