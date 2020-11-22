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
            <el-button type="default" icon="el-icon-plus" @click="showModale = true">ADD CRYPTO</el-button>
          </el-col>
        </el-row>
      </el-header>
      <!-- ajouter confirmation avant la suppression -->
      <Crypto-table />
    </el-main>

    <!-- Modal test here // append-to-body ?!-->
    <el-dialog
      append-to-body
      title="Add a new cryptocurrencie"
      :visible.sync="showModale"
      width="70%"
    >
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeModale">CANCEL</el-button>
        <!-- @click="" méthode pour valider ajout crypto -->
        <el-button type="primary" 
          >ADD</el-button
        >
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import CryptoTable from '../components/CryptoTable.vue';

export default {
  components: { CryptoTable },
  data() {
    return {
      showModale: false
    };
  },
  methods: {
    openModale() {
      return this.showModale = true;
    },
    closeModale() {
      return this.showModale = false;
    },
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