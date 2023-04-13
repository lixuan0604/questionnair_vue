
<template>
  <div class="common-layout">
    <el-container>
      <el-header
        ><el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          style="margin-left:3rem"
        >
          <!-- <router-link to="/neworder" style="text-decoration: none">
            <el-menu-item
              index="/neworder"
              @click="selectMenuItem('/neworder')"
            >
              <el-icon><EditPen /></el-icon>
              <span>New orders</span>
            </el-menu-item>
          </router-link> -->

          <router-link to="/orderinfo" style="text-decoration: none;">
            <el-menu-item index="/orderinfo" >
              <el-icon><List /></el-icon>
              <span>Order List</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </el-header>
      <el-main
        ><el-main> <router-view></router-view></el-main
      ></el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "/orderinfo",
      is_orderlist:null
    };
  },
  mounted() {
    // this.activeIndex = window.sessionStorage.getItem("activerouter");
    // history.pushState(null, null, document.URL);
    // window.addEventListener(
    //   "popstate",
    //   function (e) {
    //     history.pushState(null, null, document.URL);
    //   },
    //   false
    // );
  },

  created() {
    if(JSON.parse(sessionStorage.getItem("Menu"))){
      this.activeIndex = JSON.parse(sessionStorage.getItem("Menu"))
      
    }
    // this.is_orderlist = JSON.parse(sessionStorage.getItem("is_orderlist"))

  },
  watch:{
    is_orderlist:function(newValue){
      this.is_orderlist = newValue
    }
    
  },

  methods: {
    

    // this.activeIndex = JSON.parse(sessionStorage.getItem("Menu"))
    // selectMenuItem(path) {
    //   window.sessionStorage.setItem("activerouter", path);
    //   this.activeIndex = path;
    // },
    
  },
};
</script>

