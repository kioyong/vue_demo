<template>
    <div>
        <p>{{msg}}</p>
         <b-alert variant="success" show>Success Alert</b-alert>
    </div>
</template>

<script>
    export default {
        name: 'Foo',
        data() {
            return {
                msg: 'This is Foo!'
            }
        },
    }
</script>

<style scoped>

</style>