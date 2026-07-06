<script setup>
  const tableData = [
    { id: 1, title: 'Midjourney 擴充提示詞', category: '圖片生成' },
    { id: 2, title: 'TypeScript 重構助手', category: '程式開發' }
  ]
</script>
<template>
  <div>
    <h2>所有已存在的 Skill 管理</h2>
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
</template>

