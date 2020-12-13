<template>
  <el-card
    class="grid-content bg-purple-light"
    shadow="never"
    type="flex"
    justify="center"
  >
    <div slot="header" type="flex" justify="center">
      <h1>Register</h1>
      <p>Welcome in the crypto world!</p>
    </div>
    <UserAuthForm
      buttonText="Register"
      :submitForm="registerUser"
      hasName="true"
    />
  </el-card>
</template>

<script>
import UserAuthForm from "@/components/login/UserAuthForm.vue";

export default {
  name: "Register",
  components: {
    UserAuthForm
  },
  methods: {
    
    async registerUser(userInfo) {
      try {
        await this.$axios.post('/users/register', 
          {
            username: userInfo.name,
            email: userInfo.email,
            password: userInfo.password
          }
        ).then(
          (response) => {
            console.log(response);
            if (response.status == 200) {
              this.$router.push('/login');
            } else {
              alert(response.data.message);
            }
          }
        );
      } catch (e) {
        // this.error = e.response.data.message
        console.log(e);
      }
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
