<template>
  <div class="not-found-container">
    <el-result
      icon="error"
      title="404"
      sub-title="抱歉，您訪問的頁面不存在或已被移除。"
    >
      <template #extra>
        <el-space size="large">
          <el-button type="primary" @click="handleGoHome">
            返回首頁
          </el-button>
          <el-button @click="handleRefresh">
            重新整理
          </el-button>
        </el-space>
      </template>
    </el-result>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 返回首頁
const handleGoHome = () => {
  router.push('/')
}

// 重新整理頁面
const handleRefresh = () => {
  window.location.reload()
}
</script>

<style scoped>
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background-color: #f5f7fa;
  padding: 20px;
  box-sizing: border-box;
}

/* 微調 Element Plus Result 的樣式使其更醒目 */
:deep(.el-result__title p) {
  font-size: 72px;
  font-weight: bold;
  color: #303133;
  margin: 0 0 10px 0;
  line-height: 1;
}

:deep(.el-result__subtitle p) {
  font-size: 16px;
  color: #606266;
  margin-bottom: 20px;
}
</style>