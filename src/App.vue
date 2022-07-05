<template>
  <div id="app">
    <!-- <left-menu></left-menu> -->
    <sidebar-menu></sidebar-menu>
    <transition name="page">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
// import LeftMenu from "./components/menu/LeftMenu.vue";
import SidebarMenu from './components/menu/SidebarMenu.vue'

export default {
  name: "app",
  components: {
    // LeftMenu,
    SidebarMenu
  },
  data(){
    return{
      width:0,
      height:0
    }
  }
};
</script>
<style>
.body {
  position: fixed;
  margin-top: 20px;
  margin-left: 250px;
  margin-right: 250px;
  z-index: 1;
  width: calc(100% - 260px);
  height: 100%;
  overflow: auto;
   -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;  
    box-sizing: border-box; 
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
  width: 100%;
  height: 52vw;
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
