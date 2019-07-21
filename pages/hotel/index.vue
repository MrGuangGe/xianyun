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
            <el-col
              :span="22"
            >全部 镇兴路沿线视觉艺术学院大成名店南京西站铜山镇大桥南路宝塔路沿线宝塔路/万辰苏果珠江路沿线华侨城江浦东屏镇南京南站/明发北岭路沿线苜蓿园弘阳广场/新一城新街口地区紫金山/孝陵卫火车站/玄武湖东坝镇禄口机场奥体中心雨润大街新模范马路将军山国际慢城云鼎时尚街区百家湖湖南路竹山路沿线南大/南师大江宁滨江开发区湖熟镇南大和园君临紫金商业街大西门建邺万达江宁科学园顾家欧亚达高淳老街谷里汤山镇雄州等43个区域</el-col>
          </el-row>
          <el-row class="second-introduce-middle">
            <el-col :span="2">攻略：</el-col>
            <el-col
              :span="22"
            >北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</el-col>
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

      <!-- 酒店星级过滤 -->
      <div class="filter">
        <el-row>
          <el-col :span="8" style="padding:0 20px;">
            <span>价格</span>
            <span class="el-icon--price">0-9999</span>
            <el-slider v-model="elSlideValue"></el-slider>
          </el-col>
          <el-col :span="4" style="padding:0 20px;" type="flex" justify="space-between">
            <div>住宿登记</div>
            <el-dropdown>
              <span class="el-dropdown-link">
                不限
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="4" style="padding:0 20px;">
            <div>住宿类型</div>
            <el-dropdown>
              <span class="el-dropdown-link">
                不限
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="4" style="padding:0 20px;">
            <div>酒店设施</div>
            <el-dropdown>
              <span class="el-dropdown-link">
                不限
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="4" style="padding:0 20px;">
            <div>酒店品牌</div>
            <el-dropdown>
              <span class="el-dropdown-link">
                不限
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </div>

      <!-- 酒店详情 -->
      <el-row class="hotel" v-for="(item,index) in hotelInfoList" :key="index">
        <el-col class="hotel-left" :span="7">
          <img :src="`${item.photos}`" alt />
        </el-col>
        <el-col class="hotel-middle" :span="10">
          <h4 class="hotel-middle-title">{{item.name}}</h4>
          <div class="hotel-middle-type">
            <span>{{item.alias}}</span>
            <span>
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>{{item.hoteltype.name}}
            </span>
          </div>
          <div class="hotel-middle-comment">
            <div class="hotel-middle-comment-l">
              <el-rate
                v-model="xingxingValue"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}分"
              ></el-rate>
            </div>
            <div class="hotel-middle-comment-m">
              <span class="spanColor">{{item.all_remarks}}</span>条评价
            </div>
            <div class="hotel-middle-comment-r">
              <span class="spanColor">{{item.roomCount}}</span>篇游记
            </div>
          </div>
          <div class="hotel-middle-position clearfix">
            <i class="iconfont iconlocation"></i>位于: {{item.address}}
          </div>
        </el-col>
        <el-col class="hotel-right" :span="7">
          <table>
            <tbody>
              <tr class="hotel-right-tr" v-for="(v,i) in item.products" :key="i">
                <td>{{v.name}}</td>
                <td style="padding-left:22px;">
                  <span class="spanColor">￥{{v.price}}</span>起
                  <i class="el-icon-arrow-right"></i>
                </td>
              </tr>
            </tbody>
          </table>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      elSlideValue: 100,
      xingxingValue: 0,
      // 酒店详情
      hotelInfoList:[]
    };
  },
  mounted() {
    this.$axios({
      url: "/hotels",
      method: "GET"
    })
      .then(res => {
        console.log(res.data);
        this.hotelInfoList = res.data.data
        res.data.data.map(val => this.xingxingValue = val.stars)
      })
      .catch(err => {
        console.log(err);
      });

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
        title: "北京"
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
    color: rgb(100, 99, 99);
    .second-introduce-middle {
      margin: 22px 0;
    }
    .second-introduce-footer {
      .span {
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
.iconhuangguan {
  color: orange;
}
.filter {
  width: 1000px;
  height: 80px;
  border: 1px solid rgb(100, 99, 99);
  margin: 22px 0;
  color: rgb(100, 99, 99);
  padding-top: 20px;
}
.border-right {
  border-right: 1px solid rgb(100, 99, 99);
}
.el-dropdown-link {
  cursor: pointer;
  color: rgb(100, 99, 99);
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-icon--right {
  margin-left: 50px;
}
.el-icon--price {
  margin-left: 200px;
}
.hotel {
  width: 1000px;
  height: 222px;
  margin-bottom: 22px;
  .hotel-left {
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .hotel-middle {
    height: 100%;
    padding-left: 10px;
    .hotel-middle-title {
      font-weight: 500;
      font-size: 18px;
    }
    .hotel-middle-type {
      color: rgb(100, 99, 99);
    }
    .hotel-middle-comment {
      padding: 22px 0;

      .hotel-middle-comment-l {
        float: left;
      }
      .hotel-middle-comment-m {
        float: left;
        margin-left: 33px;
      }
      .hotel-middle-comment-r {
        float: left;
        margin-left: 33px;
      }
    }
    .hotel-middle-position {
      padding-top: 22px;
      color: rgb(100, 99, 99);
    }
  }
  .hotel-right {
    height: 100%;
    padding: 30px 0 0 53px;
    .hotel-right-tr {
      color: rgb(100, 99, 99);
      cursor: pointer;
      height: 40px;
      line-height: 40px;
      background-color: #fff;
    }
  }
}
.clearfix::after {
  content: "."; /*给生成的标签元素添加一个象征性的内容*/
  display: block; /*将这个行内伪元素转换成块级伪元素*/
  clear: both; /*给生成的伪元素添加清除浮动的功能*/
  height: 0; /*将content内容中的.不在页面中显示*/
  visibility: hidden; /*再加一层保险，将多余的部分隐藏掉，不要对页面布局造成影响*/
}
.clearfix {
  *zoom: 1; /* IE6、7 专有 */
}
.spanColor {
  color: orange;
}
</style>

