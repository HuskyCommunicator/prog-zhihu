<script setup>
import { ref, reactive } from 'vue'
import Editor from './components/Editor.vue'
import Upload from '@/components/upload/upload.vue'
import { NewAddAPI } from '@/apis/new'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/userStore'
const router = useRouter()
const userStore = useUserStore()
// 创建一个 ref 对象来引用表单
const newsFormRef = ref()
// 创建一个响应式对象来存储表单数据
const newsForm = reactive({
  title: '', // 标题
  content: '', // 内容
  category: 1, // 类别：1最新动态 2典型案例 3通知公告
  cover: '', // 封面图片
  file: null, // 文件
  isPublish: 0, // 发布状态：0未发布 1已发布
  author: userStore.userInfo.username //作者
})

// 类别选择选项
const options = [
  {
    label: '最新动态',
    value: 1
  },
  {
    label: '典型案例',
    value: 2
  },
  {
    label: '通知公告',
    value: 3
  }
]

// 表单验证规则
const newsFormRules = reactive({
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
  category: [{ required: true, message: '请选择分类', trigger: 'blur' }],
  cover: [{ required: true, message: '请选择图片', trigger: 'blur' }]
})
// 当文件被选择后，更新 newsForm 的 cover 和 file 属性
const handleChange = (file) => {
  newsForm.cover = URL.createObjectURL(file) // 更新封面图片
  newsForm.file = file // 更新文件
}
// editor 内容改变时的回调函数
const editorChange = (data) => {
  newsForm.content = data // 更新内容
}
// 提交表单方法
const submitForm = () => {
  // 验证表单
  newsFormRef.value.validate(async (valid) => {
    if (valid) {
      const res = await NewAddAPI({ newsForm })
      if (res.status === 200) {
        ElMessage.success('添加成功')
        router.push('/news/newslist')
      }
    }
  })
}
</script>

<template>
  <el-card>
    <!-- 页面头部 -->
    <el-page-header content="创建新闻" icon="" title="新闻管理" />
    <!-- 表单开始 -->
    <el-form
      ref="newsFormRef"
      :model="newsForm"
      :rules="newsFormRules"
      label-width="120px"
      class="demo-ruleForm"
      status-icon
    >
      <!-- 标题输入框 -->
      <el-form-item label="标题" prop="title">
        <el-input v-model="newsForm.title" />
      </el-form-item>
      <!-- 作者 -->
      <el-form-item label="作者" prop="author">
        {{ newsForm.author }}
      </el-form-item>
      <!-- 内容编辑器 -->
      <el-form-item label="内容" prop="content">
        <Editor @event="editorChange" />
      </el-form-item>
      <!-- 类别选择器 -->
      <el-form-item label="类别" prop="category">
        <el-select v-model="newsForm.category" class="m-2" placeholder="Select" style="width: 100%">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <!-- 封面上传组件 -->
      <el-form-item label="封面" prop="cover">
        <Upload :avatar="newsForm.cover" @avatarChange="handleChange" />
      </el-form-item>
      <!-- 提交按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm()">添加新闻</el-button>
      </el-form-item>
    </el-form>
    <!-- 表单结束 -->
  </el-card>
</template>
<style lang="scss" scoped>
:deep(.avatar-uploader .el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

:deep(.avatar-uploader .el-upload:hover) {
  border-color: var(--el-color-primary);
}

:deep(.el-icon.avatar-uploader-icon) {
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
