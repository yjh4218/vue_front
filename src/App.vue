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
          <!-- <template>
            <span class="userNamePosition">
              <div>환영합니다.</div>
              <div>{{ userName }} 님.</div>
            </span>
          </template> -->

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

export default {
  name: "app",
  components: {
    SidebarMenu,
  },
  data() {
    return {
      logoutFlag: true,
      userName: "",
    };
  },

  created() {
    window.addEventListener("beforeunload", this.leaving);
  },
  beforeCreate() {
    let localVuex = localStorage.getItem("vuex"); // local storage에 vuex 저장여부 확인
    if (localVuex) {
      // 저장되어 있는 경우 session storage로 이동 후 local 제거
      localVuex = JSON.parse(localVuex);
      console.log(localVuex);
      this.$store.commit(
        "loginStore/SET_USER_LOGIN",
        localVuex.loginStore.userLogin
      );
      localStorage.removeItem("vuex");
    }
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

      let checkUser = this.$store.getters["loginStore/getUserLogin"];
      console.log(checkUser.data.body.data);
      console.log(checkUser.data.body.data.accessToken);
      console.log(checkUser.data.body.data.refreshToken);
      
      this.$store
        .dispatch("loginStore/USER_LOGOUT", {
          accessToken: checkUser.data.body.data.accessToken,
          refreshToken: checkUser.data.body.data.refreshToken,
        })
        .then((response) => {
          console.log(response);
          // 통신 성공 시
          if (response.status === 200) {
            // 로그인 실패
            // if (response.data.body.result === "fail") {
            //   this.modalName = "200";
            //   this.modalMessage = response.data.body.massage;
            //   this.openModal();
            // }
            // // 로그인 성공 시
            // else {
            //   this.$store.dispatch("makerStore/SELECT_MAKER", {
            //     makerName: "",
            //     makerAddress: "",
            //     makerPerson: "",
            //     makerPhone: "",
            //     className: [],
            //     newProduct: "product",
            //   });

            //   this.roturInit();
            // }
          }
          // 통신 실패 시 진행
          else if (response.status === 401) {
            this.modalName = "401";
            this.openModal();
          } else {
            this.modalName = "500";
            this.openModal();
          }
        })
        .catch((error) => {
          console.log(error);
        });
      this.$store.commit("loginStore/SET_USER_LOGIN", []);
      this.$router.push("/userLogin");
      this.logoutFlag = true;
      localStorage.removeItem("vuex");
    },
    leaving() {
      // this.logout();
      sessionStorage.removeItem("vuex");
    },
    // 로그인 여부 확인
    chkLoginFun() {
      // 로그인 되어 있을 경우 로그아웃 버튼 활성화
      // console.log("로그인 여부 확인 진행");
      // console.log(this.$store.getters["loginStore/getUserLogin"]);
      if (
        this.$store.getters["loginStore/getUserLogin"].status === 200 &&
        this.$store.getters["loginStore/getUserLogin"].data.body.result ===
          "success"
      ) {
        this.logoutFlag = false;
        this.userName =
          this.$store.getters["loginStore/getUserLogin"].data.body.data.email;
        this.newTab();
      }
      // 로그인 되어 있지 않을 경우 로그아웃 버튼 비활성화
      else {
        this.logout();
      }
    },
    // 데이터 저장 후 새로운 탭을 열게 되면 localStorage에 전달.
    newTab() {
      // console.log("localStorage 저장");
      localStorage.setItem("vuex", sessionStorage.getItem("vuex")); // vuex session to local
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
      // this.$router.go();
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
