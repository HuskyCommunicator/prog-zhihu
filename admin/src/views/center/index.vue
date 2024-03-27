<script setup>
import { userGetAPI } from '@/apis/user'
import { onMounted, ref } from 'vue'
const userInfo = ref()
onMounted(async () => {
  const res = await userGetAPI()
})
</script>
<template>
  <div>个人中心 个人信息</div>
</template>
