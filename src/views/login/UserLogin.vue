<template>
  <div class="loginBody">
    <div class="loginForm">
      <div class="loginText">Login</div>

      <b-form-input
        class="loginInput"
        type="text"
        v-model="userId"
        placeholder="아이디"
        value=""
      ></b-form-input>
      <b-form-input
        class="loginInput"
        type="password"
        v-model="userPassword"
        placeholder="비밀번호"
        value=""
      ></b-form-input>
      <b-button variant="primary" class="loginInput" @click="userLogin()">
        로그인
      </b-button>
      <!-- <b-button variant="primary" class="loginInput"> 회원가입 </b-button> -->
      <router-link style="float: left" class="linkFont" to="/productSel">
        비회원으로 사용하기</router-link
      >
      <!-- <router-link style="float: right" class="linkFont" to="/inspectUp">
        비밀번호를 잊어버리셨나요?</router-link
      > -->
    </div>
    <!-- 통신 완료 모달 -->
    <div>
      <confirm-modal @close="closeModal" v-if="modal">
        <div v-if="modalName === '200'">
          <p>{{ this.modalMessage }}</p>
        </div>
        <div v-else-if="modalName === '401'">
          <p>아아디 또는 비밀번호가 일치하지 않습니다.</p>
        </div>
        <div v-else-if="modalName === '403'">
          <p>권한이 없습니다.</p>
        </div>
        <div v-else>
          <p>오류가 발생했습니다. 다시 로그인 해주시기 바랍니다.</p>
        </div>
        <template slot="footer">
          <b-button variant="primary" @click="modalText">확인</b-button>
        </template>
      </confirm-modal>
    </div>
  </div>
</template>

<script>
import confirmModal from "../../components/modal/ConfirmModal.vue";

export default {
  data() {
    return {
      userId: "",
      userPassword: "",
      modal: false,
      modalName: "",
      spinnerState: false,
      modalMessage: "",
    };
  },
  mounted() {
    this.chkLogin();
  },
  components: {
    confirmModal,
  },
  methods: {
    chkLogin() {
      if (
        this.$store.getters["loginStore/getUserLogin"].status === 200 &&
        this.$store.getters["loginStore/getUserLogin"].data.body.result ===
          "success"
      ) {
        this.roturInit();
      }
    },
    userLogin() {
      this.openSpinner();

      this.$store
        .dispatch("loginStore/USER_LOGIN", {
          userId: this.userId,
          userPassword: this.userPassword,
        })
        .then((response) => {

          // 통신 성공 시
          if (response.status === 200) {
            // 로그인 실패
            if (response.data.body.result === "fail") {
              this.modalName = "200";
              this.modalMessage = response.data.body.massage;
              this.openModal();
            } 
            // 로그인 성공 시
            else {
              this.$store.dispatch("makerStore/SELECT_MAKER", {
                makerName: "",
                makerAddress: "",
                makerPerson: "",
                makerPhone: "",
                className: [],
                newProduct : "product"
              })

              this.roturInit();
            }
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
    modalText() {
      this.closeSpinner();
      this.modal = false;
    },
  },
  computed: {
    
  },
  watch: {
  
  },
};
</script>

<style scoped>
.loginBody {
  width: 100vw;
  height: 100vh;
  background-color: #4b89dc;
}
.loginText {
  font-size: 40px;
  padding-bottom: 10px;
}
.loginForm {
  width: 400px;
  height: 350px;
  font-size: 12px;
  border: 0;
  background-color: #e2e2e2;
  padding: 20px;
  margin: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.loginInput {
  width: 100%;
  margin-bottom: 15px;
  border: none;
  border-radius: 5px;
}
.linkFont {
  font-size: 14px;
  color: gray;
  margin: 0 auto;
}
</style>
