<template lang="pug">
    .hero-body
        .container
            .columns.is-centered
                article.card.is-rounded
                    .card-content
                        h1.title
                            img(src='https://placeholdit.imgix.net/~text?txtsize=13&txt=150%C3%9750&w=150&h=50', alt='logo', width='200')
                        .field
                            p.control.has-icons-left.has-icons-right
                                input.input(type='email', v-model="email" placeholder='Email')
                                span.icon.is-small.is-left
                                    i.fas.fa-envelope
                                span.icon.is-small.is-right
                                    i.fas.fa-check
                        .field
                            p.control.has-icons-left
                                input.input(type='password', v-model="password" placeholder='Password')
                                span.icon.is-small.is-left
                                    i.fas.fa-lock
                        .field
                        b-switch(:value='true', type='is-success')
                            | Remember Me
                        button.button.is-primary.is-medium.is-fullwidth(@click="login")
                            span.icon.is-small
                                i.fa.fa-user
                            span Login

</template>
<script>
export default {
    name: 'Login',
    meta: { visitor: true, login: true },
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login() {
            const This = this
            this.$store
                .dispatch('signIn', {
                    email: this.email,
                    password: this.password
                })
                .then(() => This.$router.push('/Dashboard'))
                .catch(e => {
                    console.log(e)
                })
        }
    }
}
</script>
