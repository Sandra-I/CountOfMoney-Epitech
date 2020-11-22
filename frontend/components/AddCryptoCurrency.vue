<template>
  <el-dialog
    modal-append-to-body
    title="Tips"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <span>Ceci est un message</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">Annuler</el-button>
      <el-button type="primary" @click="dialogVisible = false"
        >Confirmer</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: AddCryptoCurrency,
  data() {
    return {
      dialogVisible: false
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("Voulez-vous vraiment quitter ?")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>
