export const dateSearchMixin = {
    data() {
        return {
            beforeDate: "",
            afterDate: "",
        }
    },
    methods: {
        // 오늘 날짜 확인
        setDate(searchDate) {
            var thisday = new Date(searchDate);

            // 연도, 월, 일 추출
            var year = thisday.getFullYear();
            var month = ("0" + (thisday.getMonth() + 1)).slice(-2);
            var day = ("0" + thisday.getDate()).slice(-2);

            // 최종 포맷 (ex - '2021-10-08')
            return year + "-" + month + "-" + day;
        },
        // 일주일 전 날짜 구하기
        prevWeek() {
            var d = new Date();
            this.afterDate = this.setDate(d);
            console.log("d : " + d);

            var dayOfMonth = d.getDate();
            d.setDate(dayOfMonth - 7);
            this.beforeDate = this.setDate(d);
        },
        // 한달 전 날짜 구하기
        prevMonth() {
            var d = new Date();
            this.afterDate = this.setDate(d);

            var monthOfYear = d.getMonth();
            d.setMonth(monthOfYear - 1);
            this.beforeDate = this.setDate(d);
        },
        // 3개월 전 날짜 구하기
        prevThreeMonth() {
            var d = new Date();
            this.afterDate = this.setDate(d);

            var monthOfYear = d.getMonth();
            d.setMonth(monthOfYear - 3);
            this.beforeDate = this.setDate(d);
        },
    }
}