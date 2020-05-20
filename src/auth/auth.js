/* eslint-disable no-unused-vars */
import { CognitoAuth, StorageHelper } from 'amazon-cognito-auth-js'
import appRouter from '../router/index'
import userInfoStore from './user-info-store'
import userInfoApi from './user-info-api'

const CLIENT_ID = process.env.VUE_APP_COGNITO_CLIENT_ID
const APP_DOMAIN = process.env.VUE_APP_COGNITO_APP_DOMAIN
const REDIRECT_URI = process.env.VUE_APP_COGNITO_REDIRECT_URI
const USERPOOL_ID = process.env.VUE_APP_COGNITO_USERPOOL_ID
const REDIRECT_URI_SIGNOUT = process.env.VUE_APP_COGNITO_REDIRECT_URI_SIGNOUT
const APP_URL = process.env.VUE_APP_APP_URL

const authData = {
    ClientId: CLIENT_ID,
    AppWebDomain: APP_DOMAIN,
    TokenScopesArray: ['openid', 'email'],
    RedirectUriSignIn: REDIRECT_URI,
    RedirectUriSignOut: REDIRECT_URI_SIGNOUT,
    UserPoolId: USERPOOL_ID,
}

const auth = new CognitoAuth(authData)
auth.userhandler = {
    onSuccess: function (result) {
        console.log("Sign in Success:", result)
        userInfoStore.setLoggedIn(true)
        window.localStorage.setItem('loggedIn', true)
        userInfoApi.getUserInfo().then(response => {
            appRouter.push('/')
        })
    },
    onFailure: function (err) {
        userInfoStore.setLoggedOut()
        window.localStorage.removeItem('loggedIn')
        appRouter.go({ path: '/error', query: { message: 'Login failed due to ' + err } })
    }
}

function getUserInfoStorageKey() {
    const keyPrefix = 'CognitoIdentityServiceProvider.' + auth.getClientId()
    const tokenUserName = auth.signInUserSession.getAccessToken().getUsername()
    const userInfoKey = keyPrefix + '.' + tokenUserName + '.userInfo'
    return userInfoKey
}

const storageHelper = new StorageHelper()
const storage = storageHelper.getStorage()

export default {
    auth: auth,
    login() {
        auth.getSession()
    },
    logout() {
        if (auth.isUserSignedIn()) {
            const userInfoKey = this.getUserInfoStorageKey()
            auth.signOut()

            storage.removeItem(userInfoKey)
        }
        window.localStorage.removeItem('loggedIn')
    },
    getUserInfoStorageKey
}
