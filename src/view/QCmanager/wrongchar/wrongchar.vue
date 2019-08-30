<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
  .contant{
    background-color: #ffffff;
  }
  .input-line{
    margin: 10px 0;
    .text{
      text-align: right;
      width: 70px;
      line-height: 2.7;
      margin-right: 20px;
      margin-left: 20px;
    }
    .conInput{
      width: 570px;
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
  .model-style{
    width: 700px;
  }
</style>

<template>
  <div class="contant">
    <Button type="success" @click="modal1 = true">添加错别字配置</Button>
    <Modal
      v-model="modal1"
      title="错别字配置"
      @on-ok="ok"
      width="750"
      @on-cancel="cancel">
      <div class="input-line clearfix">
        <div class="text fl">质控字段</div>
        <Input class="fl conInput" @on-focus="openGrop" placeholder="选择质控字段" v-model="value4" />
      </div>
      <div class="input-line clearfix">
        <div class="text fl">错别字配置</div>
        <Input class="fl conInput" v-model="value5" type="textarea" :rows="7" placeholder="" />
      </div>
      <Alert style="width: 644px;margin: 0 auto" type="error">配置方式：正确字1=错别字1,正确字2=错别字2,...。可以使用英文逗号,空格,分号分割多组配置</Alert>
      <div class="input-line clearfix">
        <div class="text fl">提示语</div>
        <Input class="fl conInput" placeholder="请输入提示语" v-model="value6" />
      </div>
    </Modal>
    <Modal
      v-model="selectGropTags"
      title="选择质控字段">
      <p style="font-size: 15px;line-height: 3.0">住院病例</p>
      <Input placeholder="搜索" v-model="findText" style="width: 200px;display: block;margin-bottom: 20px;" />
      <template v-for="item in group">
        <Tag color="primary" v-if="item.name.indexOf(findText) >= 0" checkable @click.native="selectTags(item.name)" :key="item.id">{{item.name}}</Tag>
      </template>
      <div slot="footer">
        <Button size="large" @click="close">取消</Button>
        <Button type="primary" size="large" @click="selectOk">确定</Button>
      </div>c
    </Modal>
    <div class="title-right fr clearfix">
      <Input class="fl" style="width: 150px" size="large" placeholder="搜索" />
      <div class="tool-box fl clearfix">
        <span class="icon"><i class="fa fa-refresh"></i></span>
        <span class="icon"><i class="fa fa-list"></i></span>
        <span class="icon">
            <Dropdown class="icon" trigger="click">
              <i class="fa fa-th"></i>
              <DropdownMenu slot="list">
                <DropdownItem></DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </span>
        <Dropdown class="icon" trigger="click">
          <i class="fa fa-share"></i>
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
    <Table border size="small" style="width: 100%;margin-top: 20px" :columns="departmentQualityProblem" :data="departmentQualityProblemData">
      <template slot-scope="{ row }" slot="isStart">
        <Button type="success" @click="openChange(row)">修改</Button>
        <Button v-if="row.isStart === false" @click="charopenIsStart(row)" type="primary">启用</Button>
        <Button v-if="row.isStart === true" @click="charcloseIsStart(row)" type="error">禁用</Button>
        <Button type="warning" @click="delectIt(row)">删除</Button>
      </template>
    </Table>
    <Modal
      v-model="chaneStatus"
      title="错别字配置"
      @on-ok="change"
      width="750"
      @on-cancel="cancelChange">
      <div class="input-line clearfix">
        <div class="text fl">质控字段</div>
        <Input class="fl conInput" :disabled="true" placeholder="选择质控字段" v-model="Change1" />
      </div>
      <div class="input-line clearfix">
        <div class="text fl">错别字配置</div>
        <Input class="fl conInput" v-model="Change2" type="textarea" :rows="7" placeholder="" />
      </div>
      <Alert style="width: 644px;margin: 0 auto" type="error">配置方式：错别字1=正确字1,错别字2=正确字2,...。可以使用中文分号分割多组配置</Alert>
      <div class="input-line clearfix">
        <div class="text fl">提示语</div>

        <Input class="fl conInput" placeholder="请输入提示语" v-model="Change3" />
      </div>
    </Modal>
    <Modal
      v-model="delectModel"
      title="警告">
      <p class="model-box-title">你确定删除这条记录吗?</p>
      <p class="model-box-p">删除后将无法恢复，请谨慎操作！</p>
      <div slot="footer">
        <Button size="large" @click="cancel1">取消</Button>
        <Button type="error" size="large" @click="delectTimeLimit">删除</Button>
      </div>
    </Modal>
    <Page style="margin-top: 20px" :total="dataInfo.pageNum" :page-size="7" :current.sync="pageth"
          @on-change="goPage(pageth)"/>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'wrongchar',
  data () {
    return {
      departmentQualityProblem: [
        {
          title: '监控项',
          key: 'monitorName',
          align: 'center'
        },
        {
          title: '错别字配置',
          key: 'ruleText',
          align: 'center'
        },
        {
          title: '创建日期',
          key: 'addTime',
          align: 'center'
        },
        {
          title: '创建人',
          key: 'authorName',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'isStart',
          width: 230,
          align: 'center'
        }
      ],
      departmentQualityProblemData: [],
      group: {},
      selectGropTags: false,
      modal1: false,
      value4: '',
      value5: '',
      value6: '',
      Change1: '',
      Change2: '',
      Change3: '',
      ChangeId: '',
      chaneStatus: false,
      delectModel: false,
      dataInfo: {},
      pageth: 1,
      findText: ''
    }
  },
  mounted () {
    this.initData()
  },
  watch: {
    findText (text) {
      console.log(text)
    }
  },
  methods: {
    initData () {
      let data = {
        order: 'asc',
        ordername: 'addTime',
        pageSize: 7,
        pageth: this.pageth
      }
      this.axios.post('/emrqs/wrongchar/list', data).then(retVal => {
        this.departmentQualityProblemData = retVal.data.list
        this.dataInfo = retVal.data
        console.log(this.dataInfo)
      })
      this.axios.post('/emrqs/monitor/group').then(retVal => {
        this.group = retVal.data.subitems
        console.log(retVal.data)
      })
    },
    selectTags (name) {
      this.value4 = name + ',' + this.value4
    },
    openGrop () {
      this.selectGropTags = true
    },
    selectOk () {
      console.log(this.value4)
      this.selectGropTags = false
      this.$Message.success('选择成功！')
    },
    close () {
      this.selectGropTags = false
      this.$Message.info('取消操作！')
    },
    ok () {
      let data = {
        id: '',
        ruleValue: this.value5,
        template: this.value4,
        monitors: this.value4,
        baseCasesId: 'inhos',
        ruleMsg: this.value6
      }
      data = qs.stringify(data)
      this.axios.post('/emrqs/wrongchar/save', data, {
        header: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(retVal => {
        this.initData()
        this.value4 = ''
        this.value5 = ''
        this.value6 = ''
        this.$Message.success('保存成功！')
      })
    },
    cancel () {
      this.$Message.info('取消操作！')
    },
    change () {
      let data = {
        id: this.ChangeId,
        template: this.Change2,
        ruleMsg: this.Change3
      }
      data = qs.stringify(data)
      this.axios.post('/emrqs/wrongchar/update', data, {
        header: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(retVal => {
        this.initData()
        this.value4 = ''
        this.value5 = ''
        this.value6 = ''
      })
    },
    cancelChange () {
      this.$Message.info('取消操作！')
    },
    openChange (res) {
      console.log(res)
      this.Change1 = res.monitorName
      this.Change2 = res.ruleText
      this.Change3 = res.ruleMsg
      this.ChangeId = res.id
      this.chaneStatus = true
    },
    charopenIsStart (res) {
      let message = {
        id: res.id,
        value: true
      }
      this.changeIsStart(message)
    },
    charcloseIsStart (res) {
      let message = {
        id: res.id,
        value: false
      }
      this.changeIsStart(message)
    },
    changeIsStart (res) {
      let data = res
      data = qs.stringify(data)
      this.axios.post('/emrqs/rules/sw', data, {
        header: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(retVal => {
        this.initData()
        this.$Message.success('修改成功！')
      })
    },
    delectIt (res) {
      this.delectid = res.id
      this.delectModel = true
    },
    cancel1 () {
      this.$Message.info('操作取消！')
      this.delectModel = false
    },
    delectTimeLimit () {
      this.delectModel = false
      let data = {
        id: this.delectid
      }
      data = qs.stringify(data)
      this.axios.post('/emrqs/time-limit/del', data, {
        header: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(retVal => {
        this.initData()
        this.$Message.success('删除成功！')
      })
    },
    goPage (res) {
      var data = {
        order: 'asc',
        ordername: 'addTime',
        pageSize: 7,
        pageth: res
      }
      this.axios.post('/emrqs/wrongchar/list', data).then(retVal => {
        this.departmentQualityProblemData = retVal.data.list
        this.dataInfo = retVal.data
      })
    }
  }
}
</script>
