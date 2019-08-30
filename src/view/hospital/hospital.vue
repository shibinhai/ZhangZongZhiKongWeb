<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
  .select-span {
    display: block;
    width: 100%;
  }

  .modal {
    cursor: pointer;
  }

  .contant {
    .title {
      .title-span:nth-child(1) {
        margin-right: 10px;
      }

      .title-span {
        margin: 0 10px 0 15px;
        font-weight: 700;
        font-size: 14px;
      }
    }
  }

  .checkBox {
    margin-right: 20px;
  }

  .modal-box {
    width: 750px;

    span {
      display: block;
      float: left;
      width: 30%;
      font-size: 15px;
      line-height: 2;
    }
  }
</style>

<style>
  .ivu-select-dropdown {
    width: 100px !important;
    text-align: left;
  }

  .ivu-select-dropdown {
    width: 217px !important;
  }
</style>
<template>
  <div class="contant">
    <div class="title clearfix">
      <div class="title-left fl">
        <span class="title-span">科室</span>
        <template>
          <Select filterable v-model="model1" clearable  style="width:200px">
            <Option v-for="item in department" @click.native="selectOption(item)" :value="item.office"
                    :key="item.office">{{ item.office }}
            </Option>
          </Select>
        </template>
        <span class="title-span">主治医生</span>
        <template>
          <Select filterable v-model="model3" clearable  style="width:200px">
            <Option v-for="item in doctorData" :value="item" :key="item">{{ item }}</Option>
          </Select>
        </template>
        <span class="title-span">质控类别</span>
        <template>
          <Select filterable v-model="model2" clearable  style="width:200px">
            <Option v-for="item in qualityControl" :value="item.name" :key="item.name">{{ item.name }}</Option>
          </Select>
        </template>
        <span class="title-span">时间</span>
        <DatePicker v-model="startTime" clearable  format="yyyy-MM-dd" placeholder="开始时间"
                    style="width: 150px"></DatePicker>
        <DatePicker v-model="endTime" clearable  format="yyyy-MM-dd" placeholder="结束时间"
                    style="width: 150px"></DatePicker>
        <Button type="primary" @click="searchInfo(1)">搜索</Button>
        <Button type="info" @click="exec" v-if="execButton === true">检查</Button>
        <Spin size="large" fix v-if="spinShow"></Spin>
      </div>
      <div class="title-right fr clearfix">
      <Input class="fl" style="width: 150px" size="large" placeholder="搜索" v-model="findText" />
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
    </div>
    <Table border :columns="columns" :data="hospitalData" @on-sort-change='changeSort()'>
      <template slot-scope="{ row }" slot="isWork">
        <div class="name" v-if="row.isWork === false">否</div>
        <div class="name" v-if="row.isWork === true">是</div>
      </template>
      <template slot-scope="{ row, index }" slot="qualityDefects">
        <Button type="success" @click="modelOpen(index)">详情</Button>
      </template>
    </Table>
    <Page style="margin-top: 20px" :total="hospitalDataPage.pageNum" :page-size="7" :current.sync="pageth"
          @on-change="goPage(pageth)"/>
    <Modal v-model="model" width="750">
      <p slot="header">
        <span>住院病历质量缺陷表</span>
      </p>
      <div class="modal-box clearfix" style="text-align:center">
        <span>科室：{{ boxInfo.officeName}}</span>
        <span>姓名：{{ boxInfo.姓名}}</span>
        <span>年龄：{{boxInfo.age}}</span>
        <span>住院号：{{ boxInfo.caseNo}}</span>
        <span>主治医师：{{ boxInfo.主治医师}}</span>
      </div>
      <div class="tool-box fr clearfix">
        <span class="icon" @click="initData"><i class="fa fa-refresh"></i></span>
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
      <Table border style="margin-top: 40px;width: 100%" :columns="columns1" :data="data1.list" @on-sort-change="paixu()">
        <template slot-scope="{ row }" slot="look">
          <Button type="primary" @click="openInfo(row)">查看</Button>
        </template>
      </Table>
      <Page style="margin-top: 20px" :total="modelTotol.pageNum" :page-size="5" :current.sync="pageth1"
            @on-change="goPage1(pageth1)"/>
      <div slot="footer">
        <Button type="error" @click="cancel">关闭</Button>
      </div>
    </Modal>
    <Modal
      v-model="lookThisInfo"
      title="住院病历质量缺陷详情"
      @on-ok="lookok"
      width="750"
      @on-cancel="lookcancel">
      <div class="modal-box clearfix" style="text-align:center">
        <span>科室：{{ boxInfo.officeName}}</span>
        <span>姓名：{{ boxInfo.姓名}}</span>
        <span>年龄：{{boxInfo.age}}</span>
        <span>住院号：{{ boxInfo.caseNo}}</span>
        <span>主治医师：{{ boxInfo.主治医师}}</span>
      </div>
      <Table border style="margin-top: 40px;width: 100%" :columns="dataInfo" :data="dataInfoTable">
        <template slot-scope="{ row }" slot="缺陷内容">
          <span v-html="row.缺陷内容"></span>
        </template>
      </Table>
    </Modal>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'hospital',
  data () {
    return {
      model1: '',
      model2: '',
      model3: '',
      department: [{
        office: ''
      }],
      doctor: {},
      startTime: '',
      endTime: '',
      index: 0,
      modal1: false,
      tableList: {},
      tabsName: 'name',
      qualityControl: {},
      columns: [
        {
          title: '科室',
          key: 'officeName',
          align: 'center'
        },
        {
          title: '姓名',
          key: '姓名',
          align: 'center'
        },
        {
          title: '住院号',
          key: 'caseNo',
          align: 'center'
        },
        {
          title: '主治医师',
          key: '主治医师',
          align: 'center'
        },
        {
          title: '入院日期',
          key: '入院日期',
          align: 'center',
          width: 175
        },
        {
          title: '出院时间',
          key: 'addTime',
          align: 'center',
          sortable: true,
          width: 175,
          sortMethod: function (a, b, type) {
            console.log(a)
            console.log(b)
            console.log(type)
          }
        },
        {
          title: '质量缺陷数量',
          key: 'errorNum',
          align: 'center'
        },
        {
          title: '质量缺陷',
          slot: 'qualityDefects',
          align: 'center'
        }
      ],
      hospitalData: [
        {
          officeName: '',
          姓名: '',
          caseNo: '',
          doctorName: '',
          addTime: '',
          errorNum: '',
          workMark: '',
          isWork: ''
        }
      ],
      hospitalDataPage: {},
      model: false,
      boxInfo: {},
      columns1: [
        {
          title: '缺陷项目',
          key: 'monitorName',
          align: 'center'
        },
        {
          title: '缺陷详情',
          key: 'errorTips',
          align: 'center'
        },
        {
          title: '更正提示',
          key: 'hint',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'look',
          width: 130,
          align: 'center'
        }
      ],
      dataInfo: [
        {
          title: '缺陷项目',
          key: '缺陷项',
          align: 'center'
        },
        {
          title: '病历内容',
          slot: '缺陷内容',
          align: 'center'
        }
      ],
      dataInfoTable: [],
      data1: [
        {
          monitorName: '',
          errorTips: ''
        }
      ],
      doctorData: {},
      lookThisInfo: false,
      execButton: false,
      pageth: 1,
      pageth1: 1,
      caseId: '',
      dataPage: 10,
      modelTotol: {},
      spinShow: false,
      caseNo1: '',
      findText: ''
    }
  },
  mounted () {
    console.log(this.$route.query)
    this.initData()
    this.findInfo(this.$route.query)
  },
  watch: {
    findText (text) {
      console.log(text)
      var moment = require('moment')
      let data = {
        baseId: 'inhos',
        doctor: this.model3,
        errtype: this.model2,
        pageSize: 7,
        office: this.model1,
        order: 'asc',
        ordername: 'addTime',
        sort: this.sort,
        end: moment(this.endTime).format('YYYY-MM-DD'),
        start: moment(this.startTime).format('YYYY-MM-DD'),
        住院号: text
      }
      this.axios.post('/emrqs/cases/list', data).then(retVal => {
        this.hospitalData = retVal.data.list
        console.log(this.hospitalData)
        this.hospitalDataPage = retVal.data
      })
    }
  },
  methods: {
    initData () {
      this.axios.post('/emrqs/common/search-cond').then(retVal => {
        this.department = retVal.data
      })
      this.axios.post('/emrqs/common/checktype').then(retVal => {
        this.qualityControl = retVal.data
      })
      this.axios.post('/emrqs/menu/butmenu').then(retVal => {
        console.log(retVal.data)
        for (var i = 0; i < retVal.data.length; i++) {
          console.log(retVal.data[i])
          if (retVal.data[i].uuid === 'button1-3-1') {
            console.log('true')
            this.execButton = true
          }
        }
      })
    },
    changeSelect (index) {
      this.index = index
    },
    findInfo () {
      let data = {
        baseId: 'inhos',
        doctor: '',
        end: '',
        errtype: '',
        pageSize: 7,
        pageth: 1,
        office: '',
        order: 'asc',
        ordername: 'addTime',
        start: '',
        sort: '',
        name: this.$route.query.name,
        id: this.$route.query.id

      }
      this.axios.post('/emrqs/cases/list', data).then(retVal => {
        this.hospitalData = retVal.data.list
        console.log(this.hospitalData)
        this.hospitalDataPage = retVal.data
      })
    },
    modelOpen (index) {
      this.pageth1 = 1
      console.log(index)
      this.caseNo1 = this.hospitalData[index].caseNo
      console.log(this.hospitalData)
      console.log(this.caseNo1)
      this.caseId = this.hospitalData[index]
      this.model = true
      let data = {
        id: this.hospitalData[index].id,
        ordername: 'checkRuleType',
        pageSize: 5,
        pageth: 1
      }
      this.boxInfo = this.hospitalData[index]
      this.axios.post('/emrqs/cases/case-errs', data).then(retVal => {
        console.log(this.boxInfo)
        this.data1 = retVal.data
        this.modelTotol = retVal.data
        console.log(this.modelTotol)
      }).catch(retVal => {
        console.log('catch')
      })
    },
    cancel () {
      this.model = false
    },
    searchInfo (index) {
      var moment = require('moment')
      console.log(this.endTime)
      let data = {
        baseId: 'inhos',
        doctor: this.model3,
        errtype: this.model2,
        pageSize: 7,
        office: this.model1,
        pageth: index,
        order: 'asc',
        ordername: 'addTime',
        sort: this.sort,
        end: moment(this.endTime).format('YYYY-MM-DD'),
        start: moment(this.startTime).format('YYYY-MM-DD')
      }
      this.axios.post('/emrqs/cases/list', data).then(retVal => {
        this.hospitalData = retVal.data.list
        this.hospitalDataPage = retVal.data
      })
    },
    changePage (e) {
    },
    selectOption (index) {
      this.doctorData = index.doctor
    },
    lookok () {
    },
    lookcancel () {
    },
    exec () {
      this.spinShow = true
      this.axios.post('/emrqs/exec/exec').then(retVal => {
        this.initData()
        this.findInfo()
        if (retVal.data === true) {
          this.$Message.success('检查完成！')
          this.spinShow = false
        }
        if (retVal.data === false) {
          this.$Message.error('失败！')
          this.spinShow = false
        }
      }).catch(retVal => {
        this.initData()
        this.findInfo()
        console.log(retVal)
        this.$Message.error('失败！')
        this.spinShow = false
      })
    },
    goPage (pageth) {
      console.log(pageth)
      this.pageth = pageth
      this.searchInfo(pageth)
    },
    goPage1 (res) {
      console.log(res)
      this.pageth1 = res
      let data = {
        id: this.caseId.id,
        ordername: 'checkRuleType',
        pageSize: 5,
        pageth: this.pageth1
      }
      console.log(data)
      this.boxInfo = this.caseId
      this.axios.post('/emrqs/cases/case-errs', data).then(retVal => {
        console.log(this.boxInfo)
        this.data1 = retVal.data
      }).catch(retVal => {
        console.log('catch')
      })
    },
    openInfo (res) {
      this.lookThisInfo = true
      console.log(res)
      var data = {
        id: res.id,
        caseNo: this.caseNo1
      }
      data = qs.stringify(data)
      this.axios.post('/emrqs/cases/particulars', data).then(retVal => {
        console.log(retVal.data)
        this.dataInfoTable = retVal.data
      })
    },
    changeSort () {
      var moment = require('moment')
      console.log(this.sort)
      if (this.sort === 'DESC') {
        this.sort = 'ASC'
      } else this.sort = 'DESC'
      let data = {
        baseId: 'inhos',
        doctor: '',
        end: moment(this.endTime).format('YYYY-MM-DD'),
        start: moment(this.startTime).format('YYYY-MM-DD'),
        errtype: '',
        pageSize: 7,
        pageth: 1,
        office: '',
        order: 'asc',
        ordername: 'addTime',
        sort: this.sort
      }
      //
      this.axios.post('/emrqs/cases/list', data).then(retVal => {
        this.hospitalData = retVal.data.list
        console.log(this.hospitalData)
        this.hospitalDataPage = retVal.data
        this.initData()
      })
    }
  }
}
</script>
