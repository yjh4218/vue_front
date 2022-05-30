import axios from "axios";

// 1. Http Request & Response와 관련된 기본 설정
const config = {
  productUrl: "/product/",
};

// 2. API 함수들을 정리
function selectAllProduct() {
  return axios.get(config.productUrl + "selectAllProducts");
  //return axios.get(`${config.baseUrl}news/1.json`);
}

function selectProduct(sku_no, productName, brandName, maker) {
  console.log("api : sku_no, productName, brandName, maker");
  console.log(sku_no, productName, brandName, maker);
  return axios.get(config.productUrl + "selectProducts", {
    params: {
      sku_no: sku_no,
      productName: productName,
      brandName: brandName,
      maker:maker
    }
  });
  //return axios.get(`${config.baseUrl}news/1.json`);
}

function fetchAskList() {
  return axios.get(config.baseUrl + "ask/1.json");
  //return axios.get(`${config.baseUrl}news/1.json`);
}

export { selectAllProduct, selectProduct, fetchAskList };