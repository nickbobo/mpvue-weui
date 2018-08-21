import * as type from './mutation-types';

const mutations = {
    [type.SET_MPVUEINFO](state, mpvueInfo) { // eslint-disable-line
    console.info(mpvueInfo);
    state.mpvueInfo = mpvueInfo;
  }
}

export default mutations;
