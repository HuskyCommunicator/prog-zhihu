<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { userAddAPI } from '@/apis/user'
const router = useRouter()
//表单数据
const ruleFormRef = ref()
const userForm = ref({
  username: '11',
  password: '11',
  role: 1
})
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
const userAdd = async () => {
  const { username, password, role } = userForm.value
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        const res = await userAddAPI({ username, password, role })
        if (res.data.code === 200) {
          router.push('/user/userlist')
        } else {
          ElMessage.error(res.data.msg)
        }
      } catch (err) {
        console.error(err)
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
        <el-button type="primary" @click="userAdd()">添加用户</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
