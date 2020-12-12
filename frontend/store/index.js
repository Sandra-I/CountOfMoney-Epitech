export const state = () => ({
  isloggedState: false,
  isAdmin: false,
  isUser: false,
  username: 'No name',
  useremail: '',
  userId: null,
  usercurrency: 'EUR',
  usercrypto: null,
  userarticle: null
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
  setUsername(currentState, payload) {
    currentState.username = payload;
  },
  setUserId(currentState, payload) {
    currentState.userId = payload;
  },
  setUseremail(currentState, payload) {
    currentState.useremail = payload;
  },
  setUsercurrency(currentState, payload) {
    currentState.usercurrency = payload;
  }
}

export const actions = {
  logOut() {
    this.$auth.logout();
  }
}