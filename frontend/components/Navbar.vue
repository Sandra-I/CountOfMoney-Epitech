<template>
  <div id="navbar" type="flex"  >
    <el-row type="flex"> 
      <el-col :span="12">
        <div style="padding-left: 20px; height: 60px">
          <nuxt-link to="/home"><h1>LOGO</h1></nuxt-link>
        </div>
      </el-col>
      <el-col :span="12" type="flex" >
          <h2 style="padding-right: 20px" justify="end">
            <el-link>
              {{ butLogAccount }}
              <!-- <i class="el-icon-user"></i> -->
            </el-link>
          </h2>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" class="d-flex">
      <el-col :span="24" style="text-align: center">
        <div>
          <el-menu
            class="el-menu-demo d-flex flex-direction-column"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <!-- <el-menu-item index="3" disabled>Info</el-menu-item> -->
            <el-menu-item index="1"><nuxt-link to="/home">Home</nuxt-link></el-menu-item>
            <el-menu-item index="2"><nuxt-link to="/">Cryto Currencies</nuxt-link></el-menu-item>
            <el-menu-item index="3"><nuxt-link to="/">Cryto News</nuxt-link></el-menu-item>
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
      butLogAccount: "Log In | Sign Up",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
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