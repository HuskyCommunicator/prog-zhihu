<script setup>
import { computed, ref } from 'vue'
import Form from '@/components/userForm/Form.vue'
import { useUserStore } from '@/stores/userStore'
const userStore = useUserStore()
const by = 'center'
//头像地址
const avatarUrl = computed(() => {
  const defaultAvatar = `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`
  const userAvatar = userStore.userInfo.avatar
  return userAvatar ? `http://127.0.0.1:3010${userAvatar}` : defaultAvatar
})
const UserForm = ref()
UserForm.value = userStore.userInfo
</script>
<template>
  <el-page-header icon="" title="企业门户管理系统" content="个人中心" />
  <el-row :gutter="20" class="row">
    <!--  -->
    <el-col :span="8">
      <el-card class="box-card">
        <el-avatar :size="100" :src="avatarUrl" />
        <h3>
          {{ userStore.userInfo.username }}
        </h3>
        <h3>
          {{ userStore.userInfo.role === 1 ? '管理员' : '编辑员' }}
        </h3>
      </el-card>
    </el-col>
    <!--  -->
    <el-col :span="16">
      <el-card>
        <template #header>
          <div class="card-header">
            <span>个人信息</span>
          </div>
        </template>
        <!-- from -->
        <Form :user-form="UserForm" v-if="UserForm" :by="by" />
      </el-card>
    </el-col>
  </el-row>
</template>
<style lang="scss" scoped>
.el-page-header {
  margin-bottom: 50px;
}
.box-card {
  display: flex;
  justify-content: center;
  align-items: center;

  h3 {
    text-align: center;
  }
}
</style>
