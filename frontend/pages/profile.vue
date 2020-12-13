<template>
  <div class="d-flex flex-column justify-content-center">
    <el-col :span="18">
      <el-card class="d-flex flex-column p-2 mb-5" shadow="never">
        <h2 slot="header">Update Profile</h2>

        <div class="d-flex flex-column mb-3">
          <label for="username">Username</label>
          <el-input
            
            id="username"
            placeholder="Enter your username"
            v-model="username"
          ></el-input>
        </div>
        <div class="d-flex flex-column mb-3">
          <label for="email">Email</label>
          <el-input
            
            id="email"
            placeholder="Enter your email"
            v-model="useremail"
          ></el-input>
        </div>
        <div class="d-flex flex-column">
          <p>Default currency</p>
          <div class="d-flex flex-row">
            <el-radio v-model="usercurrency" label="EUR" border size="medium"
              ></el-radio
            >
            <el-radio v-model="usercurrency" label="USD" border size="medium"
              ></el-radio
            >
            <el-radio v-model="usercurrency" label="BTC" border size="medium"
              ></el-radio
            >
          </div>
        </div>
        <div class="d-flex justify-content-end">
          <el-button>Update</el-button>
        </div>
      </el-card>
    </el-col>
    
    <el-col :span="18">
      <el-card class="d-flex flex-column p-2 mb-5" shadow="never">
        <h2 slot="header">Your settings</h2>
        <el-divider></el-divider>
        <div class="d-flex flex-column">
          <p>Press Keywords</p>
          <div class="d-flex flex-row">
            Mettre quelque chose
          </div>
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      isloggedState: 'isloggedState',
      username: 'username',
      useremail: 'useremail',
      usercurrency: 'usercurrency'
    })
  },
  mounted () {
    console.log(this.usercurrency);
  }
};
</script>

<style scoped></style>
