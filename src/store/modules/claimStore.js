
import {
  insertClaim,
  updateClaim,
  deleteClaim,
  selectClaim,
} from "../../api/claimAPI";

const claimStore = {
    namespaced: true,
    state: {
         // 클레임 추가하기
        insertClaim: {},
        // 전체 클레임 조회
        selectClaim: [],
        // 클레임 수정하기
        updateClaim: {},
        // 클레임 삭제하기
        deleteClaim:{},
    },
    getters: {
        // 클레임 추가 데이터 확인
        getInsertClaim(state) {
        return state.insertClaim;
        },
        // 클레임 제품 전체 조회
        getSelectClaim(state) {
        return state.selectClaim;
        },
        // 클레임 수정 데이터 확인
        getUpdateClaim(state) {
        return state.updateClaim;
        },
        // 클레임 삭제 데이터 확인
        getDeleteClaim(state) {
        return state.deleteClaim;
        },
    },
    mutations: {
        // 클레임 추가하기
        SET_INSERT_CLAIM(state, insertClaim) {
        state.insertClaim = insertClaim;
        },
        // 클레임 전체 제품 조회
        SET_SELECT_CLAIM(state, selectClaim) {
        state.selectClaim = selectClaim;
        },
        // 클레임 제품 업데이트
        SET_UPDATE_CLAIM(state, updateClaim) {
        state.updateClaim = updateClaim;
        },
        //클레임 제품 삭제
        SET_DELETE_CLAIM(state, deleteClaim) {
        state.deleteClaim = deleteClaim;
        },

    },
    actions: {
        // 클레임 추가
        INSERT_CLAIM(context, selectCon) {
        console.log("INSERT_CLAIM actions 접속됨");
        console.log(context);

        return insertClaim(selectCon)
            .then((response) => {
                context.commit("SET_INSERT_CLAIM", response.data.data);
                return response.data;
            })
            .catch((error) => {
                console.log(error.response);
            });
        },

        // 클레임 수정 추가
        UPDATE_CLAIM(context, selectCon) {

        return updateClaim(selectCon)
            .then((response) => {
                context.commit("SET_UPDATE_CLAIM", response.data.data);
                return response.data;
            })
            .catch((error) => {
                console.log(error.response);
            });
        },

        // 클레임 삭제
        DELETE_CLAIM(context, selectCon) {

        return deleteClaim(selectCon)
            .then((response) => {
                context.commit("SET_DELETE_CLAIM", response.data.data);
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

        // 일부 클레임 조회
        SELECT_CLAIM(context, selectCon) {
        console.log("SELECT_CLAIM actions 접속됨");
        console.log(selectCon);

        return selectClaim(selectCon)
            .then((response) => {
                context.commit("SET_SELECT_CLAIM", response.data.data);
                return response.data;
            })
            .catch((error) => {
                console.log(error.response);
            });
        },
        
    }
}

export default claimStore