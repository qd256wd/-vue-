<template>
  <div>
    <el-card class="box-card">
      <el-row>
        <el-col>
          <el-button type="primary" class="float-left " @click='settjjs' >添加角色</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData" style="width: 100%" border >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form label-position="left" inline class="demo-table-expand" >
              <el-row v-for="(item,i1) in scope.row.children" :key="item.id" :class="['roe-border', i1 === 0 ? 'roe-border-top-b' : '', 'roe-border','center']" >
                <el-col :span="5" class="mgb" >
                  <el-tag  closable @close="removeRightById(scope.row, item.id)" >{{item.authName}}</el-tag>
                </el-col>
                <el-col :span="19" class="mgb"  >
                  <el-row v-for="(item2,i2) in item.children" :key="item2.id" :class="['roe-border', i2 === 0 ? 'roe-border-top-b' : '', 'roe-border','center']"  >
                     <el-col :span="6" class="mgb">
                       <el-tag  closable type="success" @close="removeRightById(scope.row, item2.id)" >{{item2.authName}}</el-tag>
                     </el-col>
                     <el-col :span="18" class="mgb">
                         <el-tag type="warning" v-for="item3 in item2.children" :key="item3.id" closable class="mgl mgb-b" @close="removeRightById(scope.row, item3.id)" >{{item3.authName}}</el-tag>
                     </el-col>
                  </el-row>
                </el-col>
              </el-row>

              <!-- {{scope.row}} -->
            </el-form>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色昵称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" prop="desc" >
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click='xiugairoles(scope.row)'>编辑</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click='deleteroles(scope.row)'>删除</el-button>
          <el-button size="mini" type="warning" icon="el-icon-setting" @click="showSetRightDialog(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
      
    </el-card>
    <el-dialog title="分配权限" :visible.sync="setRightDialogVisible" width="50%" @close="setRightDialogClosed" >  
      <!-- 树形控件 -->
     <el-tree :data="rightsList" :props="treeprops" node-key='id' show-checkbox default-expand-all :default-checked-keys="defKeys" ref="treeRef"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>
<el-dialog title="添加角色" :visible.sync="tianjiajuese" width="50%">
    <el-form :model="addjsForm">
    <el-form-item label="角色昵称" >
      <el-input  autocomplete="off" v-model='addjsForm.roleName'></el-input>
    </el-form-item>
    <el-form-item label="角色描述" >
      <el-input  autocomplete="off" v-model='addjsForm.roleDesc'></el-input>      
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="tianjiajuese = false">取 消</el-button>
    <el-button type="primary" @click="gettjjs">确 定</el-button>
  </div>
</el-dialog>
<el-dialog title="编辑角色" :visible.sync="xiugiajuese" width="50%">
    <el-form :model="xiugai">
    <el-form-item label="角色昵称" >
      <el-input  autocomplete="off" v-model='xiugai.roleName'></el-input>
    </el-form-item>
    <el-form-item label="角色描述" >
      <el-input  autocomplete="off" v-model='xiugai.roleDesc'></el-input>      
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="tianjiajuese = false">取 消</el-button>
    <el-button type="primary" @click="setxiugairoles">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      xiugai:{},
      addjsForm:{},
      tianjiajuese:false,
      xiugiajuese:false,
      tableData: [],
      dialogFormVisible:false,
      setRightDialogVisible:false,
      rightsList:[],
      defKeys: [],
      roleId:'',
      treeprops:{
        children: 'children',
        label: 'authName'
      }

    };
  },
  created() {
    this.getRolesList();
  },
  methods: {
    async getRolesList() {
      let { data: res } = await this.$http.get("roles");
      this.tableData = res.data;
    },
    async removeRightById(role, rightId){
      const confirmResult = await this.$confirm(
        '此操作将永久删除该文件, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message.info('取消了删除！')
      }
       const { data: res } = await this.$http.delete(
        `roles/${role.id}/rights/${rightId}`
      )

      if (res.meta.status !== 200) {
        return this.$message.error('删除权限失败！')
      }

      // this.getRolesList()
      role.children = res.data
      
    },
    async allotRights(){
       const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      const idStr = keys.join(',')
      const { data: res } = await this.$http.post(
        `roles/${this.roleId}/rights`,
        { rids: idStr }
      )
      if (res.meta.status !== 200) {
        return this.$message.error('分配权限失败！')
      }
      this.$message.success('分配权限成功！')
      this.getRolesList()
      this.setRightDialogVisible = false
    },
    async showSetRightDialog(role){
      this.roleId = role.id
      let {data:res} = await this.$http.get('rights/tree')
      this.rightsList = res.data
      console.log(res);
      this.getLeafKeys(role, this.defKeys)
      this.setRightDialogVisible = true
      console.log(this.defKeys);
      
    },
    getLeafKeys(node, arr) {
      // 如果当前 node 节点不包含 children 属性，则是三级节点
      if (!node.children) {
        return arr.push(node.id)
      }

      node.children.forEach(item => this.getLeafKeys(item, arr))
    },
    setRightDialogClosed(){
      this.defKeys = []
    },
    settjjs(){
      this.tianjiajuese=true;
    },
   async gettjjs(){
      let {data:res} = await this.$http.post('roles',this.addjsForm)
      this.getRolesList();
      this.tianjiajuese = false
    },
  xiugairoles(scope){
      console.log(scope);
      this.xiugai = scope
      this.xiugiajuese = true 
    },
   async setxiugairoles(){
      let {data:res} = await this.$http.put('roles/'+this.xiugai.id,this.xiugai)
      this.xiugiajuese = false
      this.getRolesList();
    },
   async deleteroles(scope){
      const confirmResult = await  this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err =>err)
        if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
        }
        let {data:res} = await this.$http.delete(`roles/${scope.id}`)
        this.getRolesList();
        
    }
  }
};
</script>
<style lang="less" scoped>
.mgb {
margin: 15px 0;
}

.mgl{
    margin-left: 15px
}
.float-left {
  float: left;
}
.roe-border{
    border-bottom: 1px solid #eee;
}
.roe-border-top-b{
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
}
.center{
  display: flex;
  align-items: center;
}
</style>
