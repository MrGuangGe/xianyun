<template>
  <div class="container">
    <el-row type="flex" justify="center" align="middle" class="main">
      <div class="form">
        <el-row type="flex" justify="center" class="tabs">
          <span
            v-for="(item,index) in ['登录','注册']"
            :key="index"
            @click="trigger(index)"
            :class="{active:current===index}"
          >{{item}}</span>
        </el-row>
        <!-- 登录组件 -->
        <LoginForm v-if="current===0" />
        <!-- 注册组件 -->
        <RegisterForm v-if="current===1" />
      </div>
    </el-row>
  </div>
</template>

<script>
import LoginForm from "@/components/user/loginForm.vue";
import RegisterForm from "@/components/user/registerForm.vue";
export default {
  data() {
    return {
      current: 0
    };
  },
  methods: {
    trigger(index) {
      this.current = index;
    }
  },
  components: {
    LoginForm,
    RegisterForm
  }
};
</script>

<style lang="less" scoped>
.container {
  background: url(http://127.1:1337/assets/images/th01.jfif) center center no-repeat;
  height: 700px;
  min-width: 1000px;
}
.main {
  width: 1000px;
  height: 100%;
  margin: 0 auto;
  position: relative;
}
.form {
  width: 400px;
}
.tabs {
  span {
    display: block;
    width: 200px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    border-top: 2px solid rgb(228, 225, 225);
    cursor: pointer;
    background-color: rgb(228, 225, 225);
    &.active {
      background-color: #fff;
      border-top: 2px solid deeppink;
      font-weight: 700;
      color: deeppink;
    }
  }
}
</style>

