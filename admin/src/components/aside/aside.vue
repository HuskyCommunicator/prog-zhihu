<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
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
      <span>首页</span>
    </el-menu-item>
    <!-- 个人中心 -->
    <el-menu-item index="/center">
      <span>个人中心</span>
    </el-menu-item>
    <!-- 用户页 -->
    <el-sub-menu index="/user">
      <template #title>
        <!-- <el-icon><UserFilled /></el-icon> -->
        <span>用户管理</span>
      </template>
      <el-menu-item index="/user/userlist">用户列表</el-menu-item>
      <el-menu-item index="/user/useradd">添加用户</el-menu-item>
    </el-sub-menu>
    <!--  -->
  </el-menu>
</template>
