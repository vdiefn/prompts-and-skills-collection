<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const handleLogin = () => {
  router.push('/skills')
}
</script>
<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <h3>會員登入</h3>
      </template>
      <el-form label-position="top">
        <el-form-item label="帳號">
          <el-input placeholder="請輸入帳號" />
        </el-form-item>
        <el-form-item label="密碼">
          <el-input
            type="password"
            placeholder="請輸入密碼"
            show-password
          />
        </el-form-item>
        <el-button
          type="primary"
          style="width: 100%;"
          @click="handleLogin"
        >
          登入
        </el-button>
      </el-form>
      <div class="register-wrapper">
        <router-link
          to="/register"
          class="link-text"
        >
          前往註冊
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
  margin-top: 10px;
}
</style>