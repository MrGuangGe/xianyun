<template>
  <div class="container">
    <ZuJianDiGui :data="zuJianDiGuiList"/>
  </div>
</template>

<script>
import ZuJianDiGui from "@/components/post/zuJianDiGui.vue";

export default {
  components: {
    ZuJianDiGui
  },
  data() {
    return {
      zuJianDiGuiList: [
        // 一级
        {
          title: "电影",
          children: [
            {
              title: "喜剧",
              children: [{ title: "hahahahahahahahahahaha" }]
            },
            {
              title: "悲剧",
              children: [{ title: "wuwuwuwuwuwuwuwuwuwuwu" }]
            }
          ]
        },
        // 一级
        {
          title: "服装",
          children: [
            {
              title: "长袖",
              children: [{ title: "长长长长长长长长长长长" }]
            },
            {
              title: "短袖",
              children: [{ title: "短短短短短短短短短短短" }]
            }
          ]
        },
        // 一级
        {
          title: "电器",
          children: [
            {
              title: "电视",
              children: [{ title: "液晶电视" }, { title: "普通电视" }]
            },
            { title: "冰箱" },
            { title: "空调" }
          ]
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
</style>
