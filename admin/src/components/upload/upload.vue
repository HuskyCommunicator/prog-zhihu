<script setup>
import { computed } from 'vue'
import { Plus } from '@element-plus/icons-vue'
const props = defineProps({
  avatar: String
})
const emit = defineEmits(['avatarChange'])
// 当文件被选择后，更新 userForm 的 avatar 和 file 属性
const handleChange = (file) => {
  emit('avatarChange', file.raw)
}
// 计算上传的头像URL
const uploadAvatar = computed(() =>
  props.avatar.includes('blob') ? props.avatar : 'http://127.0.0.1:3010' + props.avatar
)
</script>
<template>
  <el-upload
    class="avatar-uploader"
    action=""
    :show-file-list="false"
    :auto-upload="false"
    :on-change="handleChange"
    accept="image/png,image/jpeg"
  >
    <img v-if="props.avatar" :src="uploadAvatar" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>
<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
}
</style>
