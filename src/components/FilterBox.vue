<template>
  <div
    :class="filter + ` filter-item`"
    :style="{ backgroundImage: `url(${uploadImg})` }"
    @click="clickFilter"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    uploadImg: String,
    filter: String,
  },
  methods: {
    clickFilter() {
      this.emitter.emit("changeFilter", this.filter);
    },
  },
};
</script>

<style>
.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
  background-position: center;
}
</style>
