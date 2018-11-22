export const state = () => ({
    products: [],
    showingProduct: null
})
export const getters = {
    products: state => state.products,
    product: state => state.showingProduct
}
export const mutations = {
    SET_PRODUCTS (state, products) {
        state.products = products
    },
    SET_PRODUCT (state, product) {
        state.showingProduct = product
    },
    PUSH_PRODUCTS (state, products) {
        state.products.push(products)
    },
    UNSET_PRODUCT (state, product) {
        state.products = state.products.filter(p => p._id != product.id)
    }
}
export const actions = {
    async nuxtServerInit({
        dispatch
    }) {
        return await dispatch('index')
    },
    async index ({ commit }) {
        let products =  await this.$api.product().index()
        if (products.length) {
            commit('SET_PRODUCTS', products)
        }
        return products
    },
    async update({ commit }, payload) {
        let form = new FormData()
        for (let input in payload.form) {
            if (input == 'avatar' && typeof current[input] == 'object') {
                form.append(input, current[input], current[input].name)
            }
            if (input != 'avatar') {
                form.append(input, current[input])
            }
        }
       let updatingProduct = await this.$api.product().update(payload._id, form)
       commit('UNSET_PRODUCT',payload.form._id)
       commit('PUSH_PRODUCTS', updatingProduct)
    },
    async show ({ commit } , productId) {
        let product = await this.$api.product().show(productId)
        commit('PUSH_PRODUCTS', product)
    },
    async delete ({ commit }, productId) {
        let product = await this.$api.product().delete(productId)
        commit('UNSET_PRODUCT', product)
    }
}
