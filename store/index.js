import Vuex from 'vuex'
import { auth, db } from '~/plugins/firebase.js'

const createStore = () => {
    return new Vuex.Store({
        state: {
            user: null,
            token: null,
            Auth: false,
            api: '',
            channelData: null,
            ListOfChannelTypes: null
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
                    commit('setApi', process.env.NODE_ENV === 'production' ? process.env.NUXT_BUILD_API : process.env.NODE_ENV === 'development' ? process.env.NUXT_DEV_API : null)
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
                return new Promise((resolve, reject) => {
                    auth.signInWithEmailAndPassword(email, password)
                        .then(user => resolve(user))
                        .catch(e => reject(e))
                })
            },
            signOut({ commit }) {
                return new Promise((resolve, reject) => {
                    auth.signOut()
                        .then(() => commit('setUser', null), commit('setToken', null), resolve())
                        .catch(e => reject(e))
                })
            },
            getChannelTypes({ commit }) {
                return new Promise((resolve, reject) => {
                    const object = {}
                    db.collection('Config')
                        .get()
                        .then(querySnapshot => {
                            querySnapshot.forEach(doc => {
                                object[doc.id] = doc.data().list
                            })
                        })
                    resolve(object).catch(error => reject(error))
                })
            },
            SaveChannel({ state }, { Channel, Type, data, axios }) {
                return new Promise((resolve, reject) => {
                    axios
                        .post(`${state.api}/save_channel`, { Channel, Type, data })
                        .then(() => resolve())
                        .catch(e => reject(e))
                })
            },
            getChannelById({ state, commit }, { ChannelId, axios }) {
                return new Promise((resolve, reject) => {
                    axios
                        .post(`${state.api}/get_channel_by_id`, { ChannelId })
                        .then(data => {
                            if (data.data.status) commit('setchannelData', data.data.data, resolve(data.data.data))
                            else commit('setchannelData', reject(data.message))
                        })
                        .catch(e => commit('setchannelData', reject(e)))
                })
            },
            getChannelByVideoId({ state, commit }, { VideoId, axios }) {
                return new Promise((resolve, reject) => {
                    axios
                        .post(`${state.api}/get_channel_by_video_id`, { VideoId })
                        .then(data => {
                            if (data.data.status) commit('setchannelData', data.data.data, resolve(data.data.data))
                            else commit('setchannelData', null, reject(data.message))
                        })
                        .catch(e => commit('setchannelData', null, reject(e)))
                })
            },

            getChannelByUser({ state, commit }, { ChannelUser, axios }) {
                return new Promise((resolve, reject) => {
                    axios
                        .post(`${state.api}/get_channel_by_user`, { ChannelUser })
                        .then(data => {
                            if (data.data.status) commit('setchannelData', data.data.data, resolve(data.data.data))
                            else commit('setchannelData', null, reject(data.message))
                        })
                        .catch(e => commit('setchannelData', null, reject(e)))
                })
            }
        }
    })
}
export default createStore
