<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{data.info.departCity}} - {{data.info.destCity}}
        /
        {{data.info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
          <el-option
            v-for="(item,index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间" @change="handleFlightTimes">
          <el-option
            v-for="(item,index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00--${item.to}:00`"
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司" @change="handleCompany">
          <el-option
            v-for="(item,index) in data.options.company"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
          <el-option
            v-for="(item,index) in airSizeList"
            :key="index"
            :label="item.type"
            :value="item.size"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  // 声明一个props属性接收数据
  props: {
    data: {
      type: Object, // 接收的属性类型
      default: {} // 默认值
    }
  },
  data() {
    return {
      airport: "", // 机场
      flightTimes: "", // 出发时间
      company: "", // 航空公司
      airSize: "", // 机型大小,
      airSizeList: [
        { type: "大", size: "L" },
        { type: "中", size: "M" },
        { type: "小", size: "S" }
      ]
    };
  },
  methods: {
    // 选择机场时候触发
    handleAirport(value) {
      let newArr = this.data.flights.filter(val => {
        // 条件满足返回到一个新的数组
        return val.org_airport_name === value;
      });
      // 通过this.$emit来调用父组件传递过来的方法,顺便把过滤好的新数组传递给父组件
      this.$emit("changAirTicketList", newArr);
    },

    // 选择出发时间时候触发
    handleFlightTimes(value) {
      // 通过都好切割这样的时间  6,12
      let [from, to] = value.split(",");
      let newArr = this.data.flights.filter(val => {
        // 通过冒号切割与value值匹配的时间
        let [start] = val.dep_time.split(":");
        // 条件满足返回到一个新的数组
        return from <= start && start < to;
      });
      // 通过this.$emit来调用父组件传递过来的方法,顺便把过滤好的新数组传递给父组件
      this.$emit("changAirTicketList", newArr);
    },

    // 选择航空公司时候触发
    handleCompany(value) {
      let newArr = this.data.flights.filter(val => {
        // 条件满足返回到一个新的数组
        return val.airline_name === value;
      });
      // 通过this.$emit来调用父组件传递过来的方法,顺便把过滤好的新数组传递给父组件
      this.$emit("changAirTicketList", newArr);
    },

    // 选择机型时候触发
    handleAirSize(value) {
      let newArr = this.data.flights.filter(val => {
        // 条件满足返回到一个新的数组
        return val.plane_size === value;
      });
      // 通过this.$emit来调用父组件传递过来的方法,顺便把过滤好的新数组传递给父组件
      this.$emit("changAirTicketList", newArr);
    },

    // 撤销条件时候触发
    handleFiltersCancel() {
      // 清空列表
      this.airport = "";
      this.flightTimes = "";
      this.company = "";
      this.airSize = "";
      // 把一份没有处理过的数据传递回去
      this.$emit("changAirTicketList", this.data.flights);
    }
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>