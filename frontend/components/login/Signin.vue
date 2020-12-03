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

export default {
  name: "Signin",
  components: { UserAuthForm },
  methods: {
    loginUser(userInfo) {
      console.log(userInfo);
      this.$auth.loginWith('local', { 
        data: {
          username: userInfo.name,
          password: userInfo.password
        }
      });
    }
  }
};
</script>
