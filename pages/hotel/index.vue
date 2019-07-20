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
      var map = new AMap.Map("container", {
        zoom: 11, //级别
        center: [116.397428, 39.90923], //中心点坐标，经纬度
        viewMode: "3D" //使用3D视图
      });

      // 点标记
      // 创建一个Marker实例
      var marker = new AMap.Marker({
        // position: new AMap.LngLat(116.397428, 39.90923), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        position: [116.397428, 39.90923], //位置，经纬度
        title: "北京",
        // 自定义点图标
        content:
          "<div style='width:20px;height: 20px;background-color: deeppink;border-radius: 50%;text-align: center;line-height: 20px;'>1</div>"
      });
      map.add(marker); //添加到地图
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
#container {
  width: 500px;
  height: 500px;
  margin: 50px;
}
.custom {
  width: 20px;
  height: 20px;
  background-color: deeppink;
  border-radius: 50%;
  text-align: center;
  line-height: 20px;
}
</style>

