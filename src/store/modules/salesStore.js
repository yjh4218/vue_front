
import {
    insertSales,
    updateSales,
    deleteSales,
    selectSales,
    insertSalesProductComponent,
    updateSalesProductComponent,
    deleteSalesProductComponent,
    checkProductComponentSkuNo,
    selectProductComponent
} from "../../api/index";

const salesStore = {
    namespaced: true,
    state: {
        // 판매량 추가하기
        insertSales: {},
        // 전체 판매량 조회
        selectSales: [],
        // 판매량 수정하기
        updateSales: {},
        // 판매량 삭제하기
        deleteSales: {},
        // 제품 구성품 추가하기
        insertSalesProductComponent: {},
        // 제품 구성품 수정하기
        updateSalesProductComponent: {},
        // 제품 구성품 삭제하기
        deleteSalesProductComponent: {},
        // 중복 조회 결과값
        checkProductDup: {},
        // 제품 구성품 조회하기
        selectProductComponent:[],
    },
    getters: {
        // 판매량 추가 데이터 확인
        getInsertSales(state) {
        return state.insertSales;
        },
        // 판매량 제품 전체 조회
        getSelectSales(state) {
        return state.selectSales;
        },
        // 판매량 수정 데이터 확인
        getUpdateSales(state) {
        return state.updateSales;
        },
        // 판매량 삭제 데이터 확인
        getDeleteSales(state) {
        return state.deleteSales;
        },
        // 제품 구성품 추가 데이터 확인
        getInsertSalesProductComponet(state) {
            return state.insertSalesProductComponent
        },
        // 제품 구성품 수정 데이터 확인
        getUpdateSalesProductComponent(state) {
          return state.updateSalesProductComponent  
        },
        // 제품 구성품 삭제 데이터 확인
        getDeleteSalesProductComponent(state) {
          return state.deleteSalesProductComponent
        },
        // sku 중복 확인 결과값
        getCheckProductDup(state) {
            return state.checkProductDup;
        },
        // 판매구성품 조회하기 데이터 확인
        getSelectProductComponent(state) {
        return state.selectProductComponent;
        },
    },
    mutations: {
        // 판매량 추가하기
        SET_INSERT_SALES(state, insertSales) {
            state.insertSales = insertSales;
        },
        // 판매량 전체 제품 조회
        SET_SELECT_SALES(state, selectSales) {
            state.selectSales = selectSales;
        },
        // 판매량 제품 업데이트
        SET_UPDATE_SALES(state, updateSales) {
            state.updateSales = updateSales;
        },
        //판매량 제품 삭제
        SET_DELETE_SALES(state, deleteSales) {
            state.deleteSales = deleteSales;
        },
        // 제품 구성품 추가하기
        SET_INSERT_SALES_PRODUCT_COMPONENT(state, insertSalesProductComponent) {
            state.insertSalesProductComponent = insertSalesProductComponent;
        },
        // 제품 구성품 수정하기
        SET_UPDATE_SALES_PRODUCT_COMPONENT(state, updateSalesProductComponent) {
            state.updateSalesProductComponent = updateSalesProductComponent;
        },
        // 제품 구성품 삭제하기
        SET_DELETE_SALES_PRODUCT_COMPONENT(state, deleteSalesProductComponent) {
            state.deleteSalesProductComponent = deleteSalesProductComponent;
        },
        // 상품 중복 확인
        SET_CHECK_PRODUCT_RESULT(state, checkProductDup) {
            state.checkProductDup = checkProductDup;
        },
        // 판매구성품 조회하기 확인
        SET_SELECT_PRODUCT_COMPONENT(state, selectProductComponent) {
            state.selectProductComponent = selectProductComponent;
        },
    },
    actions: {
        // 판매량 추가
        INSERT_SALES(context, selectCon) {
        console.log("INSERT_SALES actions 접속됨");
        console.log(context);

        return insertSales(selectCon)
            .then((response) => {
            console.log("response");
            console.log(response);
            context.commit("SET_INSERT_SALES", response.data.data);
            return response.data;
            })
            .catch((error) => {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            });
        },

        // 판매량 수정 추가
        UPDATE_SALES(context, selectCon) {
        console.log("UPDATE_SALES actions 접속됨");
        console.log(context);

        return updateSales(selectCon)
            .then((response) => {
            console.log("response");
            console.log(response);
            context.commit("SET_UPDATE_SALES", response.data.data);
            return response.data;
            })
            .catch((error) => {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            });
        },

        // 판매량 삭제
        DELETE_SALES(context, selectCon) {
        console.log("DELETE_SALES actions 접속됨");
        console.log(selectCon);

        return deleteSales(selectCon)
            .then((response) => {
            console.log("response");
            console.log(response);
            console.log(response.data.data);
            context.commit("SET_DELETE_SALES", response.data.data);
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

        // 일부 판매량 조회
        SELECT_SALES(context, selectCon) {
        console.log("SELECT_SALES actions 접속됨");
        console.log(selectCon);

        return selectSales(selectCon)
            .then((response) => {
            console.log("response");
            console.log(response);
            context.commit("SET_SELECT_SALES", response.data.data);
            return response.data;
            })
            .catch((error) => {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            });
        },
        
        // 제품 구성품 추가
        INSERT_SALES_PRODUCT_COMPONENT(context, selectCon) {
        console.log("INSERT_SALES_PRODUCT_COMPONENT actions 접속됨");
        console.log(context);

        return insertSalesProductComponent(selectCon)
            .then((response) => {
            console.log("response");
            console.log(response);
            context.commit("SET_INSERT_SALES_PRODUCT_COMPONENT", response.data.data);
            return response.data;
            })
            .catch((error) => {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            });
        },

        // 제품 구성품 수정
        UPDATE_SALES_PRODUCT_COMPONENT(context, selectCon) {
        console.log("UPDATE_SALES_PRODUCT_COMPONENT actions 접속됨");
        console.log(context);

        return updateSalesProductComponent(selectCon)
            .then((response) => {
            console.log("response");
            console.log(response);
            context.commit("SET_UPDATE_SALES_PRODUCT_COMPONENT", response.data.data);
            return response.data;
            })
            .catch((error) => {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            });
        },

        
        // 제품 구성품 삭제
        DELETE_SALES_PRODUCT_COMPONENT(context, selectCon) {
        console.log("DELETE_SALES_PRODUCT_COMPONENT actions 접속됨");
        console.log(context);

        return deleteSalesProductComponent(selectCon)
            .then((response) => {
            console.log("response");
            console.log(response);
            context.commit("SET_DELETE_SALES_PRODUCT_COMPONENT", response.data.data);
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

        return checkProductComponentSkuNo(selectCon)
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

        // 판매 구성품 조회
        SELECT_PRODUCT_COMPONENT(context, selectCon) {
        console.log("SELECT_PRODUCT_COMPONENT actions 접속됨");
        console.log(selectCon);

        return selectProductComponent(selectCon)
            .then((response) => {
            console.log("response");
            console.log(response);
            context.commit("SET_SELECT_PRODUCT_COMPONENT", response.data.data);
            return response.data;
            })
            .catch((error) => {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            });
        },
    }
}

export default salesStore