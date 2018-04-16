<template>
    <div>
        <b-alert variant="success" show>Success Alert</b-alert>
        <b-alert variant="success" :show="showHello">{{hello}}</b-alert>
        <b-button  @click="getHello()">get hello</b-button>
        <b-button @click="signout()">sing out</b-button>
    </div>
</template>

<script>
import {getHello} from '../api/markService'
import axios from 'axios'
export default {
    name: 'Foo',
    data () {
        return {
            hello: '',
            showHello: false
        }
    },
    methods: {
        signout () {
            axios.defaults.headers.common['Authorization'] = 'Basic eW9uZzpwYXNzdzByZA==';
            this.$router.push('/login')
        },
        getHello () {
            getHello("/yong").then((response) => {
                console.log("get hello success",response)
                this.showHello = true
                this.hello = response.data
            }, (response) => {
                console.log("get hello fail")
            });
        }
    }
}
</script>

<style scoped>

</style>