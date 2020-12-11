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
      <div>
        <el-form>
          <el-form-item label="Crypto" :label-width="formLabelWidth">
            <el-select v-model="value" filterable autocomplete="on" placeholder="Choose a crypto currency">
              <!-- Add crypto image to show -->
              <el-option
                v-for="currency in info"
                :key="currency.Id"
                :label="currency.Name"
                :value="currency.CoinName"
                :imageurl="currency.ImageUrl"
                :testName="currency.CoinName"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- <div v-for="currency in info" :key="currency.CoinName">{{ currency.CoinName }}</div> -->

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
              <span>{{ testName }}</span>
            </li>
            <li>
              <span>Image:</span>
              <span>
                <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
              </span>
            </li>
          </ul>
        </el-card>
      </div>

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
          value: '',
          label: '',
          imageurl: ''
        }
      ],
      value: '',
      testName: '',
      formLabelWidth: "120px",
      arrayTest: [],
      info: null
    };
  },
  methods: {
    openModale() {
      return (this.showModale = true);
    },
    closeModale() {
      this.value = "";
      return (this.showModale = false);
    },
    async getAllCrypto() {
      try {
        await this.$axios
          .get('/cryptos/all')
          .then(response => {
            if (response.status == 200) {
              
              const arrayCrypto = response.data.Data;
              //console.log(response.data.Data);
              const data1 = [];
              const data2 = [];
              // console.log(response.data.Data.toString(42).CoinName);
              for (const data in arrayCrypto) {
                data1.push(data);
              }
              //console.log(data2.length);

              // let h = '.'+data1[10];
              // let o = response.data.Data+h;
              // console.log(o);
              // console.log('length data1 ' + data1.length);

              for (let i=0; i<data1.length; i++) {
                data2.push(arraCrypto.data1[i]);
              }
              //console.log(data2);
              //this.cryptoArray.fullname = response.data.fullname;
              //return this.cryptoArray = response.data;
            } else {
              alert(response.data.message);
            }
          });
      } catch (e) {
        console.log(e);
      }
    },
    async addCrypto() {
      try {
        await this.$axios.post('http://127.0.0.1:3000/cryptos', 
          {
            fullname: crypto.fullname,
            code: crypto.code,
            imageUrl: crypto.imageurl
          }
        ).then(
          (response) => {
            console.log(response);
            // Ajouter la crypto dans la BDD
            // if (response.status == 200) {
            //   this.$router.push('/home');
            // } else {
            //   alert(response.data.message);
            // }
          }
        );
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted () {
    this.getAllCrypto();
  }
};
</script>

<style scoped>
  .image {
    width: 100%;
    display: block;
  }
</style>
