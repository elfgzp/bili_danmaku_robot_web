<template>
    <d2-container class="page">
        <h2>基础设置</h2>
        <el-form class="settings-form"
                 :model="settingsForm"
                 :rules="settingsRules"
                 ref="settingsForm"
                 label-position="left"
        >
            <el-form-item label="直播间房间号" prop="roomId">
                <el-input v-model="settingsForm.roomId"></el-input>
            </el-form-item>
            <el-form-item label="问题前缀" prop="questionPrefix">
                <el-input v-model="settingsForm.questionPrefix"></el-input>
            </el-form-item>
            <el-form-item label="用户Cookies" prop="cookies">
                <el-input v-model="settingsForm.cookies" type="textarea"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSettingsSubmit">保存设置</el-button>
            </el-form-item>
        </el-form>
    </d2-container>
</template>

<script>

import { getSettings, saveSettings } from '@/api/setting'

export default {
  data () {
    return {
      settingsForm: {
        roomId: '',
        cookies: '',
        questionPrefix: ''
      },
      settingsRules: {
        roomId: [
          { required: true, message: '请输入直播间房间号', trigger: 'blur' }
        ],
        cookies: [
          { required: true, message: '请输用户Cookies，用于机器人登陆', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.loadSettings()
  },
  computed: {},
  methods: {
    loadSettings () {
      getSettings()
        .then(res => {
          this.settingsForm.roomId = res.room_id
          this.settingsForm.cookies = res.cookie
          this.settingsForm.questionPrefix = res.question_prefix
        })
    },
    onSettingsSubmit () {
      this.$refs.settingsForm.validate((valid) => {
        if (valid) {
          saveSettings({
            room_id: this.settingsForm.roomId,
            cookie: this.settingsForm.cookies,
            question_prefix: this.settingsForm.questionPrefix
          })
            .then(res => {
              this.$message.success('保存成功，请等待生效')
            })
        } else {
          // 登录表单校验失败
          this.$message.error('表单校验失败')
        }
      })
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/style/public.scss';

    .page {
        .settings-form {
            width: 40%;
            margin-left: 20px;
        }
    }
</style>
