<script setup>
import { ref } from 'vue'
import { userGetAPI } from '@/apis/user'
import { onMounted } from 'vue'
import userForm from '@/components/userForm/Form.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const by = 'userEdit'
const UserForm = ref()
const getUserInfo = async () => {
  const res = await userGetAPI({ id: route.params.id })
  UserForm.value = res.data.data
}
onMounted(() => getUserInfo())
</script>
<template>
  <div>
    <userForm :user-form="UserForm" v-if="UserForm" :by="by" />
  </div>
</template>
