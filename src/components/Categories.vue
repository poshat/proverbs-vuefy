<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <h4>Все категории</h4>
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
        <v-list>
          <v-list-tile v-for="item in showCatsLimit" :key="item.id" :to="{name: 'Search', params: {id: item.id, type: 'category', text: item.text}}">
            <v-list-tile-content>
              <v-list-tile-title v-text="item.text"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>

    <v-layout v-if="showCats.length - showCatsLimit.length > 0">
      <v-flex xs12>
        <v-btn outline block class="mt-3" @click.native="showMore">Еще 10</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        search: '',
        slice: 10
      }
    },
    computed: {
      categories () {
        return this.$store.getters.getCategories
      },
      showCats () {
        if (this.search.length > 2) {
          const re = new RegExp(this.search, 'gi')
          return this.categories.filter(el => el.text.match(re))
        } else {
          return this.categories
        }
      },
      showCatsLimit () {
        return this.showCats.slice(0, this.slice)
      }
    },
    methods: {
      showMore () {
        this.slice += 10
      }
    },
    created () {
      this.$store.dispatch('fillCategories')
    }
  }
</script>

<style lang="stylus">
  @import './../stylus/main'
</style>
