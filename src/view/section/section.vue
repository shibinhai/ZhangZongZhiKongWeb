<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
.select-span{
  display: block;
  width: 100%;
}
  .modal{
    cursor: pointer;
  }
  .contant{
    .title{
      .title-span:nth-child(1){
        margin-right: 10px;
      }
      .title-span{
        margin: 0 10px 0 15px;
        font-weight: 700;
        font-size: 14px;
      }
    }
  }
</style>

<style>
  .ivu-select-dropdown{
    width: 100px!important;
    text-align: left;
  }
  .ivu-select-dropdown{
    width: 217px!important;
  }
</style>
<template>
  <div class="contant">
    <div class="title clearfix">
      <div class="title-left fl">
        <span class="title-span">科室</span>
        <template>
          <Select style="width:150px" filterable >
            <Option v-for="(item, index) in department" :value="index" :key="item.office"><span class="select-span" @click="selectDepartment(index)">{{ item.office }}</span></Option>
          </Select>
        </template>
        <span class="title-span">主治医生</span>
        <template>
          <Select style="width:150px" filterable>
            <Option v-for="item in department[index].doctor" :value="item" :key="item.office">{{ item }}</Option>
          </Select>
        </template>
        <span class="title-span">时间</span>
        <DatePicker type="date" placeholder="开始时间" style="width: 150px"></DatePicker>
        <DatePicker type="date" placeholder="结束时间" style="width: 150px"></DatePicker>
        <Button type="primary">搜索</Button>
        <Button type="info">检查</Button>
      </div>
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
    </div>
    <Table border :columns="columns" :data="data"></Table>
  </div>
</template>

<script>
export default {
  name: 'section',
  data () {
    return {
      model1: '',
      department: [{
        doctor: {}
      }],
      index: 0,
      modal1: false,
      tableList: {},
      tabsName: 'name',
      columns: [
        {
          title: '问题状态',
          key: 'problemState'
        },
        {
          title: '工作标记',
          key: 'workMark'
        },
        {
          title: '检测时间',
          key: 'detectiontime'
        },
        {
          title: '是否重点病例',
          key: 'keyCases'
        },
        {
          title: '问题详情',
          key: 'detailsProblem'
        }
      ],
      data: [
      //   {
      //     problemState: '',
      //     workMark: '',
      //     detectiontime: '',
      //     keyCases: '',
      //     detailsProblem: ''
      //   }
      ]
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.axios.post('/emrqs/common/search-cond').then(retVal => {
        this.department = retVal.data
      })
    },
    selectDepartment (index) {
      this.index = index
    },
    ok () {
      this.$Message.info('Clicked ok')
    },
    cancel () {
      this.$Message.info('Clicked cancel')
    }
  }
}
</script>
