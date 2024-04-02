<script setup>
import { ref } from 'vue'
import { loginAPI } from '@/apis/login'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
const userStore = useUserStore()
const router = useRouter()
const ruleFormRef = ref()

//表单内容
const loginForm = ref({
  username: '11',
  password: '11'
})
//表单规则
const rules = ref({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})
//表单 登录
const submitForm = async () => {
  const { username, password } = loginForm.value
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      const res = await loginAPI({ username, password })
      if (res.status === 200) {
        userStore.uploadUserInfo(res.data.data)
        router.push('/home')
      } else {
        ElMessage.error(res.data.msg)
      }
    }
  })
}
</script>
<template>
  <div class="login">
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="loginForm"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="账号名" prop="username">
        <el-input v-model="loginForm.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" />
      </el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"> 登录 </el-button>
    </el-form>
  </div>
</template>
<style lang="scss" scoped>
.login {
  height: 370px;
  width: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: rgb(210, 210, 210);
  transform: translate(-50%, -50%);
  padding: 30px;
}
</style>
