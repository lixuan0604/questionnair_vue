
<template>
  <div class="container">
    <div class="container-box">
      <h1 class="this-headline">Login</h1>
      <el-form
        @keyup.enter="Login()"
        ref="loginFormRef"
        :model="loginForm"
        class="this-sign"
        :rules="loginFormRules"
        label-width="120px"
        label-position="top"
        :hide-required-asterisk="true"
        status-icon
      >
        <el-form-item label="Username" prop="username">
          <el-input v-model="loginForm.username" />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input type="password" v-model="loginForm.password" />
        </el-form-item>
        <el-form-item>
          <el-button
            style="width: 100%; margin-bottom: 2rem; margin-top: 2rem"
            type="primary"
            @click="Login()"
            >login
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { ElForm, ElFormItem, ElInput } from "element-plus";
import request from "../utils/request";
export default {
  name: "InView",
  data() {
    return {
      //用户信息
      userInfo: null,
      loginForm: {
        username: "",
        password: "",
      },

      loginFormRules: {
        username: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "blur",
          },
        ],
      },
    };
  },
  components: {
    ElForm,
    ElFormItem,
    ElInput,
  },

  created() {
    // 获取用户信息  用以展示到首页
    this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  },
  methods: {
    Login() {
      // 判断校验是否成功  （取到表单对象） 点击等候先校验 valid校验成功返回true 这样不用每次点击登录就发请求校验
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        }
        // 发送请求判断是否登录成功（用户信息在res.data中）
        const { data: res } = await request.post("login", this.loginForm);
        if (res.code !== 200) {
          return this.$message.error(res.message);
        }
        this.$message.success("登陆成功");
        sessionStorage.setItem("userInfo", JSON.stringify(res.result));
        this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        this.$router.push("/home");
        
      });
    },
  },
};
</script>



<style scoped>
.container {
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
.container-box {
  width: 18rem;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
  border-radius: 0.5rem;
  padding: 24px 65px;
}

.this-headline {
  text-align: center;
  padding: 0;
  margin: 0;
}

.this-sign {
  margin-top: 4rem;
}
</style>