<template>
  <div>
    
    <v-container class="pa-5">
      <v-row >
        <v-col cols="4">
          <statistic-card :stats="{ entry: '56', title: 'Phishing exam failures'}" />
        </v-col>
        <v-col cols="4">
          <statistic-card :stats="{ entry: '200', title: 'Emails sent'}" />
        </v-col>
        <v-col cols="4">
          <statistic-card :stats="{ entry: '12', title: 'Mock trojans opened'}" />
        </v-col>

      </v-row>
      <v-row>
        <v-col cols="12">
            <events-table/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import StatisticCard from "@/components/Global/StatisticCard.vue";
import EventsTable from "@/components/Global/EventsTable.vue";
export default {
  components: {
    StatisticCard,
    EventsTable,
  },
};
</script>


<style lang="scss" scoped>
</style>