import Vue from "vue";
import VueRouter from "vue-router";
import mainpage from "../views/MainPage.vue";
import userLogin from '../views/login/UserLogin.vue';
import inspectSelView from "../views/inspect/InspectSelView.vue";
import inspectUpView from "../views/inspect/InspectUpView.vue";
import inspectInView from "../views/inspect/InspectInView.vue";
import productSelView from "../views/product/ProductSelView.vue";
import productUpView from "../views/product/ProductUpView.vue";
import productInView from "../views/product/ProductInView.vue";
import salesSelView from "../views/sales/SalesSelView.vue";
import salesInView from "../views/sales/SalesInView.vue";
import salesUpView from "../views/sales/SalesUpView.vue";
import salesProductInView from "../views/sales/SalesProductInView.vue";
import salesProductUpView from "../views/sales/SalesProductUpView.vue";
import salesProductSelView from "../views/sales/SalesProductSelView.vue";
import makerSelView from "../views/maker/MakerSelView.vue";
import makerUpView from "../views/maker/MakerUpView.vue";
import makerInView from "../views/maker/MakerInView.vue";
import claimSelView from "../views/claim/ClaimSelView.vue";
import claimInView from "../views/claim/ClaimInView.vue";
import claimUpView from "../views/claim/ClaimUpView.vue";

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/userLogin",
    },
    {
      // 로그인
      path: "/userLogin",
      //component : url 주소를 갔을 때 표시될 컴포넌트
      name: "userLogin",
      component: userLogin,
    },
    {
      // 메인페이지
      path: "/main",
      component : mainpage
    },
    {
      // 입고검사 조회
      path: "/inspectSel",
      name: "inspectSelView",
      component: inspectSelView,
    },
    {
      // 입고검사 추가
      path: "/inspectIn", 
      name: "inspectInView",
      component: inspectInView,
    },
    {
      // 입고검사 업데이트
      path: "/inspectUp/:id",
      name: "inspectUpView",
      component: inspectUpView,
    },
    {
      // 제품 조회
      path: "/productSel",
      name: "selectAllProduct",
      component: productSelView,
    },
    {
      // 제품 업데이트
      path: "/productUp/:skuNo",
      name: "productUpdate",
      component: productUpView,
    },
    {
      // 제품 추가
      path: "/productIn",
      name: "productInsert",
      component: productInView,
    },
    {
      // 판매량 조회
      path: "/salesSel",
      name : "salseSel",
      component: salesSelView,
    },
    {
      // 판매량 수정 및 삭제
      path: "/salesUp/",
      name : "salesUp",
      component: salesUpView,
    },
    {
      // 판매량 추가
      path: "/salesIn",
      name : "salesIn",
      component: salesInView,
    },
    {
      // 판매 제품 추가
      path: "/salesProductIn",
      name : "salesProductInView",
      component: salesProductInView,
    },
    {
      // 판매 제품 조회
      path: "/salesProductSel",
      name : "salesProductSelView",
      component: salesProductSelView,
    },
    {
      // 판매 제품 수정
      path: "/salesProductUp/:id",
      name : "salesProductUp",
      component: salesProductUpView,
    },
    {
      // 제조사 조회
      path: "/makerSel",
      name : "makerSelView",
      component: makerSelView,
    },
    {
      // 제조사 업데이트
      path: "/makerUp/:id",
      name : "makerUpView",
      component: makerUpView,
    },
    {
      // 제조사 추가
      path: "/makerIn",
      name : "makerInView",
      component: makerInView,
    },
    {
      // 클레임 조회
      path: "/claimSel",
      name : "claimSelView",
      component: claimSelView,
    },
    {
      // 클레임 업데이트
      path: "/claimUp/:id",
      name : "claimUpView",
      component: claimUpView,
    },
    {
      // 클레임 추가
      path: "/claimIn",
      name : "claimInView",
      component: claimInView,
    },
  ],
});
