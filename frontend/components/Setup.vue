<template>
  <el-card
    class="grid-content bg-purple-light"
    shadow="never"
    type="flex"
    justify="center"
  >
    <h3>{{ getStr() }}</h3>
  </el-card>
</template>

<script>

export default {
  name: "Setup",
  data() {
    return {
      str: ""
    }
  },
  methods: {
    getStr() {
      return this.str
    }
  },
  mounted() {
    try {
      this.$axios.get('/api/users/setup').then((response) => {
            if (response.status === 404) {
              this.str = "Nope"
            } else {
              this.str = response.data.message
            }
          }
      );
    } catch (e) {
      // this.error = e.response.data.message
      console.log(e);
    }
  }
};
</script>

<style scoped>

</style>
