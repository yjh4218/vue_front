export const modalMixin = {
    data() {
        return {
            modal: false,
            searchModal: false,
            modalName: "",
        }
    },
    methods: {
        // 모달 열기
        openModal() {
            this.modal = true;
        },
        // 모달 닫기
        closeModal() {
            this.modal = false;
        },
        // 제품 검색 모달 열기
        openSearchModal() {
            this.searchModal = true;
        },
        // 제품 검색 모달 닫기
        closeSearchModal() {
            this.searchModal = false;
        },
        // 등록 완료 되었을 경우 초기화
        roturInit(modalName) {
            console.log("routerInit 접속. 새로고침 진행" + modalName);
            if(modalName === "productSel"){
                this.$router.push("/productSel");
            } 
            else if (modalName === "inspectSel") {
                this.$router.push("/inspectSel");
            }
            else if(modalName === "makerSel"){
                this.$router.push("/makerSel");
            }
            else if(modalName === "claimSel"){
                this.$router.push("/claimSel");
            }
            else if (modalName === "salesProductComponent") {
                this.$router.push("/salesProductSel");
            }
            else if(modalName === "salesSel"){
                this.$router.push("/salesSel");
            }
            else {
                this.$router.push("/makerSel");
            }
            // this.$router.go();
        },
        modalText() {
            this.closeSpinner();
            console.log("모달 메시지 확인 필요함");
            this.modal = false;
        },
    }
}