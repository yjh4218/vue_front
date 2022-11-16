import axios from "axios";

// 1. Http Request & Response와 관련된 기본 설정
const inspectUrl = "/inspect/";


// 검수 추가하기
function insertInspect(newInspect) {
  return axios.post(inspectUrl + "insertInspect", newInspect, {
    headers: { "Content-Type": `multipart/form-data` },
  });
}

// 검수 수정하기
function updateInspect(updateInspect) {

  return axios.put(inspectUrl + "updateInspect", updateInspect, {
    headers: { "Content-Type": `multipart/form-data` },
  });
}

// 검수 삭제하기
function deleteInspect(deleteInspect) {
  let data = {
    header: { "Content-Type": `application/json` },
    params: {
      id: deleteInspect.id,
    },
  };
  return axios.delete(inspectUrl + "deleteInspect", data);
}

// 모든 검수 조회
function selectAllInspect() {
  return axios.get(inspectUrl + "selectAllInspect");
}

// 일부 검수 조회
function selectInspect(selectCon) {

  let data = {
    header: { "Content-Type": `application/json` },
    params: {
      page:selectCon.page,
      skuNo: selectCon.skuNo,
      productName: selectCon.productName,
      brandName: selectCon.brandName,
      maker: selectCon.maker,
      className: encodeURI(selectCon.className),
      beforeDate: selectCon.beforeDate,
      afterDate: selectCon.afterDate,
    },
  };

  return axios.get(inspectUrl + "selectInspects", data);
}


// 검수 엑셀 다운 
function selectInspectExcel(selectCon) {

  let data = {
    header: { "Content-Type": `application/json` },
    params: {
      page:selectCon.page,
      skuNo: selectCon.skuNo,
      productName: selectCon.productName,
      brandName: selectCon.brandName,
      maker: selectCon.maker,
      className: encodeURI(selectCon.className),
      beforeDate: selectCon.beforeDate,
      afterDate: selectCon.afterDate,
    },
  };

  return axios.get(inspectUrl + "selectInspectExcel", data);
}

// 검수 페이지 조회
function selectPageInspect(selectCon) {

  let data = {
    header: { "Content-Type": `application/json` },
    params: {
      inspectCurseId: encodeURI(selectCon.inspectCurseId),
    },
  };

  return axios.get(inspectUrl + "selectPageInspect", data);
}

export {
    insertInspect,
    updateInspect,
    deleteInspect,
    selectAllInspect,
    selectInspect,
    selectInspectExcel,
    selectPageInspect,
}
