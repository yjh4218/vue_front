import {
  insertInspect,
  updateInspect,
  deleteInspect,
  selectInspect,
} from "../../api/index";

const inspectStore = {
    namespaced: true,
    state: {
        // 검수 추가하기
        insertInspect: {},
        // 전체 검수 조회
        selectInspect: [],
        // 검수 수정하기
        updateInspect: {},
        // 검수 삭제하기
        deleteInspect:{},
    },
    getters: {
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
    },
    mutations: {
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

    },
    actions: {
        // 신규 검수 추가
    INSERT_INSPECT(context, selectCon) {
      console.log("INSERT_INSPECT actions 접속됨");
      console.log(context);

      return insertInspect(selectCon)
        .then((response) => {
          console.log("response");
          console.log(response);
          context.commit("SET_INSERT_INSPECT", response.data.data);
          return response.data;
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

      return updateInspect(selectCon)
        .then((response) => {
          console.log("response");
          console.log(response);
          context.commit("SET_UPDATE_INSPECT", response.data.data);
          return response.data;
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

      return deleteInspect(selectCon)
        .then((response) => {
          console.log("response");
          console.log(response);
          console.log(response.data.data);
          context.commit("SET_DELETE_INSPECT", response.data.data);
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
    // 일부 검수 조회
    SELECT_INSPECT(context, selectCon) {
      console.log("SELECT_INSPECT actions 접속됨");
      console.log(selectCon);

      return selectInspect(selectCon)
        .then((response) => {
          console.log("response");
          console.log(response);
          context.commit("SET_SELECT_INSPECT", response.data.data);
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

export default inspectStore