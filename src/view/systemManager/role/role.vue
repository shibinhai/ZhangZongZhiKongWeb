<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
  .contant{
    background-color: #ffffff;
  }
  .modelText{
    font-size: 13px;
    line-height: 3;
  }
  .model-box-title{
    color: #575757;
    font-size: 30px;
    text-align: center;
    font-weight: 600;
    text-transform: none;
    position: relative;
    margin: 25px 0;
    padding: 0;
    line-height: 40px;
    display: block;
  }
  .model-box-p{
    color: #797979;
    font-size: 16px;
    font-weight: 300;
    position: relative;
    text-align: center;
    float: none;
    margin: 0;
    padding: 0;
    line-height: normal;
    display: block;
  }
</style>

<template>
  <div class="contant">
    <Button type="primary" @click="addUser = true">添加</Button>
    <Modal
      v-model="addUser"
      title="添加新的角色"
      @on-ok="ok"
      @on-cancel="cancel">
      <p class="modelText">角色名字</p>
      <Input v-model="userNmae" placeholder="角色名字"></Input>
      <p class="modelText">角色描述</p>
      <Input type="textarea" v-model="userDescription" placeholder="角色名字"/>
      <Tree style="margin-top: 20px"  @on-check-change="checked" ref="adminTree" :data="TreeMenu" show-checkbox multiple></Tree>
    </Modal>
    <!--<div class="title-right fr clearfix">-->
      <!--<Input class="fl" style="width: 150px" size="large" placeholder="搜索" />-->
      <!--<div class="tool-box fl clearfix">-->
        <!--<span class="icon"><i class="fa fa-refresh"></i></span>-->
        <!--<span class="icon"><i class="fa fa-list"></i></span>-->
        <!--<span class="icon">-->
          <!--<Dropdown class="icon" trigger="click">-->
            <!--<i class="fa fa-th"></i>-->
            <!--<DropdownMenu slot="list">-->
              <!--<DropdownItem></DropdownItem>-->
            <!--</DropdownMenu>-->
          <!--</Dropdown>-->
        <!--</span>-->
        <!--<Dropdown class="icon" trigger="click">-->
          <!--<i class="fa fa-share"></i>-->
          <!--<DropdownMenu slot="list">-->
            <!--<DropdownItem>JSON</DropdownItem>-->
            <!--<DropdownItem>XML</DropdownItem>-->
            <!--<DropdownItem>CSV</DropdownItem>-->
            <!--<DropdownItem>TEXT</DropdownItem>-->
            <!--<DropdownItem>SQL</DropdownItem>-->
            <!--<DropdownItem>MS-Excel</DropdownItem>-->
          <!--</DropdownMenu>-->
        <!--</Dropdown>-->
      <!--</div>-->
    <!--</div>-->
    <Table border size="small" style="width: 100%;margin-top: 20px" :columns="departmentQualityProblem" :data="departmentQualityProblemData">
      <template slot-scope="{ row }" slot="uuid">
        <template v-if="row.uuid === 'admin'">
          <Button @click="changeAdmin(row)" type="primary">修改权限</Button>
        </template>
        <template v-if="row.uuid !== 'admin'">
          <Button @click="changeAdmin(row)" type="primary">修改权限</Button>
          <Button type="error" @click="deleterole(row)">删除</Button>
        </template>
      </template>
    </Table>

    <Modal
      v-model="changeAdminModel"
      title="添加新的账号"
      @on-ok="changeAdminOk"
      @on-cancel="changeAdminCancel">
      <p class="modelText">角色名字</p>
      <Input v-model="changeUserNmae" placeholder="角色名字"></Input>
      <p class="modelText">角色描述</p>
      <Input type="textarea" v-model="changeUserDescription" placeholder="角色名字"/>
      <Tree style="margin-top: 20px"  @on-check-change="checked1" ref="ChangeadminTree" :data="ChangeTreeMenu" show-checkbox multiple></Tree>
    </Modal>
    <Modal
      v-model="deleteModel">
      <p class="model-box-title">你确定删除这条记录吗?</p>
      <p class="model-box-p">删除后将无法恢复，请谨慎操作！</p>
      <div slot="footer">
        <Button size="large" @click="deletecancel">取消</Button>
        <Button type="error" size="large" @click="deleteok">删除</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'role',
  data () {
    return {
      departmentQualityProblem: [
        {
          title: '角色名字',
          key: 'roleName',
          align: 'center'
        },
        {
          title: '角色描述',
          key: 'roleDescription',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'uuid',
          width: 200,
          align: 'center'
        }
      ],
      departmentQualityProblemData: [],
      addUser: false,
      userNmae: '',
      userDescription: '',
      menu: {},
      TreeMenu: [],
      itemList: [],
      menus: '',
      changeAdminModel: false,
      changeUserNmae: '',
      changeUserDescription: '',
      ChangeTreeMenu: [],
      Changemenus: '',
      ChangeId: '',
      deleteModel: false
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      let data = {
        limit: 10,
        offset: 1,
        order: 'asc',
        ordername: 'roleName'
      }
      this.axios.post('/emrqs/role/pagelist', data).then(retVal => {
        this.departmentQualityProblemData = retVal.data.list
      })
      this.axios.post('/emrqs/role/menulist').then(retVal => {
        this.menu = retVal.data
        for (var i = 0; i < retVal.data.length; i++) {
          if (retVal.data[i].parentUuid === 'root') {
            this.TreeMenu = this.TreeMenu.concat({
              title: retVal.data[i].menuName,
              menuUrl: retVal.data[i].menuUrl,
              uuid: retVal.data[i].uuid,
              checked: false
            })
          }
        }
        for (var z = 0; z < this.TreeMenu.length; z++) {
          if (this.TreeMenu[z].menuUrl === '#') {
            for (var y = 0; y < retVal.data.length; y++) {
              if (this.TreeMenu[z].uuid === retVal.data[y].parentUuid) {
                let list = []
                list = list.concat({
                  title: retVal.data[y].menuName,
                  menuUrl: retVal.data[y].menuUrl,
                  uuid: retVal.data[y].uuid,
                  parentUuid: retVal.data[y].parentUuid,
                  checked: false
                })
                this.itemList = this.itemList.concat(list)
              }
            }
            this.TreeMenu[z].children = this.itemList
            this.itemList = []
          }
        }
      })
    },
    ok () {
      var str5 = RegExp(/item-5/)
      var str9 = RegExp(/item-9/)
      var set5 = RegExp(/,5/)
      var set9 = RegExp(/,9/)
      if (this.menus.match(set5)) {
      } else {
        if (this.menus.match(str5)) {
          this.menus = this.menus + ',5'
        }
      }
      if (this.menus.match(set9)) {
      } else {
        if (this.menus.match(str9)) {
          this.menus = this.menus + ',9'
        }
      }
      let data = {
        roleName: this.userNmae,
        roleDesc: this.userDescription,
        menus: this.menus
      }
      if (this.userNmae === '' || this.userDescription === '' || this.menus === '') {
        this.$Message.error('请完整填写自字段！')
      } else {
        data = qs.stringify(data)
        this.axios.post('/emrqs/role/save', data, {
          header: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(retVal => {
          this.TreeMenu = []
          this.ChangeTreeMenu = []
          this.initData()
          this.userNmae = ''
          this.userDescription = ''
          this.menus = ''
          if (retVal.data === 1) {
            this.$Message.success('添加成功！')
          }
          if (retVal.data === -1) {
            this.$Message.error('添加失败！')
          }
        })
      }
    },
    cancel () {
      this.TreeMenu = []
      this.initData()
      this.$Message.info('取消操作！')
    },
    checked (res) {
      this.menus = ''
      for (var i = 0; i < res.length; i++) {
        if (i !== res.length - 1) {
          this.menus = this.menus + res[i].uuid + ','
        }
        if (i === res.length - 1) {
          this.menus = this.menus + res[i].uuid
        }
      }
    },
    checked1 (res) {
      this.Changemenus = ''
      for (var i = 0; i < res.length; i++) {
        if (i !== res.length - 1) {
          this.Changemenus = this.Changemenus + res[i].uuid + ','
        }
        if (i === res.length - 1) {
          this.Changemenus = this.Changemenus + res[i].uuid
        }
      }
    },
    changeAdmin (res) {
      console.log('TreeMenu', this.TreeMenu)
      this.ChangeId = res.uuid
      this.ChangeTreeMenu = this.TreeMenu
      this.changeUserNmae = res.roleName
      this.changeUserDescription = res.roleDescription
      let data = {
        roleId: res.uuid
      }
      data = qs.stringify(data)
      this.axios.post('/emrqs/role/role-hasmenu', data, {
        header: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(retVal => {
        console.log(retVal.data)
        this.changeAdminModel = true
        for (var i = 0; i < this.ChangeTreeMenu.length; i++) {
          for (var z = 0; z < retVal.data.length; z++) {
            if (this.ChangeTreeMenu[i].children !== undefined) {
              for (var x = 0; x < this.ChangeTreeMenu[i].children.length; x++) {
                if (retVal.data[z] === this.ChangeTreeMenu[i].children[x].uuid) {
                  this.ChangeTreeMenu[i].children[x].checked = true
                }
              }
            }
            if (this.ChangeTreeMenu[i].children === undefined) {
              if (retVal.data[z] === this.ChangeTreeMenu[i].uuid) {
                this.ChangeTreeMenu[i].checked = true
              }
            }
          }
        }
      })
    },
    deleterole (res) {
      this.deleteModel = true
      this.deleroleid = res.uuid
    },
    changeAdminOk () {
      var str5 = RegExp(/item-5/)
      var str9 = RegExp(/item-9/)
      var set5 = RegExp(/,5/)
      var set9 = RegExp(/,9/)
      if (this.Changemenus.match(set5)) {
      } else {
        if (this.Changemenus.match(str5)) {
          this.Changemenus = this.Changemenus + ',5'
        }
      }
      if (this.Changemenus.match(set9)) {
      } else {
        if (this.Changemenus.match(str9)) {
          this.Changemenus = this.Changemenus + ',9'
        }
      }
      let data = {
        uuid: this.ChangeId,
        roleName: this.changeUserNmae,
        roleDesc: this.changeUserDescription,
        menus: this.Changemenus
      }
      data = qs.stringify(data)
      this.axios.post('/emrqs/role/update', data, {
        header: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(retVal => {
        this.ChangeTreeMenu = []
        this.TreeMenu = []
        this.initData()
        this.changeUserNmae = ''
        this.changeUserDescription = ''
        this.menus = ''
        if (retVal.data === 1) {
          this.$Message.success('修改成功！')
        }
        if (retVal.data === -1) {
          this.$Message.error('修改失败！')
        }
      })
    },
    changeAdminCancel () {
      this.$Message.info('操作取消！')
      for (var i = 0; i < this.ChangeTreeMenu.length; i++) {
        if (this.ChangeTreeMenu[i].children !== undefined) {
          for (var x = 0; x < this.ChangeTreeMenu[i].children.length; x++) {
            this.ChangeTreeMenu[i].children[x].checked = false
          }
        }
        if (this.ChangeTreeMenu[i].children === undefined) {
          this.ChangeTreeMenu[i].checked = false
        }
      }
    },
    deleteok () {
      let data = {
        uuid: this.deleroleid
      }
      data = qs.stringify(data)
      this.axios.post('/emrqs/role/delete', data, {
        header: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(retVal => {
        this.deleteModel = false
        this.initData()
        this.$Message.success('操作成功！')
      })
    },
    deletecancel () {
      this.$Message.info('取消操作！')
      this.deleteModel = false
    }
  }
}
</script>
