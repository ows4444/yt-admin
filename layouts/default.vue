<template lang="pug">
  section.container
    nav.navbar(role='navigation', aria-label='main navigation')
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
          .navbar-item
            .buttons
              a.button.is-primary
                strong Sign up
              router-link.button.is-light(:to="{ name:'Login'}" tag="a") Log in

    nuxt
</template>

<script>
export default {
    meta: { home: '', visitor: '' },
    data() {
        return {
            navBurgerActive: false
        }
    },
    methods: {
        burgerToggle() {
            this.navBurgerActive = !this.navBurgerActive
        }
    }
}
</script>
