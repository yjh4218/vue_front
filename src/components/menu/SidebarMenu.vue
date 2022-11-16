<template>
  <div id="app">
    <link
      href="https://use.fontawesome.com/releases/v5.0.6/css/all.css"
      rel="stylesheet"
    />

    <sidebar-menu
      class="sidebar"
      :collapsed="collapsed"
      :menu="menu"
      @item-click="onItemClick"
      width="300px"
      @collapse="onCollapse"
      style="z-index: auto"
    />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      menu: [
        {
          header: true,
          title: "QC Page",
          hiddenOnCollapse: true,
        },
        // {
        //   href: "/userLogin",
        //   title: "로그인",
        //   icon: "fa fa-home",
        // },
        // {
        //   href: "/main",
        //   title: "메인메뉴",
        //   icon: "fa fa-home",
        // },
        {
          title: "상품 관리",
          icon: "fa fa-archive",
          child: [
            {
              href: "/productIn",
              title: "신규상품 등록",
              icon: "fa fa-plus-circle",
            },
            {
              href: "/productSel",
              title: "상품 조회",
              icon: "fa fa-list",
            },
          ],
        },
        {
          title: "입고 검수 관리",
          icon: "fa fa-check-square",
          child: [
            {
              href: "/inspectIn",
              title: "입고 검수 등록",
              icon: "fa fa-plus-circle",
            },
            {
              href: "/inspectSel",
              title: "입고 검수 조회",
              icon: "fa fa-list",
            },
          ],
        },
        {
          title: "제조사 관리",
          icon: "fa fa-industry",
          child: [
            {
              href: "/makerIn",
              title: "제조사 등록",
              icon: "fa fa-plus-circle",
            },
            {
              href: "/makerSel",
              title: "제조사 조회",
              icon: "fa fa-list",
            },
          ],
        },
        {
          title: "클레임 관리",
          icon: "fa fa-user-plus",
          child: [
            {
              href: "/claimIn",
              title: "클레임 등록",
              icon: "fa fa-plus-circle",
            },
            {
              href: "/claimSel",
              title: "클레임 조회",
              icon: "fa fa-list",
            },
          ],
        },
        {
          title: "판매량 관리",
          icon: "fa fa-money",
          child: [
            {
              href: "/salesIn",
              title: "판매량 등록",
              icon: "fa fa-plus-circle",
            },
            {
              href: "/salesSel",
              title: "판매량 조회",
              icon: "fa fa-list",
            },
            {
              href: "/salesUp",
              title: "판매량 수정 및 삭제",
              icon: "fa fa-minus-circle",
            },
            {
              href: "/salesProductIn",
              title: "판매 제품 등록",
              icon: "fa fa-archive",
            },
            {
              href: "/salesProductSel",
              title: "판매 제품 조회",
              icon: "fa fa-list",
            },
          ],
        },
      ],
    };
  },
  props:{
      collapsed: {
        type: Boolean,
        default: true,
      },
  },
  methods: {
    onItemClick() {
      console.log("onItemClick");
    },
    onCollapse(c) {
      console.log("onCollapse");
      console.log(c);
      // this.collapsed = c;
    },
  },
};
</script>

<style>
.sidebar.v-sidebar-menu .vsm-arrow:after {
  content: "\f105";
  font-family: "FontAwesome";
}
.sidebar.v-sidebar-menu .collapse-btn:after {
  content: "\f07e";
  font-family: "FontAwesome";
}
</style>