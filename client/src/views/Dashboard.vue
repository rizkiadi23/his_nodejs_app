<template>
  <div class="request">
    <h1 class="subheading grey--text">Dashboard</h1>

    <v-container class="my-5">
      
      <v-layout row class="mb-3">
        <v-tooltip top>
          <v-btn small flat color="grey" @click="sortBy('documentType')" slot="activator">
            <v-icon left small>folder</v-icon>
            <span class="caption">By Document Type</span>
          </v-btn>
          <span>Sort Request by Document Type</span>
        </v-tooltip>
        
        <v-tooltip top>
          <v-btn small flat color="grey" @click="sortBy('requesterName')" slot="activator">
            <v-icon left small>person</v-icon>
            <span class="caption">By Requester</span>
          </v-btn>
          <span>Sort Request by Requester Name</span>
        </v-tooltip>
      </v-layout>

      <v-card flat v-for="request in requests" :key="request.id">
        <v-layout row wrap :class="`pa-3 request ${request.status.toLowerCase()}`">
          <v-flex xs12 md6>
            <div class="caption grey--text">Document Type</div>
            <div>{{request.documentType}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Requester Name</div>
            <div>{{request.requesterName}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Approver</div>
            <div>{{request.approvedBy}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="right">
              <v-chip small :class="`${request.status.toLowerCase()} white--text caption my-2`">{{ request.status }}</v-chip>
            </div>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import RequestDocumentService from '../services/RequestDocumentService'

export default {
  name: 'Request',
  data() {
    return {
      requests: []
    }
  },
  methods: {
    sortBy(prop) {
      this.requests.sort((a, b) => a[prop] < b[prop] ? -1 : 1)
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
  .request.completed {
    border-left: 4px solid #3cd1c2;
  }
  .request.open {
    border-left: 4px solid orange;
  }
  .request.overdue {
    border-left: 4px solid tomato;
  }
  .v-chip.completed {
    background: #3cd1c2;
  }
  .v-chip.open {
    background: #ffaa2c;
  }
  .v-chip.overdue {
    background: #f83e70;
  }
</style>