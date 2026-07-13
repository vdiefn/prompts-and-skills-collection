<script setup>
import { useTemplateRef } from "vue"
import DialogSkillEdit from "../../components/admin/dialogSkillEdit.vue"

const dialogSkillEditRef = useTemplateRef('dialogSkillEditRef')

const handleEditSkill = (id) => {
  dialogSkillEditRef.value.open(id)
}


const tableData = [
  { id: 1, title: 'Midjourney 擴充提示詞', category: '圖片生成' },
  { id: 2, title: 'TypeScript 重構助手', category: '程式開發' }
]
</script>
<template>
  <div>
    <h2>Prompt 管理</h2>
    <el-card style="margin-top: 20px;">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="ID"
          width="80"
        />
        <el-table-column
          prop="title"
          label="名稱"
        />
        <el-table-column
          prop="category"
          label="分類"
          width="150"
        />
        <el-table-column
          label="操作"
          width="180"
        >
          <template #default>
            <el-button
              size="small"
              type="primary"
              @click="handleEditSkill(id)"
            >
              編輯
            </el-button>
            <el-button
              size="small"
              type="danger"
            >
              刪除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
  <DialogSkillEdit ref='dialogSkillEditRef' />
</template>

