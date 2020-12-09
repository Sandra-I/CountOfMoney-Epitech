export const state = () => ({
  isloggedState: false,
  isAdmin: false,
  username: ''
})

export const getters = () => ({
  getLoggedInUser() {
    return this.state.isloggedState
  }
})

export const mutations = {
  isloggedInTrue() {
    this.state.isloggedState = true;
  },
  isloggedInFalse() {
    this.state.isloggedState = false;
  },
  setUsername(payload) {
    this.state.username = payload;
  }
}

export const actions = {
  logOut() {
    this.$auth.logout();
  }
}