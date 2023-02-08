import { createStore } from 'vuex'

const moduleGlobal = {
	namespaced: true,
	state: {
		host: 'https://24lead.ru'
	},
	getters: {

	},
	mutations: {

	},
	actions: {

	}
}

const moduleUser = {
	namespaced: true,
	state: {
		token: '1pPh4aDaBQNOYrBN4NBrFhPky0SiHU'
	},
	getters: {

	},
	mutations: {

	},
	actions: {

	}
}

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: moduleUser,
    global: moduleGlobal
  }
})
