<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <el-form class="search-form-content" ref="searchForm" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          class="el-autocomplete"
          v-model="searchForm.departCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          class="el-autocomplete"
          v-model="searchForm.destCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handleDate"
          v-model="searchForm.departDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
// 引入格式化时间的插件 moment
import moment from "moment";

export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      searchForm: {
        departCity: "", // 出发城市
        departCode: "", // 出发城市的代码
        destCity: "", // 目的城市
        destCode: "", // 目的城市的代码
        departDate: "" // 出发时间
      }
    };
  },
  methods: {
    // tab切换时触发
    handleSearchTab(item, index) {
      if (index === 1) {
        this.$message({
          type: "success",
          message: "暂无数据！暂无数据！暂无数据！暂无数据！暂无数据！"
        });
      }
    },

    // 出发城市输入框获得焦点时触发
    // value 是选中的值，callback是回调函数，接收要展示的列表
    queryDepartSearch(val, callback) {
      // 调用获取城市信息的函数
      this.queryCityInfo(val).then(arr => {
        if (arr.length > 0) {
          // 默认选中第一个
          this.searchForm.departCity = arr[0].value;
          this.searchForm.departCode = arr[0].sort;
        }
        callback(arr);
      });
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，callback是回调函数，接收要展示的列表
    queryDestSearch(val, callback) {
      // 调用获取城市信息的函数
      this.queryCityInfo(val).then(arr => {
        if (arr.length > 0) {
          // 默认选中第一个
          this.searchForm.destCity = arr[0].value;
          this.searchForm.destCode = arr[0].sort;
        }
        callback(arr);
      });
    },

    // 封装有个函数获取城市信息
    queryCityInfo(val) {
      // return回去 谁调用了就会返回一个promise
      return new Promise((resolve, reject) => {
        if (!val.trim()) {
          // vlaue值为空的话 调用成功的回调函数resolve 不显示下拉列表
          resolve([]);
          return;
        }
        // 调用actions中的方法获取城市的信息
        this.$store
          .dispatch("air/getCityInfo", val)
          .then(arr => {
            // console.log(arr)
            // 把获取到的城市循环遍历
            const newArr = arr.map(v => {
              return {
                // 解构数组对象中的每一个值
                ...v,
                // 在这些对象中添加一个value值 并且把市字去掉
                value: v.name.replace("市", "")
              };
            });
            // vlaue值不为空的话 调用成功的回调函数resolve 参数为一个数组
            // 回调函数中的参数必须是一个数组 数组中每一项必须是一个对象，对象中必须包含value属性
            // 默认选中第一个
            resolve(newArr);
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      // console.log(item)
      // 触发时把出发城市的 城市代码 和 城市名称 给保存下来
      this.searchForm.departCity = item.value;
      this.searchForm.departCode = item.sort;
    },

    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      // console.log(item)
      // 触发时把目标城市的 城市代码 和 城市名称 给保存下来
      this.searchForm.destCity = item.value;
      this.searchForm.destCode = item.sort;
    },

    // 确认选择日期时触发
    handleDate(value) {
      // console.log(value)
      // 点击选择时间的时候把 时间 给保存下来
      this.searchForm.departDate = moment(value).format("YYYY-MM-DD");
    },

    // 出发和目标城市切换时触发
    handleReverse() {
      const { departCity, departCode, destCity, destCode } = this.searchForm;
      this.searchForm.departCity = destCity;
      this.searchForm.departCode = destCode;
      this.searchForm.destCity = departCity;
      this.searchForm.destCode = departCode;
    },

    // 点击搜索框时触发
    handleSubmit() {
      const rules = {
        departCity: {
          value: this.searchForm.departCity,
          message: "请选择出发城市"
        },
        destCity: {
          value: this.searchForm.destCity,
          message: "请选择目标城市"
        },
        departDate: {
          value: this.searchForm.departDate,
          message: "请选择出发日期"
        }
      };

      // 验证结果 默认值为true
      let valid = true;

      // console.log(Object.keys(rules))  // ["departCity", "destCity", "departDate"]
      Object.keys(rules).forEach(item => {
        // 如果有一次验证不通过 直接退出
        if (!valid) return;

        // 如果有字段值为空 就会有弹框
        if (!rules[item].value.trim()) {
          valid = false;
          this.$message({
            type: "warning",
            message: rules[item].message
          });
        }

        // 如果合法  传参并进行页面的跳转
        if (valid) {
          this.$router.push({ path: "/air/flights", query: this.searchForm });
        }
      });
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
    cursor: pointer;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>
