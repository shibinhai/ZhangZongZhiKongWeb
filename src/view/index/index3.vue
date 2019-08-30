<!--suppress ALL -->
<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
  .contant {
  }
</style>
<style>

</style>
<template>
  <div class="contant">
    <Button @click="back" style="position:absolute;right: 20px;z-index: 2">返回</Button>
    <div id="main" style="width: 700px;height:600px;margin: 0 auto"></div>
  </div>
</template>

<script>import qs from 'qs'
/* eslint-disable */
export default {
  name: 'index2',
  data () {
    return {
      mean: [],
      lastYear: [],
      mounthth: '',
      mth: '',
      month: []
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData: function () {
      console.log(this.$route.params.id)
      if (this.$route.params.id === undefined) {
        this.$router.push('/layout')
      } else {
        var data = {
          month: this.$route.params.id,
          office: this.$route.params.office
        }
        data = qs.stringify(data)
        this.axios.post('/emrqs/home/office', data).then(retVal => {
          console.log(retVal)
          for (var i = 0; i < retVal.data.rate.length ;i++) {
            this.month = this.month.concat([
              retVal.data.month
            ])
          }
          var echarts = require('echarts')
          var myChart = echarts.init(document.getElementById('main'))
          var dataAxis = retVal.data.doc
          var data = retVal.data.rate
          var yMax = 500
          var dataShadow = []
          for (var i = 0; i < data.length; i++) {
            dataShadow.push(yMax)
          }
          var option = {
            title: {
              text: '医师合格率',
            },
            tooltip : {
              trigger: 'axis'
            },
            xAxis: {
              data: dataAxis,
              axisLabel: {
                inside: true,
                textStyle: {
                  color: '#fff'
                },
                formatter: function (value) {
                  return value.split("").join("\n")
                }
              },
              axisTick: {
                show: false
              },
              axisLine: {
                show: false
              },
              z: 10
            },
            yAxis: {
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                textStyle: {
                  color: '#999'
                },
                formatter: '{value} %',
              },
              splitNumber: 10,
              max: 100
            },
            dataZoom: [
              {
                type: 'inside'
              }
            ],
            series: [
              { // For shadow
                type: 'bar',
                itemStyle: {
                  normal: {color: 'rgba(0,0,0,0.0)'}
                },
                barGap: '-100%',
                barCategoryGap: '40%',
                data: dataShadow,
                animation: false
              },
              {
                type: 'bar',
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                      [
                        {offset: 0, color: '#83bff6'},
                        {offset: 0.5, color: '#188df0'},
                        {offset: 1, color: '#188df0'}
                      ]
                    )
                  },
                  emphasis: {
                    color: new echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                      [
                        {offset: 0, color: '#2378f7'},
                        {offset: 0.7, color: '#2378f7'},
                        {offset: 1, color: '#83bff6'}
                      ]
                    )
                  }
                },
                data: data
              },
              {
                name:'平均合格率',
                type:'line',
                data: this.month,
                lineStyle: {
                  color: '#ff9900'
                }
              }
            ]
          }
          var zoomSize = 6
          myChart.on('click', params => {
            console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)])
            myChart.dispatchAction({
              type: 'dataZoom',
              // startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
              // endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
            })
            console.log(params.name)
          })
          myChart.setOption(option)
        })
      }
    },
    back(){
      this.$router.go(-1);//返回上一层
    }
  }
}
</script>
