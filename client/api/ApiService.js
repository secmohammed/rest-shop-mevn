import UserService from './UserService'
export default class ApiService {

    constructor ($axios) {
        this.$axios = $axios
    }
    user () {
        return new UserService(this.$axios)
    }
}
