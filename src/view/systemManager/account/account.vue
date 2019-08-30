<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
  .contant{
    background-color: #ffffff;
  }
  .modalText{
    font-size: 14px;
    line-height: 2.7;
  }
</style>

<template>
  <div class="contant">
    <div class="contant">
      <Button type="primary" @click="addAdmin">添加</Button>
      <Modal
        v-model="addAdminModel"
        title="添加新的账号">
        <p class="modalText">账号名字</p>
        <Input v-model="userName" placeholder="账号名字"/>
        <p class="modalText">登录帐号</p>
        <Input v-model="userEmail" placeholder="登录帐号"/>
        <p class="modalText">账号登录密码</p>
        <Input v-model="userPassword" placeholder="账号登录密码"/>
        <div style="margin-top: 10px">
          <span class="modalText">选择角色</span>
          <Select v-model="checkAddRole" style="width:200px">
            <Option v-for="item in changeRole" :value="item.id" @click.native="SelectRole(item)" :key="item.value">{{ item.name }}</Option>
          </Select>
        </div>
        <div style="margin-top: 10px">
          <span class="modalText">选择科室</span>
          <Select v-model="checkoffice" filterable style="width:200px">
            <Option v-for="item in office" :value="item.office" :key="item.office">{{ item.office }}</Option>
          </Select>
        </div>
        <div slot="footer">
          <Button @click="cancelAdd">取消</Button>
          <Button type="primary" @click="okAdd">确定</Button>
        </div>
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
      <Table border size="small" style="width: 100%;margin-top: 20px" :columns="departmentQualityProblem" :data="adminList">
        <template slot-scope="{ row }" slot="problemProportion">
          <Button type="warning" @click="resetPassword(row)">重置密码</Button>
          <template v-if="row.roleUuid !== 'admin'">
            <Button type="primary" @click="openChangeAdmin(row)">修改角色</Button>
            <Button type="error" @click="deleteAdmin(row)">删除</Button>
          </template>
        </template>
      </Table>
      <Page style="margin-top: 20px" :total="adminListPage.pageNum" :current.sync="pageth"
            @on-change="goPage(pageth)"/>
      <Modal
        v-model="resetPass"
        title="重置登录密码">
        <p class="modalText">输入新密码</p>
        <Input v-model="newPassWord" placeholder="新密码"/>
        <p class="modalText">再次输入新密码</p>
        <Input v-model="againNewPassWord" placeholder="再次输入新密码"/>
        <div slot="footer">
          <Button type="primary" @click="ok">确定</Button>
        </div>
      </Modal>
      <Modal
        v-model="changeAdmin"
        title="修改账号信息">
        <p class="modalText">账号名字</p>
        <Input disabled  v-model="adminName" placeholder="新密码"/>
        <p class="modalText">登录帐号</p>
        <Input disabled  v-model="adminEmail" placeholder="再次输入新密码"/>
        <div style="margin-top: 10px">
          <span class="modalText">选择标签角色</span>
          <Select v-model="checkRole" style="width:200px">
            <Option v-for="item in changeRole" :value="item.id" :key="item.value">{{ item.name }}</Option>
          </Select>
        </div>
        <div slot="footer">
          <Button type="primary" @click="okAdmin">修改</Button>
        </div>
      </Modal>
      <Modal
        v-model="deteModel"
        title="删除当前账号">
        <p class="modalText">账号名称: {{ deteName }}</p>
        <h2>确认删除该帐号？</h2>
        <div slot="footer">
          <Button type="error" @click="okDelete">确定</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'account',
  data () {
    return {
      departmentQualityProblem: [
        {
          title: '名字',
          key: 'adminName'
        },
        {
          title: '登录帐号',
          key: 'adminEmail'
        },
        {
          title: '角色',
          key: 'roleName'
        },
        {
          title: '创建时间',
          key: 'createTime'
        },
        {
          title: '操作',
          slot: 'problemProportion',
          width: 270,
          align: 'center'
        }
      ],
      adminList: [],
      resetPass: false,
      newPassWord: '',
      againNewPassWord: '',
      uuid: '',
      changeAdmin: false,
      adminName: '',
      adminEmail: '',
      changeRole: [],
      checkRole: '',
      deleteUuid: '',
      deteModel: false,
      deteName: '',
      addAdminModel: false,
      userName: '',
      userEmail: '',
      userPassword: '',
      office: [],
      checkAddRole: '',
      roleUuid: '',
      roleName: '',
      checkoffice: '',
      pageth: 1,
      adminListPage: {}
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
        ordername: 'adminName'
      }
      this.axios.post('/emrqs/admin/pagelist', data).then(retVal => {
        this.adminList = retVal.data.list
        this.adminListPage = retVal.data
        console.log(this.adminListPage.pageNum)
      }).catch(retVal => {
      })
      this.axios.post('/emrqs/role/roleList').then(retVal => {
        this.changeRole = retVal.data
      })
      this.axios.post('/emrqs/common/search-cond', data).then(retVal => {
        this.office = retVal.data
      })
    },
    resetPassword (res) {
      this.resetPass = true
      this.uuid = res.uuid
    },
    ok () {
      if (this.newPassWord !== this.againNewPassWord) {
        this.$Message.error('两次密码输入不一致！')
        this.resetPass = true
      }
      if (this.newPassWord === this.againNewPassWord) {
        let data = {
          uuid: this.uuid,
          adminPwd: this.newPassWord
        }
        data = qs.stringify(data)
        this.axios.post('/emrqs/admin/resetpwd', data, {
          header: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(retVal => {
          this.$Message.success('操作成功！')
          this.resetPass = false
        })
      }
    },
    cancel () {
      this.$Message.info('取消操作！')
      this.resetPass = false
    },
    openChangeAdmin (res) {
      this.roleId = res.uuid
      this.adminName = res.adminName
      this.adminEmail = res.adminEmail
      this.changeAdmin = true
    },
    okAdmin () {
      this.$Message.success('操作成功！')
      this.changeAdmin = false
      var data = {
        uuid: this.roleId,
        roleUuid: this.checkRole
      }
      this.axios.post('/emrqs/admin/update', data).then(retVal => {
        console.log(retVal)
        this.initData()
      })
    },
    cancelAdmin () {
      this.$Message.success('操作取消！')
      this.changeAdmin = false
    },
    deleteAdmin (res) {
      this.deteModel = true
      this.deteName = res.adminName
      this.deleteUuid = res.uuid
    },
    okDelete () {
      let data = {
        uuid: this.deleteUuid
      }
      data = qs.stringify(data)
      this.axios.post('/emrqs/admin/delete', data, {
        header: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(retVal => {
        this.$Message.success('操作成功！')
        this.deteModel = false
        this.initData()
      })
    },
    cancelDelete () {
      this.$Message.info('操作取消！')
    },
    addAdmin () {
      this.addAdminModel = true
    },
    okAdd () {
      if (this.userName === '' || this.userEmail === '' || this.userPassword === '' || this.roleName === '') {
        this.$Message.error('请输入完整信息！')
      } else {
        let data = {
          adminName: this.userName,
          adminEmail: this.userEmail,
          adminPwd: this.userPassword,
          roleUuid: this.checkAddRole,
          roleName: this.roleName,
          office: this.checkoffice
        }
        data = qs.stringify(data)
        this.axios.post('/emrqs/admin/save', data, {
          header: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(retVal => {
          this.initData()
          this.$Message.success('操作成功！')
          this.addAdminModel = false
          this.userName = ''
          this.userEmail = ''
          this.userPassword = ''
          this.checkAddRole = ''
          this.roleName = ''
        })
        this.addAdminModel = false
      }
    },
    cancelAdd () {
      this.addAdminModel = false
    },
    SelectRole (res) {
      this.roleName = res.label
      this.roleUuid = res.value
    },
    goPage (pageth) {
      console.log(pageth)
      let data = {
        limit: 10,
        offset: 1,
        order: 'asc',
        pageSize: 9,
        pageth: pageth,
        ordername: 'adminName'
      }
      this.axios.post('/emrqs/admin/pagelist', data).then(retVal => {
        this.adminList = retVal.data.list
        this.adminListPage = retVal.data
        console.log(this.adminListPage.pageNum)
      }).catch(retVal => {
      })
    }
  }
}
</script>
