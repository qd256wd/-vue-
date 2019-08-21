<template>
    <div>
        <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" clearable v-model='querystr' @blur="getGoods">
            <el-button slot="append" icon="el-icon-search" @click="getGoods"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click='pushAdd'>添加商品</el-button>
        </el-col>
      </el-row>
          <el-table
      :data="tableData"
      style="width: 100%"
      border
      class="mgt"
      >
      <el-table-column type="index"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column label="商品价格(元)" prop="goods_price" width="110px"></el-table-column>
        <el-table-column label="商品重量" prop="goods_weight" width="80px"></el-table-column>
        <el-table-column label="创建时间" prop="add_time" width="160px">
          <template slot-scope="scope">
            {{scope.row.add_time | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" ></el-button>
          </template>
        </el-table-column>
    </el-table>
    <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="goodPage.pagenum"
                :page-sizes="[1, 5, 10, 20]"
                :page-size="goodPage.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            goodPage:{
                query:'',
                pagenum:1,
                pagesize:5
            },
            tableData:[],
            querystr:'',
            total:null,
        }
    },
    created() {
        this.getGoodsList()
    },
    methods: {
       async getGoodsList(){
           const {data:res} = await this.$http.get('goods',{
               params:this.goodPage
           })
          this.tableData = res.data.goods
          this.total = res.data.total
          
        },
        getGoods(){
            this.goodPage.query = this.querystr
            this.getGoodsList() 
        },
        handleSizeChange(val){
            this.goodPage.pagesize = val
            this.getGoodsList() 

            
        },
        handleCurrentChange(val){
            this.goodPage.pagenum = val
            this.getGoodsList() 

        },
        pushAdd(){
            this.$router.push('/goods/add')
        }
    },
}
</script>
<style lang="less" scoped>
.mgt{
    margin-top: 15px;
}
.block {
    margin-top: 15px; 
}
</style>
