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
    registerUser(user) {
      alert("Coucou");
    }
    // onSubmit(user) {
    //   this.$refs[user].validate((valid) => {
    //     if (valid) {
    //       alert('submit!');
    //       // Rajouter code à exécuter
    //     } else {
    //       // Rajouter code à exécuter
    //       console.log('error submit!!');
    //       return false;
    //     }
    //   })
    // },
    // resetForm(user) {
    //   this.$refs[user].resetFields();
    // },
    // clearValidation(user) {
    //   this.$refs[user].clearValidate();
    // }
  }
};
</script>
