<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Todo List
          </v-list-item-title>
          <p>1</p>
          <v-list-item-subtitle>
            Created using Vuetify
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
          dense
          nav
      >
        <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.to"
            link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
        color="primary"
        dark
        prominent
        src="wallpaper.jpg"
        @click="drawer = !drawer"
        app
    >
      <template v-slot:img="{ props }">
        <v-img
            v-bind="props"
            gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-app-bar-title>Todo</v-app-bar-title>

      <v-spacer></v-spacer>

<!--      <v-btn icon>-->
<!--        <v-icon>mdi-magnify</v-icon>-->
<!--      </v-btn>-->

      <v-btn icon @click.stop="logout" v-if="$store.state.Token">
        <v-icon>mdi-logout</v-icon>
      </v-btn>

<!--      <v-btn icon>-->
<!--        <v-icon>mdi-dots-vertical</v-icon>-->
<!--      </v-btn>-->
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      {title: 'Todo', icon: 'mdi-format-list-checks', to: "/"},
      {title: 'About', icon: 'mdi-help-box', to: '/about'},
    ],
  }),
  methods: {
    logout() {
      this.$store.Token = null
      this.$store.user_id = null
      localStorage.removeItem('Token')
      localStorage.removeItem('user_id')
      this.$router.push('/login').catch(() => {})
    }
  }
}
</script>
