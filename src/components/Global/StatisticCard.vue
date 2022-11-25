<template>
  <div>
    <v-card>
      <div class="d-flex justify-center align-center flex-column pa-5">
        <div>
          <h2 class="stat__title text-center" :class="{'stat__title-lg' : !dense}">{{ stats.entry }}</h2>
          <p class="stat__desc text-center grey--text">{{ stats.title }}</p>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    stats: {
      type: Object,
      default: () => ({}),
    },
    dense: {
      type: Boolean,
      default: false
    }
  },
};
</script>

<style lang="scss" scoped>
.stat {

  &__title {
    
    background: -webkit-linear-gradient(180deg, #7ddf53  9.52%,rgba(39, 115, 228, 0.855) 94.58%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    &-lg {
      font-size: 65px;
    }
  }
}
</style>