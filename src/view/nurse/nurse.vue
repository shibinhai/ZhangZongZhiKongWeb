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
        <DatePicker type="date" placeholder="选择日期" @on-change="findTime()" v-model="time" style="width: 150px"></DatePicker>
        <span>导出数据</span>
        <!--<DatePicker type="daterange" placement="bottom-end" placeholder="选择时间段" v-model="time3" style="width: 200px"></DatePicker>-->
        <!--<DatePicker  v-model="time3" :value="time3" type="daterange" placement="bottom-end" placeholder="选择时间段" style="width: 200px"></DatePicker>-->
        <!--<Button type="primary" @click="getout()">导出</Button>-->
        <!--<Poptip placement="bottom" width="200">-->
          <!--<Button @click="getout">导出</Button>-->
          <!--<div class="api" slot="content">-->
            <!--<template v-for="item in buttonInfo">-->
              <!--<Button type="primary" style="display: block;margin: 5px auto" @click="getInput(item)" :key="item">{{ item }}</Button>-->
            <!--</template>-->
          <!--</div>-->
        <!--</Poptip>-->
        <Poptip placement="bottom" width="200" v-if="buttonInfo[0] === '月中医治疗量科室统计表'">
          <Button @click="getout">导出</Button>
          <div class="api" slot="content">
            <a :href="'http://' + urlHerf + '/emrqs/treament/Innursingoffice'">
              <Button type="primary" style="display: block;margin: 5px auto">月中医治疗量科室统计表</Button>
            </a>
            <a :href="'http://' + urlHerf + '/emrqs/treament/Innursingoffice'">
              <Button type="primary" style="display: block;margin: 5px auto">月护理工作量科室统计表</Button>
            </a>
            <a :href="'http://' + urlHerf + '/emrqs/treament/healtheducationoffice'">
              <Button type="primary" style="display: block;margin: 5px auto">健康教育知晓率科室统计表</Button>
            </a>
            <!--<template v-for="item in buttonInfo">-->
            <!--<Button type="primary" style="display: block;margin: 5px auto" @click="getInput(item)" :key="item">{{ item }}</Button>-->
            <!--</template>-->
          </div>
        </Poptip>
        <Poptip placement="bottom" width="200" v-if="buttonInfo[0] === '月中医治疗量全院统计表'">
          <Button @click="getout">导出</Button>
          <div class="api" slot="content">
            <a :href="'http://' + urlHerf + '/emrqs/treament/Inmedicinefloor'">
              <Button type="primary" style="display: block;margin: 5px auto">月中医治疗量全院统计表</Button>
            </a>
            <a :href="'http://' + urlHerf + '/emrqs/treament/healtheducationfloor'">
              <Button type="primary" style="display: block;margin: 5px auto">健康教育知晓率全院统计表</Button>
            </a>
            <a :href="'http://' + urlHerf + '/emrqs/treament/Innursingfloor'">
              <Button type="primary" style="display: block;margin: 5px auto">月护理工作量全院统计表</Button>
            </a>
            <!--<template v-for="item in buttonInfo">-->
            <!--<Button type="primary" style="display: block;margin: 5px auto" @click="getInput(item)" :key="item">{{ item }}</Button>-->
            <!--</template>-->
          </div>
        </Poptip>
      </div>
    </div>
    <Card class="clearfix" style="margin-top: 30px">
      <div class="input" v-for="(item, index) in info.center" :key="item.name">
        <div class="clearfix item">
          <span class="fl">{{item.name}}</span>
          <Input class="fl itemInput" type="number" :min="0" :value="resValue[index].val" @on-change="changeValue(resValue[index].val, index)" v-model="resValue[index].val" style="width: 150px" size="large" placeholder="" />
        </div>
      </div>
    </Card>
    <div style="margin-top: 30px;">
      <Button type="primary" class="fr" style="width: 100px;" @click="goInput()">确认</Button>
    </div>
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
      urlHerf: '192.168.1.35:9502',
      goInputOffice: ''
    }
  },
  mounted () {
    this.initData()
    this.getout()
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
      console.log(this.time, 'this.time')
      this.initData(this.selectOffice)
    },
    initData (res) {
      console.log(res)
      var data = {
        time: this.time,
        distinction: 1,
        office: res
      }
      console.log(String(this.time))
      this.axios.post('/emrqs/treament/parameter', data).then(retVal => {
        this.info = retVal.data
        this.office = retVal.data.office
        this.resValue = retVal.data.center
      })
    },
    ok () {
      this.$Message.info('Clicked ok')
    },
    cancel () {
      this.$Message.info('Clicked cancel')
    },
    goInput () {
      var res = [
        {
          name: '',
          value: '',
          type: '',
          uuid: '',
          adddata: this.time
        }
      ]
      console.log(res)
      for (var i = 0; i < this.resValue.length; i++) {
        console.log(Number(this.resValue[i].val))
        if (this.resValue[i].val === undefined || this.resValue[i].val === null || this.resValue[i].val === '' || typeof (this.resValue[i].val) === 'undefined') {
        } else {
          res[i] = {
            name: this.info.center[i].name,
            value: this.resValue[i].val,
            uuid: this.resValue[i].uuid,
            type: '',
            adddata: this.time
          }
        }
      }
      for (var x = 0; x < res.length; x++) {
        if (res[x] === '' || res[x] == null || typeof (res[x]) === 'undefined') {
          res.splice(x, 1)
          x = x - 1
        }
      }
      console.log(res)
      let data = res
      // data = qs.stringify(data)
      this.axios.post('emrqs/treament/insertnumber', data).then(retVal => {
        console.log(retVal)
        this.initData()
      })
      console.log('res', res)
    },
    getout () {
      console.log('res')
      // if (this.time1 === '' || this.time2 === '') {
      //   this.$Message.warning('请完整填写时间。')
      // }
      // let data = {
      //   littletime: this.time1,
      //   bigtime: this.time2,
      //   type: ''
      // }
      this.axios.post('emrqs/treament/excel').then(retVal => {
        console.log(retVal.data[0].office)
        this.goInputOffice = retVal.data[0].office
        this.buttonInfo = retVal.data[0].excel
        console.log(this.buttonInfo)
      })
    },
    getInput (res) {
      console.log(res)
      console.log('res', this.selectOffice)
      window.location.href = '/emrqs/treament/derive/' + '1'
      // this.axios.post('emrqs/treament/derive/' + this.goInputOffice).then(retVal => {
      //   console.log(retVal)
      //   // window.location.href = 'emrqs/treament/derive/' + this.goInputOffice + '/' + res
      // })
    }
  }
}
</script>
