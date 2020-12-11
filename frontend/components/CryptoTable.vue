<template>
  <el-card style="margin-bottom: 20px;">
    <!-- Utiliser attribut height dans el-table pour avoir un header fixe -->
    <el-table
      :data="cryptoArray"
      ref="testref"
      :default-sort="{ prop: 'id', order: 'descending' }"
      stripe
      border
      align="center"
      style="width: 100%"
    >
      <el-table-column type="index" label="N°" width="65"> </el-table-column>

      <el-table-column prop="fullname" label="Name" width="180" sortable>
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="currentPrice" label="Current Price" width="150" sortable>
      </el-table-column>
      <el-table-column prop="openingPrice" label="Opening Price" width="150" sortable>
      </el-table-column>
      <el-table-column prop="lowestPrice" label="Lowest Price" width="150" sortable>
      </el-table-column>
      <el-table-column prop="highestPrice" label="Highest Price" width="150" sortable>
      </el-table-column>
      <el-table-column v-if="this.isAdmin">
        <el-button
          type="danger"
          icon="el-icon-delete"
          @click="handleDelete()"
          >Delete</el-button
        >
      </el-table-column>
    </el-table>

    <el-dialog
        title="Delete confirmation"
        :visible.sync="showDeleteModale"
        width="30%"
      >
        <p>This currency will be remove from your database!</p>
        <p><strong>Crypto Name</strong></p>
        <p>Are you sure?</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showDeleteModale = false">Annuler</el-button>
          <!-- Ajouter méthode pour supprimer + emit -->
          <el-button type="primary">Confirmer</el-button>
        </span>
      </el-dialog>
  </el-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CryptoTable",
  data() {
    return {
      showDeleteModale: false,
      cryptoArray: [
        {
          image: '',
          fullname: '',
          currentPrice: '',
          openingPrice: '',
          lowestPrice: '',
          highestPrice: ''
        }
      ]
    };
  },
  computed: {
    ...mapState({
      isAdmin: 'isAdmin'
    })
  },
  methods: {
    handleDelete() {
      console.log(this.$refs.testref.data[0]);
    }
  },
  mounted() {
  }
};
</script>
