<template>
  <div class="header">
    <!-- 版心 -->
    <el-row class="main" type="flex" justify="space-between">
      <!-- logo -->
      <div class="logo">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
        </nuxt-link>
      </div>
      <!-- 导航栏 -->
      <el-row class="nav" type="flex">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <!-- 用户登录 -->
      <div class="user">
        <!-- 如果不存在token值就显示登/注册 -->
        <div class="user-login" v-if="!$store.state.user.userInfo.token">
          <nuxt-link to="/user/login">登录/注册</nuxt-link>
        </div>
        <!-- token值存在就显示用户名 -->
        <div class="user-self" v-else>
          <el-dropdown>
            <span class="user-self-img">
              <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt />
              <!-- <img src="$store.state.user.userInfo.user.defaultAvatar" alt /> -->
              <span>{{$store.state.user.userInfo.user.nickname}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" class="user-self-msg">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <!-- 在组件使用事件时一定要加上.native -->
              <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    // 退出登录
    logout() {
      // 调用user模块下的clearUserInfo方法清空用户信息
      this.$store.commit("user/clearUserInfo");
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  box-shadow: 0 1px 1px #ccc;
  .main {
    width: 1000px;
    margin: 0 auto;
    height: 60px;
    line-height: 60px;
    .logo {
      img {
        width: 156px;
        height: 42px;
        margin-top: 9px;
      }
    }
    .nav {
      flex: 1;
      margin-left: 20px;
      a {
        padding: 0 20px;
        &:hover {
          color: #409eff;
          border-bottom: 5px #409eff solid;
        }
      }
      .nuxt-link-exact-active {
        background-color: #409eff;
        &:hover {
          color: #fff;
        }
      }
    }
    .user {
      .user-self {
        .user-self-img {
          img {
            width: 32px;
            height: 32px;
            vertical-align: middle;
          }
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>