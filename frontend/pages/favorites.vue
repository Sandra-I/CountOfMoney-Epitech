<template>
  <el-container>
    <el-header height="120px" class="d-flex flex-column pt-2">
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
      <CryptoFavorites />
    </el-main>
  </el-container>
</template>

<script>
import CryptoFavorites from '@/components/CryptoFavorites';

export default {
  components: { 
    CryptoFavorites 
  }
};
</script>
