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
        <el-dropdown>
          <span class="el-dropdown-link">
            管理員 <el-icon><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-menu-item>登出</el-dropdown-menu-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>

      <el-main class="admin-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { Menu, Grid, Back, ArrowDown } from '@element-plus/icons-vue'
</script>

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

.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>