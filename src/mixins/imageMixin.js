export const imageMixin = {
    data() {
        return {
            imgElement:"",
            imgUpdateFlag: false,
            imgFlag : false,
            imgFiles: [],
            imgFileList: [],
            formData: new FormData(),
}
    },
    methods: {
        // 클레임 상세 정보 이미지 파일 지정
        imgUpdate(image) {
            this.imgUpdateFlag = true;

            image.forEach((x) => {
                console.log("이미지 있음");
                console.log(x);

                // var tempImg = x.imgFilePath.substr(27).replaceAll("\\", "/");
                var tempImg =
                // "http://192.168.21.251:8080/" +
                    "http://127.0.0.1:8080/" +
                    x.imgFilePath.substr(13).replaceAll("\\", "/");
            
                // var temp ={ url: tempImg }

                this.imgFiles.push([{ url: tempImg, imgId : x.id }]);
                console.log(tempImg);
            });
            console.log(this.imgFiles);
        },

        // 파일 이미지 추가 될 경우
        imgFileSelected(event) {
            // console.log("이미지 파일 추가");
            // console.log(event);

            var files = event.target.files;
            console.log(files);
            
            var temp = [];
        
            [].forEach.call(files, function (i, item) {
                console.log(files[item]);

                var fileReader = new FileReader();
                fileReader.onload = function (e) {
                    
                    console.log(e.target);

                    var img = {
                        url : e.target.result,
                        file : files[item]
                    };
                    console.log("url");
                    console.log(img);

                    temp.push(img);
                };
                fileReader.readAsDataURL(files[item]);
            });

            this.imgFiles.push(temp);

            console.log("이미지 추가.");
            console.log(this.imgFiles);
        },
        // viewer 초기화
        inited(viewer) {
            console.log("viewer 초기화");
            this.$viewer = viewer;
        },
        // xbox click
        xBoxClick() {
            console.log("이미지 삭제");
            this.imgFiles[this.imgElement[0]].splice(this.imgElement[1], 1);
            console.log(this.imgFiles);
        },
        // img Element save
        imgElementSave(index, index2) {
            this.imgElement = [index, index2];
        }
    }
}