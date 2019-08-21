<template>
  <el-container class="box-home">
    <el-header class="subbox-header">
      <div>
        <img src="../assets/heima.png" alt /> Header
      </div>
      <div>
        <el-button type="danger" round @click="loginout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          :default-active="activePath"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
        >
          <el-submenu
            :index="item.id+''"
            class="subnav-one"
            v-for="item in menuslist"
            :key="item.id"
          >
            <template slot="title" class="subnav-one">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item-group class="subnav-one-son" style="border:0;">
              <el-menu-item
                :index="'/'+item2.path"
                :key="item2.id"
                v-for="item2 in item.children"
                @click="saveNavState('/' + item2.path)"
              >{{item2.authName}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main >
        <!-- {{menuslist}} -->
         <div ref="demo-3" class="demo-3" id="demo-3"></div>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="mbxdh">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>
            <span class="red">{{fastr}}</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>{{substr}}</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import 'jparticles';
export default {
  data() {
    return {
      menuslist: [],
      activePath: "",
      isCollapse: false,
      fastr: "",
      substr: "",
      sess: ""
    };
  },
  created() {
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  mounted() {
    this.menus();
    // this.JParticles()
  },
  methods: {
    loginout() {
      window.sessionStorage.removeItem("token");
      this.$router.push("/login");
    },
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    async menus() {
      const { data: res } = await this.$http.get("menus");
      this.menuslist = res.data;
      if (res.meta.status !== 200) {
        this.$message.error("菜单列表未获取");
      }
      this.sess = window.location.href.split("#")[1].split("/")[1];
      for (const key in this.menuslist) {
        for (const key1 in this.menuslist[key].children) {
          if (this.menuslist[key].children[key1].path == this.sess) {
            this.substr = this.menuslist[key].children[key1].authName;
            this.fastr = this.menuslist[key].authName;
          }
        }
      }
      //url变化监听器
      if (
        "onhashchange" in window &&
        (typeof document.documentMode === "undefined" ||
          document.documentMode == 8)
      ) {
        // 浏览器支持onhashchange事件
        window.onhashchange = this.hashChange; // TODO，对应新的hash执行的操作函数
      }
    },
    hashChange() {
      this.sess = window.location.href.split("#")[1].split("/")[1];
      this.menus();
      this.saveNavState("/" + this.sess);
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
      this.sess = window.location.href.split("#")[1].split("/")[1];
      this.menus();
    },
    JParticles() {
      console.log(1111111111);
      
    new JParticles.particle("#demo-3", {
       // 两粒子圆心点之间的直线距离为 90
        proximity: 200,
        // 定位点半径 100 以内（包含）的所有粒子，圆心点之间小于等于 proximity 值，则连线
        range: 2000,
        lineShape: 'wave',
        parallax: true,
        // color: '#25bfff',
        maxR: 15,
        minR: 10,
        particle:"lineShape",
        num: 40,
    });
  }
  },
  
};
</script>
<style lang="less" scoped>
.box-home {
  height: 100%;
  color: #fff;
}
.el-header,
.el-footer {
  background-color: #383d41;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #333743;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  // background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
  position: relative;
}

body > .el-container {
  margin-bottom: 40px;
}
.subbox-header {
  display: flex;
  justify-content: space-between;
  color: #fff;
}
.subbox-header img {
  vertical-align: middle;
  margin-right: 15px;
}
.subnav-one {
  text-align: left;
  //   margin-left: -10px;
  min-width: 200px;
}
.subnav-one-son {
  text-align: center;
}
.red {
  color: red;
}
.mbxdh {
  margin-bottom: 20px;
}
.demo-3{
  width: 100%; 
  height: 99.5%;
  background-color: #e9eef3;
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
