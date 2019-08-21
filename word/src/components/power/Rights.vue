<template>
  <div>
    <el-card class="box-card">
      <el-table :data="rightData" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="权限昵称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级" prop="level">
          <template slot-scope="scope">
            <el-tag  v-if='scope.row.level === "0" '>一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.level === '1'">二级</el-tag>
            <el-tag type="warning" v-else>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rightData: []
    };
  },
  created() {
    this.getRightList();
  },
  methods: {
    async getRightList() {
      let { data: res } = await this.$http.get("rights/list");
      this.rightData = res.data;
    }
  }
};
</script>
<style lang="less" scoped>
.mgb {
  margin-bottom: 15px;
}
</style>