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
import { mapMutations } from "vuex";

export default {
  name: 'Signin',
  components: {
    UserAuthForm
  },
  methods: {
    async loginUser(userInfo) {
      try {
        await this.$axios
          .post('http://127.0.0.1:3000/users/login', {
            email: userInfo.email,
            password: userInfo.password
          })
          .then(response => {
            if (response.status == 200) {
              localStorage.setItem('user', JSON.stringify(response.data));
              localStorage.setItem('jwt', response.data.token);

              if (localStorage.getItem('jwt') != null) {
                this.$store.commit('isloggedInTrue');
              }
              if (response.data.isadmin == 1) {
                this.$router.push('/admin');
              } else {
                this.$router.push('/home');
              }
            } else {
              alert(response.data.message);
            }
          });
      } catch (e) {
        console.log(e);
      }
    },
    ...mapMutations({
      isIn: 'isloggedInTrue'
    })
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
