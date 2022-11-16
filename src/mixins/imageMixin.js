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
                    // tempImg = x.fileInPath.substr(20).replaceAll("\\", "/");
                    tempImg = x.fileInPath.substr(16).replaceAll("\\", "/");
                } else {
                    // var tempImg = x.imgFilePath.substr(27).replaceAll("\\", "/");
                    // tempImg = x.imgFileInPath.substr(20).replaceAll("\\", "/");
                    tempImg = x.imgFileInPath.substr(16).replaceAll("\\", "/");
                }
                
                // 외부 서버 이용시
                // if (sel === 'file') {
                //     tempImg =
                // "http://192.168.21.197:8080/" +
                //     // "http://127.0.0.1:8080/" +
                //     x.fileInPath.substr(13).replaceAll("\\", "/");
                // } else {
                //     // var tempImg = x.imgFilePath.substr(27).replaceAll("\\", "/");
                //     tempImg =
                // "http://192.168.21.197:8080/" +
                //     // "http://127.0.0.1:8080/" +
                //     x.imgFilePath.substr(13).replaceAll("\\", "/");
                // }

                // 서버 컴퓨터 외부 파일 접근시
                // if (sel === 'file') {
                //     tempImg =
                // "http://192.168.21.166:8080/" +
                //     // "http://127.0.0.1:8080/" +
                //     x.filePath.substr(21).replaceAll("\\", "/");
                // } else {
                //     // var tempImg = x.imgFilePath.substr(27).replaceAll("\\", "/");
                //     tempImg =
                // "http://192.168.21.166:8080/" +
                //     // "http://127.0.0.1:8080/" +
                //     x.imgFilePath.substr(21).replaceAll("\\", "/");
                // }


                this.imgFiles.push({ url: tempImg, imgId : x.id, mode : "old" });
            });
        },

        // 파일 이미지 추가 될 경우
        // imgFileSelected(event) {

        //     var files = event.target.files;
            
        //     var temp = [];
        
        //     [].forEach.call(files, function (i, item) {

        //         var fileReader = new FileReader();
        //         fileReader.onload = function (e) {
                    
        //             var img = {
        //                 url : e.target.result,
        //                 file : files[item]
        //             };

        //             temp.push(img);
        //         };
        //         fileReader.readAsDataURL(files[item]);
        //     });

        //     this.imgFiles.push(temp);

        // },
        // 파일 데이터 처리
        imgFileSelected(files) {
            var temp = [];

            var cnt = 1;
            var len = files.length;

            return new Promise(function (resolve) {
                [].forEach.call(files, function (i, item) {
                    var fileReader = new FileReader();
                    fileReader.onload = async function (e) {
                        var img = await {
                            url: e.target.result,
                            file: files[item],
                            mode : "new"
                        };

                        temp.push(img);

                        if (cnt === len) {
                            resolve(temp);
                        } else {
                            cnt++;
                        }
                    };
                    
                    fileReader.readAsDataURL(files[item]);
                });
            });
        },
        // 파일 첨부 데이터 확인
        async AddImageData(event) {
            var files = event.target.files;

            var temp = await this.imgFileSelected(files);

            temp.forEach((element) => {
                this.imgFiles.push(element);
            });
        },
        // viewer 초기화
        inited(viewer) {
            this.$viewer = viewer;
        },
        // xbox click
        xBoxClick() {
            this.imgFiles.splice(this.imgElement, 1);
        },
        // img Element save
        imgElementSave(index) {
            this.imgElement = index;
        }
    }
}