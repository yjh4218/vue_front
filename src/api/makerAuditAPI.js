import axios from "axios";

// 1. Http Request & Response와 관련된 기본 설정
const makerAuditUrl = "/makerAudit/";


// 제조사 점검 추가하기
function insertMakerAudit(newAudit) {
  return axios.post(makerAuditUrl + "insertMakerAudit", newAudit, {
    headers: { "Content-Type": `multipart/form-data` },
  });
}

// 제조사 점검 수정하기
function updateMakerAudit(updateAudit) {
  return axios.put(makerAuditUrl + "updateMakerAudit", updateAudit, {
    headers: { "Content-Type": `multipart/form-data` },
  });
}

// 제조사 점검 삭제하기
function deleteMakerAudit(deleteAudit) {
  let data = {
    header: { "Content-Type": `application/json` },
    params: {
      id: deleteAudit.id,
    },
  };
  return axios.delete(makerAuditUrl + "deleteMakerAudit", data);
}

export {
  insertMakerAudit,
  updateMakerAudit,
  deleteMakerAudit,
}
