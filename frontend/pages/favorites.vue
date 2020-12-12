<template>
  <el-container>
    <el-header height="120px">
      <h1>My Favorites Cryptos</h1>
      <p>Here all the information about your favorites C!</p>
    </el-header>
    <el-main>
      <el-header>
        <el-row class="d-flex">
          <el-col :span="12" class="d-flex pt-2">
            <h2>My Cryptocurrencies</h2>
          </el-col>
        </el-row>
      </el-header>
      <crypto-table></crypto-table>
    </el-main>
  </el-container>
</template>

<script>
import AddCryptoCurrency from "@/components/AddCryptoCurrency.vue";
import CryptoTable from "@/components/CryptoTable.vue";
import CryptoFavorites from '@/components/CryptoFavorites';

export default {
  //middleware: 'auth',
  components: { 
    CryptoTable, 
    AddCryptoCurrency,
    CryptoFavorites 
  },
  data() {
    return {
      
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("Do you really want to add this currency?")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>
