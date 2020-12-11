<template>
  <div class="d-flex flex-column justify-content-center">
    <el-col :span="18">
      <el-card class="d-flex flex-column p-2 mb-5" shadow="never">
        <h2 slot="header">Update Profile</h2>

        <div class="d-flex flex-column mb-3">
          <label for="username">Username</label>
          <el-input
            id="username"
            placeholder="Enter your username"
            v-model="username"
          ></el-input>
        </div>
        <div class="d-flex flex-column mb-3">
          <label for="email">Email</label>
          <el-input
            id="email"
            placeholder="Enter your email"
            v-model="email"
          ></el-input>
        </div>
        <div class="d-flex flex-row">
          <div class="d-flex flex-column mb-3 pr-5">
            <label for="password">Password</label>
            <el-input
              id="password"
              placeholder="Enter your new password"
              v-model="input"
              show-password
              minlength="8"
            ></el-input>
          </div>
          <div class="d-flex flex-column mb-3">
            <label for="password2">Password</label>
            <el-input
              id="password2"
              placeholder="Re enter your new password"
              v-model="password2"
              show-password
              minlength="8"
            ></el-input>
          </div>
        </div>
        <div class="d-flex justify-content-end">
          <el-button>Update</el-button>
        </div>
      </el-card>
    </el-col>
    <el-col :span="18">
      <el-card class="d-flex flex-column p-2 mb-5" shadow="never">
        <h2 slot="header">Your settings</h2>

        <div class="d-flex flex-column">
          <p>Default currency</p>
          <div class="d-flex flex-row">
            <el-radio v-model="currency" label="eur" border size="medium"
              >EURO</el-radio
            >
            <el-radio v-model="currency" label="dol" border size="medium"
              >DOLLAR</el-radio
            >
          </div>
        </div>
        <el-divider></el-divider>
        <div class="d-flex flex-column">
          <p>Favorite crypto currencies</p>
          <div>
            <el-transfer
              filterable
              filter-placeholder="Crypto List"
              :titles="['Source', 'Your list']"
              v-model="value"
              :data="data"
            >
            </el-transfer>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="d-flex flex-column">
          <p>Press Keywords</p>
          <div class="d-flex flex-row">
            Mettre quelque chose
          </div>
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
export default {
  // data [] attendue pour le transfer : array[{ key, label, disabled }]
  data() {
    // Test pour le transfer
    const generateData = _ => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `Option ${i}`,
          disabled: i % 4 === 0
        });
      }
      return data;
    };
    return {
      username: "",
      email: "",
      password: "",
      password2: "",
      currency: "eur",
      //
      data: generateData(),
      value: [1, 4]
    };
  }
};
</script>

<style scoped></style>