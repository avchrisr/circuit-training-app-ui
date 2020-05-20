/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '../auth/auth'
import userInfoStore from '../auth/user-info-store'
import userInfoApi from '../auth/user-info-api'
import Home from '@/components/Home.vue'
import User from '@/components/User.vue'
import Event from '@/components/Event.vue'
import Geofence from '@/components/Geofence.vue'
import Alert from '@/components/Alert.vue'
import Setting from '@/components/Setting.vue'
import LogoutSuccess from '@/components/auth/LogoutSuccess.vue'
import ErrorComponent from '@/components/Error.vue'

Vue.use(VueRouter)

function requireAuth(to, from, next) {

    console.log('-------------   router/index.js requireAuth -- auth   ------------')
    console.log(auth)

    if (!auth.auth.isUserSignedIn()) {
        userInfoStore.setLoggedIn(false)
        next({
            path: '/login',
            query: { redirect: to.fullPath }
        })
    } else {
        userInfoApi.getUserInfo().then(response => {
            userInfoStore.setLoggedIn(true)
            userInfoStore.setCognitoInfo(response)
            next()
        })
    }
}

export default new VueRouter({
    mode: 'history',
    base: '/',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            beforeEnter: requireAuth
        },
        {
            path: '/login',
            beforeEnter(to, from, next) {
                auth.auth.getSession()
            }
        },
        {
            path: '/login/oauth2/code/cognito',
            beforeEnter(to, from, next) {
                const currUrl = window.location.href

                //console.log(currUrl)
                auth.auth.parseCognitoWebResponse(currUrl)
                //next()
            }
        },
        {
            path: '/logout',
            component: LogoutSuccess,
            beforeEnter(to, from, next) {
                auth.logout()
                next()
            }
        },
        {
            path: '/error',
            component: ErrorComponent
        },
        {
            path: '/users',
            component: User
        },
        {
            path: '/events',
            component: Event
        },
        {
            path: '/geofences',
            component: Geofence
        },
        {
            path: '/alerts',
            component: Alert
        },
        {
            path: '/settings',
            component: Setting
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
