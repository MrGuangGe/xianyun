<template>
  <div class="main">
    <!-- 面包屑 -->
    <div class="bread">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>酒店</el-breadcrumb-item>
        <el-breadcrumb-item>上海市酒店预订</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-form>
      <!-- 目的地 -->
      <el-form-item class="block">
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          placeholder="目的地"
          @select="handleDepartSelect"
        ></el-autocomplete>
      </el-form-item>

      <!-- 查询按钮 -->
      <el-form-item class="block">
        <el-button type="success">查看</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  methods: {
    queryDepartSearch(val) {},
    handleDepartSelect(val) {}
  }
};
</script>

<style lang="less" scoped>
.main {
  width: 1000px;
  margin: 0 auto;
}
.bread {
  margin: 20px 0;
}
.block {
  display: inline-block;
}
</style>