<template>
  <el-card
   :body-style="{ padding: '5px' }"
   class="box-card"
   shadow="hover"
  >
    <img
      src="https://mediashower.com/img/E9341BE2-8D67-11E8-8E97-AF63B8ECBBBA/bigstock--212980528_600x.jpg"
      class="image"
    />
    <div style="padding: 14px">
      <span>News TITLE</span>
      <div class="bottom clearfix">
        <time class="time">News DATE MM-DD-YYYY</time>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "SingleNewsCard",
  data() {
    return {};
  },
};
</script>

<style scoped>
.box-card {
  width: 350px;
  height: 250px;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.image {
  width: 50%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
