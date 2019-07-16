<template>
  <div class="container">
    <!-- 轮播图 -->
    <el-carousel :interval="3000" arrow="always">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <div
          class="banner-img"
          :style="`background:url(${$axios.defaults.baseURL + item.url}) center center no-repeat
          background-size:contain contain;`"
        ></div>
      </el-carousel-item>
    </el-carousel>

    <!-- 搜索框 -->
    <div class="tab">
      <div class="tab-item">
        <!-- tab栏 -->
        <el-row class="tab-item-nav">
          <span
            v-for="(item,index) in tabs"
            :key="index"
            :class="{active:current===index}"
            @click="handleClick(index)"
          >{{item.name}}</span>
        </el-row>
        <!-- 输入框 -->
        <el-row class="tab-item-search">
          <input type="text" :placeholder="tabs[current].placeholder" />
          <i class="el-icon-search"></i>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0,
      // 轮播图
      banners: [],
      // tab栏的数据
      tabs: [
        { name: "攻略", placeholder: "搜索城市" },
        { name: "酒店", placeholder: "搜索酒店" },
        { name: "机票" }
      ]
    };
  },
  methods: {
    // 处理点击tab栏选项切换输入框里面的提示信息
    handleClick(index) {
      // 促使当前高亮
      this.current = index;

      // 当点击到机票时 也就是索引为2时进行旅游的跳转
      if (index === 2) {
        this.$router.push("/air");
      }
    }
  },
  mounted() {
    // 把axios绑定到原型
    // 获取轮播图的数据
    this.$axios({
      url: "/scenics/banners",
      method: "GET"
    })
      .then(res => {
        // console.log(res);
        this.banners = res.data.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="less" scoped>
/*
在scoped中如果要覆盖原来的样式  需要在要修改的样式前加上/deep/
*/
// 轮播图
.banner-img {
  width: 100%;
  height: 100%;
}
/deep/ .el-carousel__container {
  height: 700px;
}

// tab栏
.container {
  position: relative;
  min-width: 1000px;
  margin: 0 auto;
}
.tab {
  position: absolute;
  z-index: 2;
  width: 1000px;
  top: 40%;
  left: 50%;
  margin-left: -500px;
  .tab-item {
    width: 555px;
    margin: 0 auto;
  }
}
.tab-item-nav {
  .active {
    background-color: #fff;
    color: #000;
  }
  span {
    display: inline-block;
    background-color: #433c3c;
    padding: 14px 22px;
    border-radius: 4px 33px 0 0;
    cursor: pointer;
    color: #fff;
  }
}
.tab-item-search {
  input {
    width: 500px;
    height: 44px;
    padding-left: 10px;
    background: #fff;
    border-radius: 0 4px 4px 4px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-top: none;
    border-left: none;
  }
  i {
    margin-left: -26px;
    font-weight: bold;
    cursor: pointer;
  }
}
</style>
