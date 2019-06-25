<template>
  <div class="request">
    <h1 class="subheading grey--text">My Request Documents</h1>

    <v-container class="my-5">
      
      <v-expansion-panel>
        <v-expansion-panel-content v-for="myRequest in myRequests" :key="myRequest.id">
          <div slot="header">{{myRequest.documentType}}</div>
          <v-card>
            <v-card-text class="px-4 grey--text">
              <div class="font-weight-bold">raised at {{myRequest.createdAt}}</div>
              {{myRequest.status}}
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>

    </v-container>
  </div>
</template>

<script>
import RequestDocumentService from '../services/RequestDocumentService'

export default {
  data() {
    return {
      requests: []
    }
  },
  computed: {
    myRequests() {
      return this.requests.filter(req => {
        return req.requesterName === 'Pak Eko'
      })
    }
  },
  async created() {
    try {
      this.requests = await RequestDocumentService.getRequestDocuments()
    } catch (err) {
      this.error = err
    }
  }
}
</script>

<style>
</style>