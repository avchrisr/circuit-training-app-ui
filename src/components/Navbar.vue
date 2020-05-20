<template>
    <div class="row">
        <nav
            class="col navbar navbar-expand-lg navbar-light"
            style="background-color: #e3f2fd;"
        >
            <!-- <a class="navbar-brand" href="#"></a> -->
            <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <router-link class="nav-link" to="/">Home</router-link>
                    </li>
                    <li v-if="loggedIn" class="nav-item">
                        <router-link class="nav-link" to="/events"
                            >Events</router-link
                        >
                    </li>
                    <li
                        v-if="
                            loggedIn &&
                                ['administrators', 'managers'].some((role) =>
                                    loggedInUser.roles.includes(role)
                                )
                        "
                        class="nav-item"
                    >
                        <router-link class="nav-link" to="/users"
                            >User Management</router-link
                        >
                    </li>
                    <li
                        v-if="
                            loggedIn &&
                                [
                                    'administrators',
                                    'managers',
                                    'staff',
                                ].some((role) =>
                                    loggedInUser.roles.includes(role)
                                )
                        "
                        class="nav-item dropdown"
                    >
                        <a
                            class="nav-link dropdown-toggle"
                            href="#"
                            id="navbarDropdownMenuLink"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            Configuration
                        </a>
                        <div
                            class="dropdown-menu"
                            aria-labelledby="navbarDropdownMenuLink"
                        >
                            <router-link
                                v-if="loggedInUser.roles.includes('staff')"
                                class="dropdown-item"
                                to="/geofences"
                                >Geofence</router-link
                            >
                            <router-link class="dropdown-item" to="/alerts"
                                >Alerts</router-link
                            >
                            <router-link class="dropdown-item" to="/settings"
                                >Settings</router-link
                            >
                        </div>
                    </li>
                </ul>

                <router-link
                    v-if="loggedIn"
                    tag="button"
                    class="btn btn-warning ml-auto"
                    to="/logout"
                >
                    Logout
                </router-link>
                <router-link
                    v-else
                    tag="button"
                    class="btn btn-warning ml-auto"
                    to="/login"
                >
                    Login
                </router-link>
            </div>
        </nav>
    </div>
</template>

<script>
import userInfoStore from '../auth/user-info-store';

export default {
    name: 'navbar',
    data() {
        return {
            loggedIn: window.localStorage.getItem('loggedIn')
                ? Boolean(window.localStorage.getItem('loggedIn'))
                : userInfoStore.state.loggedIn,
            loggedInUser: {
                roles: ['administrators', 'managers', 'staff'],
            },
        };
    },
};
</script>

<style></style>
