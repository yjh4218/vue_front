import { userLogin } from "../../api/userAPI";

const loginStore = {
  namespaced: true,
  state: {
    // axios 통신
    // 유저 로그인
    userLogin: [],
  },
  getters: {
    // 유저 로그인 결과
    getUserLogin(state) {
      return state.userLogin;
    },
  },
  mutations: {
    // axios 통신결과 조회
    // 유저 로그인 결과 저장
    SET_USER_LOGIN(state, userLogin) {
      state.userLogin = userLogin;
    },
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
  },
};

export default loginStore;
