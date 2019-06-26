<template>
  <v-container class="my-5">
    <v-form ref="form" lazy-validation>
      <v-layout row wrap>
        <v-flex xs6 offset-xs3>
          <center><h1 class="heading grey--text">Login</h1></center>
        </v-flex>
        <v-flex xs6 offset-xs3>
          <v-text-field v-model="email" label="Email" required></v-text-field>
        </v-flex>
        <v-flex xs6 offset-xs3>
          <v-text-field
            v-model="password"
            :append-icon="show_password ? 'visibility' : 'visibility_off'"
            :rules="[rules.required, rules.min]"
            :type="show_password ? 'text' : 'password'"
            label="Password"
            @click:append="show_password = !show_password"
          ></v-text-field>
        </v-flex>
        <v-flex xs6 offset-xs3>
          <v-btn color="success" @click="login">Login</v-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
import * as auth from "../services/AuthService";

export default {
  name: "login",
  data() {
    return {
      show_password: false,
      email: "",
      password: "",
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 5 || "Min 5 characters",
        emailMatch: () => "The email and password you entered don't match"
      }
    };
  },
  methods: {
    login: async function() {
      const user = {
        email: this.email,
        password: this.password
      };
      await auth.login(user);
      this.$router.push({ name: "dashboard" });
    }
  }
};
</script>

<style>
</style>