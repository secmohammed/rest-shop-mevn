export const getters = {
    authenticated: state => state.loggedIn,
    user: state => state.user
}
export const actions = {
    register ({ commit }, credentials) {
        return this.$api.user().register(credentials)
    },
    resetPassword(context, payload) {
       return this.$api.user().resetPassword(payload.token, payload.form)
    },
    forgotPassword(context, form) {
        return this.$api.user().forgotPassword(form)
    }
}
