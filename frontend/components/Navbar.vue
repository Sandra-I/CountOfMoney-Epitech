<template>
  <div id="navbar">
    <el-row>
      <el-col :span="12">
        <div style="padding-left: 20px; height: 60px;"> 
					<el-link>
						<h1>LOGO</h1>
					</el-link>
        </div>
      </el-col>
      <el-col :span="12">
        <div style="text-align: right; padding-right: 20px;">
          <h2>
            <el-link>
              {{ butLogAccount }}
              <!-- <i class="el-icon-user"></i> -->
            </el-link>
          </h2>
        </div>
      </el-col>
    </el-row>
		<el-row type="flex" justify="center">
			<el-col :span="24" style="text-align: center;">
				<div>
					<el-menu
						default-active="1"
						class="el-menu-demo"
						mode="horizontal"
						@select="handleSelect"
						background-color="#545c64"
						text-color="#fff"
						active-text-color="#ffd04b"
					>
						<!-- <el-menu-item index="3" disabled>Info</el-menu-item> -->
						<el-menu-item index="1">Home</el-menu-item>
						<el-menu-item index="2">Cryto Currencies</el-menu-item>
						<el-menu-item index="3">Cryto News</el-menu-item>
					</el-menu>
				</div>
			</el-col>
		</el-row>

  </div>
</template>

<script>
export default {
  data() {
    return {
      butLogAccount: "Log In | Sign Up",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
	.el-menu--horizontal>.el-menu-item {
		float: none !important;
		display: inline-block;
	}
</style>