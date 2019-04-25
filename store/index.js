import Vuex from 'vuex'
import { auth } from '~/plugins/firebase.js'
const createStore = () => {
    return new Vuex.Store({
        state: { user: null, token: null, Auth: false },
        getters: {
            GetUser: (state, getters) => state.user,
            getToken: (state, getters) => state.token,
            getAuth: (state, getters) => state.Auth
        },
        mutations: {
            setUser: (state, payload) => {
                state.user = payload
                state.Auth = !!payload
            },
            setToken: (state, payload) => (state.token = payload)
        },
        actions: {
            nuxtClientInit({ commit }) {
                return new Promise((resolve, reject) => {
                    auth.onAuthStateChanged(user => {
                        if (user) {
                            user.getIdToken()
                                .then(token => commit('setToken', token))
                                .catch(e => commit('setToken', null))
                            commit('setUser', {
                                uid: user.uid,
                                displayName: user.displayName,
                                photoURL: user.photoURL,
                                email: user.email,
                                phoneNumber: user.phoneNumber
                            })
                            resolve()
                        } else {
                            commit('setUser', null)
                            commit('setToken', null)
                            resolve()
                        }
                    })
                })
            },
            signIn({ commit }, { email, password }) {
                console.log(email, password)
                return new Promise((resolve, reject) => {
                    auth.signInWithEmailAndPassword(email, password)
                        .then(user => resolve(user))
                        .catch(e => reject(e))
                })
            },
            signOut({ commit }) {
                return new Promise((resolve, reject) => {
                    auth.signOut()
                        .then(() => {
                            commit('setUser', null)
                            commit('setToken', null)
                            resolve()
                        })
                        .catch(e => reject(e))
                })
            }
        }
    })
}
export default createStore
