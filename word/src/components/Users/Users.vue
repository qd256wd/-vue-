<template>
<div>
    <el-card class="box-card">
        <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容"  clearable v-model="querylist.query">
            <el-button slot="append" icon="el-icon-search" @click="getUserList" ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="dialogFormVisible = true" >添加用户</el-button>
        </el-col>
      </el-row>
        <div>
            <el-table :data="tableData" stripe style="width:100%" border  class="user_table">
              <el-table-column type="index"></el-table-column>
              <el-table-column label="姓名" prop="username" ></el-table-column>
              <el-table-column label="邮箱" prop="email"></el-table-column>
              <el-table-column label="电话" prop="mobile"></el-table-column>
              <el-table-column label="角色" prop="role_name"></el-table-column>
              <el-table-column label="状态" prop="mg_state">
                <template slot-scope="scope">
                    <!-- {{scope.row}} -->
                    <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row.mg_state,scope.row.id,scope.row)">
                    </el-switch>
                </template>

              </el-table-column>
               <el-table-column label="操作" width="180px">
                  <template slot-scope="scope">
                    <!-- 修改按钮 -->
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click='showEditDialog(scope.row)' ></el-button>
                    <!-- 删除按钮 -->
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click='removeUserById(scope.row.id)' ></el-button>
                    <!-- 分配角色按钮 -->
                    <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                      <el-button type="warning" icon="el-icon-setting" size="mini" @click="setRole(scope.row)" ></el-button>
                    </el-tooltip>
                  </template>
                </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="querylist.pagenum"
                :page-sizes="[1, 5, 10, 20]"
                :page-size="querylist.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>
        </div>
    </el-card>
<el-dialog title="添加用户" :visible.sync="dialogFormVisible">
  <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" >
    <el-form-item label="姓名" prop="username">
      <el-input v-model="addForm.username" placeholder="请输入昵称"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password"> 
      <el-input placeholder="请输入密码" v-model="addForm.password" show-password></el-input>    
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="addForm.email" placeholder="请输入邮箱"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="mobile">
      <el-input v-model="addForm.mobile" placeholder="请输入电话号码"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false" >取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </div>
</el-dialog>
<!-- 修改 -->
<el-dialog title="修改用户" :visible.sync="editDialogVisible" >
  <el-form :model="editForm" :rules="addFormRules" ref="editFormRef" >
    <el-form-item label="姓名" prop="username">
      <el-input v-model="editForm.username" placeholder="请输入昵称" disabled></el-input>
    </el-form-item>   
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="editForm.email" placeholder="请输入邮箱"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="mobile">
      <el-input v-model="editForm.mobile" placeholder="请输入电话号码"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false" >取 消</el-button>
    <el-button type="primary" @click="editUserInfo">确 定</el-button>
  </div>
</el-dialog>
 <el-dialog title="分配角色" :visible.sync="setUserDialogVisible" width="50%" >  
      <!-- 树形控件 -->
      <p class="mgp">当前的用户：{{userinfo.username}}</p> <br>
      <p class="mgp">当前的角色：{{userinfo.role_name}}</p><br>
      <p class="mgp">分配新角色：
          <el-select v-model="selectedRoleId" placeholder="请选择">
            <el-option v-for="item in rolesList" :key="item.id" :label="item.roleName" :value="item.id">
            </el-option>
          </el-select>
        </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setUserDialogVisible = false">取 消</el-button>
        <el-button type="primary"  @click="saveRoleInfo">确 定</el-button>
      </span>
    </el-dialog>
</div>

</template>
<script>
export default {
  data() {
        var checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

      if (regEmail.test(value)) {
        // 合法的邮箱
        return cb()
      }

      cb(new Error('请输入合法的邮箱'))
    }

    // 验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

      if (regMobile.test(value)) {
        return cb()
      }

      cb(new Error('请输入合法的手机号'))
    }
    return {
      
      selectedRoleId:'',
      userinfo:{},
      setUserDialogVisible:false,
      querylist: {
        query: "",
        pagenum: 1,
        pagesize: 5,
      },
      tableData:[],
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      total:0,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editForm:{
        username: '',
        email: '',
        mobile: '',
        id:null
      },
      dialogFormVisible:false,
      editDialogVisible:false,
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名的长度在3~10个字符之间',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '用户名的长度在6~15个字符之间',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      setUserDialogVisible:false,
      rolesList:[],
    };
  },
  created() {
    this.getUserList();
    this.userStateChanged()
  },
  methods: {
    async getUserList() {
      let res = await this.$http.get("users", { params: this.querylist });
      this.tableData = res.data.data.users
      this.total = res.data.data.total
    },
    async userStateChanged(mg_state,id,scope){
        let res = await this.$http.put("users/"+id+"/state/"+mg_state);  
    },
    handleSizeChange(newsize){
    this.querylist.pagesize = newsize
    this.getUserList();

    },
    handleCurrentChange(newnum){
    this.querylist.pagenum = newnum
    this.getUserList();

    },
   async addUser(){
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        let {data:res} = await this.$http.post('users',this.addForm)
        this.dialogFormVisible = false
        console.log(res);
        this.getUserList()
        this.$refs.addFormRef.resetFields();
   })
  },
  showEditDialog(scope){
    this.editDialogVisible = true
    console.log(scope);
    this.editForm.username = scope.username
    this.editForm.email = scope.email
    this.editForm.mobile = scope.mobile
    this.editForm.id = scope.id
    
  },
  async editUserInfo(){
     this.$refs.editFormRef.validate(async valid => {
    if (!valid) return
    this.editDialogVisible = false
    console.log(this.editForm.id);
    let {data:res} = await this.$http.put('users/'+this.editForm.id,{email:this.editForm.email,mobile:this.editForm.mobile})
    console.log(res);
    this.getUserList()
     })
  },
  async removeUserById(id){
    const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
        if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
    let {data:res} = await this.$http.delete('users/'+id)
    this.getUserList()
  },
 async setRole(scope){
    
    this.userinfo = scope
    const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败！')
      }
      this.rolesList = res.data
      this.setUserDialogVisible = true
  },
  async saveRoleInfo(){
      if (!this.selectedRoleId) {
        return this.$message.error('请选择要分配的角色！')
      }
      console.log(this.userinfo);
      
      const { data: res } = await this.$http.put(
        `users/${this.userinfo.id}/role`,
        {
          rid: this.selectedRoleId
        }
      )

      if (res.meta.status !== 200) {
        return this.$message.error('更新角色失败！')
      }

      this.$message.success('更新角色成功！')
      this.getUserList()
      this.setUserDialogVisible = false
   }



  }
};
</script>
<style lang="less" scoped>
.user_table {
    line-height: 1;
}
.mbxdh{
    margin-bottom: 20px ;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
  text-align: left;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.block {
    margin-top: 15px; 
}
.mgp{
  text-align: left;
  margin-bottom: 15px;
}
.el-card__body{
  position: absolute;
  top: 0;
  left: 0;
}
</style>
