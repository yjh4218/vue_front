export const imageMixin = {
  data() {
    return {
      imgElement: "",
      imgUpdateFlag: false,
      imgFlag: false,
      imgFiles: [],
      imgFileList: [],
      formData: new FormData(),
    };
  },
  methods: {
    // 클레임 상세 정보 이미지 파일 지정
    imgUpdate(image, sel) {
      this.imgUpdateFlag = true;

      image.forEach((x) => {
        var tempImg = "";

        // 외부 서버 이용시
        if (sel === "file") {
          tempImg =
            "http://qcmsimage.shop:4000/" +
            // "http://127.0.0.1:8080/" +
            x.filePath.substr(12).replaceAll("\\", "/");
        } else {
          // var tempImg = x.imgFilePath.substr(27).replaceAll("\\", "/");
          tempImg =
            "http://qcmsimage.shop:4000/" +
            // "http://127.0.0.1:8080/" +
            x.imgFilePath.substr(12).replaceAll("\\", "/");
        }

        this.imgFiles.push({ url: tempImg, imgId: x.id, mode: "old" });
      });
    },

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
    },
  },
};
