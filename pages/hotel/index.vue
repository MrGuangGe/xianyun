<template>
  <div class="main">
    <!-- 面包屑 头部查询栏 -->
    <HotelQuery />

    <!-- 查询目的地详情 地图 -->
    <HotelMap />

    <!-- 过滤部分 -->
    <HotelFilter />

    <!-- 酒店详情 -->
    <HotelInfo v-for="(item,index) in dataList" :key="index" :data="item" />

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[3, 6]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count"
    ></el-pagination>
  </div>
</template>

<script>
import HotelQuery from "@/components/hotel/hotelQuery.vue";
import HotelMap from "@/components/hotel/hotelMap.vue";
import HotelFilter from "@/components/hotel/hotelFilter.vue";
import HotelInfo from "@/components/hotel/hotelInfo.vue";

export default {
  components: {
    HotelQuery,
    HotelMap,
    HotelFilter,
    HotelInfo
  },
  data() {
    return {
      // 后台返回的所有的数据
      hotelInfoList: [],
      pageIndex: 1, // 当前页码
      pageSize: 3, // 显示条数
      count: 0, // 总条数
      // 永远都是当前页的数据
      dataList: []
    };
  },
  methods: {
    // 切换显示条数时触发
    handleSizeChange(val) {
      // console.log(val);
      this.pageSize = val;
      // 调用根据页数切割当前数据的方法
      this.setDataList()
    },
    // 切换当前页码时触发
    handleCurrentChange(val) {
      // console.log(val);
      this.pageIndex = val;
      // 调用根据页数切割当前数据的方法
      this.setDataList()
    },
    setDataList() {
      // 根据页数切割当前数据
      this.dataList = this.hotelInfoList.slice((this.pageIndex - 1) * this.pageSize,this.pageSize * this.pageIndex);
    }
  },
  mounted() {
    // 获取所有酒店的信息
    this.$axios({
      url: "/hotels",
      method: "GET"
    })
      .then(res => {
        // console.log(res.data,111)
        this.hotelInfoList = res.data.data;
        // 第一页的数据
        this.dataList = this.hotelInfoList.slice(0, this.pageSize);
        // 总数
        this.count = res.data.total;
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
</style>

