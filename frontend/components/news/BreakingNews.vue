<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <h1 style="float: left">News</h1>
      </div>
      <div v-for="result in results" :key="result"  style="display: inline-block;">
        <single-news-card :data="result"></single-news-card>
      </div>
    </el-card>
  </div>
</template>

<script>
import SingleNewsCard from "./components/SingleNewsCard.vue";
export default {
  components: { SingleNewsCard },
  data() {
    return {
      results: []
    }
  },
  mounted() {
    this.$axios.get("/api/news/articles?maxValue=5")
      .then(response => {
        this.results = response.data.result
      })
  }
};
</script>
