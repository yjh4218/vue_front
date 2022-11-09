export const adminChkMixin = {
    data() {
        return {
            adminChkFlag : false
        }
    },
    methods: {
        // 수정 작업하는 사람이 관리자인지 확인
        adminChk() {
            // 관리자가 아닐 경우 추가 불가능
            let checkUser = this.$store.getters["loginStore/getUserLogin"];
            if (checkUser.length === 0 || checkUser.data.body.data.role !== "ADMIN") {
                this.adminChkFlag = true;
            }
            else {
                this.adminChkFlag = false
            }
        },
    }
}