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
import Requests from '../utils/requests'
export default {
  components: {
    StatisticCard,
    EventsTable,
  },
  mounted(){
    this.getInfo()
  },
  methods: {
    async getInfo(){
      try {
        console.log('running get info')
        const requests = new Requests()
        const result = await requests.get('/api/phishing/active-phishing-campaigns')
        console.log(result)
      } catch (error) {
        //run if key expires
        console.log('ERRO BLOCK BEING RUn')
        window.dispatchEvent(new CustomEvent('key-expired'))
        console.log(error)
      }
    }
  }
};
</script>


<style lang="scss" scoped>
</style>