<template>
  <!-- <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="Register" name="register">
      <Register />
    </el-tab-pane>
    <el-tab-pane label="Sign in" name="signin">
      <Signin />
    </el-tab-pane>
  </el-tabs> -->

  <Signin />
</template>

<script>
import Signin from "@/components/login/Signin.vue";

export default {
  components: { Signin }
};
</script>

<style scoped>
.card {
  max-width: 40em;
  margin: auto;
  border-radius: 10px;
}
</style>
