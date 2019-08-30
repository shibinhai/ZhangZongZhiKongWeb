<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
  .contant{
    background-color: #ffffff;
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
  .input{
    margin: 10px 0;
    div{
      width: 80px;
      text-align: right;
      margin-right: 15px;
    }
  }
  .texthidden{
    width: 160px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
</style>

<template>
  <div class="contant">
    <Button type="primary" @click="ruleMoal = true">监控规则配置</Button>
    <Modal
      v-model="ruleMoal"
      title="住院病历监控规则配置"
      @on-ok="save"
      @on-cancel="close"
      width="1000">
      <Tabs type="card" :value="findInfo1" :animated="false" @on-click="findInfo">
        <template v-for="item in withHandle">
          <TabPane :label="item.name" :name="item.id" :key="item.id">
            <Input placeholder="搜索" v-model="findText" style="width: 200px;display: block;margin-bottom: 10px;" />
            <template v-for="item in findTags">
              <Tag color="success" v-if="item.name.indexOf(findText) >= 0" @click.native="addTag(item.name)" :key="item.name">{{item.name}}</Tag>
            </template>
            <Card style="margin: 20px 0">
              <p>操作符</p>
              <template v-for="item in advanced">
                <Tooltip placement="top-start" :content="item.name" :key="item.value">
                  <Tag @click.native="addTag1(item.value)">{{item.value}}</Tag>
                </Tooltip>
              </template>
            </Card>
            <Card style="margin: 20px 0">
              <div class="input clearfix">
                <div class="fl">质控字段</div>
                <Input v-model="target" @on-focus="status = true" class="fl" style="width: 700px"/>
              </div>
              <div class="input clearfix">
                <div class="fl">逻辑条件</div>
                <Input v-model="logic" @on-focus="status = false" class="fl" style="width: 700px"/>
              </div>
              <div class="input clearfix">
                <div class="fl">规则名称</div>
                <Input v-model="ruleName" class="fl" style="width: 700px"/>
              </div>
              <div class="input clearfix">
                <div class="fl">错误类型</div>
                <Select filterable v-model="type" clearable  style="width:200px">
                  <Option v-for="item in qualityControl" :value="item.name" :key="item.name">{{ item.name }}</Option>
                </Select>
              </div>
              <div class="input clearfix">
                <div class="fl">提示语</div>
                <Input v-model="errorTips" class="fl" style="width: 700px"/>
              </div>
              <div class="input clearfix">
                <div class="fl">所属字段</div>
                <Input v-model="belong" class="fl" style="width: 700px"/>
              </div>
              <div class="input clearfix">
                <div class="fl">更正提示</div>
                <Input v-model="hint" class="fl" style="width: 700px"/>
              </div>
              <div class="input clearfix">
                <div class="fl">错误级别</div>
                <Input v-model="level" class="fl" style="width: 700px"/>
              </div>
            </Card>
          </TabPane>
        </template>
      </Tabs>
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
      <template slot-scope="{ row }" slot="ruleValue">
        <Poptip trigger="hover" placement="right">
          <div slot="content" style="white-space: normal;width: 300px;">{{row.ruleValue}}</div>
          <div class="texthidden">{{row.ruleValue}}</div>
        </Poptip>
      </template>
      <template slot-scope="{ row }" slot="isStart">
        <Button v-if="row.isStart === false" @click="openIsStart(row)" type="primary">启用</Button>
        <Button v-if="row.isStart === true" @click="closeIsStart(row)" type="warning">禁用</Button>
        <Button type="error" @click="delectIt(row)">删除</Button>
      </template>
    </Table>
    <Page style="margin-top: 20px" :total="pagedata.pageNum" :page-size="6" :current.sync="pageth1"
          @on-change="goPage(pageth1)"/>
    <Modal
      v-model="delectModel"
      title="警告">
      <p class="model-box-title">你确定删除这条记录吗?</p>
      <p class="model-box-p">删除后将无法恢复，请谨慎操作！</p>
      <div slot="footer">
        <Button size="large" @click="cancel">取消</Button>
        <Button type="error" size="large" @click="delectTimeLimit">删除</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'senior',
  data () {
    return {
      departmentQualityProblem: [
        {
          title: '监控项',
          key: 'target'
        },
        {
          title: '规则名称',
          key: 'ruleName'
        },
        {
          title: '表达式',
          // key: 'ruleValue',
          slot: 'ruleValue',
          width: 200
        },
        {
          title: '提示语',
          key: 'ruleMsg'
        },
        {
          title: '创建人',
          key: 'authorName',
          width: 110
        },
        {
          title: '创建时间',
          key: 'addTime'
        },
        {
          title: '操作',
          slot: 'isStart',
          width: 160
        }
      ],
      departmentQualityProblemData: [],
      delectModel: false,
      ruleMoal: false,
      findInfo1: '',
      withHandle: {},
      findId: '',
      findTags: {},
      advanced: {},
      target: '',
      logic: '',
      ruleName: '',
      errorTips: '',
      status: '',
      pagedata: 1,
      pageth1: 1,
      type: '',
      belong: '',
      hint: '',
      level: '',
      findText: '',
      qualityControl: {}
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
        order: 'desc',
        ordername: 'addTime',
        pageSize: 6,
        pageth: 1
      }
      this.axios.post('/emrqs/advanced/list', data).then(retVal => {
        this.departmentQualityProblemData = retVal.data.list
        this.pagedata = retVal.data
      })
      this.axios.post('/emrqs/common/checktype').then(retVal => {
        this.qualityControl = retVal.data
      })
      this.axios.post('/emrqs/bc-type/withHandle').then(retVal => {
        this.withHandle = retVal.data[0].subitems
        console.log(retVal.data[0].subitems[0].id)
        this.findInfo(retVal.data[0].subitems[0].id)
      })
      this.axios.post('/emrqs/operator/advanced').then(retVal => {
        this.advanced = retVal.data
      })
    },
    openIsStart (res) {
      let message = {
        id: res.id,
        value: true
      }
      this.changeIsStart(message)
    },
    closeIsStart (res) {
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
    cancel () {
      this.$Message.info('操作取消！')
      this.delectModel = false
    },
    save () {
      this.ruleMoal = false
      var data = {
        target: this.target,
        logic: this.logic,
        ruleName: this.ruleName,
        errorTips: this.errorTips,
        baseId: 'inhos',
        type: this.type,
        belong: this.belong,
        hint: this.hint,
        level: this.level
      }
      console.log(data)
      if (data.target === '' || data.logic === '' || data.ruleName === '' || data.errorTips === '') {
        this.$Message.error('请完整填写信息！')
      } else {
        // data = qs.stringify(data)
        this.axios.post('/emrqs/advanced/save', data, {
          header: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(retVal => {
          console.log(retVal)
          this.$Message.success('保存成功！')
          this.initData()
        })
      }
    },
    close () {
      this.ruleMoal = false
      this.$Message.info('操作取消！')
    },
    findInfo (index) {
      this.findId = index
      console.log(index)
      let data = {
        name: 'subitemsCaseId',
        value: this.findId
      }
      // data = qs.stringify(data)
      this.axios.post('/emrqs/monitor/list', data, {
        header: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(retVal => {
        this.findTags = retVal.data
      })
    },
    addTag (res) {
      if (this.status === true) {
        this.target = res + ',' + this.target
      }
      if (this.status === false) {
        this.logic = this.logic + res
      }
    },
    addTag1 (res) {
      this.logic = this.logic + res
    },
    goPage (pageth) {
      console.log(pageth)
      this.pageth = pageth
      let data = {
        order: 'desc',
        ordername: 'addTime',
        pageSize: 6,
        pageth: pageth
      }
      this.axios.post('/emrqs/advanced/list', data).then(retVal => {
        this.departmentQualityProblemData = retVal.data.list
        this.pagedata = retVal.data
      })
    }
  }
}
</script>
