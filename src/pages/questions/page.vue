<template>
    <d2-container class="page">

        <el-table
                :data="tableData"
        >
            <el-table-column
                    prop="id"
                    label="编号"
            >
                <template slot="header" slot-scope="slot">
                    <el-input
                            v-model="search"
                            placeholder="按关键字搜索"
                            @input="handleSearch"
                    />
                </template>
            </el-table-column>
            <el-table-column
                    prop="statement"
                    label="问题"
            >
            </el-table-column>
            <el-table-column
                    prop="response"
                    label="答案">
            </el-table-column>
            <el-table-column
                    prop="created_at"
                    label="创建时间">
            </el-table-column>
            <el-table-column
                    align="right">
                <template slot="header" slot-scope="slot">
                    <el-button type="primary" icon="el-icon-plus" circle @click="handleAdd"></el-button>
                </template>
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="pagination"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[10, 20, 30]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
    </d2-container>
</template>

<script>
import { getRsponsesList, deleteReponse } from '@/api/response'

export default {
  data () {
    return {
      tableData: [],
      search: '',
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      getRsponsesList(this.searchParams)
        .then(res => {
          console.log(res)
          this.total = res.count
          this.tableData = res.results
        })
    },
    handleEdit (index, row) {
      this.$router.push({
        path: `/questions/${row.id}`
      })
    },
    handleDelete (index, row) {
      this.$confirm('此操作将删除该问题?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteReponse(row.id)
          .then(res => {
            this.$message.success('删除成功')
            this.loadData()
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSearch () {
      this.loadData()
    },
    handleSizeChange (value) {
      console.log(value)
      this.pageSize = value
      this.loadData()
    },
    handleCurrentChange (value) {
      console.log(value)
      this.currentPage = value
      this.loadData()
    },
    handleAdd () {
      this.$router.push({
        path: '/questions/new'
      })
    }
  },
  computed: {
    searchParams () {
      return {
        search: this.search,
        page_size: this.pageSize,
        page: this.currentPage
      }
    }
  }
}
</script>
<style scoped>
    .page {
        text-align: center;
    }

    .pagination {
        margin-top: 20px;
    }
</style>
