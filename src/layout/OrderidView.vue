<template>
  <el-container>
    <!-- 主题区域 -->

    <el-main>
      <!-- <el-breadcrumb separator=">">
        <el-breadcrumb-item>Home</el-breadcrumb-item>
        <el-breadcrumb-item><a href=""></a>User Management</el-breadcrumb-item>
      </el-breadcrumb> -->

      <el-form :inline="true">
        <el-row>
          <el-input
            style="width: 20rem"
            placeholder="Please enter the conditions"
            clearable
            v-model="queryInfo.query"
            @clear="getOrderlist"
          >
          </el-input>

          <el-button type="primary" @click="getOrderlist">Inquiry</el-button>
          <el-button type="primary" @click="newOrder">New Order</el-button>
        </el-row>
      </el-form>
      <el-card>
        <el-table
          border
          stripe
          :data="orderlist"
          @row-click="btn"
          ref="eltableCurrentRow"
          @selection-change="handleSelectionChange"
          
        >
          <el-table-column type="index" label="No.">
            <!-- <template #default="scope">
              <el-button
                style="border: none; font-size: 14px"
                size="small"
                @click="Orderid(scope.row)"
                >{{ scope.row.id }}
              </el-button>
            </template> -->
          </el-table-column>
          <el-table-column prop="username" label="Username">
            <!-- 
            <template #default="scope">
              <el-button
                style="border: none; font-size: 14px"
                size="small"
                @click="Orderid(scope.row)"
                >{{ scope.row.username }}
              </el-button>
            </template> -->
          </el-table-column>
          <el-table-column prop="order_id" label="Order id">
            <!-- <template #default="scope">
              <el-button
                style="border: none; font-size: 14px"
                size="small"
                @click="Orderid(scope.row)"
                >{{ scope.row.order_id }}
              </el-button>
            </template> -->
          </el-table-column>
          <el-table-column prop="agent_name" label="Agent name">
            <!-- <template #default="scope">
              <el-button
                style="border: none; font-size: 14px"
                size="small"
                @click="Orderid(scope.row)"
                >{{ scope.row.agent_name }}
              </el-button>
            </template> -->
          </el-table-column>
          <el-table-column prop="studentname" label="Student name">
            <!-- <template #default="scope">
              <el-button
                style="border: none; font-size: 14px"
                size="small"
                @click="Orderid(scope.row)"
                >{{ scope.row.studentname }}
              </el-button>
            </template> -->
          </el-table-column>

           <el-table-column prop="status" label="Status">
        <template #default="scope">
      
          <el-tag
            style="width: 80px"
            v-if="scope.row.status == true"
            type="primary"
            >{{ "完成" }}</el-tag
          >
          <el-tag
            style="width: 80px"
            v-else-if="scope.row.status == false"
            type="danger"
            >
            <el-button
            style="width: 80px"
            type="success"
            size="small"
            @click.stop="downloadVerify(scope.row)"
            ><el-icon><Download /></el-icon>
          </el-button>
            
            
            </el-tag
          >
      
        </template>
      </el-table-column>
      

          <el-table-column prop="create_time" label="Creation time">
          </el-table-column>


        <el-table-column label="Operate" >
        <template #default="scope">
          <el-button
            type="success"
            size="small"
            @click.stop="download(scope.row)"
            ><el-icon><Download /></el-icon>
          </el-button>

          <el-button
            type="danger"
            size="small"
            @click.stop="deleteOrder(scope.row)"
            ><el-icon><Delete /></el-icon>
          </el-button>
        </template>
      </el-table-column>


        </el-table>
        <!-- 分页功能-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[50, 100]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-card>
    </el-main>
  </el-container>
</template>



<script>
import { compile } from 'vue';
import request from "../utils/request";
export default {
  data() {
    return {
      addDialogVisible: false,
      orderlist: [],
      queryInfo: {
        // 当前页面
        pagenum: 1,
        // 每页显示条数
        pagesize: 50,
        query: "",
      },
      total: 0,
      addDialogVisible: false,
      flag: false,
    };
  },
  watch: {
    $router() {
      if (JSON.parse(sessionStorage.getItem("Menu"))) {
        this.activeIndex = JSON.parse(sessionStorage.getItem("Menu"));
        this.$route.go();
      }
    },
  },
  mounted() {
   
  },
  created() {
    this.getOrderlist();
    
  },
  // watch: {
  //   $route() {
  //     this.$router.go();
  //   },
  // },
  methods: {
    btn(row, col, event) {
      row.flag = !row.flag;
    //   this.$refs.eltableCurrentRow.toggleRowSelection(row, row.flag);
      this.$router.push("/neworder");
      sessionStorage.setItem("uuid", JSON.stringify(row.uuid));
      sessionStorage.setItem('currentTab',"1")
    },

    async getOrderlist() {
      let that = this;
      const { data: res } = await request.get("orderinfo", {
        params: that.queryInfo,
      });
      that.total = res.total;
      that.orderlist = res.result;
    },
    // 清空表单
    newOrder() {
      this.infomation = {};
      this.addForm = {};
      this.backgroundForm = {};
      this.experienceForm = {};
      this.careerForm = {};
      this.schoolForm = {};
      this.$router.push("/neworder");
      sessionStorage.removeItem("uuid");
      sessionStorage.setItem("Menu", JSON.stringify("neworder"));
      sessionStorage.setItem('currentTab',"1")

    },
    //删除功能
    deleteOrder(row){
      this.$confirm("Are you sure you want to delete this Order?", "Tips", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await request.delete("orderinfo", {
            data: {
              uuid: row.uuid,
            },
          });

          if (res.code !== 0) {
            return this.$message.error("Failed to delete Order");
          }
          this.getOrderlist();
          this.$message.success("Delete Order successfully!");
        })
        .catch(() => {
          this.$message.info("Cancel");
        });
    },

    Orderid(row) {
      this.$router.push("/neworder");
      sessionStorage.setItem("uuid", JSON.stringify(row.uuid));
    },

    //下载功能
    async download(row){ 
      //年
      let year = new Date().getFullYear();
      //月份是从0月开始获取的，所以要+1;
      let month = new Date().getMonth() +1;
      //日
      let day = new Date().getDate();
      let Data = year + '_' + month + '_' + day

      let formData = new FormData();
      formData.append("uuid", row.uuid);
      const { data: res } = await request.post("download",formData,{responseType: 'blob'});
      // console.log(res)
      // return
        //下载文件
            let blob = new Blob([res], {
              type: "application/msword",
            });
            let objectUrl = URL.createObjectURL(blob); // 创建URL
            const link = document.createElement("a");
            link.href = objectUrl;
            // link.download = '.xlsx'// 自定义文件名
            //这里是获取后台传过来的文件名
            link.setAttribute("download", row.order_id+ "_ps_info_" + Data +'.docx');
            link.click(); // 下载文件
            URL.revokeObjectURL(objectUrl); // 释放内存

    },
    // 下载验证表单
    async downloadVerify(row){
      //年
      let year = new Date().getFullYear();
      //月份是从0月开始获取的，所以要+1;
      let month = new Date().getMonth() +1;
      //日
      let day = new Date().getDate();
      let Data = year + '_' + month + '_' + day

      let formData = new FormData();
      formData.append("uuid", row.uuid);
      const { data: res } = await request.post("verifydownload",formData,{responseType: 'blob'});
      // console.log(res)
      // return
        //下载文件
            let blob = new Blob([res], {
              type: "application/msword",
            });
            let objectUrl = URL.createObjectURL(blob); // 创建URL
            const link = document.createElement("a");
            link.href = objectUrl;
            // link.download = '.xlsx'// 自定义文件名
            //这里是获取后台传过来的文件名
            link.setAttribute("download", row.order_id+ "_ps_info_checklist_" + Data +'.docx');
            link.click(); // 下载文件
            URL.revokeObjectURL(objectUrl); // 释放内存

    },

    // 监听页面大小（pagesize）改变的事件(每页显示多少条)
    handleSizeChange(pagesize) {
      // 改变pagesize的大小
      this.queryInfo.pagesize = pagesize;
      // 重新加载用户列表数据
      this.getOrderlist();
    },
    // 监听pagenum的事件(点击第几页)
    handleCurrentChange(pagenum) {
      // 把页码改了
      this.queryInfo.pagenum = pagenum;
      // 重新加载用户列表数据
      this.getOrderlist();
    },
  },
};
</script>
