<template>
  <el-card
    class="grid-content bg-purple-light"
    shadow="never"
    type="flex"
    justify="center"
  >
    <h2 slot="header">Update Profile</h2>
    <el-form
      label-position="top"
      label-width="100px"
      v-model="userInfo"
      ref="userInfo"
      status-icon
    >
      <label for="username">Username</label>
      <el-form-item
        id="username"
        placeholder="Enter your username"
      >
        <el-input v-model="username"></el-input>
      </el-form-item>
      <label for="email">Email</label>
      <el-form-item
        id="email"
        placeholder="Enter your email"
      >
        <el-input type="email" v-model="useremail"></el-input>
      </el-form-item>
      <div class="d-flex justify-content-end">
        <el-button @click="updateProfile(userInfo)">Update</el-button>
      </div>
    </el-form>

    <div class="d-flex flex-column">
      <p>Default currency</p>
      <div class="d-flex flex-row">
        <el-radio
          v-model="usercurrency"
          label="EUR"
          border
          size="medium"
        ></el-radio>
        <el-radio
          v-model="usercurrency"
          label="USD"
          border
          size="medium"
        ></el-radio>
        <el-radio
          v-model="usercurrency"
          label="BTC"
          border
          size="medium"
        ></el-radio>
      </div>
    </div>
  </el-card>
</template>

<script>
import UserAuthForm from "@/components/login/UserAuthForm.vue";
import { mapState } from "vuex";

export default {
  components: {
    UserAuthForm
  },
  data() {
    return {
      userInfo: {
        name: "",
        email: ""
      }
    };
  },
  computed: {
    ...mapState({
      isloggedState: "isloggedState",
      usercurrency: "usercurrency",
      userId: "userId"
    }),
    username: {
      get () {
        return this.$store.state.username
      },
      set (value) {
        this.$store.commit('setUsername', value)
      }
    },
    useremail: {
      get () {
        return this.$store.state.useremail
      },
      set (value) {
        this.$store.commit('setUseremail', value)
      }
    }
  },
  methods: {
    async getProfile() {
      const id = this.userId;
      try {
        await this.$axios.get(`/users/profile/${id}`).then(response => {
          if (response.status == 200) {
            alert("Well connected");
          } else {
            alert(response.data.message);
          }
        });
      } catch (e) {
        console.log(e);
      }
    },
    async updateProfile() {
      const id = this.userId;
      try {
        await this.$axios
          .put(`/users/profile/${id}`, {
            username: this.username,
            email: this.useremail
          })
          .then(response => {
            console.log(response.data);
            if (response.status == 200) {
              alert("Update Information well done!");
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
    this.getProfile();
  }
};
</script>

<style scoped></style>
