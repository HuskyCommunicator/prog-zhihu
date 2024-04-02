<script setup>
import { useUserStore } from '@/stores/userStore'
const userStore = useUserStore()
</script>
<template>
  <el-menu class="el-menu-demo" mode="horizontal" :ellipsis="false" router>
    <el-menu-item>
      <img style="width: 100px" src="../../assets/image/logo.png" alt="Element logo" />
    </el-menu-item>
    <div class="flex-grow" />

    <el-menu-item index="/center">{{ userStore.userInfo.username }}</el-menu-item>
    <el-menu-item index="/login" @click="userStore.clearUserInfo()">退出登录</el-menu-item>
  </el-menu>
</template>
<style lang="scss" scoped>
.flex-grow {
  flex-grow: 1;
}
</style>
