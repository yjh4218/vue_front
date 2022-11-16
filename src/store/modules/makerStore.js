import {
  insertMaker,
  updateMaker,
  deleteMaker,
  selectMaker,
  insertMakerAudit,
  updateMakerAudit,
  deleteMakerAudit,
  updateMakerReply,
  deleteMakerReply
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
        
        // 리플 수정
        updateMakerReply: {},
        // 리플 삭제 결과값
        deleteMakerReply: {},
        
        
        // 제조사 점검 추가하기
        insertMakerAudit: {},
        // 제조사 점검 조회
        selectMakerAudit: [],
        // 제조사 점검 수정하기
        updateMakerAudit: {},
        // 제조사 점검 삭제하기
        deleteMakerAudit: {},

        // 신규상품 등록을 위한 제조사들 조회
        selectMakerProduct : []
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
          return state.updateMaker;
        },
        // 제조사 삭제 데이터 확인
        getDeleteMaker(state) {
          return state.deleteMaker;
        },
        
        // 리플 업데이트 상태값
        getUpdateMakerReply(state) {
          return state.updateMakerReply;
        },
        // 리플 삭제한 상태값
        getDeleteMakerReply(state) {
          return state.deleteMakerReply;
      },
        
        // 제조사 점검 입력 데이터 확인
        getInsertMakerAudit(state) {
          return state.insertMakerAudit;
        },
        // 제조사 점검 조회
        getSelectMakerAudit(state) {
          return state.selectMakerAudit;
        },
        // 제조사 점검 수정 데이터 확인
        getUpdateMakerAudit(state) {
          return state.updateMakerAudit;
        },
        // 제조사 점검 삭제 데이터 확인
        getDeleteMakerAudit(state) {
          return state.deleteMakerAudit;
        },
        
        // 신규상품 등록을 위한 제조사들 조회
        getSelectMakerProduct(state) {
          return state.selectMakerProduct;
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
        state.updateMaker = updateMaker;
      },
      //제조사 제품 삭제
      SET_DELETE_MAKER(state, deleteMaker) {
        state.deleteMaker = deleteMaker;
      },
        
      // 리플 정보 수정 저장
      SET_UPDATE_MAKER_REPLY(state, updateMakerReply) {
        state.updateMakerReply = updateMakerReply;
      },
      // 리플 삭제 확인
      SET_DELETE_MAKER_REPLY(state, deleteMakerReply) {
        state.deleteMakerReply = deleteMakerReply;
      },
        
      // 제조사 점검 추가하기
      SET_INSERT_MAKER_AUDIT(state, insertMakerAudit) {
        state.insertMakerAudit = insertMakerAudit;
      },
      // 제조사 점검 조회
      SET_SELECT_MAKER_AUDIT(state, selectMakerAudit) {
        state.selectMakerAudit = selectMakerAudit;
      },
      // 제조사 점검 수정
      SET_UPDATE_MAKER_AUDIT(state, updateMakerAudit) {
        state.updateMakerAudit = updateMakerAudit;
      },
      //제조사 점검 삭제
      SET_DELETE_MAKER_AUDIT(state, deleteMakerAudit) {
        state.deleteMakerAudit = deleteMakerAudit;
      },
        
        // 신규상품 등록을 위한 제조사들 조회
        SET_SELECT_MAKER_PRODUCT(state, selectMakerProduct) {
          state.selectMakerProduct = selectMakerProduct;
        },
    },
    actions: {
      // 신규 제조사 추가
      INSERT_MAKER(context, selectCon) {

        return insertMaker(selectCon)
          .then((response) => {
            context.commit("SET_INSERT_MAKER", response.data.data);
            return response.data;
          })
          .catch((error) => {
            console.log(error.response);
          });
      },

      // 제조사 수정
      UPDATE_MAKER(context, selectCon) {

        return updateMaker(selectCon)
          .then((response) => {
            context.commit("SET_UPDATE_MAKER", response.data.data);
            return response.data;
          })
          .catch((error) => {
            console.log(error.response);
          });
      },

      // 제조사 삭제
      DELETE_MAKER(context, selectCon) {

        return deleteMaker(selectCon)
          .then((response) => {
            context.commit("SET_DELETE_MAKER", response.data.data);
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

      // 일부 제조사 조회
      SELECT_MAKER(context, selectCon) {

        return selectMaker(selectCon)
          .then((response) => {
            
            if (response.data.message !== "product") {
              context.commit("SET_SELECT_MAKER", response.data.data);
            }
            else {
              context.commit("SET_SELECT_MAKER_PRODUCT", response.data.data);
            }
            
            return response.data;
          })
          .catch((error) => {
            console.log(error.response);
          });
      },
        
      // 리플 수정하기
      UPDATE_MAKER_REPLY(context, selectCon) {

        return updateMakerReply(selectCon)
          .then((response) => {
            context.commit("SET_UPDATE_MAKER_REPLY", response.data.data);
            return response.data;
          })
          .catch((error) => {
            console.log(error.response);
          });
      },

      // 리플 삭제
      DELETE_MAKER_REPLY(context, selectCon) {
        return deleteMakerReply(selectCon)
          .then((response) => {
            
            context.commit("SET_DELETE_MAKER_REPLY", response.data.data);
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

      // 신규 제조사 점검 추가
      INSERT_MAKER_AUDIT(context, selectCon) {
        return insertMakerAudit(selectCon)
          .then((response) => {
            
            context.commit("SET_INSERT_MAKER_AUDIT", response.data.data);
            return response.data;
          })
          .catch((error) => {
            console.log(error.response);
          });
      },

      // 제조사 점검 수정
      UPDATE_MAKER_AUDIT(context, selectCon) {
        return updateMakerAudit(selectCon)
          .then((response) => {
            context.commit("SET_UPDATE_MAKER_AUDIT", response.data.data);
            return response.data;
          })
          .catch((error) => {
            console.log(error.response);
          });
      },

      // 제조사 점검 삭제
      DELETE_MAKER_AUDIT(context, selectCon) {
        return deleteMakerAudit(selectCon)
          .then((response) => {
            context.commit("SET_DELETE_MAKER_AUDIT", response.data.data);
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

      // 제조사 점검 조회
      SELECT_MAKER_AUDIT(context, selectCon) {
        return selectMaker(selectCon)
          .then((response) => {
            
            context.commit("SET_SELECT_MAKER_AUDIT", response.data.data);
            
            return response.data;
          })
          .catch((error) => {
            console.log(error.response);
          });
      },
    }
}

export default makerStore