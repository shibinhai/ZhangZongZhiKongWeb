<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
.contant{
  .tabPaneStyle{
    min-width: 940px;
  }
  .leftTabs{
    border-radius: 5px;
    width: 17%;
    min-width: 176px;
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #e7eaec;
    border-bottom: none;
    .tabs{
      width: 100%;
      font-size: 13px;
      line-height: 3;
      padding: 0 15px;
      border-bottom: 1px solid #e7eaec;
      .tabs-icon{
        display: none;
        cursor: pointer;
        i{
          margin: 0 2px;
        }
      }
    }
    .tabs:hover .tabs-icon{
      display: block;
    }
    .tabs:hover{
      background-color: #e7eaec;
    }
  }
  .rightTable{
    width: 61vw;
    margin-left: 3%;
  }
  .active{
    background-color: #1ab394;
    color: #ffffff;
  }
  .active:hover{
    background-color: #1ab394!important;
    color: #ffffff!important;
  }
}
.modelBody{
  div{
    margin-bottom: 10px;
    span{
      display: block;
      width: 100px;
      float: left;
      text-align: right;
      line-height: 2.5;
      margin-right: 10px;
    }
  }
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
    <Tabs value="name1">
      <TabPane label="住院病例配置" name="name1">
        <div class="clearfix tabPaneStyle">
          <div class="leftTabs fl">
            <template v-for="(item, index) in tabsName">
              <div :key="item.id" @click="addClass(index)" :class="{ 'active':index === current}" class="tabs clearfix">
                <span class="fl">{{item.name}}</span>
                <div class="tabs-icon fr">
                  <i class="fa fa-pencil" @click="changeText(item, index)"></i>
                  <i class="fa fa-close" @click="deleteLabelM(item)"></i>
                </div>
              </div>
            </template>
            <div class="tabs clearfix" style="cursor:pointer;" @click="addLabel()">
              <span class="fl">添加住院病例分类</span>
              <div class="tabs-icon fr">
                <i class="fa fa-calendar-plus-o"></i>
              </div>
            </div>
          </div>
          <div class="rightTable fl clearfix">
            <Button class="fl" @click="add = true" style="background-color: #1ab394;color: #ffffff">添加</Button>
            <Modal
              v-model="add"
              title="添加监控项"
              @on-ok="addok"
              @on-cancel="addcancel"
              width="400">
              <div class="modelBody">
                <div class="clearfix">
                  <span>监控名</span>
                  <Input class="fl" v-model="value1" placeholder="监控名" style="width: 200px" />
                </div>
              </div>
            </Modal>
            <div class="title-right fr clearfix">
              <Input class="fl" style="width: 150px" size="large" placeholder="搜索" />
              <div class="tool-box fl clearfix">
                <span class="icon"><i class="fa fa-refresh fa-fw"></i></span>
                <span class="icon"><i class="fa fa-list fa-fw"></i></span>
                <span class="icon">
            <Dropdown class="icon" trigger="click">
              <i class="fa fa-th fa-fw"></i>
              <DropdownMenu slot="list">
                <DropdownItem></DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </span>
                <Dropdown class="icon" trigger="click">
                  <i class="fa fa-share fa-fw"></i>
                  <DropdownMenu slot="list">
                    <DropdownItem>JSON</DropdownItem>
                    <DropdownItem>XML</DropdownItem>
                    <DropdownItem>CSV</DropdownItem>
                    <DropdownItem>TEXT</DropdownItem>
                    <DropdownItem>SQL</DropdownItem>
                    <DropdownItem>MS-Excel</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
            <Table border style="margin-top: 40px;width: 100%" :columns="columns1" :data="tableInfo.list">
              <template slot-scope="{ row }" slot="valueScopeJson">
                -
              </template>
              <template slot-scope="{ row }" slot="address">
                <Button type="primary" @click="Change(row)">修改</Button>
                <Button type="error" @click="deleteInfo(row)">删除</Button>
              </template>
            </Table>
            <Page style="margin-top: 20px" :total="tableInfo.pageNum" :page-size="7" :current.sync="pageth"
                  @on-change="goPage(pageth)"/>
          </div>
          <Modal
            v-model="ChangeModel"
            title="修改监控项"
            @on-ok="changeok"
            @on-cancel="changecancel"
            width="700">
            <div class="modelBody">
              <div class="clearfix">
                <span>监控名</span>
                <Input class="fl" v-model="value1" placeholder="监控名" style="width: 450px" />
              </div>
            </div>
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
          <Modal
            v-model="changeLabelText"
            title= "修改分类名"
            @on-ok=" changeLabelTextOk"
            @on-cancel="changeLabelTextOkcancel"
            width="300">
              <Input class="fl" v-model="labelName" placeholder="分类名" style="margin-bottom: 20px"/>
          </Modal>
          <Modal
            v-model="addLabelModel"
            title= "添加分类名"
            @on-ok=" addLabelTextOk"
            @on-cancel="addLabelTextOkcancel"
            width="300">
              <Input class="fl" v-model="addlabelName" placeholder="分类名" style="margin-bottom: 20px"/>
          </Modal>
          <Modal
            v-model="deleteLabel">
            <p class="model-box-title">你确定删除这条记录吗?</p>
            <p class="model-box-p">删除后将无法恢复，请谨慎操作！</p>
            <div slot="footer">
              <Button size="large" @click="deleteLabelcancel">取消</Button>
              <Button type="error" size="large" @click="deleteLabelok">删除</Button>
            </div>
          </Modal>
        </div>
      </TabPane>
      <TabPane label="门诊病例配置" name="name2">标签二的内容</TabPane>
    </Tabs>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'case-config',
  data () {
    return {
      tabsName: {},
      current: 0,
      columns1: [
        {
          title: '监控项',
          key: 'name',
          align: 'center'
        },
        {
          title: '创建人',
          key: 'authorName',
          align: 'center'
        },
        {
          title: '创建时间',
          key: 'addTime',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'address',
          align: 'center',
          width: 154
        }
      ],
      tableInfo: [],
      add: false,
      timeList1: [],
      value1: '',
      subitemsCaseId: '',
      ChangeModel: false,
      changeId: '',
      deleteModel: false,
      changeLabelText: false,
      changeLabel: {},
      labelName: '',
      deleteLabel: false,
      addLabelModel: false,
      addlabelName: '',
      id: '',
      pageth: 1,
      pageSize: 7
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.axios.post('/emrqs/bc-type/withHandle').then(retVal => {
        console.log(retVal)
        this.tabsName = retVal.data[0].subitems
        this.getTableInfo(0)
      })
    },
    addClass (index) {
      this.current = index
      this.getTableInfo(index)
    },
    getTableInfo (index) {
      this.subitemsCaseId = this.tabsName[index].id
      let data = {
        baseCaseId: 'inhos',
        limit: 10,
        offset: 1,
        order: 'asc',
        ordername: 'addTime',
        subitemsCaseId: this.subitemsCaseId,
        pageSize: 7,
        pageth: 1
      }
      this.axios.post('/emrqs/monitor/get', data).then(retVal => {
        this.tableInfo = retVal.data
      })
    },
    goPage (res) {
      let data = {
        baseCaseId: 'inhos',
        limit: 10,
        offset: 1,
        order: 'asc',
        ordername: 'addTime',
        subitemsCaseId: this.subitemsCaseId,
        pageSize: this.pageSize,
        pageth: res
      }
      this.axios.post('/emrqs/monitor/get', data).then(retVal => {
        this.tableInfo = retVal.data
      })
    },
    Change (res) {
      this.ChangeModel = true
      this.value1 = res.name
      this.changeId = res.id
    },
    deleteInfo (res) {
      this.deleteModel = true
      this.changeId = res.id
    },
    addok () {
      let data = {
        name: this.value1,
        baseCaseId: 'inhos',
        subitemsCaseId: this.subitemsCaseId
      }
      data = qs.stringify(data)
      this.axios.post('/emrqs/monitor/save', data, {
        header: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(retVal => {
        this.getTableInfo(this.current)
        this.$Message.success('操作成功！')
        this.value1 = ''
      })
    },
    addcancel () {
      this.$Message.info('操作取消！')
    },
    changeok () {
      let data = {
        name: this.value1,
        baseCaseId: 'inhos',
        id: this.changeId
      }
      data = qs.stringify(data)
      this.axios.post('/emrqs/monitor/upda', data, {
        header: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(retVal => {
        this.getTableInfo(this.current)
        this.$Message.success('操作成功！')
        this.initData()
        this.value1 = ''
      })
    },
    changecancel () {
      this.ChangeModel = false
    },
    deletecancel () {
      this.deleteModel = false
      this.$Message.info('取消操作！')
    },
    deleteok () {
      let data = {
        key: this.changeId
      }
      data = qs.stringify(data)
      this.axios.post('/emrqs/monitor/del', data, {
        header: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(retVal => {
        this.getTableInfo(this.current)
        this.$Message.success('操作成功！')
        this.deleteModel = false
      }).catch(retVal => {
        this.$Message.error('操作失败！')
      })
    },
    changeText (res, id) {
      console.log('item', res)
      this.changeLabel = res
      console.log('id', id)
      this.changeLabelText = true
    },
    changeLabelTextOk () {
      console.log('ok')
      let data = {
        name: this.labelName,
        id: this.changeLabel.id
      }
      data = qs.stringify(data)
      this.axios.post('/emrqs/case-setting/edit', data, {
        header: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(retVal => {
        console.log(retVal)
        this.$Message.success('修改成功！')
        this.changeLabelText = false
        this.initData()
      }).catch(retVal => {
        console.log(retVal)
        this.$Message.error('操作失败！')
        this.changeLabelText = false
      })
    },
    changeLabelTextOkcancel () {
      this.changeLabelText = false
    },
    deleteLabelM (res) {
      this.changeLabel = res
      console.log(res)
      this.deleteLabel = true
    },
    deleteLabelcancel () {
      this.deleteLabel = false
    },
    deleteLabelok () {
      this.deleteLabel = false
      console.log(this.changeLabel)
      let data = {
        name: this.changeLabel.name,
        id: this.changeLabel.id
      }
      console.log(data)
      data = qs.stringify(data)
      this.axios.post('/emrqs/case-setting/del', data, {
        header: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(retVal => {
        console.log(retVal)
        this.$Message.success('删除成功！')
        this.changeLabelText = false
        this.initData()
      }).catch(retVal => {
        console.log(retVal)
        this.$Message.error('操作失败！')
        this.changeLabelText = false
      })
    },
    addLabel () {
      this.addLabelModel = true
    },
    addLabelTextOk () {
      this.addLabelModel = false
      let data = {
        name: this.addlabelName,
        baseId: 'inhos'
      }
      console.log(data)
      data = qs.stringify(data)
      this.axios.post('/emrqs/case-setting/add', data, {
        header: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(retVal => {
        console.log(retVal)
        this.$Message.success('修改成功！')
        this.addLabelModel = false
        this.initData()
      }).catch(retVal => {
        console.log(retVal)
        this.$Message.error('操作失败！')
        this.addLabelModel = false
      })
    },
    addLabelTextOkcancel () {
      this.addLabelModel = false
    }
  }
}
</script>
