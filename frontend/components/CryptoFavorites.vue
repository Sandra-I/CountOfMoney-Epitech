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

      <el-table-column fixed="right" label="Detail" width="120">
        <template slot-scope="scope">
          <!-- Méthode à mettre dans le compo crypto favorites -->
          <el-button
            type="info"
            icon="el-icon-thumb"
            size="small"
            @click.prevent="moreCryptoDetails(scope.$index, scope.row)"
            >Details</el-button
          >
        </template>
      </el-table-column>

      <el-table-column
        v-if="this.isUser"
        fixed="right"
        label="Operation"
        width="120"
      >
        <template slot-scope="scope">
          <el-button
            type="warning"
            plain
            icon="el-icon-delete-solid"
            size="small"
            @click.prevent="removeCryptosFromFav(scope.$index, scope.row)"
            >Remove</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CryptoFavorites",
  data() {
    return {
      cryptoArray: []
    };
  },
  computed: {
    ...mapState({
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
        await this.$axios
          .delete(`/cryptos/${cryptoId}/${userId}`)
          .then(response => {
            console.log(response.data);
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
        await this.$axios.get(`/cryptos/user/${id}`).then(response => {
          console.log(response.data);
          if (response.status == 200) {
            const cryptoArrayofObject = response.data.DISPLAY;
            // array of the crypto CODE favorites
            const arrayCode = Object.keys(response.data.DISPLAY);

            // boucle to get the crypto infos using he array of the code
            for (let i = 0; i < arrayCode.length; i++) {
              const code = arrayCode[i];

              // informations nécessaires pour le tableau
              const pieceImageurl = cryptoArrayofObject[code].EUR.IMAGEURL;
              const baseUrlImage = "https://www.cryptocompare.com";
              const image = baseUrlImage + pieceImageurl;
              const fullname = cryptoArrayofObject[code].EUR.MARKET;
              const currentPrice = cryptoArrayofObject[code].EUR.PRICE;
              const openingPrice = cryptoArrayofObject[code].EUR.OPENDAY;
              const lowestPrice = cryptoArrayofObject[code].EUR.LOWDAY;
              const highestPrice = cryptoArrayofObject[code].EUR.HIGHDAY;
              const oneCrypto = {
                image,
                code,
                fullname,
                currentPrice,
                openingPrice,
                lowestPrice,
                highestPrice
              };
              // insertion of one crypto in the table
              this.cryptoArray.push(oneCrypto);
            }
          } else {
            alert(response.data.message);
          }
        });
      } catch (e) {
        console.log(e);
      }
    },
    // Voir plus de détails sur une crypto
    async moreCryptoDetails(index, rows) {
      // const cryptoId = rows.code;
      const cryptoId = "BTCD";
      this.$router.push("/cryptocurrencie");
      // try {
      //   // `/cryptos?code=${cryptoId}`
      //   await this.$axios.get(`/cryptos/${cryptoId}`).then(response => {
      //     console.log(response);
          
      //     // checker si suppresssion okay renvoyer alert succés
      //     if (response.status == 200) {
      //       console.log("response status 200");
      //       this.router.push("/cryptocurrencie");
      //     } else {
      //       alert(response.data.message);
      //     }
      //   });
      // } catch (e) {
      //   console.log(e);
      // }
    }
  },
  mounted() {
    this.getFavoriteCryptos();
  }
};
</script>
