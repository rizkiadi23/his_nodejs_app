<template>
  <div class="user">
    <h1 class="subheading grey--text">User</h1>

    <v-container class="my-5">
      
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="user in users" :key="user.email">
          <v-card flat class="text-xs-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="grey lighten-2">
                <img :src="user.avatar">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ `${user.firstName} ${user.lastName}` }}</div>
              <div class="grey--text">{{ user.profile }}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn flat color="grey">
                <v-icon small left>message</v-icon>
                <span>Message</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>

    </v-container>
  </div>
</template>

<script>
import { retrieveAllUsers } from '../services/AuthService'

export default {
  data() {
    return {
      users: []
    }
  },
  async created() {
    try {
      let alluser = await retrieveAllUsers()
      this.users = alluser.data.data
    } catch (err) {
      this.error = err
    }
  }
}
</script>