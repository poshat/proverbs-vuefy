<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <h4>Поиск по '{{$route.params.text}}'</h4>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex xs12>
        <v-text-field
          label="Фильтр"
          prepend-icon="filter_list"
          v-model="search"
        >
        </v-text-field>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex xs12>
        <v-card v-for="item in showLimit" :key="item.id" hover>
          <v-card-title primary-title class="pb-0">
            <h6>{{item.text}}</h6>
          </v-card-title>
          <v-card-text class="pt-0">
            <v-container fluid class="pa-0">
              <v-layout row wrap>
                <v-flex xs12 sm6 class="text-xs-left">
                  <router-link :to="{ name: 'Search', params: {id: item.categoryId, type: 'category', text: item.category}}">{{item.category}}</router-link> /
                  <router-link :to="{ name: 'Search', params: {id: item.countryId, type: 'country', text: item.country}}">{{item.country}}</router-link> /
                  <router-link :to="{ name: 'Search', params: {id: item.authorId, type: 'author', text: item.author}}">{{item.author}}</router-link>
                </v-flex>
                <v-flex xs12 sm6 class="text-xs-right" v-if="isAdmin">
                  <v-btn icon class="ma-0" @click.native.stop="onEdit(item.id)"><v-icon>subject</v-icon></v-btn>
                  <v-btn icon class="ma-0" @click.native.stop="onRemove(item.id)"><v-icon>delete</v-icon></v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout v-if="show.length - showLimit.length > 0">
      <v-flex xs12>
        <v-btn outline block class="mt-3" @click.native="showMore">Еще 10</v-btn>
      </v-flex>
    </v-layout>

    <v-dialog v-model="alert">
      <v-card>
        <v-card-title primary-title>
          <h6 class="text-xs-center">Вы уверены?</h6>
        </v-card-title>
        <v-card-actions class="text-xs-center">
          <v-container class="pa-0">
            <v-layout>
              <v-flex>
                <v-btn flat error @click.native="onAlert">OK</v-btn>
                <v-btn flat @click.native="alert = false">Cancel</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        search: '',
        slice: 10,
        alert: false,
        idToRemove: ''
      }
    },
    computed: {
      proverbs () {
        return this.$store.getters.getAllProverbs
      },
      isAdmin () {
        return this.$store.getters.isAdmin
      },
      show () {
        if (this.search.length > 2) {
          const re = new RegExp(this.search, 'gi')
          return this.proverbs.filter(el => el.text.match(re))
        } else {
          return this.proverbs
        }
      },
      showLimit () {
        return this.show.slice(0, this.slice)
      }
    },
    methods: {
      getData () {
        this.search = ''
        this.$store.dispatch('fillSearch', this.$route.params)
      },
      showMore () {
        this.slice += 10
      },
      onEdit (id) {
        this.$router.push({name: 'Edit', params: {id}})
      },
      onRemove (id) {
        this.idToRemove = id
        this.alert = true
      },
      onAlert () {
        this.$store.dispatch('removeProverb', this.idToRemove)
          .then(() => {
            this.alert = false
          })
      }
    },
    created () {
      this.getData()
    },
    watch: {
      '$route' () {
        this.getData()
      }
    }
  }
</script>

<style lang="stylus">
  @import './../stylus/main'
</style>
