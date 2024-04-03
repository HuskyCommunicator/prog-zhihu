<script setup>
import { Delete, Edit, Star } from '@element-plus/icons-vue'
import { NewListGetAPI, NewDelAPI } from '@/apis/new'
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
const newList = ref([])
const getNewList = async () => {
  const res = await NewListGetAPI()
  newList.value = res.data.data
}
onMounted(() => getNewList())
//发布状态-开关变化函数
const handleSwitchChange = async (item) => {
  console.log('开关改变了', item.isPublish === 0 ? '未发布' : '已发布')
}
//修改新闻
const updateNew = () => {
  console.log('更新')
}

//删除新闻
const deleteNew = async (row) => {
  const res = await NewDelAPI(row.title)
  getNewList()
  ElMessage.success('删除成功')
}
//预览新闻
const previewNew = () => {
  console.log('预览')
}
</script>
<template>
  <el-card>
    <el-page-header content="新闻列表" icon="" title="新闻管理" />
    <el-table :data="newList" style="width: 100%">
      <!-- 标题 -->
      <el-table-column prop="title" label="标题" width="180" />
      <!-- 分类 -->
      <el-table-column prop="category" label="分类" width="180" />
      <!-- 发布状态 -->
      <el-table-column prop="isPublish" label="发布状态">
        <template #default="scope">
          <el-switch
            v-model="scope.row.isPublish"
            :active-value="1"
            :inactive-value="0"
            @change="handleSwitchChange(scope.row)"
          />
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="warning" :icon="Star" circle @click="previewNew(row)" />
          <el-button type="primary" :icon="Edit" circle @click="updateNew(row)" />
          <el-button type="danger" :icon="Delete" circle @click="deleteNew(row)" />
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
