<template>
  <nav>
    <v-toolbar flat app>
      <v-toolbar-side-icon class="grey--text" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Housing </span>
        <span>Information System</span>
      </v-toolbar-title>
      <v-spacer right></v-spacer>

      <!-- Dropdown Menu -->
      <v-menu offset-y>
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

      <v-btn flat color="grey">
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" app class="primary">
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img src="https://github.com/iamshaunjp/vuetify-playlist/blob/lesson-20/todo-ninja/public/avatar-3.png?raw=true">
          </v-avatar>
          <p class="white--text subheading mt-1">
            Test User One
          </p>
        </v-flex>
        <v-flex class="mt-1 mb-3">
          <Popup />
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
import Popup from './Popup'

export default {
  components: { Popup },
  data() {
    return {
      drawer: false,
      links: [
        { icon: 'dashboard', text: 'Dashboard', route: '/' },
        { icon: 'folder', text: 'Request', route: '/request' },
        { icon: 'person', text: 'User', route: '/user' },
      ]
    }
  }
}
</script>
