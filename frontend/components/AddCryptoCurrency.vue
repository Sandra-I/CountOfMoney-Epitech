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
        <el-form ref="form" :model="form">
          <el-form-item label="Crypto" :label-width="formLabelWidth">
            <el-select
              v-model="value"
              filterable
              autocomplete="on"
              placeholder="Choose a crypto currency"
              @change="onChange($event)"
            >
              <!-- filtrable se fait sur le label -->
              <el-option
                v-for="crypto in info"
                :key="crypto.code"
                :label="crypto.fullname"
                :value="crypto.code"
              >
                <span style="float: left">{{ crypto.fullname }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{
                  crypto.code
                }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <template v-if="value">
            <el-form-item label="Code">
              <el-input v-model="showOneCrypto.code" disabled></el-input>
            </el-form-item>
            <el-form-item label="Fullname">
              <el-input v-model="showOneCrypto.fullname" disabled></el-input>
            </el-form-item>
            <el-form-item label="Image">
              <el-image
                style="width: 100px; height: 100px"
                :src="showOneCrypto.imageurl"
              ></el-image>
            </el-form-item>
          </template>
        </el-form>

        <!-- <el-card class="box-card" v-if="value">
          <div slot="header" class="clearfix">
            <span>Crypto Details</span>
          </div>
          <ul>
            <li>
              <span>Code:</span>
              <span>{{ showOneCrypto.code }}</span>
            </li>
            <li>
              <span>Name:</span>
              <span>{{ showOneCrypto.fullname }}</span>
            </li>
            <li>
              <span>Image:</span>
              <span>
                <img src="" class="image" />
              </span>
            </li>
          </ul>
        </el-card> -->
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeModale">CANCEL</el-button>
        <el-button type="primary" @click="addCrypto(showOneCrypto)">ADD</el-button>
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
      options: {
        code: "",
        name: "",
        image: ""
      },
      value: "",
      info: [],
      cryptoFullArray: [],
      formLabelWidth: "120px",
      form: {
        code: "",
        name: "",
        image: ""
      },
      baseUrl: "",
      showOneCrypto: []
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
        await this.$axios.get("/cryptos/all").then(response => {
          if (response.status == 200) {
            const baseUrlImage = response.data.BaseImageUrl;
            this.baseUrl = baseUrlImage;
            // const message = response.data.Message;

            const cryptoArrayofObject = response.data.Data;
            this.cryptoFullArray = cryptoArrayofObject;

            const cryptoCode = Object.keys(cryptoArrayofObject);

            // i < cryptoCode.length
            for (let i = 0; i < 15; i++) {
              const element = cryptoCode[i];
              const code = cryptoArrayofObject[element].Symbol;
              const fullname = cryptoArrayofObject[element].CoinName;
              const pieceImageurl = cryptoArrayofObject[element].ImageUrl;
              const theImageUrl = baseUrlImage + pieceImageurl;
              const oneCrypto = {
                code,
                fullname,
                theImageUrl
              };
              this.info.push(oneCrypto);
            }
          } else {
            alert(response.data.message);
          }
        });
      } catch (e) {
        console.log(e);
      }
    },
    async addCrypto(event) {
      console.log(event);
      // try {
      //   await this.$axios
      //     .post("/cryptos", {
      //       fullname: event.fullname,
      //       code: event.code,
      //       imageurl: event.imageurl
      //     })
      //     .then(response => {
      //       console.log(response);
      //       // Ajouter la crypto dans la BDD
      //       // if (response.status == 200) {
      //       //   this.$router.push('/home');
      //       // } else {
      //       //   alert(response.data.message);
      //       // }
      //     });
      // } catch (e) {
      //   console.log(e);
      // }
    },
    onChange(event) {
      const code = this.cryptoFullArray[event].Symbol;
      const fullname = this.cryptoFullArray[event].CoinName;
      const pieceImageurl = this.cryptoFullArray[event].ImageUrl;
      const theImageUrl = this.baseUrl + pieceImageurl;
      const oneCrypto = {
        code,
        fullname,
        theImageUrl
      };
      this.showOneCrypto = oneCrypto;
    }
  },
  mounted() {
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
