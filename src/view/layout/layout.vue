<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
  .layout-con{
    height: 100%;
    width: 100%;
  }
  .menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }
  .menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
  .collapsed-menu span{
    width: 0;
    transition: width .2s ease;
  }
  .collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
  .layout{
    opacity: 1;
  }
  .left-menu{
    i{
      width: 12px;
      text-align: center;
      font-size: 12px;
    }
  }
  .left-top{
    text-align: center;
    padding: 33px 25px;
    background-color: #223444;
    margin-bottom: 20px;
    .user_text{
      color: #ffffff;
      font-size: 16px;
    }
  }
  .icon_userHead{
    margin: 0 auto;
  }
  .contant{
    padding: 10px 60px;
    position: relative;
    top: -10px;
  }
</style>

<template>
  <div class="layout">
    <!--<Layout :style="{minHeight: '100vh'}">-->
      <top-title></top-title>
      <div class="contant">
        <router-view></router-view>
      </div>
    <p style="position: fixed;bottom: 15px;text-align: center;margin: 0 auto;display: block;">copyright?2007 www.spph-sx.com All Rights Reserved 陕西省人民医院版权所有</p>
    <!--</Layout>-->
  </div>
</template>
<script>
import TopTitle from './TopTitle.vue'
export default {
  name: 'layout',
  components: {
    TopTitle
  }
}
</script>
