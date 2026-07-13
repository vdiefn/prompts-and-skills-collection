<script setup>
import { useTemplateRef } from 'vue'
import DialogSkillEdit from '../../components/admin/dialogSkillEdit.vue'
import { reqAdminDeleteSkill } from '@/api/admin/index.js'
import { ElMessage, ElMessageBox } from 'element-plus'

const dialogSkillEditRef = useTemplateRef('dialogSkillEditRef')

const handleEditSkill = (id) => {
  dialogSkillEditRef.value.open(id)
}

const handleCreateSkill = () => {
  dialogSkillEditRef.value.open()
}

const handleDeleteSkill = async (id) => {
  if (!id) return ElMessage({ type: 'error', message: '請提供正確資訊' })
  try {
    await ElMessageBox.confirm('請再次確認是否刪除', 'Warning', {
      confirmButtonText: 'OK',
      cancelButtonText: '取消',
      type: 'warning',
    })
    await reqAdminDeleteSkill(id)
    ElMessage({
      type: 'success',
      message: 'Delete completed',
    })
  } catch (error) {
    if (error === 'cancel') {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    } else {
      ElMessage({
        type: 'error',
        message: '刪除失敗',
      })
      console.error('Delete skill error:', error)
    }
  }
}

const tableData = [
  { id: 1, title: 'Midjourney 擴充提示詞', category: '圖片生成' },
  { id: 2, title: 'TypeScript 重構助手', category: '程式開發' },
]
</script>
<template>
  <div class="container">
    <div class="upper-wrapper">
      <h2>Prompt 管理</h2>
      <el-button type="primary" @click="handleCreateSkill">新增Skill</el-button>
    </div>

    <el-card>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="title" label="名稱" />
        <el-table-column prop="category" label="分類" width="150" />
        <el-table-column label="操作" width="180">
          <template #default>
            <el-button size="small" type="primary" @click="handleEditSkill(id)"> 編輯 </el-button>
            <el-button size="small" type="danger" @click="handleDeleteSkill(id)"> 刪除 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
  <DialogSkillEdit ref="dialogSkillEditRef" />
</template>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.upper-wrapper {
  display: flex;
  justify-content: space-between;

}
</style>