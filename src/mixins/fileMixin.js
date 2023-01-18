export const fileMixin = {
  data() {
    return {
      fileData: [],
    };
  },
  methods: {
    updateFileData(file) {
      file.forEach((element) => {
        // 외부 서버 이용시
        var tmpUrl =
          // "http://127.0.0.1:8080/" +
          "http://qcmsimage.shop:4000/" +
          element.filePath.substr(12).replaceAll("\\", "/");

        // 서버 컴퓨터 외부 파일 접근시
        // var tmpUrl =
        // "http://192.168.21.166:8080/" +
        // // "http://127.0.0.1:8080/" +
        //     element.filePath.substr(21).replaceAll("\\", "/");

        var tmp = element.filePath.split(".");

        var tmpFileData = {
          url: tmpUrl,
          fileId: element.id,
          fileName: { name: element.fileName },
          extension: tmp[1],
          mode: "old",
        };
        this.fileData.push(tmpFileData);
      });
    },

    // 파일 첨부 데이터 확인
    async AddfileData(event) {
      var files = event.target.files;

      var temp = await this.fileDataFun(files);

      temp.forEach((element) => {
        this.fileData.push(element);
      });
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
            var img = await {
              url: e.target.result,
              file: files[item],
              mode: "new",
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
    // 첨부파일 삭제
    delDown(item, index) {
      this.fileData.splice(index, 1);
    },
    // 첨부파일 다운로드
    downData(item) {
      if (item.mode === "old") {
        const a = document.createElement("a");
        // a.href = "../../assets" + item.url;
        a.href = item.url;
        a.download = item.fileName.name;
        a.click();
        a.remove();
      } else {
        var fileDownload = require("js-file-download");
        fileDownload(item.file, item.file.name);
      }
    },
  },
};
