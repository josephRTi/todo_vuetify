<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary" src="wallpaper.jpg">
            <v-toolbar-title>Регистрация</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field @keyup.enter="submit_form"
                id="name"
                label="Имя"
                type="text"
                prepend-icon="mdi-alpha-n-box-outline">
              </v-text-field>
              <v-text-field @keyup.enter="submit_form"
                  id="surname"
                  label="Фамилия"
                  type="text"
                  prepend-icon="mdi-alpha-s-box-outline">
              </v-text-field>
              <v-text-field @keyup.enter="submit_form"
                  prepend-icon="mdi-account"
                  id="login"
                  name="login"
                  label="Логин"
                  type="text"
              ></v-text-field>
              <v-text-field @keyup.enter="submit_form"
                  prepend-icon="mdi-email"
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
              ></v-text-field>
              <v-text-field @keyup.enter="submit_form"
                  id="password"
                  prepend-icon="mdi-lock"
                  name="password"
                  label="Пароль"
                  type="password"
              ></v-text-field>
              <v-text-field @keyup.enter="submit_form"
                  id="password2"
                  prepend-icon="mdi-lock"
                  name="password"
                  label="Подтверждение пароля"
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
            <v-spacer></v-spacer>
            <v-btn color="darkgray" @click="$router.push('/login')">Назад</v-btn>
            <v-btn color="primary" @click="submit_form">Зарегистрироваться</v-btn>
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
    validate_pass(pwd1, pwd2) {
      return pwd1 === pwd2 && pwd1 !== "";
    },

    isEmpty(obj) {
      return Object.keys(obj).length === 0;
    },

    async submit_form() {
      let pwd = document.getElementById('password').value
      let pwd2 = document.getElementById('password2').value
      let username = document.getElementById('login').value
      let email = document.getElementById('email').value
      let name = document.getElementById('name').value
      let surname = document.getElementById('surname').value

      this.errors = []
      await axios.post('https://restapito-do-app.herokuapp.com/api/register/',
          {
            name: name,
            surname: surname,
            username: username,
            password: pwd,
            password2: pwd2,
            email: email
          }
      ).then(response => {
        this.$store.state.user_id = response.data.id
      }).catch(error => {
        for (let i in error.response.data) {
          this.errors.push((i === 'username' ? 'login' : i) + ': ' +error.response.data[i][0].toLocaleLowerCase())
        }
      })
      if (this.isEmpty(this.errors)) {
        this.$router.push('/login').catch(() => {})
      }
      console.log(this.errors)
    }
  }
};
</script>

<style></style>
