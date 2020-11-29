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
    loginUser(user) {
      //alert('Clock click');
      this.$refs[user].validate(valid => {
        if (!valid) {
          alert("submit!");
          // Rajouter code à exécuter
        } else {
          // Rajouter code à exécuter
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
