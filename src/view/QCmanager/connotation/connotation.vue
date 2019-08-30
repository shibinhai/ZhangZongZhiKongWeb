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
    }
    .conInput{
      width: 300px;
    }
  }
</style>
<style>
  /*.ivu-checkbox-disabled+span{*/
    /*color: #308CEE;*/
    /*font-weight: bold;*/
  /*}*/
</style>
<template>
  <div class="contant">
    <Button type="success" @click="connotationModal = true">内涵质控配置</Button>
    <Modal
      v-model="connotationModal"
      title="内涵质控配置"
      @on-ok="ok"
      width="500"
      @on-cancel="cancel">
      <div class="input-line clearfix">
        <div class="text fl">科室</div>
        <Select class="fl conInput" v-model="model1">
          <Option v-for="item in selectData" @click.native="selectOption(item)" :value="item.office" :key="item.office">{{ item.office }}</Option>
        </Select>
      </div>
      <div class="input-line clearfix">
        <div class="text fl">医师</div>
        <Select class="fl conInput" v-model="model2">
          <Option v-for="item in doctorData" :value="item" :key="item">{{ item }}</Option>
        </Select>
      </div>
      <div class="input-line clearfix">
        <div class="text fl">质控字段</div>
        <Input @on-focus="openSelectTags" placeholder="选择质控字段" class="fl conInput" v-model="model3" />
      </div>
      <template v-if="ontherInput === true">
        <div class="input-line clearfix">
          <div class="text fl">诊断</div>
          <Select v-model="model6" class="fl conInput">
            <Option value=""></Option>
          </Select>
        </div>
        <div class="input-line clearfix">
          <div class="text fl">标准内容</div>
          <Input class="fl conInput" placeholder="输入标准内容" v-model="model4" />
        </div>
        <div class="input-line clearfix">
          <div class="text fl">提示语</div>
          <Input class="fl conInput" placeholder="输入提示语" v-model="model5" />
        </div>
      </template>
    </Modal>
    <Modal
      v-model="selectGropTags"
      title="选择质控子段">
      <p style="font-size: 15px;line-height: 3.0">住院病例</p>
      <template>
        <CheckboxGroup v-model="checked">
          <template v-for="(item, index) in group">
            <Checkbox :key="item.id" v-model="item.status" @click.native="checkGroup(index)" :label="item.name"></Checkbox>
          </template>
        </CheckboxGroup>
      </template>
      <div slot="footer">
        <Button type="success" size="large" @click="clearCheck">重新选择</Button>
        <Button type="error" size="large" @click="close">取消</Button>
        <Button type="primary" size="large" @click="checkinput">确定</Button>
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
    <Table border size="small" style="width: 100%;margin-top: 20px" :columns="departmentQualityProblem" :data="departmentQualityProblemData">
      <template slot-scope="{ row }" slot="problemProportion">
        <Progress :percent=" row.problemProportion" />
      </template>
    </Table>
  </div>
</template>

<script>
export default {
  name: 'connotation',
  data () {
    return {
      departmentQualityProblem: [
        {
          title: '科室',
          key: 'departmentName'
        },
        {
          title: '医师',
          key: 'completeness'
        },
        {
          title: '监控项',
          key: 'timeLimit'
        },
        {
          title: '诊断',
          key: 'logicalTerm'
        },
        {
          title: '表达式',
          key: 'logicalTerm'
        },
        {
          title: '提示语',
          key: 'logicalTerm'
        },
        {
          title: '创建日期',
          key: 'logicalTerm'
        },
        {
          title: '创建人',
          key: 'logicalTerm'
        },
        {
          title: '操作',
          slot: 'problemProportion',
          width: 130
        }
      ],
      departmentQualityProblemData: [],
      connotationModal: false,
      selectData: {},
      model1: '',
      model2: '',
      model3: '',
      model4: '',
      model5: '',
      model6: [],
      doctorData: {},
      selectGropTags: false,
      group: [],
      checked: [],
      ontherInput: true,
      monitors: []
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.axios.post('/emrqs/common/search-cond').then(retVal => {
        this.selectData = retVal.data
      })
      this.axios.post('/emrqs/monitor/group').then(retVal => {
        this.group = retVal.data.hospital
        this.group.status = false
      })
    },
    ok () {
      let data = {
        base: 'inhos',
        doctor: this.model2,
        illness: '',
        monitors: this.monitors,
        office: this.model1,
        plugin: this.model6,
        template: null,
        tipVal: null
      }
      if (this.monitors.length < 2) {
        if (this.model6.length === 0) {
          this.$Message.error('请选择诊断！')
        } else {
          this.save(data)
        }
      } else {
        this.save(data)
      }
      this.connotationModal = false
    },
    save (data) {
      this.axios.post('/emrqs/connotation/save', data).then(retVal => {
        this.$Message.success('保存成功！')
      })
    },
    cancel () {
      this.$Message.info('取消操作！')
      this.connotationModal = false
    },
    selectOption (index) {
      this.doctorData = index.doctor
    },
    openSelectTags () {
      if (this.model1 === '') {
        this.$Message.error('请选择科室！')
      } if (this.model1 !== '') {
        if (this.model2 === '') {
          this.$Message.error('请选择医生！')
        } else {
          this.checked = []
          this.monitors = []
          this.selectGropTags = true
        }
      }
    },
    close () {
      this.selectGropTags = false
      this.checked = []
      this.checkgroupRes = []
      this.$Message.info('取消操作！')
    },
    checkinput () {
      this.selectGropTags = false
      this.model3 = this.checked.join(',')
      for (var z = 0; z < this.checked.length; z++) {
        let demo = {
          datatype: 'String',
          name: this.checked[z],
          outkey: this.checked[z]
        }
        this.monitors = this.monitors.concat(demo)
      }
      if (this.monitors.length >= 2) {
        this.ontherInput = false
      } else {
        this.ontherInput = true
      }
      this.checked = []
    },
    checkGroup (index) {
      this.group[index].status = true
    },
    clearCheck () {
      this.checked = []
      this.checkgroupRes = []
    }
  }
}
</script>
