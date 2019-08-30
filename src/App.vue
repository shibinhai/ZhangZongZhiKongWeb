<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  .ivu-table{
    font-size: 14px;
  }
  .tool-box{
    position: relative;
    margin-bottom: 10px;
    line-height: 34px;
    height: 34px;
    background-color: #c2c2c2;
    border-radius: 5px;
    color: #ffffff;
    width: 160px;
    margin-left: 5px;
    text-align: center;
  }
  .tool-box .icon{
    border-radius: 5px;
    display: block;
    width: 40px;
    float: left;
  }
  .tool-box .icon:hover{
    background-color: #ccc;
  }
  .ivu-select-dropdown{
    width: 100px;
  }
  .title-left{
    margin-bottom: 10px;
  }
</style>
