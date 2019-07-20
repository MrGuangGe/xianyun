<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    // 页面加载完成后执行
    window.onLoad = function() {
      // 生成地图 container是显示地图div的id
      var map = new AMap.Map("container");
    };

    // 我申请的key
    const myKey = "59539d6f149c4b42f0f6f4a3ef56ffc0";
    // 地图链接
    var url = `https://webapi.amap.com/maps?v=1.4.15&key=${myKey}&callback=onLoad`;
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }
};
</script>

<style lang="less" scoped>
#container{
  width: 500px;
  height: 500px;
  margin: 50px;
}
</style>

