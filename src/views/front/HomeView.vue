<script setup>
import { ref, onMounted } from 'vue'
import { Search, Star, StarFilled } from '@element-plus/icons-vue'
// import { reqSkills, reqCategories, reqAddFavorite, reqRemoveFavorite } from '@/api'

// 搜尋與篩選條件
const keyword = ref("")
const category = ref("")

// 分類選單資料庫
const categoryOptions = ref([
  { value: 1, label: '前端開發' },
  { value: 2, label: '後端開發' },
  { value: 3, label: 'AI 提示詞' }
])

// 模擬的 Prompt 列表資料
const skillList = ref([
  {
    id: 1,
    title: "Vue3 記憶體洩漏與組件銷毀審查",
    categoryId: 1,
    tags: ["Vue3", "最佳化", "JavaScript"],
    content: "你是一位資深的前端架構師。請審查以下 Vue3 組件，特別注意在 onMounted 中註冊的全域事件、Custom Event、setInterval 或第三方套件執行個體，是否在 onUnmounted 中確實解除綁定與銷毀。請找出隱藏的記憶體洩漏風險並提供修正程式碼。",
    useCase: "當專案頁面來回切換時，瀏覽器記憶體持續飆高且沒有釋放，需要排查特定組件時使用。",
    exampleInput: "const handleScroll = () => {}; onMounted(() => { window.addEventListener('scroll', handleScroll) });",
    isFavorite: true,
    createdAt: "2026-04-14 10:00:00",
    updatedAt: "2026-04-14 14:32:10"
  },
  {
    id: 2,
    title: "TypeScript 嚴格模式泛型 API 回傳值封裝",
    categoryId: 1,
    tags: ["TypeScript", "API", "型別安全"],
    content: "請為我設計一個基於 TypeScript 嚴格模式的 Axios 響應包裝函式。該函式必須使用泛型傳遞 Data 結構，並精確定義標準後端回傳格式（code, data, message）。若 code 不為 200，必須拋出對應的自訂錯誤型別，並確保 catch 區塊能享有完整的型別推導。",
    useCase: "在專案初期建立網路請求層（Request Layer），需要強制規範團隊 API 型別安全時使用。",
    exampleInput: "interface User { id: number; name: string; }",
    createdAt: "2026-05-20 09:15:00",
    updatedAt: "2026-05-20 09:15:00"
  },
  {
    id: 3,
    title: "Node.js 異步流程防呆與記憶體控制",
    categoryId: 2, // 假設 2 代表 後端開發
    tags: ["Node.js", "後端安全", "非同步"],
    content: "你現在是後端專家。請檢視這段 Node.js 異步處理邏輯，分析在高併發環境下是否會引發 Unhandled Promise Rejection、或是因為 Promise.all 併發量過大導致記憶體溢載（OOM）。請提供加入限制併發（如 p-limit 概念）與防呆機制的最佳化解決方案。",
    useCase: "批次處理大量非同步任務（如大批量發送通知、資料同步）導致伺服器崩潰時的修復參考。",
    exampleInput: null, // exampleInput 為可選，這裡模擬無資料的情境
    isFavorite: false,
    createdAt: "2026-07-01 16:40:00",
    updatedAt: "2026-07-02 11:20:55"
  }
])

// 根據索引發放不同顏色的標籤樣式
const getTagType = (index) => {
  const types = ['', 'success', 'info', 'warning', 'danger']
  return types[index % types.length]
}

// 觸發搜尋
const handleSearch = async () => {
  const params = {}
  if (keyword.value) params.keyword = keyword.value.trim()
  if (category.value) params.categoryId = category.value
  try {
    // const res = await reqSkills(categoryId)
    // skillList.value = res.data
  } catch (error) {
    console.error('篩選資料失敗', error)
  }
}

// 切換最愛狀態（小愛心）
const toggleFavorite = async (item) => {
  try {
    if (item.isFavorite) {
      // await reqRemoveFavorite(item.id)
      item.isFavorite = false
    } else {
      // await reqAddFavorite(item.id)
      item.isFavorite = true
    }
  } catch (error) {
    console.error('操作我的最愛失敗', error)
  }
}

// 查看詳情
const handleViewDetail = (id) => {
  console.log('查看詳情，ID：', id)
  // router.push(`/skills/${id}`)
}

onMounted(() => {
  // 初始化時可以同時發送請求取得分類與列表
  // handleSearch()
})
</script>
<template>
  <div class="home-container">
    <div class="welcome-section">
      <h2>歡迎來到 Prompt / Skill 收藏庫</h2>
      <p>這裡收集了各式各樣實用的 AI Prompt 與開發 Skill。</p>
    </div>

    <div class="filter-section">
      <el-space wrap :size="16">
        <el-input
          v-model="keyword"
          placeholder="請輸入關鍵字搜尋"
          clearable
          style="width: 260px;"
          @clear="handleSearch"
          @keyup.enter="handleSearch"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>

        <el-select
          v-model="category"
          placeholder="全部分類"
          clearable
          style="width: 180px;"
          @change="handleSearch"
        >
          <el-option
            v-for="item in categoryOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <el-button type="primary" @click="handleSearch">搜尋</el-button>
      </el-space>
    </div>

    <div class="prompt-grid">
      <el-card
        v-for="item in skillList"
        :key="item.id"
        class="prompt-card"
        shadow="hover"
      >
        <div class="card-header">
          <h4 class="card-title">{{ item.title }}</h4>
          <el-button
            type="primary"
            link
            class="favorite-btn"
            @click="toggleFavorite(item)"
          >
            <el-icon :class="{ 'is-active': item.isFavorite }" :size="20">
              <StarFilled v-if="item.isFavorite" />
              <Star v-else />
            </el-icon>
          </el-button>
        </div>

        <div class="card-tags">
          <el-tag
            v-for="(tag, index) in item.tags"
            :key="index"
            size="small"
            :type="getTagType(index)"
            class="tag-item"
          >
            {{ tag }}
          </el-tag>
        </div>

        <p class="card-use-case">
          {{ item.useCase }}
        </p>

        <div class="card-footer">
          <span class="date-text">{{ item.updatedAt }}</span>
          <el-button
            type="primary"
            size="small"
            plain
            @click="handleViewDetail(item.id)"
          >
            查看詳情
          </el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>
<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  box-sizing: border-box;
}

/* 歡迎區 */
.welcome-section {
  margin-bottom: 24px;
}
.welcome-section h2 {
  font-size: 26px;
  color: #303133;
  margin: 0 0 8px 0;
}
.welcome-section p {
  font-size: 14px;
  color: #606266;
  margin: 0;
}

/* 篩選欄區塊 */
.filter-section {
  background-color: transparent;
  margin-bottom: 32px;
}

/* 核心：格狀網格排列 (不強迫長寬一致，高度自適應) */
.prompt-grid {
  display: grid;
  /* 自動填充欄位，每欄寬度最小 280px，最大平分剩餘空間 */
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px; /* 格狀卡片間距 */
  align-items: start; /* 關鍵：卡片頂部對齊，高度不強迫拉伸一致 */
}

.prompt-card {
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  background-color: #fff;
}

/* 卡片頂部排版 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 8px;
}

.card-title {
  font-size: 16px;
  color: #303133;
  margin: 0;
  font-weight: 600;
  line-height: 1.4;
}

/* 愛心按鈕樣式與動畫 */
.favorite-btn {
  padding: 0;
  height: auto;
  color: #c0c4cc;
  transition: transform 0.2s ease;
}
.favorite-btn:hover {
  transform: scale(1.15);
  color: #f56c6c;
}
.favorite-btn .el-icon.is-active {
  color: #f56c6c; /* 激活時呈現紅色心型 */
}

/* 標籤區 */
.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
}
.tag-item {
  border-radius: 4px;
}

/* 內文簡介 */
.card-use-case {
  font-size: 14px;
  color: #606266;
  line-height: 1.5;
  margin: 0 0 16px 0;
  min-height: 42px;
}

/* 卡片底部 */
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
</style>
