<template>
  <div>
    <el-button type="default" icon="el-icon-plus" @click="openModale"
      >ADD CRYPTO</el-button
    >

    <el-dialog
      append-to-body
      title="Add a new cryptocurrencie"
      width="70%"
      :visible.sync="showModale"
    >
      <el-form>
        <el-form-item label="Crypto" :label-width="formLabelWidth">
          <el-select v-model="value" filterable autocomplete="on" placeholder="Choose a crypto currency">
            <!-- Add crypto image to show -->
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <el-card class="box-card" v-if="value">
        <div slot="header" class="clearfix">
          <span>Crypto Details</span>
        </div>
        <ul>
          <li>
            <span>Code:</span>
            <span>{{ value }}</span>
          </li>
          <li>
            <span>Name:</span>
            <span></span>
          </li>
          <li>
            <span>Image:</span>
            <span>
              <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
            </span>
          </li>
        </ul>
      </el-card>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeModale">CANCEL</el-button>
        <!-- @click="" méthode pour valider ajout crypto -->
        <el-button type="primary">ADD</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AddCryptoCurrency",
  data() {
    return {
      showModale: false,
      options: [
        {
          value: "Option1",
          label: "Option1"
        },
        {
          value: "Coucou",
          label: "Coucou"
        },
        {
          value: "Option3",
          label: "Option3"
        },
        {
          value: "Option4",
          label: "Option4"
        },
        {
          value: "Zozo",
          label: "Zozo"
        }
      ],
      value: "",
      formLabelWidth: "120px"
    };
  },
  methods: {
    openModale() {
      return (this.showModale = true);
    },
    closeModale() {
      this.value = "";
      return (this.showModale = false);
    }
  }
};
</script>

<style scoped>
  .image {
    width: 100%;
    display: block;
  }
</style>
