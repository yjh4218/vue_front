export const imageMixin = {
    data() {
        return {
            imgFiles: [],
            formData: new FormData(),
}
    },
    methods: {
        // 클레임 상세 정보 이미지 파일 지정
        imgUpdate(image) {
        this.imgFiles = [];
        image.forEach((x) => {
            console.log("이미지 있음");

            // var tempImg = x.imgFilePath.substr(27).replaceAll("\\", "/");
            var tempImg =
            "http://192.168.20.66:8080/" +
            x.imgFilePath.substr(13).replaceAll("\\", "/");

            this.imgFiles.push({ url: tempImg });
            console.log(tempImg);
        });
        console.log(this.imgFiles);
        },
        // 파일 이미지 추가 될 경우
        imgFileSelected(event) {
        console.log("이미지 파일 추가");
        console.log(event);
        this.imgFlag = true;
        var files = event.target.files;
        this.imgFiles = [];

        var temp = [];
        var frm = new FormData();

        [].forEach.call(files, function (i, item) {
            frm.append("image", files[item]);
            console.log("FileReader 내용 확인중");
            console.log(files[item]);

            var fileReader = new FileReader();
            fileReader.onload = function (e) {
            console.log(item);
            console.log(i);

            var img = {
                url: e.target.result,
            };
            console.log("url");
            console.log(img);

            // var img = e.target.result;

            temp.push(img);
            };
            fileReader.readAsDataURL(files[item]);
        });
        this.imgFiles = temp;
        this.formData = frm;
        console.log("이미지 추가.");
        console.log(this.imgFiles);
        },
        // viewer 초기화
        inited(viewer) {
        console.log("viewer 초기화");
        this.$viewer = viewer;
        },
    }
}