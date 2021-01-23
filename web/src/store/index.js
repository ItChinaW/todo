import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        token: "",
        user: "",
        statusCode: true
    },
    mutations: {
        setToken(state, data) {
            state.token = data
        },
        setUser(state, data) {
            state.user = data
        },
        setStatus(state, data) {
            state.statusCode = data
        },
    }
});

export default store;
