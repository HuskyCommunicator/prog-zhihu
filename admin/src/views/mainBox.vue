<script setup>
import { RouterView } from 'vue-router'
import Nav from '@/components/nav/nav.vue'
import Aside from '@/components/aside/aside.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Nav />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Aside />
        </el-aside>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
.el-page-header {
  margin-bottom: 30px;
}
</style>
