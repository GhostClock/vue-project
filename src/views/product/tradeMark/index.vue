<template>
  <div>
    <!-- 按钮 -->
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0" @click="showDialog">添加</el-button>
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
          <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateTradeMark">修改</el-button>
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
    <!-- 对话框
    visible.sync: 控制对话框 显示和隐藏 用的
    -->
    <el-dialog
      title="添加品牌"
      :visible.sync="dialogVisible"
    >
      <!-- 展示表单元素 from -->
      <el-form style="width: 80%">
        <el-form-item label="品牌名称" label-width="100px">
          <el-input auto-complete="off" />
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px">
          <!-- 上传组件
            :on-success="handleSuccess" 上传成功的回调
            :before-upload="beforeUpload" 上传成功之前的回调
           -->
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleSuccess"
            :before-upload="beforeUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件,且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import file from 'os'
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
      list: [],
      // 对话框显示和隐藏
      dialogVisible: false,
      // 上传图片使用的属性
      imageUrl: ''
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
    },
    // 点击添加品牌按钮
    showDialog() {
      // 显示对话框
      this.dialogVisible = true
    },
    // 修改某一个品牌
    updateTradeMark() {
      this.dialogVisible = true
    },
    // 上传成功
    handleSuccess() {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    // 上传之前
    beforeUpload() {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
