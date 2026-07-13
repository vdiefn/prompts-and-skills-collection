<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

// 定義註冊表單的響應式資料
const registerForm = ref({
  username: '',
  password: '',
  confirmPassword: ''
})

const handleRegister = () => {
  const { username, password, confirmPassword } = registerForm.value
  if (!username.trim() || !password || !confirmPassword) {
    ElMessage.warning('請完整填寫所有欄位')
    return
  }

  if (password !== confirmPassword) {
    ElMessage.error('兩次輸入的密碼不一致')
    return
  }

  // 模擬註冊成功
  ElMessage.success('註冊成功！已為您自動導頁')

  // 註冊成功後導向首頁/列表頁（或登入頁 `/login`）
  router.push('/skills')
}
</script>

<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <h3>註冊會員</h3>
      </template>

      <el-form label-position="top" :model="registerForm">
        <el-form-item label="帳號">
          <el-input
            v-model="registerForm.username"
            placeholder="請設定您的帳號"
            clearable
          />
        </el-form-item>

        <el-form-item label="密碼">
          <el-input
            v-model="registerForm.password"
            type="password"
            placeholder="請輸入密碼"
            show-password
          />
        </el-form-item>

        <el-form-item label="確認密碼">
          <el-input
            v-model="registerForm.confirmPassword"
            type="password"
            placeholder="請再次輸入密碼"
            show-password
          />
        </el-form-item>

        <el-button
          type="primary"
          style="width: 100%; margin-top: 10px;"
          @click="handleRegister"
        >
          註冊
        </el-button>
      </el-form>

      <div class="register-wrapper">
        <router-link
          to="/login"
          class="link-text"
        >
          已有帳號？前往登入
        </router-link>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
}
.login-card {
  width: 400px;
}
.register-wrapper {
  display: flex;
  justify-content: end;
  margin-top: 16px;
}
.link-text {
  font-size: 14px;
  color: #409eff;
  text-decoration: none;
}
.link-text:hover {
  text-decoration: underline;
}
</style>