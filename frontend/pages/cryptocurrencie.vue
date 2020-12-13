<template>
  <div class="d-flex flex-column justify-content-center">
    <el-row>
      <el-col :span="18">
        <el-card :body-style="{ padding: '0px' }" class="d-flex flex-column p-2 mb-5">
          <h2 slot="header">Crypto Name</h2>
          <img class="image"
              alt=""
              :src="url"
            
          />
          <div style="padding: 14px;">
            <span>Yummy hamburger</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button">Operating</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data () {
    return {
      url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      currentDate: new Date()
    };
  },
  computed: {
    ...mapState({
      isloggedState: "isloggedState",
      username: "username",
      useremail: "useremail",
      usercurrency: "usercurrency"
    })
  }
};
</script>

<style scoped></style>
