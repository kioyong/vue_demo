<template>
    <div>
        <b-form class="col-md-4 col-sm-6 col-xs-6 form-signin" @submit="onSubmit">
            <h1 class="h2 mb-4">后台管理系统</h1>
            <b-form-input v-model="form.username" type="text" placeholder="Enter your username"></b-form-input>
            <b-form-input v-model="form.password" type="password" placeholder="Enter your password"></b-form-input>
            <b-button type="submit" class="col-md-12 col-sm-12 col-xs-12" variant="primary">登录</b-button>
        </b-form>
    </div>
</template>

<script>
import axios from 'axios'
import {login} from '../api/securityService'
export default {
    name: 'HelloWorld',
    data () {
        return {
            form: {
                username: 'aaa',
                password: 'aaa'
            },
            data:null
        }
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault()
            let formdata = new FormData()
            formdata.append('username',this.form.username)
            formdata.append('password',this.form.password)
            formdata.append('grant_type','password')

            login(formdata).then((response) => {
                console.log("login success")
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
                this.$router.push('/Foo')
            }, (response) => {
                console.log("login fail")
            })
            }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 30px;
  margin: auto;
 
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
