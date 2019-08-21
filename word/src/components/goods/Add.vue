<template>
  <div>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 提示区域 -->
      <el-alert title="添加商品信息" type="info" center show-icon :closable="false"></el-alert>
      <el-steps :space="200" :active="active-0" finish-status="success" align-center class="mgt">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-tabs tab-position="left"  class="mgt" v-model="active">
        <el-tab-pane label="基本信息" naem='0'>基本信息</el-tab-pane>
        <el-tab-pane label="商品参数" naem='1'>商品参数</el-tab-pane>
        <el-tab-pane label="商品属性" naem='2'>商品属性</el-tab-pane>
        <el-tab-pane label="商品图片" naem='3'>商品图片</el-tab-pane>
        <el-tab-pane label="商品内容" naem='4'>商品内容</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
export default {
    data() {
        return {
            active:'0',
        }
    },
};
</script>
<style lang="less" scoped>
.mgt {
  margin-top: 25px;
}
</style>
