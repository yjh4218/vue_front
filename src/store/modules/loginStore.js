import { 
  userLogin,
  userLogout 
} from "../../api/userAPI";

const loginStore = {
  namespaced: true,
  state: {
    // axios 통신
    // 유저 로그인
    userLogin: [],
    // 유저 로그아웃
    userLogout:[],
    // 토큰 시간
    tokenTime: 0
  },
  getters: {
    // 유저 로그인 결과
    getUserLogin(state) {
      return state.userLogin;
    },
    // 유저 로그아웃 결과
    getUserLogout(state) {
      return state.userLogout;
    },
    // 토큰 시간 공유
    getTokenTime(state){
      return state.tokenTime
    }
  },
  mutations: {
    // axios 통신결과 조회
    // 유저 로그인 결과 저장
    SET_USER_LOGIN(state, userLogin) {
      state.userLogin = userLogin;
    },
    // 유저 로그아웃 결과 저장
    SET_USER_LOGOUT(state, userLogout) {
      state.userLogout = userLogout;
    },
    // 토큰 시간 설정
    
  },
  actions: {
    // 유저 로그인
    USER_LOGIN(context, user) {

      return userLogin(user)
        .then((response) => {
          context.commit("SET_USER_LOGIN", response);
          return response;
        })
        .catch((error) => {
          console.log(error.response);
          context.commit("SET_USER_LOGIN", error.response);
          return error.response;
        });
    },
    // 유저 로그아웃
    USER_LOGOUT(context, user) {

      return userLogout(user)
        .then((response) => {
          context.commit("SET_USER_LOGOUT", response);
          return response;
        })
        .catch((error) => {
          console.log(error.response);
          context.commit("SET_USER_LOGOUT", error.response);
          return error.response;
        });
    },
  },
};

export default loginStore;
