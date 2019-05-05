export default function({ store, redirect, route }) {
    if (store.state.user != null && isLoginRoute(route)) redirect('/Dashboard')
    if (store.state.user == null && !isHomeRoute(route)) if (store.state.user == null && !isVisiterRoute(route)) redirect('/')
}
function isVisiterRoute(route) {
    const metadata = route.meta[0] || {}
    return metadata.hasOwnProperty('visitor') && metadata.visitor
}
function isLoginRoute(route) {
    const metadata = route.meta[0] || {}
    return metadata.hasOwnProperty('login') && metadata.login
}
function isHomeRoute(route) {
    const metadata = route.meta[0] || {}
    return metadata.hasOwnProperty('home') && metadata.home
}
