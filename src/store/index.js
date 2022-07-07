import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// import axios from "axios";

import {
  userLogin,
  insertProduct,
  selectProduct,
  checkSkuNo,
  updateProduct,
  deleteProduct,
  insertInspect,
  updateInspect,
  deleteInspect,
  selectAllInspect,
  selectInspect,
  insertMaker,
  updateMaker,
  deleteMaker,
  selectMaker
} from "../api/index.js";

export const store = new Vuex.Store({
  state: {
    // axios 통신
    // 유저 로그인
    userLogin:[],


    // 제품 조회
    selectProduct: {},
    // 제품 추가
    insertProduct: {},
    // 제품 수정
    updateProduct: {},
    // 중복 조회 결과값
    checkProductDup: {},
    // 제품 삭제 결과값
    deleteProduct: {},

    // 검수 추가하기
    insertInspect: {},
    // 전체 검수 조회
    selectInspect: [],
    // 검수 수정하기
    updateInspect: {},
    // 검수 삭제하기
    deleteInspect:{},
    
     // 제조사 추가하기
    insertMaker: {},
    // 전체 제조사 조회
    selectMaker: [],
    // 제조사 수정하기
    updateMaker: {},
    // 제조사 삭제하기
    deleteMaker:{},

    // vuex를 통한 데이터 저장
    getProduct: {},
    getInspect: [],
    getMaker : [],
  },
  getters: {
    // 유저 로그인 결과
    getUserLogin(state) {
      return state.userLogin;
    },

    // 조회된 상품 
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
    getSelectInspect(state) {
      return state.selectInspect;
    },
    // 검수 수정 데이터 확인
    getUpdateInspect(state) {
      return state.updateInspect;
    },
    // 검수 삭제 데이터 확인
    getDeleteInspect(state) {
      return state.deleteInspect;
    },


    // 제조사 입력 데이터 확인
    getInsertMaker(state) {
      return state.insertMaker;
    },
    // 제조사 제품 전체 조회
    getSelectMaker(state) {
      return state.selectMaker;
    },
    // 제조사 수정 데이터 확인
    getUpdateMaker(state) {
      console.log("get 업데이트");
      return state.updateMaker;
    },
    // 제조사 삭제 데이터 확인
    getDeleteMaker(state) {
      return state.deleteMaker;
    },


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
  },
  mutations: {
    // axios 통신결과 조회
    // 유저 로그인 결과 저장
    SET_USER_LOGIN(state, userLogin) {
      state.userLogin = userLogin;
    },

    // 일부 제품 조회 결과 저장
    SET_SELECT_PRODUCT(state, selectProduct) {
      state.selectProduct = selectProduct;
    },
    // 상품 추가 저장
    SET_INSERT_PRODUCT(state, insertProduct) {
      state.insertProduct = insertProduct;
    },
    // 상품 정보 수정 저장
    SET_UPDATE_PRODUCT(state, updateProduct) {
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
    SET_SELECT_INSPECT(state, selectInspect) {
      state.selectInspect = selectInspect;
    },
    // 검수 제품 업데이트
    SET_UPDATE_INSPECT(state, updateInspect) {
      state.updateInspect = updateInspect;
    },
    //검수 제품 삭제
    SET_DELETE_INSPECT(state, deleteInspect) {
      state.deleteInspect = deleteInspect;
    },

    // 제조사 추가하기
    SET_INSERT_MAKER(state, insertMaker) {
      state.insertMaker = insertMaker;
    },
    // 제조사 전체 제품 조회
    SET_SELECT_MAKER(state, selectMaker) {
      state.selectMaker = selectMaker;
    },
    // 제조사 제품 업데이트
    SET_UPDATE_MAKER(state, updateMaker) {
      console.log("set 업데이트");
      state.updateMaker = updateMaker;
    },
    //제조사 제품 삭제
    SET_DELETE_MAKER(state, deleteMaker) {
      state.deleteMaker = deleteMaker;
    },

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
  },

  actions: {
    // 유저 로그인
    USER_LOGIN(context, user) {
      console.log("INSERT_PRODUCT actions 접속됨");
      console.log(context);

      userLogin(user)
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

    // 일부 제품 조회
    SELECT_PRODUCT(context, selectCon) {
      console.log("SELECT_PRODUCT actions 접속됨");
      console.log(selectCon);

      selectProduct(selectCon)
        .then((response) => {
          console.log("response");
          console.log(response);
          context.commit("SET_SELECT_PRODUCT", response.data.data);
        })
        .catch((error) => {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
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

    // 검수 수정 추가
    UPDATE_INSPECT(context, selectCon) {
      console.log("UPDATE_INSPECT actions 접속됨");
      console.log(context);

      updateInspect(selectCon)
        .then((response) => {
          console.log("response");
          console.log(response);
          context.commit("SET_UPDATE_INSPECT", response.data.data);
        })
        .catch((error) => {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        });
    },

    // 검수 삭제
    DELETE_INSPECT(context, selectCon) {
      console.log("DELETE_INSPECT actions 접속됨");
      console.log(selectCon);

      deleteInspect(selectCon)
        .then((response) => {
          console.log("response");
          console.log(response);
          console.log(response.data.data);
          context.commit("SET_DELETE_INSPECT", response.data.data);
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

    // 모든 검수 조회
    SELECT_ALL_INSPECT(context) {
      console.log("SELECT_ALL_INSPECT actions 접속됨");
      console.log(context);
      selectAllInspect(context)
        .then((response) => {
          console.log(response);
          console.log(response.data);
          console.log(response.data.data);
          context.commit("SET_SELECT_INSPECT", response.data.data);
        })
        .catch((error) => {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        });
    },
    // 일부 검수 조회
    SELECT_INSPECT(context, selectCon) {
      console.log("SELECT_INSPECT actions 접속됨");
      console.log(selectCon);

      selectInspect(selectCon)
        .then((response) => {
          console.log("response");
          console.log(response);
          context.commit("SET_SELECT_INSPECT", response.data.data);
        })
        .catch((error) => {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        });
    },
    
    // 신규 제조사 추가
    INSERT_MAKER(context, selectCon) {
      console.log("INSERT_MAKER actions 접속됨");
      console.log(context);

      insertMaker(selectCon)
        .then((response) => {
          console.log("response");
          console.log(response);
          context.commit("SET_INSERT_MAKER", response.data.data);
        })
        .catch((error) => {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        });
    },

    // 제조사 수정
    UPDATE_MAKER(context, selectCon) {
      console.log("UPDATE_MAKER actions 접속됨");
      console.log(context);

      updateMaker(selectCon)
        .then((response) => {
          console.log("response");
          console.log(response);
          context.commit("SET_UPDATE_MAKER", response.data.data);
        })
        .catch((error) => {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        });
    },

    // 제조사 삭제
    DELETE_MAKER(context, selectCon) {
      console.log("DELETE_MAKER actions 접속됨");
      console.log(selectCon);

      deleteMaker(selectCon)
        .then((response) => {
          console.log("response");
          console.log(response);
          console.log(response.data.data);
          context.commit("SET_DELETE_MAKER", response.data.data);
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

    // 일부 제조사 조회
    SELECT_MAKER(context, selectCon) {
      console.log("SELECT_MAKER actions 접속됨");
      console.log(selectCon);

      selectMaker(selectCon)
        .then((response) => {
          console.log("response");
          console.log(response);
          context.commit("SET_SELECT_MAKER", response.data.data);
        })
        .catch((error) => {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        });
    },
  },
});
