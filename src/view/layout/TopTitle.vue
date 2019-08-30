<style type="text/scss" lang="scss" scoped>
.topMenu{
  min-width: 1024px;
  .leftTitle{
    .refresh{
      font-size: 14px;
      z-index: 11;
      position: absolute;
      right: 250px;
      top: 14px;
      border: none;
    }
    .refresh1{
      font-size: 14px;
      z-index: 11;
      position: absolute;
      right: 120px;
      top: 14px;
      border: none;
    }
    .exit{
      font-size: 14px;
      z-index: 11;
      position: absolute;
      right: 20px;
      top: 14px;
      border: none;
    }
  }
  .left-menu{
    background-color: transparent;
  }
  .layout{
    position: relative;
    top: -27px;
    width: 430px;
    margin: 0 auto;
  }
  .top-img{
    text-align: center;
    width: 100%;
    min-width: 1024px;
  }
  .logo-text{
    line-height: 60px;
    font-size: 17px;
    margin-left: 50px;

  }
}
.title{
  font-size: 17px;
  line-height: 25px;
  margin: 10px 0;
}
.text{
  font-size: 15px;
}
</style>
<style>
  .ivu-menu-horizontal .ivu-menu-item, .ivu-menu-horizontal .ivu-menu-submenu{
    padding: 0 15px;
  }
</style>
<template>
  <div class="topMenu">
    <img src="./img.jpg" class="top-img" alt="" height="230px">
    <div class="layout clearfix">
      <!--<span class="fl logo-text" style="margin-right: 150px">智能病历质量管理系统</span>-->
      <div>
        <Menu
          active-name="home"
          theme="light" width="auto"
          :class="menuitemClasses"
          mode="horizontal"
          class="left-menu"
          :accordion='true'>
          <template v-for="(menus,index) in menu">
            <Submenu :name='menus.uuid' :key="menus.id" v-if="menus.menuUrl === '#'">
              <template slot="title">
                <i class="fa" :class="[menus.className]"></i>
                {{menus.menuName}}
              </template>
              <template v-for="(lists, number) in list" v-if="menus.uuid === lists.parentUuid &&lists.parentUuid !== 'root'">
                <router-link :to="`/` + lists.menuUrl" :key="number">
                  <MenuItem :name='lists.uuid' style="padding-left: 40px">
                    <i class="fa" :class="[lists.className]" :key="number"></i>
                    {{lists.menuName}}
                  </MenuItem>
                </router-link>
              </template>
            </Submenu>
            <router-link :to='`/` + menus.menuUrl' :key="index">
              <MenuItem :name='menus.uuid' v-if="menus.parentUuid === 'root' && menus.menuUrl !== '#'">
                <i class="fa" :class="[menus.className]" :key="index"></i>
                {{menus.menuName}}
              </MenuItem>
            </router-link>
          </template>
        </Menu>
      </div>
    </div>
    <div style="width: 100%;height: 1px;background-color: #DCDEE2;position: relative;top:-28px"></div>
    <div class="leftTitle fr">
      <!--<Button type="primary" class="refresh" @click="refresh">更新数据</Button>-->
      <!--<Button type="primary" class="refresh1" @click="refresh">同步医生账号</Button>-->
      <Button type="primary" class="refresh1"  @click="modal1 = true">帮助</Button>
      <Button type="primary" class="exit" @click="exit">退出登录</Button>
    </div>
    <Modal
      title="提示"
      v-model="modal1"
      @on-ok="ok"
      @on-cancel="cancel"
      width="700px"
      center>
      <p class="title">操作指南</p>
      <p class="text"> 说明：账号登陆后，页面上方科室栏默认显示为本科室名称，日期栏默认显示为当前日期</p>
      <p class="title">数据填报与修改</p>
      <p class="text">1、登陆系统后默认显示“护理工作量”统计填报页面，在相应的护理工作项目后填写数值，点击页面下方的“确认”按键，即可保存当前填写数值</p>
      <p class="text">2、若要修改其他日期的护理工作项目数值，请点击日期栏，选择相应日期，数值修改后，点击“确认”即可保存</p>
      <p class="text">3、其他工作量统计页面：若要进行其他工作统计（如：中医护理治疗服务），请在页面上方“护理统计”菜单处选择相应工作量统计菜单</p>
      <p class="text">4、其他工作量统计数据填报与“护理工作量”统计填报操作相同</p>
      <p class="title">工作量表格导出</p>
      <p class="text">点击页面上方“导出”按键，会弹出3类工作量统计表的菜单，点击相应菜单，浏览器会弹出对话框，设置好下载路径（建议设置为电脑桌面固定文件夹），点击下载即可完成导出操作</p>
      <p class="title">注意事项</p>
      <p class="text">1、科室栏默认显示为本科室名称，选择其他科室无效</p>
      <p class="text">2、中医护理治疗项目的添加：请将需添加的项目上报护理部，由护理部进行添加</p>
      <p class="text">3、使用导出功能时，请在“护理工作量”或“中医护理治疗服务”页面下操作</p>
      <span slot="footer" class="dialog-footer">
          <Button @click="centerDialogVisible = false">取 消</Button>
          <Button type="primary" @click="centerDialogVisible = false">确 定</Button>
        </span>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'top-title',
  data () {
    return {
      isCollapsed: false,
      menu: {
        menuUrl: ''
      },
      list: {
        menuUrl: ''
      },
      modal1: false
    }
  },
  computed: {
    menuitemClasses: function () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  mounted () {
    this.menuInit()
  },
  methods: {
    refresh () {
      this.$router.go(0)
    },
    menuInit () {
      this.axios.post('/emrqs/role/menu').then(retVal => {
        this.menu = retVal.data
        this.menu.menuUrl = retVal.data.menuUrl
        this.list = retVal.data
        this.list.menuUrl = retVal.data.menuUrl
      }).catch(retVal => {
        this.$router.push('/')
        this.$Message.error('请登录！')
      })
    },
    exit () {
      this.axios.post('/emrqs/admin/quit').then(retVal => {
        console.log(retVal)
        this.$router.push('/login')
      })
    },
    ok () {
    },
    cancel () {
    }
  }
}
</script>
