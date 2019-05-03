<template lang="pug">
div

  b-button Button
  b-button(class="btn-danger") Button
  b-button(class="success") Button
  b-button(class="outline-primary") Button

    //nav.navbar(role='navigation', aria-label='main navigation')
      .navbar-brand
        router-link.navbar-item(to='/' tag="a")
          img(src='https://bulma.io/images/bulma-logo.png', width='112', height='28')
        a.navbar.navbar-burger(role='button',:class="navBurgerActive?'is-active':''", aria-label='menu', aria-expanded='true', data-target='navbarBasicExample', @click='burgerToggle')
          span(aria-hidden='true')
          span(aria-hidden='true')
          span(aria-hidden='true')
      #navbarBasicExample.navbar-menu(:class="navBurgerActive ? 'is-active':''")
        //.navbar-start
          a.navbar-item Home
          //a.navbar-item Documentation
          //.navbar-item.has-dropdown.is-hoverable
            a.navbar-link More
            .navbar-dropdown
              a.navbar-item About
              a.navbar-item Jobs
              a.navbar-item Contact
              hr.navbar-divider
              a.navbar-item Report an issue
        .navbar-end
          .navbar-item(v-if="!LoginPage")
            .buttons
              button.button.is-danger(v-if="IsLogged" @click="getLogOut")
                strong Log Out
              router-link.button.is-primary(v-if="!IsLogged" :to="{ name:'Login'}" tag="button")
                strong Log in
    //br
    //.container(v-if="!IsLogged")
      nuxt 
    //.container(v-if="IsLogged")
      .columns
        aside.column.is-2.is-hidden-mobile 
          nav.menu#navbarBasicExampled
            p.menu-label
              | General
            ul.menu-list
              li
                router-link(v-if="!isActive('Dashboard')" to="/Dashboard" tag="a") Dashboard
                a(v-else :class="isActive('Dashboard')?'is-active':''") Dashboard
              li
                router-link(v-if="!isActive('Channels')" to="/Channels")  Channels
                a(v-else :class="isActive('Channels')?'is-active':''")  Channels
            //p.menu-label
              | Administration
            //ul.menu-list
              li
                a Team Settings
              li
                a Manage Your Team
                ul
                  li
                    a Members
                  li
                    a Plugins
                  li
                    a Add a member
              li
                a Invitations
              li
                a Cloud Storage Environment Settings
              li
                a Authentication
            //p.menu-label
              | Transactions
            //ul.menu-list
              li
                a Payments
              li
                a Transfers
              li
                a Balance
        nuxt.column.is-10
</template>

<script>
export default {
    meta: { home: '', visitor: '' },

    data() {
        return {
            navBurgerActive: false
        }
    },
    computed: {
        IsLogged() {
            return this.$store.state.Auth
        },
        LoginPage() {
            return this.$route.name === 'Login'
        },
        PageName() {
            return this.$route.name
        }
    },
    created() {},
    methods: {
        burgerToggle() {
            this.navBurgerActive = !this.navBurgerActive
        },
        getLogOut() {
            const This = this
            this.$store.dispatch('signOut').then(This.$router.push('/'))
            console.log('loging Out')
        },
        isActive(val) {
            return val === this.$route.name
        }
    }
}
</script>
