<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleViewDetail = () => {
  router.push('/skills')
}
</script>
<template>
  <div class="home-container">
    <el-card>
      <h2>歡迎來到 Prompt / Skill 收藏庫</h2>
      <p>這裡收集了各式各樣實用的 AI Prompt 與開發 Skill。</p>

      <div
        class="demo-list"
        style="margin-top: 20px;"
      >
        <el-card
          shadow="hover"
          style="margin-bottom: 10px;"
        >
          <h4>預覽項目：Vue3 效能最佳化 提示詞</h4>
          <p>簡介：優化你的 Vue3 專案效能...</p>
          <el-button
            type="primary"
            @click="handleViewDetail"
          >
            查看詳情
          </el-button>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

