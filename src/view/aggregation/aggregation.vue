<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
  .contant{
    background-color: #ffffff;
  }
</style>

<template>
  <div class="contant">
    <div class="contant">
      <Button type="warning">打印</Button>
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
        <template slot-scope="{ row }" slot="departmentName">
          <div class="name">{{ row.departmentName }}</div>
        </template>
        <template slot-scope="{ row }" slot="problemProportion">
          <Progress :percent=" row.problemProportion" />
        </template>
      </Table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'aggregation',
  data () {
    return {
      departmentQualityProblem: [
        {
          title: '病案号',
          slot: 'departmentName'
        },
        {
          title: '姓名',
          key: 'completeness'
        },
        {
          title: '科室',
          key: 'timeLimit'
        },
        {
          title: '病区',
          key: 'logicalTerm'
        },
        {
          title: '性别',
          key: 'logicalTerm'
        },
        {
          title: '主管医生',
          key: 'logicalTerm'
        },
        {
          title: '主治医生',
          key: 'logicalTerm'
        },
        {
          title: '主任医师',
          key: 'logicalTerm'
        },
        {
          title: '问题状态',
          key: 'logicalTerm'
        },
        {
          title: '工作标记',
          slot: 'problemProportion',
          width: 130
        }
      ],
      departmentQualityProblemData: []
    }
  }
}
</script>
