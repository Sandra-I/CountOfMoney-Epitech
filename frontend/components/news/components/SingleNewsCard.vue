<template>
  <a :href="data.urlpage">
  <el-card
   :body-style="{ padding: '5px' }"
   class="box-card"
   shadow="hover"
  >
    <div class="image-div">
      <img
        :src="data.urlimage"
        class="image"
      />
    </div>
    <div style="padding: 14px; text-decoration: none;">
      <span>{{ data.title }}</span>
      <div class="bottom clearfix" style="text-decoration: none;">
        <p class="time">Source: <span style="font-weight: bold">{{ data.source }}</span><br />
        <time>{{ $moment(data.date).format("MMMM Do YYYY, h:mm:ss a") }}</time></p>
      </div>
    </div>
  </el-card>
  </a>
</template>

<script>
export default {
  name: "SingleNewsCard",
  props: ['data'],
  data() {
    return {
      picture: "https://mediashower.com/img/E9341BE2-8D67-11E8-8E97-AF63B8ECBBBA/bigstock--212980528_600x.jpg",
      title: "News TITLE"
    };
  },
};
</script>

<style>
.box-card {
  width: 350px;
  height: 250px;
  text-decoration: none;
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
  height: 100%;
  overflow: hidden;
  object-fit: cover;
}

.image-div {
  height: 100px;
  width: 100%;
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
