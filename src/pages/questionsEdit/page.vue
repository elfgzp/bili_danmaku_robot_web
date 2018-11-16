<template>
    <d2-container class="page">
        <h2>{{title}}</h2>
        <el-form class="response-form"
                 :model="responseForm"
                 :rules="responseRules"
                 ref="settingsForm"
                 label-position="left"
        >
            <el-form-item label="问题" prop="statement">
                <el-input v-model="responseForm.statement" :disabled="id !== 0"></el-input>
            </el-form-item>
            <el-form-item label="答案" prop="response">
                <el-input v-model="responseForm.response"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">{{id !== 0 ? '创建': '保存'}}</el-button>
            </el-form-item>
        </el-form>
    </d2-container>
</template>

<script>
import { createRsponse, getRsponseDetail } from '@/api/response'

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
  methods: {
    onSubmit () {
      createRsponse(this.responseForm)
        .then(res => {
          this.$message.success('保存成功')
          this.$router.go(-1)
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
