<template>
  <div>
    <!-- 按钮 -->
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0">添加</el-button>
    <!-- 表格组件
    data：主要展示的数据 - 数组类型
    border: 边框
    column:
      label: 显示的标题
      width: 对应列的宽度
      align: 标题的对其方式
      prop: 对应数据的属性名
    注意1: elementUI当中的table组件，展示的数据是一列一列的展示数据
     -->
    <el-table style="width: 100%" border :data="list">
      <el-table-column type="index" label="序号" width="80px" align="center" />
      <el-table-column prop="tmName" label="品牌名称" width="width" align="center" />
      <el-table-column label="品牌LOGO" width="width">
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" :alt="$index" style="width:100px;height:100px">
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button type="warning" icon="el-icon-edit" size="mini">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器
    当前页，数据的总条数、每页展示的条数、连续页码数
      @size-change="handleSizeChange" 修改每页的条数
      @current-change="handleCurrentChange" 当前点击的页码

      current-page:当前第几页
      total：总数据条数
      page-size: 每页要展示的数据
      page-sizes: 可设置每一页展示多少条数据
      layout: 可以实现分页的布局
      page-count: 按钮的数量 如果是9 连续的页面是7
     -->
    <el-pagination
      style="margin-top: 20px; textAlign: center"
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-count="7"
      :page-sizes="[3, 5, 10]"
      layout="prev, pager, next, jumper, ->, sizes, total"
      @current-change="getPageList"
      @size-change="handleSizeChange"
    />
  </div>
</template>
<script>
export default {
  name: "tradeMark",
  data() {
    return {
      // 党费钱分页器第几页
      page: 1,
      // 当前页数战术数据条数
      limit: 3,
      // 总数据条数
      total: 0,
      // 列表展示的数据
      list: []
    }
  },
  // 组件挂载完毕，发起请求
  mounted() {
    this.getPageList()
  },
  methods: {
    // 获取品牌列表的数据
    async getPageList(pager = 1) {
      // 修改页码数
      this.page = pager
      // 解构出参数
      const { page, limit } = this
      // 获取品牌列表的接口 带参数 当前页码page、当前页limit
      const result = await this.$API.tradeMark.reqTradeMarkList(page, limit)
      console.log('品牌列表数据', result)
      if (result.code === 200) {
        // 数据的总条数
        this.total = result.data.total
        // 列表数据
        this.list = result.data.records
      }
    },
    // 当分页器某一页需要展示的条数发生变化时会触发
    handleSizeChange(limit) {
      this.limit = limit
      this.getPageList()
    }
  }
}
</script>
<style lang="less" scoped>
</style>