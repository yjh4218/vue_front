<template>

  <div id="app">
    <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet">
    
      <sidebar-menu
      class="sidebar"
      :menu="menu"
      :collapsed="collapsed"
      @item-click="onItemClick"
      width="240px"
      @collapse="onCollapse"
      :hideToggle=true
      style="z-index:auto"
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
          title: "QC"
        },
        {
          href: "/main",
          title: "메인메뉴",
          icon: "fa fa-home",
        },
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
              icon: "fa fa-plus-circle"
            },
            {
              href: "/inspectSel",
              title: "입고 검수 조회",
              icon: "fa fa-list"
            }
          ]
        }
      ],
      collapsed: false,
      hideToggle: true
    };
  },
  methods: {
    onItemClick() {
      console.log("onItemClick");
    },
    onCollapse(c) {
      console.log("onCollapse");
      console.log(c);
      this.collapsed = c;
    }
  }
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
