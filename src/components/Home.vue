<template>
    <div class="row mt-4">
        <h3>Home</h3>
        <div class="alert alert-info">
            {{ userInfo }}
        </div>
    </div>
</template>

<script>
import userInfoStore from '../auth/user-info-store';

export default {
    name: 'Home',
    data() {
        return {
            userInfo: userInfoStore.state.cognitoInfo,
        };
    },
};
</script>

<style></style>
