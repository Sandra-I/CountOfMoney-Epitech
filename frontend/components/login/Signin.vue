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
import { mapMutations } from "vuex";

export default {
  name: "Signin",
  components: {
    UserAuthForm
  },
  methods: {
    // async loginUser(userInfo) {
    //   try {
    //     let res = await this.$auth.loginWith("local", { userInfo });
        
    //     console.log(userInfo);
    //     let user = res.data.data;
    //     this.$auth.setUser(user);

    //     if (res.status == 200) {
    //       localStorage.setItem("user", JSON.stringify(response.data));
    //       localStorage.setItem("jwt", response.data.token);

    //           console.log(this.$auth);
    //           console.log(this.$store.state.auth);
    //           if (localStorage.getItem("jwt") != null) {
    //             this.$store.commit("isloggedInTrue");
    //           }
    //           if (response.data.isadmin == 1) {
    //             console.log(localStorage.getItem("jwt"));
    //             this.$router.push("/admin");
    //           } else {
    //             this.$router.push("/home");
    //           }
    //         } else {
    //           alert(response.data.message);
    //         }
    //       });
    //   } catch (e) {
    //     console.log(e);
    //   }
    // },
    async loginUser(userInfo) {
      try {
        await this.$auth
          .loginWith("local", { data: userInfo })
          .then(response => {
            console.log(response);
            if (response.status == 200) {
              localStorage.setItem("user", JSON.stringify(response.data));
              localStorage.setItem("jwt", response.data.token);

              let user = response.data.data;
              this.$auth.setUser(user);

              console.log(this.$auth);
              console.log(this.$store.state.auth);
              if (localStorage.getItem("jwt") != null) {
                this.$store.commit("isloggedInTrue");
              }
              if (response.data.isadmin == 1) {
                console.log(localStorage.getItem("jwt"));
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
      }
    },
    // async loginUser(userInfo) {
    //   try {
    //     let response = await this.$auth.loginWith('local', { data: userInfo })
    //     console.log(response)
    //     console.log(userInfo)
    //   } catch (err) {
    //     console.log(err)
    //   }
    // },
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
