import * as type from './mutation-types';

const mutations = {
    [type.SET_MPVUEINFO](state, mpvueInfo) { // eslint-disable-line
    state.mpvueInfo = mpvueInfo;
  },
  [type.SET_OPEN_ID](state,v){
    state.openId = v;
  }
}

export default mutations;
