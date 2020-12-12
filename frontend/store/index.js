export const state = () => ({
  isloggedState: false,
  isAdmin: false,
  isUser: false,
  userId: null,
  username: '',
  useremail: '',
  usercurrency: 'EUR',
  //usercurrency2: { money: 'EUR'},
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
  isUserInTrue() {
    this.state.isUser = true;
  },
  isUserInFalse() {
    this.state.isUser = false;
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
  },
  stateInitialization() {
    this.state.userId = null;
    this.state.username = '';
    this.state.useremail = '';
    this.state.username = '';
    this.state.username = '';
    this.usercurrency = 'EUR';
    this.usercrypto = null;
    this.userarticle = null;
  }
}

export const actions = {
  logOut() {
    this.$auth.logout();
  }
}