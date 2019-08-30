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
      span:nth-child(1){
        margin-right: 10px;
      }
      span{
        margin: 0 10px 0 15px;
        font-weight: 700;
        font-size: 14px;
      }
    }
  }
  .contant{
    .title{
    }
    .checkBox{
      margin-right: 20px;
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
        <span>科室</span>
        <template>
          <Select style="width:150px" filterable >
            <Option v-for="item in department" :value="item.value" :key="item.value">
              {{ item.label }}
            </Option>
          </Select>
        </template>
        <span>时间</span>
        <DatePicker type="date" placeholder="开始时间" style="width: 150px"></DatePicker>
        <DatePicker type="date" placeholder="结束时间" style="width: 150px"></DatePicker>
      </div>
      <div class="title-right fr clearfix">
        <Input class="fl" style="width: 150px" size="large" placeholder="搜索" />
        <div class="tool-box fl clearfix">
          <span class="icon" @click="initData"><i class="fa fa-refresh fa-fw"></i></span>
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
  </div>
</template>

<script>
export default {
  name: 'sore',
  data () {
    return {
      model1: '',
      index: 0,
      modal1: false,
      tableList: {},
      tabsName: 'name',
      checkBox: ['苹果'],
      department: [
        {
          label: '所有科室',
          value: '所有科室'
        },
        {
          label: '内科',
          value: '内科'
        },
        {
          label: '外科',
          value: '外科'
        },
        {
          label: '妇科',
          value: '妇科'
        },
        {
          label: '神经内科',
          value: '神经内科'
        },
        {
          label: '骨科',
          value: '骨科'
        },
        {
          label: '皮肤科',
          value: '皮肤科'
        }
      ]
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.axios.post('/emrqs/common/search-cond').then(retVal => {
        // this.department = retVal.data
      })
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
