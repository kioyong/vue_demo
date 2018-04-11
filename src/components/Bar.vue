<template>
    <div class="row">
        <p class="col-md-4">{{msg}}</p>
        <b-alert show class="col-md-2">Default Alert</b-alert>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                msg: 'this is Bar!'
            }
        },
    }
</script>

<style scoped>

</style>