<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div></div>

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <FlightsItem v-for="(item,index) in airTicketList" :key="index" :data="item" />
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
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

export default {
  components: {
    FlightsListHead,
    FlightsItem
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
        // 航班总条数
        // total
      },
      airTicketList: [],
      pageNum: 1, // 当前页码
      pageSize: 5, // 显示条数
      count: 0 // 总条数
    };
  },
  methods: {
    // 切换显示条数时触发
    handleSizeChange(val) {
      this.pageSize = val;
      this.setAirTicketList()
    },
    // 切换当前页码时触发
    handleCurrentChange(val) {
      this.pageNum = val;
      this.setAirTicketList()
    },
    // 根据页数切割当前数据
    setAirTicketList() {
      // 从索引0开始截取 向后截取n位
      this.airTicketList = this.flightsData.flights.slice(
        (this.pageNum - 1) * this.pageSize,
        this.pageSize * this.pageNum
      );
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
        // 总条数
        this.count = res.data.total;
        // 第一页数据
        this.airTicketList = res.data.flights.slice(0, this.pageSize);
      })
      .catch(err => {
        console.log(err);
      });
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