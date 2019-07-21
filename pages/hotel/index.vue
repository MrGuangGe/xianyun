<template>
  <div class="main">
    <div id="container">
      <!-- 面包屑 -->
      <div class="bread">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item>酒店</el-breadcrumb-item>
          <el-breadcrumb-item>上海市酒店预订</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!-- 头部过滤栏 -->
      <el-form>
        <!-- 目的地 -->
        <el-form-item class="block">
          <el-autocomplete
            :fetch-suggestions="queryDepartSearch"
            placeholder="目的地"
            @select="handleDepartSelect"
          ></el-autocomplete>
        </el-form-item>

        <!-- 查询按钮 -->
        <el-form-item class="block">
          <el-button type="success">查看</el-button>
        </el-form-item>
      </el-form>

      <!-- 具体介绍与地图 -->
      <div class="second">
        <div class="second-introduce">
          <el-row class="second-introduce-top">
            <el-col :span="2">区域：</el-col>
            <el-col :span="22">全部 镇兴路沿线视觉艺术学院大成名店南京西站铜山镇大桥南路宝塔路沿线宝塔路/万辰苏果珠江路沿线华侨城江浦东屏镇南京南站/明发北岭路沿线苜蓿园弘阳广场/新一城新街口地区紫金山/孝陵卫火车站/玄武湖东坝镇禄口机场奥体中心雨润大街新模范马路将军山国际慢城云鼎时尚街区百家湖湖南路竹山路沿线南大/南师大江宁滨江开发区湖熟镇南大和园君临紫金商业街大西门建邺万达江宁科学园顾家欧亚达高淳老街谷里汤山镇雄州等43个区域
            </el-col>
          </el-row>
          <el-row class="second-introduce-middle">
            <el-col :span="2">攻略：</el-col>
            <el-col :span="22">北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。
            </el-col>
          </el-row>
          <div class="second-introduce-footer">
            <el-col :span="2">均价：</el-col>
            <el-col :span="22">
              <span>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <span>$777</span>
              </span>
              <span class="span">
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <span>$888</span>
              </span>
              <span class="span">
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <span>$999</span>
              </span>
            </el-col>
          </div>
        </div>
        <div id="second-map"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    // 页面加载完成后执行
    window.onLoad = function() {
      // 生成地图 container是显示地图div的id
      var map = new AMap.Map("second-map", {
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
        // content:
          // "<div style='width:20px;height: 20px;background-color: deeppink;border-radius: 50%;text-align: center;line-height: 20px;'>1</div>"
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
  },
  methods: {
    // 在文本框输入文字后触发
    queryDepartSearch(value) {},
    // 选择下拉列表的内容时触发
    handleDepartSelect(value) {}
  }
};
</script>

<style lang="less" scoped>
#container {
  width: 500px;
  height: 500px;
}
.main {
  width: 1000px;
  margin: 0 auto;
}
.bread {
  margin: 20px 0;
}
.header {
  height: 50px;
}
.block {
  display: inline-block;
}
.second {
  height: 300px;
  width: 1000px;
  .second-introduce {
    width: 600px;
    height: 100%;
    float: left;
    color: rgb(126, 123, 123);
    .second-introduce-top{}
    .second-introduce-middle{
      margin: 22px 0;
    }
    .second-introduce-footer{
      .span{
        margin-left: 22px;
      }
    }
  }
  #second-map {
    width: 388px;
    height: 100%;
    float: right;
  }
}
.iconhuangguan{
  color: orange;
}
</style>

