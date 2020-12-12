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
      max-height="650"
    >
      <el-table-column type="index" label="N°" width="65" fixed>
      </el-table-column>

      <el-table-column prop="fullname" label="Name" width="150" sortable fixed>
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="currentPrice"
                      label="Current Price"
                      width="150"
                      sortable
    >
      </el-table-column>
      <el-table-column prop="openingPrice"
                       label="Opening Price"
                       width="150"
                       sortable
      >
      </el-table-column>
      <el-table-column prop="lowestPrice"
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
      <!-- <el-table-column v-if="this.isAdmin"
                       fixed="right"
                       label="Operation"
                       width="110"
      >
        <template slot-scope="scope">
          <el-button type="danger"
                    icon="el-icon-delete"
                    size="small"
                    @click.prevent="deleteCrypto(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column> -->
      <!-- ajouter méthode add -->
      <el-table-column v-if="this.isUser" 
                       fixed="right" 
                       label="Operation" 
                       width="120">
        <!-- @click="handleDelete()" -->
        <template slot-scope="scope">
          <el-button
            type="warning"
            plain
            icon="el-icon-scissors"
            size="small"
            @click.prevent="removeCryptosFromFav(scope.$index, scope.row)"
            >Remove</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- <el-dialog
      title="Delete confirmation"
      :visible.sync="showDeleteModale"
      width="45%"
    >
      <p>This currency will be remove from your database!</p>
      <p><strong>Crypto Name</strong></p>
      <p>Are you sure?</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDeleteModale = false">Annuler</el-button>
        <el-button type="primary" @click="deleteCrypto()">Confirmer</el-button>
      </span>
    </el-dialog> -->
  </el-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CryptoFavorites",
  data() {
    return {
      showDeleteModale: false,
      cryptoArray: []
    };
  },
  computed: {
    ...mapState({
      isAdmin: "isAdmin",
      userId: "userId",
      isUser: "isUser"
    })
  },
  methods: {
    // Supprimer cryptos des favoris
    async removeCryptosFromFav(index, rows) {
      console.log(index);
      console.log(rows.code);
      const cryptoId = rows.code;
      const userId = this.$store.state.userId;
      try {
        // passer le code de la crypto pour supprimer
        // '/cryptos/:code/:userid'
        await this.$axios.delete(`/cryptos?code=${cryptoId}?cmid=${userId}`).then(response => {
          console.log(response);
          // checker si suppresssion okay renvoyer alert succés
          if (response.status == 200) {
            alert("Suppression okay");
            // faire en sorte de recharger le tableau
            // this.getCrypto();
          } else {
            alert(response.data.message);
          }
        });
      } catch (e) {
        console.log(e);
      }
    },
    // Récupére les cryptos fav du user au chargement
    async getFavoriteCryptos() {
      const id = this.$store.state.userId;
      try {
        await this.$axios.get(`/cryptos?userid=${id}`).then(response => {
          console.log(response);
          if (response.status == 200) {
            console.log('response ok 200');
          } else {
            alert(response.data.message);
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
    this.getFavoriteCryptos();
  }
};
</script>
