<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { User, Lock } from '@element-plus/icons-vue'

const router = useRouter()
const loginFormRef = ref()
const loading = ref(false)

const loginForm = reactive({
  username: '',
  password: ''
})

const loginRules = reactive({
  username: [
    { required: true, message: '請輸入管理員帳號', trigger: 'blur' },
    { min: 3, max: 20, message: '帳號長度需在 3 到 20 個字元之間', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
    { min: 6, message: '密碼長度不得少於 6 個字元', trigger: 'blur' }
  ]
})

// 登入事件處理
const handleLogin = async (formEl) => {
  if (!formEl) return

  try {
    loading.value = true
    router.push('/admin/home')
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <div class="admin-login-wrapper">
    <el-card
      class="login-card"
      shadow="always"
    >
      <div class="login-header">
        <h2>系統管理員登入</h2>
        <p class="subtitle">
          Prompt / Skill Collection Backend
        </p>
      </div>

      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        label-position="top"
        size="large"
      >
        <el-form-item
          label="管理員帳號"
          prop="username"
        >
          <el-input
            v-model="loginForm.username"
            placeholder="請輸入管理員帳號"
            :prefix-icon="User"
            clearable
          />
        </el-form-item>

        <el-form-item
          label="密碼"
          prop="password"
        >
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="請輸入密碼"
            :prefix-icon="Lock"
            show-password
            @keyup.enter="handleLogin(loginFormRef)"
          />
        </el-form-item>

        <el-form-item class="submit-item">
          <el-button
            type="primary"
            :loading="loading"
            class="login-btn"
            @click="handleLogin(loginFormRef)"
          >
            {{ loading ? '登入中...' : '確認登入' }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.admin-login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background:url('https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.login-card {
  width: 420px;
  padding: 20px 10px;
  border-radius: 8px;
  box-shadow: 0 12px 32px 4px rgba(0, 0, 0, 0.4), 0 8px 20px 0 rgba(0, 0, 0, 0.3);
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h2 {
  margin: 0;
  font-size: 1.6rem;
  color: var(--el-text-color-primary);
  font-weight: 600;
}

.login-header .subtitle {
  margin: 8px 0 0 0;
  font-size: 0.85rem;
  color: var(--el-text-color-secondary);
}

.submit-item {
  margin-top: 35px;
  margin-bottom: 0;
}

.login-btn {
  width: 100%;
  font-weight: bold;
  letter-spacing: 1px;
}
</style>