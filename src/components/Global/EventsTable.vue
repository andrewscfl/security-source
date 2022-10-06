<template>
  <div>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="mockItems"
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "Source", value: "source" },
        { text: "Event", value: "event" },
        { text: "Description", value: "description" },
        { text: "Timestamp", value: "timestamp" },
      ],
      mockItems: [
        {
          source: "Phishing Testing",
          event: "Phishing Test Failure",
          description: "gary@company.com failed the phishing exam",
          timestamp: "Just now",
        },
        {
          source: "Network Scan",
          event: "Company Network Scanned",
          description: "3 open ports found",
          timestamp: "Just now",
        },
        {
          source: "Email Blast",
          event: "Emails sent",
          description: "creative deparment phishing test sent",
          timestamp: "Just now",
        },
        {
          source: "Phishing Testing",
          event: "Phishing Test Failure",
          description: "bob@company.com failed the phishing exam",
          timestamp: "Just now",
        },
        {
          source: "Phishing Testing",
          event: "Phishing Test Failure",
          description: "cathy@company.com failed the phishing exam",
          timestamp: "Just now",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>