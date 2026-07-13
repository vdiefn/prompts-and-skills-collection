<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

const activeMenu = computed(() => {
  return route.path
})

const userInfo = ref({
  username: '金XX'
})

const handleLogout = () => {
  userInfo.value = null

  ElMessage.success('已安全登出')

  router.push('/login')
}
</script>

<template>
  <el-container class="front-layout">
    <el-header class="header">
      <div class="header-container">
        <div
          class="logo"
          @click="router.push('/')"
        >
          Prompt 收藏庫
        </div>

        <el-menu
          mode="horizontal"
          :router="true"
          :ellipsis="false"
          class="custom-menu"
          :default-active="activeMenu"
        >
          <el-menu-item index="/my-favorite">
            我的最愛
          </el-menu-item>
          <div class="flex-grow" />
          <div class="user-profile-wrapper">
            <div class="avatar-container">
              <el-avatar class="custom-avatar" :size="40" :icon="User"/>
              <span class="username-text">{{ userInfo?.username }}</span>
              <el-button link @click="handleLogout">登出</el-button>
            </div>

        </div>
        </el-menu>
      </div>
    </el-header>

    <el-main class="main-content">
      <div class="main-container">
        <router-view />
      </div>
    </el-main>
  </el-container>
</template>

<style scoped>
.header {
  border-bottom: 1px solid #dcdfe6;
  background-color: #ffffff;
}

.header-container {
  display: flex;
  align-items: center;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  font-size: 18px;
  font-weight: bold;
  color: #409eff;
  cursor: pointer;
  margin-right: 20px;
  flex-shrink: 0;
}

.custom-menu {
  flex: 1;
  border-bottom: none !important;
  display: flex;
  align-items: center;
}
.flex-grow {
  flex-grow: 1;
}

.user-profile-wrapper {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 20px;
}

.avatar-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  outline: none;
}

.custom-avatar {
  background-color: #ecf5ff;
  color: #409eff;
}

.username-text {
  font-size: 14px;
  color: #606266;
  font-weight: 500;
}
</style>