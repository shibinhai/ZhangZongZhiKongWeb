<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
  .contant{
    background-color: #ffffff;
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
    <Tabs :value="findInfo1" :animated="false" @on-click="findInfo">
      <template v-for="item in bcType">
        <TabPane :label="item.name + '时限配置'" :key="item.id" :name="item.id" icon="md-clipboard">
          <Button type="success" @click="addInfo(item)">添加</Button>
          <Modal
            v-model="add"
            title="添加监控项"
            @on-ok="ok"
            @on-cancel="cancel1">
            <div class="modelBody">
              <div class="clearfix">
                <span>质控字段</span>
                <Input class="fl" @on-focus="openGrop" v-model="value1" placeholder="质控字段" style="width: 300px" />
              </div>
              <div class="clearfix">
                <span>病历开始时间点</span>
                <Select class="fl" v-model="startTime" style="width:300px">
                  <OptionGroup v-for="item in itemList" :label="item.name" :key="item.id">
                    <Option v-for="data in item.type" :value="data.name" :key="data.id">
                      {{ data.name }}
                    </Option>
                  </OptionGroup>
                </Select>
              </div>
              <div class="clearfix">
                <span>病历结束时间点</span>
                <Select class="fl" v-model="endTime" style="width:300px">
                  <OptionGroup v-for="item in itemList" :label="item.name" :key="item.id">
                    <Option v-for="data in item.type" :value="data.name" :key="data.id">
                      {{ data.name }}
                    </Option>
                  </OptionGroup>
                </Select>
              </div>
              <div class="clearfix"><span>相差值(分钟)</span><Input class="fl" v-model="value2" placeholder="相差多少分钟" style="width: 300px" /></div>
              <div class="clearfix"><span>提示语</span><Input class="fl" v-model="value3" placeholder="超时提示语" style="width: 300px" /></div>
            </div>
          </Modal>
          <Modal
            v-model="selectGropTags"
            title="选择质控子段">
            <p style="font-size: 15px;line-height: 3.0">住院病例</p>
            <template v-for="item in group">
              <Tag color="primary" @click.native="selectTags(item.name)" :key="item.name">{{item.name}}</Tag>
            </template>
            <div slot="footer">
              <Button type="primary" size="large" @click="close">取消</Button>
            </div>
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
          <Table border size="small" style="width: 100%;margin-top: 20px" :columns="departmentQualityProblem" :data="departmentQualityProblemData.list">
            <template slot-scope="{ row }" slot="isStart">
              <Button v-if="row.isStart === false" @click="openIsStart(row)" type="primary">启用</Button>
              <Button v-if="row.isStart === true" @click="closeIsStart(row)" type="warning">禁用</Button>
              <Button type="error" @click="delectIt(row)">删除</Button>
            </template>
          </Table>
          <Page style="margin-top: 20px" :total="departmentQualityProblemData.pageNum" :page-size="6" :current.sync="pageth"
                @on-change="goPage(pageth)"/>
        </TabPane>
      </template>
    </Tabs>
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
  name: 'time-limit',
  data () {
    return {
      departmentQualityProblem: [
        {
          title: '监控项',
          key: 'ruleName'
        },
        {
          title: '表达式',
          key: 'ruleValue'
        },
        {
          title: '限定时限（分）',
          key: 'limit'
        },
        {
          title: '提示语',
          key: 'ruleMsg'
        },
        {
          title: '创建人',
          key: 'authorName'
        },
        {
          title: '创建时间',
          key: 'addTime'
        },
        {
          title: '操作',
          slot: 'isStart',
          align: 'center'
        }
      ],
      departmentQualityProblemData: [],
      group: {},
      bcType: {},
      findInfo1: '',
      add: false,
      startTime: '',
      endTime: '',
      value1: '',
      value2: '',
      value3: '',
      selectGropTags: false,
      bcid: 'inhos',
      delectModel: false,
      delectid: '',
      cityList: [],
      model1: '',
      pageth: 1,
      itemList: []
    }
  },
  mounted () {
    this.initData()
    this.findInfo('inhos')
  },
  methods: {
    initData () {
      let data = {
        name: 'dataType',
        value: 'Calendar',
        bcId: 'inhos'
      }
      data = qs.stringify(data)
      this.axios.post('/emrqs/monitor/withSubType', data, {
        header: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(retVal => {
        this.itemList = retVal.data
        // this.group = retVal.data.hospital
        // console.log(this.group)
      })
      this.axios.post('/emrqs/bc-type', {
        header: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(retVal => {
        this.bcType = retVal.data
      })
      this.axios.post('/emrqs/monitor/group').then(retVal => {
        this.group = retVal.data.subitems
      })
    },
    findInfo (index) {
      this.bcid = index
      let data = {
        baseCasesId: this.bcid,
        order: 'asc',
        ordername: 'addTime',
        pageSize: 6,
        pageth: 1
      }
      if (data.baseCasesId === undefined) {
        data.baseCasesId = 'inhos'
      }
      this.axios.post('/emrqs/time-limit/list', data).then(retVal => {
        this.departmentQualityProblemData = retVal.data
      })
    },
    goPage (res) {
      let data = {
        baseCasesId: this.bcid,
        limit: 10,
        offset: 1,
        order: 'asc',
        ordername: 'addTime',
        pageSize: 6,
        pageth: res
      }
      if (data.baseCasesId === undefined) {
        data.baseCasesId = 'inhos'
      }
      this.axios.post('/emrqs/time-limit/list', data).then(retVal => {
        this.departmentQualityProblemData = retVal.data
      })
    },
    addInfo (name) {
      this.bcid = name.id
      this.add = true
    },
    ok () {
      let data = {
        ruleName: this.value1,
        target: this.value1,
        startValue: this.startTime,
        endValue: this.endTime,
        differValue: this.value2,
        tipsValue: this.value3,
        bcid: this.bcid
      }
      data = qs.stringify(data)
      this.axios.post('/emrqs/time-limit/add', data, {
        header: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(retVal => {
        this.findInfo(this.bcid)
        this.value1 = ''
        this.startTime = ''
        this.endTime = ''
        this.value2 = ''
        this.value3 = ''
      })
      this.$Message.success('操作成功！')
    },
    cancel () {
      this.$Message.info('操作取消！')
      this.delectModel = false
    },
    openGrop () {
      this.selectGropTags = true
    },
    close () {
      this.selectGropTags = false
      this.$Message.info('取消操作！')
    },
    selectTags (name) {
      this.selectGropTags = false
      this.value1 = name
      this.$Message.success('选择成功！')
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
        this.findInfo(this.bcid)
        this.$Message.success('修改成功!')
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
        this.findInfo(this.bcid)
        this.$Message.success('删除成功！')
      })
    },
    cancel1 () {
      this.value1 = ''
      this.startTime = ''
      this.endTime = ''
      this.value2 = ''
      this.value3 = ''
    }
  }
}
</script>
