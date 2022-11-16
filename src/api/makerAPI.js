import axios from "axios";

// 1. Http Request & Response와 관련된 기본 설정
const makerUrl = "/maker/";

// 제조사 추가하기
function insertMaker(newMaker) {
console.log(newMaker);
  return axios.post(makerUrl + "insertMaker", newMaker);
}

// 제조사 수정하기
function updateMaker(updateMaker) {
  console.log(updateMaker);
  return axios.put(makerUrl + "updateMaker", updateMaker);
}

// 제조사 삭제하기
function deleteMaker(deleteMaker) {
  let data = {
    header: { "Content-Type": `application/json` },
    params: {
      id: deleteMaker.id,
    },
  };
  return axios.delete(makerUrl + "deleteMaker", data);
}

// 일부 제조사 조회
function selectMaker(selectCon) {

  let data = {
    header: { "Content-Type": `application/json` },
    params: {
      makerName: selectCon.makerName,
      makerAddress: selectCon.makerAddress,
      makerPerson: selectCon.makerPerson,
      makerPhone: selectCon.makerPhone,
      className: encodeURI(selectCon.className),
      newProduct : selectCon.newProduct
    },
  };

  return axios.get(makerUrl + "selectMakers", data);
}


// 제조사 리플 수정하기
function updateMakerReply(makerReply) {

  return axios.put(makerUrl + "updateMakerReply", makerReply);
}

// 제조사 리플 삭제하기
function deleteMakerReply(makerReply) {

  let data = {
    header: { "Content-Type": `application/json` },
    params: {
      makerId: makerReply.makerId,
      makerReplyId: encodeURI(makerReply.makerReplyId),
    },
  };
  return axios.delete(makerUrl + "deleteMakerReply", data);
}

export {
    insertMaker,
    updateMaker,
    deleteMaker,
    selectMaker,
    updateMakerReply,
    deleteMakerReply,
}
