import Vue from "vue";
import VueRouter from 'vue-router';
import mainpage from '../views/MainPage.vue';
import IncomeSelView from '../views/IncomeSelView.vue';
import incomedelview from '../views/IncomeDelView.vue';
import incomeupview from '../views/IncomeUpView.vue';
import incomeinview from '../views/IncomeInView.vue';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/main",
    },
    {
      // 입고검사 조회
      path: "/main",
      //component : url 주소를 갔을 때 표시될 컴포넌트
      component: mainpage,
    },
    {
      // 입고검사 조회
      path: "/incomingSel",
      component: IncomeSelView,
    },
    {
      // 입고검사 추가
      path: "/incomingIn",
      component: incomeinview,
    },
    {
      // 입고검사 삭제
      path: "/incomingDel",
      component: incomedelview,
    },
    {
      // 입고검사 업데이트
      path: "/incomingUp",
      component: incomeupview,
    },
  ],
});