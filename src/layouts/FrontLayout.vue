<template>
  <el-container class="front-layout">
    <el-header class="header">
      <div class="header-container">
        <div
          class="logo"
          @click="$router.push('/')"
        >
          Prompt 收藏庫
        </div>

        <el-menu
          mode="horizontal"
          :router="true"
          :ellipsis="false"
          class="custom-menu"
        >
          <el-menu-item index="/skills">
            技能列表
          </el-menu-item>
          <el-menu-item index="/my-favorite">
            我的最愛
          </el-menu-item>

          <div class="flex-grow" />

          <el-menu-item index="/login">
            登入
          </el-menu-item>
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
/* 全域佈局設定 */
.front-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 導覽列樣式調整 */
.header {
  background-color: #f6f7f8;
  border-bottom: 1px solid var(--el-border-color-light);
  padding: 0;
  height: 60px;
}

.header-container {
  max-width: 75%;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: 100%;
}

.logo {
  font-weight: bold;
  font-size: 1.2rem;
  margin-right: 20px;
  cursor: pointer;
  white-space: nowrap;
}

.custom-menu {
  flex-grow: 1;
  background-color: #f6f7f8 !important;
}

.custom-menu .el-menu-item {
  background-color: #f6f7f8 !important;
  border-bottom: none !important;
}

.flex-grow {
  flex-grow: 1;
}

.main-content {
  background-color: #f5f7fa;
  padding: 20px 0;
  flex-grow: 1;
}

.main-container {
  max-width: 75%;
  width: 100%;
  margin: 0 auto;
}
</style>