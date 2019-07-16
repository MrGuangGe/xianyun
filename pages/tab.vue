<template>
  <div class="tab">
    <span
      v-for="(item,i) in ['aa','bb','cc']"
      :key="i"
      @click="handleClick(i)"
      :class="{active:val===i}"
    >{{item}}</span>

    <div v-if="val===0">
      <ul>
        <li>aaaaaaaa</li>
        <li>aaaaaaaa</li>
        <li>aaaaaaaa</li>
        <li>aaaaaaaa</li>
      </ul>
    </div>
    <div v-if="val===1">
      <ul>
        <li>bbbbbbbb</li>
        <li>bbbbbbbb</li>
        <li>bbbbbbbb</li>
        <li>bbbbbbbb</li>
      </ul>
    </div>
    <div v-if="val===2">
      <ul>
        <li>cccccccc</li>
        <li>cccccccc</li>
        <li>cccccccc</li>
        <li>cccccccc</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val: 0
    };
  },
  methods: {
    handleClick(i) {
      this.val = i;
    }
  }
};
</script>

<style>
span {
  margin: 0 22px;
  cursor: pointer;
}
.active {
  color: orangered;
}
</style>
