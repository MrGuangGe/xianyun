<template>
  <div class="main">
    <!-- 酒店详情 -->
    <el-row class="hotel">
      <el-col class="hotel-left" :span="7">
        <img :src="`${data.photos}`" alt />
      </el-col>
      <el-col class="hotel-middle" :span="10">
        <h4 class="hotel-middle-title">{{data.name}}</h4>
        <div class="hotel-middle-type">
          <span>{{data.alias}}</span>
          <span>
            <i class="iconfont iconhuangguan"></i>
            <i class="iconfont iconhuangguan"></i>
            <i class="iconfont iconhuangguan"></i>
            {{data.hoteltype.name}}
          </span>
        </div>
        <div class="hotel-middle-comment">
          <div class="hotel-middle-comment-l">
            <el-rate
              v-model="data.stars"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}分"
            ></el-rate>
          </div>
          <div class="hotel-middle-comment-m">
            <span class="spanColor">{{data.all_remarks}}</span>条评价
          </div>
          <div class="hotel-middle-comment-r">
            <span class="spanColor">{{data.roomCount}}</span>篇游记
          </div>
        </div>
        <div class="hotel-middle-position clearfix">
          <i class="iconfont iconlocation"></i>
          位于: {{data.address}}
        </div>
      </el-col>
      <el-col class="hotel-right" :span="7">
        <table>
          <tbody>
            <tr class="hotel-right-tr" v-for="(v,i) in data.products" :key="i">
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
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  width: 1000px;
  margin: 0 auto;
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
.iconhuangguan {
  color: orange;
}
</style>