<template>
  <div id="app">
    <template v-if="$route.name !== 'userLogin'">
      <sidebar-menu></sidebar-menu>
      <div>
        <template v-if="logoutFlag">
          
          <b-button variant="primary" class="rightBoxPosition" @click="login">
            로그인
          </b-button>
        </template>
        <template v-else>
          <b-button variant="primary" class="timerBoxPosition" @click="refreshTokenReCheck">
            {{ countMin }}:{{ countSec }} 연장
          </b-button>
          <b-button variant="primary" class="rightBoxPosition" @click="logout">
            로그아웃
          </b-button>
        </template>
      </div>
    </template>

    <transition name="page">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import SidebarMenu from "./components/menu/SidebarMenu.vue";
// import VueCookies from 'vue-cookies'
import { refreshTokenRe } from './api/userAPI'

export default {
  name: "app",
  components: {
    SidebarMenu,
  },
  data() {
    return {
      logoutFlag: true,
      userName: "",
      countMin : 0,
      countSec: 0,
      countFlag : '',
    };
  },
  mounted() {
    this.chkLoginFun();
  },
  methods: {
    login() {
      this.$router.push("/userLogin");
    },
    logout() {
      this.openSpinner();

      // let checkUser = this.$store.getters["loginStore/getUserLogin"];
      
      this.$store
        .dispatch("loginStore/USER_LOGOUT", {
          accessToken: this.$cookies.get("accessToken"),
          refreshToken: this.$cookies.get("refreshToken"),
        })
        .then((response) => {
          console.log(response.data.body.massage);
          // 통신 성공 
        })
        .catch((error) => {
          console.log(error);
        });
        
        // 쿠키 삭제
        if(this.$cookies.isKey("accessToken")){
          this.$cookies.remove("accessToken");
        }
        if(this.$cookies.isKey("refreshToken")){
          this.$cookies.remove("refreshToken");
        }
        if(this.$cookies.isKey("tokenTime")){
          this.$cookies.remove("tokenTime");
        }
        if(this.$cookies.isKey("ROLE")){
          this.$cookies.remove("ROLE");
        }
      this.$store.commit("loginStore/SET_USER_LOGIN", []);
      this.$router.push("/userLogin");
      this.logoutFlag = true;
    },
    // 로그인 여부 확인
    chkLoginFun() {
      // 로그인 되어 있을 경우 로그아웃 버튼 활성화
      console.log("로그인 여부 확인 진행");

      // 쿠키 존재하면 삭제
      if(this.$cookies.isKey("accessToken")){
        this.$cookies.remove("accessToken");
      }
      if(this.$cookies.isKey("refreshToken")){
        this.$cookies.remove("refreshToken");
      }
      if(this.$cookies.isKey("tokenTime")){
        this.$cookies.remove("tokenTime");
      }
      if(this.$cookies.isKey("ROLE")){
        this.$cookies.remove("ROLE");
      }

      console.log(this.$store.getters["loginStore/getUserLogin"]);
      if(this.$store.getters["loginStore/getUserLogin"].status !== undefined){
        // 쿠키 설정
        this.$cookies.set("accessToken", this.$store.getters["loginStore/getUserLogin"].data.body.data.accessToken, '30m')
        this.$cookies.set("refreshToken", this.$store.getters["loginStore/getUserLogin"].data.body.data.refreshToken, "7d")
        this.$cookies.set("tokenTime", new Date(this.$store.getters["loginStore/getUserLogin"].data.body.data.accessTokenExpiresIn).getTime(), "40m")
        this.$cookies.set("ROLE", this.$store.getters["loginStore/getUserLogin"].data.body.data.role, "7d")

        // 쿠키 생성 완료되면 타이머 실행
        if(this.$cookies.isKey("accessToken") !== null){
          this.logoutFlag = false;
          this.setTimeCount()
        }
      }
      
      console.log(this.$cookies.get("tokenTime"));
      console.log(this.$cookies.get("ROLE"));
      
    },

    // 로그인 타이머 설정
    setTimeCount(){
      console.log("로그인 타이머 설정");
      console.log(this.$cookies.get("tokenTime"));
      var nowDate = new Date();
      var tmpCount = (this.$cookies.get("tokenTime") - nowDate.getTime())/1000/60
      
      // 로그인 시간 설정
      this.countMin = tmpCount.toFixed()
      this.countSec = 0
      
      // console.log(this.countMin + ", " + this.countSec);
      if(this.countMin > 0) {
        this.countDownTimer()
      }
    },
    // 로그인 유지 가능 시간
    countDownTimer () {
      clearInterval(this.countFlag);
      if (this.countMin >= 0 && this.countSec >= 0){
        if(this.countMin > 0 && this.countSec === 0){
          this.countMin -= 1
          this.countSec = 60
        }
        this.countSec -= 1
        this.countFlag = setInterval(this.countDownTimer, 1000)
      } else {
        if(this.logoutFlag === false){
          alert("로그인 화면으로 이동합니다.")
          this.logout()
        }
      }
    },
    // 로그인 시간 연장 처리
      async refreshTokenReCheck(){
      clearInterval(this.countFlag);
      this.countFlag = null;
      await refreshTokenRe();
      this.setTimeCount()
    },
    // 모달 열기
    openModal() {
      this.closeSpinner();
      this.modal = true;
    },
    // 모달 닫기
    closeModal() {
      this.modal = false;
    },
    // 로그인이 되었을 경우
    roturInit() {
      this.closeSpinner();
      this.$router.push("/productSel");
    },
    // 스피너 열기
    openSpinner() {
      this.spinnerState = true;
    },
    // 스피너 닫기
    closeSpinner() {
      this.spinnerState = false;
    },
  },
  computed: {
    // 로그인 여부 확인
    chkLogin() {
      return this.$store.getters["loginStore/getUserLogin"].status;
    },
  },
  watch: {
    // 로그인 여부 확인
    chkLogin() {
      this.chkLoginFun();
    },
  },
};
</script>
<style>
.body {
  position: fixed;
  margin-top: 20px;
  margin-left: 70px;
  margin-right: 250px;
  z-index: -1;
  width: calc(100% - 85px);
  height: 100%;
  padding-right: 10px;
  overflow: auto;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.divInsert {
  height: 80%;
}
.spanSel {
  font-family: "Nanum Gothic", sans-serif;
}
.btnSel {
  margin-left: 4px;
  background: skyblue;
}
.title {
  padding-bottom: 10px;
  font-size: 20px;
  width: 80%;
}
table {
  width: 100%;
  border: 2px solid black;
  text-align: center;
}
td,
th {
  border: 1px solid black;
  padding: 5px;
  border-collapse: collapse;
  background-clip: padding-box;
}
tr:hover {
  background-color: coral;
}
/* router transition */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
/* .tableCss {
  text-align: center;
  width: 100%; */
/* overflow-y: scroll;
  height: 52vh;
} */
.input-group-text {
  height: 100%;
}
.chkBoxGroup {
  display: inherit;
  text-align: center;
  margin: 8px;
}
.rightBoxPosition {
  position: absolute;
  right: 25px;
  margin-top: 10px;
  width: 100px;
  z-index: 10;
}
.timerBoxPosition {
  position: absolute;
  right: 135px;
  margin-top: 10px;
  width: 105px;
  z-index: 10;
}
.userNamePosition {
  /* position: absolute; */
  right: 100px;
  margin-top: 10px;
  width: 500px;
  z-index: 10;
  float: right;
}
.xBox {
  right: 0px;
  position: absolute;
  z-index: 10;
}
.imgSizes {
  width: 100px;
  height: 100px;
  margin-right: 10px;
  position: relative;
}
.imgSizes img {
  width: 100px;
  height: 100px;
  margin-left: 10px;
  position: relative;
}
.right-box {
  float: right;
  width: auto;
  margin-bottom: 10px;
}
.selectTableCss {
  overflow: auto;
}
.tableNav {
  margin-top: 20px;
}

table.b-table thead th.w2 {
  width: 2%;
}
table.b-table thead th.w5 {
  width: 5%;
}
table.b-table thead th.w10 {
  width: 10%;
}
table.b-table thead th.w20 {
  width: 20%;
}
table.b-table thead th.w30 {
  width: 30%;
}
table.b-table thead th.w40 {
  width: 40%;
}
table.b-table thead th.w50 {
  width: 50%;
}
table.b-table thead th.w60 {
  width: 60%;
}
table.b-table thead th.w70 {
  width: 70%;
}
table.b-table thead th.w80 {
  width: 80%;
}
table.b-table thead th.w90 {
  width: 90%;
}
table.b-table thead th.w15 {
  width: 15%;
}
table.b-table thead th.w25 {
  width: 25%;
}
table.b-table thead th.w35 {
  width: 35%;
}
table.b-table thead th.w45 {
  width: 45%;
}
table.b-table thead th.w55 {
  width: 55%;
}
table.b-table thead th.w65 {
  width: 65%;
}
table.b-table thead th.w75 {
  width: 75%;
}
table.b-table thead th.w85 {
  width: 85%;
}
table.b-table thead th.w95 {
  width: 95%;
}
</style>
