<template>
  <div id="app">
    <Mhead></Mhead>
    <Mtab></Mtab>
    <router-view/>
  </div>
</template>

<script>
import Mhead from "./components/mhead"
import Mtab from "./components/mtab"
export default {
  name: 'App',
  components:{
     Mhead,Mtab
  }
}
</script>

<style>
#app {

}
 .yd-list-theme4 .yd-list-item .yd-list-img{ width: 1.2rem; padding:0; height:auto; }
  .yd-list-theme5 .yd-list-item .yd-list-img{  padding:0; height:auto; }
  .yd-list-theme5 .yd-list-item{ padding:0; }
  .yd-list-theme5 .yd-list-item .yd-list-mes {padding-left:0.2rem; padding-right:0.2rem;}
 .yd-list-img img{margin-top:0;}
 .yd-list-theme4{ background: 0 none; }
.mhead .yd-list-img img, .mhead .yd-list-mes{background:0 none;}
.mhead .yd-list-other,.mhead .yd-list-title{ color: #fff; }
.yd-scrolltab-title{ font-size:0.2rem; font-weight: 700; }
.yd-scrolltab-content-title{ font-size:0.2rem; }
.yd-tab-nav .yd-tab-active:before{ background: 0 none; }
.yd-scrolltab-item{height:0.95rem;}
.popupcon .yd-navbar-item{font-size:0.25rem;}
.popupcon .yd-navbar-item:last-child{color:red;}
.popupcon .yd-list-theme4 .yd-list-item .yd-list-img{ width: auto; padding:0; }
.yd-popup-bottom {
 
    bottom: 0.8rem;
    padding-bottom: 0.4rem;}

    .yd-popup-show {
    
    }
.yd-popup-right .yd-popup-content{ padding-bottom:2rem; }
</style>
