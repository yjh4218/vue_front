import Vue from "vue";
import VueRouter from 'vue-router';
import mainpage from '../views/MainPage.vue';
import IncomeSelView from '../views/income/IncomeSelView.vue';
import incomedelview from '../views/income/IncomeDelView.vue';
import incomeupview from '../views/income/IncomeUpView.vue';
import incomeinview from '../views/income/IncomeInView.vue';
import productSelView from '../views/product/ProductSelView.vue';
import productDelView from '../views/product/ProductDelView.vue';
import productUpView from '../views/product/ProductUpView.vue';
import productInView from '../views/product/ProductInView.vue';
import sellSelView from '../views/sell/SellSelView.vue';
import sellDelView from '../views/sell/SellDelView.vue';
import sellInView from '../views/sell/SellInView.vue';
import sellUpView from '../views/sell/SellUpView.vue';
import makerSelView from '../views/maker/MakerSelView.vue';
import makerDelView from '../views/maker/MakerDelView.vue';
import makerUpView from '../views/maker/MakerUpView.vue';
import makerInView from '../views/maker/MakerInView.vue';
import claimSelView from '../views/claim/ClaimSelView.vue';
import claimDelView from '../views/claim/ClaimDelView.vue';
import claimInView from '../views/claim/ClaimInView.vue';
import claimUpView from '../views/claim/ClaimUpView.vue';

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
    {
      // 제품 조회
      path: "/productSel",
      name: "selectAllProduct",
      component: productSelView,
    },
    {
      // 제품 삭제
      path: "/productDel",
      component: productDelView,
    },
    {
      // 제품 업데이트
      path: "/productUp",
      component: productUpView,
    },
    {
      // 제품 추가
      path: "/productIn",
      component: productInView,
    },
    {
      // 판매량 조회
      path: "/sellSel",
      component: sellSelView,
    },
    {
      // 판매량 삭제
      path: "/sellDel",
      component: sellDelView,
    },
    {
      // 판매량 업데이트
      path: "/sellUp",
      component: sellUpView,
    },
    {
      // 판매량 추가
      path: "/sellIn",
      component: sellInView,
    },    
    {
      // 제조사 조회
      path: "/makerSel",
      component: makerSelView,
    },
    {
      // 제조사 삭제
      path: "/makerDel",
      component: makerDelView,
    },
    {
      // 제조사 업데이트
      path: "/makerUp",
      component: makerUpView,
    },
    {
      // 제조사 추가
      path: "/makerIn",
      component: makerInView,
    },    
    {
      // 클레임 조회
      path: "/claimSel",
      component: claimSelView,
    },   
    {
      // 클레임 삭제
      path: "/claimDel",
      component: claimDelView,
    },   
    {
      // 클레임 업데이트
      path: "/claimUp",
      component: claimUpView,
    },   
    {
      // 클레임 추가
      path: "/claimIn",
      component: claimInView,
    },
  ],
});