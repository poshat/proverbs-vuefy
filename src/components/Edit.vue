<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <div class="form">
              <h4>Редактировать запись</h4>
              <v-text-field
                label="Текст"
                multi-line
                full-width
                :error="error.text"
                v-model="text"
              ></v-text-field>
              <v-select
                :items="categories"
                item-text="text"
                item-value="id"
                label="Категория"
                autocomplete
                single-line
                :error="error.category"
                v-model="category"
              ></v-select>
              <v-select
                :items="countries"
                item-text="name"
                item-value="id"
                label="Страна"
                autocomplete
                single-line
                :error="error.country"
                v-model="country"
              ></v-select>
              <v-select
                :items="authors"
                item-text="name"
                item-value="id"
                label="Автор"
                autocomplete
                single-line
                :error="error.author"
                v-model="author"
              ></v-select>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat @click.native="onSave" :disabled="request">Сохранить</v-btn>
            <v-btn flat error @click.native="onCancel">Отмена</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-dialog v-model="alert">
      <v-card>
        <v-card-title primary-title>
          <h6 class="text-xs-center">Поговорка отредактирована</h6>
        </v-card-title>
        <v-card-actions class="text-xs-center">
          <v-container class="pa-0">
            <v-layout>
              <v-flex>
                <v-btn flat primary @click.native="onAlert">OK</v-btn>
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
        text: '',
        category: '',
        country: '',
        author: '',
        error: {
          text: false,
          category: false,
          country: false,
          author: false
        },
        alert: false,
        request: false
      }
    },
    computed: {
      authors () {
        return this.$store.getters.getAuthors
      },
      categories () {
        return this.$store.getters.getCategories
      },
      countries () {
        return this.$store.getters.getCountries
      }
    },
    methods: {
      onSave () {
        this.error = {
          text: false,
          category: false,
          country: false,
          author: false
        }
        if (this.text === '') return (this.error.text = true)
        if (this.category === '') return (this.error.category = true)
        if (this.country === '') return (this.error.country = true)
        if (this.author === '') return (this.error.author = true)

        const proverb = {
          id: this.$route.params.id,
          text: this.text,
          category: this.category,
          country: this.country,
          author: this.author
        }

        this.request = true
        this.$store.dispatch('editProverb', proverb)
          .then(res => {
            this.alert = true
            this.request = false
          })
      },
      onCancel () {
        this.$router.push('/')
      },
      onAlert () {
        this.alert = false
      }
    },
    created () {
      this.$store.dispatch('fillAuthors')
      this.$store.dispatch('fillCategories')
      this.$store.dispatch('fillCountries')
      const id = this.$route.params.id
      const proverb = this.$store.getters.getProverbById(id)
      this.text = proverb.text
      this.category = proverb.categoryId
      this.country = proverb.countryId
      this.author = proverb.authorId
    }
  }
</script>

<style lang="stylus" scoped>
  @import './../stylus/main'

  .form
    width: 100%;
</style>
