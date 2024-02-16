import Vue from 'vue'
import Vuex from 'vuex'

const apiUrl = 'http://razdumki.ru:3000/api/'
// const apiUrl = 'https://poshat.herokuapp.com/api/'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    proverbs: [],
    authors: [],
    categories: [],
    countries: [],
    user: {
      vkId: null,
      category: null
    }
  },
  getters: {
    getAllProverbs (state) {
      return state.proverbs
    },
    getAuthors (state) {
      return state.authors
    },
    getCategories (state) {
      return state.categories
    },
    getCountries (state) {
      return state.countries
    },
    getProverbById (state) {
      return id => state.proverbs.find(item => item.id === id)
    },
    isLoggedIn (state) {
      /* eslint-disable no-unneeded-ternary */
      return state.user.vkId === null ? false : true
    },
    isAdmin (state) {
      return state.user.category === 1 ? true : false
    }
  },
  mutations: {
    fillProverbs (state, data) {
      state.proverbs = data
    },
    fillAuthors (state, data) {
      state.authors = data
    },
    fillCategories (state, data) {
      state.categories = data
    },
    fillCountries (state, data) {
      state.countries = data
    },
    addProverb (state, data) {
      state.proverbs.push(data)
    },
    editProverb (state, data) {
      const i = state.proverbs.findIndex(item => item.id === data.id)
      Vue.set(state.proverbs, i, data)
    },
    removeProverb (state, data) {
      const i = state.proverbs.findIndex(item => item.id === data)
      state.proverbs.splice(i, 1)
    },
    setUser (state, data) {
      state.user = data
    }
  },
  actions: {
    fillRandomProverbs ({ commit }) {
      fetch(apiUrl + 'random')
        .then(blob => blob.json())
        .then(data => {
          commit('fillProverbs', data)
        })
        .catch(err => console.log(err))
    },
    fillAuthors ({ commit }) {
      fetch(apiUrl + 'authors')
        .then(blob => blob.json())
        .then(data => {
          commit('fillAuthors', data)
        })
        .catch(err => console.log(err))
    },
    fillCategories ({ commit }) {
      fetch(apiUrl + 'categories')
        .then(blob => blob.json())
        .then(data => {
          commit('fillCategories', data)
        })
        .catch(err => console.log(err))
    },
    fillCountries ({ commit }) {
      fetch(apiUrl + 'countries')
        .then(blob => blob.json())
        .then(data => {
          commit('fillCountries', data)
        })
        .catch(err => console.log(err))
    },
    fillSearch ({ commit }, params) {
      switch (params.type) {
        case 'category':
          fetch(apiUrl + 'category/' + params.id)
            .then(blob => blob.json())
            .then(data => {
              commit('fillProverbs', data)
            })
            .catch(err => console.log(err))
          break
        case 'country':
          fetch(apiUrl + 'country/' + params.id)
            .then(blob => blob.json())
            .then(data => {
              commit('fillProverbs', data)
            })
            .catch(err => console.log(err))
          break
        case 'author':
          fetch(apiUrl + 'author/' + params.id)
            .then(blob => blob.json())
            .then(data => {
              commit('fillProverbs', data)
            })
            .catch(err => console.log(err))
          break
        case 'search':
          fetch(apiUrl + 'search/', {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({text: params.text})
          })
            .then(blob => blob.json())
            .then(data => {
              commit('fillProverbs', data)
            })
            .catch(err => console.log(err))
          break
      }
    },
    addProverb ({ commit }, data) {
      return new Promise((resolve, reject) => {
        fetch(apiUrl + 'new/proverb/', {
          method: 'POST',
          headers: new Headers({'Content-Type': 'application/json'}),
          body: JSON.stringify(data)
        })
          .then(res => {
            commit('addProverb', data)
            resolve()
          })
          .catch(err => console.log(err))
      })
    },
    editProverb ({ commit }, data) {
      return new Promise((resolve, reject) => {
        fetch(apiUrl + 'edit/proverb/', {
          method: 'POST',
          headers: new Headers({'Content-Type': 'application/json'}),
          body: JSON.stringify(data)
        })
          .then(res => {
            commit('editProverb', data)
            resolve()
          })
          .catch(err => console.log(err))
      })
    },
    removeProverb ({ commit }, data) {
      return new Promise((resolve, reject) => {
        fetch(apiUrl + 'delete/proverb/', {
          method: 'POST',
          headers: new Headers({'Content-Type': 'application/json'}),
          body: JSON.stringify({id: data})
        })
          .then(res => {
            commit('removeProverb', data)
            resolve()
          })
          .catch(err => console.log(err))
      })
    },
    logIn ({ commit }) {
      /* global VK */
      VK.Auth.login(res => {
        const vkId = res.session.user.id
        fetch(apiUrl + 'user/add/', {
          method: 'POST',
          headers: new Headers({'Content-Type': 'application/json'}),
          body: JSON.stringify({vkId})
        })
          .then(blob => blob.json())
          .then(category => commit('setUser', {vkId, category}))
      })
    },
    getLoginStatus ({ commit }) {
      VK.Auth.getLoginStatus(res => {
        if (res.status === 'connected') {
          const vkId = res.session.mid
          fetch(apiUrl + 'user/' + vkId)
            .then(blob => blob.json())
            .then(category => commit('setUser', {vkId, category}))
        }
      })
    },
    logOut ({ commit }) {
      VK.Auth.logout(() => commit('setUser', {vkId: null, category: null}))
    }
  }
})
