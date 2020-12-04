<template>
  <div id="navbar" type="flex" class="mt-2">
    <el-row class="d-flex mb-0">
      <el-col :span="12" class="d-flex m-auto">
        <div class="pl-3" style="height: 30px">
          <nuxt-link to="/home">LOGO</nuxt-link>
        </div>
      </el-col>
      <el-col :span="12" class="d-flex justify-content-end mb-2">
        <div v-if="this.userLoggedState">
          Coucou
          <el-button size="medium" @click="logOut">Logout</el-button>
        </div>
        <div v-if="!this.userLoggedState">
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
  },
  computed: {
    userLoggedState () {
      return this.$store.state.isloggedState;
    }
  },
  methods: {
    async logOut() {
      await this.$axios.get('http://127.0.0.1:3000/users/logout'
      ).then(
        (response) => {
          if(response.status == 200) {
            //console.log(response.data);
            localStorage.removeItem('user');
            localStorage.removeItem('jwt');
            this.$store.commit('isloggedInFalse');
            this.$router.push('/home');
          }
        }
      )
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
