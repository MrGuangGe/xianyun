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
        <FlightsItem 
        v-for="(item,index) in flightsData.flights" 
        :key="index" 
        :data="item"
        />
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
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
      }
    };
  },
  mounted() {
    // 发送请求获取所有的机票的详细信息
    this.$axios({
      url: "/airs",
      method: "GET",
      params: this.$route.query
    })
      .then(res => {
        console.log(res.data);
        this.flightsData = res.data
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