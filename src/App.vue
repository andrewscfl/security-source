<template>
  <v-app app>
    <template v-if="token">
      <side-bar />
      <application-header />
      <v-main app>
        <router-view></router-view>
      </v-main>
    </template>
    <template v-else>
      <login-view @authenticated="getToken" />
    </template>
  </v-app>
</template>

<script>
import SideBar from "@/components/Global/SideBar.vue";
import ApplicationHeader from "@/components/Global/ApplicationHeader.vue";
import LoginView from "./views/LoginView.vue";

export default {
  name: "App",
  components: {
    SideBar,
    ApplicationHeader,
    LoginView,
  },
  data: () => ({
    token: null,
  }),
  mounted() {
    // //remove after initial mutate
    // localStorage.setItem('token','lolfaketoken')
    // //remove after intial mutate
    this.getToken();
    this.bindExpireWatcher();
  },
  methods: {
    getToken() {
      const hasToken = localStorage.getItem("token") !== "undefined";
      this.token = hasToken ? localStorage.getItem("token") : null;
    },
    bindExpireWatcher() {
      window.addEventListener("key-expired", () => {
        console.log('RAN IN WATCHER')
        localStorage.removeItem("token");
        this.getToken();
      });
    },
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
