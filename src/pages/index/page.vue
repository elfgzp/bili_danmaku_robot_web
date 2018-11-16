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
            <el-form-item label="问题匹配精度" prop="confidence">
                <el-input-number v-model="settingsForm.confidence" :precision="2" :step="0.1"
                                 :max="1"></el-input-number>
            </el-form-item>
            <el-form-item label="问答机器人开关" prop="questionRobot">
                <el-switch
                        v-model="settingsForm.questionRobot"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                </el-switch>
            </el-form-item>
            <el-form-item label="合并感谢礼物" prop="mergeThankGift">
                <el-select v-model="settingsForm.mergeThankGift" filterable multiple
                           value-key="value" placeholder="请选择">
                    <el-option
                            v-for="item in giftOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="礼物感谢开关" prop="thankGift">
                <el-switch
                        v-model="settingsForm.thankGift"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                </el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSettingsSubmit">保存设置</el-button>
            </el-form-item>
        </el-form>
    </d2-container>
</template>

<script>

import { getGifts } from '@/api/gift'
import { getSettings, saveSettings } from '@/api/setting'

export default {
  data () {
    return {
      giftOptions: [],
      giftMaps: {},
      settingsForm: {
        roomId: '',
        cookies: '',
        questionPrefix: '',
        confidence: '',
        mergeThankGift: [],
        questionRobot: false,
        thankGift: false
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
    this.loadGifts()
  },
  computed: {},
  methods: {
    loadGifts () {
      getGifts()
        .then(res => {
          this.giftMaps = {}
          res.forEach(el => {
            this.giftMaps[el.id.toString()] = el.name
          })
          this.giftOptions = res.map(
            value => {
              return { value: value.id.toString(), label: value.name }
            }
          )
        })
    },
    loadSettings () {
      getSettings()
        .then(res => {
          this.settingsForm.roomId = res.room_id
          this.settingsForm.cookies = res.cookie
          this.settingsForm.questionPrefix = res.question_prefix
          this.settingsForm.confidence = res.confidence
          let mergeThankGift = res.merge_thank_gift || ''
          this.settingsForm.mergeThankGift = mergeThankGift.length > 0 ? mergeThankGift.split(',') : []
          this.settingsForm.questionRobot = res.question_robot
          this.settingsForm.thankGift = res.thank_gift
        })
    },
    onSettingsSubmit () {
      this.$refs.settingsForm.validate((valid) => {
        if (valid) {
          saveSettings({
            room_id: this.settingsForm.roomId,
            cookie: this.settingsForm.cookies,
            confidence: this.settingsForm.confidence,
            question_prefix: this.settingsForm.questionPrefix,
            merge_thank_gift: this.settingsForm.mergeThankGift.join(','),
            question_robot: this.settingsForm.questionRobot,
            thank_gift: this.settingsForm.thankGift
          })
            .then(res => {
              this.$message.success('保存成功，请等待生效')
              this.loadSettings()
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
