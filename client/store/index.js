export const actions = {
    nuxtServerInit: async({
        dispatch
    }, context) => {
        return Promise.all([
            dispatch('product/nuxtServerInit', context),
        ]);

    }

}
