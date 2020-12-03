<template>
  <div id="navbar" type="flex" class="mt-2">
    <el-row class="d-flex">
      <el-col :span="12" class="d-flex">
        <div style="padding-left: 20px; height: 60px">
          <nuxt-link to="/home">LOGO</nuxt-link>
        </div>
      </el-col>
      <el-col :span="12" class="d-flex justify-content-end">
        <div v-if="this.$auth.loggedIn">
          {{ $auth.user.email }}
          <el-button size="medium">Logout</el-button>
        </div>
        <div else>
          <nuxt-link to="/login">
            <el-button size="medium">
              Login | Register
            </el-button>
          </nuxt-link>
        </div>
      </el-col>
    </el-row>

    <el-row type="flex" justify="center" class="d-flex">
      <el-col :span="24" style="text-align: center">
        <div>
          <el-menu
            class="el-menu-demo d-flex flex-direction-column"
            mode="horizontal"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <!-- <el-menu-item index="3" disabled>Info</el-menu-item> -->
            <el-menu-item
              ><nuxt-link to="/home">Home</nuxt-link></el-menu-item
            >
            <el-menu-item
              ><nuxt-link to="/">Cryto Currencies</nuxt-link></el-menu-item
            >
            <el-menu-item
              ><nuxt-link to="/">Cryto News</nuxt-link></el-menu-item
            >
          </el-menu>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      butLogAccount: "Log In | Sign Up"
    };
  }
};
</script>

<style>
.el-menu--horizontal > .el-menu-item {
  float: none !important;
  display: inline-block;
}
.nuxt-link-active {
  color: none;
  text-decoration: none !important;
}
</style>
