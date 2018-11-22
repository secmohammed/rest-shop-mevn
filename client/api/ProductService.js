export default class UserService {
    constructor (ctx) {
        this.$axios = ctx.$axios
        this.endpoints = {
            index : '/products',
            show: '/products/',
            update: '/products/',
            delete: '/products/',
            store: '/products'
        }
    }
    async store (product) {
        return this.$axios.$post(this.endpoints.store, product)
    }
    async index () {
        return this.$axios.$get(this.endpoints.index)
    }
    async show (productId) {
        return this.$axios.$get(this.endpoints.show + productId)
    }
    async update (productId, data) {
        return this.$axios.$put(this.endpoints.update + productId , data)
    }
    async delete (productId) {
        return this.$axios.$delete(this.endpoints.delete + productId)
    }
}
