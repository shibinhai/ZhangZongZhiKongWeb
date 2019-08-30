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
  .input{
    .item{
      width: 300px;
      float: left;
      height: 50px;
      line-height: 33px;
      span{
        width: 100px;
      }
      .itemInput{
        margin-left: 20px;
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
  .ivu-date-picker-cells{
    background-color: #fff;
  }
</style>
<template>
  <div class="contant">
    <div class="title clearfix">
      <div class="title-left fl">
        <span>科室</span>
        <template>
          <Select style="width:150px" filterable @on-change="initData(selectOffice)" v-model="selectOffice" clearable :placeholder='info.menoffice' @on-clear="initData('')">
            <Option v-for="item in office" :value="item" :key="item">
              {{ item }}
            </Option>
          </Select>
        </template>
        <span>时间</span>
        <DatePicker type="month" placeholder="选择日期" @on-change="findTime()" v-model="time" style="width: 150px"></DatePicker>
        <Poptip placement="bottom" width="200" style="margin-left: 30px">
          <Button @click="getout">导出</Button>
          <div class="api" slot="content">
            <template v-for="item in buttonInfo">
              <Button type="primary" style="display: block;margin: 5px auto" @click="getInput(item)" :key="item">{{ item }}</Button>
            </template>
          </div>
        </Poptip>
      </div>
    </div>
    <Card class="clearfix" style="margin-top: 30px">
      <p style="margin-bottom: 20px">
        本月入院患者总数（人）
        <Input class="itemInput" type="number" v-model="allnumber" :min="0" :value="0"  style="width: 150px;margin-left: 127px;" size="large" placeholder="" />
      </p>
      <p>
        健康教育调查得分>=85分患者人数（人）
        <Input class="itemInput" type="number" :min="0" v-model="mostnumber"  style="width: 150px;margin-left: 20px" size="large" placeholder="" />
      </p>
      <!--@on-change="changeValue(resValue[index].val)" v-model="resValue[index].val"-->
      <div style="margin-top: 30px;">
        <Button type="primary" class="fr" style="width: 100px;margin-bottom: 20px" @click="goInput()">确认</Button>
      </div>
    </Card>
  </div>
</template>

<script>
// import qs from 'qs'
export default {
  name: 'nurse',
  data () {
    return {
      info: {},
      office: [],
      resValue: [],
      time: '',
      time3: '',
      buttonInfo: [],
      selectOffice: '',
      mostnumber: '',
      allnumber: ''
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    changeValue (event, index) {
      console.log('123', event)
      if (event <= 0) {
        console.log(event)
        this.resValue[index].val = 0
        this.$Message.error('不能是负数喔！，负数会默认为0。')
      }
    },
    findTime () {
      console.log(this.time)
      this.initData(this.selectOffice)
    },
    initData (res) {
      var data = {
        time: this.time,
        distinction: 3,
        office: res
      }
      console.log(String(this.time))
      this.axios.post('/emrqs/treament/parameter', data).then(retVal => {
        this.info = retVal.data
        this.office = retVal.data.office
        this.resValue = retVal.data.center
        this.mostnumber = retVal.data.center[0].mostnumber
        this.allnumber = retVal.data.center[0].allnumber
        console.log(this.mostnumber)
        console.log(this.allnumber)
      })
    },
    ok () {
      this.$Message.info('Clicked ok')
    },
    cancel () {
      this.$Message.info('Clicked cancel')
    },
    goInput () {
      var res = [{
        id: this.resValue[0].id,
        allnumber: this.allnumber,
        mostnumber: this.mostnumber,
        adddata: this.time
      }]
      let data = res
      this.axios.post('emrqs/treament/insertnumber', data).then(retVal => {
        console.log(retVal)
        this.initData()
      })
      console.log('res', res)
    },
    getout () {
      console.log('res')
      this.axios.post('emrqs/treament/excel').then(retVal => {
        this.buttonInfo = retVal.data[0].excel
        console.log(this.buttonInfo)
      })
    },
    getInput (res) {
      console.log('res', this.selectOffice)
      if (this.time3[0] === '' || this.time3[1] === '') {
        this.$Message.warning('请完整填写时间。')
      } else {
        let data = {
          littletime: this.time3[0],
          bigtime: this.time3[1],
          type: res,
          office: this.selectOffice
        }
        this.axios.post('emrqs/treament/derive', data).then(retVal => {
          console.log(retVal)
        })
      }
    }
  }
}
</script>
