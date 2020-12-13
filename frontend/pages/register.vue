<template>
  <!-- <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
    name est l'attribut utilisé par Tabs pour connaître l'onglet actif
    <el-tab-pane label="Register" name="register">
      <Register />
    </el-tab-pane>
    <el-tab-pane label="Sign in" name="signin">
      <Signin />
    </el-tab-pane>
  </el-tabs> -->
  <Register />
</template>

<script>
import Register from "@/components/login/Register.vue";

export default {
  components: { Register }
};
</script>
