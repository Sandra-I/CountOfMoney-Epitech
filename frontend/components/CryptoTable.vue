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
      <el-table-column
        v-if="this.isAdmin"
        fixed="right"
        label="Operation"
        width="110"
      >
        <!-- @click="handleDelete()" -->
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
      console.log(index);
      console.log(rows.code);
      const cryptoId = rows.code;
      try {
        // passer le code de la crypto pour supprimer
        await this.$axios.delete(`/cryptos/${cryptoId}`).then(response => {
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
      //const currency2 = Object.assign(this.$store.state.usercurrency2);
      //const currency = this.$store.state.usercurrency;
      //console.log(currency);
      try {
        await this.$axios.get(`/cryptos?userid=${id}`).then(response => {
          if (response.status == 200) {
            //console.log(response.data.DISPLAY["365"].EUR);
            // array of the crypto object ni our DB
            const cryptoArrayofObject = response.data.DISPLAY;
            // array of the crypto CODE available in our DB
            const arrayCode = Object.keys(response.data.DISPLAY);

            // boucle to get the crypto infos using he array of the code
            for (let i = 0; i < arrayCode.length; i++) {
              const code = arrayCode[i];
              //console.log(code);

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
      console.log("add crypto");
      const userid = this.$store.state.userId;
      const cryptoCodeToAdd = rows.code;
      console.log("user id ", userid);
      console.log("code crypto ", cryptoCodeToAdd);
      try {
        console.log("try in");

        await this.$axios
          .post(`/cryptos/${userid}`, { code: cryptoCodeToAdd })
          .then(response => {
            console.log("in response cryptoCodeToAdd =", cryptoCodeToAdd);
            console.log(response);

            // if (response.status == 200) {
            //   console.log('response okay in');

            // }
          });
      } catch (e) {
        console.log(e);
      }
    },
    async moreCryptoDetails(index, rows) {
      //const cryptoId = rows.code;
      // moreCryptoDetails(index, rows)
      const cryptoId = 'BTCD';
      try {
        // passer le code de la crypto pour supprimer
        await this.$axios.get(`/cryptos/${cryptoId}`).then(response => {
          console.log(response);
          // checker si suppresssion okay renvoyer alert succés
          if (response.status == 200) {
            console.log("response status 200");

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
