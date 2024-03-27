<script setup>
import { Delete, Edit } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import { userGetAPI } from '@/apis/user'
import { userDelAPI } from '@/apis/user'
import { useRouter } from 'vue-router'
const router = useRouter()
const tableData = ref()
//获取用户信息
const getUserList = async () => {
  const res = await userGetAPI()
  tableData.value = res.data.data
}
onMounted(async () => getUserList())
//删除用户
const deleteUser = async (row) => {
  await userDelAPI(row.username)
  getUserList()
}
const updateUser = async (row) => {
  router.push(`/user/useredit/${row._id}`)
}
</script>
<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="username" label="账号" />
      <el-table-column prop="role" label="权限">
        <template #default="{ row }">
          {{ row.role === 1 ? '管理员' : '编辑员' }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="primary" :icon="Edit" circle @click="updateUser(row)" />
          <el-button type="danger" :icon="Delete" circle @click="deleteUser(row)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
