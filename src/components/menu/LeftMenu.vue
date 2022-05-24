<template>

  <div>
    <div class='left'>
      <ul>
        <li id='logo'>
          <div>
            <router-link to="/main">상품실 품질관리팀</router-link>
          </div>
        </li>
        <li id = 'catalogue'>
          제품 관리
          <div>
            <router-link to="/productIn">신규 제품 등록</router-link>
          </div> 
          <div>
            <router-link to="/productSel">제품 조회</router-link>
          </div> 
          <div>
            <router-link to="/productDel">제품 삭제</router-link>     
          </div>
          <div>
            <router-link to="/productUp">제품 정보 수정</router-link>
          </div>  
        </li>
        <li id = 'catalogue'>
          제품 판매량 관리
          <div>
            <router-link to="/incomingIn">입고 검수 등록</router-link>
          </div> 
          <div>
            <router-link to="/incomingSel">입고 검수 조회</router-link>
          </div> 
          <div>
            <router-link to="/incomingDel">입고 검수 삭제</router-link>     
          </div>
          <div>
            <router-link to="/incomingUp">입고 검수 수정</router-link>
          </div>  
        </li>
        <li id = 'catalogue'>
          제조사 관리
          <div>
            <router-link to="/incomingIn">입고 검수 등록</router-link>
          </div> 
          <div>
            <router-link to="/incomingSel">입고 검수 조회</router-link>
          </div> 
          <div>
            <router-link to="/incomingDel">입고 검수 삭제</router-link>     
          </div>
          <div>
            <router-link to="/incomingUp">입고 검수 수정</router-link>
          </div>  
        </li>
        <li id = 'catalogue'>
          입고 검수 관리
          <div>
            <router-link to="/incomingIn">입고 검수 등록</router-link>
          </div> 
          <div>
            <router-link to="/incomingSel">입고 검수 조회</router-link>
          </div> 
          <div>
            <router-link to="/incomingDel">입고 검수 삭제</router-link>     
          </div>
          <div>
            <router-link to="/incomingUp">입고 검수 수정</router-link>
          </div>  
        </li>
        <li id = 'catalogue'>
          클레임 관리
          <div>
            <router-link to="/incomingIn">입고 검수 등록</router-link>
          </div> 
          <div>
            <router-link to="/incomingSel">입고 검수 조회</router-link>
          </div> 
          <div>
            <router-link to="/incomingDel">입고 검수 삭제</router-link>     
          </div>
          <div>
            <router-link to="/incomingUp">입고 검수 수정</router-link>
          </div>  
        </li>
      </ul>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
        width : 0
    }
  },
  methods: {
    resize: function () {
      window.resize(function () {
        this.width = (window.innerHeight / 2) + 'px'
        // $('#left_btn').css({'top': height})
      })
    },
    
  },
  mounted() {
        // console.log("ready...");
        window.addEventListener('resize', this.handleResize);
	},
  // created () {
  //   this.resize()
  // }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap');

  a{
    color:black;
    text-decoration: none;
  }

  a:hover{
    color:rgb(154, 97, 189);
    text-decoration: underline;
  }
  .left{
    position:fixed; 
    top:0px; 
    left:0px; 
    min-width: 200px;
    /* max-width: 250px; */
    /* width:20vw;  */
    height:1000px; 
    background:rgba(98, 205, 255, 0.6); 
    padding:40px 0; 
    overflow: hidden;
    /* text-decoration: underline; */
  }
  .left ul {padding: 0 30px,}
  .left ul li { font: size 20px;  height:75px; font-family: 'Nanum Gothic', sans-serif;} 
  /* .left ul li#logo {font-family: 'Passion One', cursive; font-size:3vw; font-size:x-large; height:170px;}
  .left ul li#logo div {line-height: 0.8} */
  .left ul li#catalogue {font-size:15px; height:170px;}
  .left ul li#catalogue div {line-height: 0.8; font-size: 19px; padding: 5px;}
  .left ul li#company {font-size:1vw; margin-top:150px; }
  #left_btn {position:fixed; top:495px; left:-60px; cursor:pointer}
</style>