import axios from "axios";

// 1. Http Request & Response와 관련된 기본 설정
const claimUrl = "/claim/";


// 클레임 추가하기
function insertClaim(newClaim) {

  return axios.post(claimUrl + "insertClaim", newClaim, {
    headers: { "Content-Type": `multipart/form-data` },
  });
}

// 클레임 수정하기
function updateClaim(updateClaim) {

  return axios.put(claimUrl + "updateClaim", updateClaim, {
    headers: { "Content-Type": `multipart/form-data` },
  });
}

// 클레임 삭제하기
function deleteClaim(deleteClaim) {
  let data = {
    header: { "Content-Type": `application/json` },
    params: {
      id: deleteClaim.id,
    },
  };
  return axios.delete(claimUrl + "deleteClaim", data);
}


// 일부 클레임 조회
function selectClaim(selectCon) {

  let data = {
    header: { "Content-Type": `application/json` },
    params: {
      skuNo: selectCon.sku_no,
      productName: selectCon.productName,
      brandName: selectCon.brandName,
      maker: selectCon.maker,
      className: encodeURI(selectCon.className),
      beforeDate: selectCon.beforeDate,
      afterDate: selectCon.afterDate,
    },
  };

  return axios.get(claimUrl + "selectClaims", data);
}

export {
  insertClaim,
  updateClaim,
  deleteClaim,
  selectClaim,
}
