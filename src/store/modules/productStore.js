import {
  insertProduct,
  selectProduct,
  checkSkuNo,
  updateProduct,
  deleteProduct,
} from "../../api/index";

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
    },
    actions: {
        // 신규 제품 추가
        INSERT_PRODUCT(context, selectCon) {
        console.log("INSERT_PRODUCT actions 접속됨");
        console.log(context);

        return insertProduct(selectCon)
            .then((response) => {
            console.log("response");
            console.log(response);
            context.commit("SET_INSERT_PRODUCT", response.data.data);
            return response.data;
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

        return updateProduct(selectCon)
            .then((response) => {
            console.log("response");
            console.log(response);
            context.commit("SET_UPDATE_PRODUCT", response.data.data);
            return response.data;
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

        return deleteProduct(selectCon)
            .then((response) => {
            console.log("response");
            console.log(response);
            console.log(response.data.data);
            context.commit("SET_DELETE_PRODUCT", response.data.data);
            return response.data;
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

        return selectProduct(selectCon)
            .then((response) => {
            console.log("response");
            console.log(response);
            context.commit("SET_SELECT_PRODUCT", response.data.data);
            return response.data;
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

        return checkSkuNo(selectCon)
            .then((response) => {
            console.log("response");
            console.log(response);
            console.log(response.data.data);
            context.commit("SET_CHECK_PRODUCT_RESULT", response.data.data);
            return response.data;
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
    }
}

export default productStore