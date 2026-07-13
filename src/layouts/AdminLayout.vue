<script setup lang="ts">
import { Menu, Grid, Back } from '@element-plus/icons-vue'
import { ElMessage } from "element-plus"
import { useRouter } from "vue-router"

const router = useRouter()
const handleLogout = () => {
  ElMessage.success('已安全登出')

  router.push('/admin/login')
}
</script>
<template>
  <el-container class="admin-layout">
    <el-aside
      width="240px"
      class="aside"
    >
      <div class="admin-logo">
        管理系統後台
      </div>
      <el-menu
        :router="true"
        default-active="/admin/home"
        class="custom-admin-menu"
      >
        <el-menu-item index="/admin/home">
          <el-icon><Menu /></el-icon>
          <span>所有 Skill 管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/category">
          <el-icon><Grid /></el-icon>
          <span>分類管理</span>
        </el-menu-item>
        <el-menu-item index="/">
          <el-icon><Back /></el-icon>
          <span>返回前台</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="admin-header">
        <div class="flex-grow" />
        <div class="user-profile-wrapper">
          <div class="username-text">管理員</div>
          <el-button link @click="handleLogout">登出</el-button>
        </div>
      </el-header>

      <el-main class="admin-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.admin-layout {
  min-height: 100vh;
}

.aside {
  background-color: #2b2f3a;
  color: #fff;
}

.admin-logo {
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-weight: bold;
  background-color: #2b2f3a;
  color: #fff;
  font-weight: bold;
  font-size: 1.5rem;
}

.custom-admin-menu {
  border-right: none;
  background-color: #2b2f3a;
}

.custom-admin-menu .el-menu-item {
  color: #bfcbd9;
  background-color: #2b2f3a;
}

.custom-admin-menu .el-menu-item .el-icon {
  color: #bfcbd9;
}

.custom-admin-menu .el-menu-item:hover,
.custom-admin-menu .el-menu-item:focus,
.custom-admin-menu .el-menu-item.is-active {
  color: #ffffff;
  background-color: #22252e;
}

.custom-admin-menu .el-menu-item.is-active .el-icon,
.custom-admin-menu .el-menu-item:hover .el-icon {
  color: #ffffff;
}

.admin-header {
  border-bottom: 1px solid var(--el-border-color-light);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: #fff;
  padding: 0 20px;
}

.flex-grow {
  flex-grow: 1;
}

.admin-main {
  background-color: #f0f2f5;
}

.user-profile-wrapper {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  gap: 1rem;
}
</style>