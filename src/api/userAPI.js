import axios from "axios";
import VueCookies from 'vue-cookies'
// import store from '../store/modules/loginStore'
// import Vue from 'vue';

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

  // console.log(data);

  return axios.post(authUrl + "logout", data, {
    header: { "Content-Type": `application/json` },
  });
}

export async function refreshTokenRe(){
  var accessToken = VueCookies.get("accessToken")
  var refreshToken = VueCookies.get("refreshToken")
  let data = {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };

  console.log(data);
  
  try{
    const token = await axios.post(authUrl + "reissue", data);
    // console.log(token);

    if(VueCookies.isKey("accessToken")){
      VueCookies.remove("accessToken");
    }
    if(VueCookies.isKey("refreshToken")){
      VueCookies.remove("refreshToken");
    }
    if(VueCookies.isKey("tokenTime")){
      VueCookies.remove("tokenTime");
    }
    // if(VueCookies.isKey("ROLE")){
    //   VueCookies.remove("ROLE");
    // }

    console.log(token);

    // 쿠키 설정
    VueCookies.set("accessToken", token.data.body.data.accessToken, '30m')
    VueCookies.set("refreshToken", token.data.body.data.refreshToken, "7d")
    VueCookies.set("tokenTime", new Date(token.data.body.data.accessTokenExpiresIn).getTime(), "40m")
    // VueCookies.set("ROLE", token.data.body.data.role, '30m')

    console.log(VueCookies.get("accessToken"));
    console.log(VueCookies.get("refreshToken"));
    console.log(VueCookies.get("tokenTime"));
    // console.log(VueCookies.get("ROLE"));
      
    return token;
   
  }catch(err){
    console.log(err);
    return err;
  }
}

// Add a request interceptor
axios.interceptors.request.use(async function (config) {
  // Do something before request is sent
  config.headers.accessToken = VueCookies.get("accessToken")
  config.headers.refreshToken = VueCookies.get("refreshToken")

  // console.log(config);
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, async function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  console.log('에러일 경우', error.config);

  const errorAPI = error.config;
  
  if(error.response.data.status===401 && errorAPI.retry===undefined){
    errorAPI.retry = true;
    console.log('토큰이 이상한 오류일 경우');
    await refreshTokenRe();
    return await axios(errorAPI);
  }
  return Promise.reject(error);
});


export default axios;

export {
    userLogin,
    userLogout,
}
