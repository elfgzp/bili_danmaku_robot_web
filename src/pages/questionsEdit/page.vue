<template>
    <d2-container class="page">
        <h2>{{title}}</h2>
        <el-form class="response-form"
                 :model="responseForm"
                 :rules="responseRules"
                 ref="responseForm"
                 label-position="top"
        >
            <el-form-item label="问题" prop="statement">
                <el-autocomplete v-model="responseForm.statement" :disabled="id !== 0" ref="questionInput"
                                 :fetch-suggestions="querySearchAsync" @select="handleSelect"
                                 style="width: 100%"
                ></el-autocomplete>
            </el-form-item>
            <el-form-item label="答案" prop="response">
                <el-input v-model="responseForm.response"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">{{id !== 0 ? '创建': '保存'}}</el-button>
                <el-button v-if="id === 0" type="primary" @click="onSubmitAndContinue">保存并继续添加</el-button>
            </el-form-item>
        </el-form>
    </d2-container>
</template>

<script>
import { createRsponse, getRsponseDetail, getRsponsesList } from '@/api/response'

export default {
  data () {
    return {
      id: 0,
      responseForm: {
        statement: '',
        response: ''
      },
      responseRules: {
        statement: [
          { required: true, message: '请输入问题' }
        ],
        response: [
          { required: true, message: '请输入答案' }
        ]
      }
    }
  },
  created () {
    let id = this.$route.params.id || 'new'
    if (id === 'new') {
      this.id = 0
    } else {
      this.id = id
    }
    this.loadReponse()
  },
  mounted () {
    this.questionInputFocus()
  },
  methods: {
    onSubmit () {
      createRsponse(this.responseForm)
        .then(res => {
          this.$message.success('保存成功')
          this.$router.go(-1)
        })
    },
    onSubmitAndContinue () {
      createRsponse(this.responseForm)
        .then(res => {
          this.$message.success('保存成功')
          this.$refs['responseForm'].resetFields()
          this.questionInputFocus()
        })
    },
    loadReponse () {
      if (this.id !== 0) {
        getRsponseDetail(this.id, {})
          .then(res => {
            this.responseForm.response = res.response
            this.responseForm.statement = res.statement
          })
      }
    },
    querySearchAsync (queryString, cb) {
      getRsponsesList({
        'statement__text': queryString
      })
        .then(res => {
          console.log(res)
          cb(res.results.map(value => {
            value.value = value.statement
            return value
          }))
        })
    },
    handleSelect (item) {
      this.responseForm.response = item.response
    },
    questionInputFocus () {
      this.$refs['questionInput'].focus()
    }
  },
  computed: {
    title () {
      console.log(this.id)
      let title = this.id !== 0 ? '编辑问题' : '新建问题'
      console.log(title)
      return title
    }
  }
}
</script>
<style scoped>
    .page {
    }

</style>
