<template>
  <div>
    <h2>Prompt & Skill 列表</h2>
    <el-row
      :gutter="20"
      style="margin-top: 20px;"
    >
      <el-col
        v-for="i in 3"
        :key="i"
        :span="8"
      >
        <el-card>
          <h3>實用 Prompt 範例 {{ i }}</h3>
          <p>詳細的 Prompt 內容與參數設定...</p>
          <el-button type="success">
            加入我的最愛
          </el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>