export const fileMixin = {
    data() {
        return {
            fileData: []
        }
    },
    methods: {
        updateFileData(file) {
            file.forEach(element => {
                console.log("파일 들어옴");
                console.log(element);
                var tmpUrl =
                "http://192.168.21.197:8080/" +
                // "http://127.0.0.1:8080/" +
                    element.filePath.substr(13).replaceAll("\\", "/");
                
                var tmp = element.filePath.split(".");

                var tmpFileData = {
                    url: tmpUrl,
                    fileId: element.id,
                    fileName: { name: element.fileName },
                    extension: tmp[1],
                };
                this.fileData.push(tmpFileData);
            });
            
        },
        
        // 파일 첨부 데이터 확인
        async AddfileData(event) {
            console.log("file add event");
            console.log(event);

            var files = event.target.files;
            console.log(files);

            var temp = await this.fileDataFun(files);

            temp.forEach((element) => {
                this.fileData.push(element);
            });

            console.log("파일 추가.");
            console.log(this.fileData);
        },
        // 파일 데이터 처리
        fileDataFun(files) {
            var temp = [];

            var cnt = 1;
            var len = files.length;

            return new Promise(function (resolve) {
                [].forEach.call(files, function (i, item) {
                var fileReader = new FileReader();
                fileReader.onload = async function (e) {
                    console.log(e.target);

                    var img = await {
                    url: e.target.result,
                    file: files[item],
                    };

                    console.log("url");
                    console.log(img);

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
        // 첨부파일 삭제
        delDown(item, index) {
            console.log("파일삭제");
            console.log(item);
            console.log(index);
            this.fileData.splice(index, 1);
        },
        // 첨부파일 다운로드
        downData(item) {
            console.log("파일 다운");
            console.log(item);
            if (item.fileId !== undefined || item.fileId !== null) {
                fetch(item.url)
                .then((response) => response.blob())
                .then((blob) => {
                    // setFetching(false);
                    const blobURL = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = blobURL;
                    a.target = "_self";
                    // a.style = "display: none";

                    a.download = item.fileName.name;
                    document.body.appendChild(a);
                    a.click();
                });
                // .catch(() => setError(true));
            } else {
                var fileDownload = require("js-file-download");
                fileDownload(item.file, item.file.name);
            }
        },
    }
}