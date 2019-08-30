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
  .card-title{
    margin-bottom: 20px;
    line-height: 50px;
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
        <!--<span>导出数据</span>-->
        <!--<DatePicker type="daterange" placement="bottom-end" placeholder="选择时间段" v-model="time3" style="width: 200px"></DatePicker>-->
        <!--<DatePicker  v-model="time3" :value="time3" type="daterange" placement="bottom-end" placeholder="选择时间段" style="width: 200px"></DatePicker>-->
        <!--<Button type="primary" @click="getout()">导出</Button>-->
        <Poptip placement="bottom" width="200" v-if="buttonInfo[0] === '月中医治疗量科室统计表'">
          <Button @click="getout">导出</Button>
          <div class="api" slot="content">
            <a :href="'http://' + urlHerf + '/emrqs/treament/Inmedicineoffice'">
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
      <h2 class="card-title">
        物理治疗与康复项目
        <Input placeholder="添加条目" v-model="addInfoValue" style="width: 200px;margin-left: 50px;margin-right: 20px;"/>
        <Button  type="primary" @click="addinfo('物理治疗与康复项目')">添加</Button>
        <Select style="width:150px" filterable v-model="delInfoValue" placeholder='选择要删除项目'>
          <Option v-for="item in resValue" :value="item.name" :key="item.name" v-if="item.sort === '物理治疗与康复项目'">
            <template>{{ item.name }}</template>
          </Option>
        </Select>
        <Button  type="error" @click="delinfo('物理治疗与康复项目')">删除</Button>
      </h2>
      <div class="input" v-for="(item, index) in info.center" :key="item.name">
        <div class="clearfix item" v-if="item.sort === '物理治疗与康复项目'">
          <span class="fl">{{item.name}}</span>
          <Input class="fl itemInput" type="number" :min="0" :value="resValue[index].val" @on-change="changeValue(resValue[index].val, index)" v-model="resValue[index].val" style="width: 150px" size="large" placeholder="" />
        </div>
      </div>
    </Card>
    <Card class="clearfix" style="margin-top: 30px">
      <h2 class="card-title">
        传统中医护理技术
        <Input placeholder="添加条目" v-model="addInfoValue" style="width: 200px;margin-left: 50px;margin-right: 20px;"/>
        <Button  type="primary" @click="addinfo('传统中医护理技术')">添加</Button>
        <Select style="width:150px" filterable v-model="delInfoValue" placeholder='选择要删除项目'>
          <Option v-for="item in resValue" :value="item.name" :key="item.name" v-if="item.sort === '传统中医护理技术'">
            <template>{{ item.name }}</template>
          </Option>
        </Select>
        <Button  type="error" @click="delinfo('传统中医护理技术')">删除</Button>
      </h2>
      <div class="input" v-for="(item, index) in info.center" :key="item.name">
        <div class="clearfix item" v-if="item.sort === '传统中医护理技术'">
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
      addInfoValue: '',
      delInfoValue: '',
      urlHerf: '192.168.1.35:9502'
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
      console.log(this.time)
      this.initData(this.selectOffice)
    },
    initData (res) {
      console.log(res)
      var data = {
        time: this.time,
        distinction: 2,
        office: res
      }
      console.log(String(this.time))
      this.axios.post('/emrqs/treament/parameter', data).then(retVal => {
        this.info = retVal.data
        console.log(this.info)
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
      for (var i = 0; i < this.resValue.length; i++) {
        console.log(Number(this.resValue[i].val))
        if (this.resValue[i].val === undefined || this.resValue[i].val === null || this.resValue[i].val === '' || typeof (this.resValue[i].val) === 'undefined') {
        } else {
          res[i] = {
            name: this.info.center[i].name,
            value: this.resValue[i].val,
            uuid: this.resValue[i].uuid,
            type: this.resValue[i].sort,
            office: this.info.office[0],
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
    },
    addinfo (res) {
      console.log(res)
      if (this.addInfoValue === '') {
        console.log('不能为空喔')
      } else {
        console.log(this.addInfoValue)
        var data = {
          name: this.addInfoValue,
          type: res
        }
        this.axios.post('/emrqs/treament/insertitem', data).then(retVal => {
          console.log(retVal)
          this.initData()
          if (retVal.data === false) {
            this.$Message.error('已经有这条数据了，不能重复添加。')
          } else {
            this.$Message.success('添加成功')
            this.addInfoValue = ''
          }
        })
      }
    },
    delinfo (res) {
      var data = {
        name: this.delInfoValue,
        type: res
      }
      console.log(data)
      this.axios.post('/emrqs/treament/delectitem', data).then(retVal => {
        console.log(retVal)
        this.initData()
        if (retVal.data === false) {
          this.$Message.error('删除失败！')
        } else {
          this.$Message.success('删除成功')
        }
      })
    }
  }
}
</script>
