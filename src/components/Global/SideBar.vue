<template>
  <v-navigation-drawer
    class="navigation__aside"
    mini-variant
    mini-variant-width="76"
    permanent
    height="100%"
    fixed
    app
  >
    <div
      class="d-flex justify-space-between align-center flex-column fill-height"
    >
      <div>
        <v-list-item>
          <v-list-item-avatar size="44" class="my-3">
            <v-img src="/icon.png"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense nav>
          <v-list-item v-for="item in items" :key="item.title">
            <v-list-item-action>
              <v-btn icon @click="$router.push({ path: item.path })">
                <v-icon size="32">{{ item.icon }}</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </div>
      <div class="py-5">
        <v-menu offset-x>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" icon>
              <v-avatar class="navigation__avatar" :size="50">
                <v-icon color="white">mdi-account</v-icon>
              </v-avatar>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="logout">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </v-navigation-drawer>
</template>
<script>
import Requests from '../../utils/requests'
export default {
  data() {
    return {
      items: [
        { title: "Home", icon: "mdi-view-dashboard", path: "/" },
        { title: "Phishing", icon: "mdi-email", path: "/phishing" },
        {
          title: "Network",
          icon: "mdi-access-point-network",
          path: "/network",
        },
        { title: "Trojans", icon: "mdi-shield-bug", path: "/malware" },
        { title: "Help", icon: "mdi-help-circle", path: "/about" },
      ],
      mini: true,
    };
  },
  methods: {
    logout(){
      Requests.logout()
    }
  }
};
</script>
<style lang="scss">
.navigation {
  &__wrapper {
    height: 100%;
  }
  &__aside {
    background: linear-gradient(
      180deg,
      #c0ffa559 9.52%,
      rgba(39, 115, 228, 0.224) 94.58%
    );
  }
  &__avatar {
    background: #6e6e6e4b;
  }
  &__menu {
    border-right: 1px solid black;
  }
}
</style>