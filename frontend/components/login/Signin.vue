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
    <el-form
     label-position="top"
     label-width="100px"
     :model="user"
     :rules="rules"
     ref="user"
     status-icon>
      <el-form-item label="E-mail" required prop="email" placeholder="About your email!">
        <el-input type="email" v-model="user.email"></el-input>
      </el-form-item>
      <!-- intégrer double vérification des mots de passe. correspondance -->
      <el-form-item label="Password" required prop="password" placeholder="A secret password.">
        <el-input v-model="user.password"></el-input>
        <!-- voir si possible à intégrer -->
        <p>Forget password?</p>
      </el-form-item>
      <el-form-item>
        <!-- Si valid est false disabled le bouton -->
        <el-button
         type="primary" 
         style="float: right;" 
         @click="onSubmit('user')">Login</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "Signin",
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: ""
      },
      rules: {
        email: [
          { required: true, message: 'Please input your email', trigger: 'blur' },
          { type: 'email', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: 'Please input your password', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    onSubmit(user) {
      this.$refs[user].validate((valid) => {
        if (valid) { 
          alert('submit!');
          // Rajouter code à exécuter
        } else {
          // Rajouter code à exécuter
          console.log('error submit!!');
          return false;
        }
      })
    }
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-light {
  background: #e5e9f2;
}
.bg-purple-dark {
  background: #99a9bf;
}
.grid-content {
  border-radius: 4px;
  width: 60%;
}
</style>