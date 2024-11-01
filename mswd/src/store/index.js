import { createStore } from 'vuex';
import api from '@/utils/api';

export default createStore({
  state: {
    isAuthenticated: false,
    user: null,
  },
  mutations: {
    SET_AUTH(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await api.post('/login', credentials);
        if (response.data.status === 'success') {
          localStorage.setItem('sessionId', response.data.sessionId);
          commit('SET_AUTH', true);
          commit('SET_USER', {
            role: response.data.role,
            category: response.data.category,
          });
          return true;
        }
      } catch (error) {
        console.error('Login failed:', error);
      }
      return false;
    },
    async logout({ commit }) {
      localStorage.removeItem('sessionId');
      commit('SET_AUTH', false);
      commit('SET_USER', null);
    },
    async checkAuth({ commit }) {
      try {
        const response = await api.get('/api/verify-session');
        if (response.data.status === 'success') {
          commit('SET_AUTH', true);
          return true;
        }
      } catch (error) {
        console.error('Session verification failed:', error);
      }
      commit('SET_AUTH', false);
      return false;
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    user: (state) => state.user,
  },
});