<template>
  <div id="home">
    <el-container>
      <el-main>
        <CryptoGraphs />
        <CryptoTable />
      </el-main>
    </el-container>
  </div>
</template>
<script>
import CryptoGraphs from '../components/cryptoGraphCard/CryptoGraphs.vue';
import CryptoTable from "../components/CryptoTable";

export default {
  components: {
    CryptoTable,
    CryptoGraphs,
  },
};
</script>
<style>
.el-header,
.el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  /* line-height: 160px; */
}

body > .el-container {
  margin-bottom: 40px;
}
</style>