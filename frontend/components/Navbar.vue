<template>
  <div id="navbar" type="flex" class="mt-2">
    <el-row class="d-flex">
      <el-col :span="12" class="d-flex">
        <div style="padding-left: 20px; height: 60px">
          <nuxt-link to="/home">LOGO</nuxt-link>
        </div>
      </el-col>
      <el-col :span="12" class="d-flex justify-content-end">
        <div v-if="this.isloggedState">
          <span>{{ this.username }}</span>
          <el-button size="medium" @click="logOut">Logout</el-button>
        </div>
        <div v-if="!this.isloggedState">
          <nuxt-link to="/login">
            <el-button size="medium">
              {{ butLogAccount }}
            </el-button>
          </nuxt-link>
        </div>
      </el-col>
    </el-row>

    <el-row type="flex" class="d-flex">
      <el-col :span="24" class="d-flex justify-content-center">
        <template v-if="this.isloggedState">
          <el-menu
          :default-active="activeIndex"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          >
            <!-- :router="true" -->
            <!-- <el-menu-item><nuxt-link to="/"><span><i class="el-icon-s-home"></i>Home</span></nuxt-link></el-menu-item> -->
            <el-menu-item index="1"
              ><nuxt-link to="/">Home</nuxt-link></el-menu-item
            >
            <el-menu-item index="2"
              ><nuxt-link to="/favorites">My Favorites C</nuxt-link></el-menu-item
            >
            <!-- <el-menu-item index="3"><nuxt-link to="/">Cryto News</nuxt-link></el-menu-item> -->
            <el-menu-item index="4">
              <nuxt-link to="/profile">Profile</nuxt-link></el-menu-item
            >
            <el-menu-item index="5" v-if="this.isAdmin"
              ><nuxt-link to="/admin">App Settings</nuxt-link></el-menu-item
            >
          </el-menu>
        </template>
        <template v-if="!this.isloggedState">
          <p>Welcome in the Crypto World! Register to follow your favorites cryptos</p>
        </template>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      butLogAccount: "Register | Sign in",
      testname: "Test",
      activeIndex: "5"
    };
  },
  computed: {
    ...mapState({
      isloggedState: "isloggedState",
      username: "username",
      isAdmin: "isAdmin"
    })
  },
  methods: {
    async logOut() {
      try {
        await this.$axios.get("/users/logout").then(response => {
          if (response.status == 200) {
            console.log("logout");
            localStorage.removeItem("user");
            localStorage.removeItem("jwt");
            this.$store.commit("isloggedInFalse");
            this.$store.commit("isAdminInFalse");
            this.$store.commit("isUserInFalse");
            this.$store.commit("stateInitialization");
            this.$router.push("/");
          }
        });
      } catch (e) {
        console.log(e);
        //reject(err);
      }
    }
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
