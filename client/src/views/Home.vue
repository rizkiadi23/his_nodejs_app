<template>
  <v-jumbotron>
    <v-container fill-height>
      <v-layout align-center>
        <v-flex>
          <h3 class="display-3">Welcome Folks!</h3>

          <span class="subheading">This is a portal to manage your document request...</span>

          <v-divider class="my-3"></v-divider>

          <div class="title mb-3">Register now to get more access!</div>

          <v-btn class="mx-0" color="primary" large router :to="'/register'">
            Register
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
</template>

<script>

export default {
  name: "home",
  components: { }
};
</script>

<style>
</style>