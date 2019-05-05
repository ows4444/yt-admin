/* eslint-disable no-console */
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
const config = {
    apiKey: process.env.NUXTapiKey,
    authDomain: process.env.NUXTauthDomain,
    databaseURL: process.env.NUXTdatabaseURL,
    projectId: process.env.NUXTprojectId,
    storageBucket: process.env.NUXTstorageBucket,
    messagingSenderId: process.env.NUXTmessagingSenderId
}
export default (!firebase.apps.length ? firebase.initializeApp(config) : firebase.app())
export const db = firebase.firestore()
export const auth = firebase.auth()
