<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
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
    <Table border :columns="columns12" :data="data6">
      <template slot-scope="{ row }" slot="change">
        <Button type="primary" size="small" style="margin-right: 5px" @click="goLook(row)">查看</Button>
      </template>
    </Table>
  </div>
</template>

<script>
export default {
  name: 'hospital',
  data () {
    return {
      columns12: [
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '缺陷病历数',
          key: 'errNum'
        },
        {
          title: '检查时间',
          key: 'addTime'
        },
        {
          title: '操作',
          slot: 'change'
        }
      ],
      data6: []
    }
  },
  mounted () {
    this.initData()
  },
  watch: {
  },
  methods: {
    initData () {
      this.axios.post('/emrqs/cases/docList').then(retVal => {
        this.data6 = retVal.data
        console.log(retVal.data)
      })
    },
    goLook (res) {
      console.log(res)
      this.$router.push({path: '/hospital', query: {name: res.name, id: res.id}})
    }
  }
}
</script>
