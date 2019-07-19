<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <div class="main">
        <OrderForm @getTicketData="getTicketData" />
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <OrderAside :data="ticketData" />
      </div>
    </el-row>
  </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm.vue";
import OrderAside from "@/components/air/orderAside.vue";
export default {
  data() {
    return {
      ticketData: {
          seat_infos:{}
      }
    };
  },
  components: {
    OrderForm,
    OrderAside
  },
  methods: {
    // 这个事件传递给子组件,以获取回来需要使用到的数据
    getTicketData(data) {
    // console.log(data);
    this.ticketData = data
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}

/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>