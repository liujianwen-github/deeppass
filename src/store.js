import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


// 需要维护的状态
const state = {
  userInfo:{
  	customName:'',
  	password:''
  },
  deviceInfo:[]
};

const mutations = {
  // 初始化 state
  INIT_STORE(state, data) {
    state.notes = data.notes,
    state.show = data.show;
    state.activeNote = '1';
  },
  INIT_USERINFO(state,data){
  	state.userInfo = data
  },
  INIT_DEVICEINFO(state,data){
    state.deviceInfo = data
  }
};
const actions = {

}
export default new Vuex.Store({
  state,
  mutations,
  actions
});