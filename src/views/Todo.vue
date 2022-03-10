<template>
  <div class="home">
    <v-text-field
        v-model="NewTask"
        @click:append="createNode"
        @keyup.enter="createNode"
        @keyup.ctrl="test"
        class="pa-3"
        outlined
        label="Заметка"
        append-icon="mdi-plus"
        hide-details
        clearable
    ></v-text-field>
    <v-list
        class="pt-0"
        flat
    >
    <p>Простое веб-приложение, реализвованное при помощи Vue.js и Vuetify</p>
      <div v-for="item in nodes" :key="item.id">
        <v-list-item @click="updateItem(item.id)" :class="{'blue lighten-5' : item.is_finished}">
          <template v-slot:default="active">
            <v-list-item-action>
              <v-checkbox
                  :input-value="(item.is_finished ? 'active' : '')"
                  color="primary"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title
              :class="{'text-decoration-line-through' : item.is_finished}"
              >
                {{ item.node }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click.stop="deleteItem(item.id)">
                <v-icon color="primary lighten-1">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
        <v-divider/>
      </div>

    </v-list>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data() {
    return {
      NewTask: '',
      nodes: []
    }
  },
  methods: {
    async deleteItem(id) {
      let node = this.nodes.filter(node => id === node.id)[0]
      axios.delete('https://restapito-do-app.herokuapp.com/api/node_update/' + node.id, {
        headers: {
          Authorization: "Token " + this.$store.state.Token
        },
        data: node
      }).then(this.nodes = this.nodes.filter(function (item) {
        return item !== node
      }))
    },
    updateItem(id) {
      let node = this.nodes.filter(node => id === node.id)[0]
      node.is_finished = !node.is_finished
      axios.put('https://restapito-do-app.herokuapp.com/api/node_update/' + node.id, node, {
        headers: {
          Authorization: "Token " + this.$store.state.Token
        },
      })
    },
    async createNode() {
      let currentDate = new Date()
      let Node = {
        node: this.NewTask,
        date: currentDate.toISOString().split('T')[0],
        user: this.$store.state.user_id,
        is_finished: false
      }
      axios.post('https://restapito-do-app.herokuapp.com/api/node/', Node, {
        headers: {
          Authorization: "Token " + this.$store.state.Token
        },
      }).then(response => (this.nodes.unshift(response.data)))
      this.NewTask = ''
    },
  },
  mounted() {
    if (localStorage.getItem('Token') === null) {
      this.$router.push('/login').catch(() => {})
    } else {
      this.$store.state.Token = localStorage.getItem('Token')
      this.$store.state.user_id = localStorage.getItem('user_id')
    }
    axios.get('https://restapito-do-app.herokuapp.com/api/node/', {
      headers: {
        Authorization: "Token " + this.$store.state.Token
      }
    }).then(response => {
      for (let i = 0; i < response.data.length; i++) {
        const newItem = {
          user: response.data[i].user,
          node: response.data[i].node,
          id: response.data[i].id,
          is_finished: response.data[i].is_finished,
          date: response.data[i].date
        };
        this.nodes.unshift(newItem);
      }
    })
  },
}
</script>
