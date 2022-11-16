export const spinnerMixin = {
    data() {
        return { 
            spinnerState: false, }
    },
    methods: {
        // 스피너 열기
        openSpinner() {
        this.spinnerState = true;
        },
        // 스피너 닫기
        closeSpinner() {
        this.spinnerState = false;
        },
    }
}