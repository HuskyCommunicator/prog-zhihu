<script setup>
// 导入所需的库和API
import { useUserStore } from '@/stores/userStore'
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { userUploadAPI } from '@/apis/user'
import Upload from '@/components/upload/upload.vue'
// 初始化用户存储
const userStore = useUserStore()

// 从用户存储中获取用户信息
const { username, password, role, avatar } = userStore.userInfo

// 创建一个响应式的表单对象，初始化为用户信息
const userFormRef = ref()
const userForm = reactive({
  username,
  password,
  role,
  avatar,
  file: null
})

// 当文件被选择后，更新 userForm 的 avatar 和 file 属性
const handleChange = (file) => {
  userForm.avatar = URL.createObjectURL(file)
  userForm.file = file
}

// 定义表单验证规则
const userFormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  role: [{ required: true, message: '请选择权限', trigger: 'blur' }],
  avatar: [{ required: false, message: '请选择头像', trigger: 'blur' }]
}

// 定义权限选择选项
const roleOptions = [
  { label: '管理员', value: 1 },
  { label: '编辑员', value: 2 }
]

// 定义提交表单的方法
const submitForm = () => {
  // 验证表单
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      // 如果表单验证通过，调用API上传用户信息
      const res = await userUploadAPI({ userForm })
      if (res.status === 200) {
        // 如果上传成功，显示成功消息并更新用户信息
        ElMessage.success('更改成功')
        userStore.uploadUserInfo(res.data.data)
      }
    }
  })
}
</script>
<template>
  <el-form
    ref="userFormRef"
    :model="userForm"
    :rules="userFormRules"
    label-width="120px"
    class="demo-ruleForm"
    status-icon
  >
    <!-- 用户名 -->
    <el-form-item label="用户名" prop="username">
      <el-input v-model="userForm.username" />
    </el-form-item>
    <!-- 密码 -->
    <el-form-item label="密码" prop="password">
      <el-input v-model="userForm.password" />
    </el-form-item>
    <!-- 权限 -->
    <el-form-item label="权限" prop="role">
      <el-select v-model="userForm.role" class="m-2" placeholder="Select" style="width: 100%">
        <el-option
          v-for="item in roleOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <!-- 头像上传 -->
    <el-form-item label="头像" prop="avatar">
      <Upload :avatar="userForm.avatar" @avatarChange="handleChange" />
    </el-form-item>
    <!-- 提交 -->
    <el-form-item>
      <el-button type="primary" @click="submitForm()">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<style lang="scss" scoped>
:deep(.avatar-uploader .el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

:deep(.avatar-uploader .el-upload:hover) {
  border-color: var(--el-color-primary);
}

:deep(.el-icon.avatar-uploader-icon) {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
}
</style>
