<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <h1 style="float: left">Breaking News</h1>
      </div>
      <div v-for="o in 3" :key="o"  style="display: inline-block;">
        <single-news-card></single-news-card>
      </div>
    </el-card>
  </div>
</template>

<script>
import SingleNewsCard from "./components/SingleNewsCard.vue";
export default {
  components: { SingleNewsCard },
};
</script>