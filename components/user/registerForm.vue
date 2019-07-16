<template>
  <el-form class="form" :model="regForm" ref="regForm" :rules="rules">
    <!-- 用户名 -->
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名/手机号" v-model="regForm.username"></el-input>
    </el-form-item>
    <!-- 验证码 -->
    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="regForm.captcha">
        <el-button slot="append" @click="handleCaptcha">发送验证码</el-button>
      </el-input>
    </el-form-item>
    <!-- 您的名字 -->
    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="您的名字" v-model="regForm.nickname"></el-input>
    </el-form-item>
    <!-- 密码 -->
    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="regForm.password"></el-input>
    </el-form-item>
    <!-- 确认密码 -->
    <el-form-item class="form-item" prop="checkPassword">
      <el-input placeholder="确认密码" type="password" v-model="regForm.checkPassword"></el-input>
    </el-form-item>
    <!-- 注册按钮 -->
    <el-form-item class="form-item form-item-register">
      <el-button type="primary" class="register" @click="handleRegister">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    // 验证两次输入的密码是否一致
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.regForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      regForm: {
        username: "",
        captcha: "",
        nickname: "",
        password: "",
        checkPassword: ""
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
        captcha: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 6, max: 6, message: "长度为 6 个字符", trigger: "blur" }
        ],
        nickname: [
          { required: true, message: "请输入您的名字", trigger: "blur" }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ],
        checkPassword: [
          { validator: validatePass, trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 处理验证码事件
    handleCaptcha() {
      const phone = this.regForm.username;
      // 如果用户名为空 则会弹出下面的提示框
      if (!phone.trim()) {
        this.$confirm("手机号不能为空！", "提示", {
          confirmButtonText: "确定",
          type: "warning",
          showCancelButton: false,
          center: true
        });
        return
      }
      // 用户名存在的话就发送请求 请求验证码
      if (phone.trim()) {
        // 调用actions里面的方法 并把手机号传过去
        this.$store.dispatch("user/sendCaptcha", phone)
          .then(res => {
            // console.log(res)  // 当前输出的为验证码
            this.$confirm(`验证码为：${res}`, "提示", {
              confirmButtonText: "确定",
              type: "success",
              showCancelButton: false,
              center: true
            });
          })
          .catch(err => {
            console.log(err);
          });
          return
      }
    },
    // 处理注册事件
    handleRegister() {
      this.$refs.regForm.validate(valid => {
        if (valid) {
          // 因为后台不需要接收到第二次输入的密码 所以在发送请求前要把checkPassword给干掉
          // 以下代码的意思是除了checkPassword以外其他的值
          const { checkPassword, ...props } = this.regForm;
          // 由于上一步的操作 所以在传参的时候只要写props就好
          this.$store.dispatch("user/register", props)
            .then(res => {
              // 注册成功后 跳转到首页
              // console.log(res)
              this.$router.push("/")
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
.form-item-register {
  padding-bottom: 22px;
}
.register {
  display: block;
  width: 360px;
  margin: 0 auto;
}
</style>