import api from './api'
import { request } from '../utils/wx'
const actions = {
  async getSojson({ commit }, city) {
    const res = await request({
      method: 'post',
      url: `${api.sojson}`,
      data: {
        city
      }
    })
    return res
  }
}

export default actions;
