<template>
  <el-form
    label-position="top"
    label-width="100px"
    v-model="userInfo"
    :rules="rules"
    ref="userInfo"
    status-icon
  >
    <el-form-item
      label="Username"
      prop="name"
      placeholder="What's your name?"
      v-if="hasName"
    >
      <el-input v-model="userInfo.name"></el-input>
    </el-form-item>

    <el-form-item
      label="E-mail"
      required
      prop="email"
      placeholder="About your email!"
    >
      <el-input type="email" v-model="userInfo.email"></el-input>
    </el-form-item>
    <el-form-item
      label="Password"
      required
      prop="password"
      placeholder="Your secret password"
    >
      <el-input v-model="userInfo.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        style="float: right;"
        @click="submitForm(userInfo)"
        >{{ buttonText }}</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "UserAuthForm",
  data() {
    return {
      valid: false,
      userInfo: {
        name: '',
        //email: 'admin@admin.fr',
        email: 'sisi@sisi.fr',
        password: 'test'
      },
      rules: {
        name: [
          { message: "Please input your username", trigger: "blur" },
          { min: 3, max: 10, message: "Length should be 3 to 10", trigger: "blur" }
        ],
        email: [
          { required: true, message: "Please input your email" },
          { type: "email", trigger: ["blur", "change"] }
        ],
        // 8 caractères min + 1 chiffres + 1 lettre
        password: [
          { required: true, message: "Please input your password", trigger: "blur" },
          { min: 8, max: 15, message: "Length should be 8 to 15", trigger: "blur" }
        ]
      }
    };
  },
  props: ["submitForm", "buttonText", "hasName"]
};
</script>

<style>
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
}
</style>
