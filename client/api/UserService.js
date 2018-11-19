export default class UserService {
    constructor (ctx) {
        this.$axios = ctx.$axios
        this.endpoints = {
            register : 'auth/register',
            forgotPassword: 'auth/forgot-password',
            resetPassword: 'auth/reset-password?token='
        }
    }
    register (credentials) {
        return this.$axios.$post(this.endpoints.register , credentials)
    }
    forgotPassword (data) {
        return this.$axios.$post(this.endpoints.forgotPassword, data)
    }
    resetPassword (token,data) {
        return this.$axios.$post(this.endpoints.resetPassword + token , data)
    }
}
