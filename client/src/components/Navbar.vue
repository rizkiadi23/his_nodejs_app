<template>
  <nav>
    <v-snackbar v-model="snackbar_success" :timeout="4000" top color="success">
      <span>Awesome! You added a new document request.</span>
      <v-btn flat color="white" @click="snackbar_success = false">Close</v-btn>
    </v-snackbar>

    <v-snackbar v-model="snackbar_error" :timeout="4000" top color="danger">
      <span>Upss... Something Went Wrong :( Please Contact Your Admin</span>
      <v-btn flat color="white" @click="snackbar_error = false">Close</v-btn>
    </v-snackbar>

    <v-toolbar flat app>
      <v-toolbar-side-icon class="grey--text" @click="drawer = !drawer" v-if="$store.state.isLoggedIn"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Housing </span>
        <span>Information System</span>
      </v-toolbar-title>
      <v-spacer right></v-spacer>

      <!-- Dropdown Menu -->
      <v-menu offset-y v-if="$store.state.isLoggedIn">
        <v-btn flat slot="activator" color="grey">
          <v-icon>expand_more</v-icon>
          <span>Menu</span>
        </v-btn>
        <v-list>
          <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
            <v-list-tile-title>
              {{ link.text }}
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-btn flat color="grey" router :to="'/home'" v-if="!$store.state.isLoggedIn">
        <span>Home</span>
      </v-btn>

      <v-btn flat color="grey" @click="logout" v-if="$store.state.isLoggedIn">
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>

      <v-btn flat color="grey" router :to="'/login'" v-if="!$store.state.isLoggedIn">
        <span>Login</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>

      <v-btn flat color="grey" router :to="'/register'" v-if="!$store.state.isLoggedIn">
        <span>Register</span>
        <v-icon right>person_add</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" app class="primary" v-if="$store.state.isLoggedIn">
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img :src="this.$store.state.avatar">
          </v-avatar>
        </v-flex>
        <p class="white--text subheading mt-1">
          {{ this.$store.state.email }}
        </p>
        <v-flex class="mt-1 mb-3">
          <Popup 
            @requestAdded="snackbar_success = true"
            @requestError="snackbar_error = true" 
          />
        </v-flex>
      </v-layout>
      <v-list>
        <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-tile-action>
            <v-icon class="white--text">{{link.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">
              {{link.text}}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import * as auth from '../services/AuthService'
import Popup from './Popup'

export default {
  components: { Popup },
  data() {
    return {
      drawer: false,
      links: [
        { icon: 'dashboard', text: 'Dashboard', route: '/dashboard' },
        { icon: 'folder', text: 'My Request', route: '/request' },
        { icon: 'person', text: 'User', route: '/user' },
      ],
      snackbar_success: false,
      snackbar_error: false
    }
  },
  methods: {
    logout() {
      auth.logout()
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
