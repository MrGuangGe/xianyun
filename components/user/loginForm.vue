<template>
  <el-form class="form" :model="loginForm" ref="loginForm" :rules="rules">
    <!-- 用户名 -->
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名/手机号" v-model="loginForm.username"></el-input>
    </el-form-item>
    <!-- 密码 -->
    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" v-model="loginForm.password" type="password"></el-input>
    </el-form-item>
    <!-- 忘记密码 -->
    <div class="forget">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </div>
    <!-- 登录按钮 -->
    <el-form-item class="form-item-submit">
      <el-button type="primary" class="submit" @click="handleLogin">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      // 表单数据
      loginForm: {
        username: "",
        password: ""
      },
      // 表单规则
      rules: {
        username: [
          { required: true, message: "请输入用户名/手机号", trigger: "blur" },
          {
            message: "请输入正确的手机号",
            pattern: /^1[3-9]\d{9}$/,
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 发送登录请求
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 通过调用仓库中actions的方法来发送登录的请求
          // user/方法 指定命名空间 就是调用某个模块下的方法 不指定命名空间的话会报错哦
          this.$store.dispatch("user/login", this.loginForm)
            .then(res => {
              // 登录成功后跳转到首页
              this.$router.push("/");
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.form {
  background-color: #fff;
}
.form-item {
  width: 360px;
  margin: 0 auto;
  padding-top: 22px;
}
.forget {
  margin-left: 332px;
  padding: 10px 0;
  color: orangered;
  font-size: 12px;
}
.form-item-submit {
  padding-bottom: 22px;
}
.submit {
  display: block;
  width: 360px;
  margin: 0 auto;
}
</style>