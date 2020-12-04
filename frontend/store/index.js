export const state = () => ({
  isloggedState: false,
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
}