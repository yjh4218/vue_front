import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// import axios from "axios";

import {
  insertProduct,
  selectAllProduct,
  selectProduct,
  selectSkuNo,
  checkSkuNo,
  updateProduct,
  deleteProduct,
  insertInspect,
  selectAllInspect
} from "../api/index.js";

export const store = new Vuex.Store({
  state: {
    // axios 통신
    // 전체 제품 조회, 일부 제품 조회
    allProducts: [],
    // 1개 제품 조회
    selectProduct: {},
    // 제품 추가
    insertProduct: {},
    // 제품 수정
    updateProduct: {},
    // 중복 조회 결과값
    checkProductDup: {},
    // 제품 삭제 결과값
    deleteProduct:{},
    // 검수 추가하기
    insertInspect: {},
    // 전체 검수 조회
    allInspect:[],
    
    // vuex를 통한 데이터 저장
    getProduct: {},
  },
  getters: {
    // 전체 제품 조회
    getAllProduct(state) {
      return state.allProducts;
    },
    // 1개 조회된 데이터
    getSelectProduct(state) {
      return state.selectProduct;
    },
    // 상품 추가한 내용
    getInsertProduct(state) {
      return state.insertProduct;
    },
    // sku 중복 확인 결과값
    getCheckProductDup(state) {
      return state.checkProductDup;
    },
    // 제품 업데이트 상태값
    getUpdateProduct(state) {
      return state.updateProduct;
    },
    // 제품 삭제한 상태값
    getDeleteProduct(state) {
      return state.deleteProduct;
    },

    // 검수 입력 데이터 확인
    getInsertInspect(state) {
      return state.insertInspect;
    },
    // 검수 제품 전체 조회
    getAllInspect(state) {
      return state.allInspect;
    },

    // 상품 라우터 이동간에 사용된 데이터
    getSkuProduct(state) {
      return state.getProduct;
    },
  },
  mutations: {
    // axios 통신결과 조회
    // 전체 제품 조회 결과 저장
    SET_SELECT_ALL_PRODUCT(state, allProducts) {
      state.allProducts = allProducts;
    },
    // 일부 제품 조회 결과 저장
    SET_SELECT_PRODUCT(state, selectProduct) {
      state.selectProduct = selectProduct;
    },
    // 상품 추가 저장
    SET_INSERT_PRODUCT(state, insertProduct) {
      console.log("SET_INSERT_PRODUCT 들어옴");
      state.insertProduct = insertProduct;
    },
    // 상품 정보 수정 저장
    SET_UPDATE_PRODUCT(state, updateProduct) {
      console.log("SET_INSERT_PRODUCT 들어옴");
    state.updateProduct = updateProduct;
    },
    // 상품 중복 확인
    SET_CHECK_PRODUCT_RESULT(state, checkProductDup) {
      state.checkProductDup = checkProductDup;
    },
    // 상품 삭제 확인
    SET_DELETE_PRODUCT(state, deleteProduct) {
      state.deleteProduct = deleteProduct;
    },
    // 검수 추가하기
    SET_INSERT_INSPECT(state, insertInspect) {
      state.insertInspect = insertInspect;
    },
    // 검수 전체 제품 조회
    SET_SELECT_ALL_INSPECT(state, allInspect) {
      state.allInspect = allInspect;
    },

    // vuex를 통한 데이터 이동(상품 조회 시 사용)
    SET_PRODUCT(state, getProduct) {
      state.getProduct = getProduct;
    },
  },

  actions: {
    // 신규 제품 추가
    INSERT_PRODUCT(context, selectCon) {
      console.log("INSERT_PRODUCT actions 접속됨");
      console.log(context);

      insertProduct(selectCon)
        .then((response) => {
          console.log("response");
          console.log(response);
          context.commit("SET_INSERT_PRODUCT", response.data.data);
        })
        .catch((error) => {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        });
    },

    // 제품 수정하기
    UPDATE_PRODUCT(context, selectCon) {
      console.log("UPDATE_PRODUCT actions 접속됨");
      console.log(context);

      updateProduct(selectCon)
        .then((response) => {
          console.log("response");
          console.log(response);
          context.commit("SET_UPDATE_PRODUCT", response.data.data);
        })
        .catch((error) => {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        });
    },

    // 제품 삭제
    DELETE_PRODUCT(context, selectCon) {
      console.log("DELETE_PRODUCT actions 접속됨");
      console.log(selectCon);

      deleteProduct(selectCon)
        .then((response) => {
          console.log("response");
          console.log(response);
          console.log(response.data.data);
          context.commit("SET_DELETE_PRODUCT", response.data.data);
        })
        .catch((error) => {
          if (error.response) {
            // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // 요청이 이루어 졌으나 응답을 받지 못했습니다.
            // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
            // Node.js의 http.ClientRequest 인스턴스입니다.
            console.log(error.request);
          } else {
            // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    },

    // 모든 제품 조회
    SELECT_ALL_PRODUCT(context) {
      console.log("SELECT_ALL_PRODUCT actions 접속됨");
      console.log(context);
      selectAllProduct(context)
        .then((response) => {
          console.log(response);
          context.commit("SET_SELECT_ALL_PRODUCT", response.data.data);
        })
        .catch((error) => {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        });
    },

    // 일부 제품 조회
    SELECT_PRODUCT(context, selectCon) {
      console.log("SELECT_PRODUCT actions 접속됨");
      console.log(selectCon);

      selectProduct(selectCon)
        .then((response) => {
          console.log("response");
          console.log(response);
          context.commit("SET_SELECT_ALL_PRODUCT", response.data.data);
        })
        .catch((error) => {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        });
    },

    // SKU 1개 제품 조회
    SELECT_SKU(context, selectCon) {
      console.log("SELECT_SKU actions 접속됨");
      console.log(selectCon);

      selectSkuNo(selectCon)
        .then((response) => {
          console.log("response");
          console.log(response);
          console.log(response.data.data[0]);
          context.commit("SET_SELECT_PRODUCT", response.data.data);
        })
        .catch((error) => {
          if (error.response) {
            // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // 요청이 이루어 졌으나 응답을 받지 못했습니다.
            // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
            // Node.js의 http.ClientRequest 인스턴스입니다.
            console.log(error.request);
          } else {
            // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    },

    // SKU 중복 조회
    CHECK_SKU_DUP(context, selectCon) {
      console.log("CHECK_SKU_DUP actions 접속됨");
      console.log(selectCon);

      checkSkuNo(selectCon)
        .then((response) => {
          console.log("response");
          console.log(response);
          console.log(response.data.data);
          context.commit("SET_CHECK_PRODUCT_RESULT", response.data.data);
        })
        .catch((error) => {
          if (error.response) {
            // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // 요청이 이루어 졌으나 응답을 받지 못했습니다.
            // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
            // Node.js의 http.ClientRequest 인스턴스입니다.
            console.log(error.request);
          } else {
            // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    },

    // 신규 검수 추가
    INSERT_INSPECT(context, selectCon) {
      console.log("INSERT_INSPECT actions 접속됨");
      console.log(context);

      insertInspect(selectCon)
        .then((response) => {
          console.log("response");
          console.log(response);
          context.commit("SET_INSERT_INSPECT", response.data.data);
        })
        .catch((error) => {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        });
    },
    // 모든 제품 조회
    SELECT_ALL_INSPECT(context) {
      console.log("SELECT_ALL_INSPECT actions 접속됨");
      console.log(context);
      selectAllInspect(context)
        .then((response) => {
          console.log(response);
          context.commit("SET_SELECT_ALL_INSPECT", response.data.data);
        })
        .catch((error) => {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        });
    },


  },
});
