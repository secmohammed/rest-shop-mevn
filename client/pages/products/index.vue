<template>
   <p>{{ products }}</p>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        computed: {
            ...mapGetters('product',['products'])
        }
    };
</script>
