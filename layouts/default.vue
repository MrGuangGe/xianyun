<template>
  <div>
    <!-- 使用共用的头部 -->
    <Header />
    <!-- 内容的占位符，类似router-view -->
    <nuxt />
    <!-- 使用共用的尾部 -->
    <Footer />
  </div>
</template>

<script>
// 引入共用的头部与尾部
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";

export default {
  // 注册引入的组件
  components: {
    Header,
    Footer
  }
};
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

ul,
li,
ol {
  list-style: none;
}

a {
  color: inherit;
  text-decoration: none;
}

em,
i {
  font-style: normal;
}
</style>
