<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
const userStore = useUserStore()
//欢迎语
const welcomeText = computed(() => {
  const currentHour = new Date().getHours()
  return currentHour < 12 ? '要开心每一天' : '喝杯咖啡提提神吧'
})
//头像地址
const avatarUrl = computed(() => {
  const defaultAvatar = `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`
  const userAvatar = userStore.userInfo.avatar
  return userAvatar ? `http://127.0.0.1:3010${userAvatar}` : defaultAvatar
})
</script>
<template>
  <el-page-header icon="" title="企业门户管理系统" content="首页" />
  <el-card class="box-card">
    <el-row>
      <el-col :span="6">
        <el-avatar :size="100" :src="avatarUrl" />
      </el-col>
      <el-col :span="18">
        <h3 style="line-height: 100px">
          欢迎回来 {{ userStore.userInfo.username }},{{ welcomeText }}
        </h3>
      </el-col>
    </el-row>
  </el-card>
</template>
<style lang="scss" scoped>
.el-card {
  .el-col {
    display: flex;
    align-items: center;
  }
  .el-avatar {
    margin-left: 20px;
  }
}
</style>
