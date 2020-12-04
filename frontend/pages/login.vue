<template>
  <el-tabs
    type="border-card"
    class="card my-3"
    v-model="activeName" @tab-click="handleClick">
    <!-- name est l'attribut utilisé par Tabs pour connaître l'onglet actif -->
    <el-tab-pane label="Register" name="register">
      <Register />
    </el-tab-pane>
    <el-tab-pane label="Sign in" name="signin">
      <Signin />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import Register from "../components/login/Register.vue";
import Signin from "../components/login/Signin.vue";

export default {
  components: { Signin, Register },
  data() {
    return {
      activeName: "signin"
    };
  },
  methods: {
    handleClick(tab) {
      console.log(tab['name']);
    }
  }
};
</script>

<style scoped>
.card {
  max-width: 40em;
  margin: auto;
  border-radius: 10px;
}
</style>
