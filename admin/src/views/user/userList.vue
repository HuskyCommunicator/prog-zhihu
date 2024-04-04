<script setup>
import { Delete, Edit } from '@element-plus/icons-vue'
import { onMounted, ref, computed } from 'vue'
import { userListGetAPI } from '@/apis/user'
import { userDelAPI } from '@/apis/user'
import { useRouter } from 'vue-router'
const router = useRouter()
const tableData = ref()
//获取用户信息
const getUserList = async () => {
  const res = await userListGetAPI()
  tableData.value = res.data.data
}
onMounted(async () => getUserList())
//删除用户
const deleteUser = async (row) => {
  await userDelAPI(row.username)
  getUserList()
}
//编辑用户
const updateUser = async (row) => {
  router.push(`/user/useredit/${row._id}`)
}
//头像地址
const avatarUrl = computed(() => {
  const defaultAvatar = `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`
  const userAvatar = userStore.userInfo.avatar
  return userAvatar ? `http://127.0.0.1:3010${userAvatar}` : defaultAvatar
})
</script>
<template>
  <div>
    <el-page-header icon="" title="用户管理" content="用户列表" />
    <el-table :data="tableData" style="width: 100%">
      <!-- 头像 -->
      <el-table-column label="头像">
        <template #default="scope">
          <div v-if="scope.row.avatar">
            <el-avatar :size="50" :src="'http://localhost:3010' + scope.row.avatar" />
          </div>
          <div v-else>
            <el-avatar
              :size="50"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            />
          </div>
        </template>
      </el-table-column>
      <!-- 账号 -->
      <el-table-column prop="username" label="账号" />
      <!-- 权限 -->
      <el-table-column prop="role" label="权限">
        <template #default="{ row }">
          {{ row.role === 1 ? '管理员' : '编辑员' }}
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="primary" :icon="Edit" circle @click="updateUser(row)" />
          <el-button type="danger" :icon="Delete" circle @click="deleteUser(row)" />
        </template>
      </el-table-column>
      <!--  -->
    </el-table>
  </div>
</template>
