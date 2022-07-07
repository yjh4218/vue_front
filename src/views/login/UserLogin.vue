<template>
  <div class="loginBody">
    <div class="loginForm">
      <div class="loginText">
        Login
      </div>
       
      <b-form-input class="loginInput"
            type="text"
            v-model="userId"
            placeholder="아이디"
            value=""
      ></b-form-input>
      <b-form-input class="loginInput"
            type="password"
            v-model="userPassword"
            placeholder="비밀번호"
            value=""
      ></b-form-input>
      <b-button  variant="primary" class="loginInput" @click="userLogin()"> 로그인 </b-button>
      <b-button  variant="primary" class="loginInput"> 회원가입 </b-button>
      <router-link style="float:left" class="linkFont" to="/inspectUp"> 비회원으로 사용하기</router-link>
      <router-link style="float:right" class="linkFont" to="/inspectUp"> 비밀번호를 잊어버리셨나요?</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId:"",
      userPassword:""
    }
  },
  methods:{
    userLogin(){
       this.$store.dispatch("USER_LOGIN", {
          userId : this.userId,
          userPassword : this.userPassword
        });
    }
  }
}
</script>

<style scoped>
.loginBody{
  width: 100vw;
  height: 100vh;
  background-color: 	#4B89DC;
}
.loginText{
  font-size: 40px;
  padding-bottom: 10px;
}
.loginForm{
  width:400px;
  height: 350px;
  font-size: 12px;
  border: 0;
  background-color: #E2E2E2;
  padding: 20px;
  margin: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.loginInput{
  width: 100%;
  margin-bottom: 15px;
  border: none;
  border-radius: 5px;
}
.linkFont{
  font-size: 14px;
  color: gray;
  margin: 0 auto;
  
}

</style>