<script setup>
// import { useUserStore } from '@/stores/userStore'
// const userStore = useUserStore()
// userStore.getUserInfo()
// console.log(userStore.userInfo)
import { userGetAPI } from '@/apis/user'
import { ref, onMounted } from 'vue'
const userInfo = ref([])
const getUserInfo = async () => {
  const res = await userGetAPI()
  userInfo.value = res.data
}
onMounted(() => getUserInfo())
</script>
<template>
  <div>首页</div>
</template>
