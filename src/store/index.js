import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import mutations from './mutations';
import * as getters from './getters';
// import * as actions from './actions';
import api from './api'
import { request, getRequest } from '../utils/wx'
Vue.use(Vuex);
export default new Vuex.Store({ // eslint-disable-line
  state,
  mutations,
  actions: {
    async getSojson({ commit }, city) {
      console.info(api.sojson, city)
      const res = await request({
        method: 'GET',
        url: `${api.sojson}`,
        data: {
          'city': '北京'
        }
      })
      return res
    },
    async getQQMusic({ commit }, qq) {
      const res = await getRequest({
        method: 'GET',
        url: `${api.qqmusic}${qq}`
        // data: {}
      })
      return res
    }
  },
  getters
});
