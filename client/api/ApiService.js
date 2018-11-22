import UserService from './UserService'
import ProductService from './ProductService'
export default class ApiService {

    constructor ($axios) {
        this.$axios = $axios
    }
    user () {
        return new UserService(this.$axios)
    }
    product () {
        return new ProductService(this.$axios)
    }
}
