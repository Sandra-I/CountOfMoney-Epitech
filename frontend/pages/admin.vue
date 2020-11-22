<template>
  <el-container>
    <el-header height="120px">
      <h1>Admin Settings</h1>
      <p>All the modifications will affect the entire app!</p>
    </el-header>
    <el-main>
      <el-header>
        <el-row class="d-flex">
          <el-col :span="12" class="d-flex">
            <h2>Actual Cryptocurrencies</h2>
          </el-col>
          <el-col :span="12" class="d-flex justify-content-end">
            <AddCryptoCurrency />
          </el-col>
        </el-row>
      </el-header>
      <!-- ajouter confirmation avant la suppression -->
      <Crypto-table />
    </el-main>
  </el-container>
</template>

<script>
import AddCryptoCurrency from '../components/AddCryptoCurrency.vue';
import CryptoTable from '../components/CryptoTable.vue';

export default {
  components: { CryptoTable, AddCryptoCurrency },
  data() {
    return {
    };
  },
  methods: {
    // voir si nécessaire
    // handleClose(done) {
    //   this.$confirm("Do you really want to add this currency?")
    //     .then(_ => {
    //       done();
    //     })
    //     .catch(_ => {});
    // }
  }
}
</script>