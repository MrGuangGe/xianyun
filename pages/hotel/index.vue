<template>
  <div class="main">
    <div id="container">
      <!-- 面包屑 头部查询栏 -->
      <HotelQuery />

      <!-- 查询目的地详情 地图 -->
      <HotelMap />

      <!-- 过滤部分 -->
      <HotelFilter />

      <!-- 酒店详情 -->
      <HotelInfo />
    </div>
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
</style>

