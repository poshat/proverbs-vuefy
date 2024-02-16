<template>
  <v-app>
    <v-navigation-drawer
      temporary
      v-model="drawer"
      light
      overflow
      absolute
    >
      <v-list class="hidden-md-and-up">
        <v-list-tile to="/categories">
          <v-list-tile-content>
            <v-list-tile-title>Категории</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/countries">
          <v-list-tile-content>
            <v-list-tile-title>Страны</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/authors">
          <v-list-tile-content>
            <v-list-tile-title>Авторы</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="isLoggedIn" @click.native="onLogOut">
          <v-list-tile-content>
            <v-list-tile-title>Выход</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-else @click.native="onLogIn">
          <v-list-tile-content>
            <v-list-tile-title>Вход</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile tag="div" avatar class="mt-2">
          <v-list-tile-content>
            <form @submit.prevent="onSubmit">
              <v-text-field prepend-icon="search" label="Глобальный поиск" v-model="search" single-line></v-text-field>
            </form>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar prominent>
      <v-toolbar-side-icon @click.native.stop="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
      <router-link to="/" tag="div" style="cursor: pointer;">
        <v-toolbar-title>Пословицы и поговорки</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <form @submit.prevent="onSubmit">
          <v-text-field prepend-icon="search" label="Глобальный поиск" v-model="search" single-line></v-text-field>
        </form>
        <v-btn flat to="/categories">Категории</v-btn>
        <v-btn flat to="/countries">Страны</v-btn>
        <v-btn flat to="/authors">Авторы</v-btn>
        <v-btn flat v-if="isLoggedIn" @click.native="onLogOut">Выход</v-btn>
        <v-btn flat v-else @click.native="onLogIn">Вход</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </main>

    <v-btn fab dark primary bottom right fixed class="ma-3" to="/new">
      <v-icon dark>add</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        drawer: false,
        search: ''
      }
    },
    computed: {
      isLoggedIn () {
        return this.$store.getters.isLoggedIn
      }
    },
    methods: {
      onSubmit () {
        this.$router.push({name: 'Search', params: {type: 'search', id: 0, text: this.search}})
      },
      onLogIn () {
        this.$store.dispatch('logIn')
      },
      onLogOut () {
        this.$store.dispatch('logOut')
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
