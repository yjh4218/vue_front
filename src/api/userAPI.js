import axios from "axios";

// 1. Http Request & Response와 관련된 기본 설정
const authUrl = "/auth/";


// 유저 로그인
function userLogin(user) {
  let data = {
    email: user.userId,
    password: user.userPassword,
  };

  return axios.post(authUrl + "login", data, {
    header: { "Content-Type": `application/json` },
  });
}

// 유저 로그아웃
function userLogout(user) {

  let data = {
    accessToken: user.accessToken,
    refreshToken: user.refreshToken,
  };

  console.log(data);

  return axios.post(authUrl + "logout", data, {
    header: { "Content-Type": `application/json` },
  });
}


export {
    userLogin,
    userLogout
}
