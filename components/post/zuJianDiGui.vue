<template>
  <div class="container">
    <div v-for="(item,index) in data" :key="index" class="left">
      {{item.title}}
      <suibian :data="item.children" />
    </div>
  </div>
</template>

<script>
export default {
  // 1.先命名name, 在当前组件内可以通过name自己调用自己
  name: "suibian",
  props: {
    data: {
      type: Object,
      default: {}
    }
  }
};
</script>

<style lang="less" scoped>
.left{
    margin-left: 50px;
}
</style>
