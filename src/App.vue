<template>
  <div id="app">
    <sidebar-menu v-if="$route.name !== 'userLogin'"></sidebar-menu>
    <div>
      <b-button
        v-if="logoutFlag"
        variant="primary"
        class="rightBoxPosition"
        @click="login"
      >
        로그인
      </b-button>
      <b-button
        v-else
        variant="primary"
        class="rightBoxPosition"
        @click="logout"
      >
        로그아웃
      </b-button>
      <!-- <b-button
        variant="primary"
        class="rightBoxPosition"
        @click="logout"
      >
        확정 로그아웃
      </b-button> -->
    </div>
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
    };
  },
  created() {
    // document.addEventListener("beforeunload", this.leaving());
  },
  methods: {
    // 화면 닫으면 자동 로그아웃
    // leaving() {
    //   this.$store.commit("loginStore/SET_USER_LOGIN", []);
    //   this.$router.push("/userLogin");
    //   this.logoutFlag = true;
    // },
    login() {
      this.$router.push("/userLogin");
    },

    logout() {
      this.$store.commit("loginStore/SET_USER_LOGIN", []);
      this.$router.push("/userLogin");
      this.logoutFlag = true;
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
      // 로그인 되어 있을 경우 로그아웃 버튼 활성화
      console.log("로그인 여부 확인");
      console.log(this.$store.getters["loginStore/getUserLogin"].status);
      if (
        this.$store.getters["loginStore/getUserLogin"].status === 200 &&
        this.$store.getters["loginStore/getUserLogin"].data.body.result ===
          "success"
      ) {
        this.logoutFlag = false;
      }
      // 로그인 되어 있지 않을 경우 로그아웃 버튼 비활성화
      else {
        this.logoutFlag = true;
      }
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
  width: calc(100% - 75px);
  height: 100%;

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
  margin-top: 5px;
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
  right: 0.7%;
  margin: 10px;
  width: 90px;
  z-index: 10;
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
