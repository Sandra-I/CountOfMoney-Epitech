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
      max-height="250">

      <el-table-column type="index" label="N°" width="65" fixed> </el-table-column>

      <el-table-column prop="fullname" label="Name" width="150" sortable fixed>
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.fullname }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="currentPrice"
        label="Current Price"
        width="150"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="openingPrice"
        label="Opening Price"
        width="150"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="lowestPrice"
        label="Lowest Price"
        width="150"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="highestPrice"
        label="Highest Price"
        width="150"
        sortable
      >
      </el-table-column>
      <el-table-column v-if="this.isAdmin" fixed="right" label="Operation">
        <!-- @click="handleDelete()" -->
        <template slot-scope="scope">
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="small"
            @click.prevent="deleteRow(scope.$index, cryptoArray)"
            >Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="Delete confirmation"
      :visible.sync="showDeleteModale"
      width="45%"
    >
      <p>This currency will be remove from your database!</p>
      <p><strong>Crypto Name</strong></p>
      <p>Are you sure?</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDeleteModale = false">Annuler</el-button>
        <!-- Ajouter méthode pour supprimer + emit -->
        <el-button type="primary" @click="deleteCrypto">Confirmer</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'CryptoTable',
  data() {
    return {
      showDeleteModale: false,
      cryptoArray: [
        {
          image: '',
          fullname: 'BTC',
          currentPrice: '',
          openingPrice: '',
          lowestPrice: '',
          highestPrice: ''
        },
        {
          image: '',
          fullname: 'ETC',
          currentPrice: '',
          openingPrice: '',
          lowestPrice: '',
          highestPrice: ''
        },
        {
          image: '',
          fullname: 'FFF',
          currentPrice: '',
          openingPrice: '',
          lowestPrice: '',
          highestPrice: ''
        },
        {
          image: '',
          fullname: 'TTT',
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
      isAdmin: "isAdmin"
    })
  },
  methods: {
    handleDelete() {
      this.openModale();
      console.log(this.$refs.testref);
    },
    closeModale() {
      this.showDeleteModale = false;
    },
    openModale() {
      this.showDeleteModale = true;
    },
    async deleteCrypto() {
      alert('delete click');
      const cryptoId = 0;
      await this.$axios.delete('/cryptos/:cmid').then(response => {
        // checker si suppresssionokay renvoyer alert succés
        console.log(response);
      });
    },
    deleteRow(index, rows) {
      console.log(index)
      rows.splice(index, 1);
    },
    async getCrypto() {
      try {
        await this.$axios.get(`/cryptos`).then(response => {
        // si user avec localstorage with preference currency send par défaut EUR géré dans le back
        // ?userID= pour checker si money indiquer
        console.log(response);
        });
      } catch(e) {
        console.log(e);
      }
    }
  },
  mounted() {
    //this.getCrypto();
  }
};
</script>
