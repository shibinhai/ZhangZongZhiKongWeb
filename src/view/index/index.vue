<!--suppress ALL -->
<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
  .contant {
  }
</style>
<style>

</style>
<template>
  <div class="contant">
    <div id="main" style="width: 800px;height:400px!important;margin: 0 auto"></div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      mean: [],
      lastYear: [],
      mounthth: '',
      mth: ''
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.axios.post('/emrqs/role/menu').then(retVal => {
        console.log(retVal.data)
        if (retVal.data[0].uuid !== '1') {
          this.$router.push('/hospital')
        }
      })
      this.axios.post('/emrqs/home/year').then(retVal => {
        var moment = require('moment')
        console.log(moment().format('YYYY'))
        this.forecast = retVal.data.forecast
        console.log(retVal.data.rate.length)
        for (var i = 0; i < retVal.data.rate.length; i++) {
          this.mean = this.mean.concat([
            retVal.data.mean
          ])
        }
        for (var z = 0; z < 12; z++) {
          this.lastYear = this.lastYear.concat([
            retVal.data.lastYear
          ])
        }
        var options = {
          color: ['#2d8cf0', '#ff9900', '#19be6b', '#ed4014'],
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['本年度合格率变化趋势', '月度合格率', '本年度合格率'].concat(moment().format('YYYY') - 1 + '年度合格率')
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            boundaryGap: false,
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            splitLine: {
              color: ['#ccc'],
              width: 1,
              type: 'solid'
            }
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} %'
            },
            splitNumber: 10,
            max: 100
          },
          series: [
            {
              name: '本年度合格率',
              type: 'line',
              data: this.mean
            },
            {
              name: '本年度合格率变化趋势',
              type: 'line',
              data: retVal.data.forecast
            },
            {
              name: '月度合格率',
              type: 'line',
              data: retVal.data.rate
            },
            {
              name: moment().format('YYYY') - 1 + '年度合格率',
              type: 'line',
              data: this.lastYear
            }
          ]
        }
        var echarts = require('echarts')
        var myChart = echarts.init(document.getElementById('main'))
        myChart.setOption(options)
        myChart.on('click', params => {
          var mounths = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
          this.mounthth = params.name
          if (params.seriesName === '月度合格率') {
            for (var m = 0; m <= mounths.length; m++) {
              var mounth = m + 1
              if (this.mounthth === mounths[m]) {
                if (params.seriesName === moment().format('YYYY') - 1 + '年度合格率') {
                  this.mth = ''
                } else {
                  this.mth = moment().format('YYYY') + '-' + mounth
                  console.log('mth', this.mth)
                  this.$router.push(`/index2/${this.mth}`)
                }
              }
            }
          } else {
            console.log('error')
            console.log('error')
          }
        })
      })
    }
  }
}
</script>
