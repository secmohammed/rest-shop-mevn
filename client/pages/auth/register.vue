<template>
<section class="hero">
    <div class="hero-body">
        <div class="container has-text-centered">
            <div class="column is-4 is-offset-4">
                <h1 class="title has-text-grey">Register</h1>
                <div class="box">
                        <form action="#" @submit.prevent="register">
            <div class="field">
                <label class="label">E-mail</label>
                <div class="control">
                    <input class="input is-large" name="email" v-validate.lazy="'required|min:8|email'" :class="{'is-danger' : errors.has('email')}" v-model="form.email" type="text" placeholder="E-mail address.">
                </div>
                <p class="help is-danger" v-if="errors.has('email')">{{ errors.first('email') }}</p>
            </div>
            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                    <input class="input is-large" name="password" v-validate.lazy="'required|min:8|max:32'" :class="{'is-danger' : errors.has('password')}" v-model="form.password" type="password" placeholder="Password">
                </div>
                <p class="help is-danger" v-if="errors.has('password')">{{ errors.first('password') }}</p>
            </div>
            <div class="field">
                <div class="control">
                    <button class="button is-large is-primary is-fullwidth" :disabled="errors.any() || !isCompleted" type="submit">Register</button>
                    <p class="help has-text-grey has-text-centered"><nuxt-link :to="{ name : 'auth-forgot-password'}">Forgot your password?</nuxt-link></p>
                </div>
            </div>
        </form>
                </div>
            </div>
        </div>
    </div>
</section>
</template>
<script>
    import { mapActions } from 'vuex'
    export default {
        middleware : 'guest',
        data(){
            return {
                form : {
                    email: null,
                    password: null
                }
            }
        },
        computed:{
            isCompleted(){
                if (this.form.email && this.form.password) {
                    return true
                }
                return false
            }
        },
        methods : {
            ...mapActions('auth',{
                registerAction : 'register'
            }),
            register(){
               this.registerAction(this.form)
                .then(() => window.location= '/')
                .catch(err => this.$toast.error(err.response.data.message))
            },
        }
    };
</script>
