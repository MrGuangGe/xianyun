<template>
  <div class="main">
    <!-- 酒店星级过滤 -->
    <div class="filter">
      <el-row>
        <el-col :span="8" style="padding:0 20px;">
          <span>价格</span>
          <span class="el-icon--price">0-9999</span>
          <el-slider v-model="elSlideValue"></el-slider>
        </el-col>
        <el-col :span="4" style="padding:0 20px;" type="flex" justify="space-between">
          <div>住宿等级</div>
          <el-dropdown>
            <span class="el-dropdown-link">
              不限
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item,index) in hotelItemList.levels" :key="index">{{item.name}}</el-dropdown-item>
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
              <el-dropdown-item v-for="(item,index) in hotelItemList.types" :key="index">{{item.name}}</el-dropdown-item>
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
              <el-dropdown-item v-for="(item,index) in hotelItemList.assets" :key="index">{{item.name}}</el-dropdown-item>
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
            <el-dropdown-menu slot="dropdown" style="height: 222px;overflow: scroll;">
              <el-dropdown-item v-for="(item,index) in hotelItemList.brands" :key="index">{{item.name}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      elSlideValue: 4000,
      // 酒店选项
      hotelItemList: {
        // 设施
        assets: [],
        // 品牌
        brands: [],
        // 星级
        levels: [],
        // 类型
        types: []
      }
    };
  },
  mounted() {
    // 获取酒店选项信息
    this.$axios({
      url: "/hotels/options",
      method: "GET"
    })
      .then(res => {
        // console.log(res.data,222)
        this.hotelItemList = res.data.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="less" scoped>
.main {
  width: 1000px;
  margin: 0 auto;
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
</style>