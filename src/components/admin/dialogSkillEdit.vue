<script setup>
import { ref, onMounted, reactive, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import dayjs from 'dayjs'
// import { reqSkillDetail, reqUpdateSkill } from '@/api'

const emit = defineEmits(['success'])
const visible = ref(false)
const loading = ref(false)
const categoryOptions = ref([])
const inputVisible = ref(false)
const InputRef = ref()
const inputValue = ref('')

const form = reactive({
  id: null,
  title: '',
  categoryId: null,
  tags: [],
  content: '',
  useCase: '',
  exampleInput: '',
  createdAt:'',
  updatedAt:''
})

const getInitFormData = () => ({
  id: null,
  title: '',
  categoryId: null,
  tags: [],
  content: '',
  useCase: '',
  exampleInput: ''
})

const open = async (id) => {
  visible.value = true
  //loading.value = true

  // 重置表單與時間
  Object.assign(form, getInitFormData())

  if(id) {
    try {
    console.log('編輯')
    // const res = await reqSkillDetail(id)
    // const data = res.data

    // 模擬後端回傳的原始資料
    const mockData = {
      id: id,
      title: "Vue3 記憶體洩漏與組件銷毀審查專家",
      categoryId: 1,
      tags: ["Vue3", "最佳化", "JavaScript"],
      content: "### 核心指令\n請幫我檢查這段程式碼...",
      useCase: "當專案頁面來回切換時，瀏覽器記憶體持續飆高且沒有釋放時使用。",
      exampleInput: "window.addEventListener('resize', handleResize)",
      createdAt: "2026-04-14 10:00:00",
      updatedAt: "2026-07-13 15:00:00"
    }

      Object.assign(form, mockData)

    } catch (error) {
      ElMessage.error('載入資料失敗')
      visible.value = false
    } finally {
      loading.value = false
    }
  } else {
    Object.assign(form, form)
  }

}


const handleSubmit = async () => {
  if (!form.title.trim()) return ElMessage.warning('請輸入標題')
  if (!form.categoryId) return ElMessage.warning('請選擇所屬類別')
  if (form.tags.length === 0) return ElMessage.warning('請至少新增一個標籤')
  if (!form.content.trim()) return ElMessage.warning('請填寫 Prompt 內容')
  if (!form.useCase.trim()) return ElMessage.warning('請填寫適用情境')

  try {
    // 組合乾淨的 Payload
    const updatePayload = {
      id: form.id? form.id: '',
      title: form.title.trim(),
      categoryId: form.categoryId,
      tags: form.tags,
      content: form.content,
      useCase: form.useCase.trim(),
      exampleInput: form.exampleInput?.trim() || '',
      updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      createdAt: form.id? form.createdAt : dayjs().format('YYYY-MM-DD HH:mm:ss')
    }
    console.log('後台彈窗發送更新 API:', updatePayload)
    if(form.id){
      // await reqUpdateSkill(updatePayload)
      ElMessage.success('更新成功！')
    } else {
      // await reqCreateSkill(updatePayload)
      ElMessage.success('新增成功！')
    }
    emit('success')
    visible.value = false
  } catch (error) {
    ElMessage.error('更新失敗')
  }
}

const handleClose = (tag) => {
  form.tags.splice(form.tags.indexOf(tag), 1)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value.input.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    form.tags.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}

defineExpose({ open })

onMounted(() => {
  categoryOptions.value = [
    { id: 1, name: '前端開發' },
    { id: 2, name: '後端工程' }
  ]
})
</script>
<template>
  <el-dialog
    v-model="visible"
    title="編輯 Prompt / Skill 技能資訊"
    align-center
    destroy-on-close
    :close-on-click-modal="false"
  >
    <el-form v-loading="loading" :model="form" label-position="top" class="edit-dialog-form">

      <el-row :gutter="16">
        <el-col :span="16">
          <el-form-item label="標題名稱" required>
            <el-input v-model="form.title" placeholder="請輸入標題" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="所屬類別" required>
            <el-select v-model="form.categoryId" placeholder="選擇分類" style="width: 100%;">
              <el-option
                v-for="item in categoryOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="標籤" required>
        <div class="tag-wrapper">
          <el-tag
            v-for="tag in form.tags"
            :key="tag"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
            effect='plain'
          >
          {{ tag }}
           </el-tag>
           <el-input
            v-if="inputVisible"
            ref="InputRef"
            size="small"
            v-model="inputValue"
            @keyup.enter="handleInputConfirm"
            @blur="handleInputConfirm"
          />
          <el-button v-else class="button-new-tag" size="small" @click="showInput">
            + New Tag
          </el-button>
        </div>
      </el-form-item>

      <el-form-item label="適用情境" required>
        <el-input
          v-model="form.useCase"
          type="textarea"
          :rows="2"
          placeholder="描述此 Prompt 的適用情境..."
        />
      </el-form-item>

      <el-form-item label="範例輸入">
        <el-input
          v-model="form.exampleInput"
          type="textarea"
          :rows="2"
          placeholder="提供給使用者的測試用程式碼範本..."
        />
      </el-form-item>

      <el-form-item label="Prompt / Skill 內容 - 支援 Markdown" required>
        <div class="dialog-md-wrapper">
          <MdEditor
            v-model="form.content"
            placeholder="請編寫核心 Prompt 規則..."
            language="zh-TW"
          />
        </div>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" :disabled="loading" @click="handleSubmit">確認更新資料</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style scoped>
.admin-edit-page {
  padding: 24px;
  background-color: #f5f7fa;
}
.form-card {
  max-width: 1100px;
  margin: 0 auto;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.time-meta-block {
  font-size: 13px;
  color: #909399;
}
.md-editor-container {
  width: 100%;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
}
.md-editor-container :deep(.md-editor) {
  height: 460px;
}
.form-btn-group {
  margin-top: 32px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.dialog-md-wrapper {
  width: 100%;
  max-width: 100%;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
  box-sizing: border-box;
}

.dialog-md-wrapper :deep(.md-editor) {
  width: 100% !important;
  max-width: 100% !important;
  box-sizing: border-box;
}

.dialog-md-wrapper :deep(.md-editor-main) {
  width: 100% !important;
  min-width: 0 !important;
}

.tag-wrapper {
  display: flex;
  gap: 5px;
}
</style>