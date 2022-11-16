
import {
    insertMonthSales,
    selectSales,
    updateMonthSales,
    deleteMonthSales,
    selectMonthSales,
    insertSalesProductComponent,
    updateSalesProductComponent,
    deleteSalesProductComponent,
    checkProductComponentSkuNo,
    selectProductComponent
} from "../../api/index";

const salesStore = {
    namespaced: true,
    state: {
        // 월별 판매량 추가하기
        insertMonthSales: {},
        // 전체 판매량 조회
        selectSales: [],
        // 월별 판매량 조회
        selectMonthSales: [],
        // 월별 판매량 수정하기
        updateMonthSales: {},
        // 월별 판매량 삭제하기
        deleteMonthSales: {},
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
        getInsertMonthSales(state) {
        return state.insertSales;
        },
        // 판매량 제품 전체 조회
        getSelectSales(state) {
        return state.selectSales;
        },
        // 월별 판매량 조회
        getSelectMonthSales(state) {
        return state.selectMonthSales;
        },
        // 월별 판매량 수정 데이터 확인
        getUpdateMonthSales(state) {
        return state.updatMontheSales;
        },
        // 월별 판매량 삭제 데이터 확인
        getDeleteMonthSales(state) {
        return state.deleteMonthSales;
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
        SET_INSERT_MONTH_SALES(state, insertMonthSales) {
            state.insertMonthSales = insertMonthSales;
        },
        // 판매량 전체 제품 조회
        SET_SELECT_SALES(state, selectSales) {
            state.selectSales = selectSales;
        },
        
        // 월별 판매량 조회
        SET_SELECT_MONTH_SALES(state, selectMonthSales) {
            state.selectMonthSales = selectMonthSales;
        },
        // 월별 판매량 수정
        SET_UPDATE_MONTH_SALES(state, updateMonthSales) {
            state.updateMonthSales = updateMonthSales;
        },
        // 월별 판매량 삭제
        SET_DELETE_MONTH_SALES(state, deleteMonthSales) {
            state.deletMontheSales = deleteMonthSales;
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
        INSERT_MONTH_SALES(context, selectCon) {

            return insertMonthSales(selectCon)
                .then((response) => {
                    context.commit("SET_INSERT_MONTH_SALES", response.data.data);
                    return response.data;
                })
                .catch((error) => {
                    console.log(error.response);
                });
        },

        // 일부 판매량 조회
        SELECT_SALES(context, selectCon) {

            return selectSales(selectCon)
                .then((response) => {
                    context.commit("SET_SELECT_SALES", response.data.data);
                    return response.data;
                })
                .catch((error) => {
                    console.log(error.response);
                });
        },

        // 월별 판매량 조회
        SELECT_MONTH_SALES(context, selectCon) {
            return selectMonthSales(selectCon)
                .then((response) => {
                    context.commit("SET_SELECT_MONTH_SALES", response.data.data);
                    return response.data;
                })
                .catch((error) => {
                    console.log(error.response);
                });
        },
        
        // 월별 판매량 수정 추가
        UPDATE_MONTH_SALES(context, selectCon) {
            return updateMonthSales(selectCon)
                .then((response) => {
                    context.commit("SET_UPDATE_MONTH_SALES", response.data.data);
                    return response.data;
                })
                .catch((error) => {
                    console.log(error.response);
                });
        },

        // 월별 판매량 삭제
        DELETE_MONTH_SALES(context, selectCon) {
            return deleteMonthSales(selectCon)
                .then((response) => {
                    context.commit("SET_DELETE_MONTH_SALES", response.data.data);
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

        // 제품 구성품 추가
        INSERT_SALES_PRODUCT_COMPONENT(context, selectCon) {

        return insertSalesProductComponent(selectCon)
            .then((response) => {
                context.commit("SET_INSERT_SALES_PRODUCT_COMPONENT", response.data.data);
                return response.data;
            })
            .catch((error) => {
                console.log(error.response);
            });
        },

        // 제품 구성품 수정
        UPDATE_SALES_PRODUCT_COMPONENT(context, selectCon) {
            return updateSalesProductComponent(selectCon)
                .then((response) => {
                    context.commit("SET_UPDATE_SALES_PRODUCT_COMPONENT", response.data.data);
                    return response.data;
                })
                .catch((error) => {
                    console.log(error.response);
                });
        },

        
        // 제품 구성품 삭제
        DELETE_SALES_PRODUCT_COMPONENT(context, selectCon) {
            return deleteSalesProductComponent(selectCon)
                .then((response) => {
                    context.commit("SET_DELETE_SALES_PRODUCT_COMPONENT", response.data.data);
                    return response.data;
                })
                .catch((error) => {
                    console.log(error.response);
                });
        },

        // SKU 중복 조회
        CHECK_SKU_DUP(context, selectCon) {
            return checkProductComponentSkuNo(selectCon)
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

        // 판매 구성품 조회
        SELECT_PRODUCT_COMPONENT(context, selectCon) {
            return selectProductComponent(selectCon)
                .then((response) => {
                    context.commit("SET_SELECT_PRODUCT_COMPONENT", response.data.data);
                    return response.data;
                })
                .catch((error) => {
                    console.log(error.response);
                });
        },
    }
}

export default salesStore