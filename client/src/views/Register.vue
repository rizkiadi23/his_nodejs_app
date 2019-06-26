<template>
  <v-container grid-list-md class="my-5">
    <v-form ref="form" lazy-validation>
      <v-layout row wrap>
        <v-flex xs6 offset-xs3>
          <center><h1 class="heading grey--text">Registration</h1></center>
        </v-flex>
        <v-flex xs6 offset-xs3>
          <v-text-field v-model="firstName" label="First Name" required></v-text-field>
        </v-flex>
        <v-flex xs6 offset-xs3>
          <v-text-field v-model="lastName" label="Last Name" required></v-text-field>
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
          <v-btn color="success" @click="register">Register</v-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
import * as auth from "../services/AuthService";

export default {
  name: "register",
  data() {
    return {
      show_password: false,
      firstName: "",
      lastName: "",
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
    register: async function() {
      const user = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      };
      await auth.registerUser(user);
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style>
</style>