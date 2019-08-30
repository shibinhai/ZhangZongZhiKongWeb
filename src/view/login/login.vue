<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
.contant{
  text-align: center;
  width: 100vw;
  .title{
    padding-top: 60px;
    font-family: Helvetica,Arial,"Microsoft YaHei",FreeSans,Arimo,"Droid Sans","wenquanyi micro hei","Hiragino Sans GB","Hiragino Sans GB W3",FontAwesome,sans-serif;
    color: #000000;
    font-weight: bold;
    font-size: 35px;
    text-align: center;
    width: 100%;
    margin-bottom: 5rem;
    span{
      display: block;
      color: #1ab394;
      font-weight: bold;
      font-size: 35px;
      text-align: center;
    }
  }
  .loginBox{
    width: 540px;
    max-width: 540px!important;
    margin: 0 auto;
    padding-top: 3rem;
    .inputLogin{
      margin-bottom: 0px!important;
    }
    input{
      background-color: #FFF;
      border: 1px solid #e5e6e7;
      border-radius: 1px;
      display: block;
      padding: 6px 12px;
      -webkit-transition: border-color .15s ease-in-out 0s,box-shadow .15s ease-in-out 0s;
      transition: border-color .15s ease-in-out 0s,box-shadow .15s ease-in-out 0s;
      width: 100%;
      font-size: 14px;
    }
    input:focus{
      border-style:solid;
      border-color: #17B194;
      outline:none;
    }
    .loginInputUser{
      height: 2.5rem;
      -webkit-border-top-left-radius: 5px;
      -moz-border-top-left-radius: 5px;
      border-top-left-radius: 5px;
      -webkit-border-top-right-radius: 5px;
      -moz-border-top-right-radius: 5px;
      border-top-right-radius: 5px;
    }
    .loginInputPassword{
      height: 2.5rem;
      -webkit-border-bottom-left-radius: 5px;
      -moz-border-bottom-left-radius: 5px;
      border-bottom-left-radius: 5px;
      -webkit-border-bottom-right-radius: 5px;
      -moz-border-bottom-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
    .register{
      display: block;
      position: relative;
      top: -20px;
    }
    .login-btn{
      display: block;
      margin-top: 1rem;
      height: 2.7rem;
      line-height: 2.7rem;
      width: 100%;
      background-color: #1ab394;
      border-color: #1ab394;
      color: #FFF;
      border-radius: 3px;
      font-size: 18px;
    }
  }
  .login-font{
    font-size: 12px;
    font-family: "wenquanyi micro hei","Hiragino Sans GB","Hiragino Sans GB W3",FontAwesome,sans-serif;
    width: 100%;
    color: white;
    text-align: center;
    padding: 20px 0;
    padding-top: 5rem;
  }
}
</style>

<template>
  <div class="contant">
    <!--<img src="../layout/www.png" style="width: 100%;min-width: 1200px;position: absolute;top: 0;left: 0;z-index: -1" alt="">-->
    <img src="../layout/img.jpg" style="width: 100%;min-width: 1200px;position: absolute;top: 0;left: 0;z-index: -1" alt="">
    <div class="loginBox" style="margin-top: 200px">
      <div class="title">
        <!--医院电子病历质量管理系统-->
        <!--<span> Login<i class="fa fa-users"></i></span>-->
      </div>
      <div class="inputLogin">
        <input class="loginInputUser" v-model="userName"  placeholder="用户名" />
      </div>
      <div class="inputLogin">
        <input class="loginInputPassword" v-model="passWord" placeholder="密码" @keyup.enter="login" type="password"/>
      </div>
      <a class="login-btn" type="primary" @click="login1()">登录</a>
    </div>
    <!--<div class="login-font">-->
        <!--<span> 系统版本:V1.0 开发:北峰数据-->
            <!--<br>-->
            <!--[按F11键全屏切换] 推荐使用：Chrome浏览器下载-->
            <!--<a href="https://pan.baidu.com/s/1xCIm22xwzcfT7pVyjL0feA" target="_blank">[64 Bit]</a>-->
            <!--<a href="https://pan.baidu.com/s/1E52D86qAVTwI6Vq6ZjSJ_Q" target="_blank">[32 Bit]</a>-->
        <!--</span>-->
    <!--</div>-->
    <!--<p style="margin-top: 180px;font-size: 15px"> copyright?2007 www.spph-sx.com All Rights Reserved 陕西省人民医院版权所有</p>
    <p style="font-size: 15px">地 址：西安市友谊西路256号 | 邮 编：710068 电 话：029-85251331 </p>
    <p style="font-size: 15px">传 真： 029-85236987  |  E-mail:spphyzxx@163.com  | 备案/许可证号：陕ICP备05003741号-1</p>-->
    <p style="margin-top: 180px;font-size: 15px">陕西省病案质量控制中心主管&nbsp;&nbsp;&nbsp;&nbsp;西安北峰网络信息技术有限公司提供技术支持</p>
    <p style="font-size: 15px">技术支持电话：029-89661037&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;邮箱：1307372096@qq.com</p>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'login',
  data () {
    return {
      title: '才华有限公司',
      userName: '',
      passWord: ''
    }
  },
  mounted () {
    this.initData()
    // this.getCookie()
  },
  methods: {
    initData () {
      // this.login()
    },
    login () {
      this.$post('/emrqs/admin/login', {
        header: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(retVal => {
        console.log(retVal)
        if (retVal[0].id === '自动登录失败') {
          this.$Message.warning(retVal[0].id)
        } else {
          if (retVal[0].menuUrl === '#') {
            this.$router.push({ path: retVal[1].menuUrl })
          } else {
            this.$router.push({ path: retVal[0].menuUrl })
          }
          console.log('success')
        }
      }).catch(retVal => {
        this.router.push('/')
      })
    },
    login1 () {
      let data = {
        adminEmail: this.userName,
        adminPwd: this.passWord
      }
      data = qs.stringify(data)
      // var url = 'http://47.93.226.71/emrqs/admin/login'
      // this.$post('/emrqs/admin/login', {
      this.$post('/emrqs/admin/login', data, {
        header: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(retVal => {
        if (retVal[0].id === '密码错误') {
          console.log('123')
          this.$Message.warning(retVal[0].id)
        } else {
          if (retVal[0].menuUrl === '#') {
            this.$router.push({ path: retVal[1].menuUrl })
          } else {
            // this.$Message.success('登录成功！')
            this.$router.push({ path: retVal[0].menuUrl })
          }
          console.log('success')
        }
      }).catch(retVal => {
        this.router.push('/')
      })
    }
  }
}
</script>
