<template>
  <div id="app">
    <left-menu></left-menu>
    <transition name="page">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import LeftMenu from "./components/menu/LeftMenu.vue";

export default {
  name: "app",
  components: {
    LeftMenu,
  },
};
</script>
<style>
.body {
  position: fixed;
  margin-top: 20px;
  margin-left: 220px;
  width: 80vw;
  height: 100%;
}
.divInsert{
  height: 80%;
}
.spanSel {
  font-family: "Nanum Gothic", sans-serif;
}
.btnSel {
  margin-left: 4px;
  background: skyblue;
}
.title {
  padding-bottom: 10px;
  font-size: 20px;
}
table {
  margin-top: 5px;
  width: 100%;
  border: 2px solid black;
}
td,
th {
  border: 1px solid black;
  padding: 5px;
  border-collapse: collapse;
  background-clip: padding-box;
}
tr:hover {
  background-color: coral;
}
/* router transition */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
.tableCss {
  text-align: center;
  height: 750px;
  overflow: auto;
}
.input-group-text {
  height: 100%;
}
.chkBoxGroup {
  display: inherit;
  text-align: center;
  margin: 8px;
}
</style>
