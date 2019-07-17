<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :data="cacheFlightsData" @changAirTicketList="changAirTicketList"/>

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <FlightsItem v-for="(item,index) in airTicketList" :key="index" :data="item" />
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside />
      </div>
    </el-row>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[5, 10, 15]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count"
    ></el-pagination>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
import FlightsFilters from "@/components/air/flightsFilters.vue";
import FlightsAside from "@/components/air/flightsAside.vue";

export default {
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
  data() {
    return {
      // 把所有机票信息都存起来
      flightsData: {
        // 每一项机票的数据
        flights: [],
        // 出发地 到达地 出发时间
        info: {},
        // 头部过滤用到的数据
        options: {}
      },
      // 缓存一份接口返回最初的数据，一旦赋值之后永远不能修改
      cacheFlightsData:  {
        flights: [],
        info: {},
        options: {}
      },
      pageIndex: 1, // 当前页码
      pageSize: 5, // 显示条数
      count: 0 // 总条数
    };
  },
  methods: {
    // 切换显示条数时触发
    handleSizeChange(val) {
      this.pageSize = val;
    },
    // 切换当前页码时触发
    handleCurrentChange(val) {
      this.pageIndex = val;
    },
    // 下面的方法将会传递给子组件
    changAirTicketList(arr){
      // console.log(123)
      // 把子组件传递过里的数组重新赋值给this.flightsData.flights
      this.flightsData.flights = arr
    }
  },
  mounted() {
    // 发送请求获取所有的机票的详细信息
    this.$axios({
      url: "/airs",
      method: "GET",
      params: this.$route.query
    })
      .then(res => {
        // console.log(res.data);
        this.flightsData = res.data;
        // 上面的值是一样的，只不过一旦被赋值之后，不能被修改。通过{...}的方式保存返回的数据就不会与上面冲突了
        this.cacheFlightsData = {...res.data}
        // 总条数
        this.count = res.data.total;
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed:{
    // 使用computed属性实现分页功能
    // 根据页数切割当前数据
    airTicketList() {
      // 从当前页码的索引开始截取 向后截取n位
      return this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageSize * this.pageIndex
      );
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>