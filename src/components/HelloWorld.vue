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
export default {
    name: 'HelloWorld',
    data () {
        return {
            form: {
                username: '',
                password: ''
            },
            data:null
        }
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault();
            let auth = "Basic eW9uZzpwYXNzdzByZA=="
            let formdata = new FormData();
            formdata.append('username',this.form.username);
            formdata.append('password',this.form.password);
            formdata.append('grant_type','password');
            axios.post('/oauth/token',formdata,{
                "Content-Type":"multipart/form-data"
                }
            ).then((response) => {
                console.log("login success")
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
                // this.$router.push('/Foo')
            }, (response) => {
                console.log("login fail")
                // this.$router.push('/user_info')
            });
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
