import Vuex from 'vuex'
import { auth } from '~/plugins/firebase.js'
const createStore = () => {
    return new Vuex.Store({
        state: {
            user: null,
            token: null,
            Auth: false,
            api: '',
            channelData: null
        },
        getters: {
            GetUser: (state, getters) => state.user,
            getToken: (state, getters) => state.token,
            getAuth: (state, getters) => state.Auth,
            getApi: (state, getters) => state.api,
            getchannelData: (state, getters) => state.channelData
        },
        mutations: {
            setUser: (state, payload) => {
                state.user = payload
                state.Auth = !!payload
            },
            setToken: (state, payload) => (state.token = payload),
            setApi: (state, payload) => (state.api = payload),
            setchannelData: (state, payload) => (state.channelData = payload)
        },
        actions: {
            nuxtClientInit({ commit }) {
                return new Promise((resolve, reject) => {
                    if (process.env.NODE_ENV === 'production')
                        commit('setApi', process.env.NUXT_BUILD_API)

                    if (process.env.NODE_ENV === 'development')
                        commit('setApi', process.env.NUXT_DEV_API)

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
            },
            getChannelById({ state, commit }, { ChannelId, axios }) {
                return new Promise((resolve, reject) => {
                    axios
                        .post(`${state.api}/get_channel_by_id`, { ChannelId })
                        .then(data => {
                            if (data.data.status) {
                                commit('setchannelData', data.data.data)
                                resolve(data.data.data)
                            } else {
                                commit('setchannelData', null)
                                reject(data.message)
                            }
                        })
                        .catch(e => {
                            commit('setchannelData', null)
                            reject(e)
                        })
                })
            }
        }
    })
}
export default createStore
