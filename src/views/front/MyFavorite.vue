<script setup>
import { ref, onMounted, computed } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
// import { reqMyFavorites, reqRemoveFavorite } from '@/api'

import DialogSkillDetail from '@/components/dialogSkillDetail.vue'
const dialogSkillDetailRef = ref(null)

// 響應式變數
const keyword = ref('')
const favoriteList = ref([])
const loading = ref(false)

const filteredList = computed(() => {
  const str = keyword.value.trim().toLowerCase()
  if(str.length === 0){
    return favoriteList.value
  }
  return favoriteList.value.filter(item => {
    return item.title.toLowerCase().includes(str)
  })
})

const fetchFavorites = async () => {
  loading.value = true
  const params = {}
  if (keyword.value) params.keyword = keyword.value.trim()

  try {
    // const res = await reqMyFavorites(params)
    // favoriteList.value = res.data

    // 模擬後端回傳的已收藏資料
    favoriteList.value = [
      {
        id: 1,
        title: "Vue3 記憶體洩漏與組件銷毀審查專家",
        description: "當專案頁面來回切換時，瀏覽器記憶體持續飆高且沒有釋放，需要排查特定組件時使用。",
        updatedAt: "2026-04-14"
      },
      {
        id: 2,
        title: "TypeScript 高階型別推導產生器",
        description: "自動將複雜的 JSON 結構轉換為嚴格的 TypeScript Interface，並包含 Omit 與 Pick 最佳化。",
        updatedAt: "2026-04-12"
      }
    ]
  } catch (error) {
    ElMessage.error('載入最愛列表失敗')
  } finally {
    loading.value = false
  }
}

const handleRemoveFavorite = async (id) => {
  try {
    // await reqRemoveFavorite(id)
    ElMessage.success('已取消收藏')

    favoriteList.value = favoriteList.value.filter(item => item.id !== id)
  } catch (error) {
    ElMessage.error('取消收藏失敗')
  }
}

const handleViewDetail = (id) => {
  dialogSkillDetailRef.value?.open(id)
}

const handleFavoriteSync = (data) => {
  if (data.isFavorite === false) {
    favoriteList.value = favoriteList.value.filter(item => item.id !== data.id)
  }
}

onMounted(() => {
  fetchFavorites()
})
</script>
<template>
  <div class="favorite-page">
    <div class="page-header">
      <h2 class="page-title">我的最愛</h2>

      <el-input
        v-model="keyword"
        placeholder="搜尋我的最愛..."
        :prefix-icon="Search"
        clearable
        style="width: 280px;"
        @input="fetchFavorites"
        @clear="fetchFavorites"
      />
    </div>

    <div v-if="loading && favoriteList.length === 0" class="loading-box" v-loading="true" />

    <div v-else-if="favoriteList.length > 0" class="favorite-grid">
      <el-card
        v-for="item in favoriteList"
        :key="item.id"
        class="prompt-card"
        shadow="hover"
      >
        <h4 class="card-title el-ellipsis">{{ item.title }}</h4>
        <p class="card-description">{{ item.description }}</p>

        <div class="card-footer">
          <span class="date-text">更新於 {{ item.updatedAt }}</span>
          <div class="actions">
            <el-button type="danger" link size="small" @click="handleRemoveFavorite(item.id)">
              取消收藏
            </el-button>
            <el-button type="primary" size="small" plain @click="handleViewDetail(item.id)">
              查看詳情
            </el-button>
          </div>
        </div>
      </el-card>
    </div>

    <el-empty
      v-else
      :description="keyword ? '找不到符合關鍵字的收藏' : '目前還沒有任何收藏喔'"
      class="empty-box"
    />

    <DialogSkillDetail
      ref="dialogSkillDetailRef"
      @favorite-change="handleFavoriteSync"
    />
  </div>
</template>
<style scoped>
.favorite-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
  box-sizing: border-box;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-title {
  font-size: 22px;
  font-weight: 600;
  color: #303133;
  margin: 0;
}

.favorite-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.prompt-card {
  border: 1px solid #e4e7ed;
  border-radius: 8px;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #303133;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 26px;
  white-space: nowrap;
}

.card-description {
  font-size: 14px;
  color: #606266;
  line-height: 1.5;
  height: 42px; /* 固定的兩行高度 */
  margin: 0 0 16px 0;
  overflow: hidden;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f2f6fc;
  padding-top: 12px;
}

.date-text {
  font-size: 12px;
  color: #909399;
}

.actions {
  display: flex;
  gap: 8px;
}

.loading-box {
  height: 300px;
}
.empty-box {
  padding: 60px 0;
}
</style>