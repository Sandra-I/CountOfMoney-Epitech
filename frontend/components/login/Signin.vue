<template>
  <el-card
    class="grid-content bg-purple-dark"
    shadow="never"
    type="flex"
    justify="center"
  >
    <div slot="header" type="flex" justify="center">
      <h1>Sign In</h1>
      <p>Welcome back!</p>
    </div>
    <UserAuthForm buttonText="Sign in" :submitForm="loginUser" />
  </el-card>
</template>

<script>
import UserAuthForm from "@/components/login/UserAuthForm.vue";
import axios from "axios";
import { mapMutations } from 'vuex';

export default {
  name: "Signin",
  components: {
    UserAuthForm
  },
  methods: {
    async loginUser(userInfo) {
      try {
        await this.$axios.post('/users/login', { 
            email: userInfo.email,
            password: userInfo.password
           })
          .then(response => {
            //console.log(response);
            if (response.status == 200) {
              localStorage.setItem("user", JSON.stringify(response.data));
              localStorage.setItem("jwt", response.data.token);

              // console.log('localStorage');
              // console.log(response.data);

              if (localStorage.getItem("jwt") != null) {
                this.$store.commit("isloggedInTrue");
                axios.defaults.headers.common['Authorization'] = localStorage.getItem("jwt");
              }
              if (localStorage.getItem("user") != null) {
                console.log('in getItem user');
                const user = JSON.parse(localStorage.getItem("user"));
                console.log(user);
                const username = user.username;
                console.log(typeof(username));
                console.log(username);
                //this.$store.commit("setUsername", "User Simple");
              }
              if (response.data.isadmin == 1) {
                console.log('isAdmin');
                this.$store.commit("isAdminInTrue");
                this.$router.push("/admin");
              } else {
                this.$router.push("/home");
              }
            } else {
              alert(response.data.message);
            }
          });
      } catch (e) {
        console.log(e);
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        reject(err);
      }
    },
    ...mapMutations({
      isIn: "isloggedInTrue"
    })
  },
  computed: {
    userLoggedState() {
      return this.$store.state.isloggedState;
    }
  }
};
</script>
