<script setup>
import { Delete, Edit, Star } from '@element-plus/icons-vue'
import { NewListGetAPI, NewDelAPI } from '@/apis/new'
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import router from '@/router'
const newList = ref([])
const dialogVisible = ref(false)
const previewData = ref({})
const getNewList = async () => {
  const res = await NewListGetAPI()
  newList.value = res.data.data
}
//预览新闻按钮
const previewNew = (data) => {
  previewData.value = data
  dialogVisible.value = true
}
onMounted(() => getNewList())
//发布状态-开关变化函数
const handleSwitchChange = async (item) => {
  console.log('开关改变了', item.isPublish === 0 ? '未发布' : '已发布')
}
//修改新闻
const updateNew = (row) => {
  router.push(`/news/newsedit/${row._id}`)
}

//删除新闻
const deleteNew = async (row) => {
  const res = await NewDelAPI(row.title)
  getNewList()
  ElMessage.success('删除成功')
}
</script>
<template>
  <el-card>
    <el-page-header content="新闻列表" icon="" title="新闻管理" />
    <el-table :data="newList" style="width: 100%">
      <!-- 标题 -->
      <el-table-column prop="title" label="标题" width="180" />
      <!-- 封面 -->
      <el-table-column label="封面">
        <template #default="scope">
          <div v-if="scope.row.cover">
            <el-avatar :size="50" :src="'http://localhost:3010' + scope.row.cover" />
          </div>
          <div v-else>
            <el-avatar
              :size="50"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            />
          </div>
        </template>
      </el-table-column>
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
      <!--  -->
    </el-table>
  </el-card>
  <!-- 预览新闻 -->
  <el-dialog v-model="dialogVisible" title="预览新闻" width="50%">
    <div>
      <h2>标题:{{ previewData.title }}</h2>
      <h4>作者:{{ previewData.author }}</h4>
      <!-- <div style="font-size: 12px; color: gray">
        {{ formatTime.getTime(previewData.editTime) }}
      </div> -->
      <el-divider>
        <el-icon><star-filled /></el-icon>
      </el-divider>
      <div v-html="previewData.content" class="htmlContent"></div>
    </div>
  </el-dialog>
</template>
<style lang="scss"></style>
