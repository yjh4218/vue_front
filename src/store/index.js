import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// import axios from "axios";

import {
    selectAllProduct,
    selectProduct
} from "../api/index.js";

export const store = new Vuex.Store({
    state: {
        allProducts: [],
        selectProduct:[]
    },
    // getters: {
        
    // },
    mutations: {
        SET_SELECT_ALL_PRODUCT(state, allProducts) {
            state.allProducts = allProducts
        },
        SET_SELECT_PRODUCT(state, selectProduct) {
            state.selectProduct = selectProduct
        }
    },
    actions: {
     // 모든 제품 조회
    SELECT_ALL_PRODUCT(context) {
            console.log("actions 접속됨");
            console.log(context);
            console.log("asdasdads");
        selectAllProduct(context)
            .then(response => {
                console.log(response);
                context.commit("SET_SELECT_ALL_PRODUCT", response.data.data);
            })
            .catch((error) => {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            })
        },
        // 일부 제품 조회
        SELECT_PRODUCT(context, selectCon) {
            console.log("actions 접속됨");
            console.log("name, sku_no, productName, brandName, maker");
            console.log(selectCon);
            
            selectProduct(selectCon).then(response => {
                    console.log(response);
                    context.commit("SET_SELECT_ALL_PRODUCT", response.data.data);
                })
                .catch((error) => {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                })
            // axios.get("/product/selectProducts", {
            //     params: {
            //         sku_no: selectCon.sku_no,
            //         productName: selectCon.productName,
            //         brandName: selectCon.brandName,
            //         maker:selectCon.maker
            //     }
            // }).then(response => {
            //         console.log(response);
            //         context.commit("SET_SELECT_ALL_PRODUCT", response.data.data);
            //     })
            //     .catch((error) => {
            //         console.log(error.response.data);
            //         console.log(error.response.status);
            //         console.log(error.response.headers);
            //     })
                // selectProduct(sku_no, productName, brandName, maker)
        }   
    },
})