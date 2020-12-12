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
      <el-table-column v-if="this.isAdmin"
                       fixed="right"
                       label="Operation"
                       width="110"
      >
        <!-- @click="handleDelete()" -->
        <template slot-scope="scope">
          <el-button type="danger"
                    icon="el-icon-delete"
                    size="small"
                    @click.prevent="deleteCrypto(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
      <!-- ajouter méthode add -->
      <el-table-column v-if="this.isUser" 
                       fixed="right" 
                       label="Operation" 
                       width="100">
        <!-- @click="handleDelete()" -->
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-delete"
            size="small"
            @click.prevent="addCrypto(scope.$index, scope.row)"
            >Add</el-button
          >
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
        <!-- <el-button type="primary" @click="deleteCrypto()">Confirmer</el-button> -->
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
    handleDelete(index, code) {
      this.openModale();
      console.log("test", index);
    },
    closeModale() {
      this.showDeleteModale = false;
    },
    openModale() {
      this.showDeleteModale = true;
    },
    async deleteCrypto(index, rows) {
      console.log(index);
      console.log(rows.code);
      const cryptoId = rows.code;
      try {
        // passer le code de la crypto pour supprimer
        await this.$axios.delete(`/cryptos?cmid=${cryptoId}`).then(response => {
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
    deleteRow(index, rows) {
      console.log(index);
      console.log(rows.code);
      // rows.splice(index, 1);
    },
    async getCrypto() {
      const id = this.$store.state.userId;
      //const currency2 = Object.assign(this.$store.state.usercurrency2);
      const currency = this.$store.state.usercurrency;
      //console.log(currency);
      try {
        await this.$axios.get(`/cryptos?userid=${id}`).then(response => {
          //console.log(response);
          if (response.status == 200) {
            //console.log(response.data.DISPLAY["365"].EUR);
            //console.log(response.data.DISPLAY["365"]);
            // array of the crypto object ni our DB
            const cryptoArrayofObject = response.data.DISPLAY;
            // array of the crypto CODE available in our DB
            const arrayCode = Object.keys(response.data.DISPLAY);
            //console.log(arrayCode);

            // boucle to get the crypto infos using he array of the code
            for (let i = 0; i < arrayCode.length; i++) {
              const code = arrayCode[i];
              //console.log(code);

              // informations nécessaires pour le tableau
              // const pieceImageurl = cryptoArrayofObject[code].currency.IMAGEURL;
              // const baseUrlImage = "https://www.cryptocompare.com";
              // const image = baseUrlImage + pieceImageurl;
              // const fullname = cryptoArrayofObject[code].currency.MARKET;
              // const currentPrice = cryptoArrayofObject[code].currency.PRICE;
              // const openingPrice = cryptoArrayofObject[code].currency.OPENDAY;
              // const lowestPrice = cryptoArrayofObject[code].currency.LOWDAY;
              // const highestPrice = cryptoArrayofObject[code].currency.HIGHDAY;

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
    async addCrypto(index, rows) {
      console.log("add crypto");
      const userid = this.$store.state.userId;
      const cryptoCodeToAdd = rows.code;
      console.log('user id ', userid);
      console.log('code crypto ', cryptoCodeToAdd);
      try {
        console.log('try in');
      
        await this.$axios.post(`/cryptos/${userid}`, {code: cryptoCodeToAdd}).then(response => {
          console.log('in response cryptoCodeToAdd =', cryptoCodeToAdd);
          console.log(response);

          // if (response.status == 200) {
          //   console.log('response okay in');

          // }
        }
        )
      } catch {

      }
    }
  },
  mounted() {
    this.getCrypto();
  }
};
</script>
