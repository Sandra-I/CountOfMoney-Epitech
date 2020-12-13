<template>
  <el-card style="margin-bottom: 20px;">
    <h3 slot="header">{{ tableTitle }}</h3>
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
      <el-table-column
        v-if="this.isAdmin"
        fixed="right"
        label="Operation"
        width="110"
      >
        <template slot-scope="scope">
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="small"
            @click.prevent="deleteCryptoToDatabase(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
      <template v-if="this.isUser">
        <el-table-column fixed="right"
                         label="Add"
                         width="100"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-star-on"
              size="small"
              @click.prevent="addCryptoToFavorites(scope.$index, scope.row)"
              >Add</el-button
            >
          </template>
        </el-table-column>
      </template>
    </el-table>
  </el-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CryptoTable",
  data() {
    return {
      showDeleteModale: false,
      cryptoArray: []
    };
  },
  props: {
    tableTitle: {
      type: String,
      default: "Crypto Infos"
    }
  },
  computed: {
    ...mapState({
      isAdmin: "isAdmin",
      userId: "userId",
      isUser: "isUser"
    })
  },
  methods: {
    closeModale() {
      this.showDeleteModale = false;
    },
    openModale() {
      this.showDeleteModale = true;
    },
    async deleteCryptoToDatabase(index, rows) {
      const cryptoId = rows.code;
      try {
        // passer le code de la crypto pour supprimer
        await this.$axios.delete(`/api/cryptos/${cryptoId}`).then(response => {
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
    async getCrypto() {
      const id = this.$store.state.userId;
      try {
        await this.$axios.get(`/api/cryptos?userid=${id}`).then(response => {
          if (response.status == 200) {
            // array of the crypto object ni our DB
            const cryptoArrayofObject = response.data.DISPLAY;
            // array of the crypto CODE available in our DB
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
    async addCryptoToFavorites(index, rows) {
      const userid = this.$store.state.userId;
      const cryptoCodeToAdd = rows.code;
      try {
        await this.$axios
          .post(`/api/cryptos/${userid}`, { code: cryptoCodeToAdd })
          .then(response => {
            if (response.status == 200) {
              alert('Crypto well add in your favoritee !');
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
    this.getCrypto();
  }
};
</script>
