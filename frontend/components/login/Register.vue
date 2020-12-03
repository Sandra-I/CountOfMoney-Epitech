<template>
  <el-card
    class="grid-content bg-purple-dark"
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
  components: { UserAuthForm },
  methods: {
    registerUser(userInfo) {
      alert("Coucou");
    }
  }
};
</script>
