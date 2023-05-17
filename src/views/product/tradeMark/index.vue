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
     -->
    <el-table style="width: 100%" border>
      <el-table-column prop="prop" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="prop" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column prop="prop" label="品牌LOGO" width="width">
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
      </el-table-column>
    </el-table>

    <!-- 分页器
    当前页，数据的总条数、每页展示的条数、连续页码数
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"

      current-page:当前第几页
      total：总数据条数
      page-size: 每页要展示的数据
      page-sizes: 可设置每一页展示多少条数据
      layout: 可以实现分页的布局
      page-count: 按钮的数量 如果是9 连续的页面是7
     -->
    <el-pagination
      style="margin-top: 20px; textAlign: center"
      :current-page="6"
      :total="99"
      :page-size="3"
      :page-count="7"
      :page-sizes="[3, 5, 10]"
      layout="prev, pager, next, jumper, ->, sizes, total"
    />
  </div>
</template>
<script>
export default {
  name: "tradeMark",
};
</script>
<style lang="less" scoped>
</style>