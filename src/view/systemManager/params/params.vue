<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
  .contant{
    background-color: #ffffff;
  }
  .overTextHidden{
    width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>

<template>
  <div class="contant">
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
    <Table border size="small" style="width: 100%;margin-top: 60px" :columns="departmentQualityProblem" :data="params">
      <template slot-scope="{ row }" slot="paramValue">
        <Poptip trigger="hover" :content="row.paramValue" word-wrap width="200">
          <div class="name overTextHidden">{{ row.paramValue }}</div>
        </Poptip>
      </template>
      <template slot-scope="{ row }" slot="problemProportion">
        <Button type="primary" @click="setJson(row)">设置参数</Button>
      </template>
    </Table>
    <Modal
      v-model="setJsonModel">
      <h1 style="padding: 40px 20px;text-align: center;font-weight: 700">逻辑质控特殊字符去除</h1>
      <Input v-model="Json"/>
      <div slot="footer">
        <Button size="large" @click="setcancel">取消</Button>
        <Button type="error" size="large" @click="setok">修改</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'params',
  data () {
    return {
      departmentQualityProblem: [
        {
          title: '配置名',
          key: 'name'
        },
        {
          title: '参数值',
          slot: 'paramValue'
        },
        {
          title: '配置介绍',
          key: 'introduce'
        },
        {
          title: '修改时间',
          key: 'time'
        },
        {
          title: '操作',
          slot: 'problemProportion',
          width: 130
        }
      ],
      params: [],
      setJsonModel: false,
      uuid: '',
      Json: ''
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      let data = {
        order: 'asc',
        ordername: 'addTime'
      }
      this.axios.post('/emrqs/params/list', data).then(retVal => {
        this.params = retVal.data
      })
    },
    setJson (res) {
      this.uuid = res.uuid
      this.Json = res.paramValue
      this.setJsonModel = true
    },
    setcancel () {
      this.setJsonModel = false
      this.$Message.info('操作取消！')
    },
    setok () {
      let data = {
        uuid: this.uuid,
        value: this.Json
      }
      data = qs.stringify(data)
      this.axios.post('/emrqs/params/put', data, {
        header: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(retVal => {
        this.$Message.success('操作成功！')
        this.setJsonModel = false
        this.initData()
      })
    }
  }
}
</script>
