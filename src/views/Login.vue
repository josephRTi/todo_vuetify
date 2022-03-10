<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
    <p>Простое веб-приложение, реализвованное при помощи Vue.js и Vuetify</p>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary" src="wallpaper.jpg">
            <v-toolbar-title>Вход</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                  @keyup.enter="submit_form"
                  prepend-icon="mdi-account"
                  id="login"
                  name="login"
                  label="Логин"
                  type="text"
              ></v-text-field>
              <v-text-field
                  @keyup.enter="submit_form"
                  id="password"
                  prepend-icon="mdi-lock"
                  name="password"
                  label="Пароль"
                  type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-alert v-for="item in errors" :key="item"
                   dense
                   type="error"
          >
            {{ item }}
          </v-alert>
          <v-card-actions>
<!--            <router-link to="/register">Зарегистрироваться</router-link>-->
            <v-spacer></v-spacer>
            <v-btn color="darkgray" @click="$router.push('/register')">Зарегистрироваться</v-btn>
            <v-btn color="primary" @click="submit_form">Войти</v-btn>

          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import axios from "axios";
import router from "@/router";

export default {
  name: 'Login',
  data() {
    return {
      errors: [],
      dict: {
        'password': 'Пароль',
        'username': 'Логин',
      }
    }
  },
  props: {
    source: String,
  },
  methods: {
    async submit_form() {
      this.errors = []
      let pwd = document.getElementById('password').value
      let username = document.getElementById('login').value
      await axios.post('https://restapito-do-app.herokuapp.com/api/auth/',
          {
            username: username,
            password: pwd
          }
      ).then(response => {
        this.$store.state.Token = (response.data.token).toString()
        this.$store.state.user_id = (response.data.id).toString()
        localStorage.setItem('Token', (response.data.token).toString())
        localStorage.setItem('user_id', (response.data.id).toString())
      }).catch(error => {
        for (let i in error.response.data) {
          this.errors.push((this.dict[i] ? ": " : '') + error.response.data[i][0].toLocaleLowerCase())
        }
      })
      if (this.errors.length === 0) {
        this.$router.push('/').catch(() => {})
      }
    }
  }
};
</script>

<style></style>
