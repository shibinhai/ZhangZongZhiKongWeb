<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
  .contant{
    background-color: #ffffff;
  }
  .imgshow{
    overflow-x:hidden;
    overflow-y:auto;
  }
</style>

<template>
  <div class="contant">
    <form style="margin: 0 auto;text-align: center" action="http://127.0.0.1:9502/emrqs/tran/tran" method="post" enctype="multipart/form-data">
    <!--<form style="margin: 0 auto;text-align: center" action="http://127.0.0.1:9502/emrqs/data/up" method="post" enctype="multipart/form-data">-->
    <!--<form style="margin: 0 auto;text-align: center" action="http://192.168.9.120:9555/emrqs/data/up" method="post" enctype="multipart/form-data">-->
      <input type="file" name="filename" />
      <Input type="submit" value="生成模板" style="width: 120px" />
    </form>
    <form style="margin: 0 auto;text-align: center" action="http://127.0.0.1:9502/emrqs/data/up" method="post" enctype="multipart/form-data">
      <!--<form style="margin: 0 auto;text-align: center" action="http://127.0.0.1:9502/emrqs/data/up" method="post" enctype="multipart/form-data">-->
      <!--<form style="margin: 0 auto;text-align: center" action="http://192.168.9.120:9555/emrqs/data/up" method="post" enctype="multipart/form-data">-->
      <input type="file" name="filename" />
      <Input type="submit" value="上报数据检测" style="width: 120px" />
    </form>
    <!--<div style="width: 700px;height: 400px;margin: 0 auto" class="imgshow">
      <img src="./img1.png" style="margin: 0 auto" alt="">
      <img src="./img2.png" style="margin: 0 auto" alt="">
      <img src="./img3.png" style="margin: 0 auto" alt="">
      <img src="./img4.png" style="margin: 0 auto" alt="">
      <img src="./img5.png" style="margin: 0 auto" alt="">
      <img src="./img6.png" style="margin: 0 auto" alt="">
    </div>-->
  </div>
</template>

<script>
export default {
  name: 'casemanager',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
