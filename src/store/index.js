import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import claimStore from "./modules/claimStore";
import inspectStore from "./modules/inspectStore";
import loginStore from "./modules/loginStore";
import productStore from "./modules/productStore";
import makerStore from "./modules/makerStore";
import salesStore from "./modules/salesStore";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    loginStore,
    productStore,
    claimStore,
    inspectStore,
    makerStore,
    salesStore,
  },
  //vuex plugin 명시
  plugins: [
    createPersistedState({
      // paths: ["loginStore"],
      // // 세션에 저장하여 window tab close 시 로그아웃 처리됨
      // storage: window.sessionStorage,
      // // reducer: () => ({
      // //   userLogin: this.$store.getters["loginStore/getUserLogin"],
      // // }),
    }),
  ],
  state: {
    // vuex를 통한 데이터 저장
    getProduct: {},
    getInspect: [],
    getMaker: [],
    getMakerAudit: [],
    getClaim: [],
    getSales: [],
    getSalesProduct: [],
  },
  getters: {
    // 상품 라우터 이동간에 사용된 데이터
    getSkuProduct(state) {
      return state.getProduct;
    },
    // 검수 라우터 이동간에 사용된 데이터
    getInspect(state) {
      return state.getInspect;
    },
    // 제조사 라우터 이동간에 사용된 데이터
    getMaker(state) {
      return state.getMaker;
    },
    // 제조사 점검 라우터 이동간에 사용된 데이터
    getMakerAudit(state) {
      return state.getMakerAudit;
    },
    // 제조사 라우터 이동간에 사용된 데이터
    getClaim(state) {
      return state.getClaim;
    },
    // 판매량 라우터 이동간에 사용된 데이터
    getSales(state) {
      return state.getSales;
    },
    // 판매구성품 라우터 이동간에 사용된 데이터
    getSalesProduct(state) {
      return state.getSalesProduct;
    },
  },
  mutations: {
    // vuex를 통한 데이터 이동(상품 상세 조회 시 사용)
    SET_PRODUCT(state, getProduct) {
      state.getProduct = getProduct;
    },
    // vuex를 통한 데이터 이동(검수 상세 조회 시 사용)
    SET_INSPECT(state, getInspect) {
      state.getInspect = getInspect;
    },
    // vuex를 통한 데이터 이동(제조사 상세 조회 시 사용)
    SET_MAKER(state, getMaker) {
      state.getMaker = getMaker;
    },
    // vuex를 통한 데이터 이동(제조사 점검 상세 조회 시 사용)
    SET_MAKER_AUDIT(state, getMakerAudit) {
      state.getMakerAudit = getMakerAudit;
    },
    // vuex를 통한 데이터 이동(제조사 상세 조회 시 사용)
    SET_CLAIM(state, getClaim) {
      state.getClaim = getClaim;
    },
    // vuex를 통한 데이터 이동(제조사 상세 조회 시 사용)
    SET_SALES(state, getSales) {
      state.getSales = getSales;
    },
    // vuex를 통한 데이터 이동(제조사 상세 조회 시 사용)
    SET_SALES_PRODUCT(state, getSalesProduct) {
      state.getSalesProduct = getSalesProduct;
    },
  },
});
