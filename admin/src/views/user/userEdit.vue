<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { userGetAPI, userPutAPI } from '@/apis/user'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const id = route.params.id
//表单数据
const ruleFormRef = ref()
const userForm = ref({
  username: '',
  password: '',
  role: null
})
//获取用户信息
const getUserInfo = async () => {
  const res = await userGetAPI(id)
  userForm.value = res.data.data[0]
}
onMounted(() => getUserInfo())
//表单验证
const rules = ref({
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }
  ],
  role: [
    {
      required: true,
      message: '请选择权限',
      trigger: 'blur'
    }
  ]
})
// 用户规则设置
const role = [
  {
    label: '管理员',
    value: 1
  },
  {
    label: '编辑员',
    value: 2
  }
]
//提交
const putUser = async () => {
  const { username, password, role, _id } = userForm.value
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      const res = await userPutAPI({ username, password, role, _id })
      if (res.status === 200) {
        router.push('/user/userlist')
      } else {
        ElMessage.error(res.data)
      }
    }
  })
}
</script>
<template>
  <div>
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="userForm"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userForm.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userForm.password" />
      </el-form-item>
      <el-form-item label="权限" prop="role">
        <el-select v-model="userForm.role" placeholder="Select" size="large" style="width: 240px">
          <el-option
            v-for="item in role"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <!-- 提交 -->
      <el-form-item>
        <el-button type="primary" @click="putUser()">更新用户</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
