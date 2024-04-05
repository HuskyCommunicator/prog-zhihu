<script setup>
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
const userStore = useUserStore()
const route = useRoute()
const vAdmin = {
  mounted(el) {
    if (userStore.userInfo.role !== 1) {
      el.parentNode.removeChild(el)
    }
  }
}
</script>
<template>
  <el-menu
    class="el-menu-vertical-demo"
    :collapse-transition="false"
    :router="true"
    :default-active="route.fullPath"
  >
    <!-- 首页 -->
    <el-menu-item index="/home">
      <el-icon><HomeFilled /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <!-- 个人中心 -->
    <el-menu-item index="/center">
      <el-icon><User /></el-icon>
      <span>个人中心</span>
    </el-menu-item>
    <!-- 用户页 -->
    <el-sub-menu index="/user" v-admin>
      <template #title>
        <el-icon><UserFilled /></el-icon>
        <span>用户管理</span>
      </template>
      <el-menu-item index="/user/userlist">用户列表</el-menu-item>
      <el-menu-item index="/user/useradd">添加用户</el-menu-item>
    </el-sub-menu>
    <!-- 新闻页 -->
    <el-sub-menu index="/news">
      <template #title>
        <el-icon><UserFilled /></el-icon>
        <span>新闻管理</span>
      </template>
      <el-menu-item index="/news/newslist">新闻列表</el-menu-item>
      <el-menu-item index="/news/newsadd">添加新闻</el-menu-item>
    </el-sub-menu>
    <!--  -->
  </el-menu>
</template>
