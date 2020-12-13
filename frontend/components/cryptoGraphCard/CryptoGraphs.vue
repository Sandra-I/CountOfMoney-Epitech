<template>
  <div>
    <el-row style="padding-bottom: 20px;" type="flex" justify="center">
      <!-- <el-col :span="6" v-for="(o, index) in 3" :key="o" offset="index > 0 ? 3 : 0"> -->
      <el-col
        :span="7"
        v-for="o in 4"
        :key="o"
      >
        <crypto-graph-card></crypto-graph-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CryptoGraphCard from "./components/CryptoGraphCard.vue";
export default {
  components: { CryptoGraphCard },
};
</script>