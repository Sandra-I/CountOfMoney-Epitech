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
    <el-form
     label-position="top"
     label-width="100px"
     :model="user"
     :rules="rules"
     ref="user"
     status-icon>

      <el-form-item label="Username" required prop="name" placeholder="What's your name?"> 
        <el-input v-model="user.name"></el-input>
      </el-form-item>
      <el-form-item label="E-mail" required prop="email" placeholder="About your email!">
        <el-input type="email" v-model="user.email"></el-input>
      </el-form-item>
      <!-- intégrer double vérification des mots de passe. correspondance -->
      <el-form-item label="Password" required prop="password" placeholder="A secret password.">
        <el-input v-model="user.password"></el-input>
      </el-form-item>
      <el-form-item label="Confirm password" required prop="passwordConfirmation" placeholder="The same secret!">
        <el-input  v-model="user.passwordConfirmation"></el-input>
      </el-form-item>
      <el-form-item>
        <!-- Si valid est false disabled le bouton -->
        <el-button
         type="primary" 
         style="float: right;" 
         @click="onSubmit('user')">Register</el-button>

        <el-button
         @click="resetForm('user')"
         size="small">Reset</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        passwordConfirmation: ""
      },
      rules: {
        name: [
          { required: true, message: 'Please input your username', trigger: 'blur' },
          { min: 3, max: 10, message: 'Length should be 3 to 10', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Please input your email', trigger: 'blur' },
          { type: 'email', min: 3, max: 10, message: 'Length should be 3 to 10', trigger: ['blur', 'change'] }
        ],
        // 8 caractères min + 1 chiffres + 1 lettre
        password: [
          { required: true, message: 'Please input your password', trigger: 'blur' },
          { min: 8, max: 15, message: 'Length should be 8 to 15', trigger: 'blur' }
        ],
        passwordConfirmation: [
          { required: true, message: 'Please input the same password', trigger: 'blur' },
          { min: 8, max: 15, message: 'Length should be 8 to 15', trigger: 'blur' }
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
    },
    resetForm(user) {
      this.$refs[user].resetFields();
    },
    clearValidation(user) {
      this.$refs[user].clearValidate();
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