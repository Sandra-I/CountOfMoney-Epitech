export const state = () => ({
  isloggedState: false,
  isAdmin: false,
  username: 'No name',
  useremail: ''
})

export const getters = () => ({
  getLoggedInUser() {
    return this.state.isloggedState;
  },
  getUsername() {
    return this.state.username;
  }
})

export const mutations = {
  isloggedInTrue() {
    this.state.isloggedState = true;
  },
  isloggedInFalse() {
    this.state.isloggedState = false;
  },
  isAdminInTrue() {
    this.state.isAdmin = true;
  },
  isAdminInFalse() {
    this.state.isAdmin = false;
  },
  setUsername(payload) {
    this.state.username = payload;
  },
  setUseremail(payload) {
    this.state.useremail = payload;
  }
}

export const actions = {
  logOut() {
    this.$auth.logout();
  }
}