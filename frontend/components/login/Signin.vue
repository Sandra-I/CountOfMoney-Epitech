<template>
  <el-card
    class="grid-content bg-purple-light"
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
import { mapMutations } from "vuex";

export default {
  name: "Signin",
  components: {
    UserAuthForm
  },
  methods: {
    async loginUser(userInfo) {
      try {
        await this.$axios
          .post("/users/login", {
            email: userInfo.email,
            password: userInfo.password
          })
          .then(response => {
            console.log(response);
            if (response.status == 200) {
              localStorage.setItem("user", JSON.stringify(response.data));
              localStorage.setItem("jwt", response.data.token);

              if (localStorage.getItem("jwt")) {
                this.$store.commit("isloggedInTrue");
                axios.defaults.headers.common[
                  "Authorization"
                ] = localStorage.getItem("jwt");
              }
              if (localStorage.getItem("user")) {
                const user = JSON.parse(localStorage.getItem("user"));
                const username = user.username;
                const userId = user.id;
                const currency = user.current;
                const useremail = user.email;
                this.$store.commit("setUsername", username);
                this.$store.commit("setUserId", userId);
                this.$store.commit("setUseremail", useremail);
                // méthode pour attribuer la money selon valeur
                this.setCurrency(currency);
              }
              if (response.data.isadmin == 1) {
                this.$store.commit("isAdminInTrue");
                this.$router.push("/admin");
              } else {
                this.$store.commit("isUserInTrue");
                this.$router.push("/favorites");
              }
            } else {
              alert(response.data.message);
            }
          });
      } catch (e) {
        console.log(e);
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");
        this.$store.commit("isloggedInFalse");
        this.$store.commit("isAdminInFalse");
        this.$store.commit("isUserInFalse");
        this.$store.commit("stateInitialization");
        //reject(err);
      }
    },
    ...mapMutations({
      isIn: "isloggedInTrue"
    }),
    setCurrency(currency) {
      if (currency) {
        switch (currency) {
          case 1:
            this.$store.commit("setUsercurrency", "EUR");
            break;
          case 2:
            this.$store.commit("setUsercurrency", "DOL");
            break;
          case 3:
            this.$store.commit("setUsercurrency", "BTC");
            break;
          default:
            this.$store.commit("setUsercurrency", "EUR");
            break;
        }
      }
    }
  },
  computed: {
    userLoggedState() {
      return this.$store.state.isloggedState;
    }
  }
};
</script>

<style scoped>
.bg-purple-light {
  background: #f6f7fb;
}
.grid-content {
  border-radius: 4px;
}
</style>
