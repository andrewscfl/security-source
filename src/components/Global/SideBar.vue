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
    <v-list-item>
      <v-list-item-avatar size="44" class="my-3">
        <v-img src="/icon.png"></v-img>
      </v-list-item-avatar>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title">
        <v-list-item-action>
          <v-btn icon @click="$router.push({path: item.path })">
            <v-icon size="32">{{ item.icon }}</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  data() {
    return {
      items: [
        { title: "Home", icon: "mdi-view-dashboard", path: '/' },
        { title: "Phishing", icon: "mdi-email", path: '/phishing' },
        { title: "Network", icon: "mdi-access-point-network", path: '/network' },
        { title: "Trojans", icon: "mdi-shield-bug", path: '/trojans' },
        { title: "Help", icon: "mdi-help-circle", path: '/about' },
      ],
      mini: true,
    };
  },
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
  &__menu {
    border-right: 1px solid black;
  }
}
</style>