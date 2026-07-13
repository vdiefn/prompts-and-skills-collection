<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Star, StarFilled } from '@element-plus/icons-vue'
// import { reqSkillDetail } from '@/api'

const visible = ref(false)
const loading = ref(false)
const skillDetail = ref(null)
const emit = defineEmits(['favorite-change'])


const open = async (id) => {
  visible.value = true
  loading.value = true
  try {
    // const res = await reqSkillDetail(id)
    // skillDetail.value = res.data

    // 模擬單筆詳細欄位資料結構進行渲染測試
    skillDetail.value = {
      id: id,
      title: "Vue3 記憶體洩漏與組件銷毀審查",
      tags: ["Vue3", "最佳化", "JavaScript"],
      useCase: "當專案頁面來回切換時，瀏覽器記憶體持續飆高且沒有釋放時使用。",
      content: `你現在是一位擁有 10 年經驗的資深前端架構師，專精於 Vue 3 核心原始碼與瀏覽器記憶體垃圾回收機制（Garbage Collection）。

請依據我提供的 Vue 3 組件（Component）程式碼，進行嚴格的記憶體洩漏（Memory Leak）風險審查。

在審查時，請特別專注於以下 5 個容易引發洩漏的重災區：
1. 全域事件監聽：在 onMounted 中註冊了 window、document 或 body 的 addEventListener，是否未在 onUnmounted 中解除綁定？
2. 定時器殘留：程式碼中使用的 setInterval 或 setTimeout，在組件銷毀時是否沒有執行 clearInterval 或 clearTimeout？
3. 第三方套件執行個體：引入的圖表庫（如 ECharts）、富文本編輯器（如 WangEditor）或地圖套件（如 Leaflet），是否有確實呼叫 .dispose() 或 .destroy() 進行銷毀？
4. 全域狀態與事件總線：是否向 Mitt 等全域事件總線（Event Bus）或 Pinia 外部閉包註冊了監聽回呼（Callback）而未清理？
5. 響應式資料與閉包：自訂的組合式函式（Composables）中是否存在未釋放的閉包，持續引向組件實體？

請按照以下格式輸出你的分析報告：
---
### 1. 洩漏風險檢查清單
(請條列出你在此段程式碼中發現的所有潛在風險點)

### 2. 核心原因剖析
(請詳細解釋為什麼這段程式碼會導致瀏覽器無法回收記憶體)

### 3. 修正後的最佳化程式碼
(請提供完整、乾淨、且已做好防呆與銷毀處理的 Vue 3 <script setup> 程式碼)
---

如果你準備好了，請對我說「請提供你的 Vue 3 組件程式碼」，我將會把程式碼發送給你。`,
    exampleInput: `// 測試用的洩漏程式碼範例
import { onMounted } from 'vue'
export default {
  setup() {
    onMounted(() => {
      window.addEventListener('resize', () => {
        console.log('window resizing...')
      })
    })
  }
}`,
      exampleInput: "window.addEventListener('scroll', handleScroll)",
      updatedAt: "2026-04-14 14:32:10"
    }
  } catch (error) {
    ElMessage.error('取得詳情失敗')
    visible.value = false
  } finally {
    loading.value = false
  }
}

const toggleFavorite = async () => {
  if (!skillDetail.value) return

  const targetState = !skillDetail.value.isFavorite
  const skillId = skillDetail.value.id

  try {
    // 實際串接 API 的邏輯
    // if (targetState) {
    //   await reqAddFavorite(skillId)
    //   ElMessage.success('已加入我的最愛')
    // } else {
    //   await reqRemoveFavorite(skillId)
    //   ElMessage.success('已取消收藏')
    // }

    // 前端即時更新狀態
    skillDetail.value.isFavorite = targetState
    ElMessage.success(targetState ? '已加入我的最愛' : '已取消收藏')

    // 關鍵：將更新後的 id 與最新的最愛狀態丟回給父組件
    emit('favorite-change', { id: skillId, isFavorite: targetState })
  } catch (error) {
    ElMessage.error('操作失敗，請稍後再試')
  }
}

const handleClose = () => {
  skillDetail.value = null
}

defineExpose({
  open
})
</script>

<template>
  <el-dialog
    v-model="visible"
    :title="skillDetail?.title || 'Prompt 詳情'"
    width="650px"
    destroy-on-close
    @close="handleClose"
    align-center
  >
    <template #header>
      <div class="dialog-custom-header">
        <span class="dialog-title">{{ skillDetail?.title || 'Prompt 詳情' }}</span>

        <el-button
          v-if="skillDetail"
          type="primary"
          link
          class="favorite-btn"
          @click="toggleFavorite"
        >
          <el-icon :class="{ 'is-active': skillDetail.isFavorite }" :size="22">
            <StarFilled v-if="skillDetail.isFavorite" />
            <Star v-else />
          </el-icon>
        </el-button>
      </div>
    </template>
    <div v-if="loading" v-loading="loading" class="loading-wrapper"></div>

    <div v-else-if="skillDetail" class="detail-container">
      <div class="detail-item">
        <div class="card-tags">
          <el-tag
            v-for="(tag, index) in skillDetail.tags"
            :key="index"
            size="small"
            class="tag-item"
          >
            {{ tag }}
          </el-tag>
        </div>
      </div>

      <div class="detail-item">
        <h5 class="item-title">適用情境</h5>
        <p class="item-text">{{ skillDetail.useCase }}</p>
      </div>

      <div class="detail-item">
        <h5 class="item-title">Prompt / Skill 指令內容</h5>
        <div class="code-block">
          <pre><code>{{ skillDetail.content }}</code></pre>
        </div>
      </div>

      <div v-if="skillDetail.exampleInput" class="detail-item">
        <h5 class="item-title">範例輸入</h5>
        <div class="code-block input-block">
          <pre><code>{{ skillDetail.exampleInput }}</code></pre>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <span class="update-time">最後更新：{{ skillDetail?.updatedAt }}</span>
        <el-button @click="visible = false">關閉</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
/* 自訂標題列排版 */
.dialog-custom-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
}

.dialog-title {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.favorite-btn {
  padding: 0;
  color: #c0c4cc;
  transition: transform 0.2s ease;
}

.favorite-btn:hover {
  transform: scale(1.15);
}

.favorite-btn .el-icon.is-active {
  color: #f56c6c; /* 收藏後的愛心顯示亮紅色 */
}
.loading-wrapper {
  height: 200px;
}
.detail-container {
  padding: 0 10px;
}
.detail-item {
  margin-bottom: 20px;
}
.item-title {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 8px 0;
  border-left: 3px solid #409eff;
  padding-left: 8px;
}
.item-text {
  font-size: 14px;
  color: #606266;
  line-height: 1.6;
  margin: 0;
}
/* 程式碼與指令區塊底色樣式 */
.code-block {
  position: relative;
  background-color: #f5f7fa;
  border: 1px solid #e4e7ed;
  border-radius: 6px;
  padding: 16px;
  margin-top: 8px;
  max-height: 400px;
  overflow-y: auto;
}

.code-block pre {
  margin: 0;
  padding-right: 60px;
  white-space: pre-wrap;
  word-break: break-all;
}

.code-block code {
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  color: #303133;
  line-height: 1.6;
}
.input-block {
  background-color: #fafafa;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.dialog-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.update-time {
  font-size: 12px;
  color: #909399;
}
</style>