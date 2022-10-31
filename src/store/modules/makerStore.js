import {
    insertMaker,
    updateMaker,
    deleteMaker,
    selectMaker,
} from "../../api/index";


const makerStore = {
    namespaced: true,
    state: {
        // 제조사 추가하기
        insertMaker: {},
        // 전체 제조사 조회
        selectMaker: [],
        // 제조사 수정하기
        updateMaker: {},
        // 제조사 삭제하기
        deleteMaker: {},
    },
    getters: {
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
    },
    mutations: {
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
    },
    actions: {
        // 신규 제조사 추가
        INSERT_MAKER(context, selectCon) {
          console.log("INSERT_MAKER actions 접속됨");
          console.log(context);

          return insertMaker(selectCon)
            .then((response) => {
              console.log("response");
              console.log(response);
              context.commit("SET_INSERT_MAKER", response.data.data);
              return response.data;
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

          return updateMaker(selectCon)
            .then((response) => {
              console.log("response");
              console.log(response);
              context.commit("SET_UPDATE_MAKER", response.data.data);
              return response.data;
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

          return deleteMaker(selectCon)
            .then((response) => {
              console.log("response");
              console.log(response);
              console.log(response.data.data);
              context.commit("SET_DELETE_MAKER", response.data.data);
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

        // 일부 제조사 조회
        SELECT_MAKER(context, selectCon) {
          console.log("SELECT_MAKER actions 접속됨");
          console.log(selectCon);

          return selectMaker(selectCon)
            .then((response) => {
              console.log("response");
              console.log(response);
              context.commit("SET_SELECT_MAKER", response.data.data);
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

export default makerStore