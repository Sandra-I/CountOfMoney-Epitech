<template>
  <el-card
   :body-style="{ padding: '0px' }" 
   class="box-card"
   shadow="hover"
  >
  <!-- v-for fficher crypto qui sont dans les favoris -->
    <div style="padding: 4px">
      <h1>Crypto Name</h1>
      <h4>Current Price €€€</h4>
      <br />
      <p>
        <time class="time">{{ currentDate }}</time>
      </p>
      <br />
      <p>GRAPH TO ADD</p>
      <!-- <div class="bottom clearfix">
        <time class="time">{{ currentDate }}</time>
        <el-button type="text" class="button">Operating</el-button>
      </div> -->
    </div>
  </el-card>
</template>

<script>
export default {
  name: "CryptoGraphCard",
  data() {
    return {
      currentDate: new Date(),
    };
  },
};
</script>

<style scoped>
.time {
  font-size: 13px;
  color: #999;
}
.box-card {
  width: 300px;
  height: 200px;
}
</style>