import {
  insertProduct,
  selectProduct,
  selectPageProduct,
  checkSkuNo,
  updateProduct,
  deleteProduct,
  updateProductReply,
  deleteProductReply,
} from "../../api/productAPI";

const productStore = {
  namespaced: true,
  state: {
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
    // 리플 수정
    updateProductReply: {},
    // 리플 삭제 결과값
    deleteProductReply: {},
    // 제품 검색 내역 저장
    searchData: {},
  },
  getters: {
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
    // 리플 업데이트 상태값
    getUpdateProductReply(state) {
      return state.updateProductReply;
    },
    // 리플 삭제한 상태값
    getDeleteProductReply(state) {
      return state.deleteProductReply;
    },
    // 제품 검색 내역 저장
    getSearchData(state) {
      return state.searchData;
    },
  },
  mutations: {
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
    // 리플 정보 수정 저장
    SET_UPDATE_PRODUCT_REPLY(state, updateProductReply) {
      state.updateProductReply = updateProductReply;
    },
    // 리플 삭제 확인
    SET_DELETE_PRODUCT_REPLY(state, deleteProductReply) {
      state.deleteProductReply = deleteProductReply;
    },
    // 제품 검색 내역 저장
    SET_SEARCH_DATA(state, searchData) {
      state.searchData = searchData;
    },
  },
  actions: {
    // 신규 제품 추가
    INSERT_PRODUCT(context, selectCon) {
      return insertProduct(selectCon)
        .then((response) => {
          context.commit("SET_INSERT_PRODUCT", response.data.data);
          return response.data;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },

    // 제품 수정하기
    UPDATE_PRODUCT(context, selectCon) {
      return updateProduct(selectCon)
        .then((response) => {
          context.commit("SET_UPDATE_PRODUCT", response.data.data);
          return response.data;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },

    // 제품 삭제
    DELETE_PRODUCT(context, selectCon) {
      return deleteProduct(selectCon)
        .then((response) => {
          context.commit("SET_DELETE_PRODUCT", response.data.data);
          return response.data;
        })
        .catch((error) => {
          if (error.response) {
            // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
            console.log(error.response);
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

    // 일부 제품 조회(처음 조회)
    SELECT_PRODUCT(context, selectCon) {
      return selectProduct(selectCon)
        .then((response) => {
          context.commit("SET_SELECT_PRODUCT", response.data);
          return response.data;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },

    // 데이터 조회 결과(페이지)
    SELECT_PAGE_PRODUCT(context, selectCon) {
      console.log("SELECT_PAGE_PRODUCT actions 접속됨");

      return selectPageProduct(selectCon)
        .then((response) => {
          context.commit("SET_SELECT_PRODUCT", response.data);
          return response.data;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },

    // SKU 중복 조회
    CHECK_SKU_DUP(context, selectCon) {
      return checkSkuNo(selectCon)
        .then((response) => {
          context.commit("SET_CHECK_PRODUCT_RESULT", response.data.data);
          return response.data;
        })
        .catch((error) => {
          if (error.response) {
            // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
            console.log(error.response);
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

    // 리플 수정하기
    UPDATE_PRODUCT_REPLY(context, selectCon) {
      return updateProductReply(selectCon)
        .then((response) => {
          context.commit("SET_UPDATE_PRODUCT_REPLY", response.data.data);
          return response.data;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },

    // 리플 삭제
    DELETE_PRODUCT_REPLY(context, selectCon) {
      return deleteProductReply(selectCon)
        .then((response) => {
          context.commit("SET_DELETE_PRODUCT_REPLY", response.data.data);
          return response.data;
        })
        .catch((error) => {
          if (error.response) {
            // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
            console.log(error.response);
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
  },
};

export default productStore;
