<script setup>
import { reactive } from 'vue'
import Form from '@/components/userForm/Form.vue'
//表单数据
const UserForm = reactive({
  username: '22',
  password: '22',
  role: 1,
  avatar: '', // 头像URL
  file: null // 上传的文件
})
const by = 'userAdd'
</script>
<template>
  <div>
    <el-page-header icon="" title="用户管理" content="添加用户" />
    <Form :user-form="UserForm" v-if="UserForm" :by="by" />
  </div>
</template>
