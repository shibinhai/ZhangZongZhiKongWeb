<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
.contant{
  background-color: #ffffff;
  .title{
    text-align: center;
    font-size: 24px;
    i{
      margin-right: 10px;
    }
  }
  .addButton{
    position: absolute;
    right: 70px;
    z-index: 1;
    margin-top: 73px;
    padding: 2px auto 2px auto;
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
.demo-spin-icon-load{
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from { transform: rotate(0deg);}
  50%  { transform: rotate(180deg);}
  to   { transform: rotate(360deg);}
}
.demo-spin-col{
  height: 100px;
  position: relative;
  border: 1px solid #eee;
}
</style>
<style>
  .ivu-input[disabled], fieldset[disabled] .ivu-input{
    color: #000000!important;
  }
  .ivu-page-item .ivu-page-item-active{
    font-size: 14px;
  }
</style>
<template>
  <div class="contant">
    <div class="title">
      <p style="line-height: 3"><i class="fa fa-bed"></i><b>住院病例完整性配置</b></p>
      <Button type="primary" @click="addInfo" class="addButton">一键生成</Button>
      <!--<Modal-->
        <!--v-model="add"-->
        <!--title="配置完整性"-->
        <!--@on-ok="addok"-->
        <!--@on-cancel="addcancel">-->
        <!--<p style="line-height: 3">质控项目</p>-->
        <!--<Select v-model="selectName" style="width:400px">-->
          <!--<Option v-for="item in modelList" long :value="item.name" :key="item.name">{{ item.name }}</Option>-->
        <!--</Select>-->
        <!--<p style="line-height: 3">提示语</p>-->
        <!--<Input v-model="inputInfo" style="width: 400px" />-->
      <!--</Modal>-->
      <Tabs type="card" :value="findInfo1" :animated="false"  @on-click="findInfo">
        <template v-for="item in withHandle">
          <TabPane :label="item.name" :name="item.id" :key="item.id" @click="clickTab(item.id)">
            <Table :columns="columns" :data="dataInfo.list" border style="margin-top: 36px">
              <template slot-scope="{ row }" slot="ruleMsg">
                <Input v-model="row.ruleMsg" disabled  style="width: 250px;color: #000000!important;" />
              </template>
              <template slot-scope="{ row }" slot="isStart">
                <i-switch :value="row.isStart" @on-change="changeInfo(row)"/>
              </template>
              <template slot-scope="{ row }" slot="delect">
                <Button type="error" @click="delect(row)">删除</Button>
              </template>
            </Table>
          </TabPane>
        </template>
        <Modal
        v-model="modal1"
        title="警告"
        @on-ok="ok"
        @on-cancel="cancel">
        <p class="model-box-title">你确定删除这条记录吗?</p>
        <p class="model-box-p">删除后将无法恢复，请谨慎操作！</p>
        <div slot="footer">
          <Button size="large" @click="cancel">取消</Button>
          <Button type="error" size="large" @click="ok">删除</Button>
        </div>
      </Modal>
      </Tabs>
    </div>
    <Page style="margin-top: 20px" :total="dataInfo.pageNum" :page-size="7" :current.sync="pageth"
          @on-change="goPage(pageth)"/>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'completeness',
  data () {
    return {
      withHandle: {},
      findInfo1: '',
      columns: [
        {
          title: '病历基本信息',
          align: 'center',
          children: [
            {
              title: '质控名称',
              key: 'ruleName'
            },
            {
              title: '质控字段',
              key: 'ruleMsg'
            },
            {
              title: '表达式',
              key: 'ruleText'
            },
            {
              title: '必填项',
              slot: 'ruleMsg',
              align: 'center',
              width: '300'
            }
          ]
        },
        {
          title: ' ',
          children: [
            {
              title: '是否启用',
              slot: 'isStart',
              align: 'center'
            },
            {
              title: '删除',
              slot: 'delect',
              align: 'center'
            }
          ]
        }
      ],
      dataInfo: [],
      value: '',
      switch1: false,
      modal1: false,
      delectinfo: {},
      selectIndex: '',
      // add: false,
      modelList: {},
      selectName: '',
      inputInfo: '不能为空',
      getFindInfoId: '',
      pageth: 1,
      indexid: '',
      modal2: false
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.axios.post('/emrqs/bc-type/withHandle').then(retVal => {
        this.withHandle = retVal.data[0].subitems
        this.getFindInfoId = retVal.data[0].subitems[0].id
        this.findInfo(this.getFindInfoId)
      })
    },
    findInfo (index) {
      console.log(index)
      if (index !== undefined) {
        this.indexid = index
      }
      var data = {
        id: this.indexid,
        pageSize: 7,
        pageth: 1
      }
      this.axios.post('/emrqs/complete/getClassList', data).then(retVal => {
        this.dataInfo = retVal.data
        console.log(retVal.data)
      })
    },
    changeInfo (res) {
      let data = {
        id: res.id,
        isStart: res.isStart
      }
      if (res.isStart === true) {
        data.isStart = false
      }
      if (res.isStart === false) {
        data.isStart = true
      }
      data = qs.stringify(data)
      this.axios.post('/emrqs/complete/edit', data, {
        header: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(retVal => {
        this.findInfo()
        this.$Message.success('操作成功！')
      })
    },
    delect (res) {
      this.modal1 = true
      this.delectinfo = res
    },
    ok () {
      this.axios.get('/emrqs/complete/delItem?id=' + this.delectinfo.id).then(retVal => {
        this.findInfo(this.getFindInfoId)
        console.log(this.getFindInfoId)
        this.$Message.success('删除成功！')
        this.modal1 = false
      })
    },
    cancel () {
      this.$Message.info('取消操作！')
      this.modal1 = false
    },
    addInfo () {
      const msg = this.$Message.loading({
        content: 'Loading...',
        duration: 0
      })
      console.log(msg)
      // this.add = true
      this.modal2 = true
      this.axios.post('/emrqs/rules/addComplete').then(retVal => {
        this.findInfo(this.getFindInfoId)
        setTimeout(msg, 0)
        this.$Message.success({
          content: '操作完成'
        })
      })
    },
    // addok () {
    //   let data = {
    //     ruleName: this.selectName,
    //     ruleValue: this.selectName,
    //     ruleText: this.selectName,
    //     ruleMsg: this.inputInfo,
    //     isStart: '',
    //     baseCasesId: 'inhos',
    //     subitemsId: this.selectIndex
    //   }
    //   data = qs.stringify(data)
    //   this.axios.post('/emrqs/complete/add', data, {
    //     header: {'Content-Type': 'application/x-www-form-urlencoded'}
    //   }).then(retVal => {
    //     this.$Message.success('添加成功！')
    //     this.findInfo(this.selectIndex)
    //     this.add = false
    //   })
    // },
    addcancel () {
      this.$Message.info('操作取消！')
      this.add = false
    },
    clickTab (res) {
      this.findInfo(res)
    },
    goPage (res) {
      var data = {
        id: this.indexid,
        pageSize: 7,
        pageth: res
      }
      this.axios.post('/emrqs/complete/getClassList', data).then(retVal => {
        this.dataInfo = retVal.data
      })
    }
  }
}
</script>
