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
        imgUpdate(image, sel) {
            this.imgUpdateFlag = true;

            image.forEach((x) => {

                var tempImg = '';
                
                if (sel === 'file') {
                    tempImg =
                "http://192.168.21.197:8080/" +
                    // "http://127.0.0.1:8080/" +
                    x.filePath.substr(13).replaceAll("\\", "/");
                } else {
                    // var tempImg = x.imgFilePath.substr(27).replaceAll("\\", "/");
                    tempImg =
                "http://192.168.21.197:8080/" +
                    // "http://127.0.0.1:8080/" +
                    x.imgFilePath.substr(13).replaceAll("\\", "/");
                }


                this.imgFiles.push([{ url: tempImg, imgId : x.id }]);
            });
        },

        // 파일 이미지 추가 될 경우
        imgFileSelected(event) {

            var files = event.target.files;
            
            var temp = [];
        
            [].forEach.call(files, function (i, item) {

                var fileReader = new FileReader();
                fileReader.onload = function (e) {
                    
                    var img = {
                        url : e.target.result,
                        file : files[item]
                    };

                    temp.push(img);
                };
                fileReader.readAsDataURL(files[item]);
            });

            this.imgFiles.push(temp);

        },
        // viewer 초기화
        inited(viewer) {
            this.$viewer = viewer;
        },
        // xbox click
        xBoxClick() {
            this.imgFiles[this.imgElement[0]].splice(this.imgElement[1], 1);
        },
        // img Element save
        imgElementSave(index, index2) {
            this.imgElement = [index, index2];
        }
    }
}